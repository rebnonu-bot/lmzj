<template>
  <view class="page-container">
    <t-navbar
      title="维修资金使用明细"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <!-- Summary Stats -->
    <view class="stats-card">
      <view class="stats-item">
        <text class="label">使用总额 (万元)</text>
        <text class="value">{{ totalUsed }}</text>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <text class="label">使用次数 (次)</text>
        <text class="value">{{ totalTimes }}</text>
      </view>
    </view>

    <!-- Filter Bar -->
    <view class="filter-bar">
      <view class="date-picker" @click="showPicker = true">
        <text>{{ selectedYear }}年{{ selectedMonth }}月</text>
        <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
      </view>
      <view class="total-count">共 {{ filteredList.length }} 条记录</view>
    </view>

    <!-- Usage List -->
    <scroll-view scroll-y class="list-scroll">
      <view class="usage-list" v-if="filteredList.length > 0">
        <view 
          v-for="(item, index) in filteredList" 
          :key="index" 
          class="usage-card"
        >
          <view class="card-header">
            <view class="title-section">
              <view class="type-dot"></view>
              <text class="title">{{ item.title }}</text>
            </view>
            <text class="amount">-{{ item.amount }}万</text>
          </view>
          
          <view class="card-body">
            <view class="info-row">
              <text class="label">使用时间：</text>
              <text class="value">{{ item.date }}</text>
            </view>
            <view class="info-row">
              <text class="label">当前状态：</text>
              <text class="status-tag" :class="getStatusClass(item.status)">{{ item.status }}</text>
            </view>
            <view class="info-row" v-if="item.description">
              <text class="label">项目摘要：</text>
              <text class="value">{{ item.description }}</text>
            </view>
          </view>
          
          <view class="card-footer">
            <view class="action-btn" @click="handleDetail(item)">
              <text>查看工程公示</text>
              <t-icon name="chevron-right" size="28rpx" color="#3B82F6" />
            </view>
          </view>
        </view>
        <view class="no-more">没有更多数据了</view>
      </view>

      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#E2E8F0" />
        <text class="empty-text">{{ selectedYear }}年度暂无维修资金使用记录</text>
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

interface UsageItem {
  title: string;
  date: string;
  amount: string;
  status: string;
  description?: string;
}

const selectedYear = ref('2026');
const selectedMonth = ref('01');
const showPicker = ref(false);

const yearOptions = [
  { label: '2026年', value: '2026' },
  { label: '2025年', value: '2025' },
  { label: '2024年', value: '2024' }
];

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${String(i + 1).padStart(2, '0')}月`,
  value: String(i + 1).padStart(2, '0')
}));

const usageList = ref<UsageItem[]>([
  {
    title: '1号楼电梯钢丝绳更换工程',
    date: '2026-01-15',
    status: '进行中',
    amount: '4.50',
    description: '针对1号楼1单元电梯运行异响，经检测需更换主提升钢丝绳。'
  },
  {
    title: '小区监控系统升级改造',
    date: '2026-01-20',
    status: '已公示',
    amount: '2.80',
    description: '小区原有监控系统清晰度不足，升级为全数字高清监控系统。'
  },
  {
    title: '地库排水泵检修',
    date: '2026-01-05',
    status: '已完成',
    amount: '0.65',
    description: '雨季前对负二层排水泵进行全面拆解维护与密封件更换。'
  },
  {
    title: '2号楼外墙脱落维修',
    date: '2025-12-12',
    status: '已完成',
    amount: '1.20',
    description: '对2号楼西侧外墙保温层空鼓、脱落区域进行铲除及重新铺装。'
  },
  {
    title: '小区消防管道渗漏维修',
    date: '2025-11-28',
    status: '已完成',
    amount: '0.85',
    description: '消防管网压力下降，排查并修复3处地下埋地管网渗漏点。'
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
  return usageList.value.filter(item => item.date.startsWith(prefix));
});

const totalUsed = computed(() => {
  return filteredList.value.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);
});

const totalTimes = computed(() => filteredList.value.length);

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

const handleDetail = (item: UsageItem) => {
  uni.showToast({
    title: '跳转至公示详情',
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
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  margin: 24rpx @page-padding;
  padding: 40rpx;
  border-radius: @radius-large;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8rpx 20rpx rgba(59, 130, 246, 0.2);

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

.filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx @page-padding;
    background: #FFFFFF;
    border-bottom: 2rpx solid #F1F5F9;

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

.list-scroll {
  flex: 1;
}

.usage-list {
  padding: 24rpx @page-padding;
}

.usage-card {
  background: #FFFFFF;
  border-radius: @radius-large;
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30rpx;
    border-bottom: 2rpx solid #F8FAFC;

    .title-section {
      display: flex;
      align-items: flex-start;
      gap: 16rpx;
      flex: 1;
      margin-right: 20rpx;

      .type-dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #3B82F6;
        margin-top: 12rpx;
        flex-shrink: 0;
      }

      .title {
        font-size: 30rpx;
        font-weight: 600;
        color: #1E293B;
        line-height: 1.4;
      }
    }

    .amount {
      font-size: 32rpx;
      font-weight: 700;
      color: #EF4444;
      flex-shrink: 0;
    }
  }

  .card-body {
    padding: 24rpx 30rpx;
    background: #FAFAFA;

    .info-row {
      display: flex;
      font-size: 26rpx;
      line-height: 1.8;
      margin-bottom: 8rpx;

      &:last-child { margin-bottom: 0; }

      .label {
        color: #94A3B8;
        width: 140rpx;
        flex-shrink: 0;
      }

      .value {
        color: #475569;
        flex: 1;
      }

      .status-tag {
        padding: 2rpx 16rpx;
        border-radius: 6rpx;
        font-size: 22rpx;
        font-weight: 500;

        &.ongoing { background: #E0F2FE; color: #0EA5E9; }
        &.completed { background: #DCFCE7; color: #10B981; }
        &.posted { background: #FEF3C7; color: #D97706; }
      }
    }
  }

  .card-footer {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: flex-end;

    .action-btn {
      display: flex;
      align-items: center;
      gap: 4rpx;
      
      text {
        font-size: 26rpx;
        color: #3B82F6;
        font-weight: 500;
      }
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
