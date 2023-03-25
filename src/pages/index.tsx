// pages/index.js
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { WELCOME, LOGOUT } from "../strings";

export default function Index() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  console.log({ user });

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
        {`${WELCOME} ${user.name} `}
      </Layout>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
