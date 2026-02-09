<template>
  <view class="page-container">
    <!-- 1. Custom Header Section -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
      </view>
      
      <view class="header-content">
        <view class="title-group">
          <text class="main-title">业主有话说</text>
          <text class="sub-title">民有所呼 我有所应 民有所求 我有所为</text>
        </view>
        
        <!-- Header Illustration -->
        <view class="header-illust">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <view class="doc-line"></view>
            <view class="doc-line"></view>
            <view class="doc-line short"></view>
          </view>
          <view class="illust-badge">
            <t-icon name="check-circle-filled" size="28rpx" color="#10B981" />
          </view>
        </view>
      </view>

      <!-- Decorative wave at bottom -->
      <view class="header-wave"></view>
    </view>

    <!-- 2. Action Card: 我有话说 -->
    <view class="action-card-container">
      <view class="action-card" @click="handleAddVoice">
        <text class="action-text">我有话说</text>
        <view class="action-icon-box">
          <view class="plus-icon">+</view>
        </view>
      </view>
    </view>

    <!-- 3. Search Bar -->
    <view class="search-section">
      <view class="search-input-box">
        <t-icon name="search" size="36rpx" color="#94A3B8" />
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="请输入搜索关键词" 
          placeholder-style="color: #94A3B8"
        />
        <text class="search-btn">搜索</text>
      </view>
    </view>

    <!-- 4. Tabs Section -->
    <view class="tabs-bar">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        <text>{{ tab }}</text>
        <view class="active-line" v-if="activeTab === index"></view>
      </view>
    </view>

    <!-- 5. List Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <!-- Loading Skeleton -->
      <view class="voice-list skeleton-list" v-if="isLoading">
        <view v-for="i in 3" :key="i" class="voice-card skeleton-card">
          <view class="skeleton-item header-skel"></view>
          <view class="skeleton-item content-skel"></view>
          <view class="skeleton-item footer-skel"></view>
        </view>
      </view>

      <view class="voice-list animate-fade-in" v-else-if="filteredVoices.length > 0">
        <view 
          v-for="(item, index) in filteredVoices" 
          :key="item.id"
          class="voice-card animate-slide-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <view class="card-header">
            <view class="type-tag" :style="{ color: getTypeColor(item.type), backgroundColor: getTypeColor(item.type) + '15' }">
              {{ item.type }}
            </view>
            <text class="voice-title">{{ item.title }}</text>
            <view class="status-tag" :style="{ color: getStatusColor(item.status) }">
              <view class="status-dot" :style="{ backgroundColor: getStatusColor(item.status) }"></view>
              {{ item.status }}
            </view>
          </view>
          
          <view class="card-content">
            <text class="content-text">{{ item.content }}</text>
          </view>
          
          <view class="card-footer">
            <view class="time-info">
              <t-icon name="time" size="24rpx" color="#94A3B8" />
              <text>{{ item.time }}</text>
            </view>
          </view>

          <!-- Reply Section -->
          <view class="reply-box" v-if="item.reply">
            <view class="reply-header">
              <text class="reply-label">物业回复：</text>
              <text class="reply-time">{{ item.replyTime }}</text>
            </view>
            <text class="reply-content">{{ item.reply }}</text>
            <view class="rating-box" v-if="item.rating">
              <text>评分：</text>
              <view class="stars">
                <t-icon 
                  v-for="i in 5" 
                  :key="i" 
                  name="star-filled" 
                  size="24rpx" 
                  :color="i <= item.rating ? '#F59E0B' : '#E2E8F0'" 
                />
              </view>
            </view>
          </view>
        </view>
        <view class="list-end">
          <text>没有更多了</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <view class="empty-illust">
          <view class="building-base">
            <view class="window"></view>
            <view class="window"></view>
            <view class="window"></view>
          </view>
          <view class="cloud c1"></view>
          <view class="cloud c2"></view>
        </view>
        <text class="empty-text">暂无数据</text>
      </view>
    </scroll-view>

    <app-tab-bar activePath="pages/index/index" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const searchKey = ref('');
const activeTab = ref(0);
const tabs = ['全部', '处理中', '已办结', '已评价'];
const isLoading = ref(true);

onMounted(() => {
  // 模拟数据加载
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

// 模拟数据
const mockVoices = ref([
  {
    id: 1,
    title: '地下车库感应灯不亮',
    type: '报修',
    content: '1号楼负一层电梯口出来的感应灯坏了，晚上回来黑漆漆的很不方便。',
    status: '处理中',
    time: '2026-02-08 14:30',
    images: []
  },
  {
    id: 2,
    title: '建议增加儿童游乐场遮阳设施',
    type: '建议',
    content: '现在的儿童游乐场下午太阳太晒了，建议加个遮阳棚，方便孩子们玩耍。',
    status: '已办结',
    time: '2026-02-05 10:15',
    reply: '感谢您的建议，物业已将其列入年度改造计划，预计下月开始动工。',
    replyTime: '2026-02-06 09:00',
    images: []
  },
  {
    id: 3,
    title: '绿化带杂草清理不及时',
    type: '投诉',
    content: '3号楼前面的绿化带杂草长得比花都高了，影响美观，希望尽快处理。',
    status: '已评价',
    time: '2026-02-01 16:20',
    reply: '已安排绿化人员完成清理工作。',
    replyTime: '2026-02-02 11:30',
    rating: 5,
    images: []
  },
  {
    id: 4,
    title: '电梯运行噪音大',
    type: '报修',
    content: '2号楼东梯运行到15楼以上时有明显的异响，希望能检查一下。',
    status: '处理中',
    time: '2026-02-07 09:45',
    images: []
  }
]);

// 过滤后的数据
const filteredVoices = computed(() => {
  let list = mockVoices.value;
  
  // 标签过滤
  if (activeTab.value !== 0) {
    const targetStatus = tabs[activeTab.value];
    list = list.filter(item => item.status === targetStatus);
  }
  
  // 搜索过滤
  if (searchKey.value) {
    const key = searchKey.value.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(key) || 
      item.content.toLowerCase().includes(key)
    );
  }
  
  return list;
});

const getStatusColor = (status: string) => {
  switch (status) {
    case '处理中': return '#3B82F6';
    case '已办结': return '#10B981';
    case '已评价': return '#64748B';
    default: return '#94A3B8';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case '报修': return '#F59E0B';
    case '建议': return '#3B82F6';
    case '投诉': return '#EF4444';
    default: return '#64748B';
  }
};

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    uni.reLaunch({ url: '/pages/index/index' });
  }
};

const handleAddVoice = () => {
  uni.navigateTo({
    url: '/pages/voice/voice-form'
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
    justify-content: space-between;
    margin-top: 0;
    position: relative;
    z-index: 5;
    margin-left: -20rpx;

    .back-btn {
      padding: 10rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .header-content {
    margin-top: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    z-index: 5;

    .title-group {
      .main-title {
        font-size: 40rpx;
        font-weight: 900;
        color: #fff;
        text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15), 0 0 12rpx rgba(255, 255, 255, 0.3);
        display: block;
        margin-bottom: 4rpx;
        letter-spacing: 2rpx;
      }

      .sub-title {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.85);
        display: block;
        max-width: 500rpx;
        line-height: 1.4;
        letter-spacing: 2rpx;
      }
    }

    .header-illust {
      position: relative;
      width: 240rpx;
      height: 180rpx;
      margin-top: -20rpx;

      .illust-glass-card {
        position: absolute;
        background: rgba(255, 255, 255, 0.2);
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        border-radius: 20rpx;
        backdrop-filter: blur(8rpx);
        box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

        &.card-back {
          width: 100rpx;
          height: 100rpx;
          right: 30rpx;
          top: 0;
          transform: rotate(15deg);
          opacity: 0.6;
        }

        &.card-front {
          width: 115rpx;
          height: 125rpx;
          right: 10rpx;
          top: 20rpx;
          transform: rotate(-5deg);
          z-index: 2;
          background: rgba(255, 255, 255, 0.25);
          padding: 18rpx 14rpx;
          display: flex;
          flex-direction: column;
          gap: 10rpx;

          .doc-line {
            height: 4rpx;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 2rpx;
            width: 100%;

            &.short {
              width: 60%;
            }
          }
        }
      }

      .illust-badge {
        position: absolute;
        left: 3.5rem;
        top: 40rpx;
        background: #fff;
        border-radius: 50%;
        padding: 4rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        z-index: 3;
        animation: float 3s ease-in-out infinite;
      }
    }
  }

  .header-wave {
    display: none; // 移除波浪线以保持与 fund.vue 风格统一
  }
}

.action-card-container {
  margin: -50rpx 40rpx 0;
  position: relative;
  z-index: 10;

  .action-card {
    background: #fff;
    border-radius: 20rpx;
    height: 110rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.12);
    border: 1rpx solid rgba(59, 130, 246, 0.05);

    &:active {
      transform: scale(0.98);
      background: #F1F5F9;
    }

    .action-text {
      font-size: 32rpx;
      font-weight: 700;
      color: #1E3A8A;
      letter-spacing: 2rpx;
    }

    .action-icon-box {
      width: 48rpx;
      height: 48rpx;
      background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.3);

      .plus-icon {
        color: #fff;
        font-size: 36rpx;
        font-weight: bold;
        line-height: 1;
      }
    }
  }
}

.search-section {
  padding: 40rpx;

  .search-input-box {
    background: #fff;
    border-radius: 40rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    gap: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

    input {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
    }

    .search-btn {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;
      padding-left: 20rpx;
      border-left: 1rpx solid #E2E8F0;
    }
  }
}

.tabs-bar {
  display: flex;
  background: #fff;
  padding: 0 40rpx;
  border-bottom: 1rpx solid #F1F5F9;

  .tab-item {
    flex: 1;
    height: 88rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s;

    text {
      font-size: 28rpx;
      color: #64748B;
    }

    &.active {
      text {
        color: #3B82F6;
        font-weight: 600;
      }
    }

    .active-line {
      position: absolute;
      bottom: 0;
      width: 48rpx;
      height: 6rpx;
      background: #3B82F6;
      border-radius: 3rpx;
    }
  }
}

.content-scroll {
  flex: 1;
  height: 0;

  .voice-list {
    padding: 30rpx 40rpx;

    .voice-card {
      background: #fff;
      border-radius: 24rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

      .card-header {
        display: flex;
        align-items: center;
        gap: 16rpx;
        margin-bottom: 20rpx;

        .type-tag {
          font-size: 20rpx;
          padding: 4rpx 12rpx;
          border-radius: 8rpx;
          font-weight: 600;
        }

        .voice-title {
          flex: 1;
          font-size: 30rpx;
          font-weight: 700;
          color: #1E293B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-tag {
          font-size: 22rpx;
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-weight: 500;

          .status-dot {
            width: 10rpx;
            height: 10rpx;
            border-radius: 50%;
          }
        }
      }

      .card-content {
        margin-bottom: 24rpx;

        .content-text {
          font-size: 26rpx;
          color: #64748B;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20rpx;
        border-top: 1rpx solid #F1F5F9;

        .time-info {
          display: flex;
          align-items: center;
          gap: 8rpx;
          font-size: 22rpx;
          color: #94A3B8;
        }
      }

      .reply-box {
        margin-top: 24rpx;
        background: #F8FAFC;
        border-radius: 16rpx;
        padding: 20rpx;

        .reply-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12rpx;

          .reply-label {
            font-size: 24rpx;
            font-weight: 600;
            color: #1E293B;
          }

          .reply-time {
            font-size: 20rpx;
            color: #94A3B8;
          }
        }

        .reply-content {
          font-size: 24rpx;
          color: #475569;
          line-height: 1.5;
        }

        .rating-box {
          margin-top: 16rpx;
          display: flex;
          align-items: center;
          gap: 12rpx;
          font-size: 22rpx;
          color: #64748B;

          .stars {
            display: flex;
            gap: 4rpx;
          }
        }
      }
    }

    .list-end {
      text-align: center;
      padding: 40rpx 0;
      font-size: 24rpx;
      color: #CBD5E1;
    }
  }

  .empty-state {
    padding-top: 120rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-illust {
      position: relative;
      width: 320rpx;
      height: 240rpx;
      margin-bottom: 40rpx;

      .building-base {
        position: absolute;
        bottom: 20rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 140rpx;
        height: 180rpx;
        background: #DBEAFE;
        border-radius: 12rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16rpx;
        padding-top: 24rpx;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -40rpx;
          width: 60rpx;
          height: 120rpx;
          background: #BFDBFE;
          border-radius: 8rpx;
        }

        .window {
          width: 60rpx;
          height: 16rpx;
          background: #fff;
          border-radius: 4rpx;
        }
      }

      .cloud {
        position: absolute;
        background: #EFF6FF;
        border-radius: 40rpx;

        &.c1 {
          width: 120rpx;
          height: 40rpx;
          top: 20rpx;
          left: 0;
          animation: float 4s ease-in-out infinite;
        }

        &.c2 {
          width: 80rpx;
          height: 30rpx;
          top: 80rpx;
          right: 0;
          animation: float 3s ease-in-out infinite reverse;
        }
      }
    }

    .empty-text {
      font-size: 28rpx;
      color: #94A3B8;
    }
  }
}

// Animations & Skeleton
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skeleton-list {
  .skeleton-card {
    background: #fff;
    overflow: hidden;
    position: relative;

    .skeleton-item {
      background: #F1F5F9;
      border-radius: 4rpx;
      position: relative;
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        animation: skeleton-loading 1.5s infinite;
      }
    }

    .header-skel {
      width: 60%;
      height: 36rpx;
      margin-bottom: 24rpx;
    }

    .content-skel {
      width: 100%;
      height: 100rpx;
      margin-bottom: 24rpx;
    }

    .footer-skel {
      width: 40%;
      height: 28rpx;
    }
  }
}

@keyframes skeleton-loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}
</style>
