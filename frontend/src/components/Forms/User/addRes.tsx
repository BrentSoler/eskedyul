import { FormEvent, useEffect, useMemo, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import progFormController from "../Programs/formController";
import programsController from "../../Table/Programs/programController";

const AddRes = () => {
	const [data, setData] = useState({
		role: "Resident",
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
	const [residentData, setResidentData] = useState({
		seniorType: "",
		emgContNum: "",
		emgContName: "",
		civilStatus: "",
		birthdate: "",
		birthPlace: "",
		empStatus: "",
		residencyStatus: "",
	});
	const brgyId = AuthStore((state) => state.userData.brgyId);

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// controller.postTransaction(transactionData);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[50rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
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
						<h1>Preffix:</h1>
						<select
							className="select select-bordered w-full "
							name="suffix"
							value={data.suffix}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Mr./Mrs.">Mr./Mrs.</option>
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
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="divider"></div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Senior Type:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="OLD">OLD</option>
							<option value="NEW">NEW</option>
						</select>
					</div>
					{residentData.seniorType === "OLD" && (
						<div className="w-full">
							<h1>OSCA ID:</h1>
							<input
								type="text"
								className="input input-bordered w-full"
								name="idType"
								value={data.idType}
								onChange={(e) => handleChange(e, setData)}
							/>
						</div>
					)}
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Civil Status:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Widow">Widow</option>
							<option value="Divorce">Divorce</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Emergency Contact No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Emergency Contact Name:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Birth Date:</h1>
						<input
							type="date"
							className="input input-bordered w-full"
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
					<div className="w-full">
						<h1>Birth Place:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="w-full">
						<h1>Employment Status:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Single">Single</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Residency Status:</h1>
						<select
							className="select select-bordered w-full "
							name="idType"
							value={data.idType}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Widow">Widow</option>
							<option value="Divorce">Divorce</option>
						</select>
					</div>
				</div>

				<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddRes;
