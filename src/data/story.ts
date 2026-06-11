import type { LevelId } from "@/types/game";

export type StoryScene = {
  title: string;
  subtitle?: string;
  lines: string[];
  cta: string;
};

export type LevelStory = {
  prologue: StoryScene;
  interludes: StoryScene[];
  finale: StoryScene;
};

export const STORY: Record<LevelId, LevelStory> = {
  awakening: {
    prologue: {
      title: "档案启封",
      subtitle: "1915—1921 · 思想的风，青年先听见",
      lines: [
        "你收到一份“旧报与会议纪要”的复刻件：纸张泛黄，却字字锋利。",
        "任务不是背答案，而是把时代线索串成一条清晰的时间脉络。",
      ],
      cta: "进入第一幕",
    },
    interludes: [
      {
        title: "第一幕 · 风起",
        subtitle: "线索提示：从“启蒙”到“行动”只隔一场呼喊",
        lines: ["当新思想被印成铅字，青年先在纸面上觉醒。", "而当外交失利的消息传来，纸面上的愤怒走上街头。"],
        cta: "进入下一题",
      },
      {
        title: "第二幕 · 传播",
        subtitle: "线索提示：译介与传播，让理论变成道路",
        lines: ["当一种解释世界的方式被翻译、讨论、传播，", "它就不再是书页上的文字，而是行动者的共同语言。"],
        cta: "进入下一题",
      },
    ],
    finale: {
      title: "本关尾声",
      subtitle: "你已把线索连成一条清楚的起点",
      lines: ["从启蒙到觉醒，从传播到组织，", "你并非在答题，而是在复原“为什么会发生”。"],
      cta: "查看结算",
    },
  },
  "long-march": {
    prologue: {
      title: "军令电报",
      subtitle: "1934—1936 · 路远，心更远",
      lines: ["你接到一份“行军电报”复刻：字句简短，却带着急促的呼吸。", "你要做的，是在巨大的不确定中辨认“关键转折”。"],
      cta: "进入第一幕",
    },
    interludes: [
      {
        title: "第一幕 · 出发",
        subtitle: "线索提示：起点往往最艰难",
        lines: ["长征不是一条直线，它像一条不断折返的河。", "先记住出发，再去辨认转折发生在哪里。"],
        cta: "进入下一题",
      },
      {
        title: "第二幕 · 转折",
        subtitle: "线索提示：在最危险处，方向被重新校准",
        lines: ["一次会议，改变的不只是部署，还有信心。", "当路线更清晰，队伍才能在绝境中继续前行。"],
        cta: "进入下一题",
      },
    ],
    finale: {
      title: "本关尾声",
      subtitle: "你抓住了“起点—转折—会师”的骨架",
      lines: ["把节点串起来，你会发现“精神”不是口号，", "它来自一次次选择：继续走下去。"],
      cta: "查看结算",
    },
  },
  founding: {
    prologue: {
      title: "城楼之前",
      subtitle: "1949 · 一年之内，天地改写",
      lines: ["你翻开“筹备与通告”的复刻：字里行间是秩序的建立。", "你要在同一年里辨认先后与因果：大局如何落定。"],
      cta: "进入第一幕",
    },
    interludes: [
      {
        title: "第一幕 · 大势",
        subtitle: "线索提示：胜负之外，还有治理的开始",
        lines: ["战争的胜利给出方向，", "但真正的开始，是让人民的生活重新有秩序。"],
        cta: "进入下一题",
      },
      {
        title: "第二幕 · 准备",
        subtitle: "线索提示：制度与共识，是开国前的“看不见的工程”",
        lines: ["在城楼上宣告之前，", "需要一套筹备：会议、章程、象征与共识。"],
        cta: "进入下一题",
      },
    ],
    finale: {
      title: "本关尾声",
      subtitle: "你把“战局—筹备—宣告”拼成了完整画面",
      lines: ["记住不是为了复述，而是为了理解：", "为什么这一天，会被后来的人反复提起。"],
      cta: "查看结算",
    },
  },
};
