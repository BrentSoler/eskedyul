import api from "./api";

export async function getTransaction(id: string) {
	const res = await api.get("/transaction", { params: { brgyId: id } });

	return res.data;
}

export async function getTransactionID(id: string) {
	const res = await api.get("/transaction/getID", { params: { id: id } });

	return res.data;
}

export async function postTransaction({ data, token }: { data: any; token: string }) {
	const res = await api.post("/transaction", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function updateTransaction({ data, token }: { data: any; token: string }) {
	const res = await api.put("/transaction", data, {
		params: { id: data.id },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}