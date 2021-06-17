/* tslint:disable */
/* eslint-disable */
/**
 * Yext API
 * # Policies and Conventions  This section gives you the basic information you need to use our APIs.  ## API Availability  We currently offer three APIs: * **Knowledge API** * **Live API** * **Administrative API**  Each API is designed for a particular set of users.  To determine which APIs are available to users like you, see the \"Overview\" page in the Docs section of this site.  <a href=\"https://app.getpostman.com/run-collection/c42e6f39b0b10e56b1ca\"><img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\" /></a>  (Postman collection includes Knowledge API, Live API, and Administrative API calls.)  ## Authentication All requests must be authenticated using an app’s API key via the api_key query parameter. Additionally, the API key can also be passed in as a header parameter named api-key. Note that this is slightly different from the parameter name accepted as a query param (api_key)  <pre>GET https://api.yext.com/v2/accounts/[accountId]/locations?<b>api_key=API_KEY</b>&v=YYYYMMDD</pre>  The API key should be kept secret.  ## Versioning All requests must be versioned using the **`v`** parameter.  <pre>GET https://api.yext.com/v2/accounts/[accountId]/locations?api_key=API_KEY&<b>v=YYYYMMDD</b></pre>  The **`v`** parameter (a date in `YYYYMMDD` format) is designed to give you the freedom to adapt to Yext API changes on your own schedule. When you pass this parameter, any backward-incompatible changes we made to the API after the specified date will not affect the behavior of the request or the content of the response. You will still benefit from any bug fixes or backward-compatible changes we may have made after the date you\'ve specified.  **NOTE:** Yext has the ability to make changes that affect previous versions of the API, if necessary.  ## Serialization API v2 only accepts data in JSON format.  ## Content-Type Headers For all requests that include a request body, the `Content-Type` header must be included and set to `application/json`.  ## PUT Requests Generally, all `PUT` operations behave as true RESTful `PUT`s, in which entire objects are overwritten with the provided content.  However, certain endpoints used to work with large, frequently-changing object models may have different semantics to prevent the accidental removal of content (e.g., Locations: Update lets you omit fields you don’t wish to change).  ## Errors and Warnings There are three kinds of issues that can be reported for a given request:  * **`FATAL_ERROR`**     * An issue caused the entire request to be rejected. * **`NON_FATAL_ERROR`**     * An item is rejected, but other items present in the request are accepted (e.g., one invalid Product List item).     * A field is rejected, but the item otherwise is accepted (e.g., invalid website URL in a Location). * **`WARNING`**     * The request did not adhere to our best practices or recommendations, but the data was accepted anyway (e.g., data was sent that may cause some listings to become unavailable, a deprecated API was used, or we changed the format of a field\'s content to meet our requirements).  ## Dates and Times * We always use milliseconds since epoch (a.k.a. Unix time) for timestamps (e.g., review creation times, webhook update times). * We always use ISO 8601 without timezone for local date times (e.g., Event start time, Event end time). Event times are always interpreted in the local timezone of their associated locations. * Dates are transmitted as strings: `YYYY-MM-DD`.  ## Account ID In keeping with RESTful design principles, every URL in API v2 has an account ID prefix. This prefix helps to ensure that you have unique URLs for all resources.  In addition to specifying resources by explicit account ID, the following two macros are defined: * **`me`** - refers to the account that owns the API key sent with the request * **`all`** - refers to the account that owns the API key sent with the request, as well as all sub-accounts (recursively)  **IMPORTANT:** The **`me`** macro is supported in all API methods.  The **`all`** macro will only be supported in certain URLs. Currently, it can only be used in Analytics, Reviews, and some Listings endpoints.  ### Examples This URL refers to an analytics report for all locations in account 123. <pre>https://api.yext.com/v2/accounts/<b>123</b>/analytics/reports?api_key=456&v=20160822</pre>  This URL refers to an analytics report for all locations in the account that owns API key 456. <pre>https://api.yext.com/v2/accounts/<b>me</b>/analytics/reports?<b>api_key=456</b>&v=20160822</pre>  This URL refers to an analytics report for all locations in the account that owns API key 456, as well as all locations from any of its child accounts. <pre>https://api.yext.com/v2/accounts/<b>all</b>/analytics/reports?<b>api_key=456</b>&v=20160822</pre>  ## Actor Headers  To attribute changes to a particular user, all `PUT`, `POST`, and `DELETE` requests may be passed with the following headers.  **NOTE:** If you choose to provide actor headers, and we are unable to authenticate the request using the values you provide, the request will result in an error and fail.  * Attribute activity to customer user via username     * Header: `Yext-Username`     * Value: Customer user’s username * Attribute activity to customer user via Yext user ID     * Header: `Yext-User-Id`     * Value: Customer user’s Yext user ID  Changes will be logged as follows:  * App with no designated actor     * History Entry \"Updated By\" Value: `App [App ID] - ‘[App Name]’`     * Example: `App 432 - ‘Hello World App’` * App with customer user actor     * History Entry \"Updated By\" Value: `[user name] ([user email]) (App [App ID] - ‘[App Name]’)`     * Example: `Jordan Smith (jsmith@example.com) (App 432 - ‘Hello World App’)`  ## Response Format * **`meta`**     * Response metadata * **`meta.uuid`**     * Unique ID for this request / response * **`meta.errors[]`**     * List of errors and warnings * **`meta.errors[].code`**     * Code that uniquely identifies the error or warning * **`meta.errors[].type`**     * One of:         * `FATAL_ERROR`         * `NON_FATAL_ERROR`         * `WARNING`     * See \"Errors and Warnings\" above for details. * **`meta.errors[].message`**     * An explanation of the issue * **`response`**     * The main content (body) of the response  Example: <pre><code> {     \"meta\": {         \"uuid\": \"bb0c7e19-4dc3-4891-bfa5-8593b1f124ad\",         \"errors\": [             {                 \"code\": ...error code...,                 \"type\": ...error, fatal error, non fatal error, or warning...,                 \"message\": ...explanation of the issue...             }         ]     },     \"response\": {         ...results...     } } </code></pre>  ## Status Codes * `200 OK`    * Either there are no errors or warnings, or the only issues are of type `WARNING`. * `207 Multi-Status`     * There are errors of type `itemError` or `fieldError` (but none of type `requestError`). * `400 Bad Request`     * A parameter is invalid, or a required parameter is missing. This includes the case where no API key is provided and the case where a resource ID is specified incorrectly in a path.     * This status is if any of the response errors are of type `requestError`. * `401 Unauthorized`     * The API key provided is invalid. * `403 Forbidden`     * The requested information cannot be viewed by the acting user. * `404 Not Found`     * The endpoint does not exist. * `405 Method Not Allowed`     * The request is using a method that is not allowed (e.g., `POST` with a `GET`-only endpoint). * `409 Conflict`     * The request could not be completed in its current state.     * Use the information included in the response to modify the request and retry. * `429 Too Many Requests`     * You have exceeded your rate limit / quota. * `500 Internal Server Error`     * Yext’s servers are not operating as expected. The request is likely valid but should be resent later. * `504 Timeout`     * Yext’s servers took too long to handle this request, and it timed out.  ## Quotas and Rate Limits Default quotas and rate limits are as follows.  * **Knowledge API** *(includes Analytics, Listings, Knowledge Manager, Reviews, Social, and User endpoints)*: 5,000 requests per hour * **Analytics API**: 1,000 requests per 60-minute sliding window (in addition to the Knowledge API quota) * **Administrative API**: 1,000 requests per hour * **Live API**: 100,000 requests per hour  With the exception of the Analytics API quota, hourly quotas are calculated from the beginning of the hour (minute zero, `:00`), not on a rolling basis past 60 minutes.  **NOTE:** Webhook requests do not count towards an account’s quota.  For the most current and accurate rate-limit usage information for a particular request type, check the **`Rate-Limit-Remaining`** and **`Rate-Limit-Limit`** HTTP headers of your API responses.  If you are currently over your limit, our API will return a `429` error, and the response object returned by our API will be empty. We will also include a **`Rate-Limit-Reset`** header in the response, which indicates when you will have additional quota.  ## Client- vs. Yext-assigned IDs You can set the ID for the following objects when you create them. If you do not provide an ID, Yext will generate one for you.  * Account * User * Location * Bio List * Menu * Product List * Event List * Bio List Item * Menu Item * Product List Item * Event List Item  ## Logging With the exception of Live API requests, all API requests are logged. API logs can be found in your Developer Console and are stored for 30 days. 
 *
 * The version of the OpenAPI document: 2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export const BASE_PATH = "https://api.yext.com/v2".replace(/\/+$/, "");

const isBlob = (value: any) => typeof Blob !== 'undefined' && value instanceof Blob;

/**
 * This is the base class for all generated API classes.
 */
export class BaseAPI {

    private middleware: Middleware[];

    constructor(protected configuration = new Configuration()) {
        this.middleware = configuration.middleware;
    }

    withMiddleware<T extends BaseAPI>(this: T, ...middlewares: Middleware[]) {
        const next = this.clone<T>();
        next.middleware = next.middleware.concat(...middlewares);
        return next;
    }

    withPreMiddleware<T extends BaseAPI>(this: T, ...preMiddlewares: Array<Middleware['pre']>) {
        const middlewares = preMiddlewares.map((pre) => ({ pre }));
        return this.withMiddleware<T>(...middlewares);
    }

    withPostMiddleware<T extends BaseAPI>(this: T, ...postMiddlewares: Array<Middleware['post']>) {
        const middlewares = postMiddlewares.map((post) => ({ post }));
        return this.withMiddleware<T>(...middlewares);
    }

    protected async request(context: RequestOpts): Promise<Response> {
        const { url, init } = this.createFetchParams(context);
        const response = await this.fetchApi(url, init);
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        throw response;
    }

    private createFetchParams(context: RequestOpts) {
        let url = this.configuration.basePath + context.path;
        if (context.query !== undefined && Object.keys(context.query).length !== 0) {
            // only add the querystring to the URL if there are query parameters.
            // this is done to avoid urls ending with a "?" character which buggy webservers
            // do not handle correctly sometimes.
            url += '?' + this.configuration.queryParamsStringify(context.query);
        }
        const body = ((typeof FormData !== "undefined" && context.body instanceof FormData) || context.body instanceof URLSearchParams || isBlob(context.body))
        ? context.body
        : JSON.stringify(context.body);

        const headers = Object.assign({}, this.configuration.headers, context.headers);
        const init = {
            method: context.method,
            headers: headers,
            body,
            credentials: this.configuration.credentials
        };
        return { url, init };
    }

    private fetchApi = async (url: string, init: RequestInit) => {
        let fetchParams = { url, init };
        for (const middleware of this.middleware) {
            if (middleware.pre) {
                fetchParams = await middleware.pre({
                    fetch: this.fetchApi,
                    ...fetchParams,
                }) || fetchParams;
            }
        }
        let response = await this.configuration.fetchApi(fetchParams.url, fetchParams.init);
        for (const middleware of this.middleware) {
            if (middleware.post) {
                response = await middleware.post({
                    fetch: this.fetchApi,
                    url,
                    init,
                    response: response.clone(),
                }) || response;
            }
        }
        return response;
    }

    /**
     * Create a shallow clone of `this` by constructing a new instance
     * and then shallow cloning data members.
     */
    private clone<T extends BaseAPI>(this: T): T {
        const constructor = this.constructor as any;
        const next = new constructor(this.configuration);
        next.middleware = this.middleware.slice();
        return next;
    }
};

export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

export type FetchAPI = WindowOrWorkerGlobalScope['fetch'];

export interface ConfigurationParameters {
    basePath?: string; // override base path
    fetchApi?: FetchAPI; // override for fetch implementation
    middleware?: Middleware[]; // middleware to apply before/after fetch requests
    queryParamsStringify?: (params: HTTPQuery) => string; // stringify function for query strings
    username?: string; // parameter for basic security
    password?: string; // parameter for basic security
    apiKey?: string | ((name: string) => string); // parameter for apiKey security
    accessToken?: string | ((name?: string, scopes?: string[]) => string); // parameter for oauth2 security
    headers?: HTTPHeaders; //header params we want to use on every request
    credentials?: RequestCredentials; //value for the credentials param we want to use on each request
}

export class Configuration {
    constructor(private configuration: ConfigurationParameters = {}) {}

    get basePath(): string {
        return this.configuration.basePath != null ? this.configuration.basePath : BASE_PATH;
    }

    get fetchApi(): FetchAPI {
        return this.configuration.fetchApi || window.fetch.bind(window);
    }

    get middleware(): Middleware[] {
        return this.configuration.middleware || [];
    }

    get queryParamsStringify(): (params: HTTPQuery) => string {
        return this.configuration.queryParamsStringify || querystring;
    }

    get username(): string | undefined {
        return this.configuration.username;
    }

    get password(): string | undefined {
        return this.configuration.password;
    }

    get apiKey(): ((name: string) => string) | undefined {
        const apiKey = this.configuration.apiKey;
        if (apiKey) {
            return typeof apiKey === 'function' ? apiKey : () => apiKey;
        }
        return undefined;
    }

    get accessToken(): ((name: string, scopes?: string[]) => string) | undefined {
        const accessToken = this.configuration.accessToken;
        if (accessToken) {
            return typeof accessToken === 'function' ? accessToken : () => accessToken;
        }
        return undefined;
    }

    get headers(): HTTPHeaders | undefined {
        return this.configuration.headers;
    }

    get credentials(): RequestCredentials | undefined {
        return this.configuration.credentials;
    }
}

export type Json = any;
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export type HTTPHeaders = { [key: string]: string };
export type HTTPQuery = { [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | HTTPQuery };
export type HTTPBody = Json | FormData | URLSearchParams;
export type ModelPropertyNaming = 'camelCase' | 'snake_case' | 'PascalCase' | 'original';

export interface FetchParams {
    url: string;
    init: RequestInit;
}

export interface RequestOpts {
    path: string;
    method: HTTPMethod;
    headers: HTTPHeaders;
    query?: HTTPQuery;
    body?: HTTPBody;
}

export function exists(json: any, key: string) {
    const value = json[key];
    return value !== null && value !== undefined;
}

export function querystring(params: HTTPQuery, prefix: string = ''): string {
    return Object.keys(params)
        .map((key) => {
            const fullKey = prefix + (prefix.length ? `[${key}]` : key);
            const value = params[key];
            if (value instanceof Array) {
                const multiValue = value.map(singleValue => encodeURIComponent(String(singleValue)))
                    .join(`&${encodeURIComponent(fullKey)}=`);
                return `${encodeURIComponent(fullKey)}=${multiValue}`;
            }
            if (value instanceof Date) {
                return `${encodeURIComponent(fullKey)}=${encodeURIComponent(value.toISOString())}`;
            }
            if (value instanceof Object) {
                return querystring(value as HTTPQuery, fullKey);
            }
            return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
        })
        .filter(part => part.length > 0)
        .join('&');
}

export function mapValues(data: any, fn: (item: any) => any) {
  return Object.keys(data).reduce(
    (acc, key) => ({ ...acc, [key]: fn(data[key]) }),
    {}
  );
}

export function canConsumeForm(consumes: Consume[]): boolean {
    for (const consume of consumes) {
        if ('multipart/form-data' === consume.contentType) {
            return true;
        }
    }
    return false;
}

export interface Consume {
    contentType: string
}

export interface RequestContext {
    fetch: FetchAPI;
    url: string;
    init: RequestInit;
}

export interface ResponseContext {
    fetch: FetchAPI;
    url: string;
    init: RequestInit;
    response: Response;
}

export interface Middleware {
    pre?(context: RequestContext): Promise<FetchParams | void>;
    post?(context: ResponseContext): Promise<Response | void>;
}

export interface ApiResponse<T> {
    raw: Response;
    value(): Promise<T>;
}

export interface ResponseTransformer<T> {
    (json: any): T;
}

export class JSONApiResponse<T> {
    constructor(public raw: Response, private transformer: ResponseTransformer<T> = (jsonValue: any) => jsonValue) {}

    async value(): Promise<T> {
        return this.transformer(await this.raw.json());
    }
}

export class VoidApiResponse {
    constructor(public raw: Response) {}

    async value(): Promise<void> {
        return undefined;
    }
}

export class BlobApiResponse {
    constructor(public raw: Response) {}

    async value(): Promise<Blob> {
        return await this.raw.blob();
    };
}

export class TextApiResponse {
    constructor(public raw: Response) {}

    async value(): Promise<string> {
        return await this.raw.text();
    };
}
