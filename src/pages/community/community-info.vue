<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">小区信息</text>
      </view>
      
      <!-- Decor background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Top Info Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="community-header">
          <view class="community-logo">
            <t-icon name="city" size="64rpx" color="#3B82F6" />
          </view>
          <view class="community-title-box">
            <text class="community-name">阳光水岸一期</text>
            <text class="community-address">苏州市工业园区湖东街道阳光大道88号</text>
          </view>
        </view>
        <view class="info-divider"></view>
        <view class="info-grid">
          <view class="info-grid-item">
            <text class="label">建筑面积</text>
            <text class="value">24.5万㎡</text>
          </view>
          <view class="info-grid-item">
            <text class="label">住户总数</text>
            <text class="value">1280户</text>
          </view>
          <view class="info-grid-item">
            <text class="label">绿化率</text>
            <text class="value">35.8%</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 3. Tabs -->
    <view class="tabs-container">
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
    </view>

    <!-- 4. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <!-- 基本信息 Tab -->
      <view class="tab-content" v-if="activeTab === 0">
        <view class="detail-card">
          <view class="section-title">楼盘详情</view>
          <view class="detail-row">
            <text class="d-label">建成时间</text>
            <text class="d-value">2020年</text>
          </view>
          <view class="detail-row">
            <text class="d-label">开发商</text>
            <text class="d-value">阳光房地产开发有限公司</text>
          </view>
          <view class="detail-row">
            <text class="d-label">物业类型</text>
            <text class="d-value">普通住宅</text>
          </view>
          <view class="detail-row">
            <text class="d-label">容积率</text>
            <text class="d-value">2.2</text>
          </view>
          <view class="detail-row">
            <text class="d-label">停车位</text>
            <text class="d-value">地上150个 / 地下1200个</text>
          </view>
        </view>

        <view class="detail-card mt-24">
          <view class="section-title">地理位置</view>
          <view class="map-placeholder">
            <t-icon name="location" size="48rpx" color="#94A3B8" />
            <text>地图组件加载中...</text>
          </view>
        </view>
      </view>

      <!-- 设施设备 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view class="facility-grid">
          <view class="facility-item" v-for="(item, index) in facilities" :key="index">
            <view class="facility-icon" :style="{ background: item.bg }">
              <t-icon :name="item.icon" size="48rpx" :color="item.color" />
            </view>
            <view class="facility-info">
              <text class="f-name">{{ item.name }}</text>
              <text class="f-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 小区相册 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view class="album-grid">
          <view class="album-item" v-for="(img, index) in 6" :key="index">
            <image src="https://picsum.photos/400/300" mode="aspectFill" />
            <view class="img-mask">小区实景 {{ index + 1 }}</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- Global Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const activeTab = ref(0);
const tabs = ['基本信息', '设施设备', '小区相册'];

const goBack = () => {
  uni.navigateBack();
};

const facilities = ref([
  { name: '电梯设备', desc: '全小区共48部电梯', icon: 'service', color: '#3B82F6', bg: '#EBF2FF' },
  { name: '消防系统', desc: '覆盖全区域自动喷淋', icon: 'secured', color: '#EF4444', bg: '#FEF2F2' },
  { name: '监控系统', desc: '24小时无死角监控', icon: 'search', color: '#10B981', bg: '#ECFDF5' },
  { name: '供水设备', desc: '二次加压泵房', icon: 'filter', color: '#F59E0B', bg: '#FFFBEB' },
  { name: '配电房', desc: '10KV双回路供电', icon: 'app-grid', color: '#6366F1', bg: '#EEF2FF' },
  { name: '儿童乐园', desc: '2处室外游乐设施', icon: 'user-talk', color: '#EC4899', bg: '#FDF2F8' }
]);
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
    margin-left: -1rem;

    .back-btn {
      padding: 10rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        opacity: 0.7;
      }
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
  padding: 40rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .community-header {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;

    .community-logo {
      width: 100rpx;
      height: 100rpx;
      background: #EBF2FF;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
    }

    .community-title-box {
      .community-name {
        display: block;
        font-size: 36rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 8rpx;
      }
      .community-address {
        display: block;
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }

  .info-divider {
    height: 1rpx;
    background: #F1F5F9;
    margin: 0 -40rpx 32rpx;
  }

  .info-grid {
    display: flex;
    justify-content: space-between;

    .info-grid-item {
      text-align: center;
      flex: 1;
      
      .label {
        display: block;
        font-size: 24rpx;
        color: #94A3B8;
        margin-bottom: 12rpx;
      }
      .value {
        display: block;
        font-size: 32rpx;
        font-weight: 600;
        color: #1E293B;
      }
    }
  }
}

.tabs-container {
  display: flex;
  padding: 40rpx @page-padding 20rpx;
  position: sticky;
  top: 0;
  z-index: 10;
  background: transparent;

  .tab-item {
    position: relative;
    padding: 10rpx 0;
    margin-right: 48rpx;
    font-size: 32rpx;
    color: #64748B;
    transition: all 0.3s;

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
      background: #3B82F6;
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

.detail-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 32rpx;
    position: relative;
    padding-left: 20rpx;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rpx;
      height: 28rpx;
      background: #3B82F6;
      border-radius: 4rpx;
    }
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #F1F5F9;

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .d-label {
      font-size: 28rpx;
      color: #64748B;
    }
    .d-value {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;
    }
  }
}

.mt-24 { margin-top: 24rpx; }

.map-placeholder {
  height: 300rpx;
  background: #F8FAFC;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  font-size: 24rpx;

  t-icon { margin-bottom: 16rpx; }
}

.facility-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;

  .facility-item {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 24rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .facility-icon {
      width: 88rpx;
      height: 88rpx;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
    }

    .facility-info {
      .f-name {
        display: block;
        font-size: 28rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 4rpx;
      }
      .f-desc {
        display: block;
        font-size: 20rpx;
        color: #94A3B8;
      }
    }
  }
}

.album-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;

  .album-item {
    position: relative;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }

    .img-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: #FFFFFF;
      font-size: 22rpx;
      padding: 8rpx 16rpx;
    }
  }
}
</style>
