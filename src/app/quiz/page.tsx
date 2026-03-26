"use client";

import { useState, useRef, useEffect } from "react";
import { saveQuizResult } from "@/lib/supabase";

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
      "Часто тянет на кофе или сладкое",
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
    id: "g8b",
    title: "Приём препаратов и медикаментозная нагрузка",
    subtitle: "",
    image: "",
    items: [
      "Был частый или длительный приём антибиотиков",
      "Принимаете или принимали гормональные препараты",
      "Принимаете оральные контрацептивы (КОК)",
      "Принимаете ингибиторы протонной помпы (ИПП, препараты от изжоги)",
      "Часто принимаете жаропонижающие или обезболивающие",
      "Есть регулярный приём любых лекарств на постоянной основе",
    ],
  },
  {
    id: "g9",
    title: "Диагностика анализов (общий анализ крови)",
    subtitle: "Отметьте, если данные вам известны:",
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
    subtitle: "Отметьте, если данные вам известны:",
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
    image: "/images/parasites.jpg",
    items: [
      "Есть неприятный запах изо рта или от тела, который сложно убрать",
      "Появляются высыпания в области шеи и груди без понятной причины",
      "Есть зуд кожи без чёткой причины",
      "Есть красные родинки или точки на теле",
      "Есть высыпания или воспаление на лице, которое не проходит",
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

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Часть 1", "Часть 2", "Результат"];
  return (
    <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#374151" }}>Шаг {step} из 3</span>
          <span style={{ fontSize: 15, color: "#6b7280" }}>{steps[step - 1]}</span>
        </div>
        <div style={{ height: 10, backgroundColor: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
            backgroundColor: "#10b981",
            borderRadius: 99,
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>
    </div>
  );
}

// ── Group Block ───────────────────────────────────────────────────────────────
function GroupBlock({
  group,
  checked,
  onToggle,
}: {
  group: (typeof part1Groups)[0];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <div style={{ marginBottom: 52 }}>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 16, lineHeight: 1.3 }}>
        {group.title}
      </h3>
      {group.image ? (
        <img src={group.image} alt="" style={{ width: "100%", height: "auto", borderRadius: 16, marginBottom: 20, display: "block" }} />
      ) : null}
      {group.subtitle ? (
        <p style={{ fontSize: 18, color: "#4b5563", marginBottom: 16, lineHeight: 1.6 }}>{group.subtitle}</p>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {group.items.map((item, i) => {
          const key = group.id + "-" + i;
          const isChecked = !!checked[key];
          return (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
                padding: "18px 20px",
                borderRadius: 14,
                border: isChecked ? "3px solid #10b981" : "2px solid #d1d5db",
                backgroundColor: isChecked ? "#ecfdf5" : "#ffffff",
                cursor: "pointer",
                minHeight: 60,
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: isChecked ? "3px solid #10b981" : "2.5px solid #9ca3af",
                backgroundColor: isChecked ? "#10b981" : "#fff",
                flexShrink: 0,
                marginTop: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {isChecked && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(key)}
                style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
              />
              <span style={{ fontSize: 18, color: "#1f2937", lineHeight: 1.6, fontWeight: isChecked ? 600 : 400 }}>{item}</span>
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
  const byGroup: { title: string; items: string[] }[] = [];
  allGroups.forEach((g) => {
    const selected = g.items.filter((_, i) => checked[g.id + "-" + i]);
    if (selected.length > 0) byGroup.push({ title: g.title, items: selected });
  });

  // Сохранение в Supabase при переходе на экран результата
  useEffect(() => {
    if (screen === "result") {
      const answersObj: Record<number, string[]> = {};
      allGroups.forEach((g, gi) => {
        const selected = g.items.filter((_, i) => checked[g.id + "-" + i]);
        if (selected.length > 0) answersObj[gi] = selected;
      });
      const level = totalChecked <= 10 ? "low" : totalChecked <= 25 ? "medium" : "high";
      saveQuizResult({ answers: answersObj, selected_count: totalChecked, result_level: level });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

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

  // ── START ─────────────────────────────────────────────────────────────────
  if (screen === "start") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <img
            src="/images/olga-start.jpg"
            alt=""
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "0 0 28px 28px" }}
          />
          <div style={{ textAlign: "center", padding: "36px 28px 60px" }}>
            <span style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontSize: 15, fontWeight: 700, letterSpacing: 2, padding: "8px 22px", borderRadius: 20, marginBottom: 24 }}>
              ТЕСТ
            </span>
            <h1 style={{ fontSize: "clamp(30px, 6vw, 44px)", fontWeight: 800, color: "#111827", marginBottom: 20, lineHeight: 1.2 }}>
              Насколько ваш организм нуждается в детоксе?
            </h1>
            <p style={{ color: "#374151", fontSize: "clamp(17px, 3vw, 20px)", marginBottom: 40, lineHeight: 1.8 }}>
              Нужен ли вашему организму детокс? Ответьте на вопросы ниже и отметьте утверждения, которые вы замечали у себя хотя бы несколько раз за последние 3–6 месяцев. Если симптомов нет, переходите к следующему вопросу.
            </p>
            <button
              onClick={() => goTo("part1")}
              style={{
                display: "block", width: "100%",
                backgroundColor: "#10b981", color: "#ffffff",
                fontWeight: 800, fontSize: "clamp(18px, 3.5vw, 22px)",
                padding: "24px 24px", borderRadius: 18,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
              }}
            >
              Пройти тест →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PART 1 ───────────────────────────────────────────────────────────────
  if (screen === "part1") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <ProgressBar step={1} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 140px" }}>
          <div style={{ backgroundColor: "#065f46", color: "#fff", fontSize: 20, fontWeight: 800, letterSpacing: 0.5, padding: "20px 28px", borderRadius: 16, marginBottom: 40 }}>
            ЧАСТЬ 1. Общая диагностика
          </div>
          {part1Groups.map((g) => (
            <GroupBlock key={g.id} group={g} checked={checked} onToggle={toggle} />
          ))}
        </div>
        <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "2px solid #e5e7eb", padding: "16px 24px 20px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => goTo("start")}
              style={{ fontSize: 17, color: "#6b7280", background: "none", border: "2px solid #e5e7eb", borderRadius: 14, padding: "16px 24px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}
            >
              ← Назад
            </button>
            <button
              onClick={() => goTo("part2")}
              style={{ flex: 1, backgroundColor: "#10b981", color: "#fff", fontWeight: 800, fontSize: 19, padding: "20px 24px", borderRadius: 16, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}
            >
              Далее: Часть 2 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PART 2 ───────────────────────────────────────────────────────────────
  if (screen === "part2") {
    return (
      <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <ProgressBar step={2} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 140px" }}>
          <div style={{ backgroundColor: "#065f46", color: "#fff", fontSize: 20, fontWeight: 800, letterSpacing: 0.5, padding: "20px 28px", borderRadius: 16, marginBottom: 40 }}>
            ЧАСТЬ 2. Есть ли риск паразитарной нагрзуки
          </div>
          {part2Groups.map((g) => (
            <GroupBlock key={g.id} group={g} checked={checked} onToggle={toggle} />
          ))}
        </div>
        <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "2px solid #e5e7eb", padding: "16px 24px 20px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => goTo("part1")}
              style={{ fontSize: 17, color: "#6b7280", background: "none", border: "2px solid #e5e7eb", borderRadius: 14, padding: "16px 24px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}
            >
              ← Назад
            </button>
            <button
              onClick={() => goTo("result")}
              style={{ flex: 1, backgroundColor: "#111827", color: "#fff", fontWeight: 800, fontSize: 19, padding: "20px 24px", borderRadius: 16, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
            >
              Завершить тест →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <ProgressBar step={3} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Result card */}
        <div
          ref={resultRef}
          style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", marginBottom: 32 }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🌿</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 12 }}>
              Насколько ваш организм нуждается в детоксе?
            </h2>
            <div style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontWeight: 700, fontSize: 18, padding: "10px 24px", borderRadius: 20 }}>
              Отмечено утверждений: {totalChecked}
            </div>
          </div>

          {byGroup.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280", fontSize: 18 }}>
              Вы не отметили ни одного утверждения
            </p>
          ) : (
            byGroup.map((group) => (
              <div key={group.title} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#065f46", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #d1fae5" }}>
                  {group.title}
                </div>
                {group.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0, fontSize: 18, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 17, color: "#1f2937", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))
          )}

          <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid #f3f4f6", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
            pomoynetskayabot.ru
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <p style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px", textAlign: "center" }}>
            Сохраните свой результат
          </p>

          <button
            onClick={handleSaveImage}
            disabled={imgLoading}
            style={{ width: "100%", backgroundColor: "#111827", color: "#fff", fontWeight: 700, fontSize: 18, padding: "20px 24px", borderRadius: 16, border: "none", cursor: "pointer", opacity: imgLoading ? 0.6 : 1 }}
          >
            {imgLoading ? "Сохраняю..." : "Сохранить результат"}
          </button>

          <button
            onClick={() => setShowEmailInput(!showEmailInput)}
            style={{ width: "100%", backgroundColor: "#ecfdf5", color: "#065f46", fontWeight: 700, fontSize: 18, padding: "20px 24px", borderRadius: 16, border: "2px solid #6ee7b7", cursor: "pointer" }}
          >
            ✉️ Отправить себе на почту
          </button>

          {showEmailInput && (
            <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 18, padding: 28 }}>
              <p style={{ fontSize: 17, color: "#374151", marginBottom: 14, fontWeight: 600 }}>Введите ваш email:</p>
              <input
                type="email"
                placeholder="example@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "16px 18px", borderRadius: 12, border: "2px solid #d1d5db", fontSize: 18, marginBottom: 14, boxSizing: "border-box" as const, color: "#111827" }}
              />
              <button
                onClick={handleSendEmail}
                disabled={emailStatus === "sending" || !email}
                style={{ width: "100%", backgroundColor: "#10b981", color: "#fff", fontWeight: 700, fontSize: 18, padding: "18px", borderRadius: 14, border: "none", cursor: "pointer", opacity: emailStatus === "sending" ? 0.6 : 1 }}
              >
                {emailStatus === "sending" ? "Отправляю..." : emailStatus === "sent" ? "✓ Письмо отправлено!" : emailStatus === "error" ? "Ошибка. Попробуйте ещё раз" : "Отправить"}
              </button>
            </div>
          )}

          <button
            onClick={() => { setChecked({}); setEmail(""); setEmailStatus("idle"); setShowEmailInput(false); goTo("start"); }}
            style={{ width: "100%", backgroundColor: "transparent", color: "#6b7280", fontWeight: 600, fontSize: 17, padding: "16px", borderRadius: 14, border: "2px solid #e5e7eb", cursor: "pointer" }}
          >
            Пройти тест заново
          </button>

          <div style={{ backgroundColor: "#f0fdf4", border: "2px solid #86efac", borderRadius: 18, padding: "24px 24px", marginTop: 8 }}>
            <p style={{ fontSize: 17, color: "#14532d", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
              🌿 <strong>1 и 2 апреля</strong> на практикуме по детоксу и антипаразитарной программе я подробно разберу результаты тестирования: покажу, как их правильно интерпретировать и на что обращать внимание.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
