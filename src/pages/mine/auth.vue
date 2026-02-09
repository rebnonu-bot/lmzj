<template>
  <view class="page-container">
    <t-navbar
      title="实名认证"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <scroll-view scroll-y class="auth-scroll">
      <view class="content-wrapper">
        <!-- 1. ID Card Section -->
        <view class="section-card">
          <view class="section-title">身份证上传</view>
          <view class="id-card-grid">
            <view class="id-card-item" @click="handleUpload('front')">
              <view class="upload-box" v-if="!form.idCardFront">
                <t-icon name="camera" size="64rpx" color="#94A3B8" />
                <text class="upload-text">上传身份证人像面</text>
              </view>
              <image v-else :src="form.idCardFront" mode="aspectFit" class="preview-img" />
              <view class="re-upload" v-if="form.idCardFront">点击重传</view>
            </view>
            
            <view class="id-card-item" @click="handleUpload('back')">
              <view class="upload-box" v-if="!form.idCardBack">
                <t-icon name="camera" size="64rpx" color="#94A3B8" />
                <text class="upload-text">上传身份证国徽面</text>
              </view>
              <image v-else :src="form.idCardBack" mode="aspectFit" class="preview-img" />
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
            />
            <view class="verify-code-row">
              <t-input
                v-model="form.code"
                label="验证码"
                placeholder="请输入验证码"
                type="number"
                maxlength="6"
              >
                <template #suffix>
                  <view 
                    class="code-btn" 
                    :class="{ disabled: counting }" 
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
              <t-icon 
                :name="form.faceAuthDone ? 'check-circle-filled' : 'user-smile'" 
                size="48rpx" 
                :color="form.faceAuthDone ? '#10B981' : '#3B82F6'" 
              />
              <text class="label">{{ form.faceAuthDone ? '已完成人脸识别' : '去完成人脸识别' }}</text>
            </view>
            <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" v-if="!form.faceAuthDone" />
          </view>
        </view>

        <view class="protocol-row">
          <t-icon 
            :name="isAgreed ? 'check-circle-filled' : 'circle'" 
            size="32rpx" 
            :color="isAgreed ? '#3B82F6' : '#CBD5E1'" 
            @click="isAgreed = !isAgreed"
          />
          <view class="protocol-text">
            阅读并同意<text class="link">《实名认证服务协议》</text>
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
      uni.navigateBack();
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
  padding-top: 100rpx;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.auth-scroll {
  flex: 1;
}

.content-wrapper {
  padding: 30rpx @page-padding;
}

.section-card {
  background: #FFFFFF;
  border-radius: @radius-large;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.02);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 8rpx;
    height: 32rpx;
    background: #3B82F6;
    border-radius: 4rpx;
    margin-right: 16rpx;
  }
}

.id-card-grid {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;

  .id-card-item {
    flex: 1;
    height: 220rpx;
    background: #F8FAFC;
    border: 2rpx dashed #CBD5E1;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .upload-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12rpx;

      .upload-text {
        font-size: 24rpx;
        color: #94A3B8;
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
      background: rgba(0, 0, 0, 0.5);
      color: #FFFFFF;
      font-size: 22rpx;
      text-align: center;
      padding: 8rpx 0;
    }
  }
}

.tips {
  font-size: 24rpx;
  color: #94A3B8;
  line-height: 1.4;
}

.mt-24 { margin-top: 24rpx; }

.input-group {
  :deep(.t-input) {
    padding-left: 0;
    padding-right: 0;
  }
}

.code-btn {
  font-size: 26rpx;
  color: #3B82F6;
  font-weight: 500;
  padding: 10rpx 0;

  &.disabled {
    color: #CBD5E1;
  }
}

.face-auth-item {
  height: 100rpx;
  background: #F8FAFC;
  border-radius: 12rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.success {
    background: #ECFDF5;
    .label { color: #10B981; }
  }

  .left-info {
    display: flex;
    align-items: center;
    gap: 16rpx;

    .label {
      font-size: 28rpx;
      color: #1E293B;
      font-weight: 500;
    }
  }
}

.protocol-row {
  margin-top: 40rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  justify-content: center;

  .protocol-text {
    font-size: 26rpx;
    color: #64748B;

    .link {
      color: #3B82F6;
    }
  }
}

.bottom-padding {
  height: 180rpx;
}

.footer-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #FFFFFF;
  padding: 30rpx @page-padding calc(30rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}
</style>
