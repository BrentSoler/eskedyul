import { useRouter } from "next/router";
import { useEffect } from "react";
import EditAdm from "../../../../../components/Forms/User/editAdm";
import AuthStore from "../../../../../store/authStore";

const AddPrograms = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "" && router.query.id) {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="flex justify-center items-center gap-6 p-5">
			<h1 className="font-extrabold text-4xl">EDIT ADMIN</h1>
			<EditAdm id={router.query.id?.toString()} />
		</div>
	);
};

export default AddPrograms;

