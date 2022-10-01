import { toast } from "react-toastify";
import useLoginModel from "./loginModel";

const useLoginController = () => {
	const model = useLoginModel();

	return {
		async login(mobileNo?: string, password?: string) {
			if (!mobileNo || !password) {
				toast.error("Missing Fields");
				return;
			}

			const data = {
				mobileNo: mobileNo,
				password: password,
			};

			await model.login(data);
		},
	};
};

export default useLoginController;
