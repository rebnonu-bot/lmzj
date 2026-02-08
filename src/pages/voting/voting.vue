<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">电子投票</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">3</text>
            <text class="label">进行中</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">12</text>
            <text class="label">已结束</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">100%</text>
            <text class="label">参与度</text>
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
        <view class="vote-card" v-for="(item, index) in filteredVotes" :key="index">
          <view class="vote-status" :class="item.statusType">{{ item.statusText }}</view>
          <view class="vote-title">{{ item.title }}</view>
          <view class="vote-info">
            <view class="info-item">
              <t-icon name="time" size="28rpx" color="#94A3B8" />
              <text>截止日期：{{ item.deadline }}</text>
            </view>
            <view class="info-item">
              <t-icon name="user" size="28rpx" color="#94A3B8" />
              <text>参与人数：{{ item.participants }}人</text>
            </view>
          </view>
          <view class="vote-footer">
            <view class="vote-btn" :class="{ disabled: item.statusType === 'ended' }">
              {{ item.statusType === 'ongoing' ? '立即投票' : '查看结果' }}
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

const votes = ref([
  { title: '2026年度小区物业管理满意度投票', deadline: '2026-03-31', participants: 450, statusText: '进行中', statusType: 'ongoing' },
  { title: '关于小区南门增加智能门禁系统的表决', deadline: '2026-02-15', participants: 890, statusText: '进行中', statusType: 'ongoing' },
  { title: '2026年春节装饰方案二选一', deadline: '2026-01-20', participants: 1100, statusText: '已结束', statusType: 'ended' },
  { title: '关于修缮小区2号喷泉池的意见征集', deadline: '2025-12-10', participants: 670, statusText: '已结束', statusType: 'ended' }
]);

const filteredVotes = computed(() => {
  if (activeTab.value === 1) return votes.value.filter(v => v.statusType === 'ongoing');
  if (activeTab.value === 2) return votes.value.filter(v => v.statusType === 'ended');
  return votes.value;
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
    margin-left: -1rem;

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

  .tab-item {
    position: relative;
    padding: 10rpx 0;
    margin-right: 48rpx;
    font-size: 30rpx;
    color: #64748B;

    &.active {
      color: #1E293B;
      font-weight: 600;
    }

    .active-bar {
      position: absolute;
      bottom: -4rpx;
      left: 0;
      width: 100%;
      height: 6rpx;
      background: #2DD4BF;
      border-radius: 4rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  height: 0;
}

.tab-content {
  padding: 0 @page-padding 40rpx;
}

.vote-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  position: relative;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .vote-status {
    position: absolute;
    top: 32rpx;
    right: 32rpx;
    font-size: 22rpx;
    padding: 4rpx 16rpx;
    border-radius: 8rpx;

    &.ongoing {
      background: #E6FFFA;
      color: #0D9488;
    }
    &.ended {
      background: #F1F5F9;
      color: #64748B;
    }
  }

  .vote-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 24rpx;
    padding-right: 100rpx;
    line-height: 1.4;
  }

  .vote-info {
    .info-item {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #94A3B8;
      margin-bottom: 12rpx;

      t-icon { margin-right: 8rpx; }
    }
  }

  .vote-footer {
    margin-top: 24rpx;
    display: flex;
    justify-content: flex-end;

    .vote-btn {
      background: #2DD4BF;
      color: #FFFFFF;
      font-size: 26rpx;
      padding: 12rpx 32rpx;
      border-radius: 30rpx;

      &.disabled {
        background: #F1F5F9;
        color: #94A3B8;
      }
    }
  }
}
</style>
