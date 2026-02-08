<template>
  <view class="tab-bar-container">
    <view 
      v-for="(item, index) in tabList" 
      :key="index" 
      class="tab-item" 
      @click="switchTab(item.path)"
    >
      <t-icon 
        :name="activePath === item.path ? item.activeIcon : item.icon" 
        size="48rpx" 
        :color="activePath === item.path ? '#3B82F6' : '#64748B'" 
      />
      <text :class="['label', { active: activePath === item.path }]">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  activePath: string;
}>();

const tabList = [
  {
    text: '首页',
    path: 'pages/index/index',
    icon: 'home',
    activeIcon: 'home'
  },
  {
    text: '政策',
    path: 'pages/policy/policy',
    icon: 'root-list',
    activeIcon: 'root-list'
  },
  {
    text: '我的',
    path: 'pages/mine/mine',
    icon: 'user',
    activeIcon: 'user'
  }
];

const switchTab = (path: string) => {
  uni.switchTab({
    url: '/' + path
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.tab-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 112rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #F1F5F9;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;

    .label {
      font-size: 20rpx;
      color: @text-secondary;
      margin-top: 4rpx;
      &.active {
        color: @primary-blue;
        font-weight: bold;
      }
    }
  }
}
</style>
