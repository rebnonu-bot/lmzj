<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">消防维保</text>
      </view>
      
      <!-- Decor background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Top Info Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="info-item">
          <text class="label">项目负责人</text>
          <text class="value">陈经理</text>
        </view>
        <view class="info-item">
          <text class="label">电话</text>
          <text class="value highlight">138-0000-1234</text>
        </view>
        <view class="info-item">
          <text class="label">最近一次维保时间</text>
          <text class="value">2026-02-05 09:30</text>
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
      <!-- 消防报告 Tab -->
      <view class="tab-content" v-if="activeTab === 0">
        <view class="record-list">
          <view class="record-card" v-for="(item, index) in fireReports" :key="index">
            <view class="record-header">
              <view class="type-badge report">消防报告</view>
              <text class="record-time">{{ item.date }}</text>
            </view>
            <view class="record-body">
              <view class="record-row">
                <text class="r-label">报告名称：</text>
                <text class="r-value">{{ item.title }}</text>
              </view>
              <view class="record-row">
                <text class="r-label">检查结果：</text>
                <text class="r-value status-pass">合格</text>
              </view>
            </view>
            <view class="record-footer">
              <view class="view-btn">
                <t-icon name="file-pdf" size="32rpx" color="#3B82F6" />
                <text>查看报告原文</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 巡更记录 Tab -->
      <view class="tab-content" v-else-if="activeTab === 1">
        <view class="record-list">
          <view class="record-card" v-for="(item, index) in patrolRecords" :key="index">
            <view class="record-header">
              <view class="type-badge patrol">巡更记录</view>
              <text class="record-time">{{ item.time }}</text>
            </view>
            <view class="record-body">
              <view class="record-row">
                <text class="r-label">巡更人员：</text>
                <text class="r-value">{{ item.worker }}</text>
              </view>
              <view class="record-row">
                <text class="r-label">巡更点：</text>
                <text class="r-value">{{ item.point }}</text>
              </view>
              <view class="record-row">
                <text class="r-label">状态：</text>
                <text class="r-value status-pass">正常</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 填表记录 Tab -->
      <view class="tab-content" v-else-if="activeTab === 2">
        <view class="record-list">
          <view class="record-card" v-for="(item, index) in formRecords" :key="index">
            <view class="record-header">
              <view class="type-badge form">填表记录</view>
              <text class="record-time">{{ item.date }}</text>
            </view>
            <view class="record-body">
              <view class="record-row">
                <text class="r-label">表单类型：</text>
                <text class="r-value">{{ item.type }}</text>
              </view>
              <view class="record-row">
                <text class="r-label">填写人：</text>
                <text class="r-value">{{ item.worker }}</text>
              </view>
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




const activeTab = ref(0);
const tabs = ['消防报告', '巡更记录', '填表记录'];

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.reLaunch({
      url: '/pages/index/index'
    });
  }
};

// Mock data
const fireReports = ref([
  { title: '2026年1月消防设施月度维保报告', date: '2026-02-05', status: '合格' },
  { title: '2025年12月消防设施月度维保报告', date: '2026-01-05', status: '合格' },
  { title: '2025年第四季度消防安全检测报告', date: '2025-12-25', status: '合格' }
]);

const patrolRecords = ref([
  { worker: '张大勇', point: '1号楼消防栓', time: '2026-02-08 10:15' },
  { worker: '张大勇', point: '2号楼感烟探测器', time: '2026-02-08 09:45' },
  { worker: '李建国', point: '地库喷淋泵房', time: '2026-02-07 22:30' }
]);

const formRecords = ref([
  { type: '消防日常巡查登记表', worker: '王强', date: '2026-02-08' },
  { type: '灭火器定期检查记录表', worker: '赵刚', date: '2026-02-05' },
  { type: '防火卷帘测试记录表', worker: '王强', date: '2026-01-30' }
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
    margin-left: -20rpx;

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

  .info-item {
    display: flex;
    margin-bottom: 24rpx;
    
    &:last-child {
      margin-bottom: 0;
    }

    .label {
      width: 260rpx;
      font-size: 28rpx;
      color: #94A3B8;
    }

    .value {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;

      &.highlight {
        color: #3B82F6;
      }
    }
  }
}

.tabs-container {
  display: flex;
  background: transparent;
  padding: 40rpx @page-padding 20rpx;
  position: sticky;
  top: 0;
  z-index: 10;

  .tab-item {
    position: relative;
    padding: 10rpx 0;
    margin-right: 48rpx;
    font-size: 30rpx;
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

.record-list {
  .record-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .record-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24rpx;
      border-bottom: 1rpx solid #F1F5F9;
      padding-bottom: 20rpx;

      .type-badge {
        padding: 6rpx 20rpx;
        font-size: 24rpx;
        border-radius: 8rpx;
        font-weight: 500;
        
        &.report { background: #EBF2FF; color: #3B82F6; }
        &.patrol { background: #ECFDF5; color: #10B981; }
        &.form { background: #FFF7ED; color: #F97316; }
      }

      .record-time {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .record-body {
      .record-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 12rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .r-label {
          font-size: 28rpx;
          color: #64748B;
          white-space: nowrap;
        }

        .r-value {
          font-size: 28rpx;
          color: #1E293B;
          
          &.status-pass {
            color: #10B981;
          }
        }
      }
    }

    .record-footer {
      margin-top: 24rpx;
      padding-top: 24rpx;
      border-top: 1rpx dashed #F1F5F9;
      
      .view-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        color: #3B82F6;
        font-size: 26rpx;
        
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
