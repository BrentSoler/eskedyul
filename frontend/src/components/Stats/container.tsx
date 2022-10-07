import Stats from ".";
import AuthStore from "../../store/authStore";
import useStatController from "./statController";

const StatsContainer = () => {
	const controller = useStatController();
	const brgyId = AuthStore((state) => state.userData.brgyId);
	const { data, isSuccess } = controller.getReport(brgyId);

	return (
		<div className="flex flex-col gap-4">
			{isSuccess && data.data !== "No Data" ? (
				data.data.map((report: any) => (
					<Stats
						key={report.program.name}
						cancel={report.cancelled}
						pending={report.pending}
						complete={report.completed}
						name={report.program.name}
						detail={report.program.details}
						type={report.program.type}
						qualification={report.program.qualification}
						status={report.program.status}
					/>
				))
			) : (
				<h1 className="text-lg">No Programs Posted in Baragay: {brgyId}</h1>
			)}
		</div>
	);
};

export default StatsContainer;
