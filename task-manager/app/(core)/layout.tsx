import DialogProvider from "@/components/DialogProvider";
import CacheProvider from "@/components/CacheProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CacheProvider>
        <DialogProvider>{children}</DialogProvider>
      </CacheProvider>
    </>
  );
}
