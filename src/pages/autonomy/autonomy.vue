<template>
  <view class="container">
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">业主自治</text>
      <view class="placeholder"></view>
    </view>

    <!-- 自治概览卡片 -->
    <view class="summary-card">
      <view class="stats-grid">
        <view class="stats-item">
          <text class="value">9</text>
          <text class="label">业委会成员</text>
        </view>
        <view class="stats-item">
          <text class="value">24</text>
          <text class="label">年度会议</text>
        </view>
        <view class="stats-item">
          <text class="value highlight">15</text>
          <text class="label">生效决议</text>
        </view>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="tabs-scroll-box">
      <scroll-view scroll-x class="tabs-container" show-scrollbar="false">
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

    <!-- 内容列表 -->
    <scroll-view scroll-y class="list-container">
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
              <t-icon name="chevron-right" size="24rpx" color="#2563EB" />
            </view>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more">
        <text>已显示全部内容</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 隐藏原生tabbar
onMounted(() => {
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

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #F8FAFC;
  position: relative;
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

  .stats-grid {
    display: flex;
    justify-content: space-around;
    
    .stats-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .value {
        font-size: 40rpx;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;

        &.highlight {
          color: #2563EB;
        }
      }

      .label {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }
  }
}

.tabs-scroll-box {
  background: #FFFFFF;
  padding: 0 32rpx;
  position: sticky;
  top: 0;
  z-index: 20;
  margin-bottom: 20rpx;
}

.tabs-container {
  white-space: nowrap;
  width: 100%;

  .tab-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32rpx;
    height: 88rpx;
    position: relative;

    text {
      font-size: 28rpx;
      color: #64748B;
      transition: all 0.3s;
    }

    &.active {
      text {
        color: #2563EB;
        font-weight: 600;
      }
    }

    .active-bar {
      position: absolute;
      bottom: 0;
      width: 40rpx;
      height: 6rpx;
      background: #2563EB;
      border-radius: 3rpx;
    }
  }
}

.list-container {
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 8rpx;

  .member-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

    .member-avatar {
      margin-right: 20rpx;
    }

    .member-info {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 28rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 4rpx;
      }

      .role {
        font-size: 22rpx;
        color: #94A3B8;
      }
    }
  }
}

.item-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .item-tag {
      padding: 4rpx 16rpx;
      border-radius: 6rpx;
      font-size: 22rpx;
      font-weight: 500;

      &.meeting { background: rgba(37, 99, 235, 0.1); color: #2563EB; }
      &.rule { background: rgba(16, 185, 129, 0.1); color: #10B981; }
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
    margin-bottom: 16rpx;
  }

  .item-desc {
    font-size: 26rpx;
    color: #64748B;
    line-height: 1.6;
    margin-bottom: 24rpx;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24rpx;
    border-top: 2rpx solid #F1F5F9;

    .item-status {
      font-size: 24rpx;
      font-weight: 500;

      &.published { color: #F59E0B; }
      &.active { color: #10B981; }
    }

    .item-action {
      display: flex;
      align-items: center;
      
      text {
        font-size: 24rpx;
        color: #2563EB;
        font-weight: 500;
        margin-right: 4rpx;
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
</style>
