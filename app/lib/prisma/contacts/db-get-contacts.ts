import { Contact } from "@/app/types";
import { prisma } from "..";
import { Prisma} from '@prisma/client'

type GetContactsProps = {
	cursor?: string;
	take?: number;
	skip?: number;
	businessId?: string;
};

export type GetContactsResponse = {
	nextCursor: string | null | undefined;
	contacts: Contact[];
};

export default async function dbGetContacts({
	take = 8,
	skip = 0,
	cursor,
	businessId,
}: GetContactsProps): Promise<GetContactsResponse> {
	const args: Prisma.ContactFindManyArgs = {
		take,
		skip,
		where: {
			businessId,
		},
		orderBy: {
			name: "desc",
		},
	};

	if (cursor) {
		args.cursor = {
			id: cursor,
		};
	}

	const contacts = await prisma.contact.findMany({
		...args,
		select: {
			id: true,
			name:true,
			createdAt: true,
		},
	});

	const contactsMapped = contacts.map((contact) => ({
		...contact,
		createdAt: contact.createdAt.toISOString(),

	}));

	const nextCursor = contacts.length >= take ? contacts.at(-1)?.id : null;

	return {
		nextCursor,
		contacts: contactsMapped,
	};
}
