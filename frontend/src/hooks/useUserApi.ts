import api from "./api";

export default async function loginUser(data: { mobileNo: string; password: string }) {
	const res = await api.post("/user/login", data);

	return res.data;
}

export async function getUsers(id: string) {
	const res = await api.get("/user", { params: { id: id } });

	return res.data;
}

export async function activateUser({ id, token }: { id: string; token: string }) {
	const res = await api.post("/user/activate", null, {
		params: { id: id },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}
