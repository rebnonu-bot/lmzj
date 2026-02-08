<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
      </view>
      
      <view class="header-main">
        <view class="title-box">
          <text class="main-title">住宅专项维修资金</text>
          <text class="sub-title">公开透明可监督</text>
          <view class="house-info" @click="goToBindHouse">
            <t-icon name="swap" size="28rpx" color="#fff" class="swap-icon" />
            <text>{{ currentHouse }}</text>
          </view>
        </view>
        <view class="header-illustration">
          <!-- Simulation of the illustration in the image -->
          <view class="illust-card card1"></view>
          <view class="illust-card card2"></view>
          <view class="illust-coin"></view>
        </view>
      </view>

      <!-- Decorative background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Tabs -->
    <view class="tabs-container">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        <text>{{ tab }}</text>
        <view class="active-bar" v-if="activeTab === index"></view>
      </view>
    </view>

    <!-- 3. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content" v-if="activeTab === 0">
        <!-- Info Card -->
        <view class="info-card">
          <view class="info-item">
            <text class="label">小区维修资金总额</text>
            <view class="value-box">
              <text class="value">{{ fundInfo.total }}</text>
              <text class="unit">万元</text>
            </view>
          </view>
          <view class="info-item">
            <text class="label">维修资金使用金额</text>
            <view class="value-box">
              <text class="value">{{ fundInfo.used }}</text>
              <text class="unit">万元</text>
            </view>
          </view>
          <view class="info-item">
            <text class="label">维修资金可用余额</text>
            <view class="value-box">
              <text class="value primary-color">{{ availableBalance }}</text>
              <text class="unit primary-color">万元</text>
            </view>
          </view>
          <view class="info-item">
            <text class="label">维修资金使用次数</text>
            <view class="value-box">
              <text class="value">{{ fundInfo.times }}</text>
              <text class="unit">次</text>
            </view>
          </view>
        </view>

        <!-- Calculation Logic Box -->
        <view class="calc-info-box">
          <view class="calc-title">
            <t-icon name="info-circle" size="28rpx" color="#3B82F6" />
            <text>数据计算方式</text>
          </view>
          <view class="calc-item">
            <text class="c-label">已用金额 = </text>
            <text class="c-value">Σ 维修公示列表各项目金额 (共{{ fundInfo.times }}项)</text>
          </view>
          <view class="calc-item">
            <text class="c-label">可用余额 = </text>
            <text class="c-value">总额 ({{ fundInfo.total }}万) - 已用 ({{ fundInfo.used }}万)</text>
          </view>
        </view>

        <!-- Usage Section -->
        <view class="usage-section">
          <view class="section-title">维修资金使用情况</view>
          <view class="usage-list">
            <view class="usage-item" v-for="(item, index) in publicityList.slice(0, 2)" :key="index">
              <view class="usage-dot"></view>
              <view class="usage-info">
                <text class="usage-name">{{ item.title }}</text>
                <text class="usage-time">{{ item.date }}</text>
              </view>
              <text class="usage-amount">-{{ item.amount }}万</text>
            </view>
          </view>
          <view class="view-more" v-if="publicityList.length > 0">
            <text>查看更多明细</text>
            <t-icon name="chevron-right" size="24rpx" color="#3B82F6" />
          </view>
          <view class="empty-state" v-else>
            <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
            <text>暂无详细使用记录</text>
          </view>
        </view>
      </view>

      <!-- 维修公示 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view class="publicity-card" v-for="(item, index) in publicityList" :key="index">
          <view class="publicity-header">
            <text class="publicity-title">{{ item.title }}</text>
            <view class="status-tag" :class="item.status === '进行中' ? 'ongoing' : 'completed'">
              {{ item.status }}
            </view>
          </view>
          <view class="publicity-body">
            <view class="publicity-row">
              <text class="p-label">公示时间：</text>
              <text class="p-value">{{ item.date }}</text>
            </view>
            <view class="publicity-row">
              <text class="p-label">预估金额：</text>
              <text class="p-value highlight">¥{{ item.amount }} 万元</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 房屋分摊 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view class="allocation-card">
          <view class="allocation-header">
            <t-icon name="home" size="40rpx" color="#3B82F6" />
            <text class="house-name">{{ allocationInfo.houseName }}</text>
          </view>
          <view class="allocation-grid">
            <view class="allocation-item">
              <text class="a-label">房屋面积</text>
              <text class="a-value">{{ allocationInfo.area }} ㎡</text>
            </view>
            <view class="allocation-item">
              <text class="a-label">可用余额</text>
              <text class="a-value primary">{{ personalBalance }} 元</text>
            </view>
          </view>
        </view>
        
        <!-- Calculation Logic Box for Personal -->
        <view class="calc-info-box">
          <view class="calc-title">
            <t-icon name="info-circle" size="28rpx" color="#3B82F6" />
            <text>个人余额计算方式</text>
          </view>
          <view class="calc-item">
            <text class="c-label">交存标准 = </text>
            <text class="c-value">{{ depositStandard }} 元/㎡ (根据当地政策)</text>
          </view>
          <view class="calc-item">
            <text class="c-label">可用余额 = </text>
            <text class="c-value">房屋面积 ({{ allocationInfo.area }}㎡) × 标准 ({{ depositStandard }}元/㎡) = {{ personalBalance }} 元</text>
          </view>
        </view>
        
        <view class="tips-box">
          <t-icon name="info-circle" size="32rpx" color="#64748B" />
          <text>维修资金由当地住建局代管，公开透明。</text>
        </view>
      </view>
    </scroll-view>

    <!-- Global Footer -->
    <app-footer />
    <app-tab-bar activePath="pages/index/index" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const activeTab = ref(0);
const tabs = ['基本情况', '维修公示', '房屋分摊'];

const currentHouse = ref('阳光水岸一期 1-1-802');

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    // 如果没有历史记录（比如直接刷新页面），则回到首页
    uni.reLaunch({
      url: '/pages/index/index'
    });
  }
};

const goToBindHouse = () => {
  uni.showToast({
    title: '房屋绑定功能开发中',
    icon: 'none'
  });
};

// 模拟数据 - 公示列表
const publicityList = ref([
  {
    title: '1号楼电梯钢丝绳更换工程',
    date: '2026-01-15',
    status: '进行中',
    amount: '4.50'
  },
  {
    title: '小区监控系统升级改造',
    date: '2025-12-20',
    status: '已公示',
    amount: '2.80'
  },
  {
    title: '地库排水泵检修',
    date: '2025-11-05',
    status: '已完成',
    amount: '0.65'
  },
  {
    title: '2号楼外墙脱落维修',
    date: '2025-10-12',
    status: '已完成',
    amount: '1.20'
  },
  {
    title: '小区消防管道渗漏维修',
    date: '2025-09-28',
    status: '已完成',
    amount: '0.85'
  },
  {
    title: '单元门禁系统维护',
    date: '2025-08-15',
    status: '已完成',
    amount: '0.45'
  },
  {
    title: '屋面防水补强工程',
    date: '2025-07-20',
    status: '已完成',
    amount: '1.65'
  },
  {
    title: '生活水泵房变频器更换',
    date: '2025-06-10',
    status: '已完成',
    amount: '0.35'
  }
]);

// 维修资金概况 - 由公示列表计算
const fundInfo = computed(() => {
  const total = 245.82; // 假设总额固定
  const used = publicityList.value.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  return {
    total: total.toFixed(2),
    used: used.toFixed(2),
    times: publicityList.value.length.toString()
  };
});

const availableBalance = computed(() => {
  return (parseFloat(fundInfo.value.total) - parseFloat(fundInfo.value.used)).toFixed(2);
});

const depositStandard = ref(25);
const personalBalance = computed(() => (parseFloat(allocationInfo.value.area) * depositStandard.value).toFixed(2));

const allocationInfo = ref({
  houseName: currentHouse.value,
  area: '124.50'
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding-bottom: 180rpx; // Space for tabbar
}

.header-section {
  height: 9.6rem;
  background: @header-gradient;
  padding: 10rpx @page-padding 0;
  position: relative;
  overflow: hidden;
  color: @text-white;

  .header-top {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    position: relative;
    z-index: 2;
    margin-left: -20rpx; // Offset for back button padding

    .back-btn {
      padding: 10rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 2;

    .title-box {
      .main-title {
        display: block;
        color: #FFFFFF;
        font-size: 40rpx;
        font-weight: 900;
        margin-bottom: 4rpx;
        letter-spacing: 2rpx;
        text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15), 0 0 12rpx rgba(255, 255, 255, 0.3);
      }

      .sub-title {
        display: block;
        color: rgba(255, 255, 255, 0.85);
        font-size: 24rpx;
        font-weight: 400;
        letter-spacing: 2rpx;
        margin-bottom: 24rpx;
      }

      .house-info {
        display: inline-flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 24rpx;
        padding: 6rpx 16rpx;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 20rpx;
        border: 1rpx solid rgba(255, 255, 255, 0.1);

        &:active {
          opacity: 0.7;
          background: rgba(255, 255, 255, 0.25);
        }

        .swap-icon {
          margin-right: 8rpx;
        }
      }
    }

    .header-illustration {
      position: relative;
      width: 240rpx;
      height: 180rpx;
      margin-top: -20rpx;

      .illust-card {
        position: absolute;
        background: rgba(255, 255, 255, 0.2);
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        border-radius: 12rpx;
        backdrop-filter: blur(4rpx);
      }

      .card1 {
        width: 140rpx;
        height: 100rpx;
        right: 20rpx;
        top: 20rpx;
        transform: rotate(-10deg);
      }

      .card2 {
        width: 160rpx;
        height: 120rpx;
        right: 0;
        top: 40rpx;
        transform: rotate(5deg);
        z-index: 2;
      }

      .illust-coin {
        position: absolute;
        width: 40rpx;
        height: 40rpx;
        background: #FBBF24;
        border-radius: 50%;
        right: 80rpx;
        top: 100rpx;
        box-shadow: 0 4rpx 12rpx rgba(251, 191, 36, 0.5);
        z-index: 3;
        animation: bounce 2s ease-in-out infinite;

        &::after {
          content: '¥';
          color: #fff;
          font-size: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-weight: bold;
        }
      }
    }
  }

  .decor-circle {
    position: absolute;
    right: -100rpx;
    top: -50rpx;
    width: 400rpx;
    height: 400rpx;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20rpx); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10rpx); }
  }
}

.tabs-container {
  display: flex;
  background: #FFFFFF;
  height: 100rpx;
  position: relative;
  z-index: 10;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    color: #64748B;
    position: relative;

    &.active {
      color: #3B82F6;
      font-weight: 500;
    }

    .active-bar {
      position: absolute;
      bottom: 0;
      width: 60rpx;
      height: 6rpx;
      background: #3B82F6;
      border-radius: 3rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  overflow: hidden;
}

.tab-content {
  padding: 30rpx;

  .info-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid #F1F5F9;

      &:last-child {
        border-bottom: none;
      }

      .label {
        font-size: 30rpx;
        color: #1E293B;
      }

      .value-box {
        display: flex;
        align-items: baseline;

        .value {
          font-size: 36rpx;
          font-weight: bold;
          color: #EF4444;
          margin-right: 8rpx;

          &.primary-color {
            color: #3B82F6;
          }
        }

        .unit {
          font-size: 26rpx;
          color: #EF4444;

          &.primary-color {
            color: #3B82F6;
          }
        }
      }
    }
  }

  .calc-info-box {
    background: #EFF6FF;
    border: 1rpx solid #DBEAFE;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 30rpx;

    .calc-title {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      text {
        margin-left: 8rpx;
        font-size: 26rpx;
        font-weight: 500;
        color: #1E40AF;
      }
    }

    .calc-item {
      display: flex;
      margin-bottom: 8rpx;
      font-size: 24rpx;
      line-height: 1.5;

      &:last-child {
        margin-bottom: 0;
      }

      .c-label {
        color: #64748B;
        white-space: nowrap;
      }

      .c-value {
        color: #1E40AF;
        font-weight: 400;
      }
    }
  }

  .usage-section {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    min-height: 400rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .section-title {
      font-size: 32rpx;
      color: #3B82F6;
      font-weight: 500;
      margin-bottom: 40rpx;
    }

    .usage-list {
      .usage-item {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;

        .usage-dot {
          width: 12rpx;
          height: 12rpx;
          background: #3B82F6;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .usage-info {
          flex: 1;
          display: flex;
          flex-direction: column;

          .usage-name {
            font-size: 28rpx;
            color: #1E293B;
            margin-bottom: 4rpx;
          }

          .usage-time {
            font-size: 24rpx;
            color: #94A3B8;
          }
        }

        .usage-amount {
          font-size: 28rpx;
          color: #EF4444;
          font-weight: 500;
        }
      }
    }

    .view-more {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20rpx;
      border-top: 1rpx solid #F1F5F9;
      color: #3B82F6;
      font-size: 26rpx;

      text {
        margin-right: 4rpx;
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 60rpx;
      color: #94A3B8;
      font-size: 28rpx;

      text {
        margin-top: 20rpx;
      }
    }
  }
}

.publicity-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .publicity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24rpx;

    .publicity-title {
      flex: 1;
      font-size: 30rpx;
      font-weight: 500;
      color: #1E293B;
      margin-right: 20rpx;
    }

    .status-tag {
      padding: 4rpx 16rpx;
      border-radius: 8rpx;
      font-size: 22rpx;

      &.ongoing {
        background: #EFF6FF;
        color: #3B82F6;
      }

      &.completed {
        background: #F0FDF4;
        color: #10B981;
      }
    }
  }

  .publicity-body {
    .publicity-row {
      display: flex;
      margin-bottom: 12rpx;
      font-size: 26rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .p-label {
        color: #64748B;
        width: 140rpx;
      }

      .p-value {
        color: #1E293B;

        &.highlight {
          color: #EF4444;
          font-weight: 500;
        }
      }
    }
  }
}

.allocation-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .allocation-header {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #F1F5F9;

    .house-name {
      margin-left: 20rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #1E293B;
    }
  }

  .allocation-grid {
    display: flex;

    .allocation-item {
      flex: 1;
      display: flex;
      flex-direction: column;

      .a-label {
        font-size: 26rpx;
        color: #64748B;
        margin-bottom: 12rpx;
      }

      .a-value {
        font-size: 36rpx;
        font-weight: bold;
        color: #1E293B;

        &.primary {
          color: #EF4444;
        }
      }
    }
  }
}

.tips-box {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  background: #F1F5F9;
  border-radius: 12rpx;
  color: #64748B;
  font-size: 24rpx;

  text {
    margin-left: 12rpx;
  }
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200rpx 0;
  color: #94A3B8;
  font-size: 30rpx;

  text {
    margin-top: 30rpx;
  }
}
</style>
