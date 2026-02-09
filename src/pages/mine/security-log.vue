<template>
  <view class="page-container">
    <t-navbar
      title="安全日志"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <view class="filter-tabs">
      <t-tabs :value="activeTab" @change="handleTabChange" :bottom-line="true">
        <t-tab-panel label="全部" value="all" />
        <t-tab-panel label="登录" value="login" />
        <t-tab-panel label="绑定" value="bind" />
        <t-tab-panel label="投票" value="vote" />
      </t-tabs>
    </view>

    <scroll-view scroll-y class="log-scroll">
      <view class="log-list" v-if="filteredLogs.length > 0">
        <view 
          v-for="(log, index) in filteredLogs" 
          :key="log.id" 
          class="log-card"
        >
          <view class="log-header">
            <view class="log-type-tag" :class="log.type">
              <t-icon :name="getIcon(log.type)" size="32rpx" color="#FFFFFF" />
              <text>{{ getTypeText(log.type) }}</text>
            </view>
            <text class="log-time">{{ log.time }}</text>
          </view>
          
          <view class="log-body">
            <view class="log-title">{{ log.title }}</view>
            <view class="log-details">
              <view class="detail-item">
                <text class="label">操作状态：</text>
                <text class="status" :class="log.status">{{ log.statusText }}</text>
              </view>
              <view class="detail-item" v-if="log.ip">
                <text class="label">IP地址：</text>
                <text class="value">{{ log.ip }}</text>
              </view>
              <view class="detail-item" v-if="log.device">
                <text class="label">设备终端：</text>
                <text class="value">{{ log.device }}</text>
              </view>
              <view class="detail-item" v-if="log.location">
                <text class="label">地理位置：</text>
                <text class="value">{{ log.location }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="load-more">仅展示最近30天的安全日志</view>
      </view>

      <view class="empty-state" v-else>
        <t-icon name="Secure-checked" size="120rpx" color="#E2E8F0" />
        <text class="empty-text">暂无相关日志记录</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface SecurityLog {
  id: string;
  type: 'login' | 'bind' | 'vote';
  title: string;
  time: string;
  status: 'success' | 'fail';
  statusText: string;
  ip?: string;
  device?: string;
  location?: string;
}

const activeTab = ref('all');

const logs = ref<SecurityLog[]>([
  {
    id: '1',
    type: 'login',
    title: '账号登录成功',
    time: '2024-03-20 10:45:22',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)',
    location: '北京市 朝阳区'
  },
  {
    id: '2',
    type: 'vote',
    title: '参与“物业费调整”投票',
    time: '2024-03-19 15:30:10',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)'
  },
  {
    id: '3',
    type: 'bind',
    title: '房屋绑定申请',
    time: '2024-03-18 09:20:45',
    status: 'success',
    statusText: '成功',
    ip: '223.104.41.12',
    device: 'Chrome 122.0.0 (H5)',
    location: '北京市 海淀区'
  },
  {
    id: '4',
    type: 'login',
    title: '账号登录失败',
    time: '2024-03-17 22:15:05',
    status: 'fail',
    statusText: '密码错误',
    ip: '114.242.25.18',
    device: 'Unknown Device',
    location: '上海市 浦东新区'
  },
  {
    id: '5',
    type: 'bind',
    title: '解除房屋绑定',
    time: '2024-03-15 14:00:33',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)'
  }
]);

const handleBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.switchTab({
      url: '/pages/mine/mine'
    });
  }
};

const handleTabChange = (e: any) => {
  activeTab.value = e.detail.value;
};

const filteredLogs = computed(() => {
  if (activeTab.value === 'all') return logs.value;
  return logs.value.filter(log => log.type === activeTab.value);
});

const getIcon = (type: string) => {
  switch (type) {
    case 'login': return 'user';
    case 'bind': return 'assignment';
    case 'vote': return 'bulletpoint';
    default: return 'info-circle';
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case 'login': return '登录日志';
    case 'bind': return '绑定日志';
    case 'vote': return '投票日志';
    default: return '系统日志';
  }
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

.filter-tabs {
  background: #FFFFFF;
  position: sticky;
  top: 100rpx;
  z-index: 10;
}

.log-scroll {
  flex: 1;
}

.log-list {
  padding: 24rpx @page-padding;
}

.log-card {
  background: #FFFFFF;
  border-radius: @radius-large;
  padding: 24rpx 30rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .log-type-tag {
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 4rpx 16rpx;
      border-radius: 20rpx;
      
      text {
        font-size: 22rpx;
        color: #FFFFFF;
        font-weight: 500;
      }

      &.login { background: #3B82F6; }
      &.bind { background: #8B5CF6; }
      &.vote { background: #10B981; }
    }

    .log-time {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .log-body {
    .log-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 16rpx;
    }

    .log-details {
      background: #F8FAFC;
      border-radius: 12rpx;
      padding: 16rpx 20rpx;

      .detail-item {
        display: flex;
        font-size: 24rpx;
        line-height: 1.8;

        .label {
          color: #64748B;
          width: 130rpx;
        }

        .value {
          color: #1E293B;
          flex: 1;
        }

        .status {
          font-weight: 500;
          &.success { color: #10B981; }
          &.fail { color: #EF4444; }
        }
      }
    }
  }
}

.load-more {
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
