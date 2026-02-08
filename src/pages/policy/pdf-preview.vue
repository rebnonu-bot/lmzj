<template>
  <view class="preview-container">
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#333" />
      </view>
      <text class="title">{{ title }}</text>
      <view class="placeholder"></view>
    </view>
    
    <scroll-view scroll-y class="content-scroll">
      <view class="webview-content">
        <!-- H5 环境下使用 iframe 预览 -->
        <iframe 
          v-if="pdfUrl"
          :src="pdfUrl" 
          width="100%" 
          height="100%" 
          frameborder="0"
        ></iframe>
        <view v-else class="empty">
          <text>无法加载文档</text>
        </view>
      </view>
    </scroll-view>
    <app-tab-bar activePath="pages/policy/policy" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const pdfUrl = ref('');
const title = ref('文档预览');

onLoad((options: any) => {
  if (options.url) {
    pdfUrl.value = decodeURIComponent(options.url);
  }
  if (options.title) {
    title.value = decodeURIComponent(options.title);
  }
});

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    // 如果没有历史记录（比如直接刷新页面），则回到首页
    uni.reLaunch({
      url: '/pages/index/index'
    });
  }
};
</script>

<style lang="less" scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f8f8;
}

.nav-header {
  flex-shrink: 0;
  height: 88rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #eee;
  
  .back-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .title {
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20rpx;
  }
  
  .placeholder {
    width: 80rpx;
  }
}

.content-scroll {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
}

.webview-content {
  width: 100%;
  height: calc(100vh - 88rpx - 100rpx); // 仅减去头部和底栏高度，让文档铺满
  background-color: #fff;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #999;
  }
}
</style>
