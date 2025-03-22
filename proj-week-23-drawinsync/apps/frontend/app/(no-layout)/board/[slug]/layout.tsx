import "../../../globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Board",
    description: "Draw in sync with your team",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
