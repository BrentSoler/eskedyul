import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { postAdmin, postResident } from "../../../hooks/useUserApi";
import AuthStore from "../../../store/authStore";

const useFormModel = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	const { mutate } = useMutation(postResident, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully posted a transaction`,
				type: "success",
				isLoading: false,
				autoClose: 500,
				closeOnClick: true,
			});

			router.push("/dashboard/users");
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
	const { mutate: mutateAdmin } = useMutation(postAdmin, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully posted a transaction`,
				type: "success",
				isLoading: false,
				autoClose: 500,
				closeOnClick: true,
			});

			router.push("/dashboard/users");
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
		async postResident(data: any, residentData: any) {
			await mutate({ data: data, residentData: residentData, token: token });
		},
		async postAdmin(data: any) {
			await mutateAdmin({ data: data, token: token });
		},
	};
};

export default useFormModel;
