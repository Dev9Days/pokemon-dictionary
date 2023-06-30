import Root from "@/components/root";
import "./globals.css";

export const metadata = {
  title: "포켓몬스터 도감",
  description: "pokeapi를 사용한 포켓몬스터 도감",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
