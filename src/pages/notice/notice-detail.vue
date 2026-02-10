<template>
  <view class="page-container">
    <t-navbar
      title="公告详情"
      left-arrow
      @go-back="handleBack"
      :fixed="true"
      class="custom-navbar"
    />

    <scroll-view scroll-y class="detail-scroll">
      <view class="content-wrapper" v-if="notice">
        <!-- 1. Title Section -->
        <view class="title-section">
          <text class="main-title">{{ notice.title }}</text>
          <view class="meta-info">
            <text class="category-tag">{{ notice.category || '公示公告' }}</text>
            <text class="dot">·</text>
            <text class="meta-text">{{ notice.source }}</text>
            <text class="dot">·</text>
            <text class="meta-text">{{ notice.date }}</text>
          </view>
        </view>

        <!-- 2. Content Section -->
        <view class="notice-content">
          <view class="rich-text-area">
            <text class="content-text">{{ notice.content }}</text>
            
            <view class="content-illustration" v-if="notice.hasImage">
              <view class="image-placeholder">
                <t-icon name="image" size="48rpx" color="#E2E8F0" />
                <text>相关配图</text>
              </view>
            </view>

            <text class="content-text" v-if="notice.contentFooter">{{ notice.contentFooter }}</text>
          </view>
          
          <!-- 3. Attachments -->
          <view class="attachments-section" v-if="notice.attachments && notice.attachments.length > 0">
            <view class="section-title">附件材料</view>
            <view class="file-list">
              <view 
                class="file-item" 
                v-for="(file, idx) in notice.attachments" 
                :key="idx"
                @click="handleOpenFile(file)"
              >
                <text class="file-name">{{ file.name }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="bottom-tips">
          <text>全文完</text>
        </view>
      </view>

      <view class="loading-state" v-else>
        <t-loading theme="circular" size="60rpx" text="正在加载..." vertical />
      </view>

      <view class="safe-area-inset-bottom"></view>
    </scroll-view>

    <!-- Bottom Bar -->
      <view class="bottom-bar">
        <view class="action-item" @click="handleShare">
          <t-icon name="share" size="44rpx" color="#64748B" />
          <text>分享</text>
        </view>
        <view class="read-btn-wrapper">
          <button class="simple-read-btn" @click="handleBack">我知道了</button>
        </view>
      </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Attachment {
  name: string;
  size: string;
  url?: string;
}

interface NoticeDetail {
  id: string;
  title: string;
  category?: string;
  source: string;
  date: string;
  content: string;
  contentFooter?: string;
  views?: number;
  hasImage?: boolean;
  attachments?: Attachment[];
}

const notice = ref<NoticeDetail | null>(null);
const handleBack = () => {
  uni.navigateBack();
};

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true
  });
};

const handleOpenFile = (file: Attachment) => {
  uni.showToast({
    title: `正在打开附件: ${file.name}`,
    icon: 'none'
  });
};

onMounted(() => {
  // Simulate loading data
  setTimeout(() => {
    // In real scenario, fetch based on id from navigation params
    notice.value = {
      id: '1',
      title: '关于进一步加强住宅专项维修资金管理的通知',
      category: '政府公告',
      source: '赣州市住房和城乡建设局',
      date: '2026-02-08',
      views: 356,
      content: '尊敬的广大业主、各物业服务企业：\n\n为进一步规范住宅专项维修资金的使用和管理，保障住宅共用部位、共用设施设备的维修和正常使用，维护维修资金所有者的合法权益，根据国家及省市相关法律法规要求，现就加强我市住宅专项维修资金管理有关事项通知如下：\n\n一、严格执行资金交存制度。新建商品住宅、非住宅，在办理网签备案前应当按规定足额交存维修资金。未按规定交存的，不予办理权属登记。\n\n二、规范资金使用申请程序。维修资金的使用应当遵循“方便快捷、公开透明、受益人决策、监管到位”的原则。对于应急维修情形，应建立快速响应机制，优先保障居住安全。',
      contentFooter: '三、加强资金增值管理。在保证资金安全和正常使用的前提下，鼓励采取组合存款、购买国债等方式实现资金保值增值，增值收益按规定计入业主分户账。\n\n四、强化信息公开与监督。各相关部门及物业服务企业应定期公示维修资金的使用明细，接受业主的监督。',
      hasImage: true,
      attachments: [
        { name: '住宅专项维修资金管理细则(2026版).pdf', size: '2.4MB' },
        { name: '维修资金应急使用申请流程图.jpg', size: '850KB' }
      ]
    };
  }, 500);
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
}

.custom-navbar {
  --td-navbar-bg-color: #FFFFFF;
}

.detail-scroll {
  flex: 1;
  padding-top: 100rpx; // Space for fixed navbar
}

.content-wrapper {
  padding: 40rpx @page-padding 120rpx;
}

.title-section {
  margin-bottom: 60rpx;

  .main-title {
    font-size: 48rpx;
    font-weight: 500;
    color: #1E293B;
    line-height: 1.5;
    margin-bottom: 24rpx;
    display: block;
    letter-spacing: -0.5rpx;
  }

  .meta-info {
    display: flex;
    align-items: center;
    
    .category-tag {
      color: #3B82F6;
      font-size: 26rpx;
      font-weight: 500;
    }

    .dot {
      margin: 0 16rpx;
      color: #E2E8F0;
      font-size: 24rpx;
    }

    .meta-text {
      font-size: 26rpx;
      color: #94A3B8;
    }
  }
}

.notice-content {
  .rich-text-area {
    .content-text {
      font-size: 32rpx;
      color: #334155;
      line-height: 2;
      white-space: pre-wrap;
      display: block;
      margin-bottom: 40rpx;
      letter-spacing: 0.5rpx;
    }
    
    .content-illustration {
      margin: 60rpx 0;
      
      .image-placeholder {
        width: 100%;
        height: 400rpx;
        background-color: #F8FAFC;
        border: 1rpx dashed #E2E8F0;
        border-radius: 8rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16rpx;
        
        text {
          font-size: 24rpx;
          color: #CBD5E1;
        }
      }
    }
  }
}

.attachments-section {
  margin-top: 80rpx;
  padding-top: 40rpx;
  border-top: 1rpx solid #F1F5F9;

  .section-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #1E293B;
    margin-bottom: 30rpx;
  }

  .file-list {
    .file-item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #F8FAFC;
      
      &:last-child {
        border-bottom: none;
      }

      .file-name {
        flex: 1;
        font-size: 28rpx;
        color: #3B82F6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.bottom-tips {
  margin-top: 100rpx;
  display: flex;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1rpx;
    background: #F1F5F9;
    z-index: 1;
  }

  text {
    position: relative;
    z-index: 2;
    background: #FFFFFF;
    padding: 0 30rpx;
    font-size: 24rpx;
    color: #CBD5E1;
  }
}

.loading-state {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: #FFFFFF;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 110rpx;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1rpx solid #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80rpx;
  padding: 0 40rpx calc(env(safe-area-inset-bottom) / 2);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;

  .action-item {
    display: flex;
    align-items: center;
    gap: 12rpx;
    padding: 20rpx 0;
    
    text {
      font-size: 26rpx;
      color: #64748B;
    }

    &:active {
      opacity: 0.6;
    }
  }

  .read-btn-wrapper {
    display: flex;
    align-items: center;

    .simple-read-btn {
      width: 240rpx;
      height: 76rpx;
      line-height: 76rpx;
      background: #3B82F6;
      color: #FFFFFF;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 38rpx;
      border: none;
      padding: 0;
      margin: 0;
      transition: all 0.2s ease;
      box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.2);

      &::after {
        border: none;
      }

      &:active {
        transform: scale(0.96);
        background: #2563EB;
        box-shadow: 0 2rpx 6rpx rgba(59, 130, 246, 0.1);
      }
    }
  }
}

.safe-area-inset-bottom {
  height: env(safe-area-inset-bottom);
}
</style>
