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
						<h1>Admin Type:</h1>
						<select
							className="select select-bordered w-full "
							name="role"
							value={data.role}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Brgy. Admin">Brgy. Admin</option>
							<option value="Admin">Admin</option>
							<option value="Master Admin">Master Admin</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Email:</h1>
						<input
							type="text"
							name="email"
							value={data.email}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Password:</h1>
						<input
							type="password"
							className="input input-bordered w-full"
							name="password"
							value={data.password}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Confirm Password:</h1>
						<input
							type="password"
							name="confPassword"
							value={data.confPassword}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>First Name:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="fname"
							value={data.fname}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Middle Name:</h1>
						<input
							type="text"
							name="mname"
							value={data.mname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="w-full">
						<h1>Last Name:</h1>
						<input
							type="text"
							name="lname"
							value={data.lname}
							onChange={(e) => handleChange(e, setData)}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Suffix:</h1>
						<select
							className="select select-bordered w-full "
							name="suffix"
							value={data.suffix}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="jr">jr</option>
							<option value="Jr.">Jr.</option>
							<option value="II">II</option>
							<option value="III">III</option>
							<option value="None">None</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Sex:</h1>
						<select
							className="select select-bordered w-full"
							name="sex"
							value={data.sex}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Mobile No:</h1>
						<input
							type="number"
							className="input input-bordered w-full"
							name="mobileNo"
							value={data.mobileNo}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Present Address:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="presAdd"
							value={data.presAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Permanent Address:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="permAdd"
							value={data.permAdd}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>ID Type:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
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
						<h1>ID No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idNo"
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
								<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">BACK</a>
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
