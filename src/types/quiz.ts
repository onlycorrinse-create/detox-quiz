export type ResultLevel = "low" | "medium" | "high";

export interface QuizResult {
  selectedCount: number;
  level: ResultLevel;
  answers: Record<number, string[]>;
}

export interface ResultConfig {
  level: ResultLevel;
  label: string;
  description: string;
  recommendations: string[];
  color: string;
}

export const RESULT_CONFIG: Record<ResultLevel, ResultConfig> = {
  low: {
    level: "low",
    label: "Низкая нагрузка на организм",
    description:
      "Ваш организм справляется с токсической нагрузкой самостоятельно. Вы ведёте достаточно здоровый образ жизни. Продолжайте в том же духе!",
    recommendations: [
      "Поддерживайте текущий образ жизни",
      "Пейте достаточно воды",
      "Регулярно занимайтесь физической активностью",
      "Проходите профилактические осмотры",
    ],
    color: "green",
  },
  medium: {
    level: "medium",
    label: "Средняя токсическая нагрузка",
    description:
      "Ваш организм испытывает умеренную нагрузку. Некоторые системы работают не в полную силу. Стоит обратить внимание на детоксикацию.",
    recommendations: [
      "Пересмотрите питание: больше овощей и воды",
      "Снизьте потребление алкоголя и кофеина",
      "Добавьте регулярные прогулки или тренировки",
      "Рассмотрите курс мягкой детоксикации",
      "Улучшите качество сна",
    ],
    color: "yellow",
  },
  high: {
    level: "high",
    label: "Высокая токсическая нагрузка",
    description:
      "Ваш организм перегружен и нуждается в серьёзной поддержке. Множество симптомов указывают на необходимость детоксикации.",
    recommendations: [
      "Срочно проконсультируйтесь с врачом или нутрициологом",
      "Начните программу детоксикации под контролем специалиста",
      "Полностью исключите алкоголь и переработанную пищу",
      "Пейте не менее 2 литров чистой воды в день",
      "Рассмотрите лечебное голодание или специальные протоколы",
      "Обратите внимание на работу печени и кишечника",
    ],
    color: "red",
  },
};

export function calculateResult(answers: Record<number, string[]>): QuizResult {
  const selectedCount = Object.values(answers).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  let level: ResultLevel;
  if (selectedCount <= 10) {
    level = "low";
  } else if (selectedCount <= 25) {
    level = "medium";
  } else {
    level = "high";
  }

  return { selectedCount, level, answers };
}
