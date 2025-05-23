import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) redirect("/");
  return <section>{children}</section>;
}
