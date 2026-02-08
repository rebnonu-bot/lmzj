<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">业主自治</text>
      </view>
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Summary Card -->
    <view class="info-card-container">
      <view class="info-card">
        <view class="stat-box">
          <view class="stat-item">
            <text class="num">9</text>
            <text class="label">业委会成员</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num">24</text>
            <text class="label">年度会议</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="num highlight">15</text>
            <text class="label">生效决议</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 3. Tabs -->
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

    <!-- 4. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="tab-content">
        <!-- 业委会成员 -->
        <view v-if="activeTab === 1" class="members-grid">
          <view class="member-card" v-for="(member, index) in members" :key="index">
            <view class="member-avatar">
              <t-icon name="user-circle" size="80rpx" color="#CBD5E1" />
            </view>
            <view class="member-info">
              <text class="name">{{ member.name }}</text>
              <text class="role">{{ member.role }}</text>
            </view>
          </view>
        </view>

        <!-- 议事/规约列表 -->
        <view v-else class="items-list">
          <view class="item-card" v-for="(item, index) in filteredItems" :key="index">
            <view class="item-header">
              <view class="item-tag" :class="item.typeCode">{{ item.type }}</view>
              <text class="item-date">{{ item.date }}</text>
            </view>
            <view class="item-title">{{ item.title }}</view>
            <view class="item-desc">{{ item.desc }}</view>
            <view class="item-footer">
              <view class="item-status" :class="item.statusCode">{{ item.status }}</view>
              <view class="item-action">
                <text>查看全文</text>
                <t-icon name="chevron-right" size="24rpx" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
        
        <!-- 加载更多 -->
        <view class="load-more" v-if="filteredItems.length > 0 || activeTab === 1">
          <text>已显示全部内容</text>
        </view>
        <view class="empty-state" v-else>
          <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
          <text>暂无相关内容</text>
        </view>
      </view>
    </scroll-view>

    <!-- 5. Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar();
});

const goBack = () => {
  uni.navigateBack();
};

const activeTab = ref(0);
const tabs = ['全部', '业委会', '议事大厅', '自治规约'];

const members = ref([
  { name: '张建国', role: '业委会主任' },
  { name: '李美华', role: '副主任' },
  { name: '王志远', role: '秘书长' },
  { name: '赵丽娟', role: '委员' },
  { name: '陈大明', role: '委员' },
  { name: '孙小英', role: '委员' }
]);

const items = ref([
  {
    title: '关于2024年度物业费调整的听证会纪要',
    desc: '本会议就物业费调整的必要性及调整方案进行了公开讨论，收集了广大业主的初步意见。',
    date: '2024-03-20',
    type: '议事大厅',
    typeCode: 'meeting',
    status: '已公示',
    statusCode: 'published'
  },
  {
    title: '龙景名苑小区文明养犬公约',
    desc: '为营造和谐社区，经业主大会表决通过，特制定本公约，请广大养犬业主共同遵守。',
    date: '2024-02-15',
    type: '自治规约',
    typeCode: 'rule',
    status: '生效中',
    statusCode: 'active'
  },
  {
    title: '小区南门车辆出入管理优化方案表决结果',
    desc: '关于南门单向通行的方案已获得超过2/3业主同意，将于下月起正式实施。',
    date: '2024-01-10',
    type: '议事大厅',
    typeCode: 'meeting',
    status: '已生效',
    statusCode: 'active'
  },
  {
    title: '龙景名苑首届业主大会议事规则',
    desc: '明确业主大会的职责、召集程序及表决规则，是社区自治的基础性文件。',
    date: '2023-12-05',
    type: '自治规约',
    typeCode: 'rule',
    status: '生效中',
    statusCode: 'active'
  }
]);

const filteredItems = computed(() => {
  if (activeTab.value === 0) return items.value;
  return items.value.filter(item => item.type === tabs[activeTab.value]);
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
  padding: 40rpx 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.05);

  .stat-box {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      text-align: center;
      flex: 1;
      
      .num {
        display: block;
        font-size: 40rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;

        &.highlight {
          color: @primary-blue;
        }
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
  padding: 40rpx @page-padding 20rpx;
  background: transparent;

  .tabs-scroll {
    white-space: nowrap;
    width: 100%;
  }

  .tab-item {
    display: inline-block;
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
      background: @primary-blue;
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

.members-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.member-card {
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .member-avatar {
    margin-bottom: 20rpx;
  }

  .member-info {
    text-align: center;
    .name {
      display: block;
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 4rpx;
    }
    .role {
      font-size: 24rpx;
      color: #64748B;
    }
  }
}

.items-list {
  .item-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .item-tag {
        font-size: 22rpx;
        padding: 4rpx 16rpx;
        border-radius: 8rpx;

        &.meeting {
          background: #E0F2FE;
          color: #0284C7;
        }
        &.rule {
          background: #F0FDF4;
          color: #16A34A;
        }
      }

      .item-date {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .item-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 12rpx;
      line-height: 1.4;
    }

    .item-desc {
      font-size: 26rpx;
      color: #64748B;
      line-height: 1.5;
      margin-bottom: 24rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24rpx;
      border-top: 1rpx solid #F1F5F9;

      .item-status {
        font-size: 24rpx;
        font-weight: 500;

        &.published { color: #0284C7; }
        &.active { color: #16A34A; }
      }

      .item-action {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: @primary-blue;
        
        text {
          margin-right: 4rpx;
        }
      }
    }
  }
}

.load-more {
  text-align: center;
  padding: 40rpx 0;
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  text {
    margin-top: 20rpx;
    font-size: 28rpx;
    color: #94A3B8;
  }
}
</style>
