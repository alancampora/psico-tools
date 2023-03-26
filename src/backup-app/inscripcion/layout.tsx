//import "./global.css";
import styles from "./layout.module.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>

      <UserProvider>
        <body className={styles.body}>{children}</body>
      </UserProvider>
    </html>
  );
}
