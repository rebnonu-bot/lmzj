<template>
  <view class="page-container">
    <!-- Header with strong gradient -->
    <view class="header">
      <view class="status-bar-placeholder"></view>
      <view class="nav-content">
        <view class="user-info">
          <view class="avatar"></view>
          <view class="text">
            <text class="name">联通未来社区</text>
            <text class="addr">智慧社区 · 惠享生活</text>
          </view>
        </view>
        <t-icon name="notification" size="48rpx" color="#fff" />
      </view>
      <!-- Decorative background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- Main Grid Menu overlapping the header -->
    <view class="grid-card">
      <view class="menu-item" v-for="(item, index) in mainMenus" :key="index">
        <view class="icon-box">
          <t-icon :name="item.icon" size="56rpx" :color="item.color" />
        </view>
        <text class="menu-label">{{ item.label }}</text>
      </view>
    </view>

    <!-- Secondary Services Grid -->
    <view class="secondary-grid">
      <view class="sub-item" v-for="(item, index) in subMenus" :key="index">
        <t-icon :name="item.icon" size="44rpx" color="#333" />
        <text class="sub-label">{{ item.label }}</text>
      </view>
    </view>

    <!-- Business Promo Card -->
    <view class="promo-card">
      <view class="promo-content">
        <text class="promo-title">业务办理</text>
        <text class="promo-desc">线上办理 在线答疑</text>
      </view>
      <view class="promo-icon">
        <t-icon name="chat" size="80rpx" color="#1890FF" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mainMenus = ref([
  { label: '物业缴费', icon: 'money', color: '#3B82F6' },
  { label: '报事报修', icon: 'tools', color: '#3B82F6' },
  { label: '访客邀约', icon: 'user-add', color: '#3B82F6' },
  { label: '扫一扫', icon: 'scan', color: '#3B82F6' }
]);

const subMenus = ref([
  { label: '便民电话', icon: 'call' },
  { label: '社区党建', icon: 'flag' },
  { label: 'AI视界', icon: 'component-breadcrumb' },
  { label: '信息服务', icon: 'info-circle' },
  { label: '商业服务', icon: 'shop' },
  { label: '社区养老', icon: 'heart' },
  { label: '团购优品', icon: 'cart' },
  { label: '社区文体', icon: 'precis-light' }
]);
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100vh;
  background-color: #F4F9FF;
  padding-bottom: 40rpx;
}

.header {
  height: 440rpx;
  background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 70%, #F4F9FF 100%);
  padding: 0 40rpx;
  position: relative;
  overflow: hidden;

  .status-bar-placeholder {
    height: 88rpx; // Default status bar height for mobile
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .user-info {
    display: flex;
    align-items: center;
    .avatar {
      width: 88rpx;
      height: 88rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      margin-right: 24rpx;
      border: 2rpx solid rgba(255, 255, 255, 0.4);
    }
    .text {
      display: flex;
      flex-direction: column;
      color: #fff;
      .name { font-size: 40rpx; font-weight: bold; letter-spacing: 2rpx; }
      .addr { font-size: 24rpx; opacity: 0.8; margin-top: 4rpx; }
    }
  }

  .decor-circle {
    position: absolute;
    right: -100rpx;
    top: -50rpx;
    width: 400rpx;
    height: 400rpx;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
}

.grid-card {
  margin: -140rpx 32rpx 32rpx;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-radius: 32rpx;
  padding: 40rpx 20rpx;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 16rpx 40rpx rgba(59, 130, 246, 0.12);
  position: relative;
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.6);

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon-box {
      width: 104rpx;
      height: 104rpx;
      background: #EFF6FF;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16rpx;
    }

    .menu-label {
      font-size: 26rpx;
      color: #334155;
      font-weight: 500;
    }
  }
}

.secondary-grid {
  margin: 0 32rpx 32rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32rpx 0;
  padding: 20rpx 0;

  .sub-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .sub-label {
      font-size: 24rpx;
      color: #64748B;
      margin-top: 12rpx;
    }
  }
}

.promo-card {
  margin: 0 32rpx;
  background: linear-gradient(90deg, #E0F2FE 0%, #F0F9FF 100%);
  border-radius: 24rpx;
  padding: 32rpx 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #BAE6FD;

  .promo-content {
    .promo-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #0369A1;
      display: block;
    }
    .promo-desc {
      font-size: 24rpx;
      color: #0EA5E9;
      margin-top: 8rpx;
      display: block;
    }
  }
}
</style>
