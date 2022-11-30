import { FormEvent, useEffect, useState } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";

const AddForm = () => {
    const [announcementData, setAnnouncementData] = useState({
        title: "",
        details: "",
        barangay: "",

    });
    const controller = useFormController();

    function submitAnnouncement(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("check", announcementData)
        controller.postAnnouncement(announcementData)
    }

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

                <button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddForm;
