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

	function submitHandler(e: FormEvent) {
		e.preventDefault();

		controller.login(loginData.uid, loginData.upswd);
	}

	const [forgotLoginData, setForgotLoginData] = useState({
		uid: "",
		upswd: "",
	});

	function forgotSubmitHandler(e: FormEvent) {
		e.preventDefault();

		//controller.login(loginData.uid, loginData.upswd);
	}

	return (
		<>
			<form className="flex flex-col" onSubmit={submitHandler}>
				<h1>Mobile Number:</h1>
				<input
					type="text"
					name="uid"
					autoComplete="off"
					className="input input-bordered"
					value={loginData.uid}
					onChange={(e) => handleChange(e, setLoginData)}
				/>
				<h1>Password:</h1>
				<input
					type="password"
					name="upswd"
					className="input input-bordered"
					value={loginData.upswd}
					onChange={(e) => handleChange(e, setLoginData)}
				/>
				<Link href={`/forgot-password`}>
					<div className="flex flex-start pt-1">
						<button className="font-medium text-primary text-sm">
							Forgot your password?
						</button>
					</div>
				</Link>

				<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
					Submit
				</button>
			</form>
			<div className="flex flex-start pt-1 " >
				<label htmlFor="forgot-password-modal" className="font-medium text-primary text-sm">
					Forgot your password?
				</label>
			</div>
			<input type="checkbox" id="forgot-password-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="forgot-password-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<form className="flex flex-col" onSubmit={forgotSubmitHandler}>
						<h1>Mobile Number:</h1>
						<input
							type="text"
							name="uid"
							autoComplete="off"
							className="input input-bordered"
							value={forgotLoginData.uid}
							onChange={(e) => handleChange(e, setForgotLoginData)}
						/>
						<h1>Password:</h1>
						<input
							type="password"
							name="upswd"
							className="input input-bordered"
							value={forgotLoginData.upswd}
							onChange={(e) => handleChange(e, setForgotLoginData)}
						/>
						<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
