import SearchQuery from "../models/searchQuery";

const buildQueryParams = (query: SearchQuery) => {
    let params: {[key: string]: any} = {};
    if (query.sortBy !== undefined) {
        switch (query.sortBy) {
            case 'distance':
                console.log(query.location)
                console.log(!query.location)
                if (!query.location || !query.location.lat || !query.location.long || !query.location.radius) {
                    break;
                }
                params.sortBy = 'distance';
                params.distanceFromLat = query.location.lat;
                params.distanceFromLong = query.location.long;
                params.maxDistance = query.location.radius;
                console.log(params);
                break;
            case 'priceHighToLow':
                params.sortBy = 'price';
                params.order = -1
                break;
            case 'priceLowToHigh':
                params.sortBy = 'price';
                params.order = 1
                break;
            default:
                params.sortBy = 'pageRank';
                params.order = 1
                break;
        }
        if (query.cursor) {
            params.cursor = query.cursor;
        }
        return params;
    }
};

export default buildQueryParams;
