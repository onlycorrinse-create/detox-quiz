"use client";

import { useState, useRef } from "react";

const imgStyle = {
  width: "100%",
  height: "auto",
  borderRadius: "16px",
  marginBottom: "12px",
  display: "block",
};

const part1Groups = [
  {
    id: "g1",
    title: "ЖКТ и пищеварение",
    subtitle: "Отметьте, если вам знакомо:",
    image: "/images/gut.jpg",
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
    title: "Состояние кожи",
    subtitle: "",
    image: "/images/skin.jpg",
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
    title: "Энергия и общее состояние",
    subtitle: "",
    image: "/images/energy.jpg",
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
    title: "Иммунитет и инфекции",
    subtitle: "",
    image: "/images/immune.jpg",
    items: [
      "Часто болеете",
      "Долго восстанавливаетесь после болезни",
      "Повторяются грибковые инфекции",
      "Был частый или длительный приём антибиотиков",
    ],
  },
  {
    id: "g5",
    title: "Вес и обмен веществ",
    subtitle: "",
    image: "/images/weightloss.jpg",
    items: [
      "Есть лишний вес",
      "Вес не уходит, несмотря на питание и физическую активность",
      "Есть заметные колебания веса",
    ],
  },
  {
    id: "g6",
    title: "Общее самочуствие",
    subtitle: "",
    image: "/images/headache.jpg",
    items: [
      "Часто болит голова",
      "Есть ощущение «тумана» в голове",
      "Сложно концентрироваться, снизилась ясность мышления",
    ],
  },
  {
    id: "g7",
    title: "Здоровье суставов",
    subtitle: "",
    image: "",
    items: [
      "Есть боли или скованность в суставах при движении или в покое",
      "По утрам есть скованность в теле",
      "Есть ощущение «скрипа» или дискомфорта в суставах",
      "Иногда появляется ломота в теле без явной причины",
    ],
  },
  {
    id: "g8",
    title: "Сон и восстановление",
    subtitle: "",
    image: "/images/sleep.png",
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
    title: "Диагностика анализов (общий анализ крови)",
    subtitle: "",
    image: "",
    items: [
      "СОЭ (Мужчины >15 мм/ч , Женщины >20 мм/ч)",
      "Гематокрит (Мужчины > 50%, Женщины >46%)",
      "Лейкоциты больше 9,0 или меньше 4,0",
    ],
  },
  {
    id: "g10",
    title: "Диагностика анализов (биохимический анализ крови)",
    subtitle: "",
    image: "",
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
];

const part2Groups = [
  {
    id: "g11",
    title: "Специфические сигналы ЖКТ",
    subtitle: "",
    image: "",
    items: [
      "Есть слизь в стуле",
      "Есть ощущение слизи в горле, желание откашляться",
      "Чувство голода вскоре после еды",
      "Потеря веса при хорошем аппетите",
    ],
  },
  {
    id: "g12",
    title: "Поведенческие и нейромышечные признаки",
    subtitle: "",
    image: "",
    items: [
      "Скрипите зубами во сне (бруксизм)",
      "Постоянно хочется сладкого или мучного",
    ],
  },
  {
    id: "g13",
    title: "Внешние проявления",
    subtitle: "",
    image: "",
    items: [
      "Есть неприятный запах изо рта или от тела, который сложно убрать",
      "Появляются высыпания в области шеи и груди без понятной причины",
      "Есть зуд кожи без чёткой причины",
    ],
  },
  {
    id: "g14",
    title: "Атипичные реакции организма",
    subtitle: "",
    image: "",
    items: [
      "Появились новые аллергические реакции (на холод, солнце, пищевые продукты)",
      "Есть реакции, которые сложно объяснить и которые не проходят",
    ],
  },
  {
    id: "g15",
    title: "Хронические и рецидивирующие состояния",
    subtitle: "",
    image: "",
    items: [
      "Часто повторяются одни и те же симптомы, несмотря на лечение",
      "Есть состояния, которые «временно улучшаются, но возвращаются»",
    ],
  },
  {
    id: "g16",
    title: "Факторы риска заражения",
    subtitle: "",
    image: "",
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
    title: "Лабораторные признаки",
    subtitle: "",
    image: "",
    items: [
      "Анемия, которая плохо поддаётся лечению",
      "Дефициты витаминов группы B",
      "IgE общий > 100",
      "Эозинофильный катионный белок (ECP) > 24",
    ],
  },
];

type Screen = "start" | "part1" | "part2" | "result";

function GroupBlock({
  group,
  checked,
  onToggle,
}: {
  group: typeof part1Groups[0];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", marginBottom: 8 }}>
        {group.title}
      </h3>
      {group.image ? <img src={group.image} alt="" style={imgStyle} /> : null}
      {group.subtitle ? (
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{group.subtitle}</p>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {group.items.map((item, i) => {
          const key = group.id + "-" + i;
          const isChecked = !!checked[key];
          return (
            <label key={key} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              padding: "12px 16px", borderRadius: 12,
              border: isChecked ? "2px solid #10b981" : "2px solid #e5e7eb",
              backgroundColor: isChecked ? "#ecfdf5" : "#ffffff",
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(key)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: "#10b981", flexShrink: 0 }}
              />
              <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

const printStyles = "@media print { .no-print { display: none !important; } body { background: white; } }";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("start");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goTo = (s: Screen) => { setScreen(s); scrollTop(); };

  const totalChecked = Object.values(checked).filter(Boolean).length;

  const allGroups = [...part1Groups, ...part2Groups];

  // Build grouped checked items
  const byGroup: { title: string; items: string[] }[] = [];
  allGroups.forEach((g) => {
    const selected = g.items.filter((_, i) => checked[g.id + "-" + i]);
    if (selected.length > 0) byGroup.push({ title: g.title, items: selected });
  });

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    setImgLoading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(resultRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "detox-result.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setImgLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email) return;
    setEmailStatus("sending");
    try {
      const res = await fetch("/api/send-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, groups: byGroup, total: totalChecked }),
      });
      setEmailStatus(res.ok ? "sent" : "error");
    } catch {
      setEmailStatus("error");
    }
  };

  // ── START ──────────────────────────────────────────────────────────────────
  if (screen === "start") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 480, width: "100%", padding: "40px 16px" }}>
          <img src="/images/olga-start.jpg" alt="" style={{ width: "100%", height: "auto", borderRadius: "20px", marginBottom: "20px", display: "block" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>
              ТЕСТ
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 12, lineHeight: 1.3 }}>
              Насколько ваш организм нуждается в детоксе?
            </h1>
            <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              Ответьте на вопросы ниже и отметьте все утверждения, которые наблюдались у вас хотя бы несколько раз за последние 3–6 месяцев.
            </p>
            <button onClick={() => goTo("part1")} style={{ display: "block", width: "100%", backgroundColor: "#10b981", color: "#ffffff", fontWeight: 700, fontSize: 16, padding: "14px 24px", borderRadius: 14, border: "none", cursor: "pointer" }}>
              Пройти тест →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PART 1 ─────────────────────────────────────────────────────────────────
  if (screen === "part1") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 120px" }}>
          <div style={{ backgroundColor: "#065f46", color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 1, padding: "12px 20px", borderRadius: 12, marginBottom: 28 }}>
            ЧАСТЬ 1. Общая диагностика
          </div>
          {part1Groups.map((g) => (
            <GroupBlock key={g.id} group={g} checked={checked} onToggle={toggle} />
          ))}
        </div>
        <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "1px solid #e5e7eb", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <button onClick={() => goTo("start")} style={{ fontSize: 14, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>← Назад</button>
          <button onClick={() => goTo("part2")} style={{ backgroundColor: "#10b981", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 32px", borderRadius: 12, border: "none", cursor: "pointer" }}>
            Далее: Часть 2 →
          </button>
        </div>
      </div>
    );
  }

  // ── PART 2 ─────────────────────────────────────────────────────────────────
  if (screen === "part2") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 120px" }}>
          <div style={{ backgroundColor: "#065f46", color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 1, padding: "12px 20px", borderRadius: 12, marginBottom: 28 }}>
            ЧАСТЬ 2. Есть ли риск паразитарной нагрзуки
          </div>
          {part2Groups.map((g) => (
            <GroupBlock key={g.id} group={g} checked={checked} onToggle={toggle} />
          ))}
        </div>
        <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "1px solid #e5e7eb", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <button onClick={() => goTo("part1")} style={{ fontSize: 14, color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>← Назад</button>
          <button onClick={() => goTo("result")} style={{ backgroundColor: "#111827", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px 32px", borderRadius: 12, border: "none", cursor: "pointer" }}>
            Завершить →
          </button>
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ──────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 140px" }}>

        {/* Result card — this is what gets saved as image */}
        <div ref={resultRef} style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
              Насколько ваш организм нуждается в детоксе?
            </h2>
            <div style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: 700, fontSize: 14, padding: "6px 16px", borderRadius: 20 }}>
              Отмечено утверждений: {totalChecked}
            </div>
          </div>

          {/* Checked items */}
          {byGroup.length === 0 ? (
            <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 15 }}>
              Вы не отметили ни одного утверждения
            </p>
          ) : (
            byGroup.map((group) => (
              <div key={group.title} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #d1fae5" }}>
                  {group.title}
                </div>
                {group.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))
          )}

          {/* Footer */}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #f3f4f6", textAlign: "center", color: "#d1d5db", fontSize: 12 }}>
            pomoynetskayabot.ru
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Save as image */}
          <button
            onClick={handleSaveImage}
            disabled={imgLoading}
            style={{ width: "100%", backgroundColor: "#111827", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 12, border: "none", cursor: "pointer", opacity: imgLoading ? 0.6 : 1 }}
          >
            {imgLoading ? "Сохраняю..." : "🖼 Сохранить результат как изображение"}
          </button>

          {/* Save as PDF */}
          <button
            onClick={() => window.print()}
            style={{ width: "100%", backgroundColor: "#374151", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 12, border: "none", cursor: "pointer" }}
          >
            📄 Сохранить как PDF
          </button>

          {/* Send by email */}
          <button
            onClick={() => setShowEmailInput(!showEmailInput)}
            style={{ width: "100%", backgroundColor: "#ecfdf5", color: "#065f46", fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 12, border: "2px solid #a7f3d0", cursor: "pointer" }}
          >
            ✉️ Отправить себе на почту
          </button>

          {showEmailInput && (
            <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20 }}>
              <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, marginBottom: 12, boxSizing: "border-box" as const }}
              />
              <button
                onClick={handleSendEmail}
                disabled={emailStatus === "sending" || !email}
                style={{ width: "100%", backgroundColor: "#10b981", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px", borderRadius: 10, border: "none", cursor: "pointer", opacity: emailStatus === "sending" ? 0.6 : 1 }}
              >
                {emailStatus === "sending" ? "Отправляю..." : emailStatus === "sent" ? "✓ Отправлено!" : emailStatus === "error" ? "Ошибка, попробуйте ещё" : "Отправить"}
              </button>
            </div>
          )}

          {/* Restart */}
          <button
            onClick={() => { setChecked({}); setEmail(""); setEmailStatus("idle"); setShowEmailInput(false); goTo("start"); }}
            style={{ width: "100%", backgroundColor: "transparent", color: "#9ca3af", fontWeight: 600, fontSize: 14, padding: "12px", borderRadius: 12, border: "1px solid #e5e7eb", cursor: "pointer" }}
          >
            Пройти тест заново
          </button>
        </div>
      </div>
    </div>
  );
}

