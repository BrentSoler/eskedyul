import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTransaction } from "../../../hooks/useTransactionApi";

const useProgramController = () => {
	return {
		getTransaction(id: string) {
			return useQuery(["transaction", id], () => getTransaction(id), {
				refetchOnWindowFocus: false,
				onError: (err: any) => {
					toast.error(err.message);
				},
			});
		},
	};
};

export default useProgramController;
