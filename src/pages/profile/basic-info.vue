<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">基本信息</text>
      <view class="placeholder"></view>
    </view>

    <!-- 小区概览卡片 -->
    <view class="summary-card">
      <view class="community-header">
        <view class="community-logo">
          <t-icon name="home" size="64rpx" color="#2563EB" />
        </view>
        <view class="community-main">
          <text class="name">龙景名苑</text>
          <text class="tag">高品质宜居社区</text>
        </view>
      </view>
      <view class="stats-grid">
        <view class="stats-item">
          <text class="value">12</text>
          <text class="label">楼栋总数</text>
        </view>
        <view class="stats-item">
          <text class="value">1,240</text>
          <text class="label">总户数</text>
        </view>
        <view class="stats-item">
          <text class="value">95%</text>
          <text class="label">入驻率</text>
        </view>
      </view>
    </view>

    <!-- 详细信息列表 -->
    <view class="info-list">
      <view class="info-section">
        <view class="section-title">基本资料</view>
        <view class="info-group">
          <view class="info-row">
            <text class="label">小区地址</text>
            <text class="value">广东省深圳市南山区粤海街道龙景路88号</text>
          </view>
          <view class="info-row">
            <text class="label">占地面积</text>
            <text class="value">45,000 ㎡</text>
          </view>
          <view class="info-row">
            <text class="label">建筑面积</text>
            <text class="value">120,000 ㎡</text>
          </view>
          <view class="info-row">
            <text class="label">绿化率</text>
            <text class="value">35%</text>
          </view>
          <view class="info-row">
            <text class="label">容积率</text>
            <text class="value">2.4</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">开发与物业</view>
        <view class="info-group">
          <view class="info-row">
            <text class="label">开发商</text>
            <text class="value">龙景房地产开发有限公司</text>
          </view>
          <view class="info-row">
            <text class="label">物业公司</text>
            <text class="value">龙景物业管理服务有限公司</text>
          </view>
          <view class="info-row">
            <text class="label">竣工日期</text>
            <text class="value">2020年10月15日</text>
          </view>
          <view class="info-row">
            <text class="label">物业类型</text>
            <text class="value">普通住宅</text>
          </view>
        </view>
      </view>

      <view class="info-section">
        <view class="section-title">配套设施</view>
        <view class="info-group">
          <view class="info-row">
            <text class="label">车位数量</text>
            <text class="value">1,500个 (地上300/地下1200)</text>
          </view>
          <view class="info-row">
            <text class="label">供水方式</text>
            <text class="value">市政供水</text>
          </view>
          <view class="info-row">
            <text class="label">供电方式</text>
            <text class="value">市政供电</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="footer-tips">
      <text>信息由物业服务中心提供，如有变更请以实际为准</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 隐藏原生tabbar
onMounted(() => {
  uni.hideTabBar();
});

const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F8FAFC;
  position: relative;
  padding-bottom: 60rpx;
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

  .community-header {
    display: flex;
    align-items: center;
    margin-bottom: 48rpx;

    .community-logo {
      width: 100rpx;
      height: 100rpx;
      background: rgba(37, 99, 235, 0.1);
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24rpx;
    }

    .community-main {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 8rpx;
      }

      .tag {
        font-size: 24rpx;
        color: #2563EB;
        background: rgba(37, 99, 235, 0.1);
        padding: 4rpx 16rpx;
        border-radius: 100rpx;
        align-self: flex-start;
      }
    }
  }

  .stats-grid {
    display: flex;
    justify-content: space-around;
    padding-top: 32rpx;
    border-top: 2rpx solid #F1F5F9;
    
    .stats-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .value {
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;
      }

      .label {
        font-size: 22rpx;
        color: #94A3B8;
      }
    }
  }
}

.info-list {
  padding: 0 32rpx;

  .info-section {
    margin-bottom: 40rpx;

    .section-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 24rpx;
      padding-left: 16rpx;
      border-left: 8rpx solid #2563EB;
    }

    .info-group {
      background: #FFFFFF;
      border-radius: 20rpx;
      padding: 0 32rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

      .info-row {
        display: flex;
        justify-content: space-between;
        padding: 32rpx 0;
        border-bottom: 2rpx solid #F8FAFC;

        &:last-child {
          border-bottom: none;
        }

        .label {
          font-size: 28rpx;
          color: #64748B;
          width: 200rpx;
          flex-shrink: 0;
        }

        .value {
          font-size: 28rpx;
          color: #1E293B;
          text-align: right;
          flex: 1;
          line-height: 1.5;
        }
      }
    }
  }
}

.footer-tips {
  text-align: center;
  padding: 40rpx 0;
  
  text {
    font-size: 22rpx;
    color: #94A3B8;
  }
}
</style>
