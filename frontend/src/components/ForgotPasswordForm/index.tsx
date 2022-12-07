import { FormEvent, useState } from "react";
import handleChange from "../../hooks/handleChange";
import useFormController from "./formController";
import Link from "next/link";


const ForgotPasswordForm = () => {
    const controller = useFormController()
    const [forgotLoginData, setForgotLoginData] = useState({
        uid: "",
        upswd: "",
    });

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        console.log("check 1")
        controller.changePasswordUser(forgotLoginData);
    }

    return (
                <form className="flex flex-col" onSubmit={submitHandler}>
                    <h1>Mobile Number <span className = "text-red-600">*</span></h1>
                    <input
                        type="text"
                        name="uid"
                        autoComplete="off"
                        placeholder ="Mobile Number"
                        className="input input-bordered"
                        value={forgotLoginData.uid}
                        onChange={(e) => handleChange(e, setForgotLoginData)}
                    />
                    <h1>Password <span className = "text-red-600">*</span></h1>
                    <input
                        type="password"
                        name="upswd"
                        placeholder="Password"
                        className="input input-bordered"
                        value={forgotLoginData.upswd}
                        onChange={(e) => handleChange(e, setForgotLoginData)}
                    />
                <div>
                <div className="flex gap-3">
                    <Link href={`/login`}>
						<button className="btn-secondary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
							Back
						</button>
					</Link>
                    <button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
                        Submit
                    </button>
                </div>
                </div>  
                </form>
    );

};

export default ForgotPasswordForm;
