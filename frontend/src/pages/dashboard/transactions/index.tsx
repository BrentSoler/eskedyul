import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TransactionTable from "../../../components/Table/Transactions";
import AuthStore from "../../../store/authStore";
import useTransactionController from "../../../components/Table/Transactions/transactionController";
import { exportTransactionsPDF } from "../../../hooks/useExportPdf";
import useProgramController from "../../../components/Table/Programs/programController";

const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const programController = useProgramController(brgyId);
	const controller = useTransactionController();
	const { data } = controller.getTransaction(brgyId);
	const [program, setProgram] = useState("");

	const { data: progData, isSuccess } = programController.getPrograms(brgyId);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Transactions</h1>
				{role === "Brgy. Admin" && (
					<Link href="/dashboard/transactions/add" className="btn btn-primary">
						<a className="btn btn-primary rounded-md">ADD</a>
					</Link>
				)}
				{role === "Master Admin" && (
					<label className="btn btn-primary" htmlFor="TransacPDF">
						Export PDF
					</label>
				)}
			</div>

			<TransactionTable />

			<input type="checkbox" id="TransacPDF" className="modal-toggle" />
			<label htmlFor="TransacPDF" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<select
						className="select select-bordered w-full max-w-xs"
						onChange={(e) => {
							setProgram(e.target.value);
						}}
					>
						<option value=""></option>
						{isSuccess &&
							progData.data.map((program: any) => (
								<option key={program.id} value={program.name}>
									{program.name}
								</option>
							))}
					</select>
					<p className="py-4">
						<label
							className="btn btn-primary"
							onClick={() => {
								exportTransactionsPDF(data, program);
							}}
							htmlFor="TransacPDF"
						>
							Print PDF
						</label>
					</p>
				</label>
			</label>
		</div>
	);
};

export default ProgramsPage;
