import "./index.css";
import { primary } from "./fonts";
import Navbar from "./components/Navbar/Navbar";
import Provider from "../context/Provider";

export const metadata = {
  title: "Art Hub Local",
  description: "Website for making art and culture accessible",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={primary.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
