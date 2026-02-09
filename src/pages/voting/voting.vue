
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
          <text class="main-title">电子投票</text>
          <text class="sub-title">公开透明 依法依规 共同建设美好家园</text>
        </view>
        
        <!-- Header Illustration -->
        <view class="header-illust">
          <view class="illust-glass-card card-back"></view>
          <view class="illust-glass-card card-front">
            <view class="vote-box">
              <view class="paper"></view>
            </view>
          </view>
          <view class="illust-badge">
            <t-icon name="check-circle-filled" size="28rpx" color="#10B981" />
          </view>
        </view>
      </view>
    </view>

    <!-- 2. Search Section -->
    <view class="search-section">
      <view class="search-container">
        <t-icon name="search" size="36rpx" color="#94A3B8" />
        <input 
          type="text" 
          v-model="searchKey" 
          placeholder="搜索小区名称" 
          placeholder-style="color: #94A3B8"
        />
        <text class="search-btn">搜索</text>
      </view>
    </view>

    <!-- 2.5 Action Buttons -->
    <view class="action-buttons-section">
      <view class="action-btn-item primary" @click="handleVote">
        <t-icon name="assignment" size="40rpx" color="#fff" />
        <text>业主投票</text>
      </view>
      <view class="action-btn-item secondary" @click="handleResults">
        <t-icon name="chart-line-data" size="40rpx" color="#3B82F6" />
        <text>投票结果</text>
      </view>
    </view>

    <!-- 2.6 Voting Rules Reminder -->
    <view class="voting-rules-container">
      <view class="rules-card" :class="{ 'is-expanded': isRulesExpanded }">
        <view class="rules-header" @click="toggleRules">
          <view class="header-left">
            <t-icon name="info-circle-filled" size="32rpx" color="#3B82F6" />
            <text class="rules-title">民法典表决规则指引</text>
            <t-icon 
              :name="isRulesExpanded ? 'chevron-up' : 'chevron-down'" 
              size="32rpx" 
              color="#3B82F6" 
              class="toggle-icon"
            />
          </view>
          <view class="header-right">依据《民法典》第278条</view>
        </view>
        
        <view class="rules-list-wrapper" v-show="isRulesExpanded">
          <view class="rules-list">
            <!-- 一般重大事项 -->
            <view class="rule-card-item normal">
              <view class="item-top">
                <text class="item-tag">一般重大事项</text>
                <view class="item-threshold">
                  <text class="threshold-label">表决门槛：</text>
                  <text class="threshold-value">双过半</text>
                </view>
              </view>
              <view class="item-content">
                物业费调整、选聘/解聘物业、使用维修资金、制定管理规约等。
              </view>
              <view class="item-footer">
                <t-icon name="check-circle" size="24rpx" color="#3B82F6" />
                <text>参与业主面积过半 + 人数过半同意</text>
              </view>
            </view>

            <!-- 特别重大事项 -->
            <view class="rule-card-item special">
              <view class="item-top">
                <text class="item-tag">特别重大事项</text>
                <view class="item-threshold">
                  <text class="threshold-label">表决门槛：</text>
                  <text class="threshold-value">双3/4</text>
                </view>
              </view>
              <view class="item-content">
                ①筹集维修资金；②改建、重建建筑物；③改变共有部分用途 or 经营。
              </view>
              <view class="item-footer">
                <t-icon name="check-circle" size="24rpx" color="#EF4444" />
                <text>参与业主面积3/4以上 + 人数3/4以上同意</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. Tabs Section -->
    <view class="tabs-bar">
      <view class="main-tabs-container">
        <!-- Sliding Background Slider -->
        <view 
          class="tabs-slider" 
          :style="{ 
            width: (100 / mainTabs.length) + '%',
            transform: 'translateX(' + (activeMainTab * 100) + '%)'
          }"
        ></view>
        
        <view 
          v-for="(tab, index) in mainTabs" 
          :key="index"
          class="main-tab-item"
          :class="{ active: activeMainTab === index }"
          @click="handleMainTabChange(index)"
        >
          <text class="tab-label">{{ tab.label }}</text>
        </view>
      </view>

      <!-- Sub Tabs (Only shown for General and Special) -->
      <view class="sub-tabs-container" v-if="currentSubTabs.length > 0">
        <scroll-view 
          scroll-x 
          class="sub-tabs-scroll" 
          show-scrollbar="false"
        >
          <view 
            v-for="(sub, index) in currentSubTabs" 
            :key="index"
            class="sub-tab-item"
            :class="{ active: activeSubTab === index }"
            @click="activeSubTab = index"
          >
            <text>{{ sub }}</text>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 5. List Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <!-- Loading Skeleton -->
      <view class="vote-list skeleton-list" v-if="isLoading">
        <view v-for="i in 3" :key="i" class="skeleton-card">
          <view class="skeleton-item header-skel"></view>
          <view class="skeleton-item content-skel"></view>
          <view class="skeleton-item footer-skel"></view>
        </view>
      </view>

      <view class="vote-list animate-fade-in" v-else-if="displayVotes.length > 0">
        <vote-card 
          v-for="(item, index) in displayVotes" 
          :key="item.id"
          :vote="item"
          class="animate-slide-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
          @click="item.statusType === 'ongoing' ? handleVote(item) : handleResults(item)"
        />
        
        <!-- More Button -->
        <view class="more-btn-wrapper" v-if="filteredVotes.length > 5" @click="handleShowMore">
          <view class="more-btn">
            <text>查看更多投票项目</text>
            <t-icon name="chevron-right" size="32rpx" color="#3B82F6" />
          </view>
        </view>

        <view class="list-end" v-else>
          <text>没有更多了</text>
        </view>
      </view>

      <!-- Empty State -->
      <view class="empty-state" v-else>
        <t-icon name="info-circle" size="64rpx" color="#CBD5E1" />
        <text class="empty-text">暂无相关投票</text>
      </view>
    </scroll-view>

    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import VoteCard from '@/components/business/VoteCard.vue';

const searchKey = ref('');
const activeMainTab = ref(0);
const activeSubTab = ref(0);
const statusFilter = ref('all'); // all, ongoing, ended
const isRulesExpanded = ref(false);
const isLoading = ref(true);

onMounted(() => {
  // 模拟加载
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

onLoad((options) => {
  if (options && options.status) {
    statusFilter.value = options.status;
  }
});

const toggleRules = () => {
  isRulesExpanded.value = !isRulesExpanded.value;
};

const mainTabs = [
  { label: '全部', value: 'all', subTabs: [] },
  { 
    label: '一般重大事项', 
    value: 'normal', 
    subTabs: ['全部', '物业费调整', '物业选聘', '使用维修资金', '管理规约', '业委会选举'] 
  },
  { 
    label: '特别重大事项', 
    value: 'special', 
    subTabs: ['全部', '筹集维修资金', '改建重建', '共有部分经营'] 
  }
];

const currentSubTabs = computed(() => mainTabs[activeMainTab.value]?.subTabs || []);

const handleMainTabChange = (index: number) => {
  activeMainTab.value = index;
  activeSubTab.value = 0;
  statusFilter.value = 'all';
};

const goBack = () => {
  uni.navigateBack();
};

const handleVote = (item?: any) => {
  if (item && item.id) {
    uni.navigateTo({
      url: `/pages/voting/reminder?id=${item.id}`
    });
  } else {
    uni.navigateTo({
      url: '/pages/voting/vote-topics?tab=1'
    });
  }
};

const handleResults = (item?: any) => {
  if (item && item.id) {
    uni.navigateTo({
      url: `/pages/voting/vote-result?id=${item.id}`
    });
  } else {
    uni.navigateTo({
      url: '/pages/voting/vote-topics?tab=2'
    });
  }
};

// 模拟数据
const mockVotes = ref([
  {
    id: 1,
    title: '阳光水岸小区第三届业主委员会选举',
    startTime: '2026-01-15 00:00',
    endTime: '01-25 23:59',
    statusText: '已结束',
    statusType: 'ended',
    mainType: 'normal',
    type: '业委会选举',
    participants: 450
  },
  {
    id: 2,
    title: '阳光水岸2026年度物业服务续聘表决',
    startTime: '2025-12-01 00:00',
    endTime: '02-28 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '物业选聘',
    participants: 128
  },
  {
    id: 3,
    title: '阳光水岸1-1单元电梯更新改造维修资金使用投票',
    startTime: '2026-02-01 00:00',
    endTime: '02-20 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '使用维修资金',
    participants: 45
  },
  {
    id: 4,
    title: '阳光水岸2026年公共收益分配方案投票',
    startTime: '2026-01-10 00:00',
    endTime: '01-30 23:59',
    statusText: '已结束',
    statusType: 'ended',
    mainType: 'special',
    type: '共有部分经营',
    participants: 560
  },
  {
    id: 5,
    title: '阳光水岸关于筹集二期专项维修资金的表决',
    startTime: '2026-02-05 00:00',
    endTime: '02-25 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'special',
    type: '筹集维修资金',
    participants: 89
  },
  {
    id: 6,
    title: '关于阳光水岸物业费调整（由1.8元/㎡调至2.1元/㎡）的投票',
    startTime: '2026-02-01 00:00',
    endTime: '02-28 23:59',
    statusText: '进行中',
    statusType: 'ongoing',
    mainType: 'normal',
    type: '物业费调整',
    participants: 234
  }
]);

const filteredVotes = computed(() => {
  let list = mockVotes.value;
  
  // 1. 状态过滤 (进行中/已结束)
  if (statusFilter.value !== 'all') {
    list = list.filter(item => item.statusType === statusFilter.value);
  }

  // 2. 主类别过滤
  const activeMain = mainTabs[activeMainTab.value];
  if (activeMain && activeMain.value !== 'all') {
    list = list.filter(item => item.mainType === activeMain.value);
    
    // 3. 子类别过滤
    const subTabs = currentSubTabs.value;
    const subType = subTabs[activeSubTab.value];
    if (subType && subType !== '全部') {
      list = list.filter(item => item.type === subType);
    }
  }
  
  // 4. 搜索过滤
  if (searchKey.value) {
    const key = searchKey.value.toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(key)
    );
  }
  
  return list;
});

const displayVotes = computed(() => {
  return filteredVotes.value.slice(0, 5);
});

const handleShowMore = () => {
  uni.navigateTo({
    url: '/pages/voting/vote-topics?tab=0'
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
    position: relative;
    z-index: 5;
    height: 88rpx;

    .back-btn {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
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
          width: 120rpx;
          height: 130rpx;
          right: 10rpx;
          top: 20rpx;
          transform: rotate(-5deg);
          z-index: 2;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;

          .vote-box {
            width: 70rpx;
            height: 70rpx;
            border: 4rpx solid rgba(255, 255, 255, 0.5);
            border-radius: 8rpx;
            position: relative;

            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 40rpx;
              height: 6rpx;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 3rpx;
            }

            .paper {
              position: absolute;
              top: -10rpx;
              left: 50%;
              transform: translateX(-50%);
              width: 30rpx;
              height: 40rpx;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 2rpx;
              animation: drop 2s ease-in-out infinite;
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
}

.search-section {
  padding: 30rpx @page-padding;
  margin-top: -1.5rem;
  position: relative;
  z-index: 10;

  .search-container {
    background: #fff;
    border-radius: 44rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);

    input {
      flex: 1;
      font-size: 28rpx;
      color: #1E293B;
      margin-left: 12rpx;
    }

    .search-btn {
      font-size: 28rpx;
      color: #3B82F6;
      font-weight: 600;
      padding-left: 20rpx;
      border-left: 1rpx solid #F1F5F9;
    }
  }
}

.action-buttons-section {
  padding: 0 @page-padding 30rpx;
  display: flex;
  gap: 20rpx;
  position: relative;
  z-index: 5;

  .action-btn-item {
    flex: 1;
    height: 100rpx;
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    font-size: 30rpx;
    font-weight: 600;
    transition: all 0.2s;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    &.primary {
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
      color: #fff;
      box-shadow: 0 8rpx 20rpx rgba(59, 130, 246, 0.2);
    }

    &.secondary {
      background: #fff;
      color: #3B82F6;
      border: 1rpx solid #E0E7FF;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);
    }
  }
}

.voting-rules-container {
  padding: 0 @page-padding 30rpx;

  .rules-card {
    background: #EFF6FF;
    border-radius: 20rpx;
    padding: 24rpx;
    border: 1rpx solid rgba(59, 130, 246, 0.1);

    .rules-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0rpx; // 默认收起时没有底部间距
      transition: margin 0.3s;

      .header-left {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .rules-title {
          font-size: 28rpx;
          font-weight: 700;
          color: #1E40AF;
        }

        .toggle-icon {
          transition: transform 0.3s;
        }
      }

      .header-right {
        font-size: 22rpx;
        color: #60A5FA;
        background: rgba(59, 130, 246, 0.1);
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
      }
    }

    &.is-expanded {
      .rules-header {
        margin-bottom: 24rpx;
      }
    }

    .rules-list {
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .rule-card-item {
        background: #fff;
        border-radius: 16rpx;
        padding: 20rpx;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.05);

        .item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16rpx;

          .item-tag {
            font-size: 22rpx;
            font-weight: 700;
            padding: 4rpx 16rpx;
            border-radius: 8rpx;
          }

          .item-threshold {
            display: flex;
            align-items: center;
            gap: 4rpx;

            .threshold-label {
              font-size: 22rpx;
              color: #64748B;
            }

            .threshold-value {
              font-size: 24rpx;
              font-weight: 700;
              color: #1E293B;
            }
          }
        }

        &.normal {
          border-left: 8rpx solid #3B82F6;
          .item-tag {
            background: #DBEAFE;
            color: #2563EB;
          }
          .threshold-value {
            color: #2563EB;
          }
        }

        &.special {
          border-left: 8rpx solid #EF4444;
          .item-tag {
            background: #FEE2E2;
            color: #EF4444;
          }
          .threshold-value {
            color: #EF4444;
          }
        }

        .item-content {
          font-size: 24rpx;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 16rpx;
          padding: 0 4rpx;
          word-break: break-all;
          text-align: justify;
        }

        .item-footer {
          display: flex;
          align-items: flex-start;
          gap: 12rpx;
          padding-top: 16rpx;
          border-top: 1rpx dashed #E2E8F0;

          .t-icon {
            margin-top: 4rpx;
          }

          text {
            font-size: 22rpx;
            color: #1E293B;
            font-weight: 500;
            line-height: 1.4;
            flex: 1;
            word-break: break-all;
          }
        }
      }
    }
  }
}

.tabs-bar {
    background: #F8FAFC;
    padding: 20rpx @page-padding 30rpx;
    z-index: 20;

    .main-tabs-container {
      display: flex;
      background: #F1F5F9;
      border-radius: 24rpx;
      padding: 8rpx;
      position: relative;
      margin-bottom: 24rpx;
      border: 1rpx solid rgba(0, 0, 0, 0.02);

      .tabs-slider {
        position: absolute;
        height: calc(100% - 16rpx);
        background: #FFFFFF;
        border-radius: 18rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
      }

      .main-tab-item {
        flex: 1;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        transition: all 0.3s;

        .tab-label {
          font-size: 26rpx;
          color: #64748B;
          font-weight: 500;
          transition: all 0.3s;
        }

        &.active {
          .tab-label {
            color: #3B82F6;
            font-weight: 700;
          }
        }
      }
    }

    .sub-tabs-container {
      .sub-tabs-scroll {
        white-space: nowrap;
        width: 100%;

        // 隐藏滚动条
        ::-webkit-scrollbar {
          display: none;
          width: 0 !important;
          height: 0 !important;
          -webkit-appearance: none;
          background: transparent;
        }

        .sub-tab-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52rpx;
          padding: 0 24rpx;
          border-radius: 26rpx;
          background: #FFFFFF;
          margin-right: 16rpx;
          border: 1rpx solid #E2E8F0;
          transition: all 0.2s;

          text {
            font-size: 22rpx;
            color: #64748B;
            font-weight: 500;
          }

          &.active {
            background: #EFF6FF;
            border-color: #3B82F6;
            transform: scale(1.02);

            text {
              color: #3B82F6;
              font-weight: 600;
            }
          }

          &:active {
            transform: scale(0.95);
          }
        }
      }
    }
  }

  @keyframes slide-in {
    from { transform: scaleX(0); opacity: 0; }
    to { transform: scaleX(1); opacity: 1; }
  }

.content-scroll {
  flex: 1;
  height: 0;

  .vote-list {
    padding: 10rpx @page-padding 40rpx;

    .more-btn-wrapper {
      padding: 20rpx 0 40rpx;
      display: flex;
      justify-content: center;

      .more-btn {
        display: flex;
        align-items: center;
        gap: 8rpx;
        padding: 16rpx 40rpx;
        background: #FFFFFF;
        border: 2rpx solid #E0E7FF;
        border-radius: 40rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.03);

        text {
          font-size: 26rpx;
          color: #3B82F6;
          font-weight: 600;
        }

        &:active {
          background: #F8FAFC;
          transform: scale(0.98);
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
    gap: 20rpx;

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
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
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
      width: 40%;
      height: 32rpx;
      margin-bottom: 24rpx;
    }

    .content-skel {
      width: 100%;
      height: 40rpx;
      margin-bottom: 24rpx;
    }

    .footer-skel {
      width: 60%;
      height: 24rpx;
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

@keyframes drop {
  0% { transform: translateX(-50%) translateY(-20rpx); opacity: 0; }
  50% { transform: translateX(-50%) translateY(0); opacity: 1; }
  100% { transform: translateX(-50%) translateY(20rpx); opacity: 0; }
}
</style>
