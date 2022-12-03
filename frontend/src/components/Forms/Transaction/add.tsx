import { FormEvent, useMemo, useState, ChangeEvent, useEffect } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import "react-responsive-combo-box/dist/index.css";
import AuthStore from "../../../store/authStore";
import progFormController from "../Programs/formController";
import programsController from "../../Table/Programs/programController";
import Link from "next/link";

const AddTransac = () => {
	const [transactionData, setTransactionData] = useState({
		residentId: "",
		scheduleId: "",
		programId: "",
	});
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useFormController();
	const progFormsController = progFormController(brgyId);
	const progController = programsController(brgyId);
	const [residentID, setResidentID] = useState([] as any);
	const { data: users, isSuccess: userSuccess } = controller.getUsers(brgyId);
	const { data: progData, isSuccess: progSuccess } = progController.getPrograms(brgyId);
	const { data: schedData, isSuccess: schedSuccess } = progFormsController.getProgramById(
		transactionData.programId
	);

	const names = useMemo(() => {
		if (userSuccess) {
			const residentFilter = users.data.filter((user: any) => {
				return user.role === "Resident" && user.status === 1;
			});

			const qualificationFilter = residentFilter.filter((user: any) => {
				return schedSuccess && schedData !== "No Data"
					? schedData.qualification === user.residents[0].residencyStatus
					: user.role === "Resident" && user.status === 1;
			});
			const namesData = qualificationFilter.map((user: any) => ({
				id: user.id,
				lname: user.lname,
				fname: user.fname,
				mname: user.mname,
				checked: false
			}));

			return namesData;
		}

		return [];
	}, [users, userSuccess, schedData, schedSuccess, transactionData.programId]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		residentID.forEach((id: string) => {
			const newData = {
				residentId: id,
				scheduleId: transactionData.scheduleId,
				programId: transactionData.programId,
			}
			controller.postTransaction(newData);
		});


	}

	const handleChangeProgram = (e: ChangeEvent<HTMLSelectElement>) => {
		setResidentID([])
		handleChange(e, setTransactionData)
	}

	const handleChangeID = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("value?: ", e.target.value)

		if (e.target.checked === true) {
			setResidentID([...residentID, e.target.value]);
		}
		else if (e.target.checked === false) {
			let freshbrgyID = residentID.filter((val: string) => val !== e.target.value);
			setResidentID([...freshbrgyID]);
		}
		console.log("check names", names)
		console.log("check residentId", residentID)
	}
	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[30rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
				<h1>Programs:</h1>
				<select
					className="select select-bordered w-full "
					name="programId"
					value={transactionData.programId}
					onChange={(e) => handleChangeProgram(e)}
				>
					<option value=""></option>
					{progSuccess && progData.data !== "No Data" ? (
						progData.data.map((prog: any) => (
							<option value={prog.id} key={prog.id}>
								{prog.name}
							</option>
						))
					) : (
						<option value=""></option>
					)}
				</select>
				<h1 className="pt-1 pb-1">Beneficiary:</h1>
				<div className="h-5 pt-1 px-1 input input-bordered overflow-y-auto h-32 ...">
					{transactionData.programId &&
						names.map((resident: any) => (
							<>
								<div className="flex flex-row gap-2 m-1">
									<input
										type="checkbox"
										name="residentId"
										checked={resident.checked}
										className="checkbox"
										value={resident.id}
										onChange={(e) => {
											e.target.checked = true;
											resident.checked = true;
											handleChangeID(e)

										}}
									/>
									<label>{resident.id}~{resident.lname}, {resident.fname} {resident.mname} </label>
								</div>
							</>
						))
					}
					{!transactionData.programId &&
						<div className="text-secondary">Select a program first</div>
					}
				</div>
				<h1>Schedule:</h1>
				<select
					className="select select-bordered w-full"
					name="scheduleId"
					value={transactionData.scheduleId}
					onChange={(e) => handleChange(e, setTransactionData)}
				>
					<option value=""></option>
					{schedData && schedSuccess && schedData.data !== "No Data" ? (
						schedData.schedule.map((sched: any) => (
							<option value={sched.id} key={sched.id} className="flex flex-col h-max">
								{`Location: ${sched.location}   Date: ${sched.date}     Time: ${sched.startTime}-${sched.endTime}  `}
							</option>
						))
					) : (
						<option value=""></option>
					)}
				</select>

				<div className="flex gap-3">
					<Link href={`/dashboard/transactions`}>
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

export default AddTransac;
