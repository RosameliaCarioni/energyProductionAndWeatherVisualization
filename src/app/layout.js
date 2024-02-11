import SideBarComponent from "@/components/SideBarComponent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SideBarComponent/>
        {children}
      </body>
    </html>
  );
}
