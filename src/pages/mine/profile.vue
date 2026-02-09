<template>
  <view class="page-container">
    <t-navbar
      title="个人信息"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <view class="content-section">
      <!-- 1. Avatar Section -->
      <view class="avatar-card">
        <view class="avatar-wrapper" @click="handleUpdateAvatar">
          <t-avatar 
            size="160rpx" 
            icon="user"
            class="main-avatar"
          />
          <view class="camera-icon">
            <t-icon name="camera" size="32rpx" color="#FFFFFF" />
          </view>
        </view>
        <text class="avatar-tip">点击更换头像</text>
      </view>

      <!-- 2. Basic Info Group -->
      <view class="info-group">
        <view class="group-title">基本信息</view>
        <view class="card-box">
          <t-cell title="姓名" :note="userInfo.name" arrow @click="handleEdit('name')" />
          <t-cell title="性别" :note="userInfo.gender" arrow @click="handleEdit('gender')" />
          <t-cell title="生日" :note="userInfo.birthday" arrow @click="handleEdit('birthday')" />
          <t-cell title="手机号" :note="userInfo.phone" arrow @click="handleEdit('phone')" />
        </view>
      </view>

      <!-- 3. Security Group -->
      <view class="info-group">
        <view class="group-title">账号安全</view>
        <view class="card-box">
          <t-cell title="实名认证">
            <template #note>
              <view class="tag-box">
                <text class="tag verified">已认证</text>
              </view>
            </template>
          </t-cell>
          <t-cell title="微信绑定">
            <template #note>
              <view class="wechat-note">
                <t-icon name="logo-wechat-stroke" size="36rpx" color="#07C160" />
                <text class="note-text">已绑定</text>
              </view>
            </template>
          </t-cell>
        </view>
      </view>

      <!-- 4. Save Button -->
      <view class="btn-section">
        <t-button theme="primary" block size="large" @click="handleSave">保存修改</t-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const userInfo = reactive({
  name: '刘泽辉',
  gender: '男',
  birthday: '1995-06-15',
  phone: '138****6666',
  avatar: ''
});

const handleBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    // 如果没有历史记录（比如直接刷新页面），则回到我的页面
    uni.switchTab({
      url: '/pages/mine/mine'
    });
  }
};

const handleUpdateAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 模拟上传
      uni.showLoading({ title: '上传中...' });
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({ title: '头像更新成功' });
      }, 1000);
    }
  });
};

const handleEdit = (type: string) => {
  uni.showToast({
    title: '编辑' + type + '功能开发中',
    icon: 'none'
  });
};

const handleSave = () => {
  uni.showLoading({ title: '保存中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '保存成功' });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }, 1000);
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  padding-top: 100rpx; // Space for fixed navbar
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.content-section {
  padding: 40rpx @page-padding;
}

.avatar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
  background: #FFFFFF;
  border-radius: @radius-large;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

  .avatar-wrapper {
    position: relative;
    
    .main-avatar {
      border: 6rpx solid #F1F5F9;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
    }

    .camera-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 48rpx;
      height: 48rpx;
      background: #3B82F6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4rpx solid #FFFFFF;
    }
  }

  .avatar-tip {
    margin-top: 24rpx;
    font-size: 24rpx;
    color: #94A3B8;
  }
}

.info-group {
  margin-bottom: 40rpx;

  .group-title {
    font-size: 28rpx;
    color: #64748B;
    margin-bottom: 16rpx;
    margin-left: 8rpx;
    font-weight: 500;
  }

  .card-box {
    background: #FFFFFF;
    border-radius: @radius-large;
    overflow: hidden;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

    :deep(.t-cell) {
      padding: 32rpx;
      
      .t-cell__title {
        font-size: 30rpx;
        color: #1E293B;
      }

      .t-cell__note {
        font-size: 28rpx;
        color: #64748B;
      }
    }
  }
}

.tag-box {
  .tag {
    padding: 4rpx 16rpx;
    border-radius: 20rpx;
    font-size: 22rpx;
    
    &.verified {
      background: #ECFDF5;
      color: #10B981;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
  }
}

.wechat-note {
  display: flex;
  align-items: center;

  .note-text {
    margin-left: 12rpx;
    font-size: 28rpx;
    color: #64748B;
  }
}

.btn-section {
  margin-top: 80rpx;
  padding-bottom: 60rpx;

  :deep(.t-button) {
    border-radius: @radius-large;
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 600;
  }
}
</style>
