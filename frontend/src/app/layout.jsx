export const metadata = {
  title: "Art Hub Local",
  description: "Website for making art and culture accessible",
};

import "./index.css";

import { primary } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={primary.className}>{children}</body>
    </html>
  );
}
