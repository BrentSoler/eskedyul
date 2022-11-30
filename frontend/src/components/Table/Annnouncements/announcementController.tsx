import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAnnouncements } from "../../../hooks/useAnnouncementApi";
import useAnnouncementModel from "./announcementModel";

const useTransactionController = () => {
    const model = useAnnouncementModel();

    return {
        getAnnouncements() {
            return useQuery(["announcements"], () => getAnnouncements(), {
                onError: (err: any) => {
                    toast.error(err.message);
                },
            });
        },
        async deleteAnnouncement(id: string) {
            await model.deleteAnnoun(id);
        },
    };
};

export default useTransactionController;
