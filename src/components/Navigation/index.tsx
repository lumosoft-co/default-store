import { useQuery } from 'urql';
import gql from 'graphql-tag';
import { useEffect, useMemo } from 'react';
import { getContext, CATEGORIES_TITLE_QUERY } from '../../graphql';
import { createGzip } from 'zlib';

interface ICategoryTitle {
    title: string;
    __typename: string;
}

interface ICategoryResponse {
    categories: ICategoryTitle[];
}

export const Navigation = () => {
    const [result, executeQuery] = useQuery({
        query: CATEGORIES_TITLE_QUERY,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    const response = data as ICategoryResponse;
    return (
        <div className="relative mx-auto max-w-[90rem]">
            <header className="pr-5 sm:px-6 lg:px-12 py-3 md:py-9 flex justify-between items-center text-white">
                <a x-comp="NavLink" aria-label="Remix" aria-current="page" className="active z-50" href="/">
                    <img
                        className="object-contain fadeIn invisible md:visible h-11 w-48 z-50"
                        src="https://user-images.githubusercontent.com/32375483/204863021-6d215a52-ad23-4f91-b702-7b9173dc251d.png"
                        alt="logo"
                    />
                    <img
                        className="object-contain fadeIn visible md:invisible h-[90px] w-[90px] pl-0 z-50 -mt-[55px] md:mt-0 md:absolute"
                        src="https://user-images.githubusercontent.com/32375483/195975577-eff81eaf-a351-49d5-b47b-4e8851b2907e.png"
                        alt="logo"
                    />
                </a>
                <nav className="flex z-50 fadeIn" aria-label="Main">
                    <a x-comp="HeaderLink" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">Home</a>
                    {response.categories.map((category: ICategoryTitle) => {
                        return (
                            <a x-comp="HeaderLink" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 hover:cursor-pointer">{category.title}</a>
                        )
                    })}
                </nav>
            </header>
        </div>
    )
}