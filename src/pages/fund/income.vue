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
          <text class="sub-title">公开透明可监督</text>
          <view class="house-info" @click="goToBindHouse">
            <t-icon name="swap" size="28rpx" color="#fff" class="swap-icon" />
            <text>{{ currentHouse }}</text>
          </view>
        </view>
        <view class="header-illustration">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <t-icon name="wallet" size="64rpx" color="#fff" />
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
      <view class="tab-content" v-if="isLoading">
        <view class="skeleton-card balance-skeleton"></view>
        <view class="skeleton-card info-skeleton"></view>
        <view class="skeleton-card chart-skeleton"></view>
      </view>

      <!-- 基本情况 Tab -->
      <view class="tab-content" v-else-if="activeTab === 0">
        <!-- Balance Card -->
        <view class="balance-card animate-fade-in">
          <view class="balance-info">
            <view class="balance-header">
              <text class="label">小区数字基金余额</text>
              <text class="sub-label">(数据来源于银行)</text>
            </view>
            <view class="balance-value">
              <text class="amount">12.85</text>
              <text class="unit">万元</text>
            </view>
          </view>
          <view class="balance-icon-box">
            <view class="coin-icon">¥</view>
          </view>
        </view>

        <!-- Bank Info Card -->
        <view class="info-list-card animate-fade-in" style="animation-delay: 0.1s">
          <view class="info-row">
            <text class="i-label">银行账户</text>
            <text class="i-value">{{ bankInfo.name }}</text>
          </view>
          <view class="info-row">
            <text class="i-label">银行账号</text>
            <text class="i-value">{{ bankInfo.account }}</text>
          </view>
          <view class="info-row">
            <text class="i-label">开户银行</text>
            <text class="i-value">{{ bankInfo.bank }}</text>
          </view>
        </view>

        <!-- Trend Chart Card -->
        <view class="chart-card animate-fade-in" style="animation-delay: 0.2s">
          <view class="chart-header">
            <text class="chart-title">收支趋势量</text>
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
                        animationDelay: (0.3 + index * 0.1) + 's'
                      }"
                    >
                      <text class="bar-value" v-if="item.income > 0.5">{{ item.income }}</text>
                    </view>
                    <view 
                      class="bar expense animate-grow-up" 
                      :style="{ 
                        height: (item.expense / maxTrendValue * 100) + '%',
                        animationDelay: (0.4 + index * 0.1) + 's'
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
            <text class="unit-text">单位：万元</text>
          </view>
        </view>
      </view>

      <!-- 收支记录 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view 
          class="record-item" 
          v-for="(item, index) in recordList.slice(0, 5)" 
          :key="index"
          @click="handleDetail(item)"
        >
          <view class="record-left">
            <view class="record-type" :class="item.type">{{ item.typeText }}</view>
            <view class="record-info">
              <text class="record-title">{{ item.title }}</text>
              <text class="record-date">{{ item.date }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-amount" :class="item.type">
              {{ item.type === 'in' ? '+' : '-' }}{{ item.amount }}
            </text>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
        </view>
        <view class="view-more-btn" v-if="recordList.length > 5" @click="goToRecordList">
          <text>查看更多明细</text>
          <t-icon name="chevron-right" size="32rpx" />
        </view>
        <view class="empty-state" v-if="recordList.length === 0">
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无收支记录</text>
        </view>
      </view>

      <!-- 合同 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view class="contract-card" v-for="(item, index) in contractList" :key="index">
          <view class="contract-header">
            <t-icon name="file-base" size="40rpx" color="#3B82F6" />
            <text class="contract-title">{{ item.title }}</text>
          </view>
          <view class="contract-body">
            <view class="contract-row">
              <text class="c-label">签署单位：</text>
              <text class="c-value">{{ item.company }}</text>
            </view>
            <view class="contract-row">
              <text class="c-label">有效期限：</text>
              <text class="c-value">{{ item.period }}</text>
            </view>
          </view>
          <view class="contract-footer">
            <text class="view-btn">查看电子合同</text>
          </view>
        </view>
        <view class="empty-state" v-if="contractList.length === 0">
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无合同信息</text>
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

const isLoading = ref(true);
const activeTab = ref(0);

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

const tabs = ['基本情况', '收支记录', '合同'];

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

const goToRecordList = () => {
  uni.navigateTo({
    url: '/pages/fund/income-record-list'
  });
};

const handleDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/fund/income-record-detail?data=${encodeURIComponent(JSON.stringify(item))}`
  });
};

// 模拟数据 - 银行信息
const bankInfo = ref({
  name: '阳光水岸一期业主委员会',
  account: '6222 **** **** 8892',
  bank: '中国建设银行赣州分行'
});

// 模拟数据 - 收支记录
const recordList = ref([
  {
    title: '电梯广告位租金收入',
    date: '2026-02-01',
    amount: '16000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '电梯维保支出',
    date: '2026-02-05',
    amount: '9500.00',
    type: 'out',
    typeText: '支出'
  },
  {
    title: '小区停车位租赁收入',
    date: '2026-01-20',
    amount: '22000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '春节氛围装饰采购',
    date: '2026-01-10',
    amount: '14000.00',
    type: 'out',
    typeText: '支出'
  },
  {
    title: '外墙广告位收益',
    date: '2025-12-15',
    amount: '18000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '公共区域照明维修',
    date: '2025-12-05',
    amount: '12000.00',
    type: 'out',
    typeText: '支出'
  },
  {
    title: '快递柜场地租赁费',
    date: '2025-11-30',
    amount: '11000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '垃圾分类宣传费',
    date: '2025-11-10',
    amount: '7500.00',
    type: 'out',
    typeText: '支出'
  },
  {
    title: '路面停车位收益',
    date: '2025-10-25',
    amount: '15000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '小区绿化补植支出',
    date: '2025-10-10',
    amount: '9000.00',
    type: 'out',
    typeText: '支出'
  },
  {
    title: '共有用房出租收益',
    date: '2025-09-15',
    amount: '12000.00',
    type: 'in',
    typeText: '收入'
  },
  {
    title: '中秋节物业慰问支出',
    date: '2025-09-05',
    amount: '8000.00',
    type: 'out',
    typeText: '支出'
  }
]);

// 趋势图数据 - 动态获取最近6个月
const trendData = computed(() => {
  interface TrendItem {
    month: string;
    income: number;
    expense: number;
  }
  const data: TrendItem[] = [];
  const now = new Date();
  if (!recordList.value || !Array.isArray(recordList.value)) return data;

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthlyRecords = recordList.value.filter(r => r.date && typeof r.date === 'string' && r.date.startsWith(yearMonth));
    const income = monthlyRecords
      .filter(r => r.type === 'in')
      .reduce((sum, r) => {
        const amt = parseFloat(r.amount);
        return sum + (isNaN(amt) ? 0 : amt);
      }, 0) / 10000;
    const expense = monthlyRecords
      .filter(r => r.type === 'out')
      .reduce((sum, r) => {
        const amt = parseFloat(r.amount);
        return sum + (isNaN(amt) ? 0 : amt);
      }, 0) / 10000;
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
  return max > 0 ? max * 1.2 : 1; // 增加20%余量，避免触顶
});

const contractList = ref([
  {
    title: '分众传媒电梯广告租赁合同',
    company: '分众传媒有限公司',
    period: '2026-01-01 至 2027-12-31'
  },
  {
    title: '小区快递柜进驻协议',
    company: '丰巢科技有限公司',
    period: '2024-06-01 至 2027-05-31'
  },
  {
    title: '共有用房租赁协议 - A栋底商',
    company: '悦生活超市',
    period: '2023-08-01 至 2026-07-31'
  },
  {
    title: '饮水机场地租赁协议',
    company: '农夫山泉股份有限公司',
    period: '2026-01-01 至 2027-12-31'
  }
]);
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
    margin-bottom: 30rpx;
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
        color: #EF4444;
      }
      .unit {
        font-size: 32rpx;
        color: #EF4444;
        margin-left: 8rpx;
        font-weight: 500;
      }
    }

    .balance-icon-box {
      width: 100rpx;
      height: 100rpx;
      background: #EFF6FF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .coin-icon {
        width: 64rpx;
        height: 64rpx;
        background: #3B82F6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 32rpx;
        font-weight: bold;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.4);
        animation: breathe 2s ease-in-out infinite;
      }
    }
  }

  @keyframes breathe {
    0% {
      transform: scale(1);
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.4);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.6);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.4);
    }
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
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-top: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

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
            width: 16rpx;
            height: 16rpx;
            border-radius: 4rpx;

            &.income {
              background: #3B82F6;
            }

            &.expense {
              background: #F97316;
            }
          }
        }
      }
    }

    .chart-body {
      height: 320rpx;
      display: flex;
      gap: 20rpx;
      position: relative;

      .chart-y-axis {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 40rpx;
        font-size: 20rpx;
        color: #94a3b8;
        width: 40rpx;
        text-align: right;
      }

      .chart-main {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;

        .chart-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 40rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;

          .grid-line {
            height: 1rpx;
            background: #f1f5f9;
            width: 100%;
          }
        }

        .bar-container {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          padding-bottom: 40rpx; // 这里的 padding 留给轴标签
          z-index: 1;

          .bar-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            height: 100%;
            justify-content: flex-end;
            position: relative;

            .bars {
              height: 240rpx;
              display: flex;
              align-items: flex-end;
              gap: 4rpx;
              width: 100%;
              justify-content: center;
              margin-bottom: 12rpx; // 与标签的间距

              .bar {
                width: 16rpx;
                border-radius: 4rpx 4rpx 0 0;
                position: relative;
                transition: height 0.3s ease;

                &.income {
                  background: linear-gradient(to top, #3B82F6, #60A5FA);
                }

                &.expense {
                  background: linear-gradient(to top, #F97316, #FB923C);
                }

                .bar-value {
                  position: absolute;
                  top: -32rpx;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 18rpx;
                  color: #64748b;
                  white-space: nowrap;
                  font-weight: 500;
                }
              }
            }

            .bar-label {
              font-size: 22rpx;
              color: #64748b;
              line-height: 1;
            }
          }
        }
      }
    }

    .chart-footer {
      margin-top: 10rpx;
      text-align: right;
      
      .unit-text {
        font-size: 20rpx;
        color: #94a3b8;
      }
    }
  }

  .record-item {
    background: #FFFFFF;
    padding: 30rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .record-left {
      display: flex;
      align-items: center;

      .record-type {
        width: 80rpx;
        height: 40rpx;
        font-size: 22rpx;
        border-radius: 8rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;

        &.in {
          background: #F0FDF4;
          color: #10B981;
        }
        &.out {
          background: #FEF2F2;
          color: #EF4444;
        }
      }

      .record-info {
        .record-title {
          font-size: 28rpx;
          color: #1E293B;
          font-weight: 500;
          margin-bottom: 4rpx;
          display: block;
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
        font-size: 30rpx;
        font-weight: 600;

        &.in {
          color: #10B981;
        }
        &.out {
          color: #1E293B;
        }
      }
    }
  }

  .view-more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    padding: 30rpx 0;
    color: #64748B;
    font-size: 26rpx;
    
    &:active {
      opacity: 0.7;
    }
  }

  .contract-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .contract-header {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #F1F5F9;

      .contract-title {
        font-size: 30rpx;
        font-weight: 500;
        color: #1E293B;
        margin-left: 16rpx;
      }
    }

    .contract-body {
      .contract-row {
        display: flex;
        margin-bottom: 12rpx;
        font-size: 26rpx;

        .c-label {
          color: #94A3B8;
          width: 140rpx;
        }
        .c-value {
          color: #475569;
          flex: 1;
        }
      }
    }

    .contract-footer {
      margin-top: 30rpx;
      display: flex;
      justify-content: flex-end;

      .view-btn {
        font-size: 24rpx;
        color: #3B82F6;
        padding: 8rpx 24rpx;
        border: 1rpx solid #3B82F6;
        border-radius: 30rpx;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    color: #94A3B8;
    font-size: 28rpx;

    text {
      margin-top: 20rpx;
    }
  }

  // --- Animations & Skeletons ---
  .skeleton-card {
    background: #fff;
    border-radius: 24rpx;
    margin-bottom: 30rpx;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
      animation: skeleton-loading 1.5s infinite;
    }
  }

  .balance-skeleton { height: 220rpx; }
  .info-skeleton { height: 380rpx; }
  .chart-skeleton { height: 450rpx; }

  @keyframes skeleton-loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out both;
  }

  .animate-grow-up {
    transform-origin: bottom;
    animation: growUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20rpx); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes growUp {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
}
</style>
