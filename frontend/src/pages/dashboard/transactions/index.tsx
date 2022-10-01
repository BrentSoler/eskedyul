import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TransactionTable from "../../../components/Table/Transactions";
import AuthStore from "../../../store/authStore";

const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Transactions</h1>
				<Link href="/dashboard/transactions/add" className="btn btn-primary">
					<a className="btn btn-primary rounded-md">ADD</a>
				</Link>
			</div>
			<TransactionTable />
		</div>
	);
};

export default ProgramsPage;
