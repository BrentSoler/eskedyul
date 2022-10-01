import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { postTransaction, updateTransaction } from "../../../hooks/useTransactionApi";
import AuthStore from "../../../store/authStore";

const useFormModel = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	const { mutate } = useMutation(postTransaction, {
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

			router.push("/dashboard/transactions");
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

	const { mutate: update } = useMutation(updateTransaction, {
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

			router.push("/dashboard/transactions");
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
		async postTransaction(transacData: any) {
			await mutate({ data: transacData, token: token });
		},
		async updateTransaction(transacData: any) {
			await update({ data: transacData, token: token });
		},
	};
};

export default useFormModel;
