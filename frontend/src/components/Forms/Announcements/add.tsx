import { FormEvent, useEffect, useState, useMemo, ChangeEvent } from "react";
import handleChange from "../../../hooks/handleChange";
import useFormController from "./formController";
import brgyFormController from "../Barangays/formController";
import { stringify } from "querystring";
import Link from "next/link";

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
                <h1>Title <span className = "text-red-600">*</span></h1>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    autoComplete="off"
                    className="input input-bordered w-full"
                    value={announcementData.title}
                    onChange={(e) => handleChange(e, setAnnouncementData)}
                />
                <h1>Details <span className = "text-red-600">*</span></h1>
                <textarea
                    name="details"
                    placeholder="Details"
                    autoComplete="off"
                    className="input input-bordered h-24 w-full"
                    value={announcementData.details}
                    onChange={(e) => handleChange(e, setAnnouncementData)}
                />
                <h1>Barangay <span className = "text-red-600">*</span></h1>
                <div className="h-5 input input-bordered overflow-y-auto h-32 ...">
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
                </div>
                <div className="flex gap-3">
					<Link href={`/dashboard/announcements`}>
						<button className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
							Back
						</button>
					</Link>
                <a href="#confirmModal" className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
						Submit
					</a>
						<div className="modal" id="confirmModal">
						<div className="modal-box">
							<p className="py-4">Are you sure that all the data are correct and valid?</p>
							<div className="modal-action">
								<a href="#" className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max">Back</a>
								<button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max" type="submit">
									Confirm
								</button>
							</div>
						</div>
						</div>
                    </div>
            </form>
        </div>
    );
};

export default AddForm;
