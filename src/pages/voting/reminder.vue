<template>
  <view class="page-container">
    <!-- 1. Custom Header Section -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#333" />
        </view>
        <text class="page-title">温馨提示</text>
      </view>
    </view>

    <!-- 2. Content Section -->
    <scroll-view class="content-section" scroll-y>
      <view class="scroll-content">
        <view class="notice-card">
          <view class="card-header">
            <t-icon name="info-circle-filled" size="48rpx" color="#3B82F6" />
            <text class="title">投票须知</text>
          </view>
          
          <view class="notice-content">
            <text class="greeting">尊敬的业主，为了保障您的合法权益，请在参与投票前仔细阅读以下说明：</text>
            
            <view class="notice-list">
              <view class="list-item">
                <view class="icon-box primary">
                  <t-icon name="user-checked" size="36rpx" color="#3B82F6" />
                </view>
                <view class="item-body">
                  <text class="item-title">身份绑定</text>
                  <text class="item-desc">投票之前需要先进行业主身份绑定以验证身份，如已绑定请跳过。</text>
                </view>
              </view>

              <view class="list-item">
                <view class="icon-box secondary">
                  <t-icon name="view-module" size="36rpx" color="#60A5FA" />
                </view>
                <view class="item-body">
                  <text class="item-title">参与投票</text>
                  <text class="item-desc">进入功能后，您可参与并查看与您相关的投票议题，并可查阅历史信息。</text>
                </view>
              </view>

              <view class="list-item">
                <view class="icon-box warning">
                  <t-icon name="secured" size="36rpx" color="#3B82F6" />
                </view>
                <view class="item-body">
                  <text class="item-title">法律效力</text>
                  <text class="item-desc">业主大会或业委会的决定对业主具有约束力。若侵害合法权益，业主可向法院申请撤销。</text>
                </view>
              </view>

              <view class="list-item">
                <view class="icon-box info">
                  <t-icon name="gesture-click" size="36rpx" color="#3B82F6" />
                </view>
                <view class="item-body">
                  <text class="item-title">神圣一票</text>
                  <text class="item-desc">请在充分了解表决事项的基础上，对小区公共事务投出您神圣的一票！</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 4. Bottom Button -->
    <view class="footer-section">
      <button class="next-btn" @click="handleNext">下一步</button>
    </view>
  </view>
</template>

<script setup lang="ts">
const goBack = () => {
  uni.navigateBack();
};

const handleNext = () => {
  uni.navigateTo({
    url: '/pages/voting/vote-topics'
  });
};
</script>

<style lang="less" scoped>
@import "@/styles/variable.less";

.page-container {
  height: 100vh;
  width: 100%;
  background-color: @bg-light-blue;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.header-section {
  flex-shrink: 0;
  width: 100%;
  padding-top: var(--status-bar-height);
  background-color: #fff;
  border-bottom: 1rpx solid #F1F5F9;
  box-sizing: border-box;

  .header-top {
    height: 88rpx;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 @page-padding;
    box-sizing: border-box;

    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      z-index: 10;
    }

    .page-title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 34rpx;
      font-weight: 600;
      color: @text-primary;
    }
  }
}

.content-section {
  flex: 1;
  height: 0;
  width: 100%;

  .scroll-content {
    padding: 30rpx @page-padding 40rpx;
    box-sizing: border-box;
    width: 100%;
  }

  .notice-card {
    background-color: #fff;
    border-radius: @radius-medium;
    padding: 40rpx;
    box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
    border: 1rpx solid #F1F5F9;
    margin-bottom: 20rpx;
    box-sizing: border-box;
    width: 100%;

    .card-header {
      display: flex;
      align-items: center;
      gap: 16rpx;
      margin-bottom: 30rpx;
      padding-bottom: 24rpx;
      border-bottom: 1rpx solid #F1F5F9;

      .title {
        font-size: 36rpx;
        font-weight: 600;
        color: @primary-blue;
      }
    }

    .notice-content {
      .greeting {
        display: block;
        font-size: 28rpx;
        color: @text-secondary;
        line-height: 1.6;
        margin-bottom: 40rpx;
        text-align: justify;
      }

      .notice-list {
        .list-item {
          display: flex;
          gap: 24rpx;
          margin-bottom: 36rpx;

          &:last-child {
            margin-bottom: 0;
          }

          .icon-box {
            width: 80rpx;
            height: 80rpx;
            border-radius: 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            &.primary { background-color: fade(@primary-blue, 10%); }
            &.secondary { background-color: fade(@secondary-blue, 10%); }
            &.warning { background-color: fade(@primary-blue, 10%); }
            &.info { background-color: fade(@primary-blue, 10%); }
          }

          .item-body {
            flex: 1;

            .item-title {
              display: block;
              font-size: 30rpx;
              font-weight: 600;
              color: @text-primary;
              margin-bottom: 8rpx;
            }

            .item-desc {
              display: block;
              font-size: 26rpx;
              color: @text-secondary;
              line-height: 1.5;
              text-align: justify;
            }
          }
        }
      }
    }
  }
}

.footer-section {
  flex-shrink: 0;
  width: 100%;
  padding: 30rpx @page-padding calc(30rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #F1F5F9;
  box-sizing: border-box;
  
  .next-btn {
    width: 100%;
    height: 96rpx;
    background: linear-gradient(135deg, @primary-blue 0%, @secondary-blue 100%);
    color: #fff;
    border-radius: @radius-medium;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: @shadow-blue;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }
}
</style>
