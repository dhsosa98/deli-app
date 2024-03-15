
import {useCookies} from 'react-cookie';
import { User } from '../models/User';


const useUser = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const storeUserWithCookie = (user: User) => {
        setCookie('user', user, {path: '/'});
    };

    const removeUserCookie = () => {
        removeCookie('user');
    };

    const user = cookies.user as User;
    
    return { user, storeUserWithCookie, removeUserCookie };
}

export default useUser;