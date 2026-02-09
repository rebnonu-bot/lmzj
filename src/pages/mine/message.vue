<template>
  <view class="page-container">
    <t-navbar
      title="我的消息"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <!-- 1. Tabs Section -->
    <view class="tabs-wrapper">
      <t-tabs :value="activeTab" @click="handleTabChange" :bottom-line="true">
        <t-tab-panel label="全部" value="all" />
        <t-tab-panel label="未读" value="unread" />
        <t-tab-panel label="已读" value="read" />
      </t-tabs>
    </view>

    <!-- 2. Message List -->
    <scroll-view scroll-y class="message-scroll">
      <view class="message-list" v-if="filteredMessages.length > 0">
        <view 
          v-for="(item, index) in filteredMessages" 
          :key="item.id" 
          class="message-card"
          @click="handleMessageClick(item)"
        >
          <view class="card-left">
            <view class="icon-box" :class="item.categoryCode">
              <t-icon :name="item.icon" size="44rpx" color="#FFFFFF" />
            </view>
            <view class="unread-dot" v-if="!item.isRead"></view>
          </view>
          
          <view class="card-content">
            <view class="header-row">
              <text class="category-name">{{ item.category }}</text>
              <text class="message-time">{{ item.time }}</text>
            </view>
            <view class="title-row">
              <text class="message-title" :class="{ read: item.isRead }">{{ item.title }}</text>
            </view>
            <view class="desc-row">
              <text class="message-desc">{{ item.desc }}</text>
            </view>
          </view>
          
          <view class="card-right">
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
          </view>
        </view>
        
        <view class="load-more">
          <text>没有更多消息了</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="chat-error" size="120rpx" color="#E2E8F0" />
        <text class="empty-text">暂无相关消息</text>
      </view>
    </scroll-view>

    <!-- 3. Bottom Actions -->
    <view class="bottom-bar" v-if="hasUnread">
      <view class="action-btn" @click="handleMarkAllRead">
        <t-icon name="check-double" size="36rpx" color="#3B82F6" />
        <text>全部已读</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Message {
  id: string;
  title: string;
  desc: string;
  time: string;
  category: string;
  categoryCode: string;
  icon: string;
  isRead: boolean;
  type: string;
}

const activeTab = ref('all');

const messages = ref<Message[]>([
  {
    id: '1',
    title: '关于2026年度物业服务续聘表决的投票邀请',
    desc: '尊敬的业主刘泽辉，您的房屋阳光水岸一期 1-1-802 关联了新的电子投票，请及时参与。',
    time: '10:30',
    category: '电子投票',
    categoryCode: 'vote',
    icon: 'edit-1',
    isRead: false,
    type: 'vote'
  },
  {
    id: '2',
    title: '1月物业费账单已出',
    desc: '您好，阳光水岸一期 1-1-802 的1月物业费账单已生成，请及时缴纳。',
    time: '昨天',
    category: '费用账单',
    categoryCode: 'bill',
    icon: 'wallet',
    isRead: false,
    type: 'bill'
  },
  {
    id: '3',
    title: '报修处理进度更新',
    desc: '您提交的“客厅灯泡不亮”报修申请，维修师傅已接单，预计今日14:00上门。',
    time: '02-08',
    category: '报修服务',
    categoryCode: 'repair',
    icon: 'tools',
    isRead: true,
    type: 'repair'
  },
  {
    id: '4',
    title: '房屋认证成功通知',
    desc: '恭喜！您名下的“阳光水岸二期 5-1-1202”已通过实名认证。',
    time: '02-05',
    category: '系统通知',
    categoryCode: 'notice',
    icon: 'check-circle',
    isRead: true,
    type: 'notice'
  }
]);

const handleBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.switchTab({
      url: '/pages/mine/mine'
    });
  }
};

const handleTabChange = (e: any) => {
  if (e && typeof e === 'object') {
    if (e.value !== undefined) {
      activeTab.value = String(e.value);
    } else if (e.detail && e.detail.value !== undefined) {
      activeTab.value = String(e.detail.value);
    }
  } else if (e !== undefined) {
    activeTab.value = String(e);
  }
};

const filteredMessages = computed(() => {
  const currentTab = String(activeTab.value);
  if (currentTab === 'unread') {
    return messages.value.filter(m => !m.isRead);
  } else if (currentTab === 'read') {
    return messages.value.filter(m => m.isRead);
  }
  return messages.value;
});

const hasUnread = computed(() => {
  return messages.value.some(m => !m.isRead);
});

const handleMessageClick = (item: Message) => {
  // 标记为已读
  item.isRead = true;
  
  // 跳转到详情页
  uni.navigateTo({
    url: `/pages/mine/message-detail?id=${item.id}&type=${item.type}`
  });
};

const handleMarkAllRead = () => {
  messages.value.forEach(m => m.isRead = true);
  uni.showToast({
    title: '已全部标记为已读',
    icon: 'success'
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding-top: 100rpx;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.tabs-wrapper {
  background: #FFFFFF;
  position: sticky;
  top: 100rpx;
  z-index: 10;
}

.message-scroll {
  flex: 1;
  overflow: hidden;
}

.message-list {
  padding: 20rpx @page-padding 40rpx;
}

.message-card {
  background: #FFFFFF;
  border-radius: @radius-large;
  padding: 30rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
  transition: all 0.2s;

  &:active {
    background: #F8FAFC;
    transform: scale(0.99);
  }

  .card-left {
    position: relative;
    margin-right: 24rpx;

    .icon-box {
      width: 88rpx;
      height: 88rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &.voting { background: linear-gradient(135deg, #60A5FA, #3B82F6); }
      &.repair { background: linear-gradient(135deg, #F87171, #EF4444); }
      &.notice { background: linear-gradient(135deg, #34D399, #10B981); }
      &.complaint { background: linear-gradient(135deg, #FBBF24, #F59E0B); }
    }

    .unread-dot {
      position: absolute;
      top: -4rpx;
      right: -4rpx;
      width: 16rpx;
      height: 16rpx;
      background: #EF4444;
      border-radius: 50%;
      border: 3rpx solid #FFFFFF;
    }
  }

  .card-content {
    flex: 1;
    overflow: hidden;

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8rpx;

      .category-name {
        font-size: 24rpx;
        color: #94A3B8;
        font-weight: 500;
      }

      .message-time {
        font-size: 22rpx;
        color: #CBD5E1;
      }
    }

    .title-row {
      margin-bottom: 8rpx;

      .message-title {
        font-size: 30rpx;
        font-weight: 600;
        color: #1E293B;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.read {
          color: #64748B;
          font-weight: 400;
        }
      }
    }

    .desc-row {
      .message-desc {
        font-size: 26rpx;
        color: #94A3B8;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }
    }
  }

  .card-right {
    margin-left: 16rpx;
    align-self: center;
  }
}

.empty-state {
  padding-top: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #94A3B8;
  }
}

.load-more {
  text-align: center;
  padding: 20rpx 0;
  text {
    font-size: 24rpx;
    color: #CBD5E1;
  }
}

.bottom-bar {
  padding: 20rpx @page-padding calc(20rpx + env(safe-area-inset-bottom));
  background: #FFFFFF;
  border-top: 1rpx solid #F1F5F9;
  display: flex;
  justify-content: flex-end;

  .action-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 12rpx 24rpx;
    border-radius: 30rpx;
    background: #EFF6FF;
    
    text {
      font-size: 26rpx;
      color: #3B82F6;
      font-weight: 500;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
