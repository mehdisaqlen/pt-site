import localFont from "next/font/local";

export const tomatoGrotesk = localFont({
  src: [
    { path: "./TomatoGrotesk-Medium.woff2", weight: "500" },
    { path: "./TomatoGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-tomato",
  display: "swap",
});
