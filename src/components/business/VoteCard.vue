<template>
  <view 
    class="vote-card"
    @click="handleClick"
  >
    <view class="card-header">
      <view class="time-info">
        <text>投票时间：{{ vote.startTime }} 至 {{ vote.endTime }}</text>
      </view>
      <view class="status-tag" :class="vote.statusType">
        {{ vote.statusText }}
      </view>
    </view>
    
    <view class="card-content">
      <text class="vote-title">{{ vote.title }}</text>
    </view>
    
    <view class="card-footer">
      <view class="participants">
        <t-icon name="user" size="24rpx" color="#94A3B8" />
        <text>{{ vote.participants }}人已参与</text>
      </view>
      <view class="action-btn" :class="vote.statusType">
        {{ vote.statusType === 'ongoing' ? '立即投票' : '查看结果' }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface VoteItem {
  id: number | string;
  title: string;
  startTime: string;
  endTime: string;
  statusText: string;
  statusType: 'ongoing' | 'ended' | string;
  participants: number;
}

const props = defineProps<{
  vote: VoteItem;
}>();

const emit = defineEmits<{
  (e: 'click', vote: VoteItem): void;
}>();

const handleClick = () => {
  emit('click', props.vote);
};
</script>

<style lang="less" scoped>
.vote-card {
  background: #fff;
  border-radius: 28rpx;
  padding: 32rpx;
  margin-bottom: 28rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.03);
  border: 1rpx solid rgba(241, 245, 249, 0.8);
  transition: all 0.2s;

  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.02);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24rpx;

    .time-info {
      display: flex;
      align-items: center;
      gap: 8rpx;
      font-size: 22rpx;
      color: #94A3B8;

      &::before {
        content: '';
        width: 8rpx;
        height: 8rpx;
        border-radius: 50%;
        background: #CBD5E1;
      }
    }

    .status-tag {
      font-size: 20rpx;
      padding: 6rpx 16rpx;
      border-radius: 10rpx;
      font-weight: 600;

      &.ongoing {
        background: #FEF2F2;
        color: #EF4444;
      }

      &.ended {
        background: #F1F5F9;
        color: #64748B;
      }
    }
  }

  .card-content {
    margin-bottom: 32rpx;

    .vote-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1E293B;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 28rpx;
    border-top: 2rpx dashed #F1F5F9;

    .participants {
      display: flex;
      align-items: center;
      gap: 10rpx;
      
      text {
        font-size: 24rpx;
        color: #64748B;
        font-weight: 500;
      }
    }

    .action-btn {
      font-size: 26rpx;
      padding: 12rpx 36rpx;
      border-radius: 30rpx;
      font-weight: 600;
      transition: all 0.2s;

      &.ongoing {
        background: #3B82F6;
        color: #FFFFFF;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.2);
      }

      &.ended {
        background: #F1F5F9;
        color: #94A3B8;
      }
    }
  }
}
</style>
