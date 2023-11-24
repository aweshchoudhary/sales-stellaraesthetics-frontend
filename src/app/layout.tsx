"use client";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import { Poppins } from "next/font/google";
import { selectCurrentToken } from "@/redux/features/auth.slice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={cn(poppins.className, "transition-all duration-300")}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <LoginCheck>{children}</LoginCheck>
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}

const LoginCheck = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useSelector(selectCurrentToken);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
    if (pathname === "/login" && accessToken) router.push("/");
  }, [pathname, router, accessToken]);
  return <>{children}</>;
};
