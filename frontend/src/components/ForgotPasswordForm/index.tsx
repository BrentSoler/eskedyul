import { FormEvent, useState } from "react";
import handleChange from "../../hooks/handleChange";
import useFormController from "./formController";
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
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className="flex flex-col" onSubmit={submitHandler}>
                    <h1>Mobile Number:</h1>
                    <input
                        type="text"
                        name="uid"
                        autoComplete="off"
                        className="input input-bordered"
                        value={forgotLoginData.uid}
                        onChange={(e) => handleChange(e, setForgotLoginData)}
                    />
                    <h1>Password:</h1>
                    <input
                        type="password"
                        name="upswd"
                        className="input input-bordered"
                        value={forgotLoginData.upswd}
                        onChange={(e) => handleChange(e, setForgotLoginData)}
                    />
                    <button className="btn-primary mt-10 rounded-lg py-2 px-3 w-max self-end" type="submit">
                        Change Password
                    </button>
                </form>
            </div>
        </div>

    );

};

export default ForgotPasswordForm;
