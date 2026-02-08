<template>
  <view class="page-container">
    <view class="header">
      <view class="nav-content">
        <text class="title">政策法规</text>
      </view>
    </view>
    <view class="content">
      <view class="empty-state">
        <t-icon name="root-list" size="120rpx" color="#3B82F6" />
        <text class="tips">政策内容正在整理中...</text>
      </view>
    </view>
    <app-tab-bar activePath="pages/policy/policy" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});
// 政策页面逻辑
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: @bg-light-blue;
  padding-bottom: 160rpx;
}

.header {
  height: 120rpx;
  background: @header-gradient;
  padding: 40rpx @page-padding 0;
  
  .nav-content {
    .title {
      font-size: @font-h2;
      color: @text-white;
      font-weight: bold;
    }
  }
}

.content {
  padding: @page-padding;
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    .tips {
      margin-top: 32rpx;
      font-size: @font-body;
      color: @text-secondary;
    }
  }
}
</style>
