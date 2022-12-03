import Link from "next/link";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
    return (
            <div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">ESKEDYUL</h1>
					<h1 className="p-1">Office of Senior Citizens Affairs - Manila.</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Forgot Password</h1>
						<ForgotPasswordForm />
					</div>
					<p className="text-2xs text-center p-1">Copyright 2022 All Rights Reserved</p>
				</div>
			</div>
		    </div>
    );
};

export default ForgotPasswordPage;
