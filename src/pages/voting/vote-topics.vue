<template>
  <view class="page-container">
    <!-- 1. Custom Header Section -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">全部投票</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Statistics Card -->
    <view class="stats-card-container">
      <view class="stats-card">
        <view class="stats-header">
          <t-icon name="chart-bar" size="36rpx" color="#3B82F6" />
          <text class="stats-title">选举项目统计</text>
        </view>
        <view class="stats-grid">
          <view 
            class="stats-item" 
            v-for="(stat, index) in stats" 
            :key="index"
            @click="handleStatClick(stat)"
            :class="{ active: stat.active }"
          >
            <text class="stats-label">{{ stat.label }}</text>
            <view class="num-box">
              <text class="stats-num">{{ stat.value }}</text>
              <text class="stats-unit">项</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 3. Search & Filter Section -->
    <view class="filter-section">
      <view class="search-box">
        <t-icon name="search" size="36rpx" color="#94A3B8" />
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索投票议题名称" 
          placeholder-style="color: #94A3B8"
        />
      </view>

      <view class="tabs-bar">
        <view class="main-tabs-container">
          <view 
            class="tabs-slider" 
            :style="{ 
              width: (100 / tabs.length) + '%',
              transform: 'translateX(' + (activeTab * 100) + '%)'
            }"
          ></view>
          <view 
            v-for="(tab, index) in tabs" 
            :key="index"
            class="main-tab-item"
            :class="{ active: activeTab === index }"
            @click="handleTabChange(index)"
          >
            <text class="tab-label">{{ tab.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. List Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="vote-list" v-if="filteredVotes.length > 0">
        <vote-card 
          v-for="item in filteredVotes" 
          :key="item.id"
          :vote="item"
          @click="handleAction(item)"
        />
        <view class="list-end">
          <text>已经到底啦</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#CBD5E1" />
        <text class="empty-text">暂时没有符合条件的投票议题</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import VoteCard from '@/components/business/VoteCard.vue';

const activeTab = ref(0);
const searchKey = ref('');
const typeFilter = ref(''); // '', 'normal', 'special'

onLoad((options) => {
  if (options && options.tab) {
    activeTab.value = parseInt(options.tab);
  }
});

const tabs = [
  { name: '全部', value: 'all' },
  { name: '进行中', value: 'ongoing' },
  { name: '已结束', value: 'ended' }
];

const stats = computed(() => {
  return [
    { label: '全部项目', value: mockVotes.value.length, type: 'all', active: activeTab.value === 0 && !typeFilter.value },
    { label: '进行中', value: mockVotes.value.filter(i => i.statusType === 'ongoing').length, type: 'ongoing', active: activeTab.value === 1 && !typeFilter.value },
    { label: '已结束', value: mockVotes.value.filter(i => i.statusType === 'ended').length, type: 'ended', active: activeTab.value === 2 && !typeFilter.value },
    { label: '一般事项', value: mockVotes.value.filter(i => i.mainType === 'normal').length, type: 'normal', active: typeFilter.value === 'normal' },
    { label: '特别事项', value: mockVotes.value.filter(i => i.mainType === 'special').length, type: 'special', active: typeFilter.value === 'special' }
  ];
});

const handleStatClick = (stat: any) => {
  if (stat.type === 'all') {
    activeTab.value = 0;
    typeFilter.value = '';
  } else if (stat.type === 'ongoing') {
    activeTab.value = 1;
    typeFilter.value = '';
  } else if (stat.type === 'ended') {
    activeTab.value = 2;
    typeFilter.value = '';
  } else {
    // normal or special
    activeTab.value = 0; // Switch to "All" status when filtering by type
    typeFilter.value = stat.type;
  }
};

const handleTabChange = (index: number) => {
  activeTab.value = index;
  typeFilter.value = ''; // Reset type filter when switching status tabs
};

// 模拟数据 - 包含用户提到的所有类别
const mockVotes = ref([
  {
    id: 1,
    title: '阳光水岸小区第三届业主委员会选举',
    startTime: '2026-01-15 00:00',
    endTime: '01-25 23:59',
    statusText: '已结束',
    statusType: 'ended',
    mainType: 'normal',
    type: '业委会选举',
    participants: 450
  },
  {
    id: 2,
    title: '阳光水岸2026年度物业服务续聘表决',
    startTime: '2025-12-01 00:00',
    endTime: '02-28 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '物业选聘',
    participants: 128
  },
  {
    id: 3,
    title: '阳光水岸1-1单元电梯更新改造维修资金使用投票',
    startTime: '2026-02-01 00:00',
    endTime: '02-20 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '使用维修资金',
    participants: 45
  },
  {
    id: 4,
    title: '阳光水岸2026年公共收益分配方案投票',
    startTime: '2026-01-10 00:00',
    endTime: '01-30 23:59',
    statusText: '已结束',
    statusType: 'ended',
    mainType: 'special',
    type: '共有部分经营',
    participants: 560
  },
  {
    id: 5,
    title: '阳光水岸关于筹集二期专项维修资金的表决',
    startTime: '2026-02-05 00:00',
    endTime: '02-25 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'special',
    type: '筹集维修资金',
    participants: 89
  },
  {
    id: 6,
    title: '关于阳光水岸物业费调整（由1.8元/㎡调至2.1元/㎡）的投票',
    startTime: '2026-02-01 00:00',
    endTime: '02-28 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '物业费调整',
    participants: 234
  }
]);

const filteredVotes = computed(() => {
  let list = mockVotes.value;
  
  // 1. 状态过滤
  if (activeTab.value !== 0) {
    const tab = tabs[activeTab.value];
    if (tab) {
      list = list.filter(item => item.statusType === tab.value);
    }
  }

  // 2. 类别过滤
  if (typeFilter.value) {
    list = list.filter(item => item.mainType === typeFilter.value);
  }
  
  // 3. 搜索过滤
  if (searchKey.value) {
    const key = searchKey.value.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(key)
    );
  }
  
  return list;
});

const goBack = () => {
  uni.navigateBack();
};

const handleAction = (item: any) => {
  if (item.statusType === 'ongoing') {
    uni.navigateTo({
      url: `/pages/voting/reminder?id=${item.id}`
    });
  } else {
    uni.navigateTo({
      url: `/pages/voting/vote-result?id=${item.id}`
    });
  }
};
</script>

<style lang="less" scoped>
@import "@/styles/variable.less";

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
    }

    .page-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #FFFFFF;
      margin-left: 10rpx;
    }
  }

  .decor-circle {
    position: absolute;
    top: -50rpx;
    right: -50rpx;
    width: 200rpx;
    height: 200rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 1;
  }
}

.stats-card-container {
  padding: 0 @page-padding;
  margin-top: -5rem;
  position: relative;
  z-index: 3;

  .stats-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
    border: 1rpx solid rgba(59, 130, 246, 0.05);

    .stats-header {
      display: flex;
      align-items: center;
      gap: 12rpx;
      margin-bottom: 30rpx;

      .stats-title {
        font-size: 28rpx;
        font-weight: 700;
        color: #1E3A8A;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      text-align: center;

      .stats-item {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        padding: 12rpx 0;
        border-radius: 16rpx;
        transition: all 0.2s;

        &:active {
          background: #F1F5F9;
        }

        &.active {
          .stats-label {
            color: #3B82F6;
            font-weight: 600;
          }
          .stats-num {
            color: #3B82F6;
            transform: scale(1.1);
          }
        }

        .stats-label {
          font-size: 22rpx;
          color: #94A3B8;
          transition: all 0.2s;
        }

        .stats-num {
          font-size: 36rpx;
          font-weight: 700;
          color: #1E293B;
          font-family: 'DIN Alternate', sans-serif;
          transition: all 0.2s;
        }

        .num-box {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4rpx;

          .stats-unit {
            font-size: 20rpx;
            color: #94A3B8;
            font-weight: 400;
          }
        }
      }
    }
  }
}

.filter-section {
  background: #fff;
  padding: 30rpx @page-padding 10rpx;
  margin-top: 20rpx;

  .search-box {
    background: #F1F5F9;
    height: 80rpx;
    border-radius: 40rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 30rpx;

    input {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
    }
  }
}

.tabs-bar {
  .main-tabs-container {
    display: flex;
    background: #F1F5F9;
    border-radius: 20rpx;
    padding: 8rpx;
    position: relative;

    .tabs-slider {
      position: absolute;
      height: calc(100% - 16rpx);
      background: #FFFFFF;
      border-radius: 16rpx;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }

    .main-tab-item {
      flex: 1;
      height: 72rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;

      .tab-label {
        font-size: 28rpx;
        color: #64748B;
        font-weight: 500;
        transition: all 0.3s;
      }

      &.active {
        .tab-label {
          color: #3B82F6;
          font-weight: 600;
        }
      }
    }
  }
}

.content-scroll {
  flex: 1;
  overflow: hidden;
  padding: 20rpx @page-padding;
  box-sizing: border-box;

  .vote-list {
    padding-bottom: 40rpx;
  }

  .list-end {
    text-align: center;
    padding: 20rpx 0;
    text {
      font-size: 24rpx;
      color: #CBD5E1;
    }
  }

  .empty-state {
    padding-top: 150rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;

    .empty-text {
      font-size: 28rpx;
      color: #94A3B8;
    }
  }
}
</style>
