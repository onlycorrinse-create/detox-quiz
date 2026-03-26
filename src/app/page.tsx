"use client";

import { useState } from "react";

const groups = [
  {
    id: "part1-header",
    type: "part-header",
    text: "ЧАСТЬ 1. Общая диагностика",
  },
  {
    id: "g1",
    type: "group",
    title: "ЖКТ и пищеварение",
    subtitle: "Отметьте, если вам знакомо:",
    image: "/images/olga-start.jpg",
    showImage: false,
    items: [
      "После еды появляется вздутие, урчание или газообразование",
      "Стул нестабильный: запоры или, наоборот, частый стул",
      "После еды возникает изжога, горечь или кислый привкус во рту",
      "Появляется тяжесть в правом подреберье",
      "Вам ставили диагноз: застой желчи, холецистит или желчекаменная болезнь",
      "По утрам есть налёт на языке (белый, желтоватый или серый)",
      "У вас выявляли Хеликобактер Пилори",
    ],
  },
  {
    id: "g2",
    type: "group",
    title: "Состояние кожи",
    subtitle: "",
    image: "/images/skin.jpg",
    showImage: true,
    items: [
      "Есть высыпания на лице",
      "Появляются прыщи на спине или груди",
      "Кожа сухая, чувствительная или периодически зудит",
      "Есть папилломы, бородавки или «красные точки»",
      "Есть дерматит, экзема или псориаз",
    ],
  },
  {
    id: "g3",
    type: "group",
    title: "Энергия и общее состояние",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Постоянная усталость, ощущение «энергии на нуле»",
      "Просыпаетесь уже уставшими",
      "Хватает сил только на обязательные дела",
      "После еды возникает сонливость",
      "Часто тянет на кофе, сладкое или энергетики",
    ],
  },
  {
    id: "g4",
    type: "group",
    title: "Иммунитет и инфекции",
    subtitle: "",
    image: "/images/immune.jpg",
    showImage: true,
    items: [
      "Часто болеете",
      "Долго восстанавливаетесь после болезни",
      "Повторяются грибковые инфекции",
      "Был частый или длительный приём антибиотиков",
    ],
  },
  {
    id: "g5",
    type: "group",
    title: "Вес и обмен веществ",
    subtitle: "",
    image: "/images/weightloss.jpg",
    showImage: true,
    items: [
      "Есть лишний вес",
      "Вес не уходит, несмотря на питание и физическую активность",
      "Есть заметные колебания веса",
    ],
  },
  {
    id: "g6",
    type: "group",
    title: "Общее самочуствие",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Часто болит голова",
      "Есть ощущение «тумана» в голове",
      "Сложно концентрироваться, снизилась ясность мышления",
    ],
  },
  {
    id: "g7",
    type: "group",
    title: "Здоровье суставов",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Есть боли или скованность в суставах при движении или в покое",
      "По утрам есть скованность в теле",
      "Есть ощущение «скрипа» или дискомфорта в суставах",
      "Иногда появляется ломота в теле без явной причины",
    ],
  },
  {
    id: "g8",
    type: "group",
    title: "Сон и восстановление",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Сложно уснуть вечером",
      "Часто просыпаетесь ночью",
      "Есть бессонница",
      "После сна нет ощущения восстановления",
      "Принимаете снотворные или антидепрессанты",
    ],
  },
  {
    id: "g9",
    type: "group",
    title: "Диагностика анализов (общий анализ крови)",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "СОЭ (Мужчины >15 мм/ч , Женщины >20 мм/ч)",
      "Гематокрит (Мужчины > 50%, Женщины >46%)",
      "Лейкоциты больше 9,0 или меньше 4,0",
    ],
  },
  {
    id: "g10",
    type: "group",
    title: "Диагностика анализов (биохимический анализ крови)",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Общий белок > 70",
      "Альбумин < 40",
      "Ферритин < 30 или > 150",
      "Гомоцистеин > 10",
      "АЛТ / АСТ / ГГТ >38",
      "ЛПНП ≥ 3,3",
      "ЛПОНП > 0,78",
      "Мочевина > 7",
    ],
  },
  {
    id: "part2-header",
    type: "part-header",
    text: "ЧАСТЬ 2. Есть ли риск паразитарной нагрзуки",
  },
  {
    id: "g11",
    type: "group",
    title: "Специфические сигналы ЖКТ",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Есть слизь в стуле",
      "Есть ощущение слизи в горле, желание откашляться",
      "Чувство голода вскоре после еды",
      "Потеря веса при хорошем аппетите",
    ],
  },
  {
    id: "g12",
    type: "group",
    title: "Поведенческие и нейромышечные признаки",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Скрипите зубами во сне (бруксизм)",
      "Постоянно хочется сладкого или мучного",
    ],
  },
  {
    id: "g13",
    type: "group",
    title: "Внешние проявления",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Есть неприятный запах изо рта или от тела, который сложно убрать",
      "Появляются высыпания в области шеи и груди без понятной причины",
      "Есть зуд кожи без чёткой причины",
    ],
  },
  {
    id: "g14",
    type: "group",
    title: "Атипичные реакции организма",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Появились новые аллергические реакции (на холод, солнце, пищевые продукты)",
      "Есть реакции, которые сложно объяснить и которые не проходят",
    ],
  },
  {
    id: "g15",
    type: "group",
    title: "Хронические и рецидивирующие состояния",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Часто повторяются одни и те же симптомы, несмотря на лечение",
      "Есть состояния, которые «временно улучшаются, но возвращаются»",
    ],
  },
  {
    id: "g16",
    type: "group",
    title: "Факторы риска заражения",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Есть домашние животные (кошки, собаки)",
      "Был опыт паразитарных инфекций (лямблии, описторхоз, острицы и др.)",
      "Употребляете сырую или недостаточно обработанную рыбу или мясо",
      "Пробуете сырой фарш или продукты в процессе готовки",
      "Контактируете с землей (сад, огород)",
      "Употребляете ягоды, зелень или овощи без мытья",
      "Купаетесь в открытых водоёмах (реки, озёра)",
      "Были поездки в странах с жарким климатом",
    ],
  },
  {
    id: "g17",
    type: "group",
    title: "Лабораторные признаки",
    subtitle: "",
    image: "",
    showImage: false,
    items: [
      "Анемия, которая плохо поддаётся лечению",
      "Дефициты витаминов группы B",
      "IgE общий > 100",
      "Эозинофильный катионный белок (ECP) > 24",
    ],
  },
];

const printStyles = "@media print { .no-print { display: none !important; } body { background: white; } }";

function SafeImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [hidden, setHidden] = useState(false);
  if (!src || hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHidden(true)}
      style={{ width: "100%", borderRadius: 16, marginBottom: 12, display: "block", ...style }}
    />
  );
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalChecked = Object.values(checked).filter(Boolean).length;

  if (!started) {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 480, width: "100%", padding: "40px 16px" }}>
          <SafeImage src="/images/olga-start.jpg" alt="Начало теста" />
          <div style={{ textAlign: "center" }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "#d1fae5",
              color: "#065f46",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "4px 12px",
              borderRadius: 20,
              marginBottom: 16,
            }}>
              ТЕСТ
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 12, lineHeight: 1.3 }}>
              Насколько ваш организм нуждается в детоксе?
            </h1>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Ответьте на вопросы ниже и отметьте все утверждения, которые наблюдались у вас хотя бы несколько раз за последние 3–6 месяцев.
            </p>
            <button
              onClick={() => setStarted(true)}
              style={{
                display: "block",
                width: "100%",
                backgroundColor: "#10b981",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 24px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
              }}
            >
              Пройти тест →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 100px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#111827" }}>
          Насколько ваш организм нуждается в детоксе?
        </h1>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
          Ответьте на вопросы ниже и отметьте все утверждения, которые наблюдались у вас хотя бы несколько раз за последние 3–6 месяцев.
        </p>

        {groups.map((block) => {
          if (block.type === "part-header") {
            return (
              <div key={block.id} style={{
                backgroundColor: "#065f46",
                color: "#ffffff",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 1,
                padding: "12px 20px",
                borderRadius: 12,
                marginBottom: 28,
                marginTop: 16,
              }}>
                {block.text}
              </div>
            );
          }

          const g = block as typeof groups[1];

          return (
            <div key={g.id} style={{ marginBottom: 28 }}>
              {g.showImage && g.image && (
                <SafeImage src={g.image} alt={g.title} />
              )}
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", marginBottom: 4 }}>
                {g.title}
              </h3>
              {g.subtitle ? (
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
                  {g.subtitle}
                </p>
              ) : null}

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {g.items.map((item, i) => {
                  const key = g.id + "-" + i;
                  const isChecked = !!checked[key];
                  return (
                    <label
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: isChecked ? "2px solid #10b981" : "2px solid #e5e7eb",
                        backgroundColor: isChecked ? "#ecfdf5" : "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(key)}
                        style={{ marginTop: 2, width: 16, height: 16, accentColor: "#10b981", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="no-print"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e7eb",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 14, color: "#6b7280" }}>
          Отмечено: <strong style={{ color: "#111827" }}>{totalChecked}</strong>
        </span>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: "#111827",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 14,
            padding: "10px 24px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Сохранить как PDF
        </button>
      </div>
    </div>
  );
}
