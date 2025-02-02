export const metadata = {
  title: "PactLock",
  description: "Seal your Agreements, Trust the Chain.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
