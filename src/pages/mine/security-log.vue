<template>
  <view class="page-container">
    <t-navbar
      title="安全日志"
      left-arrow
      @go-back="handleBack"
      :fixed="false"
      class="custom-navbar"
    >
      <template #left-icon>
        <t-icon name="chevron-left" size="48rpx" color="#1E293B" />
      </template>
    </t-navbar>

    <!-- Header Background -->
    <view class="header-bg"></view>

    <view class="filter-tabs">
      <t-tabs 
        :value="activeTab" 
        @click="handleTabChange" 
        :bottom-line="true"
        class="custom-tabs"
      >
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
              <view class="icon-box">
                <t-icon :name="getIcon(log.type)" size="32rpx" color="#FFFFFF" />
              </view>
              <text>{{ getTypeText(log.type) }}</text>
            </view>
            <text class="log-time">{{ log.time }}</text>
          </view>
          
          <view class="log-body">
            <view class="log-title-row">
              <view class="title-indicator"></view>
              <text class="log-title">{{ log.title }}</text>
              <view class="status-badge" :class="log.status">
                {{ log.statusText }}
              </view>
            </view>
            
            <view class="log-details">
              <view class="detail-item" v-if="log.ip">
                <t-icon name="location" size="28rpx" color="#94A3B8" />
                <text class="label">IP地址</text>
                <text class="value">{{ log.ip }}</text>
              </view>
              <view class="detail-item" v-if="log.device">
                <t-icon name="mobile" size="28rpx" color="#94A3B8" />
                <text class="label">设备终端</text>
                <text class="value">{{ log.device }}</text>
              </view>
              <view class="detail-item" v-if="log.location">
                <t-icon name="map-location" size="28rpx" color="#94A3B8" />
                <text class="label">地理位置</text>
                <text class="value">{{ log.location }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="load-more">仅展示最近30天的安全日志</view>
      </view>

      <view class="empty-state" v-else>
        <t-icon name="secured" size="120rpx" color="#E2E8F0" />
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
    time: '2026-02-09 10:45:22',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)',
    location: '赣州市 章贡区'
  },
  {
    id: '2',
    type: 'vote',
    title: '参与“物业服务续聘”投票',
    time: '2026-02-08 15:30:10',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)',
    location: '赣州市 章贡区'
  },
  {
    id: '3',
    type: 'bind',
    title: '房屋绑定申请',
    time: '2026-01-20 09:20:45',
    status: 'success',
    statusText: '成功',
    ip: '223.104.41.12',
    device: 'Chrome 122.0.0 (H5)',
    location: '赣州市 章贡区'
  },
  {
    id: '4',
    type: 'login',
    title: '账号登录失败',
    time: '2026-01-15 22:15:05',
    status: 'fail',
    statusText: '密码错误',
    ip: '114.242.25.18',
    device: 'Unknown Device',
    location: '赣州市 章贡区'
  },
  {
    id: '5',
    type: 'bind',
    title: '房屋实名认证',
    time: '2026-01-10 14:00:33',
    status: 'success',
    statusText: '成功',
    ip: '192.168.1.105',
    device: 'iPhone 15 Pro (App)',
    location: '赣州市 章贡区'
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
  if (e && typeof e === 'object') {
    if (e.value !== undefined) {
      activeTab.value = String(e.value);
    } else if (e.detail && e.detail.value !== undefined) {
      activeTab.value = String(e.detail.value);
    }
  } else if (e !== undefined) {
    activeTab.value = String(e);
  }
};

const filteredLogs = computed(() => {
  const currentTab = String(activeTab.value);
  if (currentTab === 'all') return logs.value;
  return logs.value.filter(log => String(log.type) === currentTab);
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
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
  --td-navbar-color: #1E293B;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280rpx;
  background: @header-gradient;
  z-index: 0;
}

.filter-tabs {
  background: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .custom-tabs {
    --td-tab-item-active-color: @primary-blue;
    --td-tab-track-color: @primary-blue;
    --td-tab-font-size: 28rpx;
    --td-tab-active-font-size: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);
  }
}

.log-scroll {
  flex: 1;
  position: relative;
  z-index: 1;
}

.log-list {
  padding: 24rpx @page-padding;
}

.log-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.99);
    background: #FAFAFA;
  }

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28rpx;

    .log-type-tag {
      display: flex;
      align-items: center;
      gap: 12rpx;
      padding: 6rpx 20rpx 6rpx 8rpx;
      border-radius: 30rpx;
      
      .icon-box {
        width: 44rpx;
        height: 44rpx;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      text {
        font-size: 22rpx;
        color: #FFFFFF;
        font-weight: 600;
      }

      &.login { background: @primary-blue; }
      &.bind { background: #8B5CF6; }
      &.vote { background: #10B981; }
    }

    .log-time {
      font-size: 24rpx;
      color: #94A3B8;
      font-weight: 500;
    }
  }

  .log-body {
    .log-title-row {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      gap: 12rpx;

      .title-indicator {
        width: 8rpx;
        height: 28rpx;
        background: @primary-blue;
        border-radius: 4rpx;
      }

      .log-title {
        flex: 1;
        font-size: 30rpx;
        font-weight: 600;
        color: #1E293B;
      }

      .status-badge {
        font-size: 22rpx;
        padding: 4rpx 16rpx;
        border-radius: 8rpx;
        font-weight: 600;

        &.success { background: #F0FDF4; color: #10B981; }
        &.fail { background: #FEF2F2; color: #EF4444; }
      }
    }

    .log-details {
      background: #F8FAFC;
      border-radius: 16rpx;
      padding: 24rpx;
      display: flex;
      flex-direction: column;
      gap: 16rpx;

      .detail-item {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        gap: 12rpx;

        .label {
          color: #94A3B8;
          width: 120rpx;
          font-weight: 500;
        }

        .value {
          color: #475569;
          flex: 1;
          font-weight: 500;
        }
      }
    }
  }
}

.load-more {
  text-align: center;
  font-size: 24rpx;
  color: #94A3B8;
  padding: 20rpx 0 40rpx;
  font-weight: 500;
}

.empty-state {
  padding-top: 240rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-text {
    margin-top: 32rpx;
    font-size: 28rpx;
    color: #94A3B8;
    font-weight: 500;
  }
}
</style>
