<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#333" />
        </view>
        <text class="page-title">投票结果</text>
      </view>
    </view>

    <!-- 2. Content Area -->
    <scroll-view class="content-section" scroll-y>
      <view class="scroll-content">
        <!-- Topic Summary Card -->
        <view class="summary-card">
          <view class="status-badge" :class="resultInfo.status">{{ resultInfo.statusName }}</view>
          <view class="vote-title">{{ resultInfo.title }}</view>
          <view class="vote-meta">
            <view class="meta-item">
              <t-icon name="time" size="28rpx" color="#94A3B8" />
              <text>截止日期：{{ resultInfo.date }}</text>
            </view>
            <view class="meta-item">
              <t-icon name="user" size="28rpx" color="#94A3B8" />
              <text>总参与人数：{{ resultInfo.totalVoters }}人</text>
            </view>
          </view>
        </view>

        <!-- Statistics Dashboard -->
        <view class="stats-section">
          <view class="section-title">表决结果统计</view>
          
          <view class="progress-list">
            <view 
              v-for="(item, index) in statistics" 
              :key="index"
              class="progress-item"
            >
              <view class="item-header">
                <text class="label">{{ item.label }}</text>
                <text class="value">{{ item.count }}票 ({{ item.percent }}%)</text>
              </view>
              <view class="progress-bar-bg">
                <view 
                  class="progress-bar-fill" 
                  :style="{ width: item.percent + '%', backgroundColor: item.color }"
                ></view>
              </view>
            </view>
          </view>

          <!-- Quorum Info -->
          <view class="quorum-info">
            <view class="quorum-card">
              <view class="q-item">
                <text class="q-label">参与户数</text>
                <text class="q-value">{{ resultInfo.participationRate }}%</text>
              </view>
              <view class="divider"></view>
              <view class="q-item">
                <text class="q-label">参与面积</text>
                <text class="q-value">{{ resultInfo.areaRate }}%</text>
              </view>
            </view>
            <view class="quorum-tip">
              <t-icon name="info-circle" size="24rpx" color="#94A3B8" />
              <text>根据《民法典》，本表决事项需双“三分之二”参与且过半数通过。</text>
            </view>
          </view>
        </view>

        <!-- Detailed Breakdown (Optional/Placeholder) -->
        <view class="detail-section">
          <view class="section-title">详细说明</view>
          <view class="detail-content">
            本次投票经由第三方公证平台全程监督，所有投票数据真实有效。业主可通过“我的-投票记录”查看个人投票详情。
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 3. Bottom Action (Share/Export) -->
    <view class="footer-section">
      <button class="share-btn" @click="handleShare">
        <t-icon name="share" size="36rpx" color="#fff" />
        <text>分享结果</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const resultInfo = ref({
  id: 1,
  title: '关于2026年度物业管理服务费调整的表决议案',
  date: '2026-02-01',
  status: 'closed',
  statusName: '已结束',
  totalVoters: 856,
  participationRate: 78.5,
  areaRate: 82.3
});

const statistics = [
  { label: '赞成', count: 624, percent: 72.9, color: '#22C55E' },
  { label: '反对', count: 182, percent: 21.3, color: '#DC2626' },
  { label: '弃权', count: 50, percent: 5.8, color: '#94A3B8' }
];

onLoad((options) => {
  if (options && options.id) {
    console.log('Result ID:', options.id);
  }
});

const goBack = () => {
  uni.navigateBack();
};

const handleShare = () => {
  uni.showToast({
    title: '分享功能开发中',
    icon: 'none'
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
}

.summary-card {
  background: #fff;
  border-radius: @radius-medium;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid #F1F5F9;
  position: relative;

  .status-badge {
    position: absolute;
    right: 40rpx;
    top: 40rpx;
    font-size: 22rpx;
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
    font-weight: 600;

    &.closed { background: #F1F5F9; color: #64748B; }
    &.active { background: #F0FDF4; color: #16A34A; }
  }

  .vote-title {
    font-size: 36rpx;
    font-weight: 700;
    color: @text-primary;
    line-height: 1.4;
    margin-bottom: 24rpx;
    padding-right: 120rpx;
  }

  .vote-meta {
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 12rpx;
      font-size: 26rpx;
      color: @text-secondary;
    }
  }
}

.stats-section {
  background: #fff;
  border-radius: @radius-medium;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid #F1F5F9;

  .section-title {
    font-size: 30rpx;
    font-weight: 700;
    color: @text-primary;
    margin-bottom: 40rpx;
  }

  .progress-list {
    display: flex;
    flex-direction: column;
    gap: 36rpx;
    margin-bottom: 50rpx;

    .progress-item {
      .item-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        
        .label {
          font-size: 28rpx;
          color: @text-primary;
          font-weight: 500;
        }
        
        .value {
          font-size: 26rpx;
          color: @text-secondary;
        }
      }

      .progress-bar-bg {
        height: 16rpx;
        background: #F1F5F9;
        border-radius: 8rpx;
        overflow: hidden;

        .progress-bar-fill {
          height: 100%;
          border-radius: 8rpx;
          transition: width 1s ease-out;
        }
      }
    }
  }

  .quorum-info {
    background: #F8FAFC;
    border-radius: 20rpx;
    padding: 30rpx;

    .quorum-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20rpx;

      .q-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;

        .q-label {
          font-size: 24rpx;
          color: @text-secondary;
        }

        .q-value {
          font-size: 34rpx;
          font-weight: 700;
          color: @primary-blue;
        }
      }

      .divider {
        width: 1rpx;
        height: 60rpx;
        background: #E2E8F0;
      }
    }

    .quorum-tip {
      display: flex;
      align-items: flex-start;
      gap: 12rpx;
      
      text {
        font-size: 22rpx;
        color: #94A3B8;
        line-height: 1.4;
      }
    }
  }
}

.detail-section {
  background: #fff;
  border-radius: @radius-medium;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid #F1F5F9;

  .section-title {
    font-size: 30rpx;
    font-weight: 700;
    color: @text-primary;
    margin-bottom: 24rpx;
  }

  .detail-content {
    font-size: 28rpx;
    color: @text-secondary;
    line-height: 1.6;
    text-align: justify;
  }
}

.footer-section {
  flex-shrink: 0;
  width: 100%;
  padding: 30rpx @page-padding calc(30rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #F1F5F9;
  box-sizing: border-box;

  .share-btn {
    width: 100%;
    height: 100rpx;
    background: @primary-blue;
    color: #fff;
    border-radius: @radius-medium;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    border: none;
    box-shadow: @shadow-blue;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }
}
</style>
