import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getProgramsID, getSchedule } from "../../../hooks/useProgramApi";
import useFormModel from "./formModel";

const useFormController = (id: string) => {
	const model = useFormModel(id);

	return {
		getSchedule(id: string) {
			return useQuery(["schedule", id], () => getSchedule(id), {
				refetchOnMount: false,
				refetchOnWindowFocus: false,
			});
		},
		getProgramById(id: string) {
			return useQuery(["program", id], () => getProgramsID(id), {
				refetchOnMount: false,
				refetchOnWindowFocus: false,
			});
		},
		async postSched(data: any) {
			if (!data.startTime || !data.endTime || !data.date || !data.location || !data.programId) {
				toast.error("Missing Fields!");
				return;
			}

			await model.postSched(data);
		},
		async postProgram(data: any, mode: string) {
			if (mode !== "First") {
				if (
					!data.id ||
					!data.name ||
					!data.details ||
					!data.view ||
					!data.qualification ||
					!data.type
				) {
					toast.error("Missing Fields!");
					return;
				}
				await model.updateProgram(data);
				return;
			}

			await model.postProgram(data);
		},
		async deleteSched(id: string) {
			await model.deleteSched(id);
		},
		
	};
};

export default useFormController;
