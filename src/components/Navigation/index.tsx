import { useQuery } from 'urql';
import gql from 'graphql-tag';
import { useEffect } from 'react';

const NAVIGATION_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const CATEGORIES_QUERY = gql`
    query categories {
        title
    }
`;

export const Navigation = () => {
    const [result, executeQuery] = useQuery({
        query: CATEGORIES_QUERY,
    });

    useEffect(() => {
        executeQuery();
        console.log(result);
    });

    return (
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
                <a x-comp="HeaderLink" className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold text-light-gray-500 cursor-pointer"></a>
                <a x-comp="HeaderLink" className="text-d-p-sm text-[16px] mx-2 sm:mx-4 md:text-lg last:mr-0 opacity-80 hover:opacity-100 font-bold hidden sm:block text-light-gray-500 pr-1 cursor-pointer">About</a>
                <a x-comp="PrimaryButtonLink" href="/contact" className="-mt-[9px] md:-mt-[8px] inline-flex items-center cursor-pointer justify-center text-[14px] md:text-[16px] xl:text-d-p-lg h-11 box-border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent font-semibold bg-custom-purple-500 bg-opacity-20 text-custom-purple-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1">Contact</a>
            </nav>
        </header>
    )
}