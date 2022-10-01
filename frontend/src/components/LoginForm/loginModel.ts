import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import loginUser from "../../hooks/useUserApi";
import AuthStore from "../../store/authStore";

const useLoginModel = () => {
	const router = useRouter();
	const loginHandler = AuthStore((state) => state.loginHandler);

	const { mutate } = useMutation(loginUser, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadLogin" });
		},
		onSuccess: (data) => {
			loginHandler({
				fname: data.fname,
				id: data.id,
				brgyId: data.brgyId,
				role: data.role,
				token: data.token,
			});

			toast.update("loadLogin", {
				render: `Welcome, ${data.fname}`,
				type: "success",
				isLoading: false,
				autoClose: 500,
				closeOnClick: true,
			});

			router.push("/dashboard");
		},
		onError: (err: any) => {
			toast.update("loadLogin", {
				render: err.response.data.msg || err.message,
				type: "error",
				isLoading: false,
				autoClose: 500,
				closeOnClick: true,
			});
		},
	});

	return {
		async login(userdata: { mobileNo: string; password: string }) {
			await mutate(userdata);
		},
	};
};

export default useLoginModel;
