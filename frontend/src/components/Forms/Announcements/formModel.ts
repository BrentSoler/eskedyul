import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
    getAnnouncements,
    postAnnouncement,
    deleteAnnouncement,

} from "../../../hooks/useAnnouncementApi";
import AuthStore from "../../../store/authStore";

const useFormModel = () => {
    const router = useRouter();
    const token = AuthStore((state) => state.userData.token);

    const { refetch } = useQuery(["announcements"], () => getAnnouncements(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const { mutate: announcementMutate } = useMutation(postAnnouncement, {
        onMutate: () => {
            toast.loading("Loading...", { toastId: "loadAnnouncement" });
        },
        onSuccess: () => {
            toast.update("loadAnnouncement", {
                render: `Successfully posted an announcement`,
                type: "success",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });

            refetch();
            router.push("/dashboard/announcements");
        },
        onError: (err: any) => {
            toast.update("loadAnnouncement", {
                render: err.response.data.msg || err.message,
                type: "error",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });
        },
    });

    const { mutate: deleteAnnouncementMutate } = useMutation(deleteAnnouncement, {
        onMutate: () => {
            toast.loading("Loading...", { toastId: "loadAnnouncement" });
        },
        onSuccess: () => {
            toast.update("loadAnnouncement", {
                render: `Successfully deleted an announcement`,
                type: "success",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });
            refetch();
        },
        onError: (err: any) => {
            toast.update("loadAnnouncement", {
                render: err.response.data.msg || err.message,
                type: "error",
                isLoading: false,
                autoClose: 500,
                closeOnClick: true,
            });
        },
    });


    return {

        async postAnnouncement(announcementData: any) {
            await announcementMutate({ data: announcementData });
        },
        async deleteAnnouncement(id: string) {
            await deleteAnnouncementMutate({ id: id });
        },
    };
};

export default useFormModel;
