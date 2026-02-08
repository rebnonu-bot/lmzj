<template>
  <view class="page-container">
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">小区生活</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">3</text>
            <text class="label">进行中活动</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">15</text>
            <text class="label">邻里互助</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">280</text>
            <text class="label">累计参与</text>
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
        <view class="life-card" v-for="(item, index) in filteredItems" :key="index">
          <view class="life-cover" v-if="item.cover">
            <image :src="item.cover" mode="aspectFill" class="cover-img" />
            <view class="life-tag">{{ item.category }}</view>
          </view>
          <view class="life-info">
            <view class="life-header" v-if="!item.cover">
              <view class="life-tag">{{ item.category }}</view>
              <view class="life-status" :class="item.statusType">{{ item.status }}</view>
            </view>
            <view class="life-title">{{ item.title }}</view>
            <view class="life-meta">
              <view class="meta-item">
                <t-icon name="time" size="24rpx" color="#94A3B8" />
                <text>{{ item.time }}</text>
              </view>
              <view class="meta-item" v-if="item.location">
                <t-icon name="location" size="24rpx" color="#94A3B8" />
                <text>{{ item.location }}</text>
              </view>
            </view>
            <view class="life-footer">
              <view class="participants" v-if="item.participants">
                <text class="count">{{ item.participants }}</text>
                <text>人已参加</text>
              </view>
              <view class="price" v-if="item.price">
                <text class="unit">￥</text>
                <text class="num">{{ item.price }}</text>
              </view>
              <view class="action-btn">{{ item.btnText }}</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="fab-btn">
      <t-icon name="add" size="48rpx" color="#fff" />
    </view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const activeTab = ref(0);
const tabs = ['全部', '社区活动', '邻里互助', '跳蚤市场'];

const goBack = () => {
  uni.navigateBack();
};

const items = ref([
  { 
    title: '周末社区羽毛球联谊赛', 
    category: '社区活动', 
    time: '2026-02-14 09:00', 
    location: '小区体育场',
    participants: 24, 
    status: '进行中',
    statusType: 'ongoing',
    btnText: '立即报名',
    cover: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=500&q=80'
  },
  { 
    title: '求助：谁家有闲置的梯子借用一下？', 
    category: '邻里互助', 
    time: '10分钟前', 
    location: '',
    participants: 0, 
    status: '求助中',
    statusType: 'help',
    btnText: '提供帮助',
    cover: ''
  },
  { 
    title: '九成新儿童自行车转让', 
    category: '跳蚤市场', 
    time: '2小时前', 
    location: '3号楼',
    price: '150',
    participants: 0, 
    status: '出售中',
    statusType: 'sale',
    btnText: '联系卖家',
    cover: 'https://images.unsplash.com/photo-1512338411170-d39cb3ca4720?w=500&q=80'
  },
  { 
    title: '元宵节社区猜灯谜活动', 
    category: '社区活动', 
    time: '2026-02-11 18:30', 
    location: '小区中心广场',
    participants: 120, 
    status: '进行中',
    statusType: 'ongoing',
    btnText: '查看详情',
    cover: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=500&q=80'
  }
]);

const filteredItems = computed(() => {
  if (activeTab.value === 0) return items.value;
  return items.value.filter(i => i.category === tabs[activeTab.value]);
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

.life-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .life-cover {
    height: 300rpx;
    position: relative;

    .cover-img {
      width: 100%;
      height: 100%;
    }

    .life-tag {
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

  .life-info {
    padding: 24rpx;

    .life-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .life-tag {
        font-size: 20rpx;
        background: #F1F5F9;
        color: #64748B;
        padding: 4rpx 16rpx;
        border-radius: 6rpx;
      }

      .life-status {
        font-size: 22rpx;
        font-weight: 500;

        &.ongoing { color: #3B82F6; }
        &.help { color: #EF4444; }
        &.sale { color: #10B981; }
      }
    }

    .life-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1E293B;
      line-height: 1.4;
      margin-bottom: 16rpx;
    }

    .life-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;
      margin-bottom: 24rpx;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .life-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24rpx;
      border-top: 1rpx solid #F1F5F9;

      .participants {
        font-size: 24rpx;
        color: #94A3B8;
        .count {
          color: #3B82F6;
          font-weight: 600;
          margin-right: 4rpx;
        }
      }

      .price {
        color: #EF4444;
        font-weight: 700;
        .unit { font-size: 24rpx; }
        .num { font-size: 36rpx; }
      }

      .action-btn {
        padding: 12rpx 32rpx;
        background: @primary-blue;
        color: #FFFFFF;
        font-size: 26rpx;
        font-weight: 600;
        border-radius: 12rpx;
      }
    }
  }
}

.fab-btn {
  position: fixed;
  right: 40rpx;
  bottom: 180rpx;
  width: 100rpx;
  height: 100rpx;
  background: @primary-blue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 30rpx rgba(59, 130, 246, 0.4);
  z-index: 90;

  &:active {
    transform: scale(0.95);
  }
}
</style>
