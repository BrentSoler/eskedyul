import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import useFormController from "./formController";

const EditAdm = ({ id }: { id?: string }) => {
	const [data, setData] = useState({
		role: "",
		email: "",
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

	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();

	const { data: userData, isSuccess } = controller.getUser(id!);

	useEffect(() => {
		if (isSuccess) {
			setData({
				role: userData.role,
				email: userData.email,
				fname: userData.fname,
				mname: userData.mname,
				lname: userData.lname,
				suffix: userData.suffix,
				sex: userData.sex,
				mobileNo: userData.mobileNo,
				presAdd: userData.presAdd,
				permAdd: userData.permAdd,
				brgyId: userData.brgyId,
				idType: userData.idType,
				idNo: userData.idNo
			})
		}
	}, [userData, isSuccess])

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		controller.updateAdmin(data, id!);
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
							type="text"
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

				<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditAdm;
