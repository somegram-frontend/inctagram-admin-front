import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somegram Sign In",
  description: "Somegram Sign In",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
