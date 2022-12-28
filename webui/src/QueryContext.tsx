import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';

import SearchQuery from './models/searchQuery';

export interface QueryContextType {
    query: SearchQuery | undefined;
    setQuery: (newContext : SearchQuery | undefined) => void;
    setQueryVal : (key: keyof SearchQuery, newVal: any) => void;
    setCursor: (cursor: string | undefined) => void;
}

interface QueryContextProviderProps {
    children: ReactNode;
}

export const QueryContext = createContext<QueryContextType>({
    query: undefined,
    setQuery: () => {
        return;
    },
    setQueryVal : (key: keyof SearchQuery, newVal: any) => {},
    setCursor: (cursor: string | undefined) => {
        return;
    },
});

export function QueryContextProvider({children} : PropsWithChildren<QueryContextProviderProps>): JSX.Element {
    const [query, setQuery] = useState<SearchQuery | undefined>(undefined);

    const setQueryVal = (key: keyof SearchQuery, newVal: any) => {
        const newQuery = {...query}
        if (typeof newQuery[key] === typeof newVal) {
            newQuery[key] = newVal;
        }
        newQuery.cursor = undefined;
        setQuery(newQuery as SearchQuery);
    }

    const setQuerySafely = (newQuery : SearchQuery | undefined) => {
        if (!newQuery) {
            setQuery(query as SearchQuery);
        }

        const newContext = {...newQuery};
        newContext.cursor = undefined;
        setQuery(newContext as SearchQuery);
    }

    const setCursor = (cursor: string | undefined) => {
        const newQuery = {...query}
        newQuery.cursor = cursor;
        setQuery(newQuery as SearchQuery);
    }

    return <QueryContext.Provider value={{query, setQuery: setQuerySafely, setQueryVal, setCursor}}> 
        {children}
    </QueryContext.Provider>;
}