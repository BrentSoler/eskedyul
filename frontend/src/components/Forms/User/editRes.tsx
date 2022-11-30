import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import { toast } from "react-toastify";
import useFormController from "./formController";
import Link from "next/link";

const EditRes = ({ id }: { id?: string }) => {
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
		remarks: "",
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
		OSCAId: "",
	});
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();

	const { data: userData, isSuccess } = controller.getUser(id!);

	useEffect(() => {
		if (isSuccess) {
			setData({
				role: userData.role,
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
				idNo: userData.idNo,
				remarks: userData.residents[0].remarks
			})
			setResidentData({
				seniorType: userData.residents[0].seniorType,
				emgContNum: userData.residents[0].emgContNum,
				emgContName: userData.residents[0].emgContName,
				civilStatus: userData.residents[0].civilStatus,
				birthdate: userData.residents[0].birthdate,
				birthPlace: userData.residents[0].birthPlace,
				empStatus: userData.residents[0].empStatus,
				residencyStatus: userData.residents[0].residencyStatus,
				OSCAId: userData.residents[0].OSCAId,
			})
		}
	}, [userData, isSuccess])

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (residentData.seniorType === "OLD" && !residentData.OSCAId) {
			toast.error("Add an OSCAID");
			return;
		}

		controller.updateResident(data, residentData, userData.id);
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
						<h1>Suffix</h1>
						<select
							className="select select-bordered w-full "
							name="suffix"
							value={data.suffix}
							onChange={(e) => handleChange(e, setData)}
						>
							<option value=""></option>
							<option value="jr">Jr.</option>
							<option value="Jr.">Sr.</option>w2
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
				<div className="divider"></div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Senior Type:</h1>
						<select
							className="select select-bordered w-full "
							name="seniorType"
							value={residentData.seniorType}
							onChange={(e) => handleChange(e, setResidentData)}
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
								name="OSCAId"
								value={residentData.OSCAId}
								onChange={(e) => handleChange(e, setResidentData)}
							/>
						</div>
					)}
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Civil Status:</h1>
						<select
							className="select select-bordered w-full "
							name="civilStatus"
							value={residentData.civilStatus}
							onChange={(e) => handleChange(e, setResidentData)}
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
						<h1>Emergency Contact Name:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="emgContName"
							value={residentData.emgContName}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Emergency Contact No:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="emgContNum"
							value={residentData.emgContNum}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Birth Date:</h1>
						<input
							type="date"
							className="input input-bordered w-full"
							name="birthdate"
							value={residentData.birthdate}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Birth Place:</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="birthPlace"
							value={residentData.birthPlace}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="w-full">
						<h1>Employment Status:</h1>
						<select
							className="select select-bordered w-full "
							name="empStatus"
							value={residentData.empStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="Employed">Employed</option>
							<option value="Retired w/ pension">Retired w/ pension</option>
							<option value="Retired wo/ pention">Retired wo/ pension</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Residency Status:</h1>
						<select
							className="select select-bordered w-full "
							name="residencyStatus"
							value={residentData.residencyStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value=""></option>
							<option value="6months of Residency">6months of Residency</option>
							<option value="Registered Voter">Registered Voter</option>
						</select>
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
								onChange={(e) => handleChange(e, setData)}
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
					<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditRes;