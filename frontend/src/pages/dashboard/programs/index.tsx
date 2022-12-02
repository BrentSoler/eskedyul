import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProgramsTable from "../../../components/Table/Programs";
import AuthStore from "../../../store/authStore";
import useProgramController from "../../../components/Table/Programs/programController";
import { exportProgramsPDF } from "../../../hooks/useExportPdf";
const ProgramsPage = () => {
	const router = useRouter();
	const token = AuthStore((state) => state.userData.token);
	const role = AuthStore((state) => state.userData.role);
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const controller = useProgramController(brgyId);
	const { data } = controller.getPrograms(brgyId);

	useEffect(() => {
		if (token === "") {
			router.push("/");
		}
	}, [token, router]);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-3xl">Programs</h1>
				<div className="flex gap-3">
					{role === "Master Admin" && (
						<>
							<Link href="/dashboard/programs/add" className="btn btn-primary">
								<a className="btn btn-primary rounded-md">ADD</a>
							</Link>
							<button className="btn btn-primary" onClick={() => { exportProgramsPDF(data) }}>Export PDF</button>
						</>
					)}
				</div>
			</div>

			<ProgramsTable />
		</div>
	);
};

export default ProgramsPage;
