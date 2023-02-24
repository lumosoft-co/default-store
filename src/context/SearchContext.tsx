import React from "react";
import { IFeatureItem } from "../components/ItemsFeature/components/Card/types";

export interface ISearchContext {
    items: IFeatureItem[];
    openSearch: boolean;
    openSearchModal: (set: boolean) => void;
    updateItems: (item: IFeatureItem) => void;
    searchItems: (query: string) => IFeatureItem[];
}

export const SearchContext = React.createContext<ISearchContext | null>(null)

const SearchProvider = ({ children }: any) => {
    const [items, setItems] = React.useState<IFeatureItem[]>([]);
    const [openSearch, setOpenSearch] = React.useState<boolean>(false);

    const updateItems = (item: IFeatureItem) => {
        setItems([...items, item]);
    }

    const searchItems = (query: string): IFeatureItem[] => {
        console.log(items)
        if (query === "") {
            return [];
        }
        return items.filter((item: IFeatureItem) => item.handle.includes(query));
    }

    const openSearchModal = (set: boolean) => {
        setOpenSearch(set);
    }

    return (
        <SearchContext.Provider value={{ items, openSearch, updateItems, searchItems, openSearchModal}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;