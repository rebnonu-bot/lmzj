<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">公示公告</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">2</text>
            <text class="label">未读公告</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">8</text>
            <text class="label">本月发布</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">124</text>
            <text class="label">累计公告</text>
          </view>
        </view>
      </view>
    </view>

    <view class="tabs-container">
      <scroll-view scroll-x class="tabs-scroll" show-scrollbar="false">
        <view 
          v-for="(tab, index) in tabs" 
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <text>{{ tab }}</text>
          <view class="active-bar" v-if="activeTab === index"></view>
        </view>
      </scroll-view>
    </view>

    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content">
        <view class="notice-card" v-for="(item, index) in filteredNotices" :key="index">
          <view class="notice-header">
            <view class="notice-type" :class="item.typeClass">{{ item.type }}</view>
            <view class="notice-date">{{ item.date }}</view>
          </view>
          <view class="notice-body">
            <view class="notice-title">
              <view class="unread-dot" v-if="item.unread"></view>
              <text>{{ item.title }}</text>
            </view>
            <view class="notice-preview">{{ item.preview }}</view>
          </view>
          <view class="notice-footer">
            <text class="detail-link">查看详情</text>
            <t-icon name="chevron-right" size="32rpx" color="#94A3B8" />
          </view>
        </view>
      </view>
    </scroll-view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';




const activeTab = ref(0);
const tabs = ['全部', '财务公示', '社区通告', '政策文件', '重要通知'];

const goBack = () => {
  uni.navigateBack();
};

const notices = ref([
  { 
    title: '关于2026年第一季度小区共有收益收支明细的公示', 
    type: '财务公示', 
    typeClass: 'finance',
    date: '2026-02-05', 
    unread: true,
    preview: '为了保证小区共有收益使用的透明化，现将2026年1月至3月的各项收支情况进行公示...'
  },
  { 
    title: '小区南门入口道路维护施工通知', 
    type: '重要通知', 
    typeClass: 'important',
    date: '2026-02-01', 
    unread: true,
    preview: '因路面受损，物业计划于本周三对南门入口处进行路面翻修施工，请各位业主注意绕行...'
  },
  { 
    title: '关于开展“文明养犬，从我做起”倡议活动的公告', 
    type: '社区通告', 
    typeClass: 'community',
    date: '2026-01-25', 
    unread: false,
    preview: '为营造和谐、洁净的社区环境，进一步规范文明养犬行为，社区居委会特发起以下倡议...'
  },
  { 
    title: '关于实施《社区生活垃圾分类管理办法》的通知', 
    type: '政策文件', 
    typeClass: 'policy',
    date: '2026-01-15', 
    unread: false,
    preview: '根据市、区相关文件要求，自2026年2月1日起，我小区将全面实施生活垃圾分类定点投放...'
  }
]);

const filteredNotices = computed(() => {
  if (activeTab.value === 0) return notices.value;
  return notices.value.filter(n => n.type === tabs[activeTab.value]);
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
}

.header-section {
  height: 9.6rem;
  background: @header-gradient;
  padding: 10rpx @page-padding 0;
  position: relative;
  overflow: hidden;
  color: @text-white;

  .header-top {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-left: -20rpx;

    .back-btn {
      padding: 10rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .page-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #FFFFFF;
      margin-left: 10rpx;
    }
  }

  .decor-circle {
    position: absolute;
    top: -50rpx;
    right: -50rpx;
    width: 200rpx;
    height: 200rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 1;
  }
}

.info-card-container {
  padding: 0 @page-padding;
  margin-top: -5rem;
  position: relative;
  z-index: 3;
}

.info-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .stat-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      text-align: center;
      .num {
        display: block;
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 4rpx;
      }
      .label {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .stat-divider {
      width: 1rpx;
      height: 40rpx;
      background: #F1F5F9;
    }
  }
}

.tabs-container {
  padding: 40rpx 0 20rpx;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 10;

  .tabs-scroll {
    white-space: nowrap;
    padding: 0 @page-padding;
    width: 100%;
    box-sizing: border-box;

    .tab-item {
      display: inline-block;
      margin-right: 48rpx;
      position: relative;
      padding-bottom: 12rpx;
      font-size: 30rpx;
      color: #64748B;
      transition: all 0.3s;

      &.active {
        color: #0F172A;
        font-weight: 600;
      }

      .active-bar {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 32rpx;
        height: 6rpx;
        background: #3B82F6;
        border-radius: 3rpx;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.content-scroll {
  flex: 1;
  overflow: hidden;
}

.tab-content {
  padding: 0 @page-padding 40rpx;
}

.notice-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .notice-type {
      font-size: 22rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;

      &.finance {
        background: #E0F2FE;
        color: #0284C7;
      }

      &.important {
        background: #FEE2E2;
        color: #EF4444;
      }

      &.community {
        background: #DCFCE7;
        color: #10B981;
      }

      &.policy {
        background: #F1F5F9;
        color: #64748B;
      }
    }

    .notice-date {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .notice-body {
    margin-bottom: 24rpx;

    .notice-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1E293B;
      line-height: 1.4;
      margin-bottom: 12rpx;
      display: flex;
      align-items: center;

      .unread-dot {
        width: 12rpx;
        height: 12rpx;
        background: #EF4444;
        border-radius: 50%;
        margin-right: 12rpx;
        flex-shrink: 0;
      }
    }

    .notice-preview {
      font-size: 26rpx;
      color: #64748B;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .notice-footer {
    border-top: 1rpx solid #F1F5F9;
    padding-top: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .detail-link {
      font-size: 26rpx;
      color: #64748B;
    }
  }
}
</style>
