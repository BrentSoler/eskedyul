import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TransactionTable from "../../../components/Table/Transactions";
import AuthStore from "../../../store/authStore";
import useTransactionController from "../../../components/Table/Transactions/transactionController";
import { exportTransactionsPDF } from "../../../hooks/useExportPDF";
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
					<button className="btn btn-primary" onClick={() => { exportTransactionsPDF(data) }}>Export PDF</button>
				)}
			</div>

			<TransactionTable />
		</div>
	);
};

export default ProgramsPage;
