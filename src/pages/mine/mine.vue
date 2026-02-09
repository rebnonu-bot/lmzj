<template>
  <view class="page-container">
    <!-- 1. Header with Background Wave -->
    <view class="header-section">
      <view class="user-info-card" @click="handleToProfile">
        <view class="avatar-box">
          <t-avatar 
            size="120rpx" 
            icon="user"
          />
        </view>
        <view class="user-details">
          <view class="name-row">
            <text class="username">刘泽辉</text>
          </view>
          <view class="id-row">
            <text class="user-id">138****6666</text>
            <view class="tag-box">
              <text class="tag verified">已认证</text>
            </view>
            <t-icon 
              name="logo-wechat-stroke" 
              size="32rpx" 
              color="#07C160" 
              class="wechat-icon"
            />
          </view>
        </view>
        <t-icon name="chevron-right" size="40rpx" color="#CBD5E1" class="more-icon" />
      </view>

      <!-- Wave decoration -->
      <view class="decor-circle"></view>
      <view class="header-wave"></view>
    </view>

    <!-- 2. Function Grid -->
    <view class="function-section">
      <view class="function-card">
        <view class="function-item" @click="handleToHouse">
          <view class="icon-box house">
            <t-icon name="home" size="48rpx" color="#3B82F6" />
          </view>
          <view class="info">
            <text class="title">我的房屋</text>
            <text class="desc">3套房屋</text>
          </view>
          <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
        </view>
        
        <view class="divider-v"></view>

        <view class="function-item" @click="handleToMessage">
          <view class="icon-box message">
            <t-icon name="chat" size="48rpx" color="#10B981" />
            <view class="badge">3</view>
          </view>
          <view class="info">
            <text class="title">我的消息</text>
            <text class="desc">3条未读</text>
          </view>
          <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
        </view>
      </view>
    </view>

    <!-- 3. Menu List -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="handleToAuth">
          <view class="menu-left">
            <t-icon name="user-checked" size="44rpx" color="#3B82F6" class="menu-icon" />
            <text class="menu-label">实名认证</text>
          </view>
          <t-icon name="chevron-right" size="40rpx" color="#CBD5E1" />
        </view>
        <view class="menu-item" @click="handleToHouse">
          <view class="menu-left">
            <t-icon name="assignment" size="44rpx" color="#3B82F6" class="menu-icon" />
            <text class="menu-label">房屋绑定</text>
          </view>
          <t-icon name="chevron-right" size="40rpx" color="#CBD5E1" />
        </view>
      </view>

      <view class="menu-gap"></view>

      <view class="menu-group">
        <view class="menu-item" @click="handleAction('在线客服')">
          <view class="menu-left">
            <t-icon name="service" size="44rpx" color="#3B82F6" class="menu-icon" />
            <text class="menu-label">在线客服</text>
          </view>
          <t-icon name="chevron-right" size="40rpx" color="#CBD5E1" />
        </view>
        <view class="menu-item" @click="handleToSecurityLog">
          <view class="menu-left">
            <t-icon name="secured" size="44rpx" color="#3B82F6" class="menu-icon" />
            <text class="menu-label">安全日志</text>
          </view>
          <t-icon name="chevron-right" size="40rpx" color="#CBD5E1" />
        </view>
      </view>
    </view>

    <!-- 4. Action Buttons -->
    <view class="action-section">
      <view class="action-item switch" @click="handleToSwitchAccount">
        <text>切换账号</text>
      </view>
      <view class="action-item logout" @click="handleAction('退出登录')">
        <text>退出登录</text>
      </view>
    </view>

    <app-footer />
    <app-tab-bar activePath="pages/mine/mine" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar().catch(() => {});
});

const handleToProfile = () => {
  uni.navigateTo({
    url: '/pages/mine/profile'
  });
};

const handleToHouse = () => {
  uni.navigateTo({
    url: '/pages/mine/house'
  });
};

const handleToMessage = () => {
  uni.navigateTo({
    url: '/pages/mine/message'
  });
};

const handleToAuth = () => {
  uni.navigateTo({
    url: '/pages/mine/auth'
  });
};

const handleToSecurityLog = () => {
  uni.navigateTo({
    url: '/pages/mine/security-log'
  });
};

const handleToSwitchAccount = () => {
  uni.navigateTo({
    url: '/pages/mine/switch-account'
  });
};

const handleAction = (name: string) => {
  uni.showToast({
    title: name + '功能开发中',
    icon: 'none'
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  padding-bottom: 160rpx;
}

.header-section {
  position: relative;
  height: 6rem;
  background: linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 70%, #FFFFFF 100%);
  padding: 60rpx @page-padding 0;
  overflow: hidden;

  .user-info-card {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }

    .avatar-box {
      border: 4rpx solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      line-height: 0;
    }

    .user-details {
      flex: 1;
      margin-left: 24rpx;

      .name-row {
        .username {
          font-size: 36rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .id-row {
        margin-top: 8rpx;
        display: flex;
        align-items: center;

        .user-id {
          font-size: 26rpx;
          color: #64748B;
          letter-spacing: 1rpx;
        }

        .tag-box {
          margin-left: 16rpx;
          display: flex;
          align-items: center;

          .tag {
            padding: 2rpx 12rpx;
            border-radius: 20rpx;
            font-size: 20rpx;
            
            &.verified {
              background: #FFF7ED;
              color: #FB923C;
              border: 1px solid rgba(251, 146, 60, 0.2);
            }
          }
        }

        .wechat-icon {
          margin-left: 12rpx;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .header-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: radial-gradient(circle at 50% 100%, transparent 50%, #F8FAFC 100%);
    opacity: 0.5;
  }

  .decor-circle {
    position: absolute;
    right: -100rpx;
    top: -50rpx;
    width: 300rpx;
    height: 300rpx;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
    z-index: 1;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20rpx);
    }
  }
}

.function-section {
  padding: 0 @page-padding;
  margin-top: -40rpx;
  position: relative;
  z-index: 10;

  .function-card {
    background: #FFFFFF;
    border-radius: @radius-large;
    padding: 32rpx;
    box-shadow: 0 10rpx 25rpx -5rpx rgba(0, 0, 0, 0.05), 0 8rpx 10rpx -6rpx rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;

    .function-item {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 8rpx 0;
      cursor: pointer;

      &:active {
        opacity: 0.7;
      }

      .icon-box {
        position: relative;
        width: 80rpx;
        height: 80rpx;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;

        &.house {
          background: #EFF6FF;
        }

        &.message {
          background: #ECFDF5;
        }

        .badge {
          position: absolute;
          top: -6rpx;
          right: -6rpx;
          background: #EF4444;
          color: #FFFFFF;
          font-size: 20rpx;
          font-weight: bold;
          padding: 2rpx 10rpx;
          border-radius: 20rpx;
          border: 2rpx solid #FFFFFF;
        }
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;

        .title {
          font-size: 28rpx;
          font-weight: 600;
          color: #1E293B;
        }

        .desc {
          font-size: 22rpx;
          color: #94A3B8;
          margin-top: 4rpx;
        }
      }
    }

    .divider-v {
      width: 1rpx;
      height: 60rpx;
      background: #F1F5F9;
      margin: 0 24rpx;
    }
  }
}

.menu-section {
  margin-top: 20rpx;
  
  .menu-group {
    background: #FFFFFF;
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx @page-padding;
      border-bottom: 1rpx solid #F1F5F9;

      &:last-child {
        border-bottom: none;
      }

      .menu-left {
        display: flex;
        align-items: center;

        .menu-icon {
          margin-right: 24rpx;
        }

        .menu-label {
          font-size: 32rpx;
          color: #1E293B;
        }
      }

      &:active {
        background: #F8FAFC;
      }
    }
  }

  .menu-gap {
    height: 20rpx;
    background: #F8FAFC;
  }
}

.action-section {
  margin-top: 20rpx;

  .action-item {
    height: 100rpx;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: 500;
    margin-bottom: 20rpx;

    &:active {
      background: #F8FAFC;
    }

    &.switch {
      color: #3B82F6;
    }

    &.logout {
      color: #EF4444;
      margin-bottom: 0;
    }
  }
}
</style>
