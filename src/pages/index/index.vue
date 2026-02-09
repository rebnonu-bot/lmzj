<template>
  <view class="page-container">
    <!-- 1. Header with strong gradient -->
    <view class="header">
      <view class="header-content">
        <view class="app-title-row">
          <text class="app-title">赣州市智慧物业服务平台</text>
        </view>
        <view class="slogan-row">
          <text class="slogan-text">{{ userInfo.slogan }}</text>
        </view>
        
        <view class="user-row">
          <view class="greeting-box">
            <text class="greeting-text">您好，{{ userInfo.name }}</text>
            <view class="switch-house" @click="handleSwitchHouse">
              <text>切换房屋</text>
              <t-icon name="refresh" size="20rpx" color="#fff" />
            </view>
          </view>
        </view>

        <view class="location-row">
          <t-icon name="location" size="28rpx" color="#fff" />
          <text class="location-text">{{ userInfo.address }}</text>
        </view>
      </view>

      <!-- Decorative background elements -->
      <view class="decor-circle"></view>
      
      <!-- 3D Building Illustration -->
      <view class="header-illustration">
        <view class="building-group">
          <view class="building b1">
            <view class="window"></view>
            <view class="window"></view>
          </view>
          <view class="building b2">
            <view class="top-face"></view>
            <view class="window"></view>
            <view class="window"></view>
            <view class="window"></view>
          </view>
          <view class="building b3"></view>
        </view>
      </view>
    </view>

    <!-- 2. Notification Bar (Glass effect) -->
    <view class="notice-bar">
      <view class="notice-content">
        <t-icon name="notification" size="36rpx" color="#FB923C" class="notice-icon" />
        <swiper class="notice-swiper" :vertical="true" :autoplay="notices.length > 1" :circular="true" :interval="3000" :duration="300" :indicator-dots="false">
          <swiper-item v-for="(msg, idx) in notices" :key="idx">
            <text class="notice-text">{{ msg }}</text>
          </swiper-item>
        </swiper>
      </view>
    </view>

    <!-- 3. 小区资金 Section -->
    <view class="section-container">
      <view class="section-header">
        <view class="header-bar"></view>
        <text class="header-title">小区资金</text>
      </view>
      <view class="funds-grid">
          <view class="fund-card" v-for="(card, index) in fundCards" :key="index" @click="handleFundClick(card)">
            <!-- Top Right Action Badge -->
             <view class="fund-action-badge" :style="{ backgroundColor: card.type === 'balance' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(14, 165, 233, 0.15)' }">
               <t-icon name="chevron-right" size="16rpx" :color="card.type === 'balance' ? '#3B82F6' : '#0EA5E9'" />
             </view>
            <view class="fund-decor-circle"></view>
            <view class="fund-bg-illust">
              <view class="illust-main" v-if="card.type === 'balance'">
                <view class="list-card">
                  <view class="check-item"></view>
                  <view class="check-item"></view>
                </view>
                <view class="cloud c1"></view>
                <view class="cloud c2"></view>
              </view>
              <view class="illust-main" v-else>
                <view class="chart-box">
                  <view class="bar b1"></view>
                  <view class="bar b2"></view>
                  <view class="bar b3"></view>
                </view>
                <view class="cloud c1"></view>
                <view class="cloud c3"></view>
              </view>
            </view>
            <view class="fund-content">
              <!-- Top Section: Title and Amount tightly grouped -->
              <view class="fund-main-info">
                <text class="fund-title">{{ card.title }}</text>
                
                <view class="fund-value-box">
              <template v-if="card.type === 'balance' || card.type === 'fund'">
                <view class="fund-amount-wrapper">
                  <text class="fund-amount">{{ card.displayAmount }}</text>
                  <text class="fund-unit">{{ card.unit }}</text>
                </view>
              </template>
              <template v-else>
                <text class="fund-value-small">{{ card.value }}</text>
              </template>
            </view>
              </view>

              <!-- Bottom: Hint Text -->
              <view class="fund-footer">
                <rich-text class="fund-hint" v-if="card.hint" :nodes="card.hint"></rich-text>
              </view>
            </view>
        </view>
      </view>
    </view>

    <!-- 4. Feature Cards Section -->
    <view class="section-container">
      <view class="feature-grid">
        <!-- Left Card: 业主有话说 -->
        <view class="feature-card large voice" @click="handleVoiceClick">
          <view class="card-content">
            <text class="card-title">业主有话说</text>
            <text class="card-subtitle">业主诉求高效处置</text>
            <view class="card-btn">
              <text>进入</text>
            </view>
          </view>
          <view class="card-illustration">
            <view class="illust-main">
              <view class="list-card">
                <view class="check-item"></view>
                <view class="check-item"></view>
              </view>
              <view class="cloud c1"></view>
              <view class="cloud c2"></view>
            </view>
          </view>
          <view class="card-wave"></view>
        </view>

        <!-- Right Column -->
        <view class="feature-col">
          <!-- Top Right: 信息公开 -->
          <view class="feature-card small notice" @click="handleNoticeClick">
            <view class="card-content">
              <text class="card-title">信息公开</text>
              <text class="card-subtitle">信息更透明</text>
            </view>
            <view class="card-illustration">
              <view class="illust-main">
                <view class="notice-box">
                  <view class="notice-line"></view>
                  <view class="notice-line"></view>
                  <view class="notice-dot"></view>
                </view>
                <view class="cloud c1"></view>
              </view>
            </view>
          </view>

          <!-- Bottom Right: 电子投票 -->
          <view class="feature-card small voting" @click="handleVotingClick">
            <view class="card-content">
              <text class="card-title">电子投票</text>
              <text class="card-subtitle">共同决定事项</text>
            </view>
            <view class="card-illustration">
              <view class="illust-main">
                <view class="vote-box">
                  <view class="vote-slot"></view>
                  <view class="vote-card"></view>
                </view>
                <view class="cloud c1"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 5. 业主服务 Section -->
    <view class="section-container">
      <view class="services-card">
        <view class="services-decor"></view>
        <view class="section-header">
          <view class="header-bar"></view>
          <text class="header-title">业主服务</text>
        </view>
        <view class="services-content">
          <swiper class="services-swiper" :indicator-dots="menuPages.length > 1" indicator-active-color="#3B82F6" indicator-color="rgba(59, 130, 246, 0.2)">
            <swiper-item v-for="(page, pageIndex) in menuPages" :key="pageIndex">
              <view class="services-grid">
                <view class="service-item" v-for="(item, index) in page" :key="index" @click="handleMenuClick(item)">
                  <view class="service-icon">
                    <t-icon :name="item.icon" size="52rpx" :color="item.color" />
                  </view>
                  <text class="service-label">{{ item.label }}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>

    <!-- 6. 快捷服务 Section -->
    <view class="section-container">
      <view class="quick-services-card">
        <view class="section-header">
          <view class="header-bar"></view>
          <text class="header-title">快捷服务</text>
        </view>
        <view class="quick-services-grid">
          <view class="quick-service-item" v-for="(item, index) in quickServices" :key="index" @click="handleMenuClick(item)">
            <view class="quick-service-icon-box" :style="{ background: item.color + '10' }">
              <t-icon :name="item.icon" size="48rpx" :color="item.color" />
            </view>
            <view class="quick-service-info">
              <text class="quick-service-label">{{ item.label }}</text>
              <text class="quick-service-desc" v-if="item.desc">{{ item.desc }}</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" class="quick-arrow" />
          </view>
        </view>
      </view>
    </view>

    <!-- Footer Section -->
    <app-footer />

    <!-- App Tab Bar -->
    <app-tab-bar activePath="pages/index/index" />

    <!-- 切换房屋选择器 (Dialog形式) -->
    <t-dialog
      v-model:visible="showHousePicker"
      title="选择房屋"
      :confirm-btn="null"
      :cancel-btn="null"
    >
      <template #content>
        <view class="house-list">
          <view 
            v-for="(item, index) in houseOptions" 
            :key="index"
            class="house-item"
            :class="{ active: userInfo.address === item.value }"
            @click="onHouseSelect(item)"
          >
            <view class="house-item-content">
              <t-icon :name="userInfo.address === item.value ? 'check-circle-filled' : 'circle'" 
                      :color="userInfo.address === item.value ? '#3B82F6' : '#CBD5E1'" 
                      size="40rpx" />
              <text class="house-label">{{ item.label }}</text>
            </view>
          </view>
        </view>
      </template>
    </t-dialog>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useNumberAnimation } from '@/composables/useNumberAnimation';
import { useFundStore } from '@/composables/useFundStore';

const { totalBalanceWan, setCommunity } = useFundStore();
const { animateNumber } = useNumberAnimation();

onShow(() => {
  uni.hideTabBar().catch(() => {});
  // 每次显示时根据当前选择的房屋更新社区数据
  setCommunity(userInfo.value.address);
});

const userInfo = ref({
  name: '刘泽辉',
  slogan: '共建和谐小区,共享温馨生活',
  address: uni.getStorageSync('selectedHouse') || '阳光水岸一期 1-1-802'
});

const houseOptions = [
  { label: '阳光水岸一期 1-1-802', value: '阳光水岸一期 1-1-802', community: '阳光水岸' },
  { label: '阳光水岸二期 5-1-1202', value: '阳光水岸二期 5-1-1202', community: '阳光水岸' },
  { label: '亚运城天成一期 2-1-1503', value: '亚运城天成一期 2-1-1503', community: '亚运城天成' },
  { label: '翡翠江景 3-2-1501', value: '翡翠江景 3-2-1501', community: '翡翠江景' }
];

const communityFundsMap: Record<string, { main: string, public: string, community: string }> = {
  '阳光水岸': { main: '233.37', public: '12.85', community: '5.56' },
  '亚运城天成': { main: '156.45', public: '8.20', community: '3.45' },
  '翡翠江景': { main: '456.12', public: '25.60', community: '8.92' }
};

const showHousePicker = ref(false);

const handleSwitchHouse = () => {
  showHousePicker.value = true;
};

const onHouseSelect = (item: any) => {
  const selectedAddress = item.label || item.value;
  userInfo.value.address = selectedAddress;
  uni.setStorageSync('selectedHouse', selectedAddress);
  showHousePicker.value = false;
  
  // 更新社区数据
  setCommunity(selectedAddress);
  
  // 更新资金数据
  const community = item.community || (selectedAddress.includes('阳光水岸') ? '阳光水岸' : '翡翠江景');
  const funds = communityFundsMap[community];
  if (funds && fundCards.value[0] && fundCards.value[1]) {
    fundCards.value[0].amount = funds.public;
    // 小区数字基金金额与详情页保持一致
    fundCards.value[1].amount = totalBalanceWan.value;
    // 重新触发动画
    animateNumbers();
  }

  uni.showToast({
    title: `已切换至 ${selectedAddress}`,
    icon: 'none'
  });
};

const notices = ref<string[]>([
  '关于2月10日停水通知：上午8:00至12:00',
  '2026年第一季度物业费收缴已开始',
  '小区新春游园活动报名截止至本周五',
  '欢迎新业主入住，请及时办理入住登记'
]);

interface FundCard {
  title: string;
  type: 'balance' | 'qrcode' | 'fund';
  amount: string; // 目标金额
  displayAmount: string; // 显示的动画金额
  unit?: string;
  value?: string;
  bgIcon: string;
  hint?: string;
}

const fundCards = ref<FundCard[]>([
  { 
    title: '公共收益', 
    amount: '12.85', 
    displayAmount: '0',
    unit: '万元', 
    type: 'balance',
    bgIcon: 'wallet',
    hint: '来自广告、经营、设施等收益'
  },
  { 
    title: '数字基金', 
    amount: '5.68', 
    displayAmount: '0',
    unit: '万元', 
    type: 'fund',
    bgIcon: 'chart-bubble',
    hint: '来自<span class="brand-tag">邻檬智家</span>线上线下消费'
  }
]);

const handleFundClick = (card: FundCard) => {
  if (card.title === '公共收益') {
    uni.navigateTo({
      url: '/pages/fund/income'
    });
  } else if (card.title === '数字基金') {
    uni.navigateTo({
      url: '/pages/fund/community-fund'
    });
  }
};

// 数字滚动动画函数
const animateNumbers = () => {
  fundCards.value.forEach((card) => {
    if (card.type === 'balance' || card.type === 'fund') {
      animateNumber(card.amount, (val) => {
        card.displayAmount = val;
      });
    }
  });
};

onMounted(() => {
  // 初始化资金数据
  const selectedAddress = userInfo.value.address;
  setCommunity(selectedAddress);
  
  const house = houseOptions.find(h => h.value === selectedAddress);
  const community = house?.community || (selectedAddress.includes('阳光水岸') ? '阳光水岸' : '翡翠江景');
  const funds = communityFundsMap[community];
  if (funds && fundCards.value[0] && fundCards.value[1]) {
    fundCards.value[0].amount = funds.public;
    // 小区数字基金金额与详情页保持一致
    fundCards.value[1].amount = totalBalanceWan.value;
  }
  animateNumbers();
});

interface MenuItem {
  label: string;
  icon: string;
  color: string;
  url?: string;
  desc?: string;
}

const subMenus = ref<MenuItem[]>([
  { label: '电子投票', icon: 'assignment', color: '#2DD4BF', url: '/pages/voting/voting' },
  { label: '小区数字基金', icon: 'chart-bubble', color: '#F59E0B', url: '/pages/fund/community-fund' },
  { label: '公共收益', icon: 'wallet', color: '#60A5FA', url: '/pages/fund/income' },
  { label: '维修资金', icon: 'money', color: '#F87171', url: '/pages/fund/fund' },
  { label: '信息公开', icon: 'notification', color: '#F472B6', url: '/pages/notice/notice' },
  { label: '小区信息', icon: 'info-circle', color: '#34D399', url: '/pages/community/community-info' },
  { label: '物业企业', icon: 'city', color: '#60A5FA', url: '/pages/property/property-enterprise' },
  { label: '电梯维保', icon: 'service', color: '#818CF8', url: '/pages/elevator/elevator-maintenance' },
  { label: '消防维保', icon: 'secured', color: '#F87171', url: '/pages/fire/fire-maintenance' },
  { label: '日常巡查', icon: 'search', color: '#64748B', url: '/pages/patrol/patrol' },
  { label: '民意调查', icon: 'edit-1', color: '#818CF8', url: '/pages/survey/survey' },
  { label: '小区报修', icon: 'tools', color: '#FB923C', url: '/pages/repair/repair' },
  { label: '小区招采', icon: 'cart', color: '#2DD4BF', url: '/pages/bidding/bidding' }
]);

const quickServices = ref<MenuItem[]>([
  { 
    label: '公租房', 
    icon: 'home', 
    color: '#3B82F6',
    desc: '保障住房困难的城镇中低收入家庭、新就业无房职工、稳定就业的外来务工人员。',
    url: ''
  },
  { 
    label: '保障性租赁住房', 
    icon: 'root-list', 
    color: '#10B981',
    desc: '重点解决小区周边、乡镇基层等新市民、青年人阶段性住房困难。',
    url: ''
  },
  { 
    label: '人才住房', 
    icon: 'user-avatar', 
    color: '#F59E0B',
    desc: '保障符合条件的高层次人才、紧缺人才及特定引进人才。',
    url: ''
  },
  { 
    label: '配售型保障性住房', 
    icon: 'shop', 
    color: '#6366F1',
    desc: '(国家平台) 摸清住房困难工薪收入群体的刚性住房需求。',
    url: ''
  },
  { 
    label: '赣州青年人才驿站', 
    icon: 'location', 
    color: '#EC4899',
    desc: '(求职免费住) 保障毕业3年内大学生来我市中心城区求职和见习实习过渡住房需求。',
    url: ''
  }
]);

const menuPages = computed(() => {
  const pages: MenuItem[][] = [];
  for (let i = 0; i < subMenus.value.length; i += 8) {
    pages.push(subMenus.value.slice(i, i + 8));
  }
  return pages;
});

const handleMenuClick = (item: MenuItem) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url
    });
  } else {
    uni.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 2000
    });
  }
};
const handleVoiceClick = () => {
  uni.navigateTo({
    url: '/pages/voice/voice'
  });
};

const handleNoticeClick = () => {
  uni.navigateTo({
    url: '/pages/notice/notice'
  });
};

const handleVotingClick = () => {
  uni.navigateTo({
    url: '/pages/voting/voting'
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F9FAFC;
  padding-bottom: 160rpx; // Increased padding for tab bar
}

.house-list {
  padding: 20rpx 0;
  
  .house-item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #F1F5F9;
    
    &:last-child {
      border-bottom: none;
    }
    
    &.active {
      .house-label {
        color: #3B82F6;
        font-weight: 600;
      }
    }
    
    .house-item-content {
      display: flex;
      align-items: center;
      gap: 20rpx;
    }
    
    .house-label {
      font-size: 30rpx;
      color: #1E293B;
      transition: all 0.2s;
    }
  }
}

.header {
  height: 9.6rem;
  background: @header-gradient;
  padding: 24rpx @page-padding 0;
  position: relative;
  overflow: hidden;
  color: @text-white;

  .header-content {
    position: relative;
    z-index: 2;
    padding-top: 2rpx;

    .app-title-row {
      margin-bottom: 12rpx;
      display: flex;
      align-items: center;

      .app-title {
        font-size: 40rpx;
        font-weight: 900;
        letter-spacing: 2rpx;
        color: #fff;
        text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15), 0 0 12rpx rgba(255, 255, 255, 0.3);
      }
    }

    .slogan-row {
      display: flex;
      align-items: center;
      margin-bottom: 32rpx;
      .slogan-text {
        font-size: 24rpx;
        font-weight: 400;
        letter-spacing: 2rpx;
        color: rgba(255, 255, 255, 0.95);
      }
    }

    .user-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 12rpx;

      .greeting-text {
        font-size: 32rpx;
        font-weight: 400;
        margin-right: 16rpx;
      }

      .switch-house {
        display: inline-flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.2);
        padding: 2rpx 12rpx;
        border-radius: 20rpx;
        font-size: 20rpx;
        text { margin-right: 6rpx; }
      }
    }

    .location-row {
      display: flex;
      align-items: center;
      opacity: 0.8;
      font-size: 24rpx;
      .location-text { margin-left: 8rpx; }
    }
  }

  .decor-circle {
    position: absolute;
    right: -100rpx;
    top: -50rpx;
    width: 400rpx;
    height: 400rpx;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20rpx);
    }
  }

  @keyframes float-slow {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(10rpx, -15rpx);
    }
  }

  @keyframes float-illustration {
    0%, 100% {
      transform: rotateX(10deg) rotateY(-10deg) translateY(0);
    }
    50% {
      transform: rotateX(10deg) rotateY(-10deg) translateY(-15rpx);
    }
  }

  @keyframes swing {
    0%, 100% { transform: rotate(0); }
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-10deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
  }

  @keyframes move-right {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(6rpx); }
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes cloud-drift {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(20rpx); }
  }

  .header-illustration {
    position: absolute;
    right: 20rpx;
    bottom: 30rpx;
    width: 240rpx;
    height: 280rpx;
    z-index: 1;
    pointer-events: none;

    .building-group {
      position: relative;
      width: 100%;
      height: 100%;
      transform: rotateX(10deg) rotateY(-10deg);
      animation: float-illustration 4s ease-in-out infinite;
      
      .building {
        position: absolute;
        border-radius: 4rpx;
        box-shadow: 8rpx 8rpx 16rpx rgba(0,0,0,0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10rpx;
        gap: 8rpx;

        .window {
          width: 60%;
          height: 8rpx;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2rpx;
        }

        .top-face {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 12rpx;
          background: rgba(255, 255, 255, 0.6);
        }
        
        &.b1 {
          width: 44rpx;
          height: 135rpx;
          right: 20rpx;
          bottom: 68rpx;
          background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%);
          z-index: 1;
        }
        
        &.b2 {
          width: 50rpx;
          height: 175rpx;
          right: 80rpx;
          bottom: 38rpx;
          background: linear-gradient(180deg, #93C5FD 0%, #2563EB 100%);
          z-index: 3;
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        
        &.b3 {
          width: 40rpx;
          height: 95rpx;
          right: 145rpx;
          bottom: 18rpx;
          background: linear-gradient(180deg, #E2E8F0 0%, #94A3B8 100%);
          z-index: 2;
        }
      }
    }
  }
}

.notice-bar {
  margin: -40rpx @page-padding 32rpx;
  background: rgba(255, 255, 255, 0.95);
  padding: 24rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  
  .notice-content {
    display: flex;
    align-items: center;
    width: 100%;
    
    .notice-icon {
      flex-shrink: 0;
      height: 48rpx; /* 与 swiper 高度保持一致 */
      display: flex;
      align-items: center;
      animation: swing 2s ease-in-out infinite;
      transform-origin: center;
    }
    .notice-swiper {
      flex: 1;
      width: 0;
      height: 48rpx;
      margin-left: 16rpx;
      
      :deep(.uni-swiper-item) {
        display: flex;
        align-items: center;
      }
    }
    .notice-text {
      flex: 1;
      font-size: 26rpx;
      color: @text-primary;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 48rpx;
      display: flex;
      align-items: center;
    }
  }
}

.section-container {
  padding: 0 @page-padding;
  margin-bottom: 40rpx;

  .services-card {
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
    border: 1px solid #F1F5F9;
    padding: 32rpx 0 10rpx;
    position: relative;
    overflow: hidden;

    .section-header {
      margin-bottom: 20rpx;
      padding: 0 32rpx;
    }

    .services-decor {
      position: absolute;
      right: -30rpx;
      top: -30rpx;
      width: 120rpx;
      height: 120rpx;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.04) 0%, rgba(96, 165, 250, 0) 70%);
      border-radius: 50%;
      z-index: 1;
      animation: float-slow 12s ease-in-out infinite;
    }

    .services-content {
      position: relative;
      overflow: hidden;
      z-index: 2;

      &::after {
        content: '';
        position: absolute;
        left: -20rpx;
        bottom: -20rpx;
        width: 100rpx;
        height: 100rpx;
        background: radial-gradient(circle, rgba(52, 211, 153, 0.03) 0%, rgba(52, 211, 153, 0) 70%);
        border-radius: 50%;
        z-index: 1;
        animation: float-slow 9s ease-in-out infinite reverse;
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    
    .header-bar {
      width: 8rpx;
      height: 32rpx;
      background: @primary-blue;
      border-radius: 4rpx;
      margin-right: 16rpx;
    }
    
    .header-title {
      font-size: 32rpx;
      font-weight: bold;
      color: @text-primary;
      flex: 1;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -8rpx;
        width: 40rpx;
        height: 6rpx;
        background: linear-gradient(90deg, @primary-blue 0%, rgba(59, 130, 246, 0.1) 100%);
        border-radius: 3rpx;
      }
    }
  }
}

.funds-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;

  .fund-card {
      background: #FFFFFF;
      padding: 24rpx 20rpx;
      min-height: 190rpx;
      border-radius: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
      border: 1px solid #F1F5F9;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%);
        z-index: 0;
      }

      /* 微弱纹理效果 */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: radial-gradient(#3B82F6 0.5px, transparent 0.5px);
        background-size: 12rpx 12rpx;
        z-index: 0;
      }

      .fund-decor-circle {
        position: absolute;
        left: -20rpx;
        top: -20rpx;
        width: 80rpx;
        height: 80rpx;
        background: radial-gradient(circle, fade(@primary-blue, 5%) 0%, fade(@primary-blue, 0%) 70%);
        border-radius: 50%;
        z-index: 1;
        animation: float-slow 8s ease-in-out infinite;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.03;
        background-image: radial-gradient(#3B82F6 0.5px, transparent 0.5px);
        background-size: 12rpx 12rpx;
        z-index: 0;
      }
      
      .fund-bg-illust {
        position: absolute;
        right: -20rpx;
        bottom: -20rpx;
        width: 180rpx;
        height: 180rpx;
        opacity: 0.08;
        z-index: 1;
        pointer-events: none;
        transform: rotate(-5deg);

        .illust-main {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .list-card {
          position: relative;
          width: 100rpx;
          height: 140rpx;
          background: #BFDBFE;
          border-radius: 12rpx;
          transform: rotate(15deg);
          display: flex;
          flex-direction: column;
          padding: 16rpx 12rpx;
          gap: 12rpx;
          box-shadow: 4rpx 8rpx 16rpx rgba(59, 130, 246, 0.1);
          z-index: 2;
          animation: illust-float 4s ease-in-out infinite;
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 12rpx;
            background: #60A5FA;
            border-radius: 12rpx 12rpx 0 0;
          }

          .check-item {
            width: 24rpx;
            height: 24rpx;
            background: #3B82F6;
            border-radius: 6rpx;
            position: relative;
            animation: check-pop 3s ease-in-out infinite;

            &:nth-child(2) {
              animation-delay: 1.5s;
            }

            &::after {
              content: '✓';
              color: #fff;
              font-size: 16rpx;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        .chart-box {
          position: relative;
          width: 120rpx;
          height: 120rpx;
          background: #F0F9FF;
          border-radius: 16rpx;
          border: 4rpx solid #BAE6FD;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          padding: 16rpx;
          gap: 8rpx;
          transform: rotate(-10deg);
          box-shadow: 4rpx 8rpx 16rpx rgba(14, 165, 233, 0.1);
          z-index: 2;
          animation: illust-float 4s ease-in-out infinite reverse;

          .bar {
            width: 16rpx;
            background: #0EA5E9;
            border-radius: 8rpx 8rpx 0 0;
            transform-origin: bottom;
            
            &.b1 { height: 40%; animation: bar-grow 2.5s ease-in-out infinite; }
            &.b2 { height: 70%; animation: bar-grow 2.5s ease-in-out infinite 0.4s; }
            &.b3 { height: 55%; animation: bar-grow 2.5s ease-in-out infinite 0.8s; }
          }
        }
        
        @keyframes illust-float {
          0%, 100% { transform: rotate(15deg) translateY(0); }
          50% { transform: rotate(12deg) translateY(-10rpx); }
        }

        @keyframes check-pop {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        @keyframes bar-grow {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
        
        .cloud {
          position: absolute;
          background: #fff;
          border-radius: 12rpx;
          box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
          z-index: 3;
          
          &.c1 {
            width: 50rpx;
            height: 18rpx;
            right: 0rpx;
            top: 40rpx;
            animation: cloud-drift 4s ease-in-out infinite;
          }
          &.c2 {
            width: 60rpx;
            height: 22rpx;
            left: -10rpx;
            bottom: 40rpx;
            animation: cloud-drift 6s ease-in-out infinite reverse;
          }
          &.c3 {
            width: 45rpx;
            height: 16rpx;
            left: -10rpx;
            top: 20rpx;
            animation: cloud-drift 5s ease-in-out infinite;
          }
        }
      }

      .fund-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
      }

      .fund-main-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 8rpx;
      }

      .fund-title {
        font-size: 28rpx;
        color: #64748B;
        font-weight: 600;
        margin-bottom: 8rpx;
      }

      .fund-value-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        .fund-amount-wrapper {
          display: flex;
          align-items: baseline;
          justify-content: center;
          position: relative;
          /* 核心：确保 wrapper 本身居中，且不被单位撑开 */
        }

        .fund-amount {
          font-size: 60rpx;
          font-weight: 900;
          color: #E11D48;
          line-height: 1;
          font-family: 'DIN Alternate', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .fund-unit {
          font-size: 20rpx;
          color: #94A3B8;
          font-weight: 500;
          position: absolute;
          left: 100%;
          bottom: 6rpx;
          margin-left: 4rpx;
          white-space: nowrap;
        }

        .fund-value-small {
          font-size: 26rpx;
          font-weight: 700;
          color: #E11D48;
          background: rgba(225, 29, 72, 0.05);
          padding: 2rpx 10rpx;
          border-radius: 4rpx;
        }
      }

      .fund-action-badge {
        position: absolute;
        right: 16rpx;
        top: 16rpx;
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        animation: badge-pulse 2s ease-in-out infinite;
        
        /* 箭头微调：指向右上 */
        :deep(.t-icon) {
          transform: rotate(-45deg);
        }
      }

      .fund-footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 6rpx;
        position: relative;
      }

      .fund-hint {
        font-size: 18rpx;
        color: #94A3B8;
        font-weight: 400;
        text-align: center;
        line-height: 1.2;
        padding: 0;
        background: transparent;
        border-radius: 0;
        border: none;
        display: inline-block;
        max-width: 95%;
        box-sizing: border-box;
        box-shadow: none;

        :deep(.brand-tag) {
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
          padding: 0rpx 6rpx;
          border-radius: 4rpx;
          margin: 0 2rpx;
          font-weight: 500;
        }
      }
      
      @keyframes badge-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
    }
}

.feature-grid {
  display: flex;
  gap: 20rpx;
  height: 340rpx;

  .feature-card {
    background: #FFFFFF;
    border-radius: 28rpx;
    position: relative;
    overflow: hidden;
    padding: 28rpx;
    border: 1px solid #F1F5F9;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.01);
    }

    .card-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
    }

    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #1E293B;
      margin-bottom: 6rpx;
    }

    .card-subtitle {
      font-size: 22rpx;
      color: #64748B;
    }
  }

  .large {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 32rpx;
    background: linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%);
    border-color: #E0F2FE;

    .card-subtitle {
      margin-bottom: 20rpx;
    }

    .card-btn {
      width: 100rpx;
      height: 44rpx;
      background: linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%);
      border-radius: 22rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 22rpx;
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.3);
      animation: breathe 2s ease-in-out infinite;
    }

    .card-illustration {
      position: absolute;
      right: 16rpx;
      bottom: 24rpx;
      width: 160rpx;
      height: 160rpx;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .illust-main {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &::before {
          content: '';
          position: absolute;
          width: 120rpx;
          height: 120rpx;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 50%;
        }
      }

      .list-card {
        position: relative;
        width: 64rpx;
        height: 88rpx;
        background: #BFDBFE;
        border-radius: 6rpx;
        transform: rotate(5deg);
        display: flex;
        flex-direction: column;
        padding: 12rpx 10rpx;
        gap: 10rpx;
        box-shadow: 4rpx 8rpx 16rpx rgba(59, 130, 246, 0.1);
        z-index: 2;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8rpx;
          background: #60A5FA;
          border-radius: 6rpx 6rpx 0 0;
        }

        .check-item {
          width: 20rpx;
          height: 20rpx;
          background: #3B82F6;
          border-radius: 3rpx;
          position: relative;
          &::after {
            content: '✓';
            color: #fff;
            font-size: 14rpx;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      
      .cloud {
        position: absolute;
        background: #fff;
        border-radius: 10rpx;
        box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
        z-index: 3;
        
        &.c1 {
          width: 32rpx;
          height: 12rpx;
          right: 8rpx;
          top: 32rpx;
          animation: cloud-drift 4s ease-in-out infinite;
        }
        &.c2 {
          width: 40rpx;
          height: 16rpx;
          left: 8rpx;
          bottom: 32rpx;
          animation: cloud-drift 6s ease-in-out infinite reverse;
        }
      }
    }

    .card-wave {
      position: absolute;
      bottom: -32rpx;
      left: -10%;
      width: 120%;
      height: 64rpx;
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.08) 100%);
      border-radius: 50% 50% 0 0;
      z-index: 0;
    }
  }

  .feature-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20rpx;
  }

  .small {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 24rpx;

    .card-title {
      font-size: 30rpx;
    }

    .card-subtitle {
      font-size: 22rpx;
    }

    .card-illustration {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .illust-main {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
          content: '';
          position: absolute;
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          opacity: 0.1;
        }
      }

      .notice-box {
        position: relative;
        width: 44rpx;
        height: 54rpx;
        background: #D1FAE5;
        border-radius: 6rpx;
        border-top: 6rpx solid #10B981;
        display: flex;
        flex-direction: column;
        padding: 8rpx 6rpx;
        gap: 6rpx;
        z-index: 2;
        box-shadow: 2rpx 4rpx 8rpx rgba(16, 185, 129, 0.1);
        animation: illust-float 4s ease-in-out infinite;

        .notice-line {
          width: 100%;
          height: 4rpx;
          background: #10B981;
          opacity: 0.3;
          border-radius: 2rpx;
          transform-origin: left;
          animation: line-grow 2s ease-in-out infinite;

          &:nth-child(2) {
            animation-delay: 0.5s;
          }
        }
        .notice-dot {
          width: 12rpx;
          height: 12rpx;
          background: #10B981;
          border-radius: 50%;
          align-self: flex-end;
          margin-top: auto;
          animation: dot-pulse 2s ease-in-out infinite;
        }
      }

      @keyframes line-grow {
        0%, 100% { transform: scaleX(1); opacity: 0.3; }
        50% { transform: scaleX(0.6); opacity: 0.1; }
      }

      @keyframes dot-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.6; }
      }

      .vote-box {
        position: relative;
        width: 50rpx;
        height: 40rpx;
        background: #E0E7FF;
        border: 2px solid #6366F1;
        border-radius: 4rpx;
        z-index: 2;
        box-shadow: 2rpx 4rpx 8rpx rgba(99, 102, 241, 0.1);

        .vote-slot {
          position: absolute;
          top: 4rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 24rpx;
          height: 4rpx;
          background: #6366F1;
          border-radius: 2rpx;
        }

        .vote-card {
          position: absolute;
          top: -12rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 18rpx;
          height: 24rpx;
          background: #fff;
          border: 1px solid #6366F1;
          border-radius: 2rpx;
          animation: slide-in-down 2s ease-in-out infinite;
        }
      }

      @keyframes slide-in-down {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, 10rpx); }
      }

      .cloud {
        position: absolute;
        background: #fff;
        border-radius: 8rpx;
        box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.05);
        z-index: 3;
        
        &.c1 {
          width: 24rpx;
          height: 10rpx;
          right: 0;
          top: 10rpx;
          animation: cloud-drift 4s ease-in-out infinite;
        }
      }
    }

    &.notice .illust-main::before { background: #10B981; }
    &.voting .illust-main::before { background: #6366F1; }
  }
}

@keyframes slide-in-down {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 10rpx); }
}

.quick-services-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
  padding: 32rpx;

  .section-header {
    margin-bottom: 32rpx !important;
  }

  .quick-services-grid {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .quick-service-item {
      display: flex;
      align-items: center;
      padding: 20rpx;
      background: #F8FAFC;
      border-radius: 16rpx;
      transition: all 0.2s ease;

      &:active {
        background: #F1F5F9;
        transform: scale(0.98);
      }

      .quick-service-icon-box {
        width: 80rpx;
        height: 80rpx;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
      }

      .quick-service-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4rpx;

        .quick-service-label {
          font-size: 28rpx;
          color: @text-primary;
          font-weight: bold;
        }

        .quick-service-desc {
          font-size: 22rpx;
          color: #64748B;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
        }
      }

      .quick-arrow {
        margin-left: 12rpx;
        align-self: center;
      }
    }
  }
}

.services-swiper {
    height: 360rpx;

    :deep(.uni-swiper-dots) {
      bottom: 5px;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 30rpx 0;
      padding: 20rpx 10rpx;
      position: relative;
      z-index: 2;

      .service-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 2;

        .service-icon {
          width: 90rpx;
          height: 90rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8rpx;
        }

        .service-label {
          font-size: 22rpx;
          color: @text-primary;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          padding: 0 4rpx;
        }
      }
  }
}
</style>
