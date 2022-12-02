import { FormEvent, useEffect, useState, useMemo, ChangeEvent } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import brgyFormController from "../Barangays/formController";
import { stringify } from "querystring";

const AddForm = () => {
    const [announcementData, setAnnouncementData] = useState({
        title: "",
        details: "",
        barangay: "",

    });

    const controller = useFormController();
    const brgyFormsController = brgyFormController();
    const { data: brgyData, isSuccess: brgySuccess } = brgyFormsController.getBarangays()
    const [brgyID, setbrgyID] = useState([] as any);
    function submitAnnouncement(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        announcementData.barangay = brgyID.join(', ');
        controller.postAnnouncement(announcementData)
    }

    const barangay = useMemo(() => {
        if (brgySuccess) {
            const data = brgyData.data
            return data;
        }
        return [];

    }, [brgyData, brgySuccess]);

    const handleChangeID = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked === true) {
            setbrgyID([...brgyID, e.target.value]);
        }
        else if (e.target.checked === false) {
            let freshbrgyID = brgyID.filter((val: string) => val !== e.target.value);
            setbrgyID([...freshbrgyID]);
        }

    }

    useEffect(() => {
        console.log("check brgy ids", brgyID);
    }, [brgyID]);

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
                {brgySuccess &&
                    barangay.map((brgy: any) => (
                        <>
                            <div className="flex flex-row gap-2 m-1">
                                <input
                                    type="checkbox"
                                    name="barangay"
                                    className="checkbox"
                                    value={brgy.id}
                                    onChange={(e) => handleChangeID(e)}
                                />
                                <label> {brgy.id} </label>
                            </div>
                        </>
                    ))
                }

                <button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddForm;