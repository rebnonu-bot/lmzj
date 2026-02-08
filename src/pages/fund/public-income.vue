<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">公共收益</text>
      <view class="placeholder"></view>
    </view>

    <!-- 收益概览卡片 -->
    <view class="summary-card">
      <view class="card-header">
        <text class="card-title">收益总览</text>
        <view class="year-selector">
          <text>2024年度</text>
          <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
        </view>
      </view>
      <view class="total-amount">
        <text class="label">累计公共收益 (元)</text>
        <text class="value">856,230.00</text>
      </view>
      <view class="distribution-info">
        <view class="info-item">
          <text class="label">业主分成比例</text>
          <text class="value highlight">70%</text>
        </view>
        <view class="info-item">
          <text class="label">预计分配金额</text>
          <text class="value">599,361.00</text>
        </view>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="tabs-scroll-box">
      <scroll-view scroll-x class="tabs-container" show-scrollbar="false">
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
      </scroll-view>
    </view>

    <!-- 收益明细列表 -->
    <scroll-view scroll-y class="list-container">
      <view class="income-card" v-for="(item, index) in filteredIncomes" :key="index">
        <view class="card-top">
          <view class="type-tag" :class="item.typeCode">{{ item.type }}</view>
          <text class="date">{{ item.date }}</text>
        </view>
        <view class="card-content">
          <view class="title">{{ item.title }}</view>
          <view class="amount-row">
            <text class="label">收益金额：</text>
            <text class="amount">￥{{ item.amount }}</text>
          </view>
          <view class="desc">{{ item.desc }}</view>
        </view>
        <view class="card-footer">
          <view class="share-box">
            <text class="share-label">业主分成 (70%)：</text>
            <text class="share-amount">￥{{ item.shareAmount }}</text>
          </view>
          <view class="status">已入账</text>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more">
        <text>查看更多历史收益</text>
        <t-icon name="chevron-right" size="32rpx" color="#94A3B8" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 隐藏原生tabbar
onMounted(() => {
  uni.hideTabBar();
});

const goBack = () => {
  uni.navigateBack();
};

const activeTab = ref(0);
const tabs = ['全部', '车位收益', '广告收益', '场地租赁', '其他收益'];

const incomes = ref([
  {
    title: '第一季度地面停车位收益',
    date: '2024-03-31',
    amount: '125,600.00',
    shareAmount: '87,920.00',
    type: '车位收益',
    typeCode: 'parking',
    desc: '包含小区地面临时停车费及固定车位管理费分成。'
  },
  {
    title: '电梯轿厢广告位租赁(2024上半年)',
    date: '2024-02-15',
    amount: '48,000.00',
    shareAmount: '33,600.00',
    type: '广告收益',
    typeCode: 'ad',
    desc: '分众传媒、华语传媒等广告公司租赁费用。'
  },
  {
    title: '东门快递柜场地占用费',
    date: '2024-01-20',
    amount: '12,000.00',
    shareAmount: '8,400.00',
    type: '场地租赁',
    typeCode: 'rent',
    desc: '顺丰、丰巢快递柜年度场地占用协议费用。'
  },
  {
    title: '公共区域直饮水机管理费',
    date: '2024-01-10',
    amount: '3,500.00',
    shareAmount: '2,450.00',
    type: '其他收益',
    typeCode: 'other',
    desc: '社区共享直饮水机运营管理分成。'
  }
]);

const filteredIncomes = computed(() => {
  if (activeTab.value === 0) return incomes.value;
  return incomes.value.filter(item => item.type === tabs[activeTab.value]);
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F8FAFC;
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400rpx;
  background: linear-gradient(180deg, #2563EB 0%, #3B82F6 100%);
  border-radius: 0 0 40rpx 40rpx;
}

.nav-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100rpx 32rpx 40rpx;
  z-index: 10;

  .back-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #FFFFFF;
  }

  .placeholder {
    width: 80rpx;
  }
}

.summary-card {
  position: relative;
  margin: 0 32rpx 32rpx;
  padding: 40rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 10;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;

    .card-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
    }

    .year-selector {
      display: flex;
      align-items: center;
      padding: 8rpx 20rpx;
      background: #F1F5F9;
      border-radius: 100rpx;
      
      text {
        font-size: 24rpx;
        color: #64748B;
        margin-right: 4rpx;
      }
    }
  }

  .total-amount {
    text-align: center;
    margin-bottom: 48rpx;

    .label {
      display: block;
      font-size: 24rpx;
      color: #64748B;
      margin-bottom: 12rpx;
    }

    .value {
      font-size: 56rpx;
      font-weight: 700;
      color: #1E293B;
      font-family: 'DIN Alternate', sans-serif;
    }
  }

  .distribution-info {
    display: flex;
    justify-content: space-between;
    padding-top: 32rpx;
    border-top: 2rpx solid #F1F5F9;

    .info-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-child {
        border-right: 2rpx solid #F1F5F9;
      }

      .label {
        font-size: 24rpx;
        color: #94A3B8;
        margin-bottom: 8rpx;
      }

      .value {
        font-size: 32rpx;
        font-weight: 600;
        color: #1E293B;
        font-family: 'DIN Alternate', sans-serif;

        &.highlight {
          color: #2563EB;
        }
      }
    }
  }
}

.tabs-scroll-box {
  background: #FFFFFF;
  padding: 0 32rpx;
  position: sticky;
  top: 0;
  z-index: 20;
  margin-bottom: 20rpx;
}

.tabs-container {
  white-space: nowrap;
  width: 100%;

  .tab-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32rpx;
    height: 88rpx;
    position: relative;

    text {
      font-size: 28rpx;
      color: #64748B;
      transition: all 0.3s;
    }

    &.active {
      text {
        color: #2563EB;
        font-weight: 600;
      }
    }

    .active-bar {
      position: absolute;
      bottom: 0;
      width: 40rpx;
      height: 6rpx;
      background: #2563EB;
      border-radius: 3rpx;
    }
  }
}

.list-container {
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.income-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .type-tag {
      padding: 4rpx 16rpx;
      border-radius: 8rpx;
      font-size: 22rpx;
      font-weight: 500;

      &.parking { background: rgba(37, 99, 235, 0.1); color: #2563EB; }
      &.ad { background: rgba(16, 185, 129, 0.1); color: #10B981; }
      &.rent { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
      &.other { background: rgba(100, 116, 139, 0.1); color: #64748B; }
    }

    .date {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .card-content {
    margin-bottom: 24rpx;

    .title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 16rpx;
    }

    .amount-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 12rpx;

      .label {
        font-size: 26rpx;
        color: #64748B;
      }

      .amount {
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
        font-family: 'DIN Alternate', sans-serif;
      }
    }

    .desc {
      font-size: 24rpx;
      color: #94A3B8;
      line-height: 1.5;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24rpx;
    border-top: 2rpx dashed #F1F5F9;

    .share-box {
      display: flex;
      align-items: baseline;

      .share-label {
        font-size: 24rpx;
        color: #64748B;
      }

      .share-amount {
        font-size: 28rpx;
        font-weight: 600;
        color: #2563EB;
        font-family: 'DIN Alternate', sans-serif;
      }
    }

    .status {
      font-size: 24rpx;
      color: #10B981;
      font-weight: 500;
    }
  }
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx 0;
  
  text {
    font-size: 24rpx;
    color: #94A3B8;
    margin-right: 4rpx;
  }
}
</style>
