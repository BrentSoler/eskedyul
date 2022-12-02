import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getAnnouncements } from "../../../hooks/useAnnouncementApi";
import { getBarangays } from "../../../hooks/useBarangayApi";
import useFormModel from "./formModel";

const useFormController = () => {
    //const model = useFormModel();

    return {
        getBarangays() {
            return useQuery(["brgy"], () => getBarangays(), {
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            });
        },

    };
};

export default useFormController;
