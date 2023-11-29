import { ReactNode } from "react";
import { Metadata } from "next";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import { theme } from "@/theme";
import { AppShellLayout } from "@/components/layouts/app-shell";

import "@mantine/core/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swift Books",
  description: "Online bookstore, buy your books swiftly!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
