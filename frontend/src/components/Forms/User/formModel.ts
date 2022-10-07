import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { postAdmin, postResident, updateAdmin, updateResident } from "../../../hooks/useUserApi";
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
				render: `Successfully added a resident`,
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
				render: `Successfully added an admin`,
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

	const { mutate: updAdmin } = useMutation(updateAdmin, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully updated admin's information`,
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

	const { mutate: updRes } = useMutation(updateResident, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully updated resident's information`,
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
		async updateResident(data: any, residentData: any, id: string) {
			await updRes({ data: data, residentData: residentData, token: token, id: id });
		},
		async postAdmin(data: any) {
			await mutateAdmin({
				data: {
					role: data.role,
					email: data.email,
					password: data.password,
					fname: data.fname,
					mname: data.mname,
					lname: data.lname,
					suffix: data.suffix,
					sex: data.sex,
					mobileNo: data.mobileNo,
					presAdd: data.presAdd,
					permAdd: data.permAdd,
					brgyId: data.brgyId,
					idType: data.idType,
					idNo: data.idNo,
				},
				token: token,
			});
		},
		async updateAdmin(data: any, id: string) {
			await updAdmin({ data: data, token: token, id: id });
		},
	};
};

export default useFormModel;
