import { useQuery } from 'urql';
import { useContext, useEffect, useMemo, useState } from 'react';
import { getContext, NAVIGATION_QUERY } from '../../graphql';
import { INavigation, INavigationCategory } from './types';
import { DEFAULT_ICON, DEFAULT_LOGO } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { CartIcon } from '../CartIcon';
import { IUserContext, UserContext } from '../../context/UserContext';

interface INavigationProps {
    showCart: () => void;
    showLogin: () => void;
}

export const Navigation = (props: INavigationProps) => {
    const { showCart, showLogin } = props;
    const { user, updateUser } = useContext(UserContext) as IUserContext;

    const navigate = useNavigate();
    const [response, setResponse] = useState<INavigation>();

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: NAVIGATION_QUERY,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    const handleLogout = () => {
        updateUser(null);
    }

    useEffect(() => {
        if (data === undefined || error !== undefined || fetching) 
            return;
        
        setResponse(data as INavigation);
    }, [data]);

    return (
        <div>
            <header className="pr-5 py-3 md:py-9 flex justify-between items-center text-white">
                <a x-comp="NavLink" aria-label="Remix" aria-current="page" className="active z-50" href="/">
                    <img
                        className="object-contain fadeIn invisible md:visible h-11 w-48 z-50"
                        src={fetching ? "" : (response?.shop?.branding?.icon ?? DEFAULT_LOGO)}
                        alt="logo"
                    />
                    <img
                        className="object-contain fadeIn visible md:invisible h-[90px] w-[90px] pl-0 z-50 -mt-[55px] md:mt-0 md:absolute"
                        src={fetching ? "" : (response?.shop?.branding?.icon ?? DEFAULT_ICON)}
                        alt="icon"
                    />
                </a>
                <nav className="flex z-50 fadeIn" aria-label="Main">
                    <a x-comp="HeaderLink" href="/" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">Home</a>
                    {fetching ? "" : response?.shop?.categories?.sort((a, b) => a.order > b.order ? 1 : -1).map((category: INavigationCategory) => {
                        return (
                            <a x-comp="HeaderLink" href={category.handle} className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">{category.title}</a>
                        )
                    })}
                </nav>
                <div className="float-right flex-row">
                    <a onClick={() => showCart()}>
                        <CartIcon/>
                    </a>
                    {
                        user === null ?
                        <a x-comp="PrimaryButtonLink" onClick={() => showLogin()} className="-mt-[9px] md:-mt-[8px] inline-flex items-center cursor-pointer justify-center text-[14px] md:text-[16px] xl:text-d-p-lg h-11 box-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent font-semibold bg-custom-purple-500 bg-opacity-20 text-custom-purple-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1">Login</a>
                        : <a x-comp="PrimaryButtonLink" onClick={() => handleLogout()} className="-mt-[9px] md:-mt-[8px] inline-flex items-center cursor-pointer justify-center text-[14px] md:text-[16px] xl:text-d-p-lg h-11 box-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent font-semibold bg-custom-purple-500 bg-opacity-20 text-custom-purple-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1">Logout</a>
                    }
                </div>
            </header>
        </div>
    )
}