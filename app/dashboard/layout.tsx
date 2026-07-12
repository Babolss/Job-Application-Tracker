"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/NavBar";
import type { View } from "@/lib/types";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	const view: View = pathname?.startsWith("/dashboard/stats") ? "stats" : "dashboard";

	return (
		<div className="min-h-screen flex flex-col bg-[#0F1117]">
			<Navbar
				view={view}
				onNavigate={(nextView) => {
					router.push(nextView === "dashboard" ? "/dashboard" : "/dashboard/stats");
				}}
			/>
			<div className="flex-1">{children}</div>
		</div>
	);
}
