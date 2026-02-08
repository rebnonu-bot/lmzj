<template>
  <view class="page-container">
    <!-- 1. Custom Header Section -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#333" />
        </view>
        <text class="page-title">投票议题</text>
      </view>
    </view>

    <!-- 2. Tabs Section -->
    <view class="tabs-bar">
      <view class="tabs-container">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <t-icon 
            :name="tab.icon" 
            size="32rpx" 
            :color="activeTab === index ? '#3B82F6' : '#64748B'" 
          />
          <text>{{ tab.name }}</text>
        </view>
      </view>
    </view>

    <!-- 3. Content Section -->
    <view class="content-section">
      <!-- List View -->
      <view class="vote-list" v-if="displayVotes.length > 0">
        <view 
          v-for="(item, index) in displayVotes" 
          :key="index"
          class="vote-card"
        >
          <view class="card-left">
            <view class="topic-title">{{ item.title }}</view>
            <view class="topic-info">
              <text class="date">{{ item.date }}</text>
              <text class="type" :class="item.typeCode">{{ item.typeName }}</text>
            </view>
          </view>
          <view class="card-right">
            <view 
              class="status-btn" 
              :class="activeTab === 0 ? 'active' : 'history'"
              @click="handleAction(item)"
            >
              {{ activeTab === 0 ? '参与投票' : '查看结果' }}
            </view>
          </view>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="120rpx" color="#CBD5E1" />
        <text class="empty-text">暂时没有{{ activeTab === 0 ? '可以投票的议题' : '历史投票记录' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const activeTab = ref(0);

onLoad((options) => {
  if (options && options.tab) {
    activeTab.value = parseInt(options.tab);
  }
});
const tabs = [
  { name: '当前投票', icon: 'check-rectangle' },
  { name: '历史投票', icon: 'history' }
];

// 模拟数据
const mockVotes = ref([
  {
    id: 1,
    title: '关于2026年度物业管理服务费调整的表决议案',
    date: '2026-02-01',
    typeName: '重大事项',
    typeCode: 'major',
    status: 0 // 0: 当前, 1: 历史
  },
  {
    id: 2,
    title: '关于小区西门道闸设备更换维修资金使用的申请',
    date: '2026-02-05',
    typeName: '维修资金',
    typeCode: 'repair',
    status: 0
  },
  {
    id: 3,
    title: '第三届业主委员会委员差额选举投票',
    date: '2025-12-20',
    typeName: '业委会选举',
    typeCode: 'election',
    status: 1
  },
  {
    id: 4,
    title: '关于小区公共区域广告收益分配方案的公示表决',
    date: '2025-11-15',
    typeName: '公共收益',
    typeCode: 'income',
    status: 1
  }
]);

const displayVotes = computed(() => {
  return mockVotes.value.filter(item => item.status === activeTab.value);
});

const goBack = () => {
  uni.navigateBack();
};

const handleAction = (item: any) => {
  if (activeTab.value === 0) {
    uni.navigateTo({
      url: `/pages/voting/vote-detail?id=${item.id}`
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
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.header-section {
  padding-top: var(--status-bar-height);
  background-color: #fff;

  .header-top {
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 @page-padding;
    position: relative;

    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      z-index: 10;
    }

    .page-title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 34rpx;
      font-weight: 600;
      color: #1E293B;
    }
  }
}

.tabs-bar {
  padding: 10rpx @page-padding 30rpx;
  background-color: #fff;

  .tabs-container {
    display: flex;
    background: #F1F5F9;
    border-radius: 20rpx;
    padding: 8rpx;
    gap: 8rpx;
  }

  .tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    gap: 12rpx;
    border-radius: 16rpx;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    text {
      font-size: 28rpx;
      color: #64748B;
      font-weight: 500;
      transition: all 0.3s;
    }

    &.active {
      background-color: #fff;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      
      text {
        color: #3B82F6;
        font-weight: 600;
      }
    }
    
    // 移除之前的分隔线和三角形逻辑
    &::before, &::after {
      display: none !important;
    }
  }
}

.content-section {
  flex: 1;
  background-color: #fff;
  padding: 0;

  .vote-list {
    .vote-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx @page-padding;
      border-bottom: 1rpx solid #F1F5F9;

      .card-left {
        flex: 1;
        margin-right: 20rpx;

        .topic-title {
          font-size: 30rpx;
          color: #333;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 12rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .topic-info {
          display: flex;
          align-items: center;
          gap: 20rpx;

          .date {
            font-size: 24rpx;
            color: #94A3B8;
          }

          .type {
            font-size: 20rpx;
            padding: 4rpx 12rpx;
            border-radius: 6rpx;
            font-weight: 500;

            &.major { background: #EEF2FF; color: #4F46E5; }
            &.repair { background: #FFF7ED; color: #EA580C; }
            &.election { background: #F0FDF4; color: #16A34A; }
            &.income { background: #FEF2F2; color: #DC2626; }
          }
        }
      }

      .card-right {
        .status-btn {
          font-size: 26rpx;
          padding: 12rpx 24rpx;
          border-radius: 30rpx;
          font-weight: 500;

          &.active {
            background-color: #3B82F6;
            color: #fff;
          }

          &.history {
            background-color: #F1F5F9;
            color: #64748B;
          }
        }
      }
    }
  }

  .empty-state {
    padding-top: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20rpx;

    .empty-text {
      font-size: 28rpx;
      color: #94A3B8;
    }
  }
}
</style>
