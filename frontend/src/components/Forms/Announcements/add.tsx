import { FormEvent, useEffect, useState, useMemo } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import brgyFormController from "../Barangays/formController";

const AddForm = () => {
    const [announcementData, setAnnouncementData] = useState({
        title: "",
        details: "",
        barangay: "",

    });

    const [brgyIDs, setBrgyIDS] = useState([]);
    const [barangayID, setBarangayID] = useState();
    const controller = useFormController();
    const brgyFormsController = brgyFormController();
    const { data: brgyData, isSuccess: brgySuccess } = brgyFormsController.getBarangays()

    function submitAnnouncement(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("check", announcementData)
        controller.postAnnouncement(announcementData)
    }
    useEffect(() => {
        //console.log("check brgydata: ", brgyData)
        //console.log("barangay check: ", barangay)
    }, [])

    useEffect(() => {
        console.log("barangay id check: ", barangayID)
        const arr = Object.values({ barangayID });
        const test = arr.map((brgy: any) => {
            return `${brgy.brgyID}`;
        });
        //console.log("barangay id check2: ", arr, "test", test)
    }, [barangayID])

    const barangay = useMemo(() => {
        if (brgySuccess) {
            const data = brgyData.data
            return data;
        }
        return [];

    }, [brgyData, brgySuccess]);
    return (
        <div className="card bg-base-100 shadow-xl p-5 w-[30rem] rounded-md">
            <form className="w-full flex flex-col" onSubmit={submitAnnouncement}>
                <h1>Title:</h1>
                <input
                    type="text"
                    name="title"
                    autoComplete="off"
                    className="input input-bordered w-full"
                    value={announcementData.title}
                    onChange={(e) => handleChange(e, setAnnouncementData)}
                />
                <h1>Details:</h1>
                <textarea
                    name="details"
                    autoComplete="off"
                    className="input input-bordered h-24 w-full"
                    value={announcementData.details}
                    onChange={(e) => handleChange(e, setAnnouncementData)}
                />
                <h1>Barangay:</h1>
                <input
                    type="text"
                    name="barangay"
                    autoComplete="off"
                    className="input input-bordered w-full"
                    value={announcementData.barangay}
                    onChange={(e) => handleChange(e, setAnnouncementData)}
                />
                {/*brgySuccess &&
                    barangay.map((brgy: any) => (
                        <>
                            <div className="flex flex-row gap-2 m-1">
                                <input
                                    type="checkbox"
                                    name="brgyID"
                                    className="checkbox"
                                    value={brgy.id}
                                    onChange={(e) => handleChange(e, setBarangayID)}
                                />
                                <label> {brgy.id} </label>
                            </div>
                        </>
                    ))
                    */}

                <button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddForm;
