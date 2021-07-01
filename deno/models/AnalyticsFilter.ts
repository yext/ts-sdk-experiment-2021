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

import { exists, mapValues } from '../runtime.ts';
/**
 * 
 * @export
 * @interface AnalyticsFilter
 */
export interface AnalyticsFilter {
    /**
     * The inclusive start date for the report data.  Defaults to 90 days before the end date. Must be before the date given in **`endDate`**.
     * E.g. ‘2016-08-22’
     * NOTE: If `WEEKS`, `MONTHS`, or `MONTHS_RETAIL` is in **`dimensions`**, **`startDate`** must coincide with the beginning and end of a week or month, depending on the dimension chosen.
     * @type {Date}
     * @memberof AnalyticsFilter
     */
    startDate?: Date;
    /**
     * The exclusive end date for the report data. Defaults to the earliest of the relevant maximum reporting dates. Must be after the date given in **`startDate`**.
     * NOTES:
     * - If **`dimensions`** contains `WEEKS`, `MONTHS`, or `MONTHS_RETAIL`, the end date must coincide with the end of a week or month, depending on the dimension chosen.
     * - If the **`v`** parameter is before `20180314`, the end date is inclusive, and the end date must be on or after the date given in **`startDate`**.
     * @type {Date}
     * @memberof AnalyticsFilter
     */
    endDate?: Date;
    /**
     * Array of locationIds
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    locationIds?: Array<string>;
    /**
     * Specifies a list of folders whose locations and subfolders should be included in the results. Defaults to all folders.
     * Cannot be used when `ACCOUNT_ID` is in **`dimensions`**.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    folderIds?: Array<number>;
    /**
     * Array of 3166 Alpha-2 country codes.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    countries?: Array<string>;
    /**
     * Array of location labels. Cannot be used with `NEW_REVIEWS` or `AVERAGE_RATING` metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    locationLabels?: Array<string>;
    /**
     * Array of entityIds
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    entityIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    entityType?: Array<AnalyticsFilterEntityTypeEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    entityGroup?: Array<AnalyticsFilterEntityGroupEnum>;
    /**
     * Array of platform IDs.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    platforms?: Array<string>;
    /**
     * Specifies the type of customer actions to be included in the report. Can only be used with the `GOOGLE_CUSTOMER_ACTIONS` metric.
     * This works with v parameters before 20170914.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    googleActionType?: Array<AnalyticsFilterGoogleActionTypeEnum>;
    /**
     * Specifies the type of customer actions to be included in the report. Can only be used with the `GOOGLE_CUSTOMER_ACTIONS` and `YELP_CUSTOMER_ACTIONS` metrics.
     * This works with v parameters 20170914 and later.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    customerActionType?: Array<AnalyticsFilterCustomerActionTypeEnum>;
    /**
     * Specifies the type of queries to be included in the report. Can only be used with the `GOOGLE_SEARCH_QUERIES` metric.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    googleQueryType?: Array<AnalyticsFilterGoogleQueryTypeEnum>;
    /**
     * Specifies the hour(s) of day that should be included in the report. Can only, and must be used with the `GOOGLE_PHONE_CALLS` metric.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    hours?: Array<number>;
    /**
     * Specifies the ratings to be included in the report. Can only be used with Reviews metrics.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    ratings?: Array<number>;
    /**
     * Specifies the words that should be included in the report. Can only be used with Reviews metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    frequentWords?: Array<string>;
    /**
     * Specifies the partners that should be included in the report. Can only be used with Reviews metrics.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    partners?: Array<number>;
    /**
     * Specifies the review labels that should be included in the report. Can only be used with Reviews metrics.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    reviewLabels?: Array<number>;
    /**
     * Specifies the sentiment collection that should be included in the report. Can only be used with Reviews metrics.
     * @type {Array<number>}
     * @memberof AnalyticsFilter
     */
    sentimentCollection?: Array<number>;
    /**
     * Specifies the Pages page types that should be included in the report. Can only be used with Store Pages metrics
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    pageTypes?: Array<AnalyticsFilterPageTypesEnum>;
    /**
     * Specifies the type of listings live that should be included in the report. Can only be used with `LISTINGS_LIVE` metric.
     * @type {string}
     * @memberof AnalyticsFilter
     */
    listingsLiveType?: AnalyticsFilterListingsLiveTypeEnum;
    /**
     * Specifies the types of publisher suggestions that should be included in the report. Can only be used with `PUBLISHER_SUGGESTIONS` metric.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    publisherSuggestionType?: Array<AnalyticsFilterPublisherSuggestionTypeEnum>;
    /**
     * The query template used to create search requests. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    queryTemplate?: Array<AnalyticsFilterQueryTemplateEnum>;
    /**
     * The search engine used for the Intelligent Search Tracker. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    searchEngine?: Array<AnalyticsFilterSearchEngineEnum>;
    /**
     * The keyword used to create search requests. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    keyword?: Array<string>;
    /**
     * Competitors monitored by the Intelligent Search Tracker. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    competitor?: Array<string>;
    /**
     * The local pack or organic position of the search result. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    matchPosition?: Array<AnalyticsFilterMatchPositionEnum>;
    /**
     * One of Organic, Local Pack or Knowledge Card. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    searchResultType?: Array<AnalyticsFilterSearchResultTypeEnum>;
    /**
     * One of Local Map Pack, Listings, Pages and Corporate Website. Can only be used with Intelligent Search Tracker metrics.
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    matchType?: Array<AnalyticsFilterMatchTypeEnum>;
    /**
     * 
     * @type {number}
     * @memberof AnalyticsFilter
     */
    minSearchFrequency?: number;
    /**
     * 
     * @type {number}
     * @memberof AnalyticsFilter
     */
    maxSearchFrequency?: number;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    searchTerms?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    searchType?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    foursquareCheckinType?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    foursquareCheckinAge?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    foursquareCheckinGender?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    foursquareCheckinTimeOfDay?: string;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    instagramContentType?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    age?: Array<AnalyticsFilterAgeEnum>;
    /**
     * 
     * @type {string}
     * @memberof AnalyticsFilter
     */
    gender?: AnalyticsFilterGenderEnum;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    facebookImpressionType?: Array<AnalyticsFilterFacebookImpressionTypeEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    facebookStoryType?: Array<AnalyticsFilterFacebookStoryTypeEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    facebookRsvpType?: Array<AnalyticsFilterFacebookRsvpTypeEnum>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AnalyticsFilter
     */
    eventSearchCondition?: Array<AnalyticsFilterEventSearchConditionEnum>;
}

/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterEntityTypeEnum {
    Location = 'LOCATION',
    HealthcareProfessional = 'HEALTHCARE_PROFESSIONAL',
    HealthcareFacility = 'HEALTHCARE_FACILITY',
    Event = 'EVENT',
    Atm = 'ATM',
    Restaurant = 'RESTAURANT'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterEntityGroupEnum {
    Unknown = 'UNKNOWN',
    Locations = 'LOCATIONS',
    Events = 'EVENTS',
    People = 'PEOPLE'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterGoogleActionTypeEnum {
    DrivingDirections = 'ACTION_DRIVING_DIRECTIONS',
    Phone = 'ACTION_PHONE',
    Website = 'ACTION_WEBSITE'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterCustomerActionTypeEnum {
    DrivingDirections = 'ACTION_DRIVING_DIRECTIONS',
    Phone = 'ACTION_PHONE',
    Website = 'ACTION_WEBSITE'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterGoogleQueryTypeEnum {
    Direct = 'QUERIES_DIRECT',
    Indirect = 'QUERIES_INDIRECT',
    Chain = 'QUERIES_CHAIN'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterPageTypesEnum {
    Store = 'STORE',
    Directory = 'DIRECTORY',
    Search = 'SEARCH'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterListingsLiveTypeEnum {
    Claimed = 'CLAIMED',
    Created = 'CREATED'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterPublisherSuggestionTypeEnum {
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
    New = 'NEW'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterQueryTemplateEnum {
    Keyword = 'KEYWORD',
    KeywordCity = 'KEYWORD_CITY',
    KeywordCityState = 'KEYWORD_CITY_STATE',
    KeywordInCity = 'KEYWORD_IN_CITY',
    KeywordNearMe = 'KEYWORD_NEAR_ME',
    KeywordZip = 'KEYWORD_ZIP'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterSearchEngineEnum {
    GoogleDesktop = 'GOOGLE_DESKTOP',
    GoogleMobile = 'GOOGLE_MOBILE',
    BingDesktop = 'BING_DESKTOP',
    YahooDesktop = 'YAHOO_DESKTOP'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterMatchPositionEnum {
    One = 'ONE',
    Two = 'TWO',
    Three = 'THREE',
    Four = 'FOUR',
    Five = 'FIVE',
    SixToTen = 'SIX_TO_TEN',
    ElevenToFifteen = 'ELEVEN_TO_FIFTEEN'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterSearchResultTypeEnum {
    OrganicResult = 'ORGANIC_RESULT',
    LocalPackResult = 'LOCAL_PACK_RESULT',
    KnowledgeCardResult = 'KNOWLEDGE_CARD_RESULT'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterMatchTypeEnum {
    LocationPages = 'LOCATION_PAGES',
    CorporateWebsite = 'CORPORATE_WEBSITE',
    Listings = 'LISTINGS',
    NoMatch = 'NO_MATCH',
    LocalPack = 'LOCAL_PACK',
    Competitor = 'COMPETITOR'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterAgeEnum {
    Age1317 = 'AGE13_17',
    Age1824 = 'AGE18_24',
    Age2534 = 'AGE25_34',
    Age3544 = 'AGE35_44',
    Age4554 = 'AGE45_54',
    Age55 = 'AGE55',
    Unknown = 'UNKNOWN'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterGenderEnum {
    Female = 'FEMALE',
    Male = 'MALE',
    Unidentified = 'UNIDENTIFIED'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterFacebookImpressionTypeEnum {
    Organic = 'ORGANIC',
    Paid = 'PAID',
    Viral = 'VIRAL'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterFacebookStoryTypeEnum {
    Checkin = 'CHECKIN',
    Coupon = 'COUPON',
    Event = 'EVENT',
    Fan = 'FAN',
    Mention = 'MENTION',
    PagePost = 'PAGE_POST',
    Question = 'QUESTION',
    UserPost = 'USER_POST',
    Other = 'OTHER'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterFacebookRsvpTypeEnum {
    Attending = 'ATTENDING',
    Interested = 'INTERESTED'
}/**
* @export
* @enum {string}
*/
export enum AnalyticsFilterEventSearchConditionEnum {
    InitialScan = 'INITIAL_SCAN',
    Days28Prior = 'DAYS28_PRIOR',
    Days7Prior = 'DAYS7_PRIOR',
    DayOf = 'DAY_OF',
    Days7After = 'DAYS7_AFTER'
}

export function AnalyticsFilterFromJSON(json: any): AnalyticsFilter {
    return AnalyticsFilterFromJSONTyped(json, false);
}

export function AnalyticsFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): AnalyticsFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'locationIds': !exists(json, 'locationIds') ? undefined : json['locationIds'],
        'folderIds': !exists(json, 'folderIds') ? undefined : json['folderIds'],
        'countries': !exists(json, 'countries') ? undefined : json['countries'],
        'locationLabels': !exists(json, 'locationLabels') ? undefined : json['locationLabels'],
        'entityIds': !exists(json, 'entityIds') ? undefined : json['entityIds'],
        'entityType': !exists(json, 'entityType') ? undefined : json['entityType'],
        'entityGroup': !exists(json, 'entityGroup') ? undefined : json['entityGroup'],
        'platforms': !exists(json, 'platforms') ? undefined : json['platforms'],
        'googleActionType': !exists(json, 'googleActionType') ? undefined : json['googleActionType'],
        'customerActionType': !exists(json, 'customerActionType') ? undefined : json['customerActionType'],
        'googleQueryType': !exists(json, 'googleQueryType') ? undefined : json['googleQueryType'],
        'hours': !exists(json, 'hours') ? undefined : json['hours'],
        'ratings': !exists(json, 'ratings') ? undefined : json['ratings'],
        'frequentWords': !exists(json, 'frequentWords') ? undefined : json['frequentWords'],
        'partners': !exists(json, 'partners') ? undefined : json['partners'],
        'reviewLabels': !exists(json, 'reviewLabels') ? undefined : json['reviewLabels'],
        'sentimentCollection': !exists(json, 'sentimentCollection') ? undefined : json['sentimentCollection'],
        'pageTypes': !exists(json, 'pageTypes') ? undefined : json['pageTypes'],
        'listingsLiveType': !exists(json, 'listingsLiveType') ? undefined : json['listingsLiveType'],
        'publisherSuggestionType': !exists(json, 'publisherSuggestionType') ? undefined : json['publisherSuggestionType'],
        'queryTemplate': !exists(json, 'queryTemplate') ? undefined : json['queryTemplate'],
        'searchEngine': !exists(json, 'searchEngine') ? undefined : json['searchEngine'],
        'keyword': !exists(json, 'keyword') ? undefined : json['keyword'],
        'competitor': !exists(json, 'competitor') ? undefined : json['competitor'],
        'matchPosition': !exists(json, 'matchPosition') ? undefined : json['matchPosition'],
        'searchResultType': !exists(json, 'searchResultType') ? undefined : json['searchResultType'],
        'matchType': !exists(json, 'matchType') ? undefined : json['matchType'],
        'minSearchFrequency': !exists(json, 'minSearchFrequency') ? undefined : json['minSearchFrequency'],
        'maxSearchFrequency': !exists(json, 'maxSearchFrequency') ? undefined : json['maxSearchFrequency'],
        'searchTerms': !exists(json, 'searchTerms') ? undefined : json['searchTerms'],
        'searchType': !exists(json, 'searchType') ? undefined : json['searchType'],
        'foursquareCheckinType': !exists(json, 'foursquareCheckinType') ? undefined : json['foursquareCheckinType'],
        'foursquareCheckinAge': !exists(json, 'foursquareCheckinAge') ? undefined : json['foursquareCheckinAge'],
        'foursquareCheckinGender': !exists(json, 'foursquareCheckinGender') ? undefined : json['foursquareCheckinGender'],
        'foursquareCheckinTimeOfDay': !exists(json, 'foursquareCheckinTimeOfDay') ? undefined : json['foursquareCheckinTimeOfDay'],
        'instagramContentType': !exists(json, 'instagramContentType') ? undefined : json['instagramContentType'],
        'age': !exists(json, 'age') ? undefined : json['age'],
        'gender': !exists(json, 'gender') ? undefined : json['gender'],
        'facebookImpressionType': !exists(json, 'facebookImpressionType') ? undefined : json['facebookImpressionType'],
        'facebookStoryType': !exists(json, 'facebookStoryType') ? undefined : json['facebookStoryType'],
        'facebookRsvpType': !exists(json, 'facebookRsvpType') ? undefined : json['facebookRsvpType'],
        'eventSearchCondition': !exists(json, 'eventSearchCondition') ? undefined : json['eventSearchCondition'],
    };
}

export function AnalyticsFilterToJSON(value?: AnalyticsFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString().substr(0,10)),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString().substr(0,10)),
        'locationIds': value.locationIds,
        'folderIds': value.folderIds,
        'countries': value.countries,
        'locationLabels': value.locationLabels,
        'entityIds': value.entityIds,
        'entityType': value.entityType,
        'entityGroup': value.entityGroup,
        'platforms': value.platforms,
        'googleActionType': value.googleActionType,
        'customerActionType': value.customerActionType,
        'googleQueryType': value.googleQueryType,
        'hours': value.hours,
        'ratings': value.ratings,
        'frequentWords': value.frequentWords,
        'partners': value.partners,
        'reviewLabels': value.reviewLabels,
        'sentimentCollection': value.sentimentCollection,
        'pageTypes': value.pageTypes,
        'listingsLiveType': value.listingsLiveType,
        'publisherSuggestionType': value.publisherSuggestionType,
        'queryTemplate': value.queryTemplate,
        'searchEngine': value.searchEngine,
        'keyword': value.keyword,
        'competitor': value.competitor,
        'matchPosition': value.matchPosition,
        'searchResultType': value.searchResultType,
        'matchType': value.matchType,
        'minSearchFrequency': value.minSearchFrequency,
        'maxSearchFrequency': value.maxSearchFrequency,
        'searchTerms': value.searchTerms,
        'searchType': value.searchType,
        'foursquareCheckinType': value.foursquareCheckinType,
        'foursquareCheckinAge': value.foursquareCheckinAge,
        'foursquareCheckinGender': value.foursquareCheckinGender,
        'foursquareCheckinTimeOfDay': value.foursquareCheckinTimeOfDay,
        'instagramContentType': value.instagramContentType,
        'age': value.age,
        'gender': value.gender,
        'facebookImpressionType': value.facebookImpressionType,
        'facebookStoryType': value.facebookStoryType,
        'facebookRsvpType': value.facebookRsvpType,
        'eventSearchCondition': value.eventSearchCondition,
    };
}


