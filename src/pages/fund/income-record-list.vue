<template>
  <view class="page-container">
    <t-navbar
      title="收支明细"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <!-- Summary Stats -->
    <view class="summary-stats">
      <view class="stat-item income">
        <text class="label">本月收入 (元)</text>
        <text class="value">+{{ monthlyStats.income }}</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item expense">
        <text class="label">本月支出 (元)</text>
        <text class="value">-{{ monthlyStats.expense }}</text>
      </view>
    </view>

    <!-- Filter Bar -->
    <view class="filter-bar">
      <view class="date-picker" @click="showPicker = true">
        <text>{{ selectedYear }}年{{ selectedMonth }}月</text>
        <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
      </view>
      <view class="type-filter">
        <view 
          v-for="type in filterTypes" 
          :key="type.value"
          class="type-tag"
          :class="{ active: activeType === type.value }"
          @click="activeType = type.value"
        >
          {{ type.label }}
        </view>
      </view>
    </view>

    <!-- Record List -->
    <scroll-view scroll-y class="list-scroll">
      <view class="record-list" v-if="filteredRecords.length > 0">
        <view 
          v-for="(item, index) in filteredRecords" 
          :key="index" 
          class="record-card"
          @click="handleDetail(item)"
        >
          <view class="card-left">
            <view class="icon-box" :class="item.type">
              <t-icon :name="item.type === 'in' ? 'arrow-up' : 'arrow-down'" size="40rpx" color="#FFFFFF" />
            </view>
            <view class="record-info">
              <text class="record-title">{{ item.title }}</text>
              <text class="record-date">{{ item.date }} {{ item.time || '10:00:00' }}</text>
            </view>
          </view>
          <view class="card-right">
            <text class="amount" :class="item.type">
              {{ item.type === 'in' ? '+' : '-' }}{{ formatAmount(item.amount) }}
            </text>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
        </view>
        <view class="no-more">已显示全部记录</view>
      </view>

      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#E2E8F0" />
        <text class="empty-text">{{ selectedYear }}年{{ selectedMonth }}月暂无收支明细</text>
      </view>
    </scroll-view>

    <!-- Date Picker -->
    <t-picker
      v-model:visible="showPicker"
      :value="[selectedYear, selectedMonth]"
      title="选择日期"
      cancel-btn="取消"
      confirm-btn="确定"
      @confirm="onDateConfirm"
      @cancel="showPicker = false"
    >
      <t-picker-item :options="yearOptions" />
      <t-picker-item :options="monthOptions" />
    </t-picker>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface IncomeRecord {
  title: string;
  date: string;
  time?: string;
  amount: string;
  type: 'in' | 'out';
  typeText: string;
  category?: string;
}

const selectedYear = ref('2026');
const selectedMonth = ref('02');
const showPicker = ref(false);
const activeType = ref('all');

const filterTypes = [
  { label: '全部', value: 'all' },
  { label: '收入', value: 'in' },
  { label: '支出', value: 'out' }
];

const yearOptions = [
  { label: '2026年', value: '2026' },
  { label: '2025年', value: '2025' },
  { label: '2024年', value: '2024' }
];

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${String(i + 1).padStart(2, '0')}月`,
  value: String(i + 1).padStart(2, '0')
}));

const recordList = ref<IncomeRecord[]>([
  {
    title: '电梯广告位租金收入',
    date: '2026-02-01',
    time: '14:30:22',
    amount: '16000.00',
    type: 'in',
    typeText: '收入',
    category: '广告收益'
  },
  {
    title: '电梯维保支出',
    date: '2026-02-05',
    time: '09:15:45',
    amount: '9500.00',
    type: 'out',
    typeText: '支出',
    category: '设施维修'
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
    date: '2026-01-15',
    amount: '18000.00',
    type: 'in',
    typeText: '收入'
  }
]);

const filteredRecords = computed(() => {
  return recordList.value.filter(item => {
    const matchDate = item.date.startsWith(`${selectedYear.value}-${selectedMonth.value}`);
    const matchType = activeType.value === 'all' || item.type === activeType.value;
    return matchDate && matchType;
  });
});

const monthlyStats = computed(() => {
  const income = filteredRecords.value
    .filter(item => item.type === 'in')
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const expense = filteredRecords.value
    .filter(item => item.type === 'out')
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);
  return {
    income: income.toLocaleString('en-US', { minimumFractionDigits: 2 }),
    expense: expense.toLocaleString('en-US', { minimumFractionDigits: 2 })
  };
});

const handleBack = () => {
  uni.navigateBack();
};

const onDateConfirm = (e: any) => {
  selectedYear.value = e.value[0];
  selectedMonth.value = e.value[1];
  showPicker.value = false;
};

const formatAmount = (amount: string) => {
  return parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
};

const handleDetail = (item: IncomeRecord) => {
  uni.navigateTo({
    url: `/pages/fund/income-record-detail?data=${encodeURIComponent(JSON.stringify(item))}`
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding-top: 100rpx;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.summary-stats {
  background: #FFFFFF;
  margin: 24rpx @page-padding;
  padding: 30rpx;
  border-radius: @radius-large;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .label {
      font-size: 24rpx;
      color: #94A3B8;
    }

    .value {
      font-size: 32rpx;
      font-weight: 700;
      
      &.income { color: #10B981; }
      &.expense { color: #EF4444; }
    }
  }

  .stat-divider {
    width: 2rpx;
    height: 50rpx;
    background: #F1F5F9;
  }
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx @page-padding;
  background: #FFFFFF;
  position: sticky;
  top: 100rpx;
  z-index: 10;
  border-bottom: 2rpx solid #F1F5F9;

  .date-picker {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 10rpx 24rpx;
    background: #F8FAFC;
    border-radius: 30rpx;
    
    text {
      font-size: 26rpx;
      color: #1E293B;
      font-weight: 600;
    }
  }

  .type-filter {
    display: flex;
    gap: 16rpx;

    .type-tag {
      font-size: 24rpx;
      color: #64748B;
      padding: 8rpx 20rpx;
      border-radius: 24rpx;
      background: #F1F5F9;
      transition: all 0.3s;

      &.active {
        background: #3B82F6;
        color: #FFFFFF;
      }
    }
  }
}

.list-scroll {
  flex: 1;
}

.record-list {
  padding: 24rpx @page-padding;
}

.record-card {
  background: #FFFFFF;
  padding: 30rpx;
  border-radius: @radius-large;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

  .card-left {
    display: flex;
    align-items: center;
    gap: 24rpx;

    .icon-box {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &.in { background: rgba(16, 185, 129, 0.1); :deep(.t-icon) { color: #10B981 !important; } }
      &.out { background: rgba(239, 68, 68, 0.1); :deep(.t-icon) { color: #EF4444 !important; } }
    }

    .record-info {
      .record-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #1E293B;
        display: block;
        margin-bottom: 8rpx;
      }
      .record-date {
        font-size: 22rpx;
        color: #94A3B8;
      }
    }
  }

  .card-right {
    display: flex;
    align-items: center;
    gap: 12rpx;

    .amount {
      font-size: 32rpx;
      font-weight: 700;
      
      &.in { color: #10B981; }
      &.out { color: #1E293B; }
    }
  }
}

.no-more {
  text-align: center;
  font-size: 24rpx;
  color: #CBD5E1;
  padding: 20rpx 0 40rpx;
}

.empty-state {
  padding-top: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #94A3B8;
  }
}
</style>
