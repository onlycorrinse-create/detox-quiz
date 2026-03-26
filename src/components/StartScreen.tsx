"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
      <div className="max-w-lg w-full">
        {/* Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🌿</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Насколько ваш организм нуждается в детоксе?
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base mb-2 leading-relaxed">
          Пройдите короткий тест из{" "}
          <span className="font-semibold text-gray-700">7 блоков</span> и
          узнайте уровень токсической нагрузки на ваш организм.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Займёт около 3–5 минут. Результаты можно сохранить в PDF.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-2xl font-bold text-emerald-600">7</div>
            <div className="text-xs text-gray-400 mt-1">блоков</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-2xl font-bold text-emerald-600">45</div>
            <div className="text-xs text-gray-400 mt-1">вопросов</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-2xl font-bold text-emerald-600">3</div>
            <div className="text-xs text-gray-400 mt-1">уровня</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-lg py-4 px-8 rounded-2xl transition-colors duration-150 shadow-sm"
        >
          Начать тест →
        </button>

        <p className="text-xs text-gray-300 mt-4">
          Результаты носят информационный характер
        </p>
      </div>
    </div>
  );
}
