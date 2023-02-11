import { useQuery } from 'urql';
import { useEffect, useMemo } from 'react';
import { getContext, NAVIGATION_QUERY } from '../../graphql';
import { INavigation, INavigationCategory } from './types';
import { DEFAULT_ICON, DEFAULT_LOGO } from '../../constants';

export const Navigation = () => {
    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: NAVIGATION_QUERY,
        context: useMemo(() => {
            return getContext();
        }, []),
    });
    const response = data as INavigation;
    return (
        <div className="relative mx-auto max-w-[90rem]">
            <header className="pr-5 sm:px-6 lg:px-12 py-3 md:py-9 flex justify-between items-center text-white">
                <a x-comp="NavLink" aria-label="Remix" aria-current="page" className="active z-50" href="/">
                    <img
                        className="object-contain fadeIn invisible md:visible h-11 w-48 z-50"
                        src={response.branding.icon ?? DEFAULT_LOGO}
                        alt="logo"
                    />
                    <img
                        className="object-contain fadeIn visible md:invisible h-[90px] w-[90px] pl-0 z-50 -mt-[55px] md:mt-0 md:absolute"
                        src={response.branding.icon ?? DEFAULT_ICON}
                        alt="icon"
                    />
                </a>
                <nav className="flex z-50 fadeIn" aria-label="Main">
                    <a x-comp="HeaderLink" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">Home</a>
                    {response.categories.sort((a, b) => a.order > b.order ? 1 : -1).map((category: INavigationCategory) => {
                        return (
                            <a x-comp="HeaderLink" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">{category.title}</a>
                        )
                    })}
                </nav>
            </header>
        </div>
    )
}