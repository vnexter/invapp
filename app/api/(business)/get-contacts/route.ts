import dbGetContacts from "@/app/lib/prisma/contacts/db-get-contacts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils";

export async function GET() {
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id as string;
	const businessId = "dbaa9f24-2cc9-4875-8baa-b42d456c0ed2"

	const invoices = await dbGetContacts({ businessId });

	return new Response(JSON.stringify(invoices));
}
