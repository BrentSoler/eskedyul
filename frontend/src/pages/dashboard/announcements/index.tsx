import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AnnouncementsTable from "../../../components/Table/Annnouncements";
import AuthStore from "../../../store/authStore";
import brgyFormController from "../../../components/Forms/Barangays/formController"
const ProgramsPage = () => {
    const router = useRouter();
    const token = AuthStore((state) => state.userData.token);
    const role = AuthStore((state) => state.userData.role);
    const brgyFormsController = brgyFormController();
    const { data: brgyData, isSuccess: brgySuccess } = brgyFormsController.getBarangays()
    useEffect(() => {
        if (token === "") {
            router.push("/");
        }
    }, [token, router]);
    useEffect(() => {
        console.log("sucess?", brgySuccess)
        console.log("check brgydata: ", brgyData)
    }, [])
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl">Announcements</h1>
                {role === "Master Admin" && (
                    <Link href="/dashboard/announcements/add" className="btn btn-primary">
                        <a className="btn btn-primary rounded-md">ADD</a>
                    </Link>
                )}
            </div>
            <AnnouncementsTable />
        </div>
    );
};

export default ProgramsPage;
