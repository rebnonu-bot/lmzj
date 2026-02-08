/** 模拟网络请求的延迟 */
function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 模拟聊天数据
const mockData = [
  {
    userId: 1,
    name: '物业管家-小李',
    avatar: '/static/chat/avatar-Sean.png',
    messages: [
      { messageId: 1, from: 1, content: '您好，关于您反映的2号楼电梯报修，维修人员已在处理中。', time: 1690646400000, read: true },
      { messageId: 2, from: 0, content: '好的，麻烦尽快修复，谢谢。', time: 1690646400000, read: true },
      { messageId: 3, from: 1, content: '在吗？', time: Date.now() - 3600000, read: false },
      {
        messageId: 4,
        from: 1,
        content: '维修已完成，您可以前往现场确认。',
        time: Date.now() - 3600000,
        read: false,
      },
    ],
  },
  {
    userId: 2,
    name: '业委会助手',
    avatar: '/static/chat/avatar-Mollymolly.png',
    messages: [{ messageId: 5, from: 1, content: '关于本次充电桩增设的投票结果已公示，请查收。', time: 1692100800000, read: true }],
  },
  {
    userId: 3,
    name: '维修资金中心',
    avatar: '/static/chat/avatar-Andrew.png',
    messages: [{ messageId: 6, from: 0, content: '我想查询一下我名下的维修资金余额。', time: 1690084800000, read: true }],
  },
  {
    userId: 4,
    name: '社区公告通知',
    avatar: '/static/chat/avatar-Kingdom.png',
    messages: [{ messageId: 7, from: 1, content: '温馨提示：本周末将进行供水管道清洗。', time: 1656880200000, read: true }],
  },
  {
    userId: 5,
    name: '房屋安全鉴定处',
    avatar: '/static/chat/avatar-Paige.png',
    messages: [
      { messageId: 8, from: 1, content: '您提交的房屋安全鉴定申请已通过初审。', time: 1652963880000, read: true },
    ],
  },
];

// 模拟新增一条消息
function addNewMessage(userId: number, from: number, content: string) {
  const index = mockData.map((item) => item.userId).indexOf(userId);
  if (index === -1) return null;
  const user = mockData.splice(index, 1)[0];
  if (!user) return null;
  mockData.unshift(user);
  let messageId = 0;
  mockData.forEach((item) => {
    messageId += item.messages.length;
  });
  const message = { messageId, from, content, time: Date.now(), read: from === 0 };
  user.messages.push(message);

  return message;
}

/** 模拟 SocketTask */
class MockSocketTask {
  url: string;
  onopen: () => void;
  onmessage: (data: string) => void;
  onclose: () => void;

  constructor(url: string) {
    this.url = url;
    this.onopen = () => {};
    this.onmessage = () => {};
    this.onclose = () => {};
    delay(1000).then(() => {
      this.onopen();
    });
  }

  onOpen = (callback: () => void) => {
    if (typeof callback === 'function') this.onopen = callback;
  }

  onMessage = (callback: (data: string) => void) => {
    console.log('onMessage', callback)
    if (typeof callback === 'function') this.onmessage = callback;
  }

   send = (data: any) => {
    // data 可能是字符串或对象，统一处理
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    if (parsedData.type === 'message') {
      const { userId, content } = parsedData.data;
      delay().then(() => {
        const message = addNewMessage(userId, 0, content);
        console.log('addNewMessage', message, this.onmessage)
        this.onmessage(JSON.stringify({ type: 'message', data: { userId, message } }));
      });
      // 模拟3秒后对方回复消息
      delay(3000).then(() => {
        const replies = ['收到', '好的', '知道了', '👌 OK'];
        const reply = replies[Math.floor(Math.random() * 4)] || '收到';
        const message = addNewMessage(userId, 1, reply);
        if (message) {
          this.onmessage(JSON.stringify({ type: 'message', data: { userId, message } }));
        }
      });
    }
  }
}

/** 连接 WebSocket，返回 SocketTask 对象 */
export function connectSocket() {
  return new MockSocketTask('ws://localhost:8080');
}

/** 获取未读消息数量 */
export function fetchUnreadNum(): Promise<{ code: number; data: number }> {
  let unreadNum = 0;
  mockData.forEach((item) => {
    unreadNum += item.messages.filter((message) => !message.read).length;
  });
  return delay().then(() => ({ code: 200, data: unreadNum }));
}

/** 获取完整消息列表 */
export function fetchMessageList(): Promise<{ code: number; data: typeof mockData }> {
  return delay().then(() => ({ code: 200, data: JSON.parse(JSON.stringify(mockData)) }));
}

/** 将某个用户的所有消息标记为已读 */
export function markMessagesRead(userId: number) {
  let index = 0;
  while (index < mockData.length) {
    const user = mockData[index];
    if (user && user.userId === userId) {
      user.messages.forEach((message) => {
        message.read = true;
      });
      break;
    }
    index += 1;
  }
}
