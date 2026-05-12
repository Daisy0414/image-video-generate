// Unsplash 固定图 — 用 photo-id 拼接 CDN URL，URL 永久稳定、自动 webp 转码、按需裁切
const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

// 备用：Picsum（用于头像等无具体商品语义的占位）
const img = (seed, w = 600, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`

// 商品/场景图素材库 — 与 mock 文案一一对应。photo-id 来自 Unsplash 公开 CDN。
const PHOTO = {
  // 手表
  watchClassic: unsplash('1523275335684-37898b6baf30'),
  watchSmart: unsplash('1579586337278-3befd40fd17a'),
  watchLifestyle: unsplash('1522312346375-d1a52e2b99b3'),
  watchAngle1: unsplash('1547996160-81dfa63595aa'),
  watchAngle2: unsplash('1539874754764-5a96559165b0'),
  watchAngle3: unsplash('1495856458515-0637185db551'),
  watchAngle4: unsplash('1622434641406-a158123450f9'),
  watchAngle5: unsplash('1606760227091-3dd870d97f1d'),
  watchAngle6: unsplash('1533139502658-0198f920d8e8'),
  // 耳机
  headphone: unsplash('1505740420928-5e560c06d30e'),
  headphoneDark: unsplash('1583394838336-acd977736f90'),
  // 鞋
  shoeRunningRed: unsplash('1542291026-7eec264c27ff'),
  shoeMeshWhite: unsplash('1600185365926-3a2ce3cdb9eb'),
  shoeHero: unsplash('1606107557195-0e29a4b5b4aa'),
  // 包
  backpack: unsplash('1553062407-98eeb64c6a62'),
  backpackScene: unsplash('1547949003-9792a18a2601'),
  // 陶瓷
  ceramicVase: unsplash('1578749556568-bc2c40e68b61'),
  ceramicTableware: unsplash('1610701596007-11502861dcfa'),
  ceramicSet: unsplash('1565193566173-7a0ee3dbe261'),
  // 其它
  woodChair: unsplash('1503602642458-232111445657'),
  sunscreen: unsplash('1556228852-80b6e5eeff06'),
  coffeeCup: unsplash('1509042239860-f550ce710b93'),
  sunglassesLuxury: unsplash('1572635196237-14b3f281503f'),
}

export { img, unsplash, PHOTO }

// ---------- 当前用户 ----------
export const currentUser = {
  name: '王经理',
  role: '电商运营负责人',
  email: 'wang.manager@proai.com',
  // pravatar.cc 返回稳定的真人头像（img 编号决定具体面孔）
  avatar: 'https://i.pravatar.cc/80?img=12',
}

// ---------- 仪表盘 ----------
export const dashboardStats = [
  { key: 'assets', label: '总资产数量', value: '1,284', delta: '+12% 较上月', icon: 'file', tone: 'brand' },
  { key: 'aigen', label: '本月 AI 生成', value: '458', delta: '+8.4% 较上月', icon: 'zap', tone: 'teal' },
  { key: 'active', label: '活跃视频任务', value: '12', delta: '正在运行', icon: 'video', tone: 'plain' },
]

export const recentTasks = [
  {
    id: 'T-204',
    title: '夏季新品运动鞋 · 主图批次 #204',
    time: '10 分钟前',
    status: 'done',
    cover: PHOTO.shoeHero,
  },
  {
    id: 'T-203',
    title: '智能手表 618 大促 · 宣传短视频',
    time: '1 小时前',
    status: 'progress',
    cover: PHOTO.watchSmart,
  },
  {
    id: 'T-202',
    title: '复古陶瓷餐具 · 节日广告大片',
    time: '3 小时前',
    status: 'done',
    cover: PHOTO.ceramicTableware,
  },
  {
    id: 'T-201',
    title: '商务双肩包 · 通勤场景图',
    time: '5 小时前',
    status: 'done',
    cover: PHOTO.backpackScene,
  },
]

export const quickActions = [
  {
    key: 'ai-image',
    title: 'AI 图片生成',
    desc: '基于产品图自动生成高质量广告场景图，多风格可选',
    icon: 'image',
    tone: 'brand',
    cta: '立即体验',
    href: '/image-generation',
  },
  {
    key: 'ai-video',
    title: 'AI 视频制作',
    desc: '将静态商品图转为生动的营销短视频，支持口播配音',
    icon: 'video',
    tone: 'brand',
    cta: '立即体验',
    href: '/video-generation',
  },
  {
    key: 'tip',
    title: '今日 AI 技巧',
    desc: '在提示词中加入"电影级光效"或"8K 分辨率"，可显著提升商品图质感',
    icon: 'trending',
    tone: 'gradient',
    cta: '学习更多技巧',
    href: '#',
  },
]

export const dashboardCards = [
  {
    key: 'remove-bg',
    title: '一键移除背景',
    desc: '全新的智能抠图引擎，边缘识别精度提升 40%。',
    icon: 'sparkles',
    tone: 'brand',
    cta: '立即尝试 →',
  },
  {
    key: 'trend',
    title: '生成趋势分析',
    desc: '查看本季度的热点风格，优化您的内容策略。',
    icon: 'trending',
    tone: 'cyan',
    cta: '阅读报告 →',
  },
]

// ---------- 产品库 ----------
export const productFolders = [
  { id: 'summer', name: '2024 夏季新品', count: 24, active: true },
  { id: 'skin', name: '护肤美妆系列', count: 12 },
  { id: 'smart', name: '智能数码家电', count: 8 },
  { id: 'inbox', name: '待分类素材', count: 42 },
]

export const products = [
  {
    id: 'SKU-2401',
    name: '简约白表盘机械手表',
    resolution: '1024×1024',
    date: '2024-03-20',
    cover: PHOTO.watchClassic,
  },
  {
    id: 'SKU-2402',
    name: '降噪蓝牙耳机',
    resolution: '1500×1500',
    date: '2024-03-18',
    cover: PHOTO.headphone,
  },
  {
    id: 'SKU-2403',
    name: '专业跑鞋 · 烈焰红',
    resolution: '1200×1600',
    date: '2024-03-15',
    cover: PHOTO.shoeRunningRed,
  },
  {
    id: 'SKU-2404',
    name: '透气网面运动鞋',
    resolution: '2000×2000',
    date: '2024-03-05',
    cover: PHOTO.shoeMeshWhite,
  },
]

// ---------- 图片生成任务列表 ----------
export const imageTasks = [
  {
    id: 'IMG-2024-001',
    title: '夏季运动鞋 · 主图&场景图批次',
    date: '2024-05-12 14:30',
    count: 24,
    status: 'progress',
    thumbs: [PHOTO.shoeRunningRed, PHOTO.shoeMeshWhite, PHOTO.shoeHero],
  },
  {
    id: 'IMG-2024-002',
    title: '智能数码秋季上新 · 主图素材',
    date: '2024-05-10 09:15',
    count: 12,
    status: 'done',
    thumbs: [PHOTO.watchClassic, PHOTO.headphone, PHOTO.watchSmart],
  },
  {
    id: 'IMG-2024-003',
    title: '复古家居陶瓷系列 · 广告大片',
    date: '2024-05-08 18:20',
    count: 45,
    status: 'done',
    thumbs: [PHOTO.ceramicVase, PHOTO.ceramicTableware, PHOTO.ceramicSet],
  },
]

// ---------- 视频生成任务列表 ----------
export const videoTasks = [
  {
    id: 'VID-2024-001',
    title: '专业跑鞋 · 开箱试穿短视频',
    date: '2024-05-12 14:30',
    count: 8,
    status: 'done',
    thumbs: [PHOTO.shoeRunningRed, PHOTO.shoeMeshWhite, PHOTO.shoeHero],
  },
  {
    id: 'VID-2024-002',
    title: '智能手表 · 使用场景剪辑',
    date: '2024-05-10 09:15',
    count: 12,
    status: 'progress',
    thumbs: [PHOTO.watchClassic, PHOTO.watchSmart, PHOTO.watchLifestyle],
  },
  {
    id: 'VID-2024-003',
    title: '陶瓷餐具 · 节日礼盒广告片',
    date: '2024-05-08 18:20',
    count: 6,
    status: 'done',
    thumbs: [PHOTO.ceramicTableware, PHOTO.ceramicVase, PHOTO.ceramicSet],
  },
]

// ---------- 任务详情 ----------
export const taskDetail = {
  id: 'Task_20240512_034933',
  progress: 33,
  sources: [
    {
      id: 'src1',
      name: '商务双肩包.jpg',
      cover: PHOTO.backpack,
      status: 'completed',
      heroPrompt:
        '极简主义美学，工作室柔光灯箱，浅灰色背景，皮革纹理细节清晰，4K 商品主图。',
      contextPrompt:
        '都市白领手提背包穿行写字楼大堂，自然光，景深虚化，电影质感。',
      videoPrompt:
        '镜头缓缓推近，光影自然变化，4K 高清，10 秒商品展示视频。',
      doneAt: '已完成',
    },
    {
      id: 'src2',
      name: '运动智能手表.png',
      cover: PHOTO.watchSmart,
      status: 'generating',
      heroPrompt:
        '科技感动态背景，深空蓝主色，蓝色霓虹点缀，金属表壳冷光，未来主义风格。',
      contextPrompt:
        '一名慢跑者佩戴手表的特写，清晨公园背景，动感模糊，阳光逆光氛围。',
      videoPrompt:
        '科技感动态光效环绕，蓝色霓虹粒子流动，金属反光闪烁，10 秒酷炫展示。',
      doneAt: '生成中...',
    },
    {
      id: 'src3',
      name: '复古陶瓷花瓶.jpg',
      cover: PHOTO.ceramicVase,
      status: 'pending',
      heroPrompt:
        '复古油画质感，暖色调，莫兰迪配色，釉面光泽细腻，桌面静物布光。',
      contextPrompt: '放置在欧式古典壁炉台上，周围搭配干花装饰，温暖氛围。',
      videoPrompt:
        '柔光自上而下扫过花瓶釉面，缓慢旋转 360 度，温暖油画质感，15 秒展示。',
      doneAt: '待处理',
    },
  ],
  results: [
    {
      id: 'r1',
      title: '商务双肩包 · Hero',
      tag: 'Hero',
      time: '14:32:05',
      cover: unsplash('1553062407-98eeb64c6a62', 900, 900),
    },
    {
      id: 'r2',
      title: '商务双肩包 · 场景',
      tag: 'Context',
      time: '14:33:12',
      cover: unsplash('1547949003-9792a18a2601', 900, 1100),
    },
  ],
}

// ---------- 视频生成弹窗 ----------
export const videoSourceFolder = [
  { id: 'vs1', cover: PHOTO.shoeRunningRed },
  { id: 'vs2', cover: PHOTO.watchClassic },
  { id: 'vs3', cover: PHOTO.headphoneDark },
  { id: 'vs4', cover: PHOTO.sunglassesLuxury },
]

export const videoCandidates = [
  { id: 'vc1', cover: PHOTO.watchClassic },
  { id: 'vc2', cover: PHOTO.watchAngle1 },
  { id: 'vc3', cover: PHOTO.watchAngle2 },
  { id: 'vc4', cover: PHOTO.watchAngle3 },
  { id: 'vc5', cover: PHOTO.watchAngle4 },
  { id: 'vc6', cover: PHOTO.watchLifestyle },
]
