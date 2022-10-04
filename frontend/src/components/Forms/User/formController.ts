import { toast } from "react-toastify";
import useFormModel from "./formModel";

const useFormController = () => {
	const model = useFormModel();

	return {
		async postResident(data: any, residentData: any) {
			const {
				role,
				fname,
				mname,
				lname,
				suffix,
				sex,
				mobileNo,
				presAdd,
				permAdd,
				brgyId,
				idType,
				idNo,
			} = data;
			const {
				seniorType,
				emgContNum,
				emgContName,
				civilStatus,
				birthdate,
				birthPlace,
				empStatus,
				residencyStatus,
				OSCAId,
			} = residentData;

			if (seniorType === "NEW" && OSCAId === "") {
				delete residentData.OSCAId;
			}

			if (
				!role ||
				!fname ||
				!mname ||
				!lname ||
				!suffix ||
				!sex ||
				!mobileNo ||
				!presAdd ||
				!permAdd ||
				!brgyId ||
				!idType ||
				!idNo ||
				!seniorType ||
				!emgContNum ||
				!emgContName ||
				!civilStatus ||
				!birthdate ||
				!birthPlace ||
				!empStatus ||
				!residencyStatus
			) {
				toast.error("Missing Fields");
				return;
			}

			await model.postResident(data, residentData);
		},
		async postAdmin(data: any) {
			const {
				role,
				email,
				password,
				confPassword,
				fname,
				mname,
				lname,
				suffix,
				sex,
				mobileNo,
				presAdd,
				permAdd,
				brgyId,
				idType,
				idNo,
			} = data;

			if (
				!role ||
				!email ||
				!password ||
				!confPassword ||
				!fname ||
				!mname ||
				!lname ||
				!suffix ||
				!sex ||
				!mobileNo ||
				!presAdd ||
				!permAdd ||
				!brgyId ||
				!idType ||
				!idNo
			) {
				toast.error("Missing Fields");
				return;
			}

			if (password !== confPassword) {
				toast.error("Passowrd does not match");
			}

			delete data.confPassword;

			await model.postAdmin(data);
		},
	};
};

export default useFormController;
