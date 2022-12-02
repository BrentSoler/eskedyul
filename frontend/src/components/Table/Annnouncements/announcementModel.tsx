import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { deleteAnnouncement, getAnnouncements } from "../../../hooks/useAnnouncementApi";
import AuthStore from "../../../store/authStore";

const useAnnouncementModel = () => {
    const token = AuthStore((state) => state.userData.token);

    const { refetch } = useQuery(["announcements"], () => getAnnouncements(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const { mutate } = useMutation(deleteAnnouncement, {
        onMutate: () => {
            toast.loading("Loading...", { toastId: "loadSched" });
        },
        onSuccess: () => {
            toast.update("loadSched", {
                render: `Successfully deleted an announcement`,
                type: "success",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });

            refetch();
        },
        onError: (err: any) => {
            toast.update("loadSched", {
                render: err.response.data.msg || err.message,
                type: "error",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });
        },
    });

    return {
        async deleteAnnoun(id: string) {
            await mutate({ id: id });
        },
    };
};

export default useAnnouncementModel;
