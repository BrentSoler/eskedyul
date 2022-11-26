import api from "./api";

export async function postProgram({ data, token }: { data: any; token: string }) {
	const res = await api.post("/program", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function getPrograms(id: string) {
	const res = await api.get("/program", { params: { brgy: id } });

	return res.data;
}
export async function getProgramsID(id: string) {
	const res = await api.get("/program/getID", { params: { id: id } });

	return res.data;
}

export async function getReport(id: string) {
	const res = await api.get("/program/reports", { params: { id: id } });

	return res.data;
}

export async function updatePrograms({ data, token }: { data: any; token: string }) {
	const res = await api.put("/program", data, {
		params: { id: data.id },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function deletePrograms({ id, token }: { id: string; token: string }) {
	const res = await api.delete("/program", {
		params: { id: id },
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function getSchedule(id: string) {
	const res = await api.get("/schedule", { params: { id: id } });

	return res.data;
}

export async function postSchedule({ data, token }: { data: any; token: string }) {
	const res = await api.post("/schedule", data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export async function deleteSchedule({ id, token }: { id: string; token: string }) {
	const res = await api.delete("/schedule", {
		params: {
			id: id,
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.data;
}

export function getStatusColor(status: string) {
	const statusMsg = status;
	let color;
	switch (statusMsg) {
		case 'Pending':
			color = "bg-warning";
			break;
		case 'Completed':
			color = "bg-success";
			break;
		case 'Ongoing':
			color = "bg-info";
			break;
		case 'Cancelled':
			color = "bg-error";
			break;
		default:
	}
	return color
}
