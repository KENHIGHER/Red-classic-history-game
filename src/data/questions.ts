import type { Question } from "@/types/game";

export const QUESTIONS: Question[] = [
  {
    id: "q-aw-1",
    levelId: "awakening",
    type: "timeline",
    prompt: "将事件按时间先后排序（从早到晚）",
    points: 20,
    items: [
      { id: "a", text: "五四运动爆发", year: 1919 },
      { id: "b", text: "中国共产党第一次全国代表大会召开", year: 1921 },
      { id: "c", text: "《新青年》成为新文化运动重要阵地", year: 1915 },
      { id: "d", text: "《共产党宣言》中文全译本广泛传播（早期译介）", year: 1920 },
    ],
    explanation:
      "新文化运动推动思想启蒙（1915起），五四运动（1919）进一步激发社会变革，《共产党宣言》译介传播（1920前后）推动马克思主义传播，随后中共一大（1921）召开。",
  },
  {
    id: "q-aw-2",
    levelId: "awakening",
    type: "choice",
    prompt: "五四运动最直接的导火索之一是？",
    points: 10,
    options: [
      { id: "a", text: "巴黎和会上中国外交失败" },
      { id: "b", text: "土地革命全面展开" },
      { id: "c", text: "抗日战争进入相持阶段" },
      { id: "d", text: "三大战役胜利结束" },
    ],
    answerId: "a",
    explanation: "五四运动与巴黎和会外交失败密切相关，激发了青年学生和广大群众的爱国热情与行动。",
  },
  {
    id: "q-aw-3",
    levelId: "awakening",
    type: "quote",
    prompt: "辨识语录背景：这句话最常与哪一类精神相连？",
    points: 10,
    quote: "“青年如初春，如朝日，如百卉之萌动，如利刃之新发于硎。”",
    options: [
      { id: "a", text: "新文化运动与青年觉醒" },
      { id: "b", text: "长征精神与革命理想" },
      { id: "c", text: "抗美援朝与保家卫国" },
      { id: "d", text: "改革开放与创业创新" },
    ],
    answerId: "a",
    explanation: "该类语录常用于强调青年觉醒与思想启蒙的时代气质，与新文化运动的社会氛围相呼应。",
  },
  {
    id: "q-lm-1",
    levelId: "long-march",
    type: "timeline",
    prompt: "将事件按时间先后排序（从早到晚）",
    points: 20,
    items: [
      { id: "a", text: "中央红军开始长征", year: 1934 },
      { id: "b", text: "遵义会议召开", year: 1935 },
      { id: "c", text: "三大主力红军会师", year: 1936 },
      { id: "d", text: "四渡赤水（关键机动作战）", year: 1935 },
    ],
    explanation: "长征从1934年出发；1935年先后经历遵义会议与四渡赤水等关键节点；1936年三大主力会师，长征胜利结束。",
  },
  {
    id: "q-lm-2",
    levelId: "long-march",
    type: "choice",
    prompt: "遵义会议的重要意义更接近哪一项？",
    points: 10,
    options: [
      { id: "a", text: "确立了正确的军事与组织路线，成为生死攸关的转折点" },
      { id: "b", text: "宣告中华人民共和国成立" },
      { id: "c", text: "全面建立抗日民族统一战线" },
      { id: "d", text: "完成社会主义改造" },
    ],
    answerId: "a",
    explanation: "遵义会议是党和红军历史上的重要转折点，为后续胜利奠定了基础。",
  },
  {
    id: "q-lm-3",
    levelId: "long-march",
    type: "quote",
    prompt: "辨识语录气质：它最贴近哪种精神表达？",
    points: 10,
    quote: "“雄关漫道真如铁，而今迈步从头越。”",
    options: [
      { id: "a", text: "长征精神：不畏艰险、百折不挠" },
      { id: "b", text: "延安精神：自力更生、艰苦奋斗" },
      { id: "c", text: "特区精神：敢闯敢试、敢为人先" },
      { id: "d", text: "雷锋精神：助人为乐、无私奉献" },
    ],
    answerId: "a",
    explanation: "该类表达常被用来象征在困难面前重新出发、勇往直前的革命意志，贴近长征精神的叙事语境。",
  },
  {
    id: "q-fd-1",
    levelId: "founding",
    type: "timeline",
    prompt: "将事件按时间先后排序（从早到晚）",
    points: 20,
    items: [
      { id: "a", text: "三大战役基本胜利", year: 1949 },
      { id: "b", text: "中国人民政治协商会议第一届全体会议召开", year: 1949 },
      { id: "c", text: "中华人民共和国成立（开国大典）", year: 1949 },
      { id: "d", text: "渡江战役胜利，南京解放", year: 1949 },
    ],
    explanation: "1949年是历史性年份：三大战役胜利奠定大局，渡江战役推进解放进程，政协会议为建国做制度与筹备，随后举行开国大典。",
  },
  {
    id: "q-fd-2",
    levelId: "founding",
    type: "choice",
    prompt: "“中华人民共和国成立”对中国社会最重要的历史意义之一是？",
    points: 10,
    options: [
      { id: "a", text: "实现民族独立和人民解放，开启国家建设新阶段" },
      { id: "b", text: "完成从农业国到工业强国的全面跨越" },
      { id: "c", text: "结束世界大战并建立国际联盟" },
      { id: "d", text: "实现全国范围内的市场经济体制" },
    ],
    answerId: "a",
    explanation: "新中国成立标志着民族独立与人民解放的实现，国家进入新的历史阶段。",
  },
  {
    id: "q-fd-3",
    levelId: "founding",
    type: "quote",
    prompt: "辨识语录场景：更符合哪种历史叙事？",
    points: 10,
    quote: "“中国人民从此站起来了！”",
    options: [
      { id: "a", text: "开国大典与新中国成立" },
      { id: "b", text: "井冈山斗争与农村包围城市" },
      { id: "c", text: "遵义会议与战略转折" },
      { id: "d", text: "抗日战争胜利与和平建国" },
    ],
    answerId: "a",
    explanation: "该语录与新中国成立的历史场景高度关联，象征人民当家作主的新篇章。",
  },
];

export const QUESTIONS_BY_LEVEL = QUESTIONS.reduce<Record<string, Question[]>>((acc, q) => {
  acc[q.levelId] ??= [];
  acc[q.levelId].push(q);
  return acc;
}, {});

