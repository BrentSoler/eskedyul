import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { deletePrograms, getPrograms } from "../../../hooks/useProgramApi";
import AuthStore from "../../../store/authStore";

const useProgramModel = (id: string) => {
	const token = AuthStore((state) => state.userData.token);

	const { refetch } = useQuery(["programs", id], () => getPrograms(id), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	const { mutate } = useMutation(deletePrograms, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully deleted a program`,
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
		async deleteProg(id: string) {
			await mutate({ id: id, token: token });
		},
	};
};

export default useProgramModel;
