<template>
  <view class="container">
    <view class="empty-content">
      <t-icon name="view-list" size="120rpx" color="#ccc" />
      <text class="title">新项目已就绪</text>
      <text class="desc">开始开发您的新页面吧</text>
    </view>
  </view>
</template>

<script setup lang="ts">
// 这里是新项目的起点
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f3f3;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 28rpx;
  color: #999;
}
</style>
