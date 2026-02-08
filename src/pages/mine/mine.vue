<template>
  <view class="page-container">
    <view class="header">
      <view class="user-card">
        <view class="avatar"></view>
        <view class="info">
          <text class="name">游客用户</text>
          <text class="role">点击登录体验更多功能</text>
        </view>
      </view>
    </view>
    <view class="menu-list">
      <view class="menu-item" v-for="(item, index) in menus" :key="index">
        <view class="left">
          <t-icon :name="item.icon" size="48rpx" color="#3B82F6" />
          <text class="label">{{ item.label }}</text>
        </view>
        <t-icon name="chevron-right" size="40rpx" color="#BBBBBB" />
      </view>
    </view>
    <app-tab-bar activePath="pages/mine/mine" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const menus = ref([
  { label: '我的房屋', icon: 'home' },
  { label: '我的缴费', icon: 'money' },
  { label: '报修记录', icon: 'tools' },
  { label: '设置', icon: 'setting' }
]);
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: @bg-light-blue;
  padding-bottom: 160rpx;
}

.header {
  height: 260rpx;
  background: @header-gradient;
  padding: 40rpx @page-padding 0;
  
  .user-card {
    display: flex;
    align-items: center;
    margin-top: 12rpx;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      border: 4rpx solid @border-glass;
    }
    .info {
      margin-left: 32rpx;
      .name {
        font-size: @font-h1;
        color: @text-white;
        font-weight: bold;
        display: block;
      }
      .role {
        font-size: @font-caption;
        color: @text-white;
        opacity: 0.8;
        margin-top: 8rpx;
        display: block;
      }
    }
  }
}

.menu-list {
  margin: -60rpx @page-padding 0;
  background: @card-reverse-gradient;
  border-radius: @radius-large;
  padding: 20rpx 0;
  box-shadow: @shadow-blue;
  border: 1px solid @border-glass;

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx 40rpx;
    border-bottom: 1px solid #F1F5F9;
    &:last-child {
      border-bottom: none;
    }
    .left {
      display: flex;
      align-items: center;
      .label {
        margin-left: 24rpx;
        font-size: @font-body;
        color: @text-primary;
      }
    }
  }
}
</style>
