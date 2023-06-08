import { Contact } from "@/app/types";
import api from "@/lib/axios";

type GetContactsProps = {
	cursor?: string | null;
};

export type GetContactsResponse = {
	nextCursor: string | null | undefined;
	Contacts: Contact[];
};

export default async function getContacts({
	cursor,
}: GetContactsProps): Promise<GetContactsResponse> {
	const res = await api.get("/get-contacts", {
		params: { cursor },
	});
	const data = res.data;
	return data;
}
