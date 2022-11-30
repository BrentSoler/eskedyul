import api from "./api";

export async function changePasswordUser(data: { data: any }) {
    const res = await api.post("/user/forgot_password", data)

    return res.data;
}
