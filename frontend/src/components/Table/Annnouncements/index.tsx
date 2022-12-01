import { useMemo, useState } from "react";
import Link from "next/link";
import AuthStore from "../../../store/authStore";
import useAnnouncementController from "./announcementController";

const AnnouncementsTable = () => {
    const role = AuthStore((state) => state.userData.role);
    const controller = useAnnouncementController();
    const brgyId = AuthStore((state) => state.userData.brgyId);
    const { data, isSuccess, isLoading } = controller.getAnnouncements();
    const [sort, setSort] = useState("asc");

    const [searchFilter, setSearchFilter] = useState("");

    // filter function useMemo
    const handleFilteredData = useMemo(() => {
        if (isSuccess) {
            if (data.data !== "No Data") {

                let sorted = data.data.sort((a: any, b: any) => {
                    return sort === "asc" ? a.title.localeCompare(b.title) : -a.title.localeCompare(b.title);
                });
                if (role === "Brgy. Admin") {
                    sorted = data.data?.filter((d: any) =>
                        d.barangay.toString().replace(",", " ").includes(brgyId.toString())
                    )
                }
                const titleSort = sorted.filter((d: any) =>
                    d.title.toLowerCase().includes(searchFilter.toLowerCase())
                );
                let brgyIdSort = [];
                if (role === "Master Admin") {
                    console.log("test 3")
                    brgyIdSort = sorted?.filter((d: any) =>
                        d.barangay.toString().replace(",", " ").includes(searchFilter.toString())
                    );
                }

                return searchFilter === ""
                    ? sorted
                    : [...new Set([...titleSort, ...brgyIdSort])];
            }
            return "No Data";
        }
    }, [isSuccess, data, searchFilter, sort]);

    return (
        <>
            <div className="flex gap-3">
                <input
                    placeholder={`Search Title ${role === "Master Admin" ? ", Brgy ID" : ""}`}
                    type="text"
                    onChange={(e) => {
                        setSearchFilter(e.target.value);
                    }}
                    value={searchFilter}
                    className="input input-bordered w-full mt-3"
                />
            </div>
            <div className="w-full mt-4 mb-4 p-1 bg-base-200" />
            <div className="w-full mt-4 overflow-x-auto m-auto">
                <table className="table w-full m-auto">
                    <thead>
                        <tr>
                            <th className="sticky top-0 px-6 py-3">ID</th>
                            <th className="sticky top-0 px-6 py-3 flex justify-between items-center">
                                TITLE
                                <label className="swap swap-rotate">
                                    <input type="checkbox" onClick={() => setSort(sort === "asc" ? "desc" : "asc")} />

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 swap-off"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 swap-on"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </label>
                            </th>
                            <th className="sticky top-0 px-6 py-3">DETAILS</th>
                            <th className="sticky top-0 px-6 py-3">BARANGAY</th>
                            {role === "Master Admin" && <th className="sticky top-0 px-6 py-3 w-6"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td>Loading...</td>
                                <td></td>
                                <td className="text-center"></td>
                            </tr>
                        )}
                        {isSuccess && handleFilteredData !== "No Data" ? (
                            handleFilteredData.map((announcement: any) => (
                                <tr key={announcement.id}>
                                    <td className="">{announcement.id}</td>
                                    <td className="">{announcement.title}</td>
                                    <td className="">{announcement.details}</td>
                                    <td className="w-[15rem] truncate">{announcement.barangay}</td>
                                    {role === "Master Admin" && (
                                        <td>
                                            <button
                                                className="btn btn-ghost"
                                                onClick={() => controller.deleteAnnouncement(announcement.id)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr className="btn btn-ghost">No Data</tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AnnouncementsTable;
