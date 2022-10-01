import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTransactionID } from "../../../hooks/useTransactionApi";
import { getUsers } from "../../../hooks/useUserApi";
import useFormModel from "./formModel";

const useFormController = () => {
	const model = useFormModel();

	return {
		getUsers(id: string) {
			return useQuery(["user", id], () => getUsers(id), {
				refetchOnWindowFocus: false,
				onError: (err: any) => {
					toast.error(err.response.data.message || err.message);
				},
			});
		},
		getTransaction(id: string) {
			return useQuery(["transaction", id], () => getTransactionID(id), {
				refetchOnWindowFocus: false,
				onError: (err: any) => {
					toast.error(err.response.data.message || err.message);
				},
			});
		},
		async postTransaction(data: any) {
			if (!data.residentId || !data.programId || !data.scheduleId) {
				toast.error("Missing Fields");
				return;
			}

			data.scheduleId = Number(data.scheduleId);
			data.residentId = Number(data.residentId);

			await model.postTransaction(data);
		},

		async updateTransaction(data: any) {
			if (!data.status) {
				toast.error("Missing Fields");
				return;
			}

			data.scheduleId = Number(data.scheduleId);
			data.residentId = Number(data.residentId);

			await model.updateTransaction(data);
		},
	};
};

export default useFormController;
