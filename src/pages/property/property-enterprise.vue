<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">物业企业</text>
      </view>
      
      <!-- Decor background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Top Info Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="property-header">
          <view class="property-logo">
            <t-icon name="city-1" size="64rpx" color="#10B981" />
          </view>
          <view class="property-title-box">
            <text class="property-name">苏州金牌物业管理有限公司</text>
            <view class="property-tags">
              <text class="tag">一级资质</text>
              <text class="tag">诚信企业</text>
            </view>
          </view>
        </view>
        <view class="contact-bar">
          <view class="contact-item">
            <t-icon name="user" size="32rpx" color="#64748B" />
            <text>负责人：李经理</text>
          </view>
          <view class="contact-item" @click="makePhoneCall('400-888-9999')">
            <t-icon name="call" size="32rpx" color="#3B82F6" />
            <text class="phone">400-888-9999</text>
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
      <!-- 企业概况 Tab -->
      <view class="tab-content" v-if="activeTab === 0">
        <view class="info-section">
          <view class="section-title">企业简介</view>
          <text class="intro-text">
            苏州金牌物业管理有限公司成立于2010年，是一家具有国家一级物业管理资质的专业物业服务企业。公司秉承“服务至上、品质第一”的经营理念，致力于为业主提供全方位、高品质的物业管理服务。
          </text>
        </view>

        <view class="info-section mt-24">
          <view class="section-title">工商信息</view>
          <view class="detail-row">
            <text class="d-label">统一社会信用代码</text>
            <text class="d-value">91320500MA1XXXXXXX</text>
          </view>
          <view class="detail-row">
            <text class="d-label">法定代表人</text>
            <text class="d-value">张三</text>
          </view>
          <view class="detail-row">
            <text class="d-label">注册资本</text>
            <text class="d-value">5000万元人民币</text>
          </view>
          <view class="detail-row">
            <text class="d-label">成立日期</text>
            <text class="d-value">2010-05-20</text>
          </view>
          <view class="detail-row">
            <text class="d-label">登记机关</text>
            <text class="d-value">苏州市市场监督管理局</text>
          </view>
        </view>
      </view>

      <!-- 服务内容 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view class="service-list">
          <view class="service-card" v-for="(service, index) in services" :key="index">
            <view class="service-icon-box">
              <t-icon :name="service.icon" size="40rpx" color="#3B82F6" />
            </view>
            <view class="service-info">
              <text class="s-title">{{ service.title }}</text>
              <text class="s-desc">{{ service.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 荣誉资质 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view class="honor-list">
          <view class="honor-item" v-for="(honor, index) in honors" :key="index">
            <view class="honor-badge">
              <t-icon name="control-platform" size="48rpx" color="#F59E0B" />
            </view>
            <view class="honor-info">
              <text class="h-title">{{ honor.title }}</text>
              <text class="h-date">{{ honor.date }}</text>
            </view>
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
const tabs = ['企业概况', '服务内容', '荣誉资质'];

const goBack = () => {
  uni.navigateBack();
};

const makePhoneCall = (phoneNumber: string) => {
  uni.makePhoneCall({
    phoneNumber
  });
};

const services = ref([
  { title: '客服中心', desc: '24小时接受业主咨询、报修、投诉及建议', icon: 'chat' },
  { title: '安全管理', desc: '门禁巡更、车辆管理、消防巡检等安防服务', icon: 'secured' },
  { title: '环境保洁', desc: '公共区域日常保洁、垃圾清运、消杀服务', icon: 'filter' },
  { title: '绿化养护', desc: '园林景观修剪、补种、病虫害防治', icon: 'tree' },
  { title: '工程维修', desc: '设施设备日常运行维护及户内有偿维修', icon: 'tools' }
]);

const honors = ref([
  { title: '江苏省省级物业管理示范住宅小区', date: '2023-12' },
  { title: '苏州市文明社区创建先进单位', date: '2022-10' },
  { title: '苏州市物业管理行业优秀企业', date: '2021-08' },
  { title: '垃圾分类工作优秀物业企业', date: '2021-03' }
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

  .property-header {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;

    .property-logo {
      width: 100rpx;
      height: 100rpx;
      background: #ECFDF5;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
    }

    .property-title-box {
      .property-name {
        display: block;
        font-size: 34rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 12rpx;
      }
      .property-tags {
        display: flex;
        gap: 12rpx;
        .tag {
          font-size: 20rpx;
          color: #10B981;
          background: #D1FAE5;
          padding: 4rpx 12rpx;
          border-radius: 6rpx;
        }
      }
    }
  }

  .contact-bar {
    display: flex;
    justify-content: space-between;
    background: #F8FAFC;
    border-radius: 16rpx;
    padding: 20rpx 24rpx;

    .contact-item {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #64748B;

      t-icon { margin-right: 8rpx; }

      .phone {
        color: #3B82F6;
        font-weight: 500;
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
      background: #10B981;
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

.info-section {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 8rpx;
      height: 32rpx;
      background: #10B981;
      border-radius: 4rpx;
      margin-right: 16rpx;
    }
  }

  .intro-text {
    font-size: 28rpx;
    color: #64748B;
    line-height: 1.6;
    display: block;
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
      font-size: 26rpx;
      color: #94A3B8;
    }
    .d-value {
      font-size: 26rpx;
      color: #1E293B;
      font-weight: 500;
    }
  }
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;

  .service-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 32rpx;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .service-icon-box {
      width: 80rpx;
      height: 80rpx;
      background: #EFF6FF;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
      flex-shrink: 0;
    }

    .service-info {
      .s-title {
        display: block;
        font-size: 30rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 8rpx;
      }
      .s-desc {
        display: block;
        font-size: 26rpx;
        color: #94A3B8;
        line-height: 1.4;
      }
    }
  }
}

.honor-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  .honor-item {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 24rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.01);

    .honor-badge {
      width: 96rpx;
      height: 96rpx;
      background: #FFFBEB;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
    }

    .honor-info {
      flex: 1;
      .h-title {
        display: block;
        font-size: 28rpx;
        color: #1E293B;
        font-weight: 500;
        margin-bottom: 8rpx;
      }
      .h-date {
        display: block;
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }
}

.mt-24 { margin-top: 24rpx; }
</style>
