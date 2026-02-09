<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">小区报修</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">1</text>
            <text class="label">处理中</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">24</text>
            <text class="label">已完成</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">98%</text>
            <text class="label">满意度</text>
          </view>
        </view>
      </view>
    </view>

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

    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content">
        <view class="repair-card" v-for="(item, index) in filteredRepairs" :key="index">
          <view class="card-header">
            <view class="order-no">单号：{{ item.orderNo }}</view>
            <view class="status-tag" :class="item.statusType">{{ item.status }}</view>
          </view>
          <view class="card-body">
            <view class="repair-type">
              <t-icon :name="item.icon" size="32rpx" color="#3B82F6" />
              <text>{{ item.type }}</text>
            </view>
            <view class="repair-desc">{{ item.desc }}</view>
            <view class="repair-time">报修时间：{{ item.time }}</view>
          </view>
          <view class="card-footer">
            <view class="action-btn outline" v-if="item.statusType === 'completed' && !item.evaluated">去评价</view>
            <view class="action-btn">查看进度</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="bottom-action">
      <view class="submit-btn">
        <t-icon name="add" size="40rpx" color="#fff" />
        <text>我要报修</text>
      </view>
    </view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';




const activeTab = ref(0);
const tabs = ['全部', '处理中', '待评价', '已完成'];

const goBack = () => {
  uni.navigateBack();
};

const repairs = ref([
  { 
    orderNo: 'BX20260208001', 
    type: '水电维修', 
    icon: 'root-list',
    status: '处理中', 
    statusType: 'processing',
    time: '2026-02-08 10:30', 
    desc: '厨房洗菜盆水管漏水，需要更换密封圈。',
    evaluated: false
  },
  { 
    orderNo: 'BX20260125005', 
    type: '公共设施', 
    icon: 'city-gate',
    status: '待评价', 
    statusType: 'completed',
    time: '2026-01-25 14:20', 
    desc: '楼道声控灯不亮，经查为灯泡烧毁，已更换。',
    evaluated: false
  },
  { 
    orderNo: 'BX20260110012', 
    type: '门窗五金', 
    icon: 'home',
    status: '已完成', 
    statusType: 'completed',
    time: '2026-01-10 09:15', 
    desc: '卧室窗户合页松动，已重新加固并涂抹润滑油。',
    evaluated: true
  }
]);

const filteredRepairs = computed(() => {
  if (activeTab.value === 1) return repairs.value.filter(r => r.statusType === 'processing');
  if (activeTab.value === 2) return repairs.value.filter(r => r.statusType === 'completed' && !r.evaluated);
  if (activeTab.value === 3) return repairs.value.filter(r => r.statusType === 'completed');
  return repairs.value;
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
  display: flex;
  padding: 40rpx @page-padding 20rpx;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 10;

  .tab-item {
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
  }
}

.content-scroll {
  flex: 1;
  overflow: hidden;
}

.tab-content {
  padding: 0 @page-padding 140rpx;
}

.repair-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #F1F5F9;

    .order-no {
      font-size: 24rpx;
      color: #94A3B8;
    }

    .status-tag {
      font-size: 24rpx;
      font-weight: 500;

      &.processing {
        color: #3B82F6;
      }

      &.completed {
        color: #10B981;
      }
    }
  }

  .card-body {
    margin-bottom: 24rpx;

    .repair-type {
      display: flex;
      align-items: center;
      gap: 12rpx;
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 16rpx;
    }

    .repair-desc {
      font-size: 28rpx;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 16rpx;
    }

    .repair-time {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 20rpx;

    .action-btn {
      padding: 12rpx 32rpx;
      background: #F1F5F9;
      color: #475569;
      font-size: 26rpx;
      border-radius: 12rpx;
      font-weight: 500;

      &.outline {
        background: transparent;
        border: 1rpx solid #3B82F6;
        color: #3B82F6;
      }
    }
  }
}

.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx @page-padding 40rpx;
  background: #FFFFFF;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 100;

  .submit-btn {
    height: 88rpx;
    background: @primary-blue;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    color: #FFFFFF;
    font-size: 32rpx;
    font-weight: 600;

    &:active {
      opacity: 0.9;
    }
  }
}
</style>
