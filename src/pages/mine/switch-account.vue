<template>
  <view class="page-container">
    <t-navbar
      title="身份验证"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

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
  uni.navigateBack();
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
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding-top: 100rpx;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60rpx @page-padding;
  background: #FFFFFF;

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;
    position: relative;
    z-index: 1;

    .step-num {
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      background: #F1F5F9;
      color: #94A3B8;
      font-size: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border: 4rpx solid #FFFFFF;
      transition: all 0.3s;
    }

    .step-text {
      font-size: 24rpx;
      color: #94A3B8;
      transition: all 0.3s;
    }

    &.active {
      .step-num {
        background: #3B82F6;
        color: #FFFFFF;
        box-shadow: 0 0 0 8rpx rgba(59, 130, 246, 0.1);
      }
      .step-text {
        color: #1E293B;
        font-weight: 500;
      }
    }

    &.completed {
      .step-num {
        background: #10B981;
        color: #FFFFFF;
      }
    }
  }

  .step-line {
    width: 120rpx;
    height: 4rpx;
    background: #F1F5F9;
    margin: 0 -10rpx 40rpx -10rpx;
    transition: all 0.3s;

    &.active {
      background: #10B981;
    }
  }
}

.content-wrapper {
  flex: 1;
  padding: 0 @page-padding;
}

.step-content {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

/* Face Step */
.face-step {
  padding-top: 40rpx;
  
  .face-scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;

    .scanner-box {
      width: 400rpx;
      height: 400rpx;
      border-radius: 40rpx;
      border: 4rpx solid #3B82F6;
      position: relative;
      overflow: hidden;
      margin-bottom: 40rpx;
      background: #F8FAFC;

      .face-img {
        width: 100%;
        height: 100%;
        opacity: 0.6;
      }

      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4rpx;
        background: linear-gradient(to bottom, transparent, #3B82F6);
        box-shadow: 0 0 15rpx #3B82F6;
        animation: scan 2s infinite ease-in-out;
      }
    }

    .scanner-tips {
      text-align: center;
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #1E293B;
        display: block;
        margin-bottom: 12rpx;
      }
      .desc {
        font-size: 26rpx;
        color: #94A3B8;
      }
    }
  }
}

@keyframes scan {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}

/* SMS Step */
.sms-step {
  padding-top: 40rpx;

  .sms-header {
    margin-bottom: 60rpx;
    .title {
      font-size: 40rpx;
      font-weight: 600;
      color: #1E293B;
      display: block;
      margin-bottom: 16rpx;
    }
    .desc {
      font-size: 28rpx;
      color: #64748B;
      line-height: 1.5;
    }
  }

  .input-section {
    margin-bottom: 80rpx;
    
    .code-input {
      :deep(.t-input__control) {
        font-size: 36rpx;
        letter-spacing: 4rpx;
      }
    }

    .resend-btn {
      font-size: 28rpx;
      color: #3B82F6;
      padding: 10rpx 20rpx;
      
      &.disabled {
        color: #CBD5E1;
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
  
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}
</style>
