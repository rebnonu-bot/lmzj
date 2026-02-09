import { ref, computed } from 'vue';

export interface FundRecord {
  title: string;
  date: string;
  amount: string;
  type: 'contribution' | 'expense' | 'initial';
  typeText: string;
  scene: 'online' | 'offline';
  status?: string;
}

// 基础数据定义
const communityData: Record<string, { initial: number, records: FundRecord[] }> = {
  '阳光水岸': {
    initial: 56800.00,
    records: [
      { title: '本小区用户消费13.40元', date: '2026-02-03 18:18:18', amount: '0.04', type: 'contribution', typeText: '贡献', scene: 'online' },
      { title: '小区业委会购买公共设施', date: '2026-02-02 14:30:00', amount: '500.00', type: 'expense', typeText: '支出', scene: 'offline' },
      { title: '本小区用户线下超市消费50.00元', date: '2026-02-02 10:07:51', amount: '0.50', type: 'contribution', typeText: '贡献', scene: 'offline' },
      { title: '小区业委会绿化养护支出', date: '2026-02-01 16:20:00', amount: '200.00', type: 'expense', typeText: '支出', scene: 'offline' },
      { title: '本小区用户消费29.90元', date: '2026-02-01 12:25:12', amount: '0.24', type: 'contribution', typeText: '贡献', scene: 'online' },
      { title: '本小区用户消费45.00元', date: '2026-02-01 11:30:00', amount: '0.45', type: 'contribution', typeText: '贡献', scene: 'online' },
      { title: '本小区用户便利店消费15.00元', date: '2026-01-30 19:32:33', amount: '0.15', type: 'contribution', typeText: '贡献', scene: 'offline' },
      { title: '小区业委会路灯维修支出', date: '2026-01-29 20:15:00', amount: '80.00', type: 'expense', typeText: '支出', scene: 'offline' },
      { title: '本小区用户线下消费120.00元', date: '2026-01-29 18:32:33', amount: '1.20', type: 'contribution', typeText: '贡献', scene: 'offline' },
      { title: '小区业委会年终总结会议支出', date: '2025-12-28 15:00:00', amount: '150.00', type: 'expense', typeText: '支出', scene: 'offline' },
      { title: '本小区用户消费88.00元', date: '2025-12-20 10:00:00', amount: '0.88', type: 'contribution', typeText: '贡献', scene: 'online' },
      { title: '小区业委会路面修补支出', date: '2025-11-15 09:30:00', amount: '300.00', type: 'expense', typeText: '支出', scene: 'offline' },
      { title: '本小区用户线下消费156.00元', date: '2025-11-10 14:20:00', amount: '1.56', type: 'contribution', typeText: '贡献', scene: 'offline' }
    ]
  },
  '亚运城天成': {
    initial: 34500.00,
    records: [
      { title: '本小区用户消费25.60元', date: '2026-02-03 15:20:10', amount: '0.26', type: 'contribution', typeText: '贡献', scene: 'online' },
      { title: '本小区用户便利店消费12.00元', date: '2026-02-02 09:10:00', amount: '0.12', type: 'contribution', typeText: '贡献', scene: 'offline' }
    ]
  },
  '翡翠江景': {
    initial: 89200.00,
    records: [
      { title: '本小区用户大额消费', date: '2026-02-03 10:00:00', amount: '12.50', type: 'contribution', typeText: '贡献', scene: 'online' }
    ]
  }
};

const currentCommunity = ref('阳光水岸');

export function useFundStore() {
  const setCommunity = (name: string) => {
    // 兼容逻辑：如果包含关键字，则映射到对应小区
    if (name.includes('阳光水岸')) currentCommunity.value = '阳光水岸';
    else if (name.includes('亚运城天成')) currentCommunity.value = '亚运城天成';
    else if (name.includes('翡翠江景')) currentCommunity.value = '翡翠江景';
  };

  const recordList = computed(() => {
    const data = communityData[currentCommunity.value] || communityData['阳光水岸'];
    // 为了满足“金额应该是贡献列表的总和”，我们将初始余额也作为一个特殊记录加入列表（但在显示时可能需要处理）
    const initialRecord: FundRecord = {
      title: '初始余额',
      date: '2025-01-01 00:00:00',
      amount: data.initial.toFixed(2),
      type: 'initial',
      typeText: '初始',
      scene: 'offline'
    };
    return [initialRecord, ...data.records];
  });

  const totalBalanceAmount = computed(() => {
    return recordList.value.reduce((sum, item) => {
      const val = parseFloat(item.amount);
      if (item.type === 'expense') return sum - val;
      return sum + val;
    }, 0);
  });

  const totalBalanceFormatted = computed(() => {
    return totalBalanceAmount.value.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
  });

  const totalBalanceWan = computed(() => {
    return (totalBalanceAmount.value / 10000).toFixed(2);
  });

  return {
    currentCommunity,
    setCommunity,
    recordList,
    totalBalanceAmount,
    totalBalanceFormatted,
    totalBalanceWan
  };
}
