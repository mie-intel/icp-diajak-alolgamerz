import AuthLayout from "@/components/layout/AuthLayout";
import "../globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Sidebar from "@/components/UI/Sidebar";
import Footbar from "@/components/UI/FootBar";

export const metadata = {
  title: "PactLock",
  description: "Seal your Agreements, Trust the Chain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col antialiased lg:flex-row">
        <Sidebar />
        <DashboardLayout className="flex flex-col justify-start">
          {children} <Footbar />
        </DashboardLayout>
      </body>
    </html>
  );
}
