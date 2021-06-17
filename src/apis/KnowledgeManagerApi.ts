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


import * as runtime from '../runtime';
import {
    Asset,
    AssetFromJSON,
    AssetToJSON,
    AssetResponse,
    AssetResponseFromJSON,
    AssetResponseToJSON,
    AssetsResponse,
    AssetsResponseFromJSON,
    AssetsResponseToJSON,
    Bio,
    BioFromJSON,
    BioToJSON,
    BioListResponse,
    BioListResponseFromJSON,
    BioListResponseToJSON,
    BioListsResponse,
    BioListsResponseFromJSON,
    BioListsResponseToJSON,
    BusinessCategoriesResponse,
    BusinessCategoriesResponseFromJSON,
    BusinessCategoriesResponseToJSON,
    CustomField,
    CustomFieldFromJSON,
    CustomFieldToJSON,
    CustomFieldResponse,
    CustomFieldResponseFromJSON,
    CustomFieldResponseToJSON,
    CustomFieldUpdate,
    CustomFieldUpdateFromJSON,
    CustomFieldUpdateToJSON,
    CustomFieldsResponse,
    CustomFieldsResponseFromJSON,
    CustomFieldsResponseToJSON,
    EmptyResponse,
    EmptyResponseFromJSON,
    EmptyResponseToJSON,
    EntityWrite,
    EntityWriteFromJSON,
    EntityWriteToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    EventLegacy,
    EventLegacyFromJSON,
    EventLegacyToJSON,
    EventListResponse,
    EventListResponseFromJSON,
    EventListResponseToJSON,
    EventListsResponse,
    EventListsResponseFromJSON,
    EventListsResponseToJSON,
    FoldersResponse,
    FoldersResponseFromJSON,
    FoldersResponseToJSON,
    GoogleFieldsResponse,
    GoogleFieldsResponseFromJSON,
    GoogleFieldsResponseToJSON,
    IdResponse,
    IdResponseFromJSON,
    IdResponseToJSON,
    LanguageProfileResponse,
    LanguageProfileResponseFromJSON,
    LanguageProfileResponseToJSON,
    LanguageProfilesResponse,
    LanguageProfilesResponseFromJSON,
    LanguageProfilesResponseToJSON,
    LocationLegacy,
    LocationLegacyFromJSON,
    LocationLegacyToJSON,
    LocationResponse,
    LocationResponseFromJSON,
    LocationResponseToJSON,
    LocationsResponse,
    LocationsResponseFromJSON,
    LocationsResponseToJSON,
    LocationsSearchResponse,
    LocationsSearchResponseFromJSON,
    LocationsSearchResponseToJSON,
    Menu,
    MenuFromJSON,
    MenuToJSON,
    MenuListResponse,
    MenuListResponseFromJSON,
    MenuListResponseToJSON,
    MenuListsResponse,
    MenuListsResponseFromJSON,
    MenuListsResponseToJSON,
    Product,
    ProductFromJSON,
    ProductToJSON,
    ProductListResponse,
    ProductListResponseFromJSON,
    ProductListResponseToJSON,
    ProductListsResponse,
    ProductListsResponseFromJSON,
    ProductListsResponseToJSON,
} from '../models';

export interface CreateAssetRequest {
    accountId: string;
    v: string;
    format: string;
    assetRequest: Asset;
}

export interface CreateBioRequest {
    accountId: string;
    v: string;
    body: Bio;
}

export interface CreateCustomFieldRequest {
    v: string;
    accountId: string;
    body: CustomField;
}

export interface CreateEventRequest {
    accountId: string;
    v: string;
    body: EventLegacy;
}

export interface CreateLocationRequest {
    accountId: string;
    v: string;
    locationRequest: LocationLegacy;
}

export interface CreateMenuRequest {
    accountId: string;
    v: string;
    body: Menu;
}

export interface CreateProductRequest {
    accountId: string;
    v: string;
    body: Product;
}

export interface DeleteAssetRequest {
    accountId: string;
    assetId: string;
    v: string;
}

export interface DeleteBioListRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface DeleteCustomFieldRequest {
    v: string;
    accountId: string;
    customFieldId: string;
}

export interface DeleteEventListRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface DeleteLanguageProfileRequest {
    accountId: string;
    locationId: string;
    languageCode: string;
    v: string;
}

export interface DeleteMenuListRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface DeleteProductListRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface GetAssetRequest {
    accountId: string;
    assetId: string;
    v: string;
    format: string;
}

export interface GetBioRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface GetBiosRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
}

export interface GetBusinessCategoriesRequest {
    v: string;
    language?: string;
    country?: string;
    entityType?: GetBusinessCategoriesEntityTypeEnum;
}

export interface GetCustomFieldRequest {
    v: string;
    accountId: string;
    customFieldId: string;
}

export interface GetCustomFieldsRequest {
    v: string;
    accountId: string;
    offset?: number;
    limit?: number;
    pageToken?: string;
}

export interface GetEventRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface GetEventsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
}

export interface GetGoogleKeywordsRequest {
    v: string;
    language?: string;
    clientCategoryId?: string;
    countryCode?: string;
}

export interface GetLanguageProfileRequest {
    accountId: string;
    locationId: string;
    languageCode: string;
    v: string;
    resolvePlaceholders?: boolean;
}

export interface GetLanguageProfilesRequest {
    accountId: string;
    locationId: string;
    v: string;
    resolvePlaceholders?: boolean;
}

export interface GetLocationRequest {
    accountId: string;
    locationId: string;
    v: string;
    resolvePlaceholders?: boolean;
}

export interface GetLocationFoldersRequest {
    accountId: string;
    v: string;
    offset?: number;
    limit?: number;
}

export interface GetLocationsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    resolvePlaceholders?: boolean;
    pageToken?: string;
}

export interface GetMenuRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface GetMenusRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
}

export interface GetProductRequest {
    accountId: string;
    listId: string;
    v: string;
}

export interface GetProductsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
}

export interface KnowledgeApiServerCreateEntityRequest {
    accountId: string;
    entityType: string;
    v: string;
    body: EntityWrite;
    format?: string;
    stripUnsupportedFormats?: boolean;
    templateFields?: string;
    templateId?: string;
}

export interface KnowledgeApiServerDeleteEntityRequest {
    accountId: string;
    entityId: string;
    v: string;
}

export interface KnowledgeApiServerDeleteLanguageProfileRequest {
    accountId: string;
    entityId: string;
    languageCode: string;
    v: string;
}

export interface KnowledgeApiServerGetEntityRequest {
    accountId: string;
    entityId: string;
    v: string;
    fields?: string;
    format?: string;
    resolvePlaceholders?: boolean;
}

export interface KnowledgeApiServerGetLanguageProfileRequest {
    accountId: string;
    entityId: string;
    languageCode: string;
    v: string;
    fields?: string;
    format?: string;
    rendered?: boolean;
}

export interface KnowledgeApiServerListAllLanguageProfilesRequest {
    accountId: string;
    v: string;
    entityTypes?: string;
    fields?: string;
    filter?: string;
    format?: string;
    languageCodes?: string;
    limit?: number;
    offset?: number;
    pageToken?: string;
    rendered?: string;
    sortBy?: string;
}

export interface KnowledgeApiServerListEntitiesRequest {
    accountId: string;
    v: string;
    entityTypes?: string;
    fields?: string;
    filter?: string;
    format?: string;
    languages?: string;
    limit?: number;
    offset?: number;
    pageToken?: string;
    resolvePlaceholders?: boolean;
    sortBy?: string;
}

export interface KnowledgeApiServerListLanguageProfilesRequest {
    accountId: string;
    entityId: string;
    v: string;
    entityTypes?: string;
    fields?: string;
    format?: string;
    languageCodes?: string;
    rendered?: string;
}

export interface KnowledgeApiServerUpdateEntityRequest {
    accountId: string;
    entityId: string;
    v: string;
    body: EntityWrite;
    format?: string;
    stripUnsupportedFormats?: boolean;
    templateFields?: string;
    templateId?: string;
}

export interface KnowledgeApiServerUpsertLanguageProfileRequest {
    accountId: string;
    entityId: string;
    languageCode: string;
    v: string;
    body: EntityWrite;
}

export interface ListAssetsRequest {
    accountId: string;
    v: string;
    format: string;
    offset?: number;
    limit?: number;
    pageToken?: string;
}

export interface SearchLocationsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    filters?: string;
}

export interface UpdateAssetRequest {
    accountId: string;
    assetId: string;
    v: string;
    format: string;
    assetRequest: Asset;
}

export interface UpdateBioRequest {
    accountId: string;
    listId: string;
    v: string;
    body: Bio;
}

export interface UpdateCustomFieldRequest {
    v: string;
    accountId: string;
    customFieldId: string;
    body: CustomFieldUpdate;
}

export interface UpdateEventRequest {
    accountId: string;
    listId: string;
    v: string;
    body: EventLegacy;
}

export interface UpdateLocationRequest {
    accountId: string;
    locationId: string;
    v: string;
    locationRequest: LocationLegacy;
}

export interface UpdateMenuRequest {
    accountId: string;
    listId: string;
    v: string;
    body: Menu;
}

export interface UpdateProductRequest {
    accountId: string;
    listId: string;
    v: string;
    body: Product;
}

export interface UpsertLanguageProfileRequest {
    accountId: string;
    locationId: string;
    languageCode: string;
    v: string;
    body: LocationLegacy;
    primary?: boolean;
}

/**
 * 
 */
export class KnowledgeManagerApi extends runtime.BaseAPI {

    /**
     * Creates a new asset in an account.  **NOTE:** * If the **`v`** parameter is on or before `20190624`: only the first folder the Asset is available for will be returned in the legacy **`folderId`** field. * If the **`v`** parameter is after `20190624`: the complete list of folders the Asset is available to will be returned in the new **`folderIds`** field. **`folderId`** will not be returned. 
     * Assets: Create
     */
    async createAssetRaw(requestParameters: CreateAssetRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createAsset.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createAsset.');
        }

        if (requestParameters.format === null || requestParameters.format === undefined) {
            throw new runtime.RequiredError('format','Required parameter requestParameters.format was null or undefined when calling createAsset.');
        }

        if (requestParameters.assetRequest === null || requestParameters.assetRequest === undefined) {
            throw new runtime.RequiredError('assetRequest','Required parameter requestParameters.assetRequest was null or undefined when calling createAsset.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/assets`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AssetToJSON(requestParameters.assetRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new asset in an account.  **NOTE:** * If the **`v`** parameter is on or before `20190624`: only the first folder the Asset is available for will be returned in the legacy **`folderId`** field. * If the **`v`** parameter is after `20190624`: the complete list of folders the Asset is available to will be returned in the new **`folderIds`** field. **`folderId`** will not be returned. 
     * Assets: Create
     */
    async createAsset(requestParameters: CreateAssetRequest): Promise<IdResponse> {
        const response = await this.createAssetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create new Bio List.
     * Bios: Create
     */
    async createBioRaw(requestParameters: CreateBioRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createBio.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createBio.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createBio.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/bios`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BioToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create new Bio List.
     * Bios: Create
     */
    async createBio(requestParameters: CreateBioRequest): Promise<IdResponse> {
        const response = await this.createBioRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new Custom Field in an Account. 
     * Custom Fields: Create
     */
    async createCustomFieldRaw(requestParameters: CreateCustomFieldRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createCustomField.');
        }

        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createCustomField.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createCustomField.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/customfields`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CustomFieldToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new Custom Field in an Account. 
     * Custom Fields: Create
     */
    async createCustomField(requestParameters: CreateCustomFieldRequest): Promise<IdResponse> {
        const response = await this.createCustomFieldRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new Event List.
     * Events (Legacy): Create
     */
    async createEventRaw(requestParameters: CreateEventRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createEvent.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createEvent.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createEvent.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/events`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EventLegacyToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create a new Event List.
     * Events (Legacy): Create
     */
    async createEvent(requestParameters: CreateEventRequest): Promise<IdResponse> {
        const response = await this.createEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new Location.   ## Required fields * **`locationName`** * **`address`** * **`city`** * **`state`** * **`zip`**   ## Optional fields that trigger warnings Submitting invalid values for certain optional fields will not trigger an error response. Instead, the success response will contain warning messages explaining why the invalid optional values were not stored in the system. The fields that generate warning messages are: <br><br> * **`logo`** * **`photos`** * **`twitterHandle`** * **`facebookPageUrl`** * **`languages`** 
     * Locations (Legacy): Create
     */
    async createLocationRaw(requestParameters: CreateLocationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createLocation.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createLocation.');
        }

        if (requestParameters.locationRequest === null || requestParameters.locationRequest === undefined) {
            throw new runtime.RequiredError('locationRequest','Required parameter requestParameters.locationRequest was null or undefined when calling createLocation.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LocationLegacyToJSON(requestParameters.locationRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create a new Location.   ## Required fields * **`locationName`** * **`address`** * **`city`** * **`state`** * **`zip`**   ## Optional fields that trigger warnings Submitting invalid values for certain optional fields will not trigger an error response. Instead, the success response will contain warning messages explaining why the invalid optional values were not stored in the system. The fields that generate warning messages are: <br><br> * **`logo`** * **`photos`** * **`twitterHandle`** * **`facebookPageUrl`** * **`languages`** 
     * Locations (Legacy): Create
     */
    async createLocation(requestParameters: CreateLocationRequest): Promise<IdResponse> {
        const response = await this.createLocationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Menus: Create
     */
    async createMenuRaw(requestParameters: CreateMenuRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createMenu.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createMenu.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createMenu.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/menus`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MenuToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Menus: Create
     */
    async createMenu(requestParameters: CreateMenuRequest): Promise<IdResponse> {
        const response = await this.createMenuRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new Product List.
     * Products: Create
     */
    async createProductRaw(requestParameters: CreateProductRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createProduct.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createProduct.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling createProduct.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/products`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProductToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create a new Product List.
     * Products: Create
     */
    async createProduct(requestParameters: CreateProductRequest): Promise<IdResponse> {
        const response = await this.createProductRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete a specific asset.
     * Assets: Delete
     */
    async deleteAssetRaw(requestParameters: DeleteAssetRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteAsset.');
        }

        if (requestParameters.assetId === null || requestParameters.assetId === undefined) {
            throw new runtime.RequiredError('assetId','Required parameter requestParameters.assetId was null or undefined when calling deleteAsset.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteAsset.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/assets/{assetId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"assetId"}}`, encodeURIComponent(String(requestParameters.assetId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Delete a specific asset.
     * Assets: Delete
     */
    async deleteAsset(requestParameters: DeleteAssetRequest): Promise<EmptyResponse> {
        const response = await this.deleteAssetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete an existing Bios List.
     * Bios: Delete
     */
    async deleteBioListRaw(requestParameters: DeleteBioListRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteBioList.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling deleteBioList.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteBioList.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/bios/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Delete an existing Bios List.
     * Bios: Delete
     */
    async deleteBioList(requestParameters: DeleteBioListRequest): Promise<EmptyResponse> {
        const response = await this.deleteBioListRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes a Custom Field in an Account.  The Custom Field will be removed from all locations, and all content entered in the Custom Field will be deleted permanently. 
     * Custom Fields: Delete
     */
    async deleteCustomFieldRaw(requestParameters: DeleteCustomFieldRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteCustomField.');
        }

        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteCustomField.');
        }

        if (requestParameters.customFieldId === null || requestParameters.customFieldId === undefined) {
            throw new runtime.RequiredError('customFieldId','Required parameter requestParameters.customFieldId was null or undefined when calling deleteCustomField.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/customfields/{customFieldId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"customFieldId"}}`, encodeURIComponent(String(requestParameters.customFieldId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes a Custom Field in an Account.  The Custom Field will be removed from all locations, and all content entered in the Custom Field will be deleted permanently. 
     * Custom Fields: Delete
     */
    async deleteCustomField(requestParameters: DeleteCustomFieldRequest): Promise<EmptyResponse> {
        const response = await this.deleteCustomFieldRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete an existing Event List.
     * Events (Legacy): Delete
     */
    async deleteEventListRaw(requestParameters: DeleteEventListRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteEventList.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling deleteEventList.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteEventList.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/events/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Delete an existing Event List.
     * Events (Legacy): Delete
     */
    async deleteEventList(requestParameters: DeleteEventListRequest): Promise<EmptyResponse> {
        const response = await this.deleteEventListRaw(requestParameters);
        return await response.value();
    }

    /**
     * Remove a Language Profile from a location.
     * Language Profiles (Legacy): Delete
     */
    async deleteLanguageProfileRaw(requestParameters: DeleteLanguageProfileRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteLanguageProfile.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling deleteLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling deleteLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}/profiles/{language_code}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))).replace(`{${"language_code"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Remove a Language Profile from a location.
     * Language Profiles (Legacy): Delete
     */
    async deleteLanguageProfile(requestParameters: DeleteLanguageProfileRequest): Promise<EmptyResponse> {
        const response = await this.deleteLanguageProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete an existing Menu.
     * Menus: Delete
     */
    async deleteMenuListRaw(requestParameters: DeleteMenuListRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteMenuList.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling deleteMenuList.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteMenuList.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/menus/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Delete an existing Menu.
     * Menus: Delete
     */
    async deleteMenuList(requestParameters: DeleteMenuListRequest): Promise<EmptyResponse> {
        const response = await this.deleteMenuListRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete an existing Products List.
     * Products: Delete
     */
    async deleteProductListRaw(requestParameters: DeleteProductListRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteProductList.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling deleteProductList.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteProductList.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/products/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Delete an existing Products List.
     * Products: Delete
     */
    async deleteProductList(requestParameters: DeleteProductListRequest): Promise<EmptyResponse> {
        const response = await this.deleteProductListRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get a specific asset.
     * Assets: Get
     */
    async getAssetRaw(requestParameters: GetAssetRequest): Promise<runtime.ApiResponse<AssetResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getAsset.');
        }

        if (requestParameters.assetId === null || requestParameters.assetId === undefined) {
            throw new runtime.RequiredError('assetId','Required parameter requestParameters.assetId was null or undefined when calling getAsset.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getAsset.');
        }

        if (requestParameters.format === null || requestParameters.format === undefined) {
            throw new runtime.RequiredError('format','Required parameter requestParameters.format was null or undefined when calling getAsset.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/assets/{assetId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"assetId"}}`, encodeURIComponent(String(requestParameters.assetId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetResponseFromJSON(jsonValue));
    }

    /**
     * Get a specific asset.
     * Assets: Get
     */
    async getAsset(requestParameters: GetAssetRequest): Promise<AssetResponse> {
        const response = await this.getAssetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific Bios List.
     * Bios: Get
     */
    async getBioRaw(requestParameters: GetBioRequest): Promise<runtime.ApiResponse<BioListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getBio.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling getBio.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getBio.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/bios/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BioListResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific Bios List.
     * Bios: Get
     */
    async getBio(requestParameters: GetBioRequest): Promise<BioListResponse> {
        const response = await this.getBioRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Bio Lists for an account.
     * Bios: List
     */
    async getBiosRaw(requestParameters: GetBiosRequest): Promise<runtime.ApiResponse<BioListsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getBios.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getBios.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/bios`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BioListsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Bio Lists for an account.
     * Bios: List
     */
    async getBios(requestParameters: GetBiosRequest): Promise<BioListsResponse> {
        const response = await this.getBiosRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get available Categories.  All Locations are required to have an associated Category to assist with organization and search. Yext provides a hierarchy of business categories for this purpose, exposed by this API. 
     * Categories: List
     */
    async getBusinessCategoriesRaw(requestParameters: GetBusinessCategoriesRequest): Promise<runtime.ApiResponse<BusinessCategoriesResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getBusinessCategories.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        if (requestParameters.country !== undefined) {
            queryParameters['country'] = requestParameters.country;
        }

        if (requestParameters.entityType !== undefined) {
            queryParameters['entityType'] = requestParameters.entityType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/categories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BusinessCategoriesResponseFromJSON(jsonValue));
    }

    /**
     * Get available Categories.  All Locations are required to have an associated Category to assist with organization and search. Yext provides a hierarchy of business categories for this purpose, exposed by this API. 
     * Categories: List
     */
    async getBusinessCategories(requestParameters: GetBusinessCategoriesRequest): Promise<BusinessCategoriesResponse> {
        const response = await this.getBusinessCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets a specific Custom Field in an Account.
     * Custom Fields: Get
     */
    async getCustomFieldRaw(requestParameters: GetCustomFieldRequest): Promise<runtime.ApiResponse<CustomFieldResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getCustomField.');
        }

        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getCustomField.');
        }

        if (requestParameters.customFieldId === null || requestParameters.customFieldId === undefined) {
            throw new runtime.RequiredError('customFieldId','Required parameter requestParameters.customFieldId was null or undefined when calling getCustomField.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/customfields/{customFieldId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"customFieldId"}}`, encodeURIComponent(String(requestParameters.customFieldId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomFieldResponseFromJSON(jsonValue));
    }

    /**
     * Gets a specific Custom Field in an Account.
     * Custom Fields: Get
     */
    async getCustomField(requestParameters: GetCustomFieldRequest): Promise<CustomFieldResponse> {
        const response = await this.getCustomFieldRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns a list of Custom Fields in an Account.
     * Custom Fields: List
     */
    async getCustomFieldsRaw(requestParameters: GetCustomFieldsRequest): Promise<runtime.ApiResponse<CustomFieldsResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getCustomFields.');
        }

        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getCustomFields.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/customfields`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomFieldsResponseFromJSON(jsonValue));
    }

    /**
     * Returns a list of Custom Fields in an Account.
     * Custom Fields: List
     */
    async getCustomFields(requestParameters: GetCustomFieldsRequest): Promise<CustomFieldsResponse> {
        const response = await this.getCustomFieldsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific Event List.
     * Events (Legacy): Get
     */
    async getEventRaw(requestParameters: GetEventRequest): Promise<runtime.ApiResponse<EventListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getEvent.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling getEvent.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getEvent.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/events/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventListResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific Event List.
     * Events (Legacy): Get
     */
    async getEvent(requestParameters: GetEventRequest): Promise<EventListResponse> {
        const response = await this.getEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Event Lists for an account.
     * Events (Legacy): List
     */
    async getEventsRaw(requestParameters: GetEventsRequest): Promise<runtime.ApiResponse<EventListsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getEvents.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getEvents.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/events`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventListsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Event Lists for an account.
     * Events (Legacy): List
     */
    async getEvents(requestParameters: GetEventsRequest): Promise<EventListsResponse> {
        const response = await this.getEventsRaw(requestParameters);
        return await response.value();
    }

    /**
     *  Use the Google Fields endpoint to retrieve a complete list of Google\'s location attributes for each business category. This list includes attributes that may not apply to all Locations in an account. The set of attributes available to a Location depends on its primary business category. You can view and edit the attributes of Locations in the **`googleAttributes`** Location field.  **NOTE:** Google Attributes are managed by Google and are subject to change without notice. To prevent errors, make sure your API implementation is not dependent on the presence of specific attributes. 
     * Google Fields: List
     */
    async getGoogleKeywordsRaw(requestParameters: GetGoogleKeywordsRequest): Promise<runtime.ApiResponse<GoogleFieldsResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getGoogleKeywords.');
        }

        const queryParameters: any = {};

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        if (requestParameters.clientCategoryId !== undefined) {
            queryParameters['clientCategoryId'] = requestParameters.clientCategoryId;
        }

        if (requestParameters.countryCode !== undefined) {
            queryParameters['countryCode'] = requestParameters.countryCode;
        }

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/googlefields`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => GoogleFieldsResponseFromJSON(jsonValue));
    }

    /**
     *  Use the Google Fields endpoint to retrieve a complete list of Google\'s location attributes for each business category. This list includes attributes that may not apply to all Locations in an account. The set of attributes available to a Location depends on its primary business category. You can view and edit the attributes of Locations in the **`googleAttributes`** Location field.  **NOTE:** Google Attributes are managed by Google and are subject to change without notice. To prevent errors, make sure your API implementation is not dependent on the presence of specific attributes. 
     * Google Fields: List
     */
    async getGoogleKeywords(requestParameters: GetGoogleKeywordsRequest): Promise<GoogleFieldsResponse> {
        const response = await this.getGoogleKeywordsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the the requested Language Profile for a given Location.
     * Language Profiles (Legacy): Get
     */
    async getLanguageProfileRaw(requestParameters: GetLanguageProfileRequest): Promise<runtime.ApiResponse<LanguageProfileResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLanguageProfile.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling getLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling getLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}/profiles/{language_code}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))).replace(`{${"language_code"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LanguageProfileResponseFromJSON(jsonValue));
    }

    /**
     * Gets the the requested Language Profile for a given Location.
     * Language Profiles (Legacy): Get
     */
    async getLanguageProfile(requestParameters: GetLanguageProfileRequest): Promise<LanguageProfileResponse> {
        const response = await this.getLanguageProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get Language Profiles for a Location.
     * Language Profiles (Legacy): List
     */
    async getLanguageProfilesRaw(requestParameters: GetLanguageProfilesRequest): Promise<runtime.ApiResponse<LanguageProfilesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLanguageProfiles.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling getLanguageProfiles.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLanguageProfiles.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}/profiles`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LanguageProfilesResponseFromJSON(jsonValue));
    }

    /**
     * Get Language Profiles for a Location.
     * Language Profiles (Legacy): List
     */
    async getLanguageProfiles(requestParameters: GetLanguageProfilesRequest): Promise<LanguageProfilesResponse> {
        const response = await this.getLanguageProfilesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the primary profile for a single Location.
     * Locations (Legacy): Get
     */
    async getLocationRaw(requestParameters: GetLocationRequest): Promise<runtime.ApiResponse<LocationResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLocation.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling getLocation.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLocation.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LocationResponseFromJSON(jsonValue));
    }

    /**
     * Gets the primary profile for a single Location.
     * Locations (Legacy): Get
     */
    async getLocation(requestParameters: GetLocationRequest): Promise<LocationResponse> {
        const response = await this.getLocationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns a list of Location Folders in an Account.
     * Folders: List
     */
    async getLocationFoldersRaw(requestParameters: GetLocationFoldersRequest): Promise<runtime.ApiResponse<FoldersResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLocationFolders.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLocationFolders.');
        }

        const queryParameters: any = {};

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/folders`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => FoldersResponseFromJSON(jsonValue));
    }

    /**
     * Returns a list of Location Folders in an Account.
     * Folders: List
     */
    async getLocationFolders(requestParameters: GetLocationFoldersRequest): Promise<FoldersResponse> {
        const response = await this.getLocationFoldersRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get multiple Locations (primary profiles only).
     * Locations (Legacy): List
     */
    async getLocationsRaw(requestParameters: GetLocationsRequest): Promise<runtime.ApiResponse<LocationsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLocations.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLocations.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LocationsResponseFromJSON(jsonValue));
    }

    /**
     * Get multiple Locations (primary profiles only).
     * Locations (Legacy): List
     */
    async getLocations(requestParameters: GetLocationsRequest): Promise<LocationsResponse> {
        const response = await this.getLocationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific Menu.
     * Menus: Get
     */
    async getMenuRaw(requestParameters: GetMenuRequest): Promise<runtime.ApiResponse<MenuListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getMenu.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling getMenu.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getMenu.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/menus/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuListResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific Menu.
     * Menus: Get
     */
    async getMenu(requestParameters: GetMenuRequest): Promise<MenuListResponse> {
        const response = await this.getMenuRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Menus for an account.
     * Menus: List
     */
    async getMenusRaw(requestParameters: GetMenusRequest): Promise<runtime.ApiResponse<MenuListsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getMenus.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getMenus.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/menus`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuListsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Menus for an account.
     * Menus: List
     */
    async getMenus(requestParameters: GetMenusRequest): Promise<MenuListsResponse> {
        const response = await this.getMenusRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific Product List.
     * Products: Get
     */
    async getProductRaw(requestParameters: GetProductRequest): Promise<runtime.ApiResponse<ProductListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getProduct.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling getProduct.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getProduct.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/products/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductListResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific Product List.
     * Products: Get
     */
    async getProduct(requestParameters: GetProductRequest): Promise<ProductListResponse> {
        const response = await this.getProductRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Product Lists for an account.
     * Products: List
     */
    async getProductsRaw(requestParameters: GetProductsRequest): Promise<runtime.ApiResponse<ProductListsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getProducts.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getProducts.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/products`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductListsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Product Lists for an account.
     * Products: List
     */
    async getProducts(requestParameters: GetProductsRequest): Promise<ProductListsResponse> {
        const response = await this.getProductsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new Entity  **NOTE:**   * If the **`v`** parameter is before `20181129`: the 201 response contains the created Entity\'s **`id`**   * If the **`v`** parameter is on or after `20181129`: the 201 response contains the created Entity in its entirety 
     * Entities: Create
     */
    async knowledgeApiServerCreateEntityRaw(requestParameters: KnowledgeApiServerCreateEntityRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerCreateEntity.');
        }

        if (requestParameters.entityType === null || requestParameters.entityType === undefined) {
            throw new runtime.RequiredError('entityType','Required parameter requestParameters.entityType was null or undefined when calling knowledgeApiServerCreateEntity.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerCreateEntity.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling knowledgeApiServerCreateEntity.');
        }

        const queryParameters: any = {};

        if (requestParameters.entityType !== undefined) {
            queryParameters['entityType'] = requestParameters.entityType;
        }

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.stripUnsupportedFormats !== undefined) {
            queryParameters['stripUnsupportedFormats'] = requestParameters.stripUnsupportedFormats;
        }

        if (requestParameters.templateFields !== undefined) {
            queryParameters['templateFields'] = requestParameters.templateFields;
        }

        if (requestParameters.templateId !== undefined) {
            queryParameters['templateId'] = requestParameters.templateId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entities`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EntityWriteToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Create a new Entity  **NOTE:**   * If the **`v`** parameter is before `20181129`: the 201 response contains the created Entity\'s **`id`**   * If the **`v`** parameter is on or after `20181129`: the 201 response contains the created Entity in its entirety 
     * Entities: Create
     */
    async knowledgeApiServerCreateEntity(requestParameters: KnowledgeApiServerCreateEntityRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerCreateEntityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete the Entity with the given ID
     * Entities: Delete
     */
    async knowledgeApiServerDeleteEntityRaw(requestParameters: KnowledgeApiServerDeleteEntityRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerDeleteEntity.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerDeleteEntity.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerDeleteEntity.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entities/{entityId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Delete the Entity with the given ID
     * Entities: Delete
     */
    async knowledgeApiServerDeleteEntity(requestParameters: KnowledgeApiServerDeleteEntityRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerDeleteEntityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete a language profile
     * Entity Language Profiles: Delete
     */
    async knowledgeApiServerDeleteLanguageProfileRaw(requestParameters: KnowledgeApiServerDeleteLanguageProfileRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerDeleteLanguageProfile.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerDeleteLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling knowledgeApiServerDeleteLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerDeleteLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entityprofiles/{entityId}/{languageCode}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))).replace(`{${"languageCode"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Delete a language profile
     * Entity Language Profiles: Delete
     */
    async knowledgeApiServerDeleteLanguageProfile(requestParameters: KnowledgeApiServerDeleteLanguageProfileRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerDeleteLanguageProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve information for an Entity with a given ID
     * Entities: Get
     */
    async knowledgeApiServerGetEntityRaw(requestParameters: KnowledgeApiServerGetEntityRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerGetEntity.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerGetEntity.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerGetEntity.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entities/{entityId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve information for an Entity with a given ID
     * Entities: Get
     */
    async knowledgeApiServerGetEntity(requestParameters: KnowledgeApiServerGetEntityRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerGetEntityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a Language Profile for an Entity  **NOTE**:  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: Get
     */
    async knowledgeApiServerGetLanguageProfileRaw(requestParameters: KnowledgeApiServerGetLanguageProfileRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerGetLanguageProfile.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerGetLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling knowledgeApiServerGetLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerGetLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.rendered !== undefined) {
            queryParameters['rendered'] = requestParameters.rendered;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entityprofiles/{entityId}/{languageCode}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))).replace(`{${"languageCode"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve a Language Profile for an Entity  **NOTE**:  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: Get
     */
    async knowledgeApiServerGetLanguageProfile(requestParameters: KnowledgeApiServerGetLanguageProfileRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerGetLanguageProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a list of Language Profiles for Entities within an account  **NOTE:**  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: List All
     */
    async knowledgeApiServerListAllLanguageProfilesRaw(requestParameters: KnowledgeApiServerListAllLanguageProfilesRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerListAllLanguageProfiles.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerListAllLanguageProfiles.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityTypes !== undefined) {
            queryParameters['entityTypes'] = requestParameters.entityTypes;
        }

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.filter !== undefined) {
            queryParameters['filter'] = requestParameters.filter;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.languageCodes !== undefined) {
            queryParameters['languageCodes'] = requestParameters.languageCodes;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.rendered !== undefined) {
            queryParameters['rendered'] = requestParameters.rendered;
        }

        if (requestParameters.sortBy !== undefined) {
            queryParameters['sortBy'] = requestParameters.sortBy;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entityprofiles`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve a list of Language Profiles for Entities within an account  **NOTE:**  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: List All
     */
    async knowledgeApiServerListAllLanguageProfiles(requestParameters: KnowledgeApiServerListAllLanguageProfilesRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerListAllLanguageProfilesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a list of Entities within an account
     * Entities: List
     */
    async knowledgeApiServerListEntitiesRaw(requestParameters: KnowledgeApiServerListEntitiesRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerListEntities.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerListEntities.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityTypes !== undefined) {
            queryParameters['entityTypes'] = requestParameters.entityTypes;
        }

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.filter !== undefined) {
            queryParameters['filter'] = requestParameters.filter;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.languages !== undefined) {
            queryParameters['languages'] = requestParameters.languages;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.resolvePlaceholders !== undefined) {
            queryParameters['resolvePlaceholders'] = requestParameters.resolvePlaceholders;
        }

        if (requestParameters.sortBy !== undefined) {
            queryParameters['sortBy'] = requestParameters.sortBy;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entities`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve a list of Entities within an account
     * Entities: List
     */
    async knowledgeApiServerListEntities(requestParameters: KnowledgeApiServerListEntitiesRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerListEntitiesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve Language Profiles for an Entity  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: List
     */
    async knowledgeApiServerListLanguageProfilesRaw(requestParameters: KnowledgeApiServerListLanguageProfilesRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerListLanguageProfiles.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerListLanguageProfiles.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerListLanguageProfiles.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityTypes !== undefined) {
            queryParameters['entityTypes'] = requestParameters.entityTypes;
        }

        if (requestParameters.fields !== undefined) {
            queryParameters['fields'] = requestParameters.fields;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.languageCodes !== undefined) {
            queryParameters['languageCodes'] = requestParameters.languageCodes;
        }

        if (requestParameters.rendered !== undefined) {
            queryParameters['rendered'] = requestParameters.rendered;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entityprofiles/{entityId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve Language Profiles for an Entity  * If the **`v`** parameter is before `20190103`: by default, returned alternate Language Profiles include **`googleAttributes`** and **`categoryIds`** fields * If the **`v`** parameter is `20190103` or later: by default, returned alternate Language Profiles do not include **`googleAttributes`** and **`categoryIds`** fields. However, these fields can still be retrieved if the **`rendered`** parameter in the request is set to `true`. 
     * Entity Language Profiles: List
     */
    async knowledgeApiServerListLanguageProfiles(requestParameters: KnowledgeApiServerListLanguageProfilesRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerListLanguageProfilesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update the Entity with the given ID
     * Entities: Update
     */
    async knowledgeApiServerUpdateEntityRaw(requestParameters: KnowledgeApiServerUpdateEntityRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerUpdateEntity.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerUpdateEntity.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerUpdateEntity.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling knowledgeApiServerUpdateEntity.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        if (requestParameters.stripUnsupportedFormats !== undefined) {
            queryParameters['stripUnsupportedFormats'] = requestParameters.stripUnsupportedFormats;
        }

        if (requestParameters.templateFields !== undefined) {
            queryParameters['templateFields'] = requestParameters.templateFields;
        }

        if (requestParameters.templateId !== undefined) {
            queryParameters['templateId'] = requestParameters.templateId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entities/{entityId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: EntityWriteToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Update the Entity with the given ID
     * Entities: Update
     */
    async knowledgeApiServerUpdateEntity(requestParameters: KnowledgeApiServerUpdateEntityRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerUpdateEntityRaw(requestParameters);
        return await response.value();
    }

    /**
     * Add a language profile
     * Entity Language Profiles: Upsert
     */
    async knowledgeApiServerUpsertLanguageProfileRaw(requestParameters: KnowledgeApiServerUpsertLanguageProfileRequest): Promise<runtime.ApiResponse<{ [key: string]: object; }>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling knowledgeApiServerUpsertLanguageProfile.');
        }

        if (requestParameters.entityId === null || requestParameters.entityId === undefined) {
            throw new runtime.RequiredError('entityId','Required parameter requestParameters.entityId was null or undefined when calling knowledgeApiServerUpsertLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling knowledgeApiServerUpsertLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling knowledgeApiServerUpsertLanguageProfile.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling knowledgeApiServerUpsertLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/entityprofiles/{entityId}/{languageCode}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters.entityId))).replace(`{${"languageCode"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: EntityWriteToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Add a language profile
     * Entity Language Profiles: Upsert
     */
    async knowledgeApiServerUpsertLanguageProfile(requestParameters: KnowledgeApiServerUpsertLanguageProfileRequest): Promise<{ [key: string]: object; }> {
        const response = await this.knowledgeApiServerUpsertLanguageProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * List assets in an account.
     * Assets: List
     */
    async listAssetsRaw(requestParameters: ListAssetsRequest): Promise<runtime.ApiResponse<AssetsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listAssets.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listAssets.');
        }

        if (requestParameters.format === null || requestParameters.format === undefined) {
            throw new runtime.RequiredError('format','Required parameter requestParameters.format was null or undefined when calling listAssets.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/assets`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AssetsResponseFromJSON(jsonValue));
    }

    /**
     * List assets in an account.
     * Assets: List
     */
    async listAssets(requestParameters: ListAssetsRequest): Promise<AssetsResponse> {
        const response = await this.listAssetsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get multiple Locations (primary profiles only) that match provided filters.
     * Locations (Legacy): Search
     */
    async searchLocationsRaw(requestParameters: SearchLocationsRequest): Promise<runtime.ApiResponse<LocationsSearchResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling searchLocations.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling searchLocations.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.filters !== undefined) {
            queryParameters['filters'] = requestParameters.filters;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locationsearch`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LocationsSearchResponseFromJSON(jsonValue));
    }

    /**
     * Get multiple Locations (primary profiles only) that match provided filters.
     * Locations (Legacy): Search
     */
    async searchLocations(requestParameters: SearchLocationsRequest): Promise<LocationsSearchResponse> {
        const response = await this.searchLocationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update a specific asset.  **NOTE**: This endpoint is a true PUT. Fields that are not provided in an update will be cleared. The entire Asset object must be provided in the request, except for its **`id`**, which is given in the path.  **NOTE:** * If the **`v`** parameter is on or before `20190624`: only the first folder the Asset is available for will be returned in the legacy **`folderId`** field. * If the **`v`** parameter is after `20190624`: the complete list of folders the Asset is available to will be returned in the new **`folderIds`** field. **`folderId`** will not be returned. 
     * Assets: Update
     */
    async updateAssetRaw(requestParameters: UpdateAssetRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateAsset.');
        }

        if (requestParameters.assetId === null || requestParameters.assetId === undefined) {
            throw new runtime.RequiredError('assetId','Required parameter requestParameters.assetId was null or undefined when calling updateAsset.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateAsset.');
        }

        if (requestParameters.format === null || requestParameters.format === undefined) {
            throw new runtime.RequiredError('format','Required parameter requestParameters.format was null or undefined when calling updateAsset.');
        }

        if (requestParameters.assetRequest === null || requestParameters.assetRequest === undefined) {
            throw new runtime.RequiredError('assetRequest','Required parameter requestParameters.assetRequest was null or undefined when calling updateAsset.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/assets/{assetId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"assetId"}}`, encodeURIComponent(String(requestParameters.assetId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssetToJSON(requestParameters.assetRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Update a specific asset.  **NOTE**: This endpoint is a true PUT. Fields that are not provided in an update will be cleared. The entire Asset object must be provided in the request, except for its **`id`**, which is given in the path.  **NOTE:** * If the **`v`** parameter is on or before `20190624`: only the first folder the Asset is available for will be returned in the legacy **`folderId`** field. * If the **`v`** parameter is after `20190624`: the complete list of folders the Asset is available to will be returned in the new **`folderIds`** field. **`folderId`** will not be returned. 
     * Assets: Update
     */
    async updateAsset(requestParameters: UpdateAssetRequest): Promise<IdResponse> {
        const response = await this.updateAssetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update an existing Bios List.
     * Bios: Update
     */
    async updateBioRaw(requestParameters: UpdateBioRequest): Promise<runtime.ApiResponse<BioListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateBio.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling updateBio.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateBio.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateBio.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/bios/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BioToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BioListResponseFromJSON(jsonValue));
    }

    /**
     * Update an existing Bios List.
     * Bios: Update
     */
    async updateBio(requestParameters: UpdateBioRequest): Promise<BioListResponse> {
        const response = await this.updateBioRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a single Custom Field in an Account.  Note that the only updatable values in an existing Custom Field are its name, group, description, alternate language behavior, as well as available options if its `type` is `SINGLE_OPTION` or `MULTI_OPTION`.  * If options are modified, every location with that option selected will have the new value.  * If options are deleted, all locations with that option will no longer have that option selected.  * If the deleted options are the only options selected for a location, the location will no longer have a value set for that Custom Field. 
     * Custom Fields: Update
     */
    async updateCustomFieldRaw(requestParameters: UpdateCustomFieldRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateCustomField.');
        }

        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateCustomField.');
        }

        if (requestParameters.customFieldId === null || requestParameters.customFieldId === undefined) {
            throw new runtime.RequiredError('customFieldId','Required parameter requestParameters.customFieldId was null or undefined when calling updateCustomField.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateCustomField.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/customfields/{customFieldId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"customFieldId"}}`, encodeURIComponent(String(requestParameters.customFieldId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CustomFieldUpdateToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates a single Custom Field in an Account.  Note that the only updatable values in an existing Custom Field are its name, group, description, alternate language behavior, as well as available options if its `type` is `SINGLE_OPTION` or `MULTI_OPTION`.  * If options are modified, every location with that option selected will have the new value.  * If options are deleted, all locations with that option will no longer have that option selected.  * If the deleted options are the only options selected for a location, the location will no longer have a value set for that Custom Field. 
     * Custom Fields: Update
     */
    async updateCustomField(requestParameters: UpdateCustomFieldRequest): Promise<IdResponse> {
        const response = await this.updateCustomFieldRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update an existing Event List.
     * Events (Legacy): Update
     */
    async updateEventRaw(requestParameters: UpdateEventRequest): Promise<runtime.ApiResponse<EventListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateEvent.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling updateEvent.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateEvent.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateEvent.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/events/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: EventLegacyToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EventListResponseFromJSON(jsonValue));
    }

    /**
     * Update an existing Event List.
     * Events (Legacy): Update
     */
    async updateEvent(requestParameters: UpdateEventRequest): Promise<EventListResponse> {
        const response = await this.updateEventRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates the primary profile for a Location.  **NOTE:** Despite using the PUT method, Locations: Update only updates supplied fields. Omitted fields are not modified.  **NOTE:** The Location\'s primary profile language can be changed by calling this endpoint with a different, but unused, language code. 
     * Locations (Legacy): Update
     */
    async updateLocationRaw(requestParameters: UpdateLocationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateLocation.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling updateLocation.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateLocation.');
        }

        if (requestParameters.locationRequest === null || requestParameters.locationRequest === undefined) {
            throw new runtime.RequiredError('locationRequest','Required parameter requestParameters.locationRequest was null or undefined when calling updateLocation.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: LocationLegacyToJSON(requestParameters.locationRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates the primary profile for a Location.  **NOTE:** Despite using the PUT method, Locations: Update only updates supplied fields. Omitted fields are not modified.  **NOTE:** The Location\'s primary profile language can be changed by calling this endpoint with a different, but unused, language code. 
     * Locations (Legacy): Update
     */
    async updateLocation(requestParameters: UpdateLocationRequest): Promise<IdResponse> {
        const response = await this.updateLocationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update an existing Menu.
     * Menus: Update
     */
    async updateMenuRaw(requestParameters: UpdateMenuRequest): Promise<runtime.ApiResponse<MenuListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateMenu.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling updateMenu.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateMenu.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateMenu.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/menus/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: MenuToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuListResponseFromJSON(jsonValue));
    }

    /**
     * Update an existing Menu.
     * Menus: Update
     */
    async updateMenu(requestParameters: UpdateMenuRequest): Promise<MenuListResponse> {
        const response = await this.updateMenuRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update an existing Product List.
     * Products: Update
     */
    async updateProductRaw(requestParameters: UpdateProductRequest): Promise<runtime.ApiResponse<ProductListResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateProduct.');
        }

        if (requestParameters.listId === null || requestParameters.listId === undefined) {
            throw new runtime.RequiredError('listId','Required parameter requestParameters.listId was null or undefined when calling updateProduct.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateProduct.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling updateProduct.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/products/{listId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"listId"}}`, encodeURIComponent(String(requestParameters.listId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProductToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductListResponseFromJSON(jsonValue));
    }

    /**
     * Update an existing Product List.
     * Products: Update
     */
    async updateProduct(requestParameters: UpdateProductRequest): Promise<ProductListResponse> {
        const response = await this.updateProductRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates and / or sets the fields for a Language Profile  **NOTE:** You can change a Language Profile’s language by supplying a different (but unused) language code. 
     * Language Profiles (Legacy): Upsert
     */
    async upsertLanguageProfileRaw(requestParameters: UpsertLanguageProfileRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling upsertLanguageProfile.');
        }

        if (requestParameters.locationId === null || requestParameters.locationId === undefined) {
            throw new runtime.RequiredError('locationId','Required parameter requestParameters.locationId was null or undefined when calling upsertLanguageProfile.');
        }

        if (requestParameters.languageCode === null || requestParameters.languageCode === undefined) {
            throw new runtime.RequiredError('languageCode','Required parameter requestParameters.languageCode was null or undefined when calling upsertLanguageProfile.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling upsertLanguageProfile.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling upsertLanguageProfile.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.primary !== undefined) {
            queryParameters['primary'] = requestParameters.primary;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/locations/{locationId}/profiles/{language_code}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"locationId"}}`, encodeURIComponent(String(requestParameters.locationId))).replace(`{${"language_code"}}`, encodeURIComponent(String(requestParameters.languageCode))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: LocationLegacyToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Creates and / or sets the fields for a Language Profile  **NOTE:** You can change a Language Profile’s language by supplying a different (but unused) language code. 
     * Language Profiles (Legacy): Upsert
     */
    async upsertLanguageProfile(requestParameters: UpsertLanguageProfileRequest): Promise<EmptyResponse> {
        const response = await this.upsertLanguageProfileRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum GetBusinessCategoriesEntityTypeEnum {
    Atm = 'atm',
    Event = 'event',
    HealthcareFacility = 'healthcareFacility',
    HealthcareProfessional = 'healthcareProfessional',
    Location = 'location',
    Restaurant = 'restaurant'
}
