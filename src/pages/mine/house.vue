<template>
  <view class="page-container">
    <t-navbar
      title="我的房屋"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <view class="content-section">
      <!-- 1. House List -->
      <view class="house-list">
        <view 
          v-for="(item, index) in houseList" 
          :key="index" 
          class="house-card"
          :class="{ active: item.isDefault }"
        >
          <view class="card-header">
            <view class="title-row">
              <t-icon name="home" size="40rpx" color="#3B82F6" />
              <text class="house-name">{{ item.name }}</text>
            </view>
            <view class="status-tag" :class="item.statusType">
              {{ item.status }}
            </view>
          </view>
          
          <view class="card-body">
            <view class="info-row">
              <text class="label">详细地址</text>
              <text class="value">{{ item.address }}</text>
            </view>
            <view class="info-row">
              <text class="label">建筑面积</text>
              <text class="value">{{ item.area }} ㎡</text>
            </view>
            <view class="info-row">
              <text class="label">身份角色</text>
              <text class="value">{{ item.role }}</text>
            </view>
          </view>

          <view class="card-footer">
            <view class="default-setting" @click="handleSetDefault(index)">
              <t-icon 
                :name="item.isDefault ? 'check-circle-filled' : 'circle'" 
                size="36rpx" 
                :color="item.isDefault ? '#3B82F6' : '#CBD5E1'" 
              />
              <text :class="{ active: item.isDefault }">默认房屋</text>
            </view>
            <view class="actions">
              <view class="action-btn" @click="handleUnbind(index)">
                <t-icon name="delete" size="32rpx" color="#94A3B8" />
                <text>解绑</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 2. Add House Button -->
      <view class="add-section">
        <t-button 
          theme="primary" 
          block 
          variant="outline" 
          size="large" 
          @click="handleAddHouse"
        >
          <template #icon>
            <t-icon name="add" size="40rpx" />
          </template>
          添加/绑定房屋
        </t-button>
      </view>

      <!-- 3. Tips -->
      <view class="tips-section">
        <t-icon name="info-circle" size="32rpx" color="#94A3B8" />
        <text class="tip-text">房屋信息将作为您参与社区自治、缴费等服务的基础依据，请务必填写真实信息。</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const houseList = ref([
  {
    name: '阳光水岸一期 1-1-802',
    address: '江西省赣州市章贡区阳光大道1号',
    area: '124.5',
    role: '业主',
    status: '已认证',
    statusType: 'verified',
    isDefault: true
  },
  {
    name: '阳光水岸二期 5-1-1202',
    address: '江西省赣州市章贡区阳光大道1号',
    area: '98.5',
    role: '业主',
    status: '已认证',
    statusType: 'verified',
    isDefault: false
  }
]);

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

const handleSetDefault = (index: number) => {
  houseList.value.forEach((item, i) => {
    item.isDefault = i === index;
  });
  uni.showToast({
    title: '已设为默认房屋',
    icon: 'success'
  });
};

const handleUnbind = (index: number) => {
  uni.showModal({
    title: '解绑确认',
    content: '确定要解绑该房屋吗？解绑后将无法使用相关服务。',
    confirmColor: '#EF4444',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '处理中...' });
        setTimeout(() => {
          uni.hideLoading();
          uni.showToast({ title: '已提交解绑申请' });
        }, 1000);
      }
    }
  });
};

const handleAddHouse = () => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  padding-top: 100rpx;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.content-section {
  padding: 40rpx @page-padding;
}

.house-list {
  .house-card {
    background: #FFFFFF;
    border-radius: @radius-large;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
    border: 2rpx solid transparent;
    transition: all 0.3s;

    &.active {
      border-color: rgba(59, 130, 246, 0.2);
      background: linear-gradient(to bottom right, #FFFFFF, #F8FAFF);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32rpx;

      .title-row {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .house-name {
          font-size: 32rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .status-tag {
        font-size: 22rpx;
        padding: 4rpx 16rpx;
        border-radius: 6rpx;
        
        &.verified {
          background: #ECFDF5;
          color: #10B981;
        }
      }
    }

    .card-body {
      padding-bottom: 32rpx;
      border-bottom: 1rpx solid #F1F5F9;

      .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        
        &:last-child {
          margin-bottom: 0;
        }

        .label {
          font-size: 26rpx;
          color: #94A3B8;
        }

        .value {
          font-size: 26rpx;
          color: #475569;
          font-weight: 500;
        }
      }
    }

    .card-footer {
      padding-top: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .default-setting {
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        text {
          font-size: 26rpx;
          color: #94A3B8;
          
          &.active {
            color: #3B82F6;
            font-weight: 500;
          }
        }
      }

      .actions {
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          text {
            font-size: 26rpx;
            color: #94A3B8;
          }
        }
      }
    }
  }
}

.add-section {
  margin-top: 60rpx;
  
  :deep(.t-button) {
    border-radius: @radius-large;
    height: 100rpx;
    border-style: dashed;
    background: transparent;
  }
}

.tips-section {
  margin-top: 40rpx;
  display: flex;
  gap: 12rpx;
  padding: 0 8rpx;

  .tip-text {
    font-size: 24rpx;
    color: #94A3B8;
    line-height: 1.6;
  }
}
</style>
