import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { changePasswordUser } from "../../hooks/useForgotPasswordApi"
import useFormModel from "./formModel";

const useFormController = () => {
    const model = useFormModel();

    return {
        async changePasswordUser(data: any) {
            console.log("data: ", data)
            const userData = {
                mobileNo: data.uid,
                newPassword: data.upswd,
            }
            if (!userData.mobileNo || !userData.newPassword) {
                toast.error("Missing Fields!");

                console.log(userData)
                return;
            }

            await model.changePasswordUser(userData)
        },
    };
};

export default useFormController;
