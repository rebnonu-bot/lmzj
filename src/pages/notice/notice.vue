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
          <text class="main-title">公示公告</text>
          <text class="sub-title">共识、透明、公开</text>
          <view class="house-info">
            <t-icon name="location" size="28rpx" color="#fff" class="loc-icon" />
            <text>{{ currentCommunity }}</text>
          </view>
        </view>
        <view class="header-illustration">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <view class="notice-box">
              <view class="notice-line"></view>
              <view class="notice-line"></view>
              <view class="notice-dot"></view>
            </view>
          </view>
          <view class="illust-cloud c1"></view>
          <view class="illust-cloud c2"></view>
        </view>
      </view>

      <!-- Decorative background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Tabs -->
    <scroll-view scroll-x class="tabs-scroll-view" :show-scrollbar="false" :enhanced="true">
      <view class="tabs-container animate-fade-in">
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
    </scroll-view>

    <!-- 3. Content Area -->
    <view class="content-area">
      <view class="calendar-wrapper" v-if="!isLoading">
        <!-- Calendar Header -->
        <view class="calendar-header">
          <view class="header-left">
            <view class="year-selector" @click="toggleYearPicker">
              <t-icon name="calendar" size="32rpx" color="#3B82F6" class="cal-icon" />
              <text class="year-text">{{ currentYear }} 年</text>
              <t-icon name="chevron-down" size="28rpx" color="#94A3B8" />
            </view>
          </view>
          
          <view class="header-right">
            <view class="view-mode-switch">
              <view 
                class="mode-btn" 
                :class="{ active: viewMode === 'day' }"
                @click="switchViewMode('day')"
              >
                <text>日</text>
              </view>
              <view 
                class="mode-btn" 
                :class="{ active: viewMode === 'month' }"
                @click="switchViewMode('month')"
              >
                <text>月</text>
              </view>
              <view class="mode-slider" :class="viewMode"></view>
            </view>
          </view>
        </view>

        <!-- Grid Table -->
        <view class="grid-table">
          <scroll-view 
            scroll-x 
            class="main-horizontal-scroll" 
            :scroll-into-view="scrollIntoView"
            :scroll-with-animation="true"
          >
            <!-- Time Axis Row -->
            <view class="table-row head-row">
              <view class="sticky-col label-cell">
                <text class="label-text">{{ viewMode === 'month' ? currentYear + '年' : activeMonth }}</text>
              </view>
              <view class="months-container">
                <view 
                  class="month-cell" 
                  v-for="(time, idx) in timeAxis" 
                  :key="time" 
                  :id="'time-' + (idx + 1)"
                  :class="{ active: viewMode === 'month' ? time === activeMonth : time === activeDay }"
                  @click="handleTimeClick(time)"
                >
                  <text>{{ time }}</text>
                </view>
              </view>
            </view>

            <!-- Category Rows -->
            <view class="table-row data-row" v-for="cat in categories" :key="cat.id">
              <view class="sticky-col category-cell">
                <text>{{ cat.name }}</text>
              </view>
              <view class="cells-container">
                <view 
                  class="data-cell" 
                  v-for="(time, idx) in timeAxis" 
                  :key="time"
                  :id="'cell-' + cat.id + '-' + (idx + 1)"
                  @click="handleCellClick(cat.id, time)"
                >
                  <view 
                    class="status-card" 
                    v-if="getGridItem(cat.id, time)"
                    :class="getGridItem(cat.id, time).type"
                  >
                    <view class="status-text">{{ getGridItem(cat.id, time).status }}</view>
                    <view class="sub-status" v-if="getGridItem(cat.id, time).subStatus">
                      {{ getGridItem(cat.id, time).subStatus }}
                    </view>
                    <view class="action-link">
                      {{ getGridItem(cat.id, time).action }}
                    </view>
                  </view>
                  <view class="status-card default-status" :class="getDateStatus(time)" v-else>
                    <view class="status-text" v-if="getDateStatus(time) !== 'current'">
                      {{ getDateStatus(time) === 'past' ? '计划已完成' : '按合同计划中' }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <view class="loading-state" v-else>
        <view class="skeleton-item-card" v-for="i in 4" :key="i">
          <view class="skeleton-line tag-skel"></view>
          <view class="skeleton-line title-skel"></view>
          <view class="skeleton-line date-skel"></view>
        </view>
      </view>
    </view>

    <!-- Global Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const isLoading = ref(true);
const activeTab = ref(0);
const tabs = ['物业服务公示', '业委会公示', '政府公告', '其它'];
const currentCommunity = ref('阳光水岸一期');

// Calendar-style data
const currentYear = ref(new Date().getFullYear());
const currentMonth = new Date().getMonth() + 1;
const currentMonthStr = `${currentMonth}月`;
const currentDayStr = `${new Date().getDate()}日`;

const viewMode = ref<'day' | 'month'>('month');
const activeMonth = ref(currentMonthStr);
const activeDay = ref(currentDayStr);
const scrollIntoView = ref('time-1');

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// Calculate days for current active month
const timeAxis = computed(() => {
  if (viewMode.value === 'month') {
    return months;
  } else {
    // Get days in the activeMonth
    const monthNum = parseInt(activeMonth.value);
    const daysInMonth = new Date(currentYear.value, monthNum, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}日`);
  }
});

const categoriesMap: Record<number, any[]> = {
  0: [
    { id: 'greenery', name: '绿化养护' },
    { id: 'cleaning', name: '环境保洁' },
    { id: 'order', name: '公共秩序' },
    { id: 'security', name: '治安保卫' },
    { id: 'maintenance', name: '设施维修' },
    { id: 'income', name: '收入公示' },
    { id: 'expense', name: '支出公示' }
  ],
  1: [
    { id: 'contract', name: '合同公示' },
    { id: 'income_comm', name: '收入公示' },
    { id: 'expense_comm', name: '支出公示' },
    { id: 'invoice', name: '票据公示' },
    { id: 'general_major', name: '一般重大事项' },
    { id: 'special_major', name: '特别重大事项' }
  ],
  2: [
    { id: 'policy', name: '最新政策' },
    { id: 'notice', name: '政务通知' },
    { id: 'guide', name: '办事指南' }
  ],
  3: [
    { id: 'activity', name: '社区活动' },
    { id: 'other', name: '其它事项' }
  ]
};

const categories = computed(() => categoriesMap[activeTab.value] || categoriesMap[0]);

const gridData = ref<Record<string, any>>({
  // 1月份已过期数据 - 全部设为已完成
  'greenery-1月': { status: '已完成', action: '查看报告', type: 'planning' },
  'cleaning-1月': { status: '已完成', action: '查看报告', type: 'planning' },
  'order-1月': { status: '已完成', action: '查看记录', type: 'planning' },
  'security-1月': { status: '已完成', action: '巡检报告', type: 'planning' },
  'maintenance-1月': { status: '已完成', action: '维修清单', type: 'planning' },
  'income-1月': { status: '已公示', action: '查看账目', type: 'planning' },
  'expense-1月': { status: '已公示', action: '查看明细', type: 'planning' },
  
  // 2月份当前数据
  'greenery-2月': { status: '维护中', action: '查看详情', type: 'applying', hot: true },
  'cleaning-2月': { status: '已完成', action: '查看报告', type: 'planning' },
  'order-2月': { status: '计划中', action: '查看方案', type: 'planning' },
  'security-2月': { status: '进行中', action: '实时监控', type: 'applying', hot: true },
  'maintenance-2月': { status: '待处理', subStatus: '本月15日开始', action: '进度跟踪', type: 'ending' },
  'income-2月': { status: '已公示', action: '查看月报', type: 'planning' },
  'expense-2月': { status: '审核中', action: '查看明细', type: 'applying' },
  
  // 2月具体日期数据 (今日是9日)
  'greenery-2月9日': { status: '正在修剪', action: '查看现场', type: 'applying', hot: true },
  'security-2月9日': { status: '巡逻中', action: '查看轨迹', type: 'applying' },
  'cleaning-2月8日': { status: '已完成', action: '保洁记录', type: 'planning' },
  
  // 业委会公示数据
  'contract-1月': { status: '已签约', action: '查看合同', type: 'planning' },
  'income_comm-1月': { status: '已结算', action: '收支明细', type: 'planning' },
  'expense_comm-1月': { status: '已支付', action: '支出凭证', type: 'planning' },
  'invoice-1月': { status: '已汇总', action: '查看票据', type: 'planning' },
  'general_major-1月': { status: '已决议', action: '会议纪要', type: 'planning' },
  'special_major-1月': { status: '已备案', action: '公示文件', type: 'planning' },

  'contract-2月': { status: '履行中', action: '进度查看', type: 'applying' },
  'income_comm-2月': { status: '公示中', action: '查看详情', type: 'applying', hot: true },
  'expense_comm-2月': { status: '待审核', action: '明细预审', type: 'ending' },
  'general_major-2月': { status: '征求意见', action: '参与投票', type: 'applying', hot: true },
  
  // 为其它 Tab 补充模拟数据 (1月均设为已公示/已完成)
  'policy-1月': { status: '已发布', action: '查看详情', type: 'planning' },
  'activity-1月': { status: '已结束', action: '活动回顾', type: 'planning' },
  'policy-2月': { status: '已发布', action: '点击阅读', type: 'planning', hot: true },
  'activity-2月': { status: '报名中', action: '立即参加', type: 'applying', hot: true }
});

const gridLabel = computed(() => {
   const tabName = tabs[activeTab.value] || '';
   if (tabName.includes('公示')) return tabName.replace('公示', '项目');
   if (tabName.includes('公告')) return tabName.replace('公告', '内容');
   return '公示项目';
 });

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    isLoading.value = false;
    // Ensure scrolling to the beginning after loading
    setTimeout(() => {
      scrollIntoView.value = 'time-1';
    }, 100);
  }, 800);
});

const goBack = () => {
  uni.navigateBack();
};

const toggleYearPicker = () => {
  uni.showActionSheet({
    itemList: ['2024年', '2025年', '2026年'],
    success: (res) => {
      const years = [2024, 2025, 2026];
      const selectedYear = years[res.tapIndex];
      if (selectedYear !== undefined) {
        currentYear.value = selectedYear;
      }
    }
  });
};

const switchViewMode = (mode: 'day' | 'month') => {
  viewMode.value = mode;
  // Reset scroll and active state when switching
  setTimeout(() => {
    const targetIdx = mode === 'month' ? parseInt(activeMonth.value) : parseInt(activeDay.value);
    scrollIntoView.value = `time-${Math.max(1, targetIdx - 1)}`;
  }, 50);
};

const getDateStatus = (time: string) => {
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth() + 1;
  const todayDay = now.getDate();

  const monthNum = viewMode.value === 'month' ? parseInt(time) : parseInt(activeMonth.value);
  const dayNum = viewMode.value === 'month' ? 1 : parseInt(time);

  if (currentYear.value < todayYear) return 'past';
  if (currentYear.value > todayYear) return 'future';

  if (viewMode.value === 'month') {
    if (monthNum < todayMonth) return 'past';
    if (monthNum > todayMonth) return 'future';
    return 'current';
  } else {
    if (monthNum < todayMonth) return 'past';
    if (monthNum > todayMonth) return 'future';
    if (dayNum < todayDay) return 'past';
    if (dayNum > todayDay) return 'future';
    return 'current';
  }
};

const handleTimeClick = (time: string) => {
  if (viewMode.value === 'month') {
    activeMonth.value = time;
    const monthIndex = months.indexOf(time);
    // Scroll to index - 1 to make it the first visible item after sticky column
    scrollIntoView.value = `time-${Math.max(1, monthIndex)}`;
  } else {
    activeDay.value = time;
    const dayIndex = parseInt(time);
    // Scroll to day - 1 to make it the first visible item after sticky column
    scrollIntoView.value = `time-${Math.max(1, dayIndex - 1)}`;
  }
};

const handleCellClick = (catId: string, time: string) => {
  if (viewMode.value === 'month') {
    // Jump to day view for this month
    activeMonth.value = time;
    viewMode.value = 'day';
    
    const now = new Date();
    const isCurrentMonth = parseInt(time) === (now.getMonth() + 1) && currentYear.value === now.getFullYear();
    
    if (isCurrentMonth) {
      activeDay.value = `${now.getDate()}日`;
      // Scroll to today (or slightly before today to ensure visibility)
      setTimeout(() => {
        scrollIntoView.value = `time-${Math.max(1, now.getDate() - 1)}`;
      }, 50);
    } else {
      activeDay.value = '1日';
      setTimeout(() => {
        scrollIntoView.value = 'time-1';
      }, 50);
    }
    
    uni.showToast({
      title: `已切换至 ${time} 详情`,
      icon: 'none'
    });
    return;
  }

  const item = getGridItem(catId, time);
  if (item) {
    uni.showToast({
      title: `正在查看 ${item.status}`,
      icon: 'none'
    });
  }
};

const getGridItem = (catId: string, time: string) => {
  const key = viewMode.value === 'month' ? `${catId}-${time}` : `${catId}-${activeMonth.value}${time}`;
  return gridData.value[key] || null;
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
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

        .loc-icon {
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
        width: 130rpx;
        height: 130rpx;
        right: 50rpx;
        top: 20rpx;
        transform: rotate(-15deg);
        opacity: 0.6;
      }

      .card-front {
        width: 150rpx;
        height: 150rpx;
        right: 15rpx;
        top: 40rpx;
        transform: rotate(5deg);
        z-index: 2;
        background: rgba(255, 255, 255, 0.25);

        .notice-box {
          width: 60rpx;
          height: 70rpx;
          background: #fff;
          border-radius: 8rpx;
          padding: 10rpx;
          display: flex;
          flex-direction: column;
          gap: 8rpx;
          box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
          animation: illust-float 4s ease-in-out infinite;

          .notice-line {
            width: 100%;
            height: 6rpx;
            background: #E2E8F0;
            border-radius: 3rpx;
            
            &:nth-child(2) {
              width: 70%;
            }
          }
          .notice-dot {
            width: 16rpx;
            height: 16rpx;
            background: #10B981;
            border-radius: 50%;
            align-self: flex-end;
            margin-top: auto;
          }
        }
      }

      .illust-cloud {
        position: absolute;
        background: #fff;
        border-radius: 8rpx;
        opacity: 0.4;
        
        &.c1 {
          width: 40rpx;
          height: 12rpx;
          right: 180rpx;
          top: 60rpx;
          animation: cloud-drift 5s ease-in-out infinite;
        }
        &.c2 {
          width: 30rpx;
          height: 10rpx;
          right: 40rpx;
          top: 10rpx;
          animation: cloud-drift 4s ease-in-out infinite reverse;
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
}

.tabs-scroll-view {
  width: 100%;
  height: 100rpx;
  background: #FFFFFF;
  white-space: nowrap;
  position: relative;
  z-index: 10;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

  :deep(.uni-scroll-view-content) {
    display: flex;
    height: 100%;
  }
}

.tabs-container {
  display: inline-flex;
  min-width: 100%;
  height: 100rpx;
  padding: 0 10rpx;

  .tab-item {
    padding: 0 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    color: #64748B;
    position: relative;
    transition: all 0.3s;
    flex-shrink: 0;

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

.content-area {
  width: 100%;
}

.tab-content {
  padding: 20rpx @page-padding 40rpx;
}

.calendar-wrapper {
  background: #fff;
  padding-bottom: 40rpx;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120rpx;
  padding: 0 @page-padding;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1rpx solid #F1F5F9;
  position: relative;
  z-index: 5;

  .header-left {
    .year-selector {
      display: flex;
      align-items: center;
      gap: 12rpx;
      padding: 12rpx 24rpx;
      background: #F8FAFC;
      border: 1rpx solid #E2E8F0;
      border-radius: 40rpx;
      transition: all 0.2s;

      &:active {
        background: #F1F5F9;
        transform: scale(0.98);
      }

      .cal-icon {
        margin-right: 4rpx;
      }

      .year-text {
        font-size: 30rpx;
        font-weight: 600;
        color: #1E293B;
      }
    }
  }

  .header-right {
    .view-mode-switch {
      display: flex;
      background: #F1F5F9;
      padding: 6rpx;
      border-radius: 40rpx;
      position: relative;
      width: 200rpx;
      height: 64rpx;

      .mode-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: #64748B;
        z-index: 2;
        transition: color 0.3s;

        &.active {
          color: #3B82F6;
          font-weight: 600;
        }
      }

      .mode-slider {
        position: absolute;
        top: 6rpx;
        left: 6rpx;
        width: calc(50% - 6rpx);
        height: calc(100% - 12rpx);
        background: #fff;
        border-radius: 36rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;

        &.month {
          transform: translateX(100%);
        }
      }
    }
  }
}

.grid-table {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  .main-horizontal-scroll {
    width: 100%;
  }

  .table-row {
    display: flex;
    width: max-content;
    min-width: 100%;
    background: #fff;
    box-sizing: border-box;
    
    &.head-row {
      background: #F8FAFC;
      border-bottom: 1rpx solid #E2E8F0;
    }
  }

  .sticky-col {
    width: 160rpx;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1rpx solid #E2E8F0;
    background: #F8FAFC;
    position: sticky;
    left: 0;
    z-index: 5;
    box-sizing: border-box;

    &::after {
      content: '';
      position: absolute;
      right: -16rpx;
      top: 0;
      bottom: 0;
      width: 16rpx;
      background: linear-gradient(to right, rgba(0,0,0,0.08), transparent);
      pointer-events: none;
    }

    &.label-cell {
      background: #F8FAFC;
      z-index: 6;
      
      .label-text {
        font-size: 22rpx;
        color: #64748B;
        font-weight: 500;
      }
    }
  }

  .category-cell {
     font-size: 26rpx;
     color: #475569;
     font-weight: 500;
     background: #fff;
     border-bottom: 1rpx solid #E2E8F0;
     padding: 0 12rpx;
     text-align: center;
   }

  .months-container, .cells-container {
    display: flex;
    flex: 1;
  }

  .month-cell {
    height: 60rpx;
    width: 140rpx;
    flex-shrink: 0;
    font-size: 26rpx;
    color: #94A3B8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1rpx solid #E2E8F0;
    border-bottom: 1rpx solid #E2E8F0;
    
    &.active {
      color: #3B82F6;
      font-weight: bold;
    }
  }

  .data-cell {
     width: 140rpx;
     height: 120rpx;
     flex-shrink: 0;
     display: flex;
     align-items: center;
     justify-content: center;
     border-right: 1rpx solid #E2E8F0;
     border-bottom: 1rpx solid #E2E8F0;
   }

   .status-card {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
      padding: 8rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 4rpx;

      &.planning {
        background: #FFFBEB;
        .status-text { color: #D97706; }
        .action-link { color: #D97706; }
      }

      &.applying {
        background: #FEF2F2;
        .status-text { color: #EF4444; }
        .action-link { color: #EF4444; }
      }

      &.ending {
        background: #FFF1F2;
        .status-text { color: #F43F5E; }
        .action-link { color: #F43F5E; }
      }

      &.default-status {
        background: transparent;
        border: none;
        box-shadow: none;
        
        &.past {
          background: #FFFFFF;
          .status-text { color: #94A3B8; font-weight: 400; }
        }
        
        &.future {
          background: #F1F5F9;
          .status-text { color: #94A3B8; font-weight: 400; }
        }

        .status-text {
          font-size: 20rpx;
        }
      }

      .status-text {
        font-size: 24rpx;
        font-weight: 500;
        text-align: center;
        line-height: 1.2;
      }

      .sub-status {
        font-size: 18rpx;
        color: #F87171;
        margin-top: 2rpx;
      }

      .action-link {
        font-size: 20rpx;
        display: flex;
        align-items: center;
        gap: 2rpx;
        margin-top: 4rpx;

        .hot-icon {
          font-size: 20rpx;
        }
      }
    }
  }

.notice-record-item {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
    background: #F8FAFC;
  }

  .record-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16rpx;

    .type-tag {
      align-self: flex-start;
      font-size: 20rpx;
      padding: 6rpx 16rpx;
      border-radius: 8rpx;
      font-weight: 600;
      letter-spacing: 1rpx;

      &.property { background: #E0F2FE; color: #0284C7; }
      &.committee { background: #FEF3C7; color: #D97706; }
      &.government { background: #F1F5F9; color: #475569; }
      &.other { background: #F0FDF4; color: #16A34A; }
    }

    .record-info {
      flex: 1;
      
      .title-row {
        display: flex;
        align-items: center;
        margin-bottom: 8rpx;

        .unread-dot {
          width: 12rpx;
          height: 12rpx;
          background: #EF4444;
          border-radius: 50%;
          margin-right: 12rpx;
          flex-shrink: 0;
        }

        .record-title {
          font-size: 28rpx;
          font-weight: 600;
          color: #1E293B;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }

      .record-date {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }

  .record-right {
    margin-left: 20rpx;
  }
}

.skeleton-item-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  position: relative;
  overflow: hidden;

  .skeleton-line {
    background: #F1F5F9;
    border-radius: 4rpx;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      animation: skeleton-loading 1.5s infinite;
    }

    &.tag-skel {
      width: 120rpx;
      height: 32rpx;
    }
    &.title-skel {
      width: 90%;
      height: 40rpx;
    }
    &.date-skel {
      width: 200rpx;
      height: 24rpx;
    }
  }
}

@keyframes skeleton-loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes illust-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}

@keyframes cloud-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20rpx); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
  color: #94A3B8;
  gap: 20rpx;
  font-size: 28rpx;
}
</style>
