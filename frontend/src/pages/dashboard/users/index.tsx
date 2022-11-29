import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UsersTable from "../../../components/Table/Users";
import AuthStore from "../../../store/authStore";
import useFormController from "../../../components/Forms/User/formController";
import { exportUsersPDF } from "../../../hooks/useExportPDF";
const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);
	const role = AuthStore((state) => state.userData.role);
	const userController = useFormController();
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const { data } = userController.getUser(brgyId);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Users</h1>
				<div className="flex gap-3">
					{role !== "Brgy. Admin" && (
						<Link href="/dashboard/users/add/admin" className="btn btn-primary">
							<a className="btn btn-primary rounded-md">ADD ADMIN</a>
						</Link>
					)}
					<Link href="/dashboard/users/add/resident" className="btn btn-primary">
						<a className="btn btn-primary rounded-md">ADD RESIDENT</a>
					</Link>
					{role === "Master Admin" && (
						<button className="btn btn-primary" onClick={() => { exportUsersPDF(data) }}>Export PDF</button>
					)}
				</div>
			</div>
			<UsersTable />
		</div>
	);
};

export default ProgramsPage;
