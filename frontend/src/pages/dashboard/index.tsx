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
	return <div>Dahsboard</div>;
};

export default Dahsboard;
