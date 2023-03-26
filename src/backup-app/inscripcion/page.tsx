'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default async function Materias() {
  const { user, error, isLoading } = useUser();

  console.log({user});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
      </div>
    );
  }

  return <Link href="/api/auth/login">Login</Link>;
}
