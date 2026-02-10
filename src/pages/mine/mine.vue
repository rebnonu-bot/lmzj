<template>
  <view class="page-container">
    <!-- 1. Minimalist Header -->
    <view class="header-section">
      <view class="user-info-box" @click="handleToProfile">
        <t-avatar 
          size="96rpx" 
          icon="user"
          class="user-avatar"
        />
        <view class="user-meta">
          <view class="name-row">
            <text class="username">刘泽辉</text>
            <view class="auth-badge">
              <t-icon name="check-circle-filled" size="24rpx" color="#10B981" />
              <text>已认证</text>
            </view>
          </view>
          <text class="user-phone">138****6666</text>
        </view>
        <view class="profile-link">
          <text>个人主页</text>
          <t-icon name="chevron-right" size="28rpx" color="rgba(255,255,255,0.7)" />
        </view>
      </view>
      
      <!-- Subtle Background Elements -->
      <view class="bg-circle c1"></view>
      <view class="bg-circle c2"></view>
    </view>

    <!-- 2. Dashboard Card (Floating) -->
    <view class="dashboard-section">
      <view class="stats-card">
        <view class="stat-item" @click="handleToHouse">
          <view class="stat-illust">
            <view class="illust-main">
              <view class="house-box">
                <view class="roof"></view>
                <view class="window"></view>
              </view>
              <view class="cloud c1"></view>
            </view>
          </view>
          <view class="stat-info">
            <text class="stat-num">3</text>
            <text class="stat-label">我的房屋</text>
          </view>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item" @click="handleToMessage">
          <view class="stat-illust">
            <view class="illust-main">
              <view class="msg-box">
                <view class="dot d1"></view>
                <view class="dot d2"></view>
              </view>
              <view class="cloud c2"></view>
              <view class="red-dot"></view>
            </view>
          </view>
          <view class="stat-info">
            <text class="stat-num">3</text>
            <text class="stat-label">未读消息</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 3. Fresh Menu List -->
    <view class="menu-section">
      <view class="menu-card">
        <view class="menu-list">
          <view class="menu-item" @click="handleToAuth">
            <view class="item-left">
              <view class="item-illust purple">
                <view class="shield-box">
                  <view class="check-mark"></view>
                </view>
              </view>
              <text class="item-text">实名认证</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
          
          <view class="menu-item" @click="handleToHouse">
            <view class="item-left">
              <view class="item-illust orange">
                <view class="card-stack">
                  <view class="card"></view>
                  <view class="card"></view>
                </view>
              </view>
              <text class="item-text">房屋管理</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>

          <view class="menu-item" @click="handleToSecurityLog">
            <view class="item-left">
              <view class="item-illust cyan">
                <view class="log-box">
                  <view class="line"></view>
                  <view class="line"></view>
                </view>
              </view>
              <text class="item-text">安全日志</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>

          <view class="menu-item" @click="handleAction('在线客服')">
            <view class="item-left">
              <view class="item-illust pink">
                <view class="headset-box">
                  <view class="arc"></view>
                  <view class="mic"></view>
                </view>
              </view>
              <text class="item-text">在线客服</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
        </view>
      </view>

      <view class="menu-card mt-24">
        <view class="menu-list">
          <view class="menu-item" @click="handleToSwitchAccount">
            <view class="item-left">
              <view class="item-illust blue">
                <view class="switch-box">
                  <view class="arrow a1"></view>
                  <view class="arrow a2"></view>
                </view>
              </view>
              <text class="item-text">切换账号</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
        </view>
      </view>
    </view>

    <!-- 4. Minimal Logout Button -->
    <view class="logout-section">
      <view class="logout-btn" @click="handleAction('退出登录')">
        <t-icon name="logout" size="36rpx" />
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
  height: 210rpx;
  background: @header-gradient;
  padding: 80rpx @page-padding 0;
  color: #fff;
  overflow: hidden;

  .user-info-box {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;

    .user-avatar {
      border: 3rpx solid rgba(255,255,255,0.4);
      background: #fff;
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.12);
      border-radius: 50%;
      overflow: hidden;
      :deep(.t-avatar) {
        background-color: #fff;
        color: @primary-blue;
      }
    }

    .user-meta {
      flex: 1;
      margin-left: 24rpx;

      .name-row {
        display: flex;
        align-items: center;
        margin-bottom: 4rpx;

        .username {
          font-size: 36rpx;
          font-weight: bold;
          letter-spacing: 1rpx;
          text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
        }

        .auth-badge {
          margin-left: 12rpx;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(8rpx);
          padding: 2rpx 12rpx;
          border-radius: 12rpx;
          display: flex;
          align-items: center;
          gap: 4rpx;
          border: 1px solid rgba(255,255,255,0.3);

          text {
            font-size: 18rpx;
            color: #fff;
            font-weight: 500;
          }
        }
      }

      .user-phone {
        font-size: 24rpx;
        color: rgba(255,255,255,0.9);
        letter-spacing: 1rpx;
      }
    }

    .profile-link {
      display: flex;
      align-items: center;
      gap: 2rpx;
      background: rgba(255,255,255,0.15);
      padding: 6rpx 12rpx;
      border-radius: 20rpx;
      border: 1px solid rgba(255,255,255,0.1);
      
      text {
        font-size: 20rpx;
        color: #fff;
      }
    }
  }

  .bg-circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    
    &.c1 {
      width: 200rpx;
      height: 200rpx;
      top: -80rpx;
      right: -40rpx;
      animation: float 8s ease-in-out infinite;
    }
    
    &.c2 {
      width: 150rpx;
      height: 150rpx;
      bottom: -40rpx;
      left: -40rpx;
      opacity: 0.6;
      animation: float 10s ease-in-out infinite reverse;
    }
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15rpx, -15rpx); }
}

.dashboard-section {
  padding: 0 @page-padding;
  margin-top: -30rpx;
  position: relative;
  z-index: 20;

  .stats-card {
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 32rpx 32rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 12rpx 32rpx rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.05);

    .stat-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24rpx;

      &:active {
        transform: scale(0.96);
        transition: transform 0.2s;
      }

      .stat-illust {
        width: 100rpx;
        height: 100rpx;
        position: relative;
        
        .illust-main {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .house-box {
          width: 60rpx;
          height: 50rpx;
          background: #DBEAFE;
          border-radius: 8rpx;
          position: relative;
          
          .roof {
            position: absolute;
            top: -20rpx;
            left: -5rpx;
            width: 70rpx;
            height: 25rpx;
            background: #3B82F6;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          }
          
          .window {
            position: absolute;
            top: 15rpx;
            left: 20rpx;
            width: 20rpx;
            height: 20rpx;
            background: #fff;
            border-radius: 4rpx;
          }
        }

        .msg-box {
          width: 64rpx;
          height: 50rpx;
          background: #DCFCE7;
          border-radius: 12rpx;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6rpx;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -10rpx;
            left: 15rpx;
            border-left: 10rpx solid transparent;
            border-right: 10rpx solid transparent;
            border-top: 12rpx solid #DCFCE7;
          }

          .dot {
            width: 8rpx;
            height: 8rpx;
            background: #10B981;
            border-radius: 50%;
            animation: pulse 2s infinite;
            &.d2 { animation-delay: 0.5s; }
          }
        }

        .cloud {
          position: absolute;
          background: #fff;
          border-radius: 10rpx;
          box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
          opacity: 0.8;
          
          &.c1 {
            width: 40rpx;
            height: 14rpx;
            right: 0;
            top: 10rpx;
            animation: drift 4s infinite ease-in-out;
          }
          &.c2 {
            width: 36rpx;
            height: 12rpx;
            left: 0;
            top: 5rpx;
            animation: drift 5s infinite ease-in-out reverse;
          }
        }

        .red-dot {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          width: 16rpx;
          height: 16rpx;
          background: #EF4444;
          border-radius: 50%;
          border: 3rpx solid #fff;
          box-shadow: 0 2rpx 6rpx rgba(239, 68, 68, 0.3);
        }
      }

      .stat-info {
        display: flex;
        flex-direction: column;
        
        .stat-num {
          font-size: 40rpx;
          font-weight: bold;
          color: #1E293B;
          line-height: 1;
          margin-bottom: 6rpx;
        }

        .stat-label {
          font-size: 24rpx;
          color: #64748B;
        }
      }
    }

    .stat-divider {
      width: 2rpx;
      height: 60rpx;
      background: #F1F5F9;
      margin: 0 10rpx;
    }
  }
}

@keyframes drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10rpx); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
}

.menu-section {
  padding: 40rpx @page-padding 0;

  .menu-card {
    background: #FFFFFF;
    border-radius: 32rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.02);
    border: 1px solid #F8FAFC;

    &.mt-24 {
      margin-top: 24rpx;
    }

    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28rpx 32rpx;
      position: relative;
      transition: background 0.2s;

      &:active {
        background: #F1F5F9;
      }

      &::after {
        content: '';
        position: absolute;
        left: 110rpx;
        right: 32rpx;
        bottom: 0;
        height: 1rpx;
        background: #F1F5F9;
      }

      &:last-child::after {
        display: none;
      }

      .item-left {
        display: flex;
        align-items: center;
        gap: 28rpx;

        .item-illust {
          width: 56rpx;
          height: 56rpx;
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          
          &.purple { background: #F5F3FF; }
          &.orange { background: #FFF7ED; }
          &.cyan { background: #ECFEFF; }
          &.pink { background: #FDF2F8; }
          &.blue { background: #EFF6FF; }

          .shield-box {
            width: 32rpx;
            height: 38rpx;
            background: #8B5CF6;
            clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%);
            display: flex;
            align-items: center;
            justify-content: center;
            .check-mark {
              width: 14rpx;
              height: 8rpx;
              border-left: 3rpx solid #fff;
              border-bottom: 3rpx solid #fff;
              transform: rotate(-45deg) translateY(-2rpx);
            }
          }

          .card-stack {
            position: relative;
            width: 36rpx;
            height: 28rpx;
            .card {
              position: absolute;
              width: 30rpx;
              height: 22rpx;
              background: #F59E0B;
              border-radius: 4rpx;
              border: 2rpx solid #fff;
              &:nth-child(2) {
                left: 6rpx;
                top: 6rpx;
                background: #FBBC05;
                z-index: 2;
              }
            }
          }

          .log-box {
            width: 32rpx;
            height: 36rpx;
            border: 3rpx solid #06B6D4;
            border-radius: 6rpx;
            padding: 4rpx;
            display: flex;
            flex-direction: column;
            gap: 4rpx;
            .line {
              height: 4rpx;
              background: #06B6D4;
              border-radius: 2rpx;
              &:nth-child(1) { width: 100%; }
              &:nth-child(2) { width: 70%; }
            }
          }

          .headset-box {
            position: relative;
            width: 36rpx;
            height: 36rpx;
            .arc {
              width: 36rpx;
              height: 36rpx;
              border: 4rpx solid #EC4899;
              border-bottom: none;
              border-radius: 20rpx 20rpx 0 0;
            }
            .mic {
              position: absolute;
              bottom: 4rpx;
              right: -4rpx;
              width: 10rpx;
              height: 10rpx;
              background: #EC4899;
              border-radius: 50%;
            }
            &::before, &::after {
              content: '';
              position: absolute;
              bottom: 8rpx;
              width: 8rpx;
              height: 12rpx;
              background: #F472B6;
              border-radius: 3rpx;
            }
            &::before { left: -4rpx; }
            &::after { right: -4rpx; }
          }

          .switch-box {
            position: relative;
            width: 40rpx;
            height: 30rpx;
            .arrow {
              position: absolute;
              width: 24rpx;
              height: 4rpx;
              background: #3B82F6;
              &::after {
                content: '';
                position: absolute;
                top: -6rpx;
                border-top: 8rpx solid transparent;
                border-bottom: 8rpx solid transparent;
              }
              &.a1 {
                top: 4rpx;
                left: 0;
                &::after { right: -2rpx; border-left: 10rpx solid #3B82F6; }
              }
              &.a2 {
                bottom: 4rpx;
                right: 0;
                &::after { left: -2rpx; border-right: 10rpx solid #3B82F6; }
              }
            }
          }
        }

        .item-text {
          font-size: 30rpx;
          color: #334155;
          font-weight: 500;
        }
      }
    }
  }
}

.logout-section {
  margin: 100rpx @page-padding 40rpx;
  
  .logout-btn {
    width: 100%;
    height: 96rpx;
    background: #fff;
    border-radius: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    color: #94A3B8;
    font-size: 30rpx;
    font-weight: 500;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.02);
    border: 1px solid #F1F5F9;
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
      background: #FEF2F2;
      color: #EF4444;
      border-color: #FEE2E2;
    }
  }
}
</style>