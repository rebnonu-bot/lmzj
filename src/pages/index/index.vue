<template>
  <view class="page-container">
    <!-- 1. Header with strong gradient -->
    <view class="header">
      <view class="header-content">
        <view class="app-title-row">
          <text class="app-title">智慧物业服务平台</text>
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
            <view class="fund-decor-circle"></view>
            <t-icon :name="card.bgIcon" class="fund-bg-icon" />
            <view class="fund-content">
            <!-- Top: Value -->
            <view class="fund-value-box">
              <template v-if="card.type === 'balance'">
                <text class="fund-amount">{{ card.displayAmount }}</text>
                <text class="fund-unit">{{ card.unit }}</text>
              </template>
              <template v-else>
                <text class="fund-value-small">{{ card.value }}</text>
              </template>
            </view>
            
            <!-- Bottom: Title + Icon -->
            <view class="fund-title-row">
              <text class="fund-title">{{ card.title }}</text>
              <t-icon name="logout" size="24rpx" color="#94A3B8" class="fund-icon" />
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. 业主有话说 Banner Section -->
    <view class="section-container">
      <view class="voice-banner" @click="handleVoiceClick">
        <view class="banner-content">
          <text class="banner-title">业主有话说</text>
          <text class="banner-subtitle">业主诉求高效处置</text>
          <view class="banner-btn">
            <text>进入</text>
          </view>
        </view>
        <view class="banner-illustration">
          <view class="list-card">
            <view class="check-item"></view>
            <view class="check-item"></view>
          </view>
          <view class="cloud c1"></view>
          <view class="cloud c2"></view>
        </view>
        <view class="banner-wave"></view>
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
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideTabBar().catch(() => {});
});

const userInfo = ref({
  name: '刘泽辉',
  slogan: '共建和谐小区,共享温馨生活',
  address: '阳光水岸一期 1-1-802'
});

const notices = ref<string[]>([
  '关于2月10日停水通知：上午8:00至12:00',
  '2026年第一季度物业费收缴已开始',
  '小区新春游园活动报名截止至本周五',
  '欢迎新业主入住，请及时办理入住登记'
]);

interface FundCard {
  title: string;
  type: 'balance' | 'qrcode';
  amount: string; // 目标金额
  displayAmount: string; // 显示的动画金额
  unit?: string;
  value?: string;
  bgIcon: string;
}

const fundCards = ref<FundCard[]>([
  { 
    title: '住维资金余额', 
    amount: '233.37', 
    displayAmount: '0',
    unit: '万元', 
    type: 'balance', 
    bgIcon: 'tools'
  },
  { 
    title: '小区数字基金', 
    amount: '12.85', 
    displayAmount: '0',
    unit: '万元', 
    type: 'balance',
    bgIcon: 'money'
  }
]);

const handleFundClick = (card: FundCard) => {
  if (card.title === '住维资金余额') {
    uni.navigateTo({
      url: '/pages/fund/fund'
    });
  } else if (card.title === '小区数字基金') {
    uni.navigateTo({
      url: '/pages/fund/income'
    });
  }
};

const handleSwitchHouse = () => {
  uni.showToast({
    title: '切换房屋功能开发中',
    icon: 'none'
  });
};

// 数字滚动动画函数
const animateNumbers = () => {
  try {
    fundCards.value.forEach((card) => {
      if (card.type === 'balance') {
        const target = parseFloat(card.amount);
        if (isNaN(target)) return;
        
        const hasDecimal = card.amount.includes('.');
        const duration = 1500; // 动画时长 1.5s
        const startTime = Date.now();
        
        const update = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          
          // 使用 easeOutExpo 缓动函数使效果更自然
          const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
          };
          
          const current = target * easeOutExpo(progress);
          
          if (hasDecimal) {
            card.displayAmount = current.toFixed(2);
          } else {
            card.displayAmount = Math.floor(current).toString();
          }
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            card.displayAmount = card.amount; // 确保最终数值准确
          }
        };
        
        requestAnimationFrame(update);
      }
    });
  } catch (error) {
    console.error('animateNumbers error:', error);
  }
};

onMounted(() => {
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
  { label: '电子投票', icon: 'check-rectangle', color: '#2DD4BF' },
  { label: '小区信息', icon: 'info-circle', color: '#34D399' },
  { label: '物业企业', icon: 'city', color: '#60A5FA' },
  { label: '电梯维保', icon: 'service', color: '#818CF8' },
  { label: '消防维保', icon: 'secured', color: '#F87171' },
  { label: '日常巡查', icon: 'search', color: '#64748B' },
  { label: '民意调查', icon: 'edit-1', color: '#818CF8' },
  { label: '学习园地', icon: 'book', color: '#FB923C' },
  { label: '公示公告', icon: 'notification', color: '#F472B6' },
  { label: '小区报修', icon: 'tools', color: '#FB923C' },
  { label: '小区招采', icon: 'cart', color: '#2DD4BF' },
  { label: '小区生活', icon: 'shop', color: '#4ADE80' },
  { label: '数字基金', icon: 'wallet', color: '#60A5FA' },
  { label: '维修资金', icon: 'money', color: '#F87171' },
  { label: '服务动态', icon: 'root-list', color: '#F87171' },
  { label: '业主自治', icon: 'user-talk', color: '#FB923C' }
]);

const quickServices = ref<MenuItem[]>([
  { 
    label: '公租房', 
    icon: 'home', 
    color: '#3B82F6',
    desc: '保障住房困难的城镇中低收入家庭、新就业无房职工、稳定就业的外来务工人员。'
  },
  { 
    label: '保障性租赁住房', 
    icon: 'root-list', 
    color: '#10B981',
    desc: '重点解决产业园区、乡镇基层等新市民、青年人阶段性住房困难。'
  },
  { 
    label: '人才住房', 
    icon: 'user-avatar', 
    color: '#F59E0B',
    desc: '保障符合条件的高层次人才、紧缺人才及特定引进人才。'
  },
  { 
    label: '配售型保障性住房', 
    icon: 'shop', 
    color: '#6366F1',
    desc: '(国家平台) 摸清住房困难工薪收入群体的刚性住房需求。'
  },
  { 
    label: '赣州青年人才驿站', 
    icon: 'location', 
    color: '#EC4899',
    desc: '(求职免费住) 保障毕业3年内大学生来我市中心城区求职和见习实习过渡住房需求。'
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
  if (item.label === '维修资金') {
    uni.navigateTo({
      url: '/pages/fund/fund'
    });
    return;
  }
  if (item.label === '电梯维保') {
    uni.navigateTo({
      url: '/pages/elevator/elevator-maintenance'
    });
    return;
  }
  if (item.label === '消防维保') {
    uni.navigateTo({
      url: '/pages/fire/fire-maintenance'
    });
    return;
  }
  if (item.label === '小区信息') {
    uni.navigateTo({
      url: '/pages/community/community-info'
    });
    return;
  }
  if (item.label === '物业企业') {
    uni.navigateTo({
      url: '/pages/property/property-enterprise'
    });
    return;
  }
  if (item.label === '电子投票') {
    uni.navigateTo({
      url: '/pages/voting/voting'
    });
    return;
  }
  if (item.label === '日常巡查') {
    uni.navigateTo({
      url: '/pages/patrol/patrol'
    });
    return;
  }
  if (item.label === '民意调查') {
    uni.navigateTo({
      url: '/pages/survey/survey'
    });
    return;
  }
  if (item.label === '学习园地') {
    uni.navigateTo({
      url: '/pages/learning/learning'
    });
    return;
  }
  if (item.label === '公示公告') {
    uni.navigateTo({
      url: '/pages/notice/notice'
    });
    return;
  }
  if (item.label === '小区报修') {
    uni.navigateTo({
      url: '/pages/repair/repair'
    });
    return;
  }
  if (item.label === '小区招采') {
    uni.navigateTo({
      url: '/pages/bidding/bidding'
    });
    return;
  }
  if (item.label === '小区生活') {
    uni.navigateTo({
      url: '/pages/life/life'
    });
    return;
  }
  if (item.label === '数字基金') {
    uni.navigateTo({
      url: '/pages/fund/income'
    });
    return;
  }
  if (item.label === '服务动态') {
    uni.navigateTo({
      url: '/pages/service-news/service-news'
    });
    return;
  }
  if (item.label === '业主自治') {
    uni.navigateTo({
      url: '/pages/autonomy/autonomy'
    });
    return;
  }
  
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
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F9FAFC;
  padding-bottom: 160rpx; // Increased padding for tab bar
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
  gap: 24rpx;

  .fund-card {
    background: #FFFFFF;
    padding: 24rpx;
    min-height: 140rpx;
    border-radius: 24rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.03);
    border: 1px solid #F1F5F9;

    .fund-decor-circle {
      position: absolute;
      left: -20rpx;
      top: -20rpx;
      width: 100rpx;
      height: 100rpx;
      background: radial-gradient(circle, fade(@primary-blue, 5%) 0%, fade(@primary-blue, 0%) 70%);
      border-radius: 50%;
      z-index: 1;
      animation: float-slow 8s ease-in-out infinite;
    }

    &::after {
      content: '';
      position: absolute;
      right: -30rpx;
      bottom: -30rpx;
      width: 120rpx;
      height: 120rpx;
      background: radial-gradient(circle, fade(@secondary-blue, 5%) 0%, fade(@secondary-blue, 0%) 70%);
      border-radius: 50%;
      z-index: 1;
      animation: float-slow 10s ease-in-out infinite reverse;
    }
    
    .fund-bg-icon {
      position: absolute;
      right: 10rpx;
      bottom: 10rpx;
      font-size: 80rpx !important;
      background: linear-gradient(135deg, @primary-blue 0%, @secondary-blue 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.12;
      transform: rotate(-15deg);
      z-index: 1;
    }

    .fund-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .fund-value-box {
      margin-bottom: 8rpx;
      display: flex;
      align-items: baseline;
      justify-content: center;

      .fund-amount {
        font-size: 36rpx;
        font-weight: 400;
        color: #E11D48;
        line-height: 1;
      }

      .fund-unit {
        font-size: 20rpx;
        color: #E11D48;
        margin-left: 4rpx;
        font-weight: 400;
      }

      .fund-value-small {
        font-size: 22rpx;
        color: #E11D48;
        background: rgba(225, 29, 72, 0.05);
        padding: 4rpx 10rpx;
        border-radius: 8rpx;
        line-height: 1.4;
      }
    }

    .fund-title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6rpx;

      .fund-title {
        font-size: 24rpx;
        color: #334155;
        font-weight: 400;
      }

      .fund-icon {
        opacity: 0.8;
        animation: move-right 1.5s ease-in-out infinite;
      }
    }
  }
}

.voice-banner {
  background: #FFFFFF;
  border-radius: 32rpx;
  height: 160rpx;
  position: relative;
  overflow: hidden;
  padding: 24rpx 40rpx;
  display: flex;
  align-items: center;
  border: 1px solid #E0F2FE;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.02);
  
  .banner-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    
    .banner-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #0F172A;
      margin-bottom: 4rpx;
    }
    
    .banner-subtitle {
      font-size: 24rpx;
      color: #64748B;
      margin-bottom: 16rpx;
    }
    
    .banner-btn {
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
  }
  
  .banner-illustration {
    position: absolute;
    right: 40rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 140rpx;
    height: 140rpx;
    z-index: 1;
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
    
    .list-card {
      position: relative;
      width: 60rpx;
      height: 80rpx;
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
        width: 18rpx;
        height: 18rpx;
        background: #3B82F6;
        border-radius: 3rpx;
        position: relative;
        &::after {
          content: '✓';
          color: #fff;
          font-size: 12rpx;
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
      border-radius: 12rpx;
      box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
      z-index: 3;
      
      &.c1 {
        width: 30rpx;
        height: 12rpx;
        right: 0;
        top: 20rpx;
        animation: cloud-drift 4s ease-in-out infinite;
      }
      &.c2 {
        width: 40rpx;
        height: 16rpx;
        left: 0;
        bottom: 20rpx;
        animation: cloud-drift 6s ease-in-out infinite reverse;
      }
    }
  }
  
  .banner-wave {
    position: absolute;
    bottom: -40rpx;
    left: -10%;
    width: 120%;
    height: 80rpx;
    background: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%);
    border-radius: 50% 50% 0 0;
    z-index: 0;
  }
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
