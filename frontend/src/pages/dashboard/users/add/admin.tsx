import { useRouter } from "next/router";
import { useEffect } from "react";
import AddAdm from "../../../../components/Forms/User/addAdm";
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
			<h1 className="font-extrabold text-4xl">ADD AN ADMIN</h1>
			<AddAdm />
		</div>
	);
};

export default AddPrograms;
