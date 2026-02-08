<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">共有资金</text>
      <view class="placeholder"></view>
    </view>

    <!-- 资金概览卡片 -->
    <view class="summary-card">
      <view class="card-header">
        <text class="card-title">资金总览</text>
        <view class="year-selector">
          <text>2024年度</text>
          <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
        </view>
      </view>
      <view class="total-amount">
        <text class="label">账户当前余额 (元)</text>
        <text class="value">1,258,460.00</text>
      </view>
      <view class="stats-row">
        <view class="stats-item">
          <text class="label">本年累计收入</text>
          <text class="value income">+ 45,200.00</text>
        </view>
        <view class="stats-item">
          <text class="label">本年累计支出</text>
          <text class="value expense">- 12,800.00</text>
        </view>
      </view>
    </view>

    <!-- 筛选标签 -->
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

    <!-- 资金明细列表 -->
    <scroll-view scroll-y class="list-container">
      <view class="record-card" v-for="(item, index) in filteredRecords" :key="index">
        <view class="record-left">
          <view class="record-icon" :class="item.type">
            <t-icon :name="item.type === 'income' ? 'add' : 'remove'" size="40rpx" color="#fff" />
          </view>
          <view class="record-info">
            <text class="record-title">{{ item.title }}</text>
            <text class="record-time">{{ item.time }}</text>
          </view>
        </view>
        <view class="record-right">
          <text class="record-amount" :class="item.type">
            {{ item.type === 'income' ? '+' : '-' }} {{ item.amount }}
          </text>
          <text class="record-status">已结算</text>
        </view>
      </view>
      
      <!-- 加载更多/无更多数据 -->
      <view class="load-more">
        <text>没有更多明细了</text>
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
const tabs = ['全部', '收入明细', '支出明细'];

const records = ref([
  {
    title: '公共广告位租赁收益',
    time: '2024-02-05 14:30',
    amount: '12,000.00',
    type: 'income',
    category: '收入'
  },
  {
    title: '电梯维保服务费用',
    time: '2024-02-01 10:00',
    amount: '5,800.00',
    type: 'expense',
    category: '支出'
  },
  {
    title: '小区公共路灯维修',
    time: '2024-01-28 16:20',
    amount: '1,200.00',
    type: 'expense',
    category: '支出'
  },
  {
    title: '地面车位管理费分成',
    time: '2024-01-20 09:15',
    amount: '25,600.00',
    type: 'income',
    category: '收入'
  },
  {
    title: '春节社区装饰采购',
    time: '2024-01-15 11:40',
    amount: '3,500.00',
    type: 'expense',
    category: '支出'
  },
  {
    title: '快递柜场地占用费',
    time: '2024-01-10 15:30',
    amount: '7,600.00',
    type: 'income',
    category: '收入'
  }
]);

const filteredRecords = computed(() => {
  if (activeTab.value === 1) return records.value.filter(r => r.type === 'income');
  if (activeTab.value === 2) return records.value.filter(r => r.type === 'expense');
  return records.value;
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

  .stats-row {
    display: flex;
    justify-content: space-between;
    padding-top: 32rpx;
    border-top: 2rpx solid #F1F5F9;

    .stats-item {
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
        font-family: 'DIN Alternate', sans-serif;

        &.income {
          color: #10B981;
        }

        &.expense {
          color: #EF4444;
        }
      }
    }
  }
}

.tabs-container {
  display: flex;
  background: #FFFFFF;
  padding: 0 32rpx;
  position: sticky;
  top: 0;
  z-index: 20;
  margin-bottom: 20rpx;

  .tab-item {
    flex: 1;
    height: 88rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

.record-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  margin-bottom: 20rpx;

  .record-left {
    display: flex;
    align-items: center;

    .record-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;

      &.income {
        background: rgba(16, 185, 129, 0.1);
        :deep(.t-icon) { color: #10B981 !important; }
      }

      &.expense {
        background: rgba(239, 68, 68, 0.1);
        :deep(.t-icon) { color: #EF4444 !important; }
      }
    }

    .record-info {
      display: flex;
      flex-direction: column;

      .record-title {
        font-size: 28rpx;
        font-weight: 500;
        color: #1E293B;
        margin-bottom: 8rpx;
      }

      .record-time {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }

  .record-right {
    text-align: right;

    .record-amount {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      font-family: 'DIN Alternate', sans-serif;
      margin-bottom: 4rpx;

      &.income {
        color: #10B981;
      }

      &.expense {
        color: #1E293B;
      }
    }

    .record-status {
      font-size: 22rpx;
      color: #94A3B8;
    }
  }
}

.load-more {
  text-align: center;
  padding: 40rpx 0;
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}
</style>
