import {useUser} from "@/state/user";
import {PROFILE_STORAGE_KEY} from "@/constant/constant";
import apiServices from "@/services/apiServices";
import {useEffect} from "react";

const UpdateUser = ({children}) => {
  const {onSetUser} = useUser();

  const updateUser = async () => {
    try {
      const token = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!token) {
        throw new Error('Token not found')
      }
      const userData = await apiServices.getProfile();
      onSetUser(userData.data);

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!token) {
      return
    }
    updateUser();
  }, []);
  return children;
}

export default UpdateUser
