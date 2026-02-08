<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="custom-header">
      <view class="back-btn" @click="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#333" />
      </view>
      <text class="header-title">发布诉求</text>
      <view class="placeholder"></view>
    </view>

    <scroll-view scroll-y class="form-content">
      <view class="form-wrapper">
        <!-- 2. Suggestion Type -->
        <view class="form-section">
          <view class="section-title">
            <view class="title-bar"></view>
            <text>建议类型</text>
            <text class="required">*</text>
          </view>
          <view class="type-selector">
            <view 
              v-for="type in types" 
              :key="type"
              class="type-item"
              :class="{ active: formData.type === type }"
              @click="formData.type = type"
            >
              {{ type }}
            </view>
          </view>
        </view>

        <!-- 3. Community -->
        <view class="form-section">
          <view class="section-title">
            <view class="title-bar"></view>
            <text>所属小区</text>
            <text class="required">*</text>
          </view>
          <picker 
            :range="communities" 
            @change="handleCommunityChange"
          >
            <view class="picker-box">
              <text :class="{ 'placeholder-text': !formData.community }">
                {{ formData.community || '请选择所属小区' }}
              </text>
              <t-icon name="chevron-down" size="32rpx" color="#94A3B8" />
            </view>
          </picker>
        </view>

        <!-- 4. Upload Materials -->
        <view class="form-section">
          <view class="section-title">
            <view class="title-bar"></view>
            <text>上传相关材料</text>
          </view>
          <view class="upload-container">
            <view class="upload-grid">
              <view 
                v-for="(img, index) in formData.images" 
                :key="index"
                class="upload-item"
              >
                <image :src="img" mode="aspectFill" />
                <view class="delete-btn" @click.stop="removeImage(index)">
                  <t-icon name="close" size="24rpx" color="#fff" />
                </view>
              </view>
              <view 
                v-if="formData.images.length < 8"
                class="upload-btn" 
                @click="handleUpload"
              >
                <t-icon name="add" size="64rpx" color="#CBD5E1" />
              </view>
            </view>
            <view class="upload-tips">
              提示：限制照片数量不超过8张，单张照片大小不超过5MB。建议上传2张以上照片，能反映周边环境，以便工作人员快速确定位置。
            </view>
          </view>
        </view>

        <!-- 5. Content Description -->
        <view class="form-section">
          <view class="section-title space-between">
            <view class="title-left">
              <view class="title-bar"></view>
              <text>内容描述</text>
            </view>
            <view class="input-mode-toggle">
              <view class="toggle-bg">
                <text class="toggle-text">文字</text>
                <view class="toggle-slider"></view>
              </view>
            </view>
          </view>
          <view class="textarea-box">
            <textarea 
              v-model="formData.description"
              placeholder="提示：详细准确的描述问题有助于加快处置速度。"
              placeholder-style="color: #94A3B8"
              maxlength="500"
            />
          </view>
        </view>

        <!-- 6. Contact Name -->
        <view class="form-section">
          <view class="section-title">
            <view class="title-bar"></view>
            <text>联系人</text>
            <text class="required">*</text>
          </view>
          <view class="input-box">
            <input 
              type="text" 
              v-model="formData.contactName"
              placeholder="请输入您的名字"
              placeholder-style="color: #94A3B8"
            />
          </view>
        </view>

        <!-- 7. Contact Phone -->
        <view class="form-section">
          <view class="section-title">
            <view class="title-bar"></view>
            <text>联系人手机</text>
            <text class="required">*</text>
          </view>
          <view class="input-box">
            <input 
              type="number" 
              v-model="formData.contactPhone"
              placeholder="请输入您的手机号"
              placeholder-style="color: #94A3B8"
              maxlength="11"
            />
          </view>
        </view>

        <!-- 8. Agreement -->
        <view class="agreement-section">
          <view class="checkbox-box" @click="formData.agreed = !formData.agreed">
            <view class="custom-checkbox" :class="{ checked: formData.agreed }">
              <t-icon v-if="formData.agreed" name="check" size="24rpx" color="#fff" />
            </view>
            <text class="agreement-text">
              我确认所反映的问题客观、真实，且严格遵守国家有关的法律法规及其他相关规定。
            </text>
          </view>
        </view>

        <!-- 9. Submit Button -->
        <view class="submit-section">
          <button class="submit-btn" :disabled="!isFormValid" @click="handleSubmit">
            提交
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const types = ['诉求', '建议', '咨询'];
const communities = ['理想之城 1号楼', '理想之城 2号楼', '理想之城 3号楼'];

const formData = reactive({
  type: '诉求',
  community: '',
  images: [] as string[],
  description: '',
  contactName: '',
  contactPhone: '',
  agreed: false
});

const isFormValid = computed(() => {
  return formData.type && 
         formData.community && 
         formData.contactName && 
         formData.contactPhone.length === 11 && 
         formData.agreed;
});

const goBack = () => {
  uni.navigateBack();
};

const handleCommunityChange = (e: any) => {
  formData.community = communities[e.detail.value];
};

const handleUpload = () => {
  uni.chooseImage({
    count: 8 - formData.images.length,
    success: (res) => {
      formData.images = [...formData.images, ...res.tempFilePaths];
    }
  });
};

const removeImage = (index: number) => {
  formData.images.splice(index, 1);
};

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  uni.showLoading({ title: '提交中...' });
  
  // 模拟提交
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    });
  }, 1500);
};
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.custom-header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  border-bottom: 1rpx solid #F1F5F9;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;

  .back-btn {
    width: 88rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    font-size: 34rpx;
    font-weight: 600;
    color: #1E293B;
  }

  .placeholder {
    width: 88rpx;
  }
}

.form-content {
  flex: 1;
}

.form-wrapper {
  padding: 40rpx;
}

.form-section {
  margin-bottom: 48rpx;

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #1E293B;

    &.space-between {
      justify-content: space-between;
    }

    .title-left {
      display: flex;
      align-items: center;
    }

    .title-bar {
      width: 8rpx;
      height: 32rpx;
      background-color: #3B82F6;
      border-radius: 4rpx;
      margin-right: 16rpx;
    }

    .required {
      color: #EF4444;
      margin-left: 8rpx;
    }
  }
}

.type-selector {
  display: flex;
  gap: 20rpx;

  .type-item {
    flex: 1;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F8FAFC;
    border: 2rpx solid transparent;
    border-radius: 12rpx;
    font-size: 28rpx;
    color: #64748B;
    transition: all 0.2s;

    &.active {
      background-color: #fff;
      border-color: #3B82F6;
      color: #3B82F6;
      font-weight: 500;
    }
  }
}

.picker-box, .input-box {
    height: 88rpx;
    background-color: #F8FAFC;
    border-radius: 12rpx;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #1E293B;

    .placeholder-text {
      color: #94A3B8;
    }

    input {
      width: 100%;
      height: 100%;
    }
  }

  .textarea-box {
    background-color: #F8FAFC;
    border-radius: 12rpx;
    padding: 24rpx 32rpx;
    height: 320rpx;

    textarea {
      width: 100%;
      height: 100%;
      font-size: 28rpx;
      color: #1E293B;
      line-height: 1.6;
    }
  }

.upload-container {
  .upload-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;
    margin-bottom: 20rpx;
  }

  .upload-item, .upload-btn {
    aspect-ratio: 1;
    background-color: #F8FAFC;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }

    .delete-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 40rpx;
      height: 40rpx;
      background-color: rgba(0, 0, 0, 0.5);
      border-bottom-left-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .upload-tips {
    font-size: 24rpx;
    color: #94A3B8;
    line-height: 1.6;
  }
}

.input-mode-toggle {
  .toggle-bg {
    width: 130rpx;
    height: 52rpx;
    background-color: #3B82F6;
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    padding: 0 6rpx;
    position: relative;

    .toggle-text {
      font-size: 24rpx;
      color: #fff;
      margin-left: 20rpx;
      font-weight: 500;
    }

    .toggle-slider {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      background-color: #fff;
      border-radius: 50%;
      right: 6rpx;
      transition: all 0.3s;
    }
  }
}



.agreement-section {
  margin: 40rpx 0;

  .checkbox-box {
    display: flex;
    gap: 20rpx;
    align-items: flex-start;
  }

  .custom-checkbox {
    width: 40rpx;
    height: 40rpx;
    border: 2rpx solid #CBD5E1;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 4rpx;

    &.checked {
      background-color: #3B82F6;
      border-color: #3B82F6;
    }
  }

  .agreement-text {
    font-size: 26rpx;
    color: #64748B;
    line-height: 1.5;
  }
}

.submit-section {
  margin-top: 60rpx;
  padding-bottom: 60rpx;

  .submit-btn {
    height: 96rpx;
    background-color: #3B82F6;
    color: #fff;
    border-radius: 48rpx;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;

    &[disabled] {
      background-color: #93C5FD;
      opacity: 0.7;
    }

    &:active {
      opacity: 0.9;
    }
  }
}
</style>
