/*
 * 777 Tower — EB-5 Investment Presentation invitation.
 * Every word, date and photo on the page comes from this file. Edit here only.
 * After editing: bump the ?v= numbers in index.html, re-run `npm run email` if the envelope changed.
 */
window.EVENT = {
  // ---- event ----
  eventId: "eb5-presentation-2027-01-23",   // must match the row in Supabase table eb5_events
  name: "777 Tower EB-5 Investment Presentation",
  nameCn: "777 Tower EB-5 投资项目发布会",
  date: "2027-01-23",                        // ← year is TENTATIVE; change here only
  displayDate: "January 23, 2027",
  displayDateCn: "1 月 23 日",
  start: "13:00",
  end: "17:00",
  timezone: "America/Los_Angeles",
  displayTime: "1:00 PM – 5:00 PM",
  timeNote: "Pacific Time",
  venue: "777 Tower · 9th Floor",
  address: ["777 S Figueroa Street", "Los Angeles, CA 90017"],
  organizer: "777 Tower",

  // ---- invitation card ----
  kicker: "You Are Cordially Invited",
  salutation: "尊敬的嘉宾：",
  salutationNamed: "尊敬的 {name}：",       // used only when the invitation link resolves to a name
  body: [
    "诚挚邀请您莅临洛杉矶地标建筑 777 Tower，出席 EB-5 投资项目专场发布会。",
    "本次活动将介绍 777 Tower 项目背景、整体发展规划、投资结构及 EB-5 项目相关信息，并为受邀嘉宾提供与项目团队面对面交流的机会。",
    "期待与您相聚洛杉矶，共同探讨未来的投资机遇。"
  ],
  closing: "We Look Forward to Welcoming You.",

  // ---- envelope screen ----
  envelopeAbove: "777 Tower",
  envelopeBelow: "A Private Invitation",
  envelopeHint: "Click to Open",
  envelopeHintTouch: "Tap to Open",

  // ---- RSVP ----
  rsvp: {
    heading: "Kindly RSVP",
    subtitle: "敬请确认您的出席意向",
    attend: "欣然出席 / Accept with Pleasure",
    decline: "遗憾无法出席 / Regretfully Decline",
    button: "Confirm RSVP",
    attendingTitle: "Thank You for Your RSVP",
    attendingText: "期待于 {date} 在 777 Tower 与您相见。",
    declinedTitle: "Thank You for Your Response",
    declinedText: "感谢您的回复，期待未来有机会与您相见。"
  },

  // ---- backend (existing 777 CRM Supabase project; the publishable key is meant to be public) ----
  api: {
    url: "https://nwdxrppcmhbqfkrondjm.supabase.co",
    key: "sb_publishable_RS6TBXVQJECKqu23kIxX_Q_0xt0GvDy"
  },

  // ---- background photo mosaic: real 777 Tower photos only (img/) ----
  // shape: tall | portrait | square | land | wide  (crop only; the photo is never stretched)
  photos: [
    { src: "img/tower-exterior.webp", alt: "777 Tower exterior", shape: "tall" },
    { src: "img/9f-forum.webp", alt: "9th floor — The Forum", shape: "land" },
    { src: "img/lobby-entrance.webp", alt: "777 Tower lobby entrance", shape: "portrait" },
    { src: "img/9f-boardroom.webp", alt: "9th floor — The Boardroom", shape: "wide" },
    { src: "img/elevator-lobby.webp", alt: "Elevator lobby", shape: "square" },
    { src: "img/9f-commons.webp", alt: "9th floor — Hollywood Commons", shape: "land" },
    { src: "img/suite-corridor.webp", alt: "Office suite corridor", shape: "portrait" },
    { src: "img/conference-center.webp", alt: "Conference center", shape: "wide" },
    { src: "img/9f-lounge.webp", alt: "9th floor lounge", shape: "square" },
    { src: "img/suite-reception.webp", alt: "Office suite reception", shape: "land" },
    { src: "img/9f-hub.webp", alt: "9th floor — The Hub", shape: "portrait" },
    { src: "img/9f-studio.webp", alt: "9th floor — The Studio", shape: "land" },
    { src: "img/9f-pantry.webp", alt: "9th floor pantry", shape: "square" },
    { src: "img/suite-3650.webp", alt: "Office suite", shape: "wide" },
    { src: "img/9f-bar.webp", alt: "9th floor bar", shape: "portrait" }
  ]
};
