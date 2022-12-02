import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
	deleteSchedule,
	getSchedule,
	postProgram,
	postSchedule,
	updatePrograms,
} from "../../../hooks/useProgramApi";
import AuthStore from "../../../store/authStore";

const useFormModel = (id: string) => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	const { refetch } = useQuery(["schedule", id], () => getSchedule(id), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	const { mutate } = useMutation(postSchedule, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully posted a schedule`,
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

	const { mutate: deleteSchedMutate } = useMutation(deleteSchedule, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully deleted a schedule`,
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

	const { mutate: updateProgram } = useMutation(updatePrograms, {
		onMutate: () => {
			toast.loading("Loading...", { toastId: "loadSched" });
		},
		onSuccess: () => {
			toast.update("loadSched", {
				render: `Successfully updated program's information`,
				type: "success",
				isLoading: false,
				autoClose: 500,
				closeOnClick: true,
			});
			refetch();
			router.push("/dashboard/programs");
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

	const { mutate: programMutate } = useMutation(postProgram, {
		onError: (err: any) => {
			toast.error(err.response.data.msg || err.message);
		},
	});

	return {
		async postSched(schedData: any) {
			await mutate({ data: schedData, token: token });
		},
		async postProgram(progData: any) {
			await programMutate({ data: progData, token: token });
		},
		async updateProgram(progData: any) {
			await updateProgram({ data: progData, token: token });
		},
		async deleteSched(id: string) {
			await deleteSchedMutate({ id: id, token: token });
		},
	};
};

export default useFormModel;
