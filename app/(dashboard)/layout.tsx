import DesktopSidebar from "@/components/MainLayout/DesktopSidebar";
import Header from "@/components/MainLayout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charity System",
  description: "Powered by 'Elsaleheen Charity'",
};

type IProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: Readonly<IProps>) {
  const { children } = props;

  return (
    <main className="text-right">
      <Header />

      <div className="flex h-[92vh]">
        <DesktopSidebar />

        <div className="flex-grow p-4 overflow-auto">{children}</div>
      </div>
    </main>
  );
}
