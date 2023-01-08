### The Services Module

The files in this directory deal with API interfacing.

* `request.ts` provides a factory function model for executing requests to the listings API using a reused axios instance
* `citiesApi.ts` defines functions to retrieve supported cities data from the listings API
* `cursor.ts` retrieves a cursor string from an API response
* `parse.ts` parses an API response into a typescript-readable model
* `queryParamUtils.ts` builds query parameters for requests
* `scrapeQueriesApi.ts` defines functions to retrieve and create scraping queries via the API
* `useRequest.ts` provides a react hook that allows components to interact with the other functions in this module