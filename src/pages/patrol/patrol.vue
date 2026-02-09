<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">日常巡查</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="patrol-summary">
          <view class="summary-item">
            <text class="label">今日巡查次数</text>
            <text class="value">12次</text>
          </view>
          <view class="summary-item">
            <text class="label">异常点位</text>
            <text class="value danger">0个</text>
          </view>
          <view class="summary-item">
            <text class="label">巡查覆盖率</text>
            <text class="value">100%</text>
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
        <view class="patrol-log" v-for="(log, index) in patrolLogs" :key="index">
          <view class="log-header">
            <view class="patrol-type">{{ log.type }}</view>
            <view class="patrol-time">{{ log.time }}</view>
          </view>
          <view class="log-body">
            <view class="patrol-person">
              <text class="label">巡查人：</text>
              <text class="name">{{ log.person }}</text>
            </view>
            <view class="patrol-result">
              <text class="label">巡查结果：</text>
              <text class="status" :class="log.statusType">{{ log.status }}</text>
            </view>
            <view class="patrol-desc" v-if="log.desc">
              <text class="label">详情说明：</text>
              <text class="text">{{ log.desc }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';




const activeTab = ref(0);
const tabs = ['全部', '安保巡查', '保洁巡查', '设备巡查'];

const goBack = () => {
  uni.navigateBack();
};

const patrolLogs = ref([
  { type: '安保巡查', time: '2026-02-08 10:30', person: '张大宝', status: '正常', statusType: 'success', desc: '全小区公共区域巡查完毕，未发现可疑人员。' },
  { type: '设备巡查', time: '2026-02-08 09:15', person: '王工', status: '正常', statusType: 'success', desc: '2号楼水泵房运行数据正常。' },
  { type: '保洁巡查', time: '2026-02-08 08:45', person: '刘阿姨', status: '正常', statusType: 'success', desc: '1-5号楼楼道卫生清理完毕。' },
  { type: '安保巡查', time: '2026-02-07 23:30', person: '李晓峰', status: '正常', statusType: 'success', desc: '夜间巡查，各出入口值守正常。' }
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

  .patrol-summary {
    display: flex;
    justify-content: space-between;

    .summary-item {
      text-align: center;
      flex: 1;

      .label {
        display: block;
        font-size: 24rpx;
        color: #94A3B8;
        margin-bottom: 12rpx;
      }
      .value {
        font-size: 32rpx;
        font-weight: 700;
        color: #1E293B;

        &.danger {
          color: #EF4444;
        }
      }
    }
  }
}

.tabs-container {
  display: flex;
  padding: 40rpx @page-padding 20rpx;

  .tab-item {
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
      background: #64748B;
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

.patrol-log {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    border-bottom: 1rpx solid #F1F5F9;
    padding-bottom: 20rpx;

    .patrol-type {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
    }
    .patrol-time {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .log-body {
    .patrol-person, .patrol-result, .patrol-desc {
      display: flex;
      margin-bottom: 12rpx;
      font-size: 28rpx;

      .label {
        color: #94A3B8;
        width: 140rpx;
        flex-shrink: 0;
      }
      .name, .text {
        color: #1E293B;
      }
      .status {
        &.success { color: #10B981; }
        &.danger { color: #EF4444; }
      }
    }
  }
}
</style>
