import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { changePasswordUser } from "../../hooks/useForgotPasswordApi";
import AuthStore from "../../store/authStore";

const useFormModel = () => {
    const router = useRouter();
    const token = AuthStore((state) => state.userData.token);

    const { mutate: changePasswordMutate } = useMutation(changePasswordUser, {
        onError: (err: any) => {
            toast.error(err.response.data.msg || err.message);
        },
    });


    return {
        async changePasswordUser(changePasswordData: any) {
            await changePasswordMutate(changePasswordData);
        },
    };
};

export default useFormModel;
