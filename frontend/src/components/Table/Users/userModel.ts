import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { activateUser, getUsers } from "../../../hooks/useUserApi";
import AuthStore from "../../../store/authStore";

const useUserModel = (id: string) => {
	const token = AuthStore((state) => state.userData.token);

	const { refetch } = useQuery(["user", id], () => getUsers(id), {
		refetchOnWindowFocus: false,
	});

	const { mutate } = useMutation(activateUser, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully activated a user`,
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
		async activate(id: string) {
			await mutate({ id: id, token: token });
		},
	};
};

export default useUserModel;
