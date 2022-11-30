import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAnnouncements } from "../../../hooks/useAnnouncementApi";
import useFormModel from "./formModel";

const useFormController = () => {
    const model = useFormModel();

    return {
        getAnnouncements() {
            return useQuery(["announcements"], () => getAnnouncements(), {
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            });
        },
        async postAnnouncement(data: any) {
            if (!data.title || !data.details || !data.barangay) {
                toast.error("Missing Fields!");
                return;
            }

            await model.postAnnouncement(data);
        },

        async deleteAnnouncement(id: string) {
            await model.deleteAnnouncement(id);
        },
    };
};

export default useFormController;
