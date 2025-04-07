import {ViewProfilePage} from "@/features/view-profile-page";


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewProfilePage>
      {children}
    </ViewProfilePage>
  );
}
