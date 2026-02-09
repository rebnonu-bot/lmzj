<template>
  <view class="page-container">
    <!-- Standard Navbar -->
    <t-navbar
      :title="pageTitle"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />
    
    <!-- Filter Section (Sticky) -->
    <view class="filter-section">
      <view class="filter-bar">
        <view class="date-picker" @click="showPicker = true">
          <text class="date-text">{{ displayDate }}</text>
          <t-icon name="caret-down-small" size="32rpx" color="#64748B" />
        </view>
        <view class="stat-info">
          <text class="label">{{ selectedYear && selectedMonth ? '月贡献合计：' : '总贡献合计：' }}</text>
          <text class="value">¥{{ monthlyTotal }}</text>
        </view>
      </view>
    </view>

    <!-- List Content -->
    <scroll-view class="list-scroll" scroll-y @scrolltolower="loadMore">
      <view class="record-list" v-if="filteredList.length > 0">
        <view 
          class="record-item animate-fade-in" 
          v-for="(item, index) in filteredList" 
          :key="index"
          :style="{ animationDelay: (index * 0.05) + 's' }"
        >
          <view class="record-left">
            <view class="record-info">
              <view class="title-row">
                <text class="record-title">{{ item.title }}</text>
                <text class="scene-tag" :class="item.scene === 'online' ? 'online' : 'offline'">
                  {{ item.scene === 'online' ? '线上' : '线下' }}
                </text>
              </view>
              <text class="record-status" v-if="item.status">{{ item.status }}</text>
              <text class="record-date">{{ item.date }}</text>
            </view>
          </view>
          <view class="record-right">
            <text class="record-amount" :class="item.type === 'expense' ? 'expense' : 'contribution'">
              {{ item.type === 'expense' ? '-' : '+' }}{{ item.amount }}元
            </text>
          </view>
        </view>
        
        <view class="load-more" v-if="hasMore">
          <text>正在加载更多...</text>
        </view>
        <view class="no-more" v-else>
          <text>没有更多记录了</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#CBD5E1" />
        <text class="empty-text">{{ selectedYear && selectedMonth ? '该月份暂无记录' : '暂无相关记录' }}</text>
      </view>
    </scroll-view>

    <!-- Date Picker Component -->
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
import { onLoad } from '@dcloudio/uni-app';
import { useFundStore } from '@/composables/useFundStore';

const { recordList: storeRecordList } = useFundStore();

const type = ref('all'); // 'all' 为贡献列表, 'mine' 为我的贡献
const pageTitle = computed(() => type.value === 'mine' ? '我的贡献明细' : '贡献列表明细');

const showPicker = ref(false);
const selectedYear = ref('');
const selectedMonth = ref('');

const displayDate = computed(() => {
  if (!selectedYear.value || !selectedMonth.value) return '全部记录';
  return `${selectedYear.value}年${selectedMonth.value}月`;
});

const currentDate = computed(() => {
  if (!selectedYear.value || !selectedMonth.value) return '';
  return `${selectedYear.value}-${selectedMonth.value}`;
});

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [{ label: '全部年份', value: '' }];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push({ label: `${i}年`, value: i.toString() });
  }
  return years;
});

const monthOptions = computed(() => {
  const months = [{ label: '全部月份', value: '' }];
  for (let i = 1; i <= 12; i++) {
    months.push({ label: `${i}月`, value: i.toString().padStart(2, '0') });
  }
  return months;
});

const recordList = ref<any[]>([]);
const hasMore = ref(false);

onLoad((options: any) => {
  if (options.type) {
    type.value = options.type;
  }
  
  // 加载模拟数据
  loadMockData();
});

const loadMockData = () => {
  if (type.value === 'mine') {
    // “我的贡献”：过滤出贡献类型的记录，并排除初始余额
    recordList.value = storeRecordList.value
      .filter(item => item.type === 'contribution')
      .map(item => ({
        ...item,
        status: `成功消费${(parseFloat(item.amount) * 100).toFixed(2)}元`
      }));
  } else {
    // “贡献列表”：包含所有记录
    recordList.value = storeRecordList.value;
  }
};

const filteredList = computed(() => {
  if (!currentDate.value) return recordList.value;
  return recordList.value.filter(item => item.date.startsWith(currentDate.value));
});

const monthlyTotal = computed(() => {
  const total = filteredList.value.reduce((sum, item) => {
    const val = parseFloat(item.amount);
    return item.type === 'expense' ? sum - val : sum + val;
  }, 0);
  return total.toFixed(2);
});

const handleBack = () => {
  uni.navigateBack();
};

const onDateConfirm = (val: any) => {
  selectedYear.value = val.value[0];
  selectedMonth.value = val.value[1];
  showPicker.value = false;
};

const loadMore = () => {
  // 分页逻辑
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding-top: 100rpx; // Space for fixed navbar
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.filter-section {
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
  padding: 24rpx @page-padding;

  .date-picker {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 10rpx 24rpx;
    background: #F8FAFC;
    border-radius: 30rpx;
    
    .date-text {
      font-size: 26rpx;
      color: #1E293B;
      font-weight: 600;
    }
  }

  .stat-info {
    font-size: 24rpx;
    color: #94A3B8;
    
    .value {
      font-size: 32rpx;
      font-weight: 700;
      color: #F59E0B;
      margin-left: 8rpx;
    }
  }
}

.list-scroll {
  flex: 1;
  overflow: hidden;
}

.record-list {
  padding: 20rpx @page-padding;
}

.record-item {
  background: #FFFFFF;
  padding: 30rpx;
  border-radius: @radius-medium;
  margin-bottom: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

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
      font-weight: 600;
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

  .record-amount {
    font-size: 32rpx;
    font-weight: bold;
    &.contribution { color: #F59E0B; }
    &.expense { color: #EF4444; }
  }
}

.load-more, .no-more {
  text-align: center;
  padding: 40rpx 0;
  font-size: 24rpx;
  color: #94A3B8;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #94A3B8;
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10rpx); }
  to { opacity: 1; transform: translateY(0); }
}
</style>