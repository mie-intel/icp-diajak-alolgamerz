import AuthLayout from "@/components/layout/AuthLayout";
import "../globals.css";

export const metadata = {
  title: "PactLock",
  description: "Seal your Agreements, Trust the Chain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          <AuthLayout>{children}</AuthLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
