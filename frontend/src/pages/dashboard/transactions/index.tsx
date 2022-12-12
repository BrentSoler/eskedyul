import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TransactionTable from "../../../components/Table/Transactions";
import AuthStore from "../../../store/authStore";
import useTransactionController from "../../../components/Table/Transactions/transactionController";
import { exportTransactionsPDF } from "../../../hooks/useExportPdf";
const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useTransactionController();
	const { data } = controller.getTransaction(brgyId);
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
					<a href = "#chooseModal">
						<button className="btn btn-primary">Export PDF</button>
						<div className="modal" id="chooseModal">
							<div className="modal-box">
								<p className="py-4">Choose a program to export: </p>
								<select
										className="select select-bordered w-full"
										name="programId"
									>
										<option value =""></option>
										<option value ="">Program</option>
									</select>
								<div className="modal-action">
									<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
									<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit" onClick={() => { exportTransactionsPDF(data) }}>
										Export
									</button>
								</div>
							</div>
						</div>
					</a>		
				)}
			</div>

			<TransactionTable />
		</div>
	);
};

export default ProgramsPage;
