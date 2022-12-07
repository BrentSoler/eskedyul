import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import { toast } from "react-toastify";
import useFormController from "./formController";
import Link from "next/link";
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
		OSCAId: "",
	});
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();

	useEffect(() => {
		setData((data) => ({ ...data, brgyId: brgyId }));
	}, [brgyId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (residentData.seniorType === "OLD" && !residentData.OSCAId) {
			toast.error("Add an OSCAID");
			return;
		}

		controller.postResident(data, residentData);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[50rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
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
						<h1>Middle Name </h1>
						<input
							type="text"
							name="mname"
							placeholder="Middle Name (Optional)"
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
							<option value="Jr.">Jr.</option>w2
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
				<div className="divider"></div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Senior Type <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="seniorType"
							value={residentData.seniorType}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="OLD">OLD</option>
							<option value="NEW">NEW</option>
						</select>
					</div>
					{residentData.seniorType === "OLD" && (
						<div className="w-full">
							<h1>OSCA ID No. <span className = "text-red-600">*</span></h1>
							<input
								type="number"
								className="input input-bordered w-full"
								name="OSCAId"
								placeholder = "OSCA ID No."
								value={residentData.OSCAId}
								onChange={(e) => handleChange(e, setResidentData)}
							/>
						</div>
					)}
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Civil Status <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="civilStatus"
							value={residentData.civilStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="Single">Single</option>
							<option value="Married">Married</option>
							<option value="Widow">Widow</option>
							<option value="Divorce">Divorce</option>
						</select>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Emergency Contact Name</h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="emgContName"
							placeholder="Emergency Contact Name (Optional)"
							value={residentData.emgContName}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Emergency Contact No</h1>
						<input
							type="number"
							className="input input-bordered w-full"
							name="emgContNum"
							placeholder="Emergency Contact Number (Optional)"
							value={residentData.emgContNum}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-full">
						<h1>Birth Date <span className = "text-red-600">*</span></h1>
						<input
							type="date"
							className="input input-bordered w-full"
							name="birthdate"
							min = "1922-01-01"
							max = "1962-12-07"
							value={residentData.birthdate}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
					<div className="w-full">
						<h1>Birthplace <span className = "text-red-600">*</span></h1>
						<input
							type="text"
							className="input input-bordered w-full"
							name="birthPlace"
							placeholder ="Birthplace"
							value={residentData.birthPlace}
							onChange={(e) => handleChange(e, setResidentData)}
						/>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="w-full">
						<h1>Employment Status <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="empStatus"
							value={residentData.empStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
							<option value="Employed">Employed</option>
							<option value="Retired w/ pension">Retired w/ pension</option>
							<option value="Retired wo/ pention">Retired wo/ pension</option>
						</select>
					</div>
					<div className="w-full">
						<h1>Residency Status <span className = "text-red-600">*</span></h1>
						<select
							className="select select-bordered w-full "
							name="residencyStatus"
							value={residentData.residencyStatus}
							onChange={(e) => handleChange(e, setResidentData)}
						>
							<option value="--Please select one--" selected hidden>--Please select one--</option>
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

export default AddRes;
