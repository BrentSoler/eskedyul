import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthStore from "../../store/authStore";

const Dahsboard = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);
	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Dashboard</h1>
			</div>
		</div>
	);
};

export default Dahsboard;
