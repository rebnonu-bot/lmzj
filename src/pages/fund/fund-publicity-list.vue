<template>
  <view class="page-container">
    <t-navbar
      title="维修公示明细"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <!-- Summary Stats -->
    <view class="stats-card">
      <view class="stats-item">
        <text class="label">项目总数 (项)</text>
        <text class="value">{{ filteredList.length }}</text>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <text class="label">预估总额 (万元)</text>
        <text class="value">{{ totalAmount }}</text>
      </view>
    </view>

    <!-- Filter Bar -->
    <view class="filter-container">
      <view class="filter-bar">
        <view class="date-picker" @click="showPicker = true">
          <text>{{ selectedYear }}年{{ selectedMonth }}月</text>
          <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
        </view>
        <view class="total-count">共 {{ filteredList.length }} 条记录</view>
      </view>
      
      <view class="status-tabs">
        <view 
          v-for="status in statusOptions" 
          :key="status.value"
          class="status-tab"
          :class="{ active: activeStatus === status.value }"
          @click="activeStatus = status.value"
        >
          {{ status.label }}
        </view>
      </view>
    </view>

    <!-- Publicity List -->
    <scroll-view scroll-y class="list-scroll">
      <view class="publicity-list" v-if="filteredList.length > 0">
        <view 
          v-for="(item, index) in filteredList" 
          :key="index" 
          class="publicity-card"
          @click="handleDetail(item)"
        >
          <view class="card-header">
            <text class="title">{{ item.title }}</text>
            <view class="status-tag" :class="getStatusClass(item.status)">{{ item.status }}</view>
          </view>
          
          <view class="card-body">
            <view class="info-row">
              <text class="label">公示时间：</text>
              <text class="value">{{ item.date }}</text>
            </view>
            <view class="info-row">
              <text class="label">预估金额：</text>
              <text class="value highlight">¥{{ item.amount }} 万元</text>
            </view>
          </view>
          
          <view class="card-footer">
            <text class="view-btn">查看详情</text>
            <t-icon name="chevron-right" size="32rpx" color="#94A3B8" />
          </view>
        </view>
        <view class="no-more">已显示全部公示项目</view>
      </view>

      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#E2E8F0" />
        <text class="empty-text">{{ selectedYear }}年{{ selectedMonth }}月暂无维修公示记录</text>
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

interface PublicityItem {
  title: string;
  date: string;
  amount: string;
  status: string;
}

const selectedYear = ref('2026');
const selectedMonth = ref('01');
const showPicker = ref(false);
const activeStatus = ref('all');

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: '进行中' },
  { label: '已完成', value: '已完成' },
  { label: '已公示', value: '已公示' }
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

const publicityList = ref<PublicityItem[]>([
  {
    title: '1号楼电梯钢丝绳更换工程',
    date: '2026-01-15',
    status: '进行中',
    amount: '4.50'
  },
  {
    title: '小区监控系统升级改造',
    date: '2026-01-20',
    status: '已公示',
    amount: '2.80'
  },
  {
    title: '地库排水泵检修',
    date: '2026-01-05',
    status: '已完成',
    amount: '0.65'
  },
  {
    title: '2号楼外墙脱落维修',
    date: '2025-12-12',
    status: '已完成',
    amount: '1.20'
  },
  {
    title: '小区消防管道渗漏维修',
    date: '2025-11-28',
    status: '已完成',
    amount: '0.85'
  },
  {
    title: '单元门禁系统维护',
    date: '2025-10-15',
    status: '已完成',
    amount: '0.45'
  },
  {
    title: '屋面防水补强工程',
    date: '2025-09-20',
    status: '已完成',
    amount: '1.65'
  },
  {
    title: '生活水泵房变频器更换',
    date: '2025-08-10',
    status: '已完成',
    amount: '0.35'
  }
]);

const filteredList = computed(() => {
  const prefix = `${selectedYear.value}-${selectedMonth.value}`;
  return publicityList.value.filter(item => {
    const matchDate = item.date.startsWith(prefix);
    const matchStatus = activeStatus.value === 'all' || item.status === activeStatus.value;
    return matchDate && matchStatus;
  });
});

const totalAmount = computed(() => {
  return filteredList.value.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);
});

const handleBack = () => {
  uni.navigateBack();
};

const onDateConfirm = (e: any) => {
  selectedYear.value = e.value[0];
  selectedMonth.value = e.value[1];
  showPicker.value = false;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case '进行中': return 'ongoing';
    case '已完成': return 'completed';
    case '已公示': return 'posted';
    default: return '';
  }
};

const handleDetail = (item: PublicityItem) => {
  uni.showToast({
    title: '查看公示详情',
    icon: 'none'
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

.stats-card {
  background: linear-gradient(135deg, #10B981, #059669);
  margin: 24rpx @page-padding;
  padding: 40rpx;
  border-radius: @radius-large;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8rpx 20rpx rgba(16, 185, 129, 0.2);

  .stats-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .label {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.8);
    }

    .value {
      font-size: 44rpx;
      font-weight: 700;
      color: #FFFFFF;
    }
  }

  .stats-divider {
    width: 2rpx;
    height: 60rpx;
    background: rgba(255, 255, 255, 0.2);
  }
}

.filter-container {
  background: #FFFFFF;
  position: sticky;
  top: 100rpx;
  z-index: 10;
  border-bottom: 2rpx solid #F1F5F9;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx @page-padding 12rpx;

  .date-picker {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 10rpx 24rpx;
    background: #F8FAFC;
    border-radius: 30rpx;
    
    text {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;
    }
  }

  .total-count {
    font-size: 26rpx;
    color: #94A3B8;
  }
}

.status-tabs {
  display: flex;
  gap: 24rpx;
  padding: 12rpx @page-padding 24rpx;
  
  .status-tab {
    font-size: 24rpx;
    color: #64748B;
    padding: 8rpx 24rpx;
    border-radius: 24rpx;
    background: #F1F5F9;
    transition: all 0.3s;

    &.active {
      background: #10B981;
      color: #FFFFFF;
    }
  }
}

.list-scroll {
  flex: 1;
}

.publicity-list {
  padding: 24rpx @page-padding;
}

.publicity-card {
  background: #FFFFFF;
  border-radius: @radius-large;
  margin-bottom: 24rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24rpx;

    .title {
      flex: 1;
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-right: 20rpx;
    }

    .status-tag {
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;
      
      &.ongoing { background: #ECFDF5; color: #10B981; }
      &.completed { background: #F1F5F9; color: #64748B; }
      &.posted { background: #EFF6FF; color: #3B82F6; }
    }
  }

  .card-body {
    background: #F8FAFC;
    padding: 20rpx;
    border-radius: 12rpx;
    margin-bottom: 24rpx;

    .info-row {
      display: flex;
      margin-bottom: 12rpx;
      &:last-child { margin-bottom: 0; }

      .label {
        font-size: 24rpx;
        color: #94A3B8;
        width: 130rpx;
      }

      .value {
        font-size: 24rpx;
        color: #475569;
        flex: 1;

        &.highlight {
          color: #EF4444;
          font-weight: 600;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4rpx;
    padding-top: 20rpx;
    border-top: 2rpx solid #F1F5F9;

    .view-btn {
      font-size: 24rpx;
      color: #94A3B8;
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
