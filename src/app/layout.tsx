import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Детокс-тест | pomoynetskayabot.ru",
  description:
    "Пройдите тест и узнайте, насколько ваш организм нуждается в детоксикации.",
  keywords: "детокс, тест, организм, очищение, здоровье",
  openGraph: {
    title: "Насколько ваш организм нуждается в детоксе?",
    description: "Пройдите короткий тест из 7 блоков и узнайте уровень токсической нагрузки.",
    url: "https://pomoynetskayabot.ru",
    siteName: "pomoynetskayabot.ru",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
