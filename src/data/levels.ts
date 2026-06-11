import type { Level } from "@/types/game";

export const LEVELS: Level[] = [
  {
    id: "awakening",
    title: "觉醒年代",
    era: "1919—1921",
    order: 1,
    badgeTitle: "星火",
  },
  {
    id: "long-march",
    title: "长征之路",
    era: "1934—1936",
    order: 2,
    badgeTitle: "铁流",
  },
  {
    id: "founding",
    title: "开国序章",
    era: "1949",
    order: 3,
    badgeTitle: "新生",
  },
];

export const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l])) as Record<
  Level["id"],
  Level
>;

