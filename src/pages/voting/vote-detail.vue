<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#333" />
        </view>
        <text class="page-title">参与投票</text>
      </view>
    </view>

    <!-- 2. Content Area -->
    <scroll-view class="content-section" scroll-y>
      <view class="scroll-content">
        <!-- Topic Info Card -->
        <view class="info-card">
          <view class="type-tag" :class="voteInfo.typeCode">{{ voteInfo.typeName }}</view>
          <view class="vote-title">{{ voteInfo.title }}</view>
          <view class="vote-meta">
            <view class="meta-item">
              <t-icon name="time" size="28rpx" color="#94A3B8" />
              <text>截止日期：{{ voteInfo.date }}</text>
            </view>
            <view class="meta-item">
              <t-icon name="user" size="28rpx" color="#94A3B8" />
              <text>发起方：业主委员会</text>
            </view>
          </view>
          <view class="vote-desc">
            {{ voteInfo.description || '暂无详细描述说明。' }}
          </view>
        </view>

        <!-- Vote Form Section -->
        <view class="form-section">
          <view class="section-title">请选择您的表决意愿</view>
          <view class="options-list">
            <view 
              v-for="(option, index) in voteOptions" 
              :key="index"
              class="option-item"
              :class="{ active: isSelected(option.value) }"
              @click="handleOptionClick(option.value)"
            >
              <view class="option-left">
                <view class="radio-circle" :class="{ checkbox: isMultiple }">
                  <view class="inner-circle" v-if="isSelected(option.value)"></view>
                </view>
                <text class="option-label">{{ option.label }}</text>
              </view>
              <t-icon 
                v-if="isSelected(option.value)" 
                name="check-circle-filled" 
                size="40rpx" 
                color="#3B82F6" 
              />
            </view>
          </view>

          <!-- Feedback/Comment -->
          <view class="comment-box">
            <view class="section-title">意见或建议（选填）</view>
            <textarea 
              v-model="comment"
              placeholder="请输入您的宝贵意见..."
              placeholder-style="color: #94A3B8"
              maxlength="200"
            />
            <view class="word-count">{{ comment.length }}/200</view>
          </view>
        </view>

        <!-- Safety Notice -->
        <view class="safety-notice">
          <t-icon name="info-circle" size="32rpx" color="#94A3B8" />
          <text>您的投票将经过实名认证加密处理，确保真实有效且隐私安全。</text>
        </view>
      </view>
    </scroll-view>

    <!-- 3. Bottom Action -->
    <view class="footer-section">
      <button 
        class="submit-btn" 
        :disabled="isMultiple ? selectedValues.length === 0 : !selectedOption"
        :class="{ disabled: isMultiple ? selectedValues.length === 0 : !selectedOption }"
        @click="handleSubmit"
      >
        确认提交
      </button>
    </view>

    <!-- Success Popup -->
    <t-popup v-model="showSuccess" placement="center">
      <view class="success-modal">
        <t-icon name="check-circle-filled" size="120rpx" color="#22C55E" />
        <text class="modal-title">投票提交成功</text>
        <text class="modal-desc">感谢您参与小区公共事务决策！</text>
        <button class="modal-btn" @click="handleSuccessConfirm">返回列表</button>
      </view>
    </t-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const voteInfo = ref({
  id: 1,
  title: '赣州市章贡区《阳光水岸》2026年度物业服务续聘表决',
  date: '2026-02-28',
  typeName: '重大事项',
  typeCode: 'major',
  description: '根据《民法典》及相关物业管理条例，现就本小区2026年度物业管理服务续聘事项进行业主大会表决。表决内容包括：1. 续聘现有物业服务企业；2. 维持现有物业服务费标准；3. 优化安保巡逻及绿化维护方案。请各位业主行使表决权。'
});

const options = [
  { label: '赞成', value: 'agree' },
  { label: '反对', value: 'disagree' },
  { label: '弃权', value: 'abstain' }
];

const selectedOption = ref('');
const comment = ref('');
const showSuccess = ref(false);

onLoad((options) => {
  if (options && options.id) {
    const id = parseInt(options.id as string);
    if (id === 3) {
      voteInfo.value = {
        id: 3,
        title: '赣州市章贡区《阳光水岸》第三届业主委员会选举',
        date: '2026-12-25',
        typeName: '业委会选举',
        typeCode: 'election',
        description: '本小区第二届业主委员会任期届满，现依法进行换届选举。请从以下候选人名单中选出您支持的5位委员。'
      };
      
      // 选举类选项
      voteOptions.value = [
        { label: '张三 (候选人)', value: 'candidate1' },
        { label: '李四 (候选人)', value: 'candidate2' },
        { label: '王五 (候选人)', value: 'candidate3' },
        { label: '赵六 (候选人)', value: 'candidate4' },
        { label: '孙七 (候选人)', value: 'candidate5' },
        { label: '周八 (候选人)', value: 'candidate6' },
        { label: '以上皆不支持', value: 'none' }
      ];
      isMultiple.value = true;
    } else {
      // 默认重大事项类
      voteOptions.value = [
        { label: '赞成', value: 'agree' },
        { label: '反对', value: 'disagree' },
        { label: '弃权', value: 'abstain' }
      ];
      isMultiple.value = false;
    }
  }
});

const voteOptions = ref<{ label: string; value: string }[]>([]);
const isMultiple = ref(false);
const selectedValues = ref<string[]>([]);

const handleOptionClick = (val: string) => {
  if (isMultiple.value) {
    const idx = selectedValues.value.indexOf(val);
    if (idx > -1) {
      selectedValues.value.splice(idx, 1);
    } else {
      if (val === 'none') {
        selectedValues.value = ['none'];
      } else {
        const noneIdx = selectedValues.value.indexOf('none');
        if (noneIdx > -1) selectedValues.value.splice(noneIdx, 1);
        if (selectedValues.value.length < 5) {
          selectedValues.value.push(val);
        } else {
          uni.showToast({ title: '最多只能选5位', icon: 'none' });
        }
      }
    }
  } else {
    selectedOption.value = val;
  }
};

const isSelected = (val: string) => {
  if (isMultiple.value) {
    return selectedValues.value.includes(val);
  }
  return selectedOption.value === val;
};

const goBack = () => {
  uni.navigateBack();
};

const handleSubmit = () => {
  if (!selectedOption.value) return;
  
  uni.showLoading({ title: '提交中...' });
  setTimeout(() => {
    uni.hideLoading();
    showSuccess.value = true;
  }, 1000);
};

const handleSuccessConfirm = () => {
  showSuccess.value = false;
  uni.navigateBack();
};
</script>

<style lang="less" scoped>
@import "@/styles/variable.less";

.page-container {
  height: 100vh;
  width: 100%;
  background-color: @bg-light-blue;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.header-section {
  flex-shrink: 0;
  width: 100%;
  padding-top: var(--status-bar-height);
  background-color: #fff;
  border-bottom: 1rpx solid #F1F5F9;
  box-sizing: border-box;

  .header-top {
    height: 88rpx;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 @page-padding;
    box-sizing: border-box;

    .back-btn {
      position: absolute;
      left: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      z-index: 10;
    }

    .page-title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 34rpx;
      font-weight: 600;
      color: @text-primary;
    }
  }
}

.content-section {
  flex: 1;
  height: 0;
  width: 100%;

  .scroll-content {
    padding: 30rpx @page-padding 40rpx;
    box-sizing: border-box;
    width: 100%;
  }
}

.info-card {
  background: #fff;
  border-radius: @radius-medium;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid #F1F5F9;

  .type-tag {
    display: inline-block;
    font-size: 22rpx;
    padding: 4rpx 16rpx;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
    font-weight: 600;

    &.major { background: #EEF2FF; color: #4F46E5; }
    &.repair { background: #FFF7ED; color: #EA580C; }
    &.election { background: #F0FDF4; color: #16A34A; }
    &.income { background: #FEF2F2; color: #DC2626; }
  }

  .vote-title {
    font-size: 36rpx;
    font-weight: 700;
    color: @text-primary;
    line-height: 1.4;
    margin-bottom: 24rpx;
  }

  .vote-meta {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    margin-bottom: 30rpx;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 12rpx;
      font-size: 26rpx;
      color: @text-secondary;
    }
  }

  .vote-desc {
    font-size: 28rpx;
    color: @text-secondary;
    line-height: 1.6;
    background: #F8FAFC;
    padding: 24rpx;
    border-radius: 12rpx;
    text-align: justify;
  }
}

.form-section {
  background: #fff;
  border-radius: @radius-medium;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid #F1F5F9;

  .section-title {
    font-size: 30rpx;
    font-weight: 700;
    color: @text-primary;
    margin-bottom: 30rpx;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 40rpx;

    .option-item {
      height: 110rpx;
      border: 2rpx solid #F1F5F9;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;
      transition: all 0.2s;

      &.active {
        border-color: @primary-blue;
        background: fade(@primary-blue, 4%);
        
        .option-label {
          color: @primary-blue;
          font-weight: 600;
        }

        .radio-circle {
          border-color: @primary-blue;

          &.checkbox .inner-circle {
            border-radius: 4rpx;
          }
        }
      }

      .option-left {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .radio-circle {
          width: 40rpx;
          height: 40rpx;
          border: 2rpx solid #CBD5E1;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;

          &.checkbox {
            border-radius: 8rpx;
          }

          .inner-circle {
            width: 20rpx;
            height: 20rpx;
            background: @primary-blue;
            border-radius: 50%;
          }
        }

        .option-label {
          font-size: 32rpx;
          color: @text-primary;
        }
      }
    }
  }

  .comment-box {
    .textarea {
      width: 100%;
      height: 200rpx;
      background: #F8FAFC;
      border-radius: 16rpx;
      padding: 20rpx;
      font-size: 28rpx;
      color: @text-primary;
      box-sizing: border-box;
    }

    textarea {
      width: 100%;
      height: 200rpx;
      background: #F8FAFC;
      border-radius: 16rpx;
      padding: 24rpx;
      font-size: 28rpx;
      color: @text-primary;
      box-sizing: border-box;
    }

    .word-count {
      text-align: right;
      font-size: 24rpx;
      color: #CBD5E1;
      margin-top: 12rpx;
    }
  }
}

.safety-notice {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  margin-top: 40rpx;
  padding: 0 10rpx;

  text {
    font-size: 24rpx;
    color: #94A3B8;
    line-height: 1.4;
  }
}

.footer-section {
  flex-shrink: 0;
  width: 100%;
  padding: 30rpx @page-padding calc(30rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  border-top: 1rpx solid #F1F5F9;
  box-sizing: border-box;

  .submit-btn {
    width: 100%;
    height: 100rpx;
    background: linear-gradient(135deg, @primary-blue 0%, @secondary-blue 100%);
    color: #fff;
    border-radius: @radius-medium;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    box-shadow: @shadow-blue;

    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    &.disabled {
      background: #CBD5E1;
      box-shadow: none;
      opacity: 1;
    }
  }
}

.success-modal {
  width: 600rpx;
  background: #fff;
  border-radius: 32rpx;
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-title {
    font-size: 36rpx;
    font-weight: 700;
    color: @text-primary;
    margin-top: 30rpx;
    margin-bottom: 16rpx;
  }

  .modal-desc {
    font-size: 28rpx;
    color: @text-secondary;
    text-align: center;
    margin-bottom: 50rpx;
  }

  .modal-btn {
    width: 100%;
    height: 90rpx;
    background: @primary-blue;
    color: #fff;
    border-radius: 45rpx;
    font-size: 30rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
}
</style>
