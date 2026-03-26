"use client";

import { useEffect, useRef, useState } from "react";
import { QuizResult, RESULT_CONFIG } from "@/types/quiz";
import { questions } from "@/data/questions";
import { saveQuizResult } from "@/lib/supabase";

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

const LEVEL_STYLES = {
  low: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "🟢",
    bar: "bg-emerald-500",
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    icon: "🟡",
    bar: "bg-amber-500",
  },
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    icon: "🔴",
    bar: "bg-red-500",
  },
};

export default function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const config = RESULT_CONFIG[result.level];
  const styles = LEVEL_STYLES[result.level];
  const [saved, setSaved] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [pdfLoading, setPdfLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Auto-save to Supabase on mount
  useEffect(() => {
    const save = async () => {
      setSaved("saving");
      const { success } = await saveQuizResult({
        answers: result.answers,
        selected_count: result.selectedCount,
        result_level: result.level,
      });
      setSaved(success ? "done" : "error");
    };
    save();
  }, [result]);

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const date = new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // Build all answers list
      const answersHtml = questions
        .map((q) => {
          const selected = result.answers[q.id] || [];
          if (selected.length === 0) return "";
          return `
          <div style="margin-bottom:16px;">
            <div style="font-weight:600;color:#111;margin-bottom:6px;">${q.title}</div>
            <ul style="margin:0;padding-left:18px;">
              ${selected.map((a) => `<li style="color:#444;margin-bottom:3px;">${a}</li>`).join("")}
            </ul>
          </div>`;
        })
        .filter(Boolean)
        .join("");

      const levelColors = { low: "#10b981", medium: "#f59e0b", high: "#ef4444" };
      const color = levelColors[result.level];

      const el = document.createElement("div");
      el.innerHTML = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:32px;margin-bottom:8px;">🌿</div>
            <h1 style="font-size:22px;font-weight:800;color:#111;margin:0 0 4px;">
              Насколько ваш организм нуждается в детоксе?
            </h1>
            <p style="color:#888;font-size:14px;margin:0;">Дата прохождения: ${date}</p>
          </div>

          <div style="background:${color}20;border:2px solid ${color}50;border-radius:16px;padding:24px;margin-bottom:24px;text-align:center;">
            <div style="font-size:24px;font-weight:800;color:${color};margin-bottom:8px;">
              ${config.label}
            </div>
            <div style="font-size:36px;font-weight:900;color:#111;margin-bottom:8px;">
              ${result.selectedCount} пунктов
            </div>
            <p style="color:#555;font-size:15px;line-height:1.5;margin:0;">${config.description}</p>
          </div>

          <div style="margin-bottom:24px;">
            <h2 style="font-size:16px;font-weight:700;color:#111;margin-bottom:12px;">Рекомендации:</h2>
            <ul style="margin:0;padding-left:20px;">
              ${config.recommendations.map((r) => `<li style="color:#444;margin-bottom:6px;line-height:1.4;">${r}</li>`).join("")}
            </ul>
          </div>

          <div>
            <h2 style="font-size:16px;font-weight:700;color:#111;margin-bottom:12px;">Ваши ответы:</h2>
            ${answersHtml || "<p style='color:#888'>Ответы не выбраны</p>"}
          </div>

          <div style="margin-top:32px;border-top:1px solid #eee;padding-top:16px;text-align:center;color:#bbb;font-size:12px;">
            pomoynetskayabot.ru
          </div>
        </div>
      `;

      await html2pdf()
        .set({
          margin: 0,
          filename: `detox-quiz-${date}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(el)
        .save();
    } catch (e) {
      console.error(e);
    } finally {
      setPdfLoading(false);
    }
  };

  const maxScore = 45; // total options across all questions
  const percentage = Math.min(
    Math.round((result.selectedCount / maxScore) * 100),
    100
  );

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className={`${styles.bg} border-2 ${styles.border} rounded-2xl p-6 mb-5 text-center`}>
        <div className="text-4xl mb-3">{styles.icon}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{config.label}</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Score */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">
            Отмечено пунктов
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {result.selectedCount}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className={`${styles.bar} h-3 rounded-full transition-all duration-700`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>0–10: низкая</span>
          <span>11–25: средняя</span>
          <span>26+: высокая</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 text-base">
          💡 Рекомендации
        </h3>
        <ul className="space-y-2">
          {config.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Save status */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs">
        {saved === "saving" && (
          <span className="text-gray-400">⏳ Сохранение результатов...</span>
        )}
        {saved === "done" && (
          <span className="text-emerald-600">✓ Результаты сохранены</span>
        )}
        {saved === "error" && (
          <span className="text-red-400">⚠ Не удалось сохранить в базу</span>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="w-full py-4 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {pdfLoading ? (
            <>
              <span className="animate-spin">⏳</span> Генерация PDF...
            </>
          ) : (
            <>📄 Сохранить результат как PDF</>
          )}
        </button>

        <button
          onClick={onRestart}
          className="w-full py-3.5 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          🔄 Пройти тест заново
        </button>
      </div>

      <p className="text-center text-xs text-gray-300 mt-6">
        pomoynetskayabot.ru · результаты носят информационный характер
      </p>
    </div>
  );
}
