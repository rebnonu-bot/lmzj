<template>
  <view class="page-container">
    <!-- 1. Custom Header Section -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
      </view>
      
      <view class="header-content">
        <view class="title-group">
          <text class="main-title">电子投票</text>
          <text class="sub-title">公开透明 依法依规 共同建设美好家园</text>
        </view>
        
        <!-- Header Illustration -->
        <view class="header-illust">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <view class="vote-box">
              <view class="paper"></view>
            </view>
          </view>
          <view class="illust-badge">
            <t-icon name="check-circle-filled" size="28rpx" color="#10B981" />
          </view>
        </view>
      </view>
    </view>

    <!-- 2. Search Section -->
    <view class="search-section">
      <view class="search-container">
        <t-icon name="search" size="36rpx" color="#94A3B8" />
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索小区名称" 
          placeholder-style="color: #94A3B8"
        />
        <text class="search-btn">搜索</text>
      </view>
    </view>

    <!-- 2.5 Action Buttons -->
    <view class="action-buttons-section">
      <view class="action-btn-item primary" @click="handleVote">
        <t-icon name="check-rectangle" size="40rpx" color="#fff" />
        <text>业主投票</text>
      </view>
      <view class="action-btn-item secondary" @click="handleResults">
        <t-icon name="chart-line-data" size="40rpx" color="#3B82F6" />
        <text>投票结果</text>
      </view>
    </view>

    <!-- 3. Statistics Card -->
    <view class="stats-card-container">
      <view class="stats-card">
        <view class="stats-header">
          <t-icon name="chart-bar" size="36rpx" color="#3B82F6" />
          <text class="stats-title">选举项目统计</text>
        </view>
        <view class="stats-grid">
          <view class="stats-item" v-for="(stat, index) in stats" :key="index">
            <text class="stats-label">{{ stat.label }}</text>
            <view class="num-box">
              <text class="stats-num">{{ stat.value }}</text>
              <text class="stats-unit">项</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. Tabs Section -->
    <view class="tabs-bar">
      <scroll-view 
        scroll-x 
        class="tabs-scroll" 
        :scroll-into-view="'tab-' + activeTab"
        scroll-with-animation
        show-scrollbar="false"
      >
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          :id="'tab-' + index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <text>{{ tab }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 5. List Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="vote-list" v-if="filteredVotes.length > 0">
        <view 
          v-for="item in filteredVotes" 
          :key="item.id"
          class="vote-card"
          @click="item.statusType === 'ongoing' ? handleVote() : handleResults()"
        >
          <view class="card-header">
            <view class="time-info">
              <text>投票时间：{{ item.startTime }} 至 {{ item.endTime }}</text>
            </view>
            <view class="status-tag" :class="item.statusType">
              {{ item.statusText }}
            </view>
          </view>
          
          <view class="card-content">
            <text class="vote-title">{{ item.title }}</text>
          </view>
          
          <view class="card-footer">
            <view class="participants">
              <t-icon name="user" size="24rpx" color="#94A3B8" />
              <text>{{ item.participants }}人已参与</text>
            </view>
            <view class="action-btn" :class="item.statusType">
              {{ item.statusType === 'ongoing' ? '立即投票' : '查看结果' }}
            </view>
          </view>
        </view>
        <view class="list-end">
          <text>没有更多了</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
        <text class="empty-text">暂无相关投票</text>
      </view>
    </scroll-view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const searchKey = ref('');
const activeTab = ref(0);

const tabs = ['业委会选举', '维修资金使用投票', '重大事项', '公共收益'];

const stats = computed(() => {
  return [
    { label: '业委会', value: mockVotes.value.filter(i => i.type === '业委会选举').length },
    { label: '维修资金', value: mockVotes.value.filter(i => i.type === '维修资金使用投票').length },
    { label: '重大事项', value: mockVotes.value.filter(i => i.type === '重大事项').length },
    { label: '公共收益', value: mockVotes.value.filter(i => i.type === '公共收益').length }
  ];
});

const goBack = () => {
  uni.navigateBack();
};

const handleVote = () => {
  uni.navigateTo({
    url: '/pages/voting/reminder'
  });
};

const handleResults = () => {
  uni.navigateTo({
    url: '/pages/voting/vote-topics?tab=1'
  });
};

// 模拟数据
const mockVotes = ref([
  {
    id: 1,
    title: '《硕丰大成》小区业主委员会选举投票',
    startTime: '2026-01-15 00:00',
    endTime: '01-25 23:59',
    statusText: '已结束',
    statusType: 'ended',
    type: '业委会选举',
    participants: 450
  },
  {
    id: 2,
    title: '《凤凰香域中央》小区业主委员会选举投票',
    startTime: '2025-12-01 00:00',
    endTime: '02-28 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    type: '业委会选举',
    participants: 890
  },
  {
    id: 3,
    title: '《金莎世纪城》小区业主委员会选举投票',
    startTime: '2025-11-26 00:00',
    endTime: '12-10 23:59',
    statusText: '已结束',
    statusType: 'ended',
    type: '业委会选举',
    participants: 1100
  },
  {
    id: 4,
    title: '关于修缮小区2号喷泉池的维修资金使用表决',
    startTime: '2026-01-10 00:00',
    endTime: '02-10 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    type: '维修资金使用投票',
    participants: 670
  }
]);

const filteredVotes = computed(() => {
  let list = mockVotes.value;
  
  // 标签过滤
  const targetType = tabs[activeTab.value];
  list = list.filter(item => item.type === targetType);
  
  // 搜索过滤
  if (searchKey.value) {
    const key = searchKey.value.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(key)
    );
  }
  
  return list;
});
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
    z-index: 5;
    height: 88rpx;

    .back-btn {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .header-content {
    margin-top: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 5;

    .title-group {
      .main-title {
        font-size: 40rpx;
        font-weight: 900;
        color: #fff;
        text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15), 0 0 12rpx rgba(255, 255, 255, 0.3);
        display: block;
        margin-bottom: 4rpx;
        letter-spacing: 2rpx;
      }

      .sub-title {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.85);
        display: block;
        max-width: 500rpx;
        line-height: 1.4;
        letter-spacing: 2rpx;
      }
    }

    .header-illust {
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
        box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

        &.card-back {
          width: 100rpx;
          height: 100rpx;
          right: 30rpx;
          top: 0;
          transform: rotate(15deg);
          opacity: 0.6;
        }

        &.card-front {
          width: 120rpx;
          height: 130rpx;
          right: 10rpx;
          top: 20rpx;
          transform: rotate(-5deg);
          z-index: 2;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;

          .vote-box {
            width: 70rpx;
            height: 70rpx;
            border: 4rpx solid rgba(255, 255, 255, 0.5);
            border-radius: 8rpx;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 40rpx;
              height: 6rpx;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 3rpx;
            }

            .paper {
              position: absolute;
              top: -10rpx;
              left: 50%;
              transform: translateX(-50%);
              width: 30rpx;
              height: 40rpx;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 2rpx;
              animation: drop 2s ease-in-out infinite;
            }
          }
        }
      }

      .illust-badge {
        position: absolute;
        left: 3.5rem;
        top: 40rpx;
        background: #fff;
        border-radius: 50%;
        padding: 4rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        z-index: 3;
        animation: float 3s ease-in-out infinite;
      }
    }
  }
}

.search-section {
  padding: 30rpx @page-padding;
  margin-top: -1.5rem;
  position: relative;
  z-index: 10;

  .search-container {
    background: #fff;
    border-radius: 44rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);

    input {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
      margin-left: 12rpx;
    }

    .search-btn {
      font-size: 28rpx;
      color: #3B82F6;
      font-weight: 600;
      padding-left: 20rpx;
      border-left: 1rpx solid #F1F5F9;
    }
  }
}

.action-buttons-section {
  padding: 0 @page-padding 30rpx;
  display: flex;
  gap: 20rpx;
  position: relative;
  z-index: 5;

  .action-btn-item {
    flex: 1;
    height: 100rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    font-size: 30rpx;
    font-weight: 600;
    transition: all 0.2s;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    &.primary {
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
      color: #fff;
      box-shadow: 0 8rpx 20rpx rgba(59, 130, 246, 0.2);
    }

    &.secondary {
      background: #fff;
      color: #3B82F6;
      border: 1rpx solid #E0E7FF;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);
    }
  }
}

.stats-card-container {
  padding: 0 @page-padding;
  margin-bottom: 30rpx;

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
      grid-template-columns: repeat(4, 1fr);
      text-align: center;

      .stats-item {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .stats-label {
          font-size: 22rpx;
          color: #94A3B8;
        }

        .stats-num {
          font-size: 36rpx;
          font-weight: 700;
          color: #1E293B;
          font-family: 'DIN Alternate', sans-serif;
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



.tabs-bar {
  background: #F8FAFC;
  padding: 10rpx @page-padding 20rpx;
  z-index: 20;
  width: 100%;
  box-sizing: border-box;

  .tabs-scroll {
    white-space: nowrap;
    background: #EDF2F7;
    border-radius: 16rpx;
    padding: 8rpx;
    width: 100%;
    box-sizing: border-box;

    // 隐藏滚动条
    ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
    }
  }

  .tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 72rpx;
    padding: 0 40rpx;
    border-radius: 12rpx;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;

    text {
      font-size: 26rpx;
      color: #64748B;
      font-weight: 500;
      transition: all 0.3s;
      white-space: nowrap;
    }

    &.active {
      background: #FFFFFF;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

      text {
        color: #3B82F6;
        font-weight: 600;
      }
    }
  }
}

.content-scroll {
  flex: 1;
  height: 0;

  .vote-list {
    padding: 10rpx @page-padding 40rpx;

    .vote-card {
      background: #fff;
      border-radius: 28rpx;
      padding: 32rpx;
      margin-bottom: 28rpx;
      box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.03);
      border: 1rpx solid rgba(241, 245, 249, 0.8);
      transition: all 0.2s;

      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.02);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 24rpx;

        .time-info {
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-size: 22rpx;
          color: #94A3B8;

          &::before {
            content: '';
            width: 8rpx;
            height: 8rpx;
            border-radius: 50%;
            background: #CBD5E1;
          }
        }

        .status-tag {
          font-size: 20rpx;
          padding: 6rpx 16rpx;
          border-radius: 10rpx;
          font-weight: 600;

          &.ongoing {
            background: #FEF2F2;
            color: #EF4444;
          }

          &.ended {
            background: #F1F5F9;
            color: #64748B;
          }
        }
      }

      .card-content {
        margin-bottom: 32rpx;

        .vote-title {
          font-size: 32rpx;
          font-weight: 600;
          color: #1E293B;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 28rpx;
        border-top: 2rpx dashed #F1F5F9;

        .participants {
          display: flex;
          align-items: center;
          gap: 10rpx;
          
          text {
            font-size: 24rpx;
            color: #64748B;
            font-weight: 500;
          }
        }

        .action-btn {
          font-size: 26rpx;
          padding: 12rpx 36rpx;
          border-radius: 30rpx;
          font-weight: 600;
          transition: all 0.2s;

          &.ongoing {
            background: #3B82F6;
            color: #FFFFFF;
            box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.2);
          }

          &.ended {
            background: #F1F5F9;
            color: #94A3B8;
          }
        }
      }
    }

    .list-end {
      text-align: center;
      padding: 40rpx 0;
      font-size: 24rpx;
      color: #CBD5E1;
    }
  }

  .empty-state {
    padding-top: 120rpx;
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

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}

@keyframes drop {
  0% { transform: translateX(-50%) translateY(-20rpx); opacity: 0; }
  50% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(20rpx); opacity: 0; }
}
</style>
