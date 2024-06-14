export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  );
}
