import api from "./api";

export async function getBarangays() {
    const res = await api.get("/brgy");

    return res.data;
}