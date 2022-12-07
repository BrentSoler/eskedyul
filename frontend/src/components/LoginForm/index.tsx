import { FormEvent, useState } from "react";
import handleChange from "../../hooks/handleChange";
import useLoginController from "./loginController";
import Link from "next/link";
const LoginForm = () => {
	const controller = useLoginController();
	const [loginData, setLoginData] = useState({
		uid: "",
		upswd: "",
	});
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	  };

	function submitHandler(e: FormEvent) {
		e.preventDefault();

		controller.login(loginData.uid, loginData.upswd);
	}

	return (
		<form className="flex flex-col" onSubmit={submitHandler}>
			<h1>Mobile Number:</h1>
			<input
				type="number"
				name="uid"
				placeholder="Mobile Number"
				autoComplete="off"
				className="input input-bordered"
				value={loginData.uid}
				onChange={(e) => handleChange(e, setLoginData)}
			/>
			<h1>Password:</h1>
			<input
				type={passwordShown ? "text" : "password"}
				name="upswd"
				placeholder="Password"
				className="input input-bordered"
				value={loginData.upswd}
				onChange={(e) => handleChange(e, setLoginData)}
			/>
			<div className="flex flex-start pt-1">
				<Link href={`/forgot-password`}>
					<a className="font-medium text-primary text-sm">
						Forgot your password?
					</a>
				</Link>
			</div>
				<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
					Submit
				</button>
		</form>
	);
};

export default LoginForm;
