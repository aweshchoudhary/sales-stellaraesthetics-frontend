import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

export default function Header({}: Props) {
  const { setTheme, theme } = useTheme();
  return (
    <header className="h-[50px] border-b flex items-center py-3 px-5 justify-between">
      <div>
        <h2 className="font-semibold">Stellar Aesthetics</h2>
      </div>
      <div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full"
        >
          <Icon
            icon={
              theme === "light" ? "solar:moon-outline" : "solar:sun-2-outline"
            }
            className="text-lg"
          />
        </Button>
      </div>
    </header>
  );
}
