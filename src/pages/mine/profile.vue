<template>
  <view class="page-container">
    <t-navbar
      title="个人信息"
      left-arrow
      @go-back="handleBack"
      :fixed="false"
      class="custom-navbar"
    >
      <template #left-icon>
        <t-icon name="chevron-left" size="48rpx" color="#1E293B" />
      </template>
    </t-navbar>

    <view class="content-section">
      <!-- 1. Info List -->
      <view class="info-list">
        <view class="card-box">
          <!-- Integrated Avatar Cell -->
          <t-cell arrow @click="handleUpdateAvatar" class="avatar-cell">
            <template #title>
              <view class="avatar-cell-content">
                <view class="avatar-wrapper">
                  <t-avatar size="100rpx" icon="user" class="main-avatar" />
                  <view class="camera-icon">
                    <t-icon name="camera" size="20rpx" color="#FFFFFF" />
                  </view>
                </view>
                <view class="avatar-info">
                  <text class="user-name">刘泽辉</text>
                  <text class="avatar-tip">点击更换头像</text>
                </view>
              </view>
            </template>
          </t-cell>
          <t-cell title="姓名" :note="userInfo.name" arrow @click="handleEdit('name')" />
          <t-cell title="性别" :note="userInfo.gender" arrow @click="handleEdit('gender')" />
          <t-cell title="生日" :note="userInfo.birthday" arrow @click="handleEdit('birthday')" />
          <t-cell title="手机号" :note="userInfo.phone" arrow @click="handleEdit('phone')" />
          <t-cell title="实名认证">
            <template #note>
              <view class="tag-box">
                <text class="tag verified">已认证</text>
              </view>
            </template>
          </t-cell>
          <t-cell title="微信绑定" borderless>
            <template #note>
              <view class="wechat-note">
                <t-icon name="logo-wechat-stroke" size="32rpx" color="#07C160" />
                <text class="note-text">已绑定</text>
              </view>
            </template>
          </t-cell>
        </view>
      </view>

      <!-- 3. Save Button -->
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
      handleBack();
    }, 1500);
  }, 1000);
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  position: relative;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.content-section {
  padding: 24rpx 24rpx;
}

.info-list {
  margin-bottom: 32rpx;

  .card-box {
    background: #FFFFFF;
    border-radius: 20rpx;
    overflow: hidden;
    border: 1px solid #F1F5F9;

    :deep(.t-cell) {
      padding: 28rpx 32rpx;
      
      &::after {
        left: 32rpx !important;
        right: 32rpx !important;
        background-color: #F8FAFC !important;
      }

      .t-cell__title {
        font-size: 28rpx;
        color: #64748B;
        display: flex;
        align-items: center;
      }

      .t-cell__note {
        font-size: 28rpx;
        color: #1E293B;
        font-weight: 500;
      }
    }

    .avatar-cell {
      :deep(.t-cell) {
        padding: 32rpx 32rpx;
      }

      .avatar-cell-content {
        display: flex;
        align-items: center;
        
        .avatar-wrapper {
          position: relative;
          
          .main-avatar {
            border: 2rpx solid #F1F5F9;
            :deep(.t-avatar) {
              background-color: #F8FAFC;
              color: @primary-blue;
            }
          }

          .camera-icon {
            position: absolute;
            right: -2rpx;
            bottom: -2rpx;
            width: 32rpx;
            height: 32rpx;
            background: @primary-blue;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2rpx solid #FFFFFF;
          }
        }

        .avatar-info {
          margin-left: 24rpx;
          display: flex;
          flex-direction: column;
          gap: 4rpx;

          .user-name {
            font-size: 32rpx;
            color: #1E293B;
            font-weight: 600;
          }

          .avatar-tip {
            font-size: 22rpx;
            color: #94A3B8;
            font-weight: normal;
          }
        }
      }
    }
  }
}

.tag-box {
  .tag {
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
    font-size: 20rpx;
    font-weight: 500;
    
    &.verified {
      background: #F0FDF4;
      color: #10B981;
    }
  }
}

.wechat-note {
  display: flex;
  align-items: center;

  .note-text {
    margin-left: 8rpx;
    font-size: 28rpx;
    color: #1E293B;
    font-weight: 500;
  }
}

.btn-section {
  margin-top: 48rpx;
  padding: 0 32rpx 40rpx;

  :deep(.t-button) {
    border-radius: 12rpx;
    height: 80rpx;
    font-size: 28rpx;
    font-weight: 600;
    background: @primary-blue;
    border: none;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
