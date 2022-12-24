import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';

import SearchQuery from './interfaces/searchQuery';

interface QueryContextType {
    query: SearchQuery | undefined;
    setQuery: (newContext : SearchQuery | undefined) => void;
}

interface QueryContextProps {
    children: ReactNode;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

function QueryContextProvider({children} : PropsWithChildren<QueryContextProps>): JSX.Element {
    const [query, setQuery] = useState<SearchQuery | undefined>(undefined);
    return <QueryContext.Provider value={{query, setQuery}}> 
        {children}
    </QueryContext.Provider>;
}

export default QueryContextProvider;