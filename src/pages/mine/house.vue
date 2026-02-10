<template>
  <view class="page-container">
    <t-navbar
      title="我的房屋"
      left-arrow
      @go-back="handleBack"
      :fixed="false"
      class="custom-navbar"
    />

    <view class="header-bg"></view>

    <view class="content-section">
      <!-- 1. House List -->
      <view class="house-list">
        <view 
          v-for="(item, index) in houseList" 
          :key="index" 
          class="house-card"
          :class="{ active: item.isDefault }"
        >
          <view class="default-badge" v-if="item.isDefault">默认</view>
          <view class="card-header">
            <view class="title-row">
              <view class="home-icon">
                <t-icon name="home" size="44rpx" color="#3B82F6" />
              </view>
              <text class="house-name">{{ item.name }}</text>
            </view>
            <view class="status-tag" :class="item.statusType">
              <t-icon name="check-circle-filled" size="24rpx" />
              <text>{{ item.status }}</text>
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
  },
  {
    name: '翡翠江景 3-2-1501',
    address: '江西省赣州市章贡区章江北大道88号',
    area: '138.2',
    role: '业主',
    status: '已认证',
    statusType: 'verified',
    isDefault: false
  }
]);

const handleBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({
        url: '/pages/mine/mine'
      });
    }
  });
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
  position: relative;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280rpx;
  background: linear-gradient(180deg, #F1F5F9 0%, #F8FAFC 100%);
  z-index: 0;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
  border-bottom: 1rpx solid #F1F5F9;
}

.content-section {
  position: relative;
  z-index: 1;
  padding: 40rpx @page-padding;
}

.house-list {
  .house-card {
    background: #FFFFFF;
    border-radius: @radius-large;
    padding: 40rpx 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.03);
    border: 1px solid #FFFFFF;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.active {
      box-shadow: 0 12rpx 32rpx rgba(59, 130, 246, 0.08);
      border-color: rgba(59, 130, 246, 0.1);
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 8rpx;
        height: 100%;
        background: @primary-blue;
      }
    }

    .default-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: @primary-blue;
      color: #fff;
      font-size: 20rpx;
      padding: 4rpx 16rpx;
      border-bottom-left-radius: 16rpx;
      font-weight: 600;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 36rpx;

      .title-row {
        display: flex;
        align-items: center;
        gap: 20rpx;
        flex: 1;

        .home-icon {
          width: 80rpx;
          height: 80rpx;
          background: #EFF6FF;
          border-radius: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .house-name {
          font-size: 32rpx;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.4;
        }
      }

      .status-tag {
        display: flex;
        align-items: center;
        gap: 6rpx;
        font-size: 22rpx;
        padding: 6rpx 16rpx;
        border-radius: 24rpx;
        font-weight: 600;
        
        &.verified {
          background: #F0FDF4;
          color: #10B981;
        }
      }
    }

    .card-body {
      padding: 32rpx;
      background: #F8FAFC;
      border-radius: 20rpx;
      margin-bottom: 32rpx;

      .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20rpx;
        
        &:last-child {
          margin-bottom: 0;
        }

        .label {
          font-size: 26rpx;
          color: #64748B;
        }

        .value {
          font-size: 26rpx;
          color: #1E293B;
          font-weight: 600;
        }
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .default-setting {
        display: flex;
        align-items: center;
        gap: 12rpx;
        
        text {
          font-size: 26rpx;
          color: #94A3B8;
          font-weight: 500;
          
          &.active {
            color: @primary-blue;
            font-weight: 700;
          }
        }
      }

      .actions {
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8rpx;
          padding: 12rpx 24rpx;
          background: #F1F5F9;
          border-radius: 30rpx;
          
          text {
            font-size: 24rpx;
            color: #64748B;
            font-weight: 600;
          }

          &:active {
            background: #FEF2F2;
            text { color: #EF4444; }
          }
        }
      }
    }
  }
}

.add-section {
  margin-top: 60rpx;
  
  :deep(.t-button) {
    border-radius: 48rpx;
    height: 100rpx;
    border-style: dashed;
    border-width: 2rpx;
    background: #FFFFFF;
    color: @primary-blue;
    font-weight: 700;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

    &:active {
      background: #EFF6FF;
      transform: translateY(2rpx);
    }
  }
}

.tips-section {
  margin-top: 48rpx;
  display: flex;
  gap: 16rpx;
  padding: 32rpx;
  background: #F8FAFC;
  border-radius: 20rpx;
  border: 1px solid #F1F5F9;

  .tip-text {
    font-size: 24rpx;
    color: #94A3B8;
    line-height: 1.6;
    flex: 1;
  }
}
</style>
