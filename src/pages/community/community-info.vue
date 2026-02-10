<template>
  <view class="page-container">
    <!-- 1. Custom Header -->
    <view class="header-section">
      <view class="header-top">
        <view class="back-btn" @click="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="page-title">小区信息</text>
      </view>
      <!-- Decor background elements -->
      <view class="decor-circle"></view>
    </view>

    <!-- 2. Content Area -->
    <scroll-view scroll-y class="content-scroll">
      <view class="content-wrapper">
        <!-- 基本信息 -->
        <view class="info-block">
          <view class="block-header">基本信息</view>
          <view class="block-content">
            <view class="info-row">
              <text class="label">小区名称</text>
              <text class="value">{{ communityData.name }}</text>
            </view>
            <view class="info-row">
              <text class="label">所属区划</text>
              <text class="value">{{ communityData.district }}</text>
            </view>
            <view class="info-row">
              <text class="label">街道 / 镇</text>
              <text class="value">{{ communityData.town }}</text>
            </view>
            <view class="info-row">
              <text class="label">居 委 会</text>
              <text class="value">{{ communityData.committee }}</text>
            </view>
            <view class="info-row no-border">
              <text class="label">地    址</text>
              <text class="value address-value">{{ communityData.address }}</text>
            </view>
          </view>
        </view>

        <!-- 业主绑定情况 -->
        <view class="info-block mt-24">
          <view class="block-header">
            <text>业主绑定情况</text>
          </view>
          <view class="block-content binding-stats">
            <view class="stats-item">
              <view class="item-icon-box">
                <t-icon name="usergroup" size="32rpx" color="#3B82F6" />
              </view>
              <view class="item-info">
                <text class="stats-label">业主总人数 (法定)</text>
                <text class="stats-value">{{ communityData.bindingStats.totalOwners }}</text>
              </view>
            </view>
            <view class="stats-item">
              <view class="item-icon-box bg-red">
                <t-icon name="user-checked" size="32rpx" color="#EF4444" />
              </view>
              <view class="item-info">
                <text class="stats-label">已绑定人数 (法定)</text>
                <text class="stats-value highlight">{{ communityData.bindingStats.boundOwners }}</text>
              </view>
            </view>
            <view class="stats-item has-badge">
              <text class="rate-badge-mini" :class="{ 'valid': isRateValid(communityData.bindingStats.ownerRate) }">
                {{ isRateValid(communityData.bindingStats.ownerRate) ? '已达标' : '需达66.67%' }}
              </text>
              <view class="item-icon-box bg-blue">
                <t-icon name="chart-pie" size="32rpx" color="#3B82F6" />
              </view>
              <view class="item-info">
                <text class="stats-label">业主绑定率 (法定)</text>
                <text class="stats-value highlight">{{ communityData.bindingStats.ownerRate }}</text>
              </view>
            </view>
            <view class="stats-item">
              <view class="item-icon-box">
                <t-icon name="map-location" size="32rpx" color="#3B82F6" />
              </view>
              <view class="item-info">
                <text class="stats-label">总面积 (㎡)</text>
                <text class="stats-value">{{ communityData.bindingStats.totalArea }}</text>
              </view>
            </view>
            <view class="stats-item">
              <view class="item-icon-box bg-red">
                <t-icon name="precise-monitor" size="32rpx" color="#EF4444" />
              </view>
              <view class="item-info">
                <text class="stats-label">已绑定面积 (㎡)</text>
                <text class="stats-value highlight">{{ communityData.bindingStats.boundArea }}</text>
              </view>
            </view>
            <view class="stats-item has-badge">
              <text class="rate-badge-mini" :class="{ 'valid': isRateValid(communityData.bindingStats.areaRate) }">
                {{ isRateValid(communityData.bindingStats.areaRate) ? '已达标' : '需达66.67%' }}
              </text>
              <view class="item-icon-box bg-blue">
                <t-icon name="chart-bar" size="32rpx" color="#3B82F6" />
              </view>
              <view class="item-info">
                <text class="stats-label">面积绑定率</text>
                <text class="stats-value highlight">{{ communityData.bindingStats.areaRate }}</text>
              </view>
            </view>
            <view class="community-co-build-card">
              <view class="legal-badge">法律依据</view>
              <view class="rule-content">
                根据《民法典》规定，投票表决事项需由专有部分面积占比及人数占比双“三分之二”以上的业主参与表决，并经参与表决业主双过半数同意方可生效。
              </view>
              <view class="card-divider"></view>
              <view class="invite-section">
                <view class="invite-info">
                  <text class="invite-title">邀请邻居共同建设美好家园</text>
                  <text class="invite-desc">分享给邻居绑定，提升表决参与率</text>
                </view>
                <button class="invite-btn-mini" open-type="share">
                  <t-icon name="share" size="28rpx" color="#fff" class="mr-4" />
                  去邀请
                </button>
              </view>
            </view>
          </view>
        </view>

        <!-- 业委会/物管会信息 -->
        <view class="info-block mt-24" v-if="communityData.hasCommittee">
          <view class="block-header">
            <text>业委会信息</text>
            <view class="more-btn" @click="goToMemberList('committee')">
              <text>全部成员</text>
              <t-icon name="chevron-right" size="24rpx" color="#64748B" />
            </view>
          </view>
          <view class="block-content">
            <view class="info-row">
              <text class="label">成立日期</text>
              <text class="value">{{ communityData.committeeDate }}</text>
            </view>
            <view class="info-row no-border">
              <text class="label">业委会主任</text>
              <text class="value">{{ communityData.committeeLeader }}</text>
            </view>
          </view>
        </view>

        <view class="info-block mt-24" v-else-if="communityData.hasManagement">
          <view class="block-header">
            <text>物管会信息</text>
            <view class="more-btn" @click="goToMemberList('management')">
              <text>全部成员</text>
              <t-icon name="chevron-right" size="24rpx" color="#64748B" />
            </view>
          </view>
          <view class="block-content">
            <view class="info-row">
              <text class="label">成立日期</text>
              <text class="value">{{ communityData.managementDate }}</text>
            </view>
            <view class="info-row no-border">
              <text class="label">负责人</text>
              <text class="value">{{ communityData.managementLeader }}</text>
            </view>
          </view>
        </view>

        <view class="info-block mt-24" v-else>
          <view class="block-header">组织信息</view>
          <view class="block-content">
            <view class="empty-tip">暂无业委会或物管会信息</view>
          </view>
        </view>

        <!-- 物业企业信息 -->
        <view class="info-block mt-24">
          <view class="block-header">物业企业信息</view>
          <view class="block-content">
            <view class="info-row clickable" @click="goToPropertyDetail">
              <text class="label">企业名称</text>
              <view class="value-with-icon">
                <text class="value">{{ communityData.propertyCompany }}</text>
                <t-icon name="chevron-right" size="32rpx" color="#94A3B8" />
              </view>
            </view>
            <view class="info-row no-border">
              <text class="label">项目经理</text>
              <text class="value">{{ communityData.manager }} ({{ communityData.managerPhone }})</text>
            </view>
          </view>
        </view>

        <!-- 开发建设单位信息 -->
        <view class="info-block mt-24">
          <view class="block-header">开发建设单位信息</view>
          <view class="block-content">
            <view class="info-row no-border">
              <text class="label">企业名称</text>
              <text class="value">{{ communityData.developer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Global Footer -->
      <app-footer />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const communityInfoMap: Record<string, any> = {
  '阳光水岸': {
    name: '阳光水岸',
    district: '章贡区',
    town: '水南镇',
    committee: '阳光水岸社区居民委员会',
    address: '江西省赣州市章贡区阳光大道1号',
    developer: '赣州阳光房地产开发有限公司',
    propertyCompany: '邻檬智慧物业服务有限公司',
    manager: '张建国',
    managerPhone: '13800138000',
    hasCommittee: true,
    committeeDate: '2021-10-15',
    committeeLeader: '陈向阳',
    hasManagement: false,
    committeeMembers: [
      { name: '陈向阳', role: '主任', phone: '13800138001', address: '阳光水岸1栋101' },
      { name: '刘芳', role: '副主任', phone: '13800138002', address: '阳光水岸2栋202' },
      { name: '张强', role: '委员', phone: '13800138003', address: '阳光水岸3栋303' },
      { name: '王伟', role: '委员', phone: '13800138004', address: '阳光水岸4栋404' },
      { name: '李梅', role: '委员', phone: '13800138005', address: '阳光水岸5栋505' }
    ],
    bindingStats: {
      totalOwners: '3,222', 
      boundOwners: '338',
      ownerRate: '10.49%',
      totalArea: '354,839.63',
      boundArea: '32,623.16',
      areaRate: '9.19%'
    }
  },
  '亚运城天成': {
    name: '亚运城天成',
    district: '番禺区',
    town: '石楼镇',
    committee: '亚运城社区居民委员会',
    address: '广州市番禺区石碁镇亚运大道1290号',
    developer: '广州利合房地产开发有限公司',
    propertyCompany: '雅生活智慧城市服务股份有限公司',
    manager: '李兵',
    managerPhone: '13923202558',
    hasCommittee: false,
    committeeDate: '-',
    committeeLeader: '-',
    hasManagement: true,
    managementDate: '2023-05-15',
    managementLeader: '黄正洪',
    managementMembers: [
      { name: '黄正洪', role: '主任 - 镇街代表', phone: '34850388', address: '石楼镇嵩山路60号群众服务中心2号楼320室' },
      { name: '罗琳玲', role: '副主任 - 居委会代表', phone: '23883469', address: '石楼镇亚运城社区居委会' },
      { name: '郭荣宗', role: '副主任 - 业主代表', phone: '18054292501', address: '亚运大道1290号3栋1203' },
      { name: '陈喜佳', role: '委员 - 区局代表', phone: '84899880', address: '番禺区沙头街景观大道南7号' },
      { name: '李兵', role: '委员 - 物业企业代表', phone: '13923202558', address: '石楼镇亚运城天成小区物管处' }
    ],
    bindingStats: {
      totalOwners: '2,456',
      boundOwners: '512',
      ownerRate: '20.85%',
      totalArea: '325,000.00',
      boundArea: '67,762.50',
      areaRate: '20.85%'
    }
  }
};

const currentHouse = ref(uni.getStorageSync('selectedHouse') || '亚运城天成一期 1-1-802');

const isRateValid = (rateStr: string) => {
  if (!rateStr) return false;
  const rate = parseFloat(rateStr.replace('%', ''));
  return rate >= (2 / 3 * 100);
};

const goToMemberList = (type: string) => {
  uni.navigateTo({
    url: `/pages/community/member-list?type=${type}`
  });
};

const communityData = computed(() => {
  const selectedAddress = currentHouse.value;
  const community = selectedAddress.includes('亚运城') ? '亚运城天成' : '阳光水岸';
  return communityInfoMap[community];
});

const goBack = () => {
  uni.navigateBack();
};

const goToPropertyDetail = () => {
  uni.navigateTo({
    url: '/pages/property/property-enterprise'
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F8FAFC;
  display: flex;
  flex-direction: column;

.header-section {
  height: 8.5rem;
  background: @header-gradient;
  padding: 10rpx @page-padding 0;
  position: relative;
  overflow: hidden;
  color: @text-white;
  flex-shrink: 0;

  .header-top {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-left: -20rpx;

    .back-btn {
      padding: 10rpx 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &:active {
        opacity: 0.7;
      }
    }

    .page-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #FFFFFF;
      margin-left: 10rpx;
    }
  }

  .decor-circle {
    position: absolute;
    top: -50rpx;
    right: -50rpx;
    width: 200rpx;
    height: 200rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 1;
  }
}

.content-scroll {
  flex: 1;
  height: 0;
  margin-top: -3.5rem;
  position: relative;
  z-index: 3;
}

.content-wrapper {
  padding: 0 30rpx 40rpx;
}

.info-block {
  background: #FFFFFF;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .block-header {
    padding: 24rpx 32rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #1E293B;
    background: #FFFFFF;
    border-bottom: 1rpx solid #F1F5F9;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .more-btn {
      display: flex;
      align-items: center;
      gap: 4rpx;
      font-size: 24rpx;
      color: #64748B;
      font-weight: normal;

      &:active {
        opacity: 0.7;
      }
    }
  }

  .block-content {
    padding: 0 32rpx 32rpx;

    &.binding-stats {
      padding: 24rpx 32rpx 32rpx;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;

      .stats-item {
        background: #F8FAFC;
        padding: 16rpx;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        gap: 16rpx;
        border: 1rpx solid #F1F5F9;
        position: relative;
        min-height: 110rpx;

        &.has-badge {
          padding-top: 36rpx;
        }

        .item-icon-box {
          width: 56rpx;
          height: 56rpx;
          background: #EFF6FF;
          border-radius: 10rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          &.bg-red {
            background: #FEF2F2;
          }

          &.bg-blue {
            background: #EFF6FF;
          }
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rpx;
          min-width: 0; // 防止内容溢出

          .stats-label {
            font-size: 20rpx;
            color: #64748B;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .stats-value {
            font-size: 28rpx;
            font-weight: 700;
            color: #1E293B;
            line-height: 1.2;

            &.highlight {
              color: #EF4444;
            }
          }
        }

        .rate-badge-mini {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 16rpx;
          padding: 2rpx 10rpx;
          border-radius: 0 16rpx 0 16rpx;
          background: #E2E8F0;
          color: #64748B;
          font-weight: normal;
          z-index: 2;

          &.valid {
            background: #DCFCE7;
            color: #166534;
          }
        }
      }

      .community-co-build-card {
        grid-column: span 2;
        margin-top: 12rpx;
        padding: 48rpx 24rpx 24rpx;
        background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
        border-radius: 16rpx;
        position: relative;
        overflow: hidden;

      .legal-badge {
        position: absolute;
        top: 0;
        left: 0;
        background: #3B82F6;
        color: #fff;
        font-size: 20rpx;
        padding: 6rpx 20rpx;
        border-radius: 12rpx 0 12rpx 0;
        font-weight: 700;
        z-index: 1;
      }

      .rule-content {
        font-size: 24rpx;
        color: #1E40AF;
        line-height: 1.6;
        margin-bottom: 24rpx;
        padding: 0 8rpx;
      }

      .card-divider {
        height: 1rpx;
        background: rgba(59, 130, 246, 0.2);
        margin: 0 8rpx 24rpx;
      }

      .invite-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8rpx;

        .invite-info {
          flex: 1;
          margin-right: 20rpx;

          .invite-title {
            display: block;
            font-size: 28rpx;
            font-weight: 700;
            color: #1E40AF;
            margin-bottom: 4rpx;
          }

          .invite-desc {
            display: block;
            font-size: 22rpx;
            color: #3B82F6;
          }
        }

        .invite-btn-mini {
          background: #3B82F6;
          color: #fff;
          font-size: 24rpx;
          font-weight: 700;
          padding: 0 24rpx;
          height: 56rpx;
          line-height: 56rpx;
          border-radius: 28rpx;
          display: flex;
          align-items: center;
          border: none;
          margin: 0;
          flex-shrink: 0;

          &::after {
            border: none;
          }

          .mr-4 {
            margin-right: 4rpx;
          }
        }
      }
    }
  }

  .info-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 32rpx 0;
      border-bottom: 1rpx solid #F1F5F9;

      &.no-border {
        border-bottom: none;
      }

      &.clickable:active {
        background-color: #F8FAFC;
        margin: 0 -32rpx;
        padding: 32rpx;
      }

      .label {
        font-size: 28rpx;
        color: #64748B;
        width: 160rpx;
        flex-shrink: 0;
      }

      .value {
        font-size: 28rpx;
        color: #1E293B;
        text-align: right;
        flex: 1;
        word-break: break-all;
        
        &.address-value {
          line-height: 1.5;
        }
      }

      .value-with-icon {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-end;
        gap: 8rpx;
      }
    }

    .empty-tip {
      padding: 48rpx 0;
      text-align: center;
      color: #94A3B8;
      font-size: 28rpx;
    }
  }
}

.mt-24 {
  margin-top: 24rpx;
}
}
</style>
