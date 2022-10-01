import { useRouter } from "next/router";
import { useEffect } from "react";
import AddTransac from "../../../components/Forms/Transaction/add";
import AuthStore from "../../../store/authStore";

const AddPrograms = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);
	return (
		<div className="flex justify-center items-center gap-6 p-5 min-h-[90vh]">
			<h1 className="font-extrabold text-4xl">ADD A TRANSACTION</h1>
			<AddTransac />
		</div>
	);
};

export default AddPrograms;
