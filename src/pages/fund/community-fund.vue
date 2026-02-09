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
          <text class="main-title">小区数字基金</text>
          <text class="sub-title">你家物业费邻檬帮你减</text>
          <view class="house-info" @click="goToBindHouse">
            <t-icon name="swap" size="28rpx" color="#fff" class="swap-icon" />
            <text>{{ currentHouse }}</text>
          </view>
        </view>
        <view class="header-illustration">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <t-icon name="chart-bubble" size="64rpx" color="#fff" />
          </view>
          <view class="illust-coin coin-1"></view>
          <view class="illust-coin coin-2"></view>
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
      <!-- Loading Skeleton -->
      <view class="tab-content skeleton-list" v-if="isLoading">
        <view class="skeleton-card balance-skel">
          <view class="skeleton-item title-skel"></view>
          <view class="skeleton-item amount-skel"></view>
        </view>
        <view class="skeleton-card summary-skel">
          <view class="skeleton-item title-skel"></view>
          <view class="skeleton-item value-skel"></view>
        </view>
        <view class="skeleton-card chart-skel">
          <view class="skeleton-item title-skel"></view>
          <view class="skeleton-item bars-skel"></view>
        </view>
        <view class="skeleton-card ranking-skel">
          <view class="skeleton-item title-skel"></view>
          <view v-for="i in 3" :key="i" class="rank-item-skel">
            <view class="skeleton-item avatar-skel"></view>
            <view class="skeleton-item info-skel"></view>
          </view>
        </view>
      </view>

      <!-- 基本情况 Tab -->
      <view class="tab-content" v-else-if="activeTab === 0">
        <!-- Balance Card -->
        <view class="balance-card animate-slide-up" style="animation-delay: 0.1s">
          <view class="balance-info">
            <view class="balance-header">
              <text class="label">小区数字基金</text>
              <text class="sub-label">数据来源：邻檬智家</text>
            </view>
            <view class="balance-value">
              <text class="amount">{{ totalBalance }}</text>
              <text class="unit">元</text>
            </view>
          </view>
          <view class="balance-icon-box">
            <view class="coin-icon">¥</view>
          </view>
        </view>

        <!-- 我的贡献 Card -->
        <view class="contribution-summary-card animate-slide-up" style="animation-delay: 0.15s" @click="activeTab = 2">
          <view class="card-bg-decoration">
            <view class="circle-1"></view>
            <view class="circle-2"></view>
          </view>
          
          <view class="card-content">
            <view class="summary-left">
              <view class="label-group">
                <text class="label">我的累计贡献</text>
              </view>
              <view class="summary-value">
                <text class="amount">{{ myTotalContribution }}</text>
                <text class="unit">元</text>
              </view>
            </view>
            
            <view class="summary-right">
              <view class="view-btn">
                <text>明细</text>
                <t-icon name="chevron-right" size="24rpx" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>

        <!-- Trend Chart Card -->
        <view class="chart-card animate-slide-up" style="animation-delay: 0.2s">
          <view class="chart-header">
            <text class="chart-title">小区基金收支趋势量</text>
            <view class="chart-legend">
              <view class="legend-item">
                <view class="dot income"></view>
                <text>收入</text>
              </view>
              <view class="legend-item">
                <view class="dot expense"></view>
                <text>支出</text>
              </view>
            </view>
          </view>
          
          <view class="chart-body">
            <view class="chart-y-axis">
              <text>{{ Math.ceil(maxTrendValue) }}</text>
              <text>{{ Math.ceil(maxTrendValue / 2) }}</text>
              <text>0</text>
            </view>
            <view class="chart-main">
              <view class="chart-grid">
                <view class="grid-line"></view>
                <view class="grid-line"></view>
                <view class="grid-line"></view>
              </view>
              <view class="bar-container">
                <view class="bar-group" v-for="(item, index) in trendData" :key="index">
                  <view class="bars">
                    <view 
                      class="bar income animate-grow-up" 
                      :style="{ 
                        height: (item.income / maxTrendValue * 100) + '%',
                        animationDelay: (0.4 + index * 0.1) + 's'
                      }"
                    >
                      <text class="bar-value" v-if="item.income > 0.5">{{ item.income }}</text>
                    </view>
                    <view 
                      class="bar expense animate-grow-up" 
                      :style="{ 
                        height: (item.expense / maxTrendValue * 100) + '%',
                        animationDelay: (0.5 + index * 0.1) + 's'
                      }"
                    >
                      <text class="bar-value" v-if="item.expense > 0.5">{{ item.expense }}</text>
                    </view>
                  </view>
                  <text class="bar-label">{{ item.month }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="chart-footer">
            <text class="unit-text">单位：元</text>
          </view>
        </view>

        <!-- Ranking List Card -->
        <view class="ranking-card animate-slide-up" style="animation-delay: 0.25s">
          <view class="ranking-header">
            <view class="title-group">
              <t-icon name="chart-bar" size="36rpx" color="#F59E0B" />
              <text class="ranking-title">贡献排行榜</text>
            </view>
            <text class="ranking-subtitle">前五榜单</text>
          </view>
          
          <view class="ranking-list">
            <view 
              class="ranking-item animate-fade-in" 
              v-for="(item, index) in rankingList" 
              :key="index"
              :style="{ animationDelay: (0.3 + index * 0.05) + 's' }"
            >
              <view class="rank-num" :class="'rank-' + item.rank">
                <text v-if="item.rank > 3">{{ item.rank }}</text>
                <t-icon v-else name="measurement-1" size="32rpx" />
              </view>
              <image class="user-avatar" :src="item.avatar" mode="aspectFill" />
              <view class="user-info">
                <text class="user-name">{{ item.name }}</text>
              </view>
              <view class="user-amount">
                <text class="amount-val">{{ item.amount }}</text>
                <text class="amount-unit">元</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 贡献列表 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view 
          class="record-item animate-slide-up" 
          v-for="(item, index) in recordList.slice(0, 5)" 
          :key="index"
          :style="{ animationDelay: (index * 0.1) + 's' }"
          @click="handleDetail(item)"
        >
          <view class="record-left">
            <view class="record-info">
              <view class="title-row">
                <text class="record-title">{{ item.title }}</text>
                <text class="scene-tag" :class="item.scene === 'online' ? 'online' : 'offline'">
                  {{ item.scene === 'online' ? '线上' : '线下' }}
                </text>
              </view>
              <text class="record-date">{{ item.date }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-amount" :class="item.type === 'expense' ? 'expense' : 'contribution'">
              {{ item.type === 'expense' ? '-' : '+' }}{{ item.amount }}元
            </text>
          </view>
        </view>
        <view class="view-more-btn animate-fade-in" v-if="recordList.length > 5" style="animation-delay: 0.6s" @click="goToRecordList('all')">
          <text>查看更多明细</text>
          <t-icon name="chevron-right" size="32rpx" />
        </view>
        <view class="empty-state animate-fade-in" v-if="recordList.length === 0">
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无贡献记录</text>
        </view>
      </view>

      <!-- 我的贡献 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view 
          class="record-item animate-slide-up" 
          v-for="(item, index) in myContributionList.slice(0, 5)" 
          :key="index"
          :style="{ animationDelay: (index * 0.1) + 's' }"
          @click="handleDetail(item)"
        >
          <view class="record-left">
            <view class="record-info">
              <view class="title-row">
                <text class="record-title">{{ item.title }}</text>
                <text class="scene-tag" :class="item.scene === 'online' ? 'online' : 'offline'">
                  {{ item.scene === 'online' ? '线上' : '线下' }}
                </text>
              </view>
              <text class="record-status">{{ item.status }}</text>
              <text class="record-date">{{ item.date }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-amount contribution">
              +{{ item.amount }}元
            </text>
          </view>
        </view>
        <view class="view-more-btn animate-fade-in" v-if="myContributionList.length > 5" style="animation-delay: 0.6s" @click="goToRecordList('mine')">
          <text>查看更多明细</text>
          <t-icon name="chevron-right" size="32rpx" />
        </view>
        <view class="empty-state animate-fade-in" v-if="myContributionList.length === 0">
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无贡献记录</text>
        </view>
      </view>
    </scroll-view>

    <!-- Global Footer -->
    <app-footer />
    <app-tab-bar activePath="pages/index/index" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useFundStore } from '@/composables/useFundStore';

const { recordList: storeRecordList, totalBalanceFormatted: totalBalance } = useFundStore();

// 我的贡献列表：过滤出贡献类型的记录，并排除初始余额
const myContributionList = computed(() => {
  return storeRecordList.value
    .filter(item => item.type === 'contribution')
    .map(item => ({
      ...item,
      status: `成功消费${(parseFloat(item.amount) * 100).toFixed(2)}元`
    }));
});

// 贡献列表（用于 Tab 1）：排除初始余额显示，或者保留？用户说“金额应该是列表总和”，保留可能更好
const recordList = computed(() => storeRecordList.value);

const isLoading = ref(true);
const activeTab = ref(0);

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

const tabs = ['基本情况', '贡献列表', '我的贡献'];

const currentHouse = ref('阳光水岸一期 1-1-802');

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
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

const goToRecordList = (type: string = 'all') => {
  uni.navigateTo({
    url: `/pages/fund/community-fund-record-list?type=${type}`
  });
};

const handleDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/fund/community-fund-record-detail?data=${encodeURIComponent(JSON.stringify(item))}`
  });
};

// 模拟数据 - 贡献排行榜
const rankingList = ref([
  { rank: 1, name: '张**', amount: '156.40', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { rank: 2, name: '李**', amount: '142.85', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { rank: 3, name: '王**', amount: '128.60', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { rank: 4, name: '赵**', amount: '115.20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { rank: 5, name: '陈**', amount: '98.55', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb' }
]);

// 计算我的总贡献
const myTotalContribution = computed(() => {
  const total = myContributionList.value.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  return total.toFixed(2);
});

// 趋势图数据 - 动态获取最近6个月
const trendData = computed(() => {
  interface TrendItem {
    month: string;
    income: number;
    expense: number;
  }
  const data: TrendItem[] = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthlyRecords = recordList.value.filter(r => r.date.startsWith(yearMonth));
    const income = monthlyRecords
      .filter(r => r.type === 'contribution' || r.type === 'initial')
      .reduce((sum, r) => sum + parseFloat(r.amount), 0);
    const expense = monthlyRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + parseFloat(r.amount), 0);
    data.push({
      month: `${d.getMonth() + 1}月`,
      income: parseFloat(income.toFixed(2)),
      expense: parseFloat(expense.toFixed(2))
    });
  }
  return data;
});

const maxTrendValue = computed(() => {
  const values = trendData.value.flatMap(d => [d.income, d.expense]);
  const max = Math.max(...values);
  return max > 0 ? max * 1.2 : 1;
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding-bottom: 180rpx;
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
    margin-bottom: 0;
    position: relative;
    z-index: 2;
    margin-left: -20rpx;

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

      .illust-glass-card {
        position: absolute;
        background: rgba(255, 255, 255, 0.2);
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        border-radius: 20rpx;
        backdrop-filter: blur(8rpx);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
      }

      .card-back {
        width: 140rpx;
        height: 140rpx;
        right: 40rpx;
        top: 10rpx;
        transform: rotate(-15deg);
        opacity: 0.6;
      }

      .card-front {
        width: 160rpx;
        height: 160rpx;
        right: 10rpx;
        top: 30rpx;
        transform: rotate(5deg);
        z-index: 2;
        background: rgba(255, 255, 255, 0.25);
      }

      .illust-coin {
        position: absolute;
        width: 44rpx;
        height: 44rpx;
        background: linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%);
        border-radius: 50%;
        box-shadow: 0 4rpx 12rpx rgba(245, 158, 11, 0.4);
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;

        &::after {
          content: '¥';
          color: #fff;
          font-size: 22rpx;
          font-weight: bold;
        }
      }

      .coin-1 {
        right: 140rpx;
        top: 100rpx;
        animation: float-coin 3s ease-in-out infinite;
      }

      .coin-2 {
        right: 30rpx;
        top: -10rpx;
        width: 32rpx;
        height: 32rpx;
        animation: float-coin 4s ease-in-out infinite reverse;
        
        &::after {
          font-size: 16rpx;
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
  }

  @keyframes float-coin {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15rpx) rotate(10deg); }
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
}

.tab-content {
  padding: 30rpx;

  .balance-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .balance-header {
      margin-bottom: 16rpx;
      .label {
        font-size: 32rpx;
        color: #1E293B;
        font-weight: 500;
      }
      .sub-label {
        font-size: 20rpx;
        color: #94A3B8;
        margin-left: 12rpx;
      }
    }

    .balance-value {
      display: flex;
      align-items: baseline;
      .amount {
        font-size: 56rpx;
        font-weight: bold;
        color: #F59E0B;
      }
      .unit {
        font-size: 32rpx;
        color: #F59E0B;
        margin-left: 8rpx;
        font-weight: 500;
      }
    }

    .balance-icon-box {
      width: 100rpx;
      height: 100rpx;
      background: #FFF7ED;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .coin-icon {
        width: 64rpx;
        height: 64rpx;
        background: #F59E0B;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 32rpx;
        font-weight: bold;
        box-shadow: 0 4rpx 12rpx rgba(245, 158, 11, 0.4);
        animation: breathe 2s ease-in-out infinite;
      }
    }
  }

  .contribution-summary-card {
    position: relative;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 32rpx 40rpx;
    margin-bottom: 40rpx;
    overflow: hidden;
    box-shadow: 0 10rpx 30rpx rgba(59, 130, 246, 0.08);
    border: 1rpx solid #EFF6FF;
    cursor: pointer;
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.98);
      background-color: #F8FAFC;
    }

    .card-bg-decoration {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      pointer-events: none;

      .circle-1 {
        position: absolute;
        top: -60rpx;
        right: -60rpx;
        width: 200rpx;
        height: 200rpx;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%);
        border-radius: 50%;
      }

      .circle-2 {
        position: absolute;
        bottom: -40rpx;
        left: 20%;
        width: 120rpx;
        height: 120rpx;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0) 70%);
        border-radius: 50%;
      }
    }

    .card-content {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .summary-left {
      .label-group {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        .label {
          font-size: 26rpx;
          color: #64748B;
          font-weight: 500;
          letter-spacing: 1rpx;
        }
      }

      .summary-value {
        display: flex;
        align-items: baseline;
        padding-left: 4rpx;

        .amount {
          font-size: 52rpx;
          font-weight: 800;
          color: #2563EB;
        }
        .unit {
          font-size: 24rpx;
          color: #94A3B8;
          margin-left: 10rpx;
          font-weight: 500;
        }
      }
    }

    .summary-right {
      .view-btn {
        display: flex;
        align-items: center;
        gap: 6rpx;
        font-size: 22rpx;
        color: #3B82F6;
        background: #F0F7FF;
        padding: 12rpx 28rpx;
        border-radius: 100rpx;
        border: 1rpx solid #DBEAFE;
        font-weight: 600;

        &:active {
          background: #DBEAFE;
        }
      }
    }
  }

  @keyframes breathe {
    0% { transform: scale(1); box-shadow: 0 4rpx 12rpx rgba(245, 158, 11, 0.4); }
    50% { transform: scale(1.1); box-shadow: 0 8rpx 24rpx rgba(245, 158, 11, 0.6); }
    100% { transform: scale(1); box-shadow: 0 4rpx 12rpx rgba(245, 158, 11, 0.4); }
  }

  .info-list-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 10rpx 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .info-row {
      padding: 30rpx 0;
      border-bottom: 1rpx solid #F1F5F9;
      display: flex;
      flex-direction: column;

      &:last-child {
        border-bottom: none;
      }

      .i-label {
        font-size: 26rpx;
        color: #94A3B8;
        margin-bottom: 12rpx;
      }

      .i-value {
        font-size: 28rpx;
        color: #1E293B;
        font-weight: 500;
      }
    }
  }

  .chart-card {
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;

      .chart-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #1e293b;
      }

      .chart-legend {
        display: flex;
        gap: 20rpx;

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-size: 22rpx;
          color: #64748b;

          .dot {
            width: 12rpx;
            height: 12rpx;
            border-radius: 50%;
            &.income { background: #3B82F6; }
            &.expense { background: #EF4444; }
          }
        }
      }
    }

    .chart-body {
      display: flex;
      height: 300rpx;
      gap: 20rpx;

      .chart-y-axis {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 20rpx;
        color: #94a3b8;
        padding-bottom: 40rpx;
      }

      .chart-main {
        flex: 1;
        position: relative;
        
        .chart-grid {
          position: absolute;
          inset: 0 0 40rpx 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .grid-line {
            height: 1rpx;
            background: #f1f5f9;
          }
        }

        .bar-container {
          position: absolute;
          inset: 0 0 40rpx 0;
          display: flex;
          justify-content: space-between;
          padding: 0 10rpx;

          .bar-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            width: 14%;

            .bars {
              display: flex;
              align-items: flex-end;
              gap: 4rpx;
              height: 100%;
              width: 100%;

              .bar {
                flex: 1;
                border-radius: 4rpx 4rpx 0 0;
                position: relative;
                min-height: 4rpx;

                &.income { background: linear-gradient(to top, #3B82F6, #60A5FA); }
                &.expense { background: linear-gradient(to top, #EF4444, #F87171); }

                .bar-value {
                  position: absolute;
                  top: -30rpx;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 18rpx;
                  color: #94a3b8;
                  white-space: nowrap;
                }
              }
            }

            .bar-label {
              margin-top: 12rpx;
              font-size: 22rpx;
              color: #64748b;
              position: absolute;
              bottom: -40rpx;
            }
          }
        }
      }
    }

    .chart-footer {
      margin-top: 60rpx;
      text-align: right;
      .unit-text {
        font-size: 20rpx;
        color: #94a3b8;
      }
    }
  }

  .ranking-card {
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .ranking-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .title-group {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .ranking-title {
          font-size: 32rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .ranking-subtitle {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .ranking-list {
      .ranking-item {
        display: flex;
        align-items: center;
        padding: 24rpx 0;
        border-bottom: 1rpx solid #F8FAFC;

        &:last-child {
          border-bottom: none;
        }

        .rank-num {
          width: 60rpx;
          height: 60rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          font-weight: bold;
          color: #64748B;
          margin-right: 20rpx;

          &.rank-1 { color: #F59E0B; }
          &.rank-2 { color: #94A3B8; }
          &.rank-3 { color: #B45309; }
        }

        .user-avatar {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          margin-right: 24rpx;
          background: #F1F5F9;
          border: 2rpx solid #FFFFFF;
          box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
        }

        .user-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4rpx;

          .user-name {
            font-size: 30rpx;
            font-weight: 600;
            color: #334155;
          }
        }

        .user-amount {
          text-align: right;
          .amount-val {
            font-size: 32rpx;
            font-weight: 700;
            color: #F59E0B;
            margin-right: 4rpx;
          }
          .amount-unit {
            font-size: 20rpx;
            color: #94A3B8;
          }
        }
      }
    }
  }

  .record-item {
    background: #fff;
    padding: 30rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

    .record-left {
      display: flex;
      align-items: center;
      gap: 24rpx;

      .record-type {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        font-weight: 500;

        &.in { background: #EFF6FF; color: #3B82F6; }
        &.out { background: #F8FAFC; color: #64748B; }
      }

      .record-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .title-row {
          display: flex;
          align-items: center;
          gap: 12rpx;
        }

        .record-title {
          font-size: 28rpx;
          color: #1E293B;
          font-weight: 500;
        }

        .scene-tag {
          font-size: 20rpx;
          padding: 2rpx 12rpx;
          border-radius: 6rpx;
          font-weight: 500;

          &.online {
            background: #E0F2FE;
            color: #0284C7;
          }

          &.offline {
            background: #F0FDF4;
            color: #16A34A;
          }
        }

        .record-status {
          font-size: 24rpx;
          color: #64748B;
        }

        .record-date {
          font-size: 24rpx;
          color: #94A3B8;
        }
      }
    }

    .record-right {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .record-amount {
        font-size: 32rpx;
        font-weight: bold;

        &.contribution { color: #F59E0B; }
        &.expense { color: #EF4444; }
      }
    }
  }

  .view-more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    padding: 30rpx;
    font-size: 26rpx;
    color: #94A3B8;

    &:active {
      opacity: 0.7;
    }
  }

  .empty-state {
    padding: 100rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    color: #94A3B8;
    font-size: 28rpx;
  }
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.5s ease-out forwards;
}

.animate-grow-up {
  transform-origin: bottom;
  animation: grow-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30rpx); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes grow-up {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

// Skeleton Styles
.skeleton-list {
  .skeleton-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    overflow: hidden;
    position: relative;

    .skeleton-item {
      background: #f1f5f9;
      position: relative;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        animation: skeleton-loading 1.5s infinite;
      }
    }
  }

  .balance-skel {
    height: 200rpx;
    .title-skel { width: 200rpx; height: 32rpx; margin-bottom: 24rpx; border-radius: 4rpx; }
    .amount-skel { width: 300rpx; height: 60rpx; border-radius: 4rpx; }
  }

  .summary-skel {
    height: 160rpx;
    .title-skel { width: 160rpx; height: 28rpx; margin-bottom: 20rpx; border-radius: 4rpx; }
    .value-skel { width: 240rpx; height: 48rpx; border-radius: 4rpx; }
  }

  .chart-skel {
    height: 400rpx;
    .title-skel { width: 280rpx; height: 32rpx; margin-bottom: 40rpx; border-radius: 4rpx; }
    .bars-skel { width: 100%; height: 240rpx; border-radius: 4rpx; }
  }

  .ranking-skel {
    .title-skel { width: 240rpx; height: 32rpx; margin-bottom: 30rpx; border-radius: 4rpx; }
    .rank-item-skel {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      .avatar-skel { width: 80rpx; height: 80rpx; border-radius: 50%; margin-right: 20rpx; }
      .info-skel { flex: 1; height: 32rpx; border-radius: 4rpx; }
    }
  }
}

@keyframes skeleton-loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
