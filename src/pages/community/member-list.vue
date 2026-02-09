<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">全部成员</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <view v-for="(member, index) in memberList" :key="index" class="member-card">
          <view class="member-info-top">
            <text class="member-name">{{ member.name }}</text>
            <view class="member-tag">{{ member.role }}</view>
          </view>
          <view class="member-detail">
            <view class="detail-row">
              <text class="detail-label">手机：</text>
              <text class="detail-value">{{ member.phone }}</text>
            </view>
            <view class="detail-row">
              <text class="detail-label">地址：</text>
              <text class="detail-value">{{ member.address }}</text>
            </view>
          </view>
        </view>
        
        <view v-if="memberList.length === 0" class="empty-state">
          <text>暂无成员信息</text>
        </view>
      </view>

      <app-footer />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const memberList = ref<any[]>([]);

onLoad((options) => {
  if (options?.type === 'management') {
    // 模拟数据：物管会成员
    memberList.value = [
      { name: '黄正洪', role: '主任 - 镇街代表', phone: '34850388', address: '石楼镇嵩山路60号群众服务中心2号楼320室' },
      { name: '罗琳玲', role: '副主任 - 居委会代表', phone: '23883469', address: '石楼镇亚运城社区居委会' },
      { name: '郭荣宗', role: '副主任 - 业主代表', phone: '18054292501', address: '亚运大道1290号3栋1203' },
      { name: '陈喜佳', role: '委员 - 区局代表', phone: '84899880', address: '番禺区沙头街景观大道南7号' },
      { name: '李兵', role: '委员 - 物业企业代表', phone: '13923202558', address: '石楼镇亚运城天成小区物管处' }
    ];
  } else {
    // 模拟数据：业委会成员
    memberList.value = [
      { name: '陈向阳', role: '主任', phone: '13800138001', address: '阳光水岸1栋101' },
      { name: '刘芳', role: '副主任', phone: '13800138002', address: '阳光水岸2栋202' },
      { name: '张强', role: '委员', phone: '13800138003', address: '阳光水岸3栋303' },
      { name: '王伟', role: '委员', phone: '13800138004', address: '阳光水岸4栋404' },
      { name: '李梅', role: '委员', phone: '13800138005', address: '阳光水岸5栋505' }
    ];
  }
});

const goBack = () => {
  uni.navigateBack();
};
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
  height: 8.5rem;
  background: @header-gradient;
  padding: 10rpx @page-padding 0;
  position: relative;
  overflow: hidden;
  color: @text-white;
  flex-shrink: 0;

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

.content-scroll {
  flex: 1;
  height: 0;
  margin-top: -3.5rem;
  position: relative;
  z-index: 3;
}

.content-wrapper {
  padding: 0 30rpx 40rpx;
}

.member-card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .member-info-top {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 20rpx;

    .member-name {
      font-size: 32rpx;
      font-weight: bold;
      color: #1E293B;
    }

    .member-tag {
      font-size: 22rpx;
      color: #0088ff;
      background: #e6f3ff;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
    }
  }

  .member-detail {
    .detail-row {
      display: flex;
      margin-bottom: 12rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .detail-label {
        font-size: 28rpx;
        color: #94A3B8;
        width: 84rpx;
        flex-shrink: 0;
      }

      .detail-value {
        font-size: 28rpx;
        color: #64748B;
        flex: 1;
        line-height: 1.4;
      }
    }
  }
}

.empty-state {
  padding: 100rpx 0;
  text-align: center;
  color: #94A3B8;
  font-size: 28rpx;
}
</style>
