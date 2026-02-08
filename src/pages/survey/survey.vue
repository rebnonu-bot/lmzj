<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">民意调查</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">2</text>
            <text class="label">进行中</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">5</text>
            <text class="label">已参与</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">18</text>
            <text class="label">累计调查</text>
          </view>
        </view>
      </view>
    </view>

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

    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content">
        <view class="survey-card" v-for="(item, index) in filteredSurveys" :key="index">
          <view class="survey-header">
            <view class="survey-status" :class="item.statusType">{{ item.statusText }}</view>
            <view class="survey-reward" v-if="item.reward">
              <t-icon name="gift" size="24rpx" color="#F59E0B" />
              <text>{{ item.reward }}</text>
            </view>
          </view>
          <view class="survey-title">{{ item.title }}</view>
          <view class="survey-info">
            <view class="info-item">
              <t-icon name="time" size="28rpx" color="#94A3B8" />
              <text>截止日期：{{ item.deadline }}</text>
            </view>
            <view class="info-item">
              <t-icon name="user" size="28rpx" color="#94A3B8" />
              <text>参与人数：{{ item.participants }}人</text>
            </view>
          </view>
          <view class="survey-footer">
            <view class="survey-btn" :class="{ disabled: item.statusType === 'ended' }">
              {{ item.statusType === 'ongoing' ? '参与调查' : '查看报告' }}
            </view>
          </view>
        </view>
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

const activeTab = ref(0);
const tabs = ['全部', '进行中', '已结束'];

const goBack = () => {
  uni.navigateBack();
};

const surveys = ref([
  { 
    title: '小区公共空间绿化改造意见调查', 
    deadline: '2026-03-15', 
    participants: 320, 
    statusText: '进行中', 
    statusType: 'ongoing',
    reward: '10积分'
  },
  { 
    title: '关于社区周末文化活动的意向调查', 
    deadline: '2026-02-28', 
    participants: 156, 
    statusText: '进行中', 
    statusType: 'ongoing',
    reward: '精美礼品'
  },
  { 
    title: '2025年冬季供暖满意度专题调查', 
    deadline: '2026-01-10', 
    participants: 890, 
    statusText: '已结束', 
    statusType: 'ended' 
  },
  { 
    title: '小区智慧化停车方案反馈调查', 
    deadline: '2025-12-20', 
    participants: 540, 
    statusText: '已结束', 
    statusType: 'ended' 
  }
]);

const filteredSurveys = computed(() => {
  if (activeTab.value === 1) return surveys.value.filter(s => s.statusType === 'ongoing');
  if (activeTab.value === 2) return surveys.value.filter(s => s.statusType === 'ended');
  return surveys.value;
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

.info-card-container {
  padding: 0 @page-padding;
  margin-top: -5rem;
  position: relative;
  z-index: 3;
}

.info-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .stat-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      text-align: center;
      .num {
        display: block;
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 4rpx;
      }
      .label {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .stat-divider {
      width: 1rpx;
      height: 40rpx;
      background: #F1F5F9;
    }
  }
}

.tabs-container {
  display: flex;
  padding: 40rpx @page-padding 20rpx;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 10;

  .tab-item {
    margin-right: 48rpx;
    position: relative;
    padding-bottom: 12rpx;
    font-size: 30rpx;
    color: #64748B;
    transition: all 0.3s;

    &.active {
      color: #0F172A;
      font-weight: 600;
    }

    .active-bar {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32rpx;
      height: 6rpx;
      background: #3B82F6;
      border-radius: 3rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  overflow: hidden;
}

.tab-content {
  padding: 0 @page-padding 40rpx;
}

.survey-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  position: relative;

  .survey-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .survey-status {
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;

      &.ongoing {
        background: #E0F2FE;
        color: #0284C7;
      }

      &.ended {
        background: #F1F5F9;
        color: #94A3B8;
      }
    }

    .survey-reward {
      display: flex;
      align-items: center;
      gap: 6rpx;
      font-size: 22rpx;
      color: #F59E0B;
      background: #FFFBEB;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
    }
  }

  .survey-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.4;
    margin-bottom: 24rpx;
  }

  .survey-info {
    margin-bottom: 30rpx;

    .info-item {
      display: flex;
      align-items: center;
      gap: 12rpx;
      font-size: 26rpx;
      color: #64748B;
      margin-bottom: 12rpx;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .survey-footer {
    border-top: 1rpx solid #F1F5F9;
    padding-top: 24rpx;
    display: flex;
    justify-content: flex-end;

    .survey-btn {
      padding: 16rpx 48rpx;
      background: @primary-blue;
      color: #FFFFFF;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 12rpx;
      transition: all 0.2s;

      &:active {
        opacity: 0.8;
      }

      &.disabled {
        background: #F1F5F9;
        color: #94A3B8;
      }
    }
  }
}
</style>
