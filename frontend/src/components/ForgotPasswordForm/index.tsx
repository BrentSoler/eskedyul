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

    const [passwordType, setPasswordType] = useState("password");

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

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
                    
                    <div className = "flex">
                    <input
                        type={passwordType}
                        name="upswd"
                        placeholder="Password"
                        className="input input-bordered"
                        value={forgotLoginData.upswd}
                        onChange={(e) => handleChange(e, setForgotLoginData)}
                    />
                    
                    <button className="btn btn-ghost" onClick={togglePassword} type="button">
                    { passwordType==="password"? 
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-6 h-6">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                    </svg> : 
                    <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-6 h-6">
                        <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>}
                    </button>
                </div>
                
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
