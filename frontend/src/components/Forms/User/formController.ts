import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { findId } from "../../../hooks/useUserApi";
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
				toast.error("Password does not match");
			}

			await model.postAdmin(data);
		},
		async updateAdmin(data: any, id: string) {
			const {
				role,
				email,
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
				!fname ||
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

			await model.updateAdmin(data, id);
		},
		async updateResident(data: any, residentData: any, id: string) {
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
				!civilStatus ||
				!birthdate ||
				!birthPlace ||
				!empStatus ||
				!residencyStatus
			) {
				toast.error("Missing Fields");
				return;
			}

			await model.updateResident(data, residentData, id);
		},
		getUser(id: string) {
			return useQuery(["user", id], () => findId(id), {
				refetchOnWindowFocus: false,
				onError: (err: any) => {
					toast.error(err.response.message || err.message);
				},
			});
		},
	};
};

export default useFormController;
