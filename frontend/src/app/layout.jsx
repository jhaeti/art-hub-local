export const metadata = {
  title: "Art Hub Local",
  description: "Website for making art and culture accessible",
};

import "./index.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
