import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';

import SearchQuery from './models/searchQuery';

export interface QueryContextType {
    query: SearchQuery | undefined;
    setQuery: (newContext : SearchQuery | undefined) => void;
}

interface QueryContextProviderProps {
    children: ReactNode;
}

export const QueryContext = createContext<QueryContextType>({
    query: undefined,
    setQuery: () => {
        return;
    }
});

export function QueryContextProvider({children} : PropsWithChildren<QueryContextProviderProps>): JSX.Element {
    const [query, setQuery] = useState<SearchQuery | undefined>(undefined);

    return <QueryContext.Provider value={{query, setQuery}}> 
        {children}
    </QueryContext.Provider>;
}