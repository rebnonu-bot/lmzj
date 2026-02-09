<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">小区招采</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">2</text>
            <text class="label">正在招标</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">5</text>
            <text class="label">已公示</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">42</text>
            <text class="label">项目总数</text>
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
        <view class="bidding-card" v-for="(item, index) in filteredProjects" :key="index">
          <view class="card-header">
            <view class="project-tag">{{ item.type }}</view>
            <view class="status-badge" :class="item.statusType">{{ item.status }}</view>
          </view>
          <view class="project-title">{{ item.title }}</view>
          <view class="project-info">
            <view class="info-row">
              <text class="label">项目预算：</text>
              <text class="value highlight">￥{{ item.budget }}</text>
            </view>
            <view class="info-row">
              <text class="label">截止日期：</text>
              <text class="value">{{ item.deadline }}</text>
            </view>
          </view>
          <view class="card-footer">
            <view class="footer-btn">查看公告</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';




const activeTab = ref(0);
const tabs = ['全部', '招标中', '已公示', '已完成'];

const goBack = () => {
  uni.navigateBack();
};

const projects = ref([
  { 
    title: '2026年度小区电梯维护保养服务采购项目', 
    type: '服务类', 
    budget: '150,000.00', 
    status: '招标中', 
    statusType: 'ongoing',
    deadline: '2026-03-01'
  },
  { 
    title: '小区中心花园景观亮化提升工程', 
    type: '工程类', 
    budget: '85,000.00', 
    status: '招标中', 
    statusType: 'ongoing',
    deadline: '2026-02-20'
  },
  { 
    title: '关于小区监控系统升级改造项目的中标候选人公示', 
    type: '工程类', 
    budget: '120,000.00', 
    status: '已公示', 
    statusType: 'announced',
    deadline: '2026-01-30'
  },
  { 
    title: '2025年度小区化粪池清掏服务项目', 
    type: '服务类', 
    budget: '30,000.00', 
    status: '已完成', 
    statusType: 'completed',
    deadline: '2025-12-15'
  }
]);

const filteredProjects = computed(() => {
  if (activeTab.value === 1) return projects.value.filter(p => p.statusType === 'ongoing');
  if (activeTab.value === 2) return projects.value.filter(p => p.statusType === 'announced');
  if (activeTab.value === 3) return projects.value.filter(p => p.statusType === 'completed');
  return projects.value;
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

.bidding-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .project-tag {
      font-size: 20rpx;
      background: #F1F5F9;
      color: #64748B;
      padding: 4rpx 16rpx;
      border-radius: 6rpx;
    }

    .status-badge {
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;

      &.ongoing {
        background: #E0F2FE;
        color: #0284C7;
      }

      &.announced {
        background: #FEF3C7;
        color: #D97706;
      }

      &.completed {
        background: #F1F5F9;
        color: #94A3B8;
      }
    }
  }

  .project-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.4;
    margin-bottom: 24rpx;
  }

  .project-info {
    margin-bottom: 30rpx;
    background: #F8FAFC;
    border-radius: 12rpx;
    padding: 20rpx;

    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        font-size: 26rpx;
        color: #94A3B8;
      }

      .value {
        font-size: 26rpx;
        color: #475569;

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

    .footer-btn {
      padding: 16rpx 40rpx;
      background: #FFFFFF;
      border: 1rpx solid #E2E8F0;
      color: #475569;
      font-size: 26rpx;
      border-radius: 12rpx;
      font-weight: 500;

      &:active {
        background: #F8FAFC;
      }
    }
  }
}
</style>
