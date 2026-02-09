<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">学习园地</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">12.5</text>
            <text class="label">学习时长(h)</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">8</text>
            <text class="label">已学课程</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">350</text>
            <text class="label">累计积分</text>
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
        <view class="course-card" v-for="(item, index) in filteredCourses" :key="index">
          <view class="course-cover">
            <image :src="item.cover" mode="aspectFill" class="cover-img" />
            <view class="course-tag">{{ item.category }}</view>
          </view>
          <view class="course-info">
            <view class="course-title">{{ item.title }}</view>
            <view class="course-meta">
              <view class="meta-left">
                <text class="duration">{{ item.duration }}</text>
                <text class="divider">·</text>
                <text class="views">{{ item.views }}人已学</text>
              </view>
              <view class="points" v-if="item.points">
                <text>+{{ item.points }}积分</text>
              </view>
            </view>
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
const tabs = ['全部', '社区规范', '生活常识', '法律法规', '安全消防'];

const goBack = () => {
  uni.navigateBack();
};

const courses = ref([
  { 
    title: '高层建筑消防安全自救指南', 
    category: '安全消防', 
    duration: '15分钟', 
    views: 1250, 
    points: 20,
    cover: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=500&q=80'
  },
  { 
    title: '垃圾分类减量，共建绿色家园', 
    category: '社区规范', 
    duration: '10分钟', 
    views: 3420, 
    points: 15,
    cover: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80'
  },
  { 
    title: '民法典中关于物业管理的最新解读', 
    category: '法律法规', 
    duration: '25分钟', 
    views: 890, 
    points: 30,
    cover: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80'
  },
  { 
    title: '居家节水省电小妙招分享', 
    category: '生活常识', 
    duration: '8分钟', 
    views: 2100, 
    points: 10,
    cover: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80'
  }
]);

const filteredCourses = computed(() => {
  if (activeTab.value === 0) return courses.value;
  return courses.value.filter(c => c.category === tabs[activeTab.value]);
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

.course-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;

  .course-cover {
    height: 240rpx;
    position: relative;

    .cover-img {
      width: 100%;
      height: 100%;
    }

    .course-tag {
      position: absolute;
      top: 20rpx;
      left: 20rpx;
      background: rgba(15, 23, 42, 0.6);
      color: #FFFFFF;
      font-size: 20rpx;
      padding: 4rpx 16rpx;
      border-radius: 6rpx;
      backdrop-filter: blur(4px);
    }
  }

  .course-info {
    padding: 24rpx;

    .course-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 16rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .course-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .meta-left {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #94A3B8;

        .divider {
          margin: 0 8rpx;
        }
      }

      .points {
        font-size: 24rpx;
        color: #10B981;
        font-weight: 600;
      }
    }
  }
}
</style>
