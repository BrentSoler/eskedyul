import useUserModel from "./userModel";

const useProgramController = (id: string) => {
	const model = useUserModel(id);
	return {
		async activateUser(id: string) {
			await model.activate(id);
		},
	};
};

export default useProgramController;
