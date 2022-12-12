import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import AuthStore from "../store/authStore";

const Home: NextPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token !== "") {
			router.push("/dashboard");
		}
	}, [token, router]);

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">E-SKEDYUL</h1>
					<h1 className="p-1">Office of Senior Citizens Affairs - Manila.</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Login</h1>
						<LoginForm />
					</div>
					
					<p className="text-2xs text-center p-1">Copyright 2022 All Rights Reserved</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
