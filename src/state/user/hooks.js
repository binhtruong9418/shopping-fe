import {useDispatch, useSelector} from "react-redux";
import {setUser, clearUser} from "@/state/user/reducer";

export const useUser = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onSetUser = (user) => {
        dispatch(setUser(user))
    }

    const onClearUser = () => {
        dispatch(clearUser());
    }
    return {user, onSetUser, onClearUser}
}

