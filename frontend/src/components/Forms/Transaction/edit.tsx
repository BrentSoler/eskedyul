import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";

const EditTransac = ({ id }: { id?: string }) => {
	const [transactionData, setTransactionData] = useState({
		id: "",
		residentId: "",
		scheduleId: "",
		programId: "",
		status: "",
	});
	const controller = useFormController();

	const { data, isSuccess } = controller.getTransaction(id!);

	useEffect(() => {
		if (isSuccess) {
			setTransactionData({
				id: data.id,
				residentId: data.residentId,
				scheduleId: data.scheduleId,
				programId: data.programId,
				status: data.status,
			});
		}
	}, [data, isSuccess]);

	function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		controller.updateTransaction(transactionData);
	}

	return (
		<div className="card bg-base-100 shadow-xl p-5 w-[30rem] rounded-md ">
			<form className="w-full flex flex-col" onSubmit={submit}>
				<h1>Status:</h1>
				<select
					className="select select-bordered w-full "
					name="status"
					value={transactionData.status}
					onChange={(e) => handleChange(e, setTransactionData)}
				>
					<option value=""></option>
					<option value="Pending">Pending</option>
					<option value="Completed">Completed</option>
					<option value="Cancelled">Cancelled</option>
				</select>
				<div>
					<Link href={`/dashboard/transactions`}>
						<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-start" type="submit">
							Back
						</button>
					</Link>
					<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditTransac;
