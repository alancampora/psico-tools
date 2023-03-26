import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { Layout } from "./layout";
import { LOGOUT } from "../strings";
import Link from "next/link";

export function Setup({ children }:any) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Layout
        userName={user.name}
        userAvatar={user.picture}
        routes={[
          {
            key: "section",
            label: "Simulador Incripciones",
            onClick: () => {
              router.push({
                pathname: "/materias",
              });
            },
          },
          {
            key: "section",
            label: "Recomedaciones",
            onClick: () => {
              router.push({
                pathname: "/recomendaciones",
              });
            },
          },

          {
            key: "logout",
            label: LOGOUT,
            onClick: () => {
              router.push({
                pathname: "/api/auth/logout",
              });
            },
          },
        ]}
      >
        {children}
      </Layout>
    );
  }

  return <Link href="/api/auth/login">Login</Link>;
}
