import api from "./api";

export async function getAnnouncements() {
    const res = await api.get("/announcements");

    return res.data;
}

export async function postAnnouncement({ data }: { data: any; }) {
    const res = await api.post("/announcements/post", data, {
    });

    return res.data;
}

export async function deleteAnnouncement({ id }: { id: string; }) {
    const res = await api.delete("/announcements/delete", {
        params: { id: id },
    });

    return res.data;
}