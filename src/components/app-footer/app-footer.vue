<template>
  <view class="footer">
    <view class="footer-links">
      <text class="footer-link" @click="navigateTo('user-agreement')">用户协议</text>
      <text class="footer-divider">|</text>
      <text class="footer-link" @click="navigateTo('privacy-policy')">隐私政策</text>
      <text class="footer-divider">|</text>
      <text class="footer-link" @click="navigateTo('about-us')">关于我们</text>
    </view>
    <view class="footer-copyright">
      <text>Copyright © 2026 Ganzhou Linmeng Intelligent Technology Co., Ltd. and/or its subsidiaries or affiliates. All Rights Reserved.</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const navigateTo = (type: string) => {
  uni.showToast({
    title: '页面跳转中...',
    icon: 'none'
  });
  // 后续可根据 type 跳转到对应页面
  // uni.navigateTo({ url: `/pages/common/${type}` });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.footer {
  padding: 80rpx 40rpx 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
  background-color: transparent;

  .footer-links {
    display: flex;
    align-items: center;
    gap: 16rpx;

    .footer-link {
      font-size: 24rpx;
      color: #64748B;
      transition: color 0.2s ease;
      
      &:active {
        color: @primary-blue;
      }
    }

    .footer-divider {
      font-size: 20rpx;
      color: #E2E8F0;
    }
  }

  .footer-copyright {
    font-size: 20rpx;
    color: #CBD5E1;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    letter-spacing: 0.5rpx;
    text-align: center;
    line-height: 1.6;
    max-width: 600rpx;
  }
}
</style>
