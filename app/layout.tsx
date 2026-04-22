import { Inter, Space_Grotesk } from "next/font/google";
import "./global.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

export const metadata = {
	title: "Rick Molé — Portfolio",
	description:
		"Senior full stack engineer specializing in complex product interfaces, systems, and developer tooling.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
			<body>{children}</body>
		</html>
	);
}
