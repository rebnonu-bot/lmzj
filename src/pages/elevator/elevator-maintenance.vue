<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">电梯维保</text>
      </view>
      
      <!-- Decor background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Top Info Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="info-item">
          <text class="label">小区名称</text>
          <text class="value">阳光水岸一期</text>
        </view>
        <view class="info-item">
          <text class="label">电梯使用单位</text>
          <text class="value">阳光物业管理有限公司</text>
        </view>
        <view class="info-item">
          <text class="label">电梯维保单位</text>
          <text class="value">奥的斯电梯服务有限公司</text>
        </view>
        <view class="info-item">
          <text class="label">急修电话</text>
          <text class="value highlight">400-888-9999</text>
        </view>
        <view class="info-item">
          <text class="label">投诉电话</text>
          <text class="value highlight">0512-12345678</text>
        </view>
      </view>
    </view>

    <!-- 3. Tabs -->
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

    <!-- 4. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content" v-if="activeTab === 0">
        <!-- Maintenance Records -->
        <view class="record-list">
          <view class="record-card" v-for="(item, index) in maintenanceRecords" :key="index">
            <view class="record-header">
              <view class="task-badge">维保任务</view>
              <text class="record-time">{{ item.date }}</text>
            </view>
            <view class="record-body">
              <view class="record-row">
                <text class="r-label">维保人：</text>
                <text class="r-value">【{{ item.worker }}】</text>
              </view>
              <view class="record-row">
                <text class="r-label">维保状态：</text>
                <text class="r-value status-done">{{ item.status }}</text>
              </view>
            </view>
          </view>
          
          <view class="load-more" v-if="maintenanceRecords.length > 0">
            <text>没有更多记录了</text>
          </view>
          <view class="empty-state" v-else>
            <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
            <text>暂无维保记录</text>
          </view>
        </view>
      </view>

      <!-- Basic Info Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view class="basic-info-card">
          <view class="info-row">
            <text class="i-label">电梯编号</text>
            <text class="i-value">E-2026-001</text>
          </view>
          <view class="info-row">
            <text class="i-label">电梯类型</text>
            <text class="i-value">乘客电梯</text>
          </view>
          <view class="info-row">
            <text class="i-label">安装日期</text>
            <text class="i-value">2020-05-12</text>
          </view>
          <view class="info-row">
            <text class="i-label">下次检验日期</text>
            <text class="i-value highlight">2026-05-11</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Global Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const activeTab = ref(0);
const tabs = ['维保记录', '电梯基本信息'];

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.reLaunch({
      url: '/pages/index/index'
    });
  }
};

// Mock data
const maintenanceRecords = ref([
  {
    worker: '王工',
    date: '2026-02-01 10:00',
    status: '已完成'
  },
  {
    worker: '李工',
    date: '2026-01-15 14:30',
    status: '已完成'
  },
  {
    worker: '张工',
    date: '2026-01-01 09:00',
    status: '已完成'
  }
]);
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
  margin-top: -5rem; // Lift the card into the header
  position: relative;
  z-index: 3;
}

.info-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .info-item {
    display: flex;
    margin-bottom: 24rpx;
    
    &:last-child {
      margin-bottom: 0;
    }

    .label {
      width: 200rpx;
      font-size: 28rpx;
      color: #94A3B8;
    }

    .value {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;

      &.highlight {
        color: #3B82F6;
      }
    }
  }
}

.tabs-container {
  display: flex;
  background: transparent;
  padding: 40rpx @page-padding 20rpx;
  position: sticky;
  top: 0;
  z-index: 10;

  .tab-item {
    position: relative;
    padding: 10rpx 0;
    margin-right: 48rpx;
    font-size: 32rpx;
    color: #64748B;
    transition: all 0.3s;

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
      background: #3B82F6;
      border-radius: 4rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  height: 0; // Allow flex-grow to work
}

.tab-content {
  padding: 0 @page-padding 40rpx;
}

.record-list {
  .record-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .record-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      border-bottom: 1rpx solid #F1F5F9;
      padding-bottom: 20rpx;

      .task-badge {
        padding: 6rpx 20rpx;
        background: #EBF2FF;
        color: #3B82F6;
        font-size: 24rpx;
        border-radius: 8rpx;
        font-weight: 500;
      }

      .record-time {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .record-body {
      .record-row {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .r-label {
          font-size: 28rpx;
          color: #64748B;
        }

        .r-value {
          font-size: 28rpx;
          color: #1E293B;
          
          &.status-done {
            color: #10B981;
          }
        }
      }
    }
  }
}

.basic-info-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #F1F5F9;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    &:first-child {
      padding-top: 0;
    }

    .i-label {
      font-size: 28rpx;
      color: #64748B;
    }

    .i-value {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;

      &.highlight {
        color: #EF4444;
      }
    }
  }
}

.load-more {
  text-align: center;
  padding: 20rpx 0;
  color: #CBD5E1;
  font-size: 24rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
  color: #94A3B8;

  text {
    margin-top: 20rpx;
    font-size: 28rpx;
  }
}
</style>
