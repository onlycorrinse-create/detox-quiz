"use client";

import { Question } from "@/data/questions";
import ProgressBar from "./ProgressBar";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const QUESTION_EMOJIS: Record<number, string> = {
  1: "🌅",
  2: "🥗",
  3: "✨",
  4: "⚡",
  5: "🏙️",
  6: "💪",
  7: "🛡️",
};

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptions,
  onToggleOption,
  onNext,
  onBack,
}: QuestionCardProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 max-w-lg mx-auto w-full">
      {/* Progress */}
      <div className="mb-6">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-emerald-50 rounded-2xl p-5 mb-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
            {QUESTION_EMOJIS[question.id] || "❓"}
          </div>
          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            {question.title}
          </h2>
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-400 mb-3 px-1">
          Выберите всё, что относится к вам (можно несколько)
        </p>

        {/* Options */}
        <div className="space-y-2 flex-1">
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <button
                key={option}
                onClick={() => onToggleOption(option)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-150 flex items-center gap-3 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 text-gray-900"
                    : "border-gray-100 bg-white text-gray-700 hover:border-gray-200 active:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Selected count */}
        {selectedOptions.length > 0 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
              Выбрано: {selectedOptions.length}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {!isFirst && (
          <button
            onClick={onBack}
            className="flex-1 py-3.5 px-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            ← Назад
          </button>
        )}
        <button
          onClick={onNext}
          className="flex-1 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          {isLast ? "Завершить тест →" : "Далее →"}
        </button>
      </div>
    </div>
  );
}
