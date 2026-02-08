<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">服务动态</text>
      <view class="placeholder"></view>
    </view>

    <!-- 服务概览卡片 -->
    <view class="summary-card">
      <view class="stats-grid">
        <view class="stats-item">
          <text class="value">128</text>
          <text class="label">本月动态</text>
        </view>
        <view class="stats-item">
          <text class="value">12</text>
          <text class="label">重要通告</text>
        </view>
        <view class="stats-item">
          <text class="value highlight">98%</text>
          <text class="label">满意度</text>
        </view>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="tabs-scroll-box">
      <scroll-view scroll-x class="tabs-container" show-scrollbar="false">
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

    <!-- 动态列表 -->
    <scroll-view scroll-y class="list-container">
      <view class="news-card" v-for="(item, index) in filteredNews" :key="index">
        <view class="news-cover" v-if="item.cover">
          <image :src="item.cover" mode="aspectFill" class="cover-img" />
          <view class="category-tag">{{ item.category }}</view>
        </view>
        <view class="news-content">
          <view class="news-header" v-if="!item.cover">
            <view class="category-tag plain">{{ item.category }}</view>
            <view class="news-time">{{ item.time }}</view>
          </view>
          <view class="news-title">{{ item.title }}</view>
          <view class="news-desc">{{ item.desc }}</view>
          <view class="news-footer">
            <text class="news-time" v-if="item.cover">{{ item.time }}</text>
            <view class="read-more">
              <text>查看详情</text>
              <t-icon name="chevron-right" size="24rpx" color="#2563EB" />
            </view>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more">
        <text>已显示全部动态</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 隐藏原生tabbar
onMounted(() => {
  uni.hideTabBar();
});

const goBack = () => {
  uni.navigateBack();
};

const activeTab = ref(0);
const tabs = ['全部', '物业动态', '社区活动', '通知公告', '办事指南'];

const news = ref([
  {
    title: '关于小区2号电梯例行维保的通知',
    desc: '为了保障业主出行安全，物业将于明日上午9:00-11:00对2号电梯进行例行维保，期间请业主错峰出行。',
    time: '2 hours ago',
    category: '通知公告',
    cover: ''
  },
  {
    title: '春季社区植树节活动圆满落幕',
    desc: '上周末，50余户业主家庭积极参与了“我为社区添新绿”植树节活动，共栽种苗木120余棵。',
    time: '1 day ago',
    category: '社区活动',
    cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
  },
  {
    title: '小区公共路灯节能改造工程启动',
    desc: '物业服务中心计划本周起对园区公共路灯进行LED节能改造，预计工期两周，请业主注意安全。',
    time: '2 days ago',
    category: '物业动态',
    cover: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: '新版《业主手册》领取指南',
    desc: '2024版《业主手册》已编制完成，请尚未领取的业主携带房产证明前往物业中心领取。',
    time: '3 days ago',
    category: '办事指南',
    cover: ''
  }
]);

const filteredNews = computed(() => {
  if (activeTab.value === 0) return news.value;
  return news.value.filter(item => item.category === tabs[activeTab.value]);
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F8FAFC;
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400rpx;
  background: linear-gradient(180deg, #2563EB 0%, #3B82F6 100%);
  border-radius: 0 0 40rpx 40rpx;
}

.nav-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100rpx 32rpx 40rpx;
  z-index: 10;

  .back-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    font-weight: 600;
    color: #FFFFFF;
  }

  .placeholder {
    width: 80rpx;
  }
}

.summary-card {
  position: relative;
  margin: 0 32rpx 32rpx;
  padding: 40rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 10;

  .stats-grid {
    display: flex;
    justify-content: space-around;
    
    .stats-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .value {
        font-size: 40rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;

        &.highlight {
          color: #10B981;
        }
      }

      .label {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }
}

.tabs-scroll-box {
  background: #FFFFFF;
  padding: 0 32rpx;
  position: sticky;
  top: 0;
  z-index: 20;
  margin-bottom: 20rpx;
}

.tabs-container {
  white-space: nowrap;
  width: 100%;

  .tab-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32rpx;
    height: 88rpx;
    position: relative;

    text {
      font-size: 28rpx;
      color: #64748B;
      transition: all 0.3s;
    }

    &.active {
      text {
        color: #2563EB;
        font-weight: 600;
      }
    }

    .active-bar {
      position: absolute;
      bottom: 0;
      width: 40rpx;
      height: 6rpx;
      background: #2563EB;
      border-radius: 3rpx;
    }
  }
}

.list-container {
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.news-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

  .news-cover {
    position: relative;
    height: 320rpx;
    width: 100%;

    .cover-img {
      width: 100%;
      height: 100%;
    }

    .category-tag {
      position: absolute;
      top: 24rpx;
      left: 24rpx;
      padding: 6rpx 20rpx;
      background: rgba(37, 99, 235, 0.9);
      color: #FFFFFF;
      font-size: 22rpx;
      border-radius: 8rpx;
      backdrop-filter: blur(4rpx);
    }
  }

  .news-content {
    padding: 32rpx;

    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .category-tag.plain {
        padding: 4rpx 16rpx;
        background: #F1F5F9;
        color: #64748B;
        font-size: 22rpx;
        border-radius: 6rpx;
      }
    }

    .news-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 16rpx;
      line-height: 1.4;
    }

    .news-desc {
      font-size: 26rpx;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 24rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .news-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .news-time {
        font-size: 24rpx;
        color: #94A3B8;
      }

      .read-more {
        display: flex;
        align-items: center;
        
        text {
          font-size: 24rpx;
          color: #2563EB;
          font-weight: 500;
          margin-right: 4rpx;
        }
      }
    }
  }
}

.load-more {
  text-align: center;
  padding: 40rpx 0;
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}
</style>
