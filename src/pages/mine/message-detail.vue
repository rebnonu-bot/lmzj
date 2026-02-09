<template>
  <view class="page-container">
    <t-navbar
      :title="pageTitle"
      left-arrow
      :delta="0"
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <scroll-view scroll-y class="detail-scroll">
      <view class="content-wrapper" v-if="message">
        <!-- 1. Header Section (Common) -->
        <view class="detail-header">
          <view class="type-tag" :class="message.categoryCode">
            <t-icon :name="message.icon" size="32rpx" color="#FFFFFF" />
            <text>{{ message.category }}</text>
          </view>
          <view class="status-tag" :class="statusInfo.class">
            {{ statusInfo.text }}
          </view>
        </view>

        <view class="title-section">
          <text class="main-title">{{ message.title }}</text>
          <view class="meta-info">
            <text class="time">{{ message.fullTime || message.time }}</text>
            <text class="publisher" v-if="message.publisher">发布人：{{ message.publisher }}</text>
          </view>
        </view>

        <view class="divider"></view>

        <!-- 2. Dynamic Content Section -->
        
        <!-- A. Voting Content -->
        <view v-if="message.type === 'vote'" class="vote-content">
          <view class="section-title">投票描述</view>
          <text class="description">{{ message.desc }}</text>
          
          <view class="options-list">
            <view 
              v-for="(option, index) in voteOptions" 
              :key="index"
              class="option-item"
              :class="{ active: selectedOption === index }"
              @click="handleSelectOption(index)"
            >
              <view class="radio-box">
                <view class="radio-inner" v-if="selectedOption === index"></view>
              </view>
              <text class="option-text">{{ option.label }}</text>
              <text class="vote-count" v-if="message.isClosed">{{ option.count }}票</text>
            </view>
          </view>

          <view class="vote-stats" v-if="message.isClosed">
            <view class="stat-item">
              <text class="label">参与人数</text>
              <text class="value">156人</text>
            </view>
            <view class="stat-item">
              <text class="label">投票截止</text>
              <text class="value">2024-03-25</text>
            </view>
          </view>
        </view>

        <!-- B. Repair/Complaint Content (Process Timeline) -->
        <view v-else-if="message.type === 'repair' || message.type === 'voice'" class="process-content">
          <view class="section-title">反馈内容</view>
          <text class="description">{{ message.desc }}</text>
          
          <view class="image-grid" v-if="message.images && message.images.length > 0">
            <image 
              v-for="(img, idx) in message.images" 
              :key="idx" 
              :src="img" 
              mode="aspectFill"
              class="grid-img"
            />
          </view>

          <view class="section-title mt-40">处理进度</view>
          <view class="timeline">
            <view 
              v-for="(step, idx) in timelineSteps" 
              :key="idx" 
              class="timeline-item"
              :class="{ last: idx === timelineSteps.length - 1, active: idx === 0 }"
            >
              <view class="line-box">
                <view class="dot"></view>
                <view class="line" v-if="idx !== timelineSteps.length - 1"></view>
              </view>
              <view class="step-content">
                <view class="step-header">
                  <text class="step-title">{{ step.title }}</text>
                  <text class="step-time">{{ step.time }}</text>
                </view>
                <text class="step-desc">{{ step.desc }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- C. Notice Content -->
        <view v-else class="notice-content">
          <view class="rich-text">
            {{ message.content || message.desc }}
            <!-- In real app, use <rich-text> or v-html -->
          </view>
          
          <view class="attachments" v-if="message.attachments">
            <view class="section-title">附件列表</view>
            <view class="file-item" v-for="(file, idx) in message.attachments" :key="idx">
              <t-icon name="attach" size="36rpx" color="#64748B" />
              <text class="file-name">{{ file.name }}</text>
              <text class="file-size">{{ file.size }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-padding"></view>
    </scroll-view>

    <!-- 3. Fixed Footer Actions -->
    <view class="footer-actions" v-if="message && !message.isClosed">
      <block v-if="message.type === 'vote'">
        <t-button 
          theme="primary" 
          size="large" 
          block 
          shape="round"
          :disabled="selectedOption === null"
          @click="handleSubmitVote"
        >
          提交投票
        </t-button>
      </block>
      <block v-else-if="message.type === 'repair' || message.type === 'voice'">
        <t-button 
          theme="light" 
          size="large" 
          block 
          shape="round"
          @click="handleContact"
        >
          联系物业
        </t-button>
      </block>
      <block v-else>
        <t-button 
          theme="primary" 
          size="large" 
          block 
          variant="outline"
          shape="round"
          @click="handleShare"
        >
          分享给邻居
        </t-button>
      </block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Message {
  id: string;
  title: string;
  desc: string;
  content?: string;
  time: string;
  fullTime?: string;
  category: string;
  categoryCode: string;
  icon: string;
  isRead: boolean;
  type: string;
  publisher?: string;
  isClosed?: boolean;
  images?: string[];
  attachments?: { name: string; size: string }[];
}

const message = ref<Message | null>(null);
const selectedOption = ref<number | null>(null);

const pageTitle = computed(() => {
  if (!message.value) return '消息详情';
  return message.value.category + '详情';
});

const statusInfo = computed(() => {
  if (!message.value) return { text: '', class: '' };
  
  if (message.value.type === 'vote') {
    return message.value.isClosed 
      ? { text: '已结束', class: 'closed' } 
      : { text: '进行中', class: 'active' };
  }
  
  if (message.value.type === 'repair') {
    return { text: '处理中', class: 'processing' };
  }
  
  return { text: '公示中', class: 'notice' };
});

const voteOptions = [
  { label: '支持调整', count: 98 },
  { label: '维持现状', count: 45 },
  { label: '弃权', count: 13 }
];

const timelineSteps = [
  { title: '维保人员已出发', time: '09:45', desc: '维保人员张师傅已接单，预计10:15到达现场。' },
  { title: '物业已受理', time: '09:15', desc: '您的报修申请已通过审核，正在指派维修人员。' },
  { title: '报修提交成功', time: '09:00', desc: '报修单号：BX20240319001，请耐心等待。' }
];

const handleBack = () => {
  uni.navigateBack();
};

const handleSelectOption = (index: number) => {
  if (message.value?.isClosed) return;
  selectedOption.value = index;
};

const handleSubmitVote = () => {
  uni.showLoading({ title: '提交中' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: '投票成功',
      icon: 'success'
    });
    if (message.value) message.value.isClosed = true;
  }, 1000);
};

const handleContact = () => {
  uni.makePhoneCall({
    phoneNumber: '010-88888888'
  });
};

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true
  });
};

onMounted(() => {
  // Simulate fetching message detail from navigation params
  // In real app, use: const instance = getCurrentInstance(); const id = instance.proxy.$root.$scope.options.id;
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1] as any;
  const options = currentPage.options || {};
  
  // Mock data based on type passed in options
  const type = options.type || 'vote';
  
  const mockMessages: Record<string, Message> = {
    vote: {
      id: '1',
      title: '关于2024年物业费调整的投票邀请',
      desc: '为了进一步提升物业服务质量，拟对现行物业费标准进行小幅调整，主要用于增加社区监控覆盖面及更换公共区域老化健身器材。',
      time: '10:30',
      fullTime: '2024-03-19 10:30',
      category: '电子投票',
      categoryCode: 'voting',
      icon: 'bulletpoint',
      isRead: true,
      type: 'vote',
      publisher: '龙湖物业管理处',
      isClosed: false
    },
    repair: {
      id: '2',
      title: '您的报修单已受理',
      desc: '3号楼2单元电梯故障报修已由维保人员受理，预计1小时内到达。',
      time: '09:15',
      fullTime: '2024-03-19 09:15',
      category: '小区报修',
      categoryCode: 'repair',
      icon: 'tools',
      isRead: true,
      type: 'repair',
      publisher: '报修中心',
      images: ['https://img.js.design/assets/img/65a8e1a1b16c905330e6a8e8.png']
    },
    notice: {
      id: '3',
      title: '3月社区环境整治公告',
      desc: '本周末将进行全区消杀和绿化修整，请各位业主关好门窗。',
      content: '尊敬的业主：\n\n为了给各位邻居营造一个更加整洁、优美的居住环境，物业公司计划于本周六、周日（3月23日-24日）对小区公共区域进行全面的消杀及绿化修剪工作。具体安排如下：\n\n1. 消杀范围：各单元大堂、电梯间、楼道及地下车库。\n2. 绿化修剪：中庭景观区、1-5号楼宅间绿地。\n\n注意事项：\n- 消杀期间请关好门窗，尽量减少在室外逗留。\n- 修剪树木期间请勿在作业区域下方停车，以免掉落枝条损伤车辆。\n\n感谢您的配合！',
      time: '昨天',
      fullTime: '2024-03-18 15:00',
      category: '公示公告',
      categoryCode: 'notice',
      icon: 'notification',
      isRead: true,
      type: 'notice',
      publisher: '龙湖物业',
      attachments: [{ name: '消杀作业安全须知.pdf', size: '1.2MB' }]
    },
    voice: {
      id: '4',
      title: '投诉受理反馈',
      desc: '关于“高空抛物”的投诉建议已收到，我们已加强巡逻和监控。',
      time: '03-18',
      fullTime: '2024-03-18 09:00',
      category: '投诉建议',
      categoryCode: 'complaint',
      icon: 'chat',
      isRead: true,
      type: 'voice',
      publisher: '客服中心'
    }
  };

  message.value = (mockMessages[type] || mockMessages.vote) as Message;
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #FFFFFF;
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

.content-wrapper {
  padding: 40rpx @page-padding;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;

  .type-tag {
    display: flex;
    align-items: center;
    gap: 8rpx;
    padding: 6rpx 20rpx;
    border-radius: 30rpx;
    
    text {
      font-size: 24rpx;
      color: #FFFFFF;
      font-weight: 500;
    }

    &.voting { background: #3B82F6; }
    &.repair { background: #EF4444; }
    &.notice { background: #10B981; }
    &.complaint { background: #F59E0B; }
  }

  .status-tag {
    font-size: 24rpx;
    padding: 6rpx 16rpx;
    border-radius: 8rpx;

    &.active { background: #ECFDF5; color: #10B981; }
    &.closed { background: #F1F5F9; color: #94A3B8; }
    &.processing { background: #EFF6FF; color: #3B82F6; }
    &.notice { background: #F8FAFC; color: #64748B; }
  }
}

.title-section {
  margin-bottom: 32rpx;

  .main-title {
    font-size: 40rpx;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.4;
    margin-bottom: 16rpx;
    display: block;
  }

  .meta-info {
    display: flex;
    gap: 24rpx;
    font-size: 26rpx;
    color: #94A3B8;
  }
}

.divider {
  height: 1rpx;
  background: #F1F5F9;
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 20rpx;
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

.description {
  font-size: 28rpx;
  color: #475569;
  line-height: 1.6;
  display: block;
}

/* Vote Specific */
.options-list {
  margin-top: 32rpx;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background: #F8FAFC;
  border: 2rpx solid transparent;
  border-radius: @radius-large;
  margin-bottom: 20rpx;
  transition: all 0.2s;

  &.active {
    background: #EFF6FF;
    border-color: #3B82F6;
  }

  .radio-box {
    width: 36rpx;
    height: 36rpx;
    border: 2rpx solid #CBD5E1;
    border-radius: 50%;
    margin-right: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;

    .radio-inner {
      width: 20rpx;
      height: 20rpx;
      background: #3B82F6;
      border-radius: 50%;
    }
  }

  .option-text {
    flex: 1;
    font-size: 28rpx;
    color: #1E293B;
  }

  .vote-count {
    font-size: 24rpx;
    color: #94A3B8;
  }
}

.vote-stats {
  margin-top: 40rpx;
  background: #F8FAFC;
  border-radius: @radius-large;
  padding: 24rpx;
  display: flex;
  justify-content: space-around;

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .label { font-size: 24rpx; color: #94A3B8; }
    .value { font-size: 28rpx; color: #1E293B; font-weight: 500; }
  }
}

/* Process Specific */
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 24rpx;

  .grid-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 12rpx;
    background: #F1F5F9;
  }
}

.mt-40 { margin-top: 40rpx; }

.timeline {
  margin-top: 24rpx;
  padding-left: 10rpx;
}

.timeline-item {
  display: flex;
  gap: 24rpx;

  .line-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32rpx;

    .dot {
      width: 16rpx;
      height: 16rpx;
      background: #CBD5E1;
      border-radius: 50%;
      z-index: 2;
    }

    .line {
      flex: 1;
      width: 2rpx;
      background: #F1F5F9;
      margin: 4rpx 0;
    }
  }

  &.active {
    .dot { background: #3B82F6; box-shadow: 0 0 0 6rpx #EFF6FF; }
    .step-title { color: #3B82F6; font-weight: 600; }
  }

  .step-content {
    flex: 1;
    padding-bottom: 40rpx;

    .step-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8rpx;

      .step-title { font-size: 28rpx; color: #1E293B; }
      .step-time { font-size: 24rpx; color: #CBD5E1; }
    }

    .step-desc {
      font-size: 26rpx;
      color: #64748B;
      line-height: 1.5;
    }
  }
}

/* Notice Specific */
.rich-text {
  font-size: 28rpx;
  color: #475569;
  line-height: 1.8;
  white-space: pre-wrap;
}

.attachments {
  margin-top: 60rpx;

  .file-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background: #F8FAFC;
    border-radius: 12rpx;
    margin-bottom: 16rpx;

    .file-name {
      flex: 1;
      margin: 0 16rpx;
      font-size: 26rpx;
      color: #475569;
    }

    .file-size {
      font-size: 22rpx;
      color: #94A3B8;
    }
  }
}

.bottom-padding {
  height: 160rpx;
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
