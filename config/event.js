/*
 * 777 Tower EB-5 投资项目发布会 · 邀请函.
 * Every word, date and photo on the page comes from this file. Edit here only.
 * After editing: bump the ?v= numbers in index.html, re-run `npm run email` if the envelope changed.
 */
window.EVENT = {
  // ---- event ----
  eventId: "eb5-presentation-2027-01-23",   // must match the row in Supabase table eb5_events
  name: "777 Tower EB-5 投资项目发布会",
  titleTop: "777 TOWER · EB-5",
  titleMain: "投资项目发布会",
  calendarTitle: "777 Tower EB-5 投资项目发布会",
  date: "2027-01-23",                        // ← year is TENTATIVE; change here only (weekday is computed)
  start: "13:00",
  end: "17:00",
  timezone: "America/Los_Angeles",
  displayTime: "下午 1:00 – 5:00",
  timeNote: "美国太平洋时间",
  venue: "777 Tower 9 楼",
  addressCn: "美国加州洛杉矶 菲格罗亚南街 777 号",
  addressMap: "777 S Figueroa Street, Los Angeles, CA 90017",   // only used in calendar files (for maps), not shown
  organizer: "777 Tower 敬邀",

  // ---- invitation card ----
  kicker: "诚挚邀请",
  salutation: "尊敬的嘉宾：",
  salutationNamed: "尊敬的 {name}：",       // used only when the invitation link resolves to a name
  body: [
    "诚挚邀请您莅临洛杉矶地标建筑 777 Tower，出席 EB-5 投资项目专场发布会。",
    "本次活动将介绍 777 Tower 项目背景、整体发展规划、投资结构及 EB-5 项目相关信息，并为受邀嘉宾提供与项目团队面对面交流的机会。",
    "期待与您相聚洛杉矶，共同探讨未来的投资机遇。"
  ],
  closing: "恭候您的光临",

  // ---- envelope screen ----
  envelopeAbove: "777 Tower",
  envelopeBelow: "私人邀请函",
  envelopeHint: "点击开启",
  envelopeHintTouch: "轻触开启",
  letterKicker: "敬邀",
  letterTitle: "EB-5 投资项目发布会",
  skip: "跳过动画",

  // ---- RSVP ----
  rsvp: {
    heading: "回执",
    subtitle: "敬请确认您的出席意向",
    name: "姓名",
    email: "电子邮箱",
    phone: "联系电话",
    optional: "（选填）",
    attendance: "出席意向",
    attend: "欣然出席",
    decline: "遗憾无法出席",
    button: "确认回复",
    attendingTitle: "感谢您的确认",
    attendingText: "期待于 {date} 在 777 Tower 与您相见。",
    declinedTitle: "感谢您的回复",
    declinedText: "感谢您的回复，期待未来有机会与您相见。",
    calendar: "添加到日历",
    google: "Google 日历",
    edit: "修改回复"
  },

  // ---- backend (existing 777 CRM Supabase project; the publishable key is meant to be public) ----
  api: {
    url: "https://nwdxrppcmhbqfkrondjm.supabase.co",
    key: "sb_publishable_RS6TBXVQJECKqu23kIxX_Q_0xt0GvDy"
  },

  // ---- background photo mosaic: real 777 Tower photos only (img/) ----
  // shape: tall | portrait | square | land | wide  (crop only; the photo is never stretched)
  photos: [
    { src: "img/tower-exterior.webp", alt: "777 Tower 外观", shape: "tall" },
    { src: "img/9f-forum.webp", alt: "9 楼会议厅", shape: "land" },
    { src: "img/lobby-entrance.webp", alt: "大堂入口", shape: "portrait" },
    { src: "img/9f-boardroom.webp", alt: "9 楼董事会议室", shape: "wide" },
    { src: "img/elevator-lobby.webp", alt: "电梯厅", shape: "square" },
    { src: "img/9f-commons.webp", alt: "9 楼公共区", shape: "land" },
    { src: "img/suite-corridor.webp", alt: "办公楼层走廊", shape: "portrait" },
    { src: "img/conference-center.webp", alt: "会议中心", shape: "wide" },
    { src: "img/9f-lounge.webp", alt: "9 楼休息区", shape: "square" },
    { src: "img/suite-reception.webp", alt: "办公室前台", shape: "land" },
    { src: "img/9f-hub.webp", alt: "9 楼多功能厅", shape: "portrait" },
    { src: "img/9f-studio.webp", alt: "9 楼工作室", shape: "land" },
    { src: "img/9f-pantry.webp", alt: "9 楼茶水区", shape: "square" },
    { src: "img/suite-3650.webp", alt: "办公空间", shape: "wide" },
    { src: "img/9f-bar.webp", alt: "9 楼吧台", shape: "portrait" }
  ]
};
