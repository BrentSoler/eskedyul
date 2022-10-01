import { useRouter } from "next/router";
import { useEffect } from "react";
import AddTransac from "../../../../components/Forms/Transaction/add";
import AddRes from "../../../../components/Forms/User/addRes";
import AuthStore from "../../../../store/authStore";

const AddPrograms = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);
	return (
		<div className="flex flex-col justify-center items-center gap-6 p-5 mt-5">
			<h1 className="font-extrabold text-4xl">ADD A RESIDENT</h1>
			<AddRes />
		</div>
	);
};

export default AddPrograms;
