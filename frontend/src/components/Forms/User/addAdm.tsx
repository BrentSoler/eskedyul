import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import useFormController from "./formController";
import Link from "next/link";

const AddAdm = () => {
	const [data, setData] = useState({
		role: "",
		email: "",
		password: "",
		confPassword: "",
		fname: "",
		mname: "",
		lname: "",
		suffix: "",
		sex: "",
		mobileNo: "",
		presAdd: "",
		permAdd: "",
		brgyId: "",
		idType: "",
		idNo: "",
	});
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();
	const [passwordType, setPasswordType] = useState("password");
	const [passwordInput, setPasswordInput] = useState("");
	const [confpasswordType, setconfPasswordType] = useState("password");


	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	const toggleconfPassword = () => {
		if (confpasswordType === "password") {
			setconfPasswordType("text");
			return;
		}
		setconfPasswordType("password");
	};

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		controller.postAdmin(data);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[50rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Admin Type <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="role"
							value={data.role}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="Brgy. Admin">Brgy. Admin</option>
							<option value="Admin">Admin</option>
							<option value="Master Admin">Master Admin</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Email <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							name="email"
							placeholder="Email"
							value={data.email}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Password <span className = "text-red-600">*</span></h1>
						<div className="flex">
						<input
							type={passwordType}
							placeholder="Password"
							className="input input-bordered border-r-0 rounded-r-none w-full"
							name="password"
							value={data.password}
							onChange={(e) => handleChange(e, setData)}
						/>
						<button
							className="input input-bordered border-l-0 rounded-l-none"
							onClick={togglePassword}
							type="button"
						>
							{passwordType === "password" ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
									<path
										fillRule="evenodd"
										d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
									<path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
									<path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
								</svg>
							)}
						</button>
						</div>
					</div>
					<div className="w-full">
						<h1>Confirm Password <span className = "text-red-600">*</span></h1>
						<div className="flex">
							<input
								type={confpasswordType}
								name="confPassword"
								placeholder="Confirm Password"
								value={data.confPassword}
								onChange={(e) => handleChange(e, setData)}
								className="input input-bordered border-r-0 rounded-r-none w-full"
							/>
							<button
							className="input input-bordered border-l-0 rounded-l-none"
							onClick={toggleconfPassword}
							type="button"
							>
							{confpasswordType === "password" ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
									<path
										fillRule="evenodd"
										d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
										clipRule="evenodd"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
									<path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
									<path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
								</svg>
							)}
						</button>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>First Name <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="fname"
							placeholder="First Name"
							value={data.fname}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Middle Name</h1>
						<input
							type="text"
							name="mname"
							placeholder="Middle Name"
							value={data.mname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="w-full">
						<h1>Last Name <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							name="lname"
							placeholder="Last Name"
							value={data.lname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Suffix <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="suffix"
							value={data.suffix}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="jr">jr</option>
							<option value="Jr.">Jr.</option>
							<option value="II">II</option>
							<option value="III">III</option>
							<option value="None">None</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Sex <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full"
							name="sex"
							value={data.sex}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Mobile No. <span className = "text-red-600">*</span></h1>
						<input
							type="number"
							className="input input-bordered w-full"
							name="mobileNo"
							placeholder="091*******9"
							value={data.mobileNo}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Present Address <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="presAdd"
							placeholder="Present Address"
							value={data.presAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Permanent Address <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="permAdd"
							placeholder="Permanent Address"
							value={data.permAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>ID Type <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="Passport">Passport</option>
							<option value="Birth Certificate">Birth Certificate</option>
							<option value="Police Clearance">Police Clearance</option>
							<option value="NBI">NBI</option>
							<option value="Voters ID">Voters ID</option>
							<option value="National ID">National ID</option>
							<option value="SSSID">SSSID</option>
							<option value="PHILHEALTH">PHILHEALTH</option>
						</select>
					</div>
					<div className="w-full">
						<h1>ID No. <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idNo"
							placeholder="ID No."
							value={data.idNo}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>

				{role === "Brgy. Admin" &&
					<div className="flex gap-3">
						<div className="w-full">
							<h1>Remarks</h1>
							<input
								type="text"
								className="input input-bordered w-full"
								name="remarks"
								placeholder="Remarks"
							/>
						</div>
					</div>
				}

				<div className="flex gap-3">
					<Link href={`/dashboard/users`}>
						<button className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
							Back
						</button>
					</Link>
					<a href="#confirmModal" className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
						Submit
					</a>
						<div className="modal" id="confirmModal">
							<div className="modal-box">
								<p className="py-4">Are you sure that all the data are correct and valid?</p>
								<div className="modal-action">
									<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
									<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
										Confirm
									</button>
								</div>
							</div>
						</div>
				</div>
			</form>
		</div>
	);
};

export default AddAdm;
