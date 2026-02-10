<template>
  <view class="page-container">
    <t-navbar
      title="身份验证"
      left-arrow
      @go-back="handleBack"
      :fixed="false"
      class="custom-navbar"
    >
      <template #left-icon>
        <t-icon name="chevron-left" size="48rpx" color="#1E293B" />
      </template>
    </t-navbar>

    <view class="header-bg"></view>

    <view class="step-header">
      <view class="step-item" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
        <view class="step-num">{{ currentStep > 1 ? '✓' : '1' }}</view>
        <text class="step-text">人脸识别</text>
      </view>
      <view class="step-line" :class="{ active: currentStep > 1 }"></view>
      <view class="step-item" :class="{ active: currentStep >= 2 }">
        <view class="step-num">2</view>
        <text class="step-text">短信验证</text>
      </view>
    </view>

    <view class="content-wrapper">
      <!-- Step 1: Face Recognition -->
      <view v-if="currentStep === 1" class="step-content face-step">
        <view class="face-scanner">
          <view class="scanner-box">
            <image :src="config.placeholderImage" mode="aspectFill" class="face-img" />
            <view class="scan-line"></view>
          </view>
          <view class="scanner-tips">
            <text class="title">请将面部置于方框内</text>
            <text class="desc">我们需要验证您的身份以确保账号安全</text>
          </view>
        </view>
        
        <t-button 
          theme="primary" 
          size="large" 
          block 
          shape="round" 
          @click="handleFaceScan"
          :loading="isScanning"
        >
          {{ isScanning ? '正在识别...' : '开始识别' }}
        </t-button>
      </view>

      <!-- Step 2: SMS Verification -->
      <view v-if="currentStep === 2" class="step-content sms-step">
        <view class="sms-header">
          <text class="title">输入验证码</text>
          <text class="desc">验证码已发送至您的绑定手机号 138****8888</text>
        </view>

        <view class="input-section">
          <t-input
            v-model="smsCode"
            placeholder="请输入6位验证码"
            type="number"
            maxlength="6"
            size="large"
            class="code-input"
          >
            <template #suffix>
              <view 
                class="resend-btn" 
                :class="{ disabled: counting }" 
                @click="handleResendCode"
              >
                {{ counting ? `${count}s` : '重新获取' }}
              </view>
            </template>
          </t-input>
        </view>

        <view class="submit-btn-box">
          <t-button 
            theme="primary" 
            size="large" 
            block 
            shape="round" 
            :disabled="smsCode.length !== 6"
            @click="handleVerifySms"
            :loading="isVerifying"
          >
            确认切换
          </t-button>
        </view>
      </view>
    </view>

    <view class="security-tips">
      <t-icon name="secured" size="28rpx" color="#94A3B8" />
      <text>安全环境监测中，请放心操作</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import config from '@/config';

const currentStep = ref(1);
const isScanning = ref(false);
const isVerifying = ref(false);
const smsCode = ref('');
const counting = ref(false);
const count = ref(60);
let timer: any = null;

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

const handleFaceScan = () => {
  isScanning.value = true;
  // Simulate face recognition process
  setTimeout(() => {
    isScanning.value = false;
    uni.showToast({
      title: '识别成功',
      icon: 'success'
    });
    setTimeout(() => {
      currentStep.value = 2;
      startCountdown();
    }, 1000);
  }, 2000);
};

const startCountdown = () => {
  if (counting.value) return;
  counting.value = true;
  timer = setInterval(() => {
    if (count.value > 1) {
      count.value--;
    } else {
      clearInterval(timer);
      counting.value = false;
      count.value = 60;
    }
  }, 1000);
};

const handleResendCode = () => {
  if (counting.value) return;
  uni.showToast({
    title: '验证码已发送',
    icon: 'none'
  });
  startCountdown();
};

const handleVerifySms = () => {
  isVerifying.value = true;
  // Simulate SMS verification
  setTimeout(() => {
    isVerifying.value = false;
    uni.showModal({
      title: '切换成功',
      content: '账号已成功切换至关联账号',
      showCancel: false,
      success: () => {
        uni.reLaunch({
          url: '/pages/mine/mine'
        });
      }
    });
  }, 1500);
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
  --td-navbar-color: #1E293B;
  --td-navbar-title-font-weight: 600;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280rpx;
  background: @header-gradient;
  z-index: 0;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60rpx @page-padding;
  background: transparent;
  position: relative;
  z-index: 1;

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
    position: relative;
    z-index: 1;

    .step-num {
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      color: #64748B;
      font-size: 26rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border: 4rpx solid #FFFFFF;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .step-text {
      font-size: 24rpx;
      color: #64748B;
      transition: all 0.3s;
    }

    &.active {
      .step-num {
        background: @primary-blue;
        color: #FFFFFF;
        transform: scale(1.1);
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.3);
      }
      .step-text {
        color: @primary-blue;
        font-weight: 600;
      }
    }

    &.completed {
      .step-num {
        background: #10B981;
        color: #FFFFFF;
        border-color: #FFFFFF;
      }
      .step-text {
        color: #10B981;
      }
    }
  }

  .step-line {
    width: 120rpx;
    height: 4rpx;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 -10rpx 40rpx -10rpx;
    transition: all 0.4s ease;

    &.active {
      background: #10B981;
    }
  }
}

.content-wrapper {
  flex: 1;
  padding: 20rpx @page-padding;
  position: relative;
  z-index: 1;
}

.step-content {
  background: #FFFFFF;
  border-radius: 32rpx;
  padding: 48rpx 40rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.04);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30rpx); }
  to { opacity: 1; transform: translateY(0); }
}

/* Face Step */
.face-step {
  .face-scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;

    .scanner-box {
      width: 360rpx;
      height: 360rpx;
      border-radius: 60rpx;
      border: 6rpx solid @primary-blue;
      position: relative;
      overflow: hidden;
      margin-bottom: 48rpx;
      background: #F8FAFC;
      box-shadow: 0 0 40rpx rgba(59, 130, 246, 0.1);

      .face-img {
        width: 100%;
        height: 100%;
        opacity: 0.4;
      }

      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6rpx;
        background: linear-gradient(to bottom, transparent, @primary-blue);
        box-shadow: 0 0 20rpx @primary-blue;
        animation: scan 2.5s infinite ease-in-out;
      }
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border: 20rpx solid rgba(255, 255, 255, 0.5);
        border-radius: 54rpx;
        pointer-events: none;
      }
    }

    .scanner-tips {
      text-align: center;
      .title {
        font-size: 34rpx;
        font-weight: 600;
        color: #1E293B;
        display: block;
        margin-bottom: 16rpx;
      }
      .desc {
        font-size: 26rpx;
        color: #64748B;
        line-height: 1.6;
      }
    }
  }
}

@keyframes scan {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* SMS Step */
.sms-step {
  .sms-header {
    margin-bottom: 60rpx;
    .title {
      font-size: 44rpx;
      font-weight: 700;
      color: #1E293B;
      display: block;
      margin-bottom: 20rpx;
    }
    .desc {
      font-size: 28rpx;
      color: #64748B;
      line-height: 1.6;
    }
  }

  .input-section {
    margin-bottom: 60rpx;
    
    .code-input {
      --td-input-bg-color: #F8FAFC;
      --td-input-border-radius: 16rpx;
      
      :deep(.t-input__control) {
        font-size: 40rpx;
        font-weight: 600;
        letter-spacing: 8rpx;
        color: #1E293B;
      }
    }

    .resend-btn {
      font-size: 28rpx;
      color: @primary-blue;
      font-weight: 500;
      padding: 10rpx 24rpx;
      
      &.disabled {
        color: #94A3B8;
      }
    }
  }
}

.security-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 40rpx 0 calc(40rpx + env(safe-area-inset-bottom));
  position: relative;
  z-index: 1;
  
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}
</style>
