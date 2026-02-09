<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">服务动态</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Summary Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">128</text>
            <text class="label">本月动态</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">12</text>
            <text class="label">重要通告</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num highlight">98%</text>
            <text class="label">满意度</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 3. Tabs -->
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

    <!-- 4. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content">
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
                <t-icon name="chevron-right" size="24rpx" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
        
        <!-- 加载更多 -->
        <view class="load-more" v-if="filteredNews.length > 0">
          <text>已显示全部动态</text>
        </view>
        <view class="empty-state" v-else>
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无相关动态</text>
        </view>
      </view>
    </scroll-view>

    <!-- 5. Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';




const goBack = () => {
  uni.navigateBack();
};

const activeTab = ref(0);
const tabs = ['全部', '物业动态', '社区活动', '通知公告', '办事指南'];

const news = ref([
  {
    title: '关于小区2号电梯例行维保的通知',
    desc: '为了保障业主出行安全，物业将于明日上午9:00-11:00对2号电梯进行例行维保，期间请业主错峰出行。',
    time: '2小时前',
    category: '通知公告',
    cover: ''
  },
  {
    title: '春季社区植树节活动圆满落幕',
    desc: '上周末，50余户业主家庭积极参与了“我为社区添新绿”植树节活动，共栽种苗木120余棵。',
    time: '昨天',
    category: '社区活动',
    cover: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop'
  },
  {
    title: '小区公共路灯节能改造工程启动',
    desc: '物业服务中心计划本周起对小区公共路灯进行LED节能改造，预计工期两周，请业主注意安全。',
    time: '2天前',
    category: '物业动态',
    cover: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: '新版《业主手册》领取指南',
    desc: '2026版《业主手册》已编制完成，请尚未领取的业主携带房产证明前往物业中心领取。',
    time: '3天前',
    category: '办事指南',
    cover: ''
  }
]);

const filteredNews = computed(() => {
  if (activeTab.value === 0) return news.value;
  return news.value.filter(item => item.category === tabs[activeTab.value]);
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
  padding: 40rpx 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .stat-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      text-align: center;
      flex: 1;
      
      .num {
        display: block;
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

    .stat-divider {
      width: 1rpx;
      height: 40rpx;
      background: #F1F5F9;
    }
  }
}

.tabs-container {
  padding: 40rpx @page-padding 20rpx;
  background: transparent;

  .tabs-scroll {
    white-space: nowrap;
    width: 100%;
  }

  .tab-item {
    display: inline-block;
    position: relative;
    padding: 10rpx 0;
    margin-right: 48rpx;
    font-size: 30rpx;
    color: #64748B;

    &.active {
      color: #1E293B;
      font-weight: 600;
    }

    .active-bar {
      position: absolute;
      bottom: -4rpx;
      left: 0;
      width: 100%;
      height: 6rpx;
      background: @primary-blue;
      border-radius: 4rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  height: 0;
}

.tab-content {
  padding: 0 @page-padding 40rpx;
}

.news-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

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
      line-clamp: 2;
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
          color: @primary-blue;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  text {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #94A3B8;
  }
}
</style>
