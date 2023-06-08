import { ActiveBar, InvoiceItemSkeleton } from "@/app/components";
import dbGetInvoicesCount from "@/lib/prisma/db-get-invoices-count";
import { authOptions } from "@/app/utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import ControllerListInvoices from "@/app/(auth)/(home)/components/ControllerListInvoices";
import ErrorBoundaryFallback from "@/app/(auth)/(home)/components/ErrorBoundaryInvoices";

export const metadata: Metadata = {
	title: "Contacts",
	description: "Invoice App By MBS",
	authors: [
		{
			name: "Muhammad Bilal Saleem FCCA",
			url: "https://taxbit.co.uk",
		},
	],
};

const businessId = ""
async function getData() {
	const session = await getServerSession(authOptions);
	const data = await dbGetInvoicesCount({ userId: session?.user.id! });
	return data;
}

export default async function Contacts() {
	const { count } = await getData();

	return (
		<div className="container h-[calc(100vh_-_72px)] pt-8 md:h-screen md:pt-10">
			<div className="relative flex h-full flex-col">
				<ActiveBar count={count} />
				<div className="relative mt-12 flex-1 overflow-y-auto rounded-t-lg scrollbar-hide">
					<div className="absolute inset-x-0 top-0 z-0 grid h-auto grid-flow-row gap-6 px-1 pb-4 pt-2">
						<Suspense
							fallback={Array.from({ length: 8 }).map((_, index) => (
								<InvoiceItemSkeleton key={index} />
							))}
						>
							<ErrorBoundaryFallback>
								<ControllerListInvoices />
							</ErrorBoundaryFallback>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
