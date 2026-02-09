<template>
  <view class="page-container">
    <t-navbar
      title="账单详情"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <scroll-view scroll-y class="detail-scroll">
      <!-- Top Amount Card -->
      <view class="amount-card">
        <view class="icon-box" :class="record.type">
          <t-icon :name="record.type === 'in' ? 'arrow-up' : 'arrow-down'" size="64rpx" color="#FFFFFF" />
        </view>
        <text class="title">{{ record.title }}</text>
        <text class="amount" :class="record.type">
          {{ record.type === 'in' ? '+' : '-' }}{{ formatAmount(record.amount) }}
        </text>
        <view class="status-tag">交易成功</view>
      </view>

      <!-- Details Section -->
      <view class="details-section">
        <view class="detail-row">
          <text class="label">当前状态</text>
          <text class="value">交易成功</text>
        </view>
        <view class="detail-row">
          <text class="label">收支类型</text>
          <text class="value">{{ record.type === 'in' ? '收入' : '支出' }}</text>
        </view>
        <view class="detail-row">
          <text class="label">业务分类</text>
          <text class="value">{{ record.category || '日常运营' }}</text>
        </view>
        <view class="detail-row">
          <text class="label">交易时间</text>
          <text class="value">{{ record.date }} {{ record.time || '10:00:00' }}</text>
        </view>
        <view class="detail-row">
          <text class="label">支付方式</text>
          <text class="value">银行转账</text>
        </view>
        <view class="detail-row">
          <text class="label">交易单号</text>
          <view class="value-with-copy">
            <text class="value">{{ record.orderNo }}</text>
            <t-icon name="copy" size="32rpx" color="#3B82F6" @click="handleCopy(record.orderNo)" />
          </view>
        </view>
        <view class="detail-row">
          <text class="label">收款方</text>
          <text class="value">阳光水岸一期业主委员会</text>
        </view>
        <view class="detail-row">
          <text class="label">备注信息</text>
          <text class="value">{{ record.remark || '无' }}</text>
        </view>
      </view>

      <!-- Actions -->
      <view class="action-buttons">
        <t-button theme="primary" variant="outline" block @click="handleCertificate">查看电子凭证</t-button>
        <t-button theme="default" block @click="handleAppeal">对此订单有疑问</t-button>
      </view>
    </scroll-view>

    <!-- Global Footer -->
    <app-footer />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

interface RecordDetail {
  title: string;
  amount: string;
  type: 'in' | 'out';
  date: string;
  time: string;
  category: string;
  orderNo: string;
  remark: string;
}

const record = ref<RecordDetail>({
  title: '电梯广告位租金收入',
  amount: '16000.00',
  type: 'in',
  date: '2026-02-01',
  time: '14:30:22',
  category: '广告收益',
  orderNo: 'TRX2026020188927731',
  remark: '2026年第一季度电梯广告租赁费用'
});

onLoad((options: any) => {
  if (options.data) {
    try {
      const data = JSON.parse(decodeURIComponent(options.data));
      record.value = {
        ...record.value,
        ...data,
        orderNo: data.orderNo || `TRX${data.date.replace(/-/g, '')}${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        remark: data.remark || `${data.date} ${data.title}`
      };
    } catch (e) {
      console.error('Failed to parse record data', e);
    }
  }
});

const handleBack = () => {
  uni.navigateBack();
};

const formatAmount = (amount: string) => {
  return parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
};

const handleCopy = (text: string) => {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '单号已复制', icon: 'none' });
    }
  });
};

const handleCertificate = () => {
  uni.showToast({ title: '凭证生成中...', icon: 'none' });
};

const handleAppeal = () => {
  uni.showToast({ title: '请联系物业管理处', icon: 'none' });
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

.detail-scroll {
  flex: 1;
}

.amount-card {
  background: #FFFFFF;
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2rpx solid #F1F5F9;

  .icon-box {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;

    &.in { background: #10B981; }
    &.out { background: #EF4444; }
  }

  .title {
    font-size: 32rpx;
    color: #1E293B;
    font-weight: 500;
    margin-bottom: 16rpx;
  }

  .amount {
    font-size: 64rpx;
    font-weight: 700;
    margin-bottom: 24rpx;

    &.in { color: #10B981; }
    &.out { color: #1E293B; }
  }

  .status-tag {
    font-size: 24rpx;
    color: #94A3B8;
    background: #F8FAFC;
    padding: 4rpx 20rpx;
    border-radius: 20rpx;
  }
}

.details-section {
  background: #FFFFFF;
  margin-top: 20rpx;
  padding: 20rpx 40rpx;

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #F1F5F9;

    &:last-child {
      border-bottom: none;
    }

    .label {
      font-size: 28rpx;
      color: #94A3B8;
      width: 180rpx;
    }

    .value {
      font-size: 28rpx;
      color: #1E293B;
      flex: 1;
      text-align: right;
    }

    .value-with-copy {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 12rpx;

      .value {
        text-align: right;
      }
    }
  }
}

.action-buttons {
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
</style>
