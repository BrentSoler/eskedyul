import { useRouter } from "next/router";
import { useEffect } from "react";
import AddForm from "../../../components/Forms/Programs/add";
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
		<div className="flex justify-center items-center gap-6 p-5">
			<h1 className="font-extrabold text-4xl">ADD A PROGRAM</h1>
			<AddForm />
		</div>
	);
};

export default AddPrograms;
