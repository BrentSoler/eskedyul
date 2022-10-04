import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProgramsTable from "../../../components/Table/Programs";
import AuthStore from "../../../store/authStore";

const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);
	const role = AuthStore((state) => state.userData.role);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Programs</h1>
				{role === "Master Admin" && (
					<Link href="/dashboard/programs/add" className="btn btn-primary">
						<a className="btn btn-primary rounded-md">ADD</a>
					</Link>
				)}
			</div>
			<ProgramsTable />
		</div>
	);
};

export default ProgramsPage;
