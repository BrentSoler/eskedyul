import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getReport } from "../../hooks/useProgramApi";

const useStatController = () => {
	return {
		getReport(id: string) {
			return useQuery(["program", id], () => getReport(id), {
				onError: (err: any) => {
					toast.error(err.response.msg || err.message || "Something went wrong");
				},
			});
		},
	};
};

export default useStatController;
