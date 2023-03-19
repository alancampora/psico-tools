//import "./global.css";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather&family=Noto+Serif&family=Nunito+Sans:ital,wght@0,200;1,200&family=Tinos&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={styles.body}>{children}</body>
    </html>
  );
}
