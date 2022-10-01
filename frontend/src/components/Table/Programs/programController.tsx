import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getPrograms } from "../../../hooks/useProgramApi";
import useProgramModel from "./programModel";

const useProgramController = (id: string) => {
	const model = useProgramModel(id);

	return {
		getPrograms(id: string) {
			return useQuery(["programs", id], () => getPrograms(id), {
				onError: (err: any) => {
					toast.error(err.message);
				},
			});
		},
		async deleteProgram(id: string) {
			await model.deleteProg(id);
		},
	};
};

export default useProgramController;
