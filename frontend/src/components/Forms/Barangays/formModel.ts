import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { getBarangays } from "../../../hooks/useBarangayApi";
import AuthStore from "../../../store/authStore";

const useFormModel = () => {
    /* const router = useRouter();
     const token = AuthStore((state) => state.userData.token);
 
     const { refetch } = useQuery(["brgy"], () => getBarangays(), {
         refetchOnMount: false,
         refetchOnWindowFocus: false,
     });*/



    return {


    };
};

export default useFormModel;
