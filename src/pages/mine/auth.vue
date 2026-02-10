<template>
  <view class="page-container">
    <t-navbar
      title="实名认证"
      left-arrow
      @go-back="handleBack"
      :fixed="false"
      class="custom-navbar"
    >
      <template #left-icon>
        <t-icon name="chevron-left" size="48rpx" color="#1E293B" />
      </template>
    </t-navbar>

    <!-- Header Background -->
    <view class="header-bg"></view>

    <scroll-view scroll-y class="auth-scroll">
      <view class="content-wrapper">
        <!-- 1. ID Card Section -->
        <view class="section-card">
          <view class="section-title">身份证上传</view>
          <view class="id-card-grid">
            <view class="id-card-item" @click="handleUpload('front')">
              <view class="upload-box" v-if="!form.idCardFront">
                <t-icon name="camera" size="64rpx" color="#94A3B8" />
                <text class="upload-text">身份证人像面</text>
              </view>
              <image v-else :src="form.idCardFront" mode="aspectFill" class="preview-img" />
              <view class="re-upload" v-if="form.idCardFront">点击重传</view>
            </view>
            
            <view class="id-card-item" @click="handleUpload('back')">
              <view class="upload-box" v-if="!form.idCardBack">
                <t-icon name="camera" size="64rpx" color="#94A3B8" />
                <text class="upload-text">身份证国徽面</text>
              </view>
              <image v-else :src="form.idCardBack" mode="aspectFill" class="preview-img" />
              <view class="re-upload" v-if="form.idCardBack">点击重传</view>
            </view>
          </view>
          <view class="tips">请确保身份证姓名、证件号码清晰可见，无反光、无遮挡</view>
        </view>

        <!-- 2. Phone Verification -->
        <view class="section-card mt-24">
          <view class="section-title">手机号验证</view>
          <view class="input-group">
            <t-input
              v-model="form.phone"
              label="手机号"
              placeholder="请输入手机号"
              type="number"
              maxlength="11"
              borderless
            />
            <view class="verify-code-row">
              <t-input
                v-model="form.code"
                label="验证码"
                placeholder="请输入验证码"
                type="number"
                maxlength="6"
                borderless
              >
                <template #suffix>
                  <view 
                    class="code-btn" 
                    :class="{ disabled: counting || !isValidPhone }" 
                    @click="handleGetCode"
                  >
                    {{ counting ? `${count}s后重发` : '获取验证码' }}
                  </view>
                </template>
              </t-input>
            </view>
          </view>
        </view>

        <!-- 3. Face Recognition Entry -->
        <view class="section-card mt-24">
          <view class="section-title">人脸识别绑定</view>
          <view 
            class="face-auth-item" 
            :class="{ success: form.faceAuthDone }"
            @click="handleFaceAuth"
          >
            <view class="left-info">
              <view class="icon-box" :class="{ success: form.faceAuthDone }">
                <t-icon 
                  :name="form.faceAuthDone ? 'check' : 'user-smile'" 
                  size="40rpx" 
                  :color="form.faceAuthDone ? '#10B981' : '#3B82F6'" 
                />
              </view>
              <text class="label">{{ form.faceAuthDone ? '已完成人脸识别' : '去完成人脸识别' }}</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" v-if="!form.faceAuthDone" />
          </view>
        </view>

        <view class="protocol-row" @click="isAgreed = !isAgreed">
          <t-icon 
            :name="isAgreed ? 'check-circle-filled' : 'circle'" 
            size="36rpx" 
            :color="isAgreed ? '@primary-blue' : '#CBD5E1'" 
          />
          <view class="protocol-text">
            阅读并同意<text class="link" @click.stop="handleViewProtocol">《实名认证服务协议》</text>
          </view>
        </view>
      </view>

      <view class="bottom-padding"></view>
    </scroll-view>

    <view class="footer-actions">
      <t-button 
        theme="primary" 
        size="large" 
        block 
        shape="round"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        提交认证
      </t-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const isAgreed = ref(false);
const counting = ref(false);
const count = ref(60);
let timer: any = null;

const form = reactive({
  idCardFront: '',
  idCardBack: '',
  phone: '',
  code: '',
  faceAuthDone: false
});

const canSubmit = computed(() => {
  return (
    form.idCardFront &&
    form.idCardBack &&
    form.phone.length === 11 &&
    form.code.length === 6 &&
    form.faceAuthDone &&
    isAgreed.value
  );
});

const isValidPhone = computed(() => {
  return /^1[3-9]\d{9}$/.test(form.phone);
});

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

const handleViewProtocol = () => {
  uni.showModal({
    title: '实名认证服务协议',
    content: '这里是协议内容预览...',
    showCancel: false
  });
};

const handleUpload = (type: 'front' | 'back') => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const path = res.tempFilePaths[0];
      if (!path) return;
      if (type === 'front') {
        form.idCardFront = path;
      } else {
        form.idCardBack = path;
      }
    }
  });
};

const handleGetCode = () => {
  if (counting.value || form.phone.length !== 11) return;
  
  uni.showToast({
    title: '验证码已发送',
    icon: 'none'
  });
  
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

const handleFaceAuth = () => {
  if (form.faceAuthDone) return;
  
  uni.showLoading({ title: '启动人脸识别' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showModal({
      title: '人脸识别',
      content: '模拟人脸识别成功',
      showCancel: false,
      success: () => {
        form.faceAuthDone = true;
      }
    });
  }, 1500);
};

const handleSubmit = () => {
  uni.showLoading({ title: '提交审核中' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '提交成功，请耐心等待审核',
      icon: 'success',
      duration: 2000
    });
    setTimeout(() => {
      handleBack();
    }, 2000);
  }, 1500);
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

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
  --td-navbar-color: #1E293B;
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

.auth-scroll {
  flex: 1;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  padding: 20rpx @page-padding;
}

.section-card {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 8rpx;
    height: 30rpx;
    background: @primary-blue;
    border-radius: 4rpx;
    margin-right: 16rpx;
  }
}

.id-card-grid {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;

  .id-card-item {
    flex: 1;
    height: 240rpx;
    background: #F8FAFC;
    border: 2rpx dashed #E2E8F0;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:active {
      background: #F1F5F9;
      transform: scale(0.98);
    }

    .upload-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;

      .upload-text {
        font-size: 24rpx;
        color: #64748B;
        font-weight: 500;
      }
    }

    .preview-img {
      width: 100%;
      height: 100%;
    }

    .re-upload {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(4px);
      color: #FFFFFF;
      font-size: 22rpx;
      text-align: center;
      padding: 10rpx 0;
      font-weight: 500;
    }
  }
}

.tips {
  font-size: 24rpx;
  color: #94A3B8;
  line-height: 1.6;
  padding: 0 4rpx;
}

.mt-24 { margin-top: 24rpx; }

.input-group {
  :deep(.t-input) {
    padding: 24rpx 0;
    --td-input-label-color: #64748B;
    --td-input-placeholder-color: #94A3B8;
    
    &::after {
      left: 0;
      right: 0;
      border-bottom-color: #F1F5F9;
    }
  }
}

.code-btn {
  font-size: 26rpx;
  color: @primary-blue;
  font-weight: 600;
  padding: 12rpx 20rpx;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 30rpx;
  transition: all 0.3s;

  &:active {
    opacity: 0.7;
  }

  &.disabled {
    color: #94A3B8;
    background: #F1F5F9;
  }
}

.face-auth-item {
  height: 110rpx;
  background: #F8FAFC;
  border-radius: 16rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    background: #F1F5F9;
    transform: scale(0.99);
  }

  &.success {
    background: #F0FDF4;
    .label { color: #10B981; }
  }

  .left-info {
    display: flex;
    align-items: center;
    gap: 20rpx;

    .icon-box {
      width: 64rpx;
      height: 64rpx;
      background: rgba(59, 130, 246, 0.1);
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &.success {
        background: rgba(16, 185, 129, 0.1);
      }
    }

    .label {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 600;
    }
  }
}

.protocol-row {
  margin-top: 48rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  justify-content: center;

  .protocol-text {
    font-size: 26rpx;
    color: #64748B;

    .link {
      color: @primary-blue;
      font-weight: 500;
    }
  }
}

.bottom-padding {
  height: 200rpx;
}

.footer-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  padding: 30rpx 40rpx calc(30rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.05);
  z-index: 100;

  :deep(.t-button) {
    --td-button-primary-bg-color: @primary-blue;
    --td-button-primary-border-color: @primary-blue;
    font-weight: 600;
    height: 88rpx;
    box-shadow: 0 8rpx 20rpx rgba(59, 130, 246, 0.2);
    
    &.t-is-disabled {
      opacity: 0.5;
      background: #CBD5E1;
      border-color: #CBD5E1;
      box-shadow: none;
    }
  }
}
</style>
