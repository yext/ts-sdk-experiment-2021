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

import { exists, mapValues } from '../runtime';
import {
    AtmAllOfDisplayCoordinate,
    AtmAllOfDisplayCoordinateFromJSON,
    AtmAllOfDisplayCoordinateFromJSONTyped,
    AtmAllOfDisplayCoordinateToJSON,
    AtmAllOfLogo,
    AtmAllOfLogoFromJSON,
    AtmAllOfLogoFromJSONTyped,
    AtmAllOfLogoToJSON,
    AtmAllOfMeta,
    AtmAllOfMetaFromJSON,
    AtmAllOfMetaFromJSONTyped,
    AtmAllOfMetaToJSON,
    JobAllOfLocation,
    JobAllOfLocationFromJSON,
    JobAllOfLocationFromJSONTyped,
    JobAllOfLocationToJSON,
} from './';

/**
 * 
 * @export
 * @interface JobAllOf
 */
export interface JobAllOf {
    /**
     * 
     * @type {AtmAllOfMeta}
     * @memberof JobAllOf
     */
    meta?: AtmAllOfMeta;
    /**
     * 
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * * a phone number
     * @type {string}
     * @memberof JobAllOf
     */
    name?: string;
    /**
     * The application URL
     * @type {string}
     * @memberof JobAllOf
     */
    applicationUrl?: string;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof JobAllOf
     */
    categoryIds?: Array<string>;
    /**
     * The date this entity was posted
     * @type {Date}
     * @memberof JobAllOf
     */
    datePosted?: Date;
    /**
     * A description of the entity
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof JobAllOf
     */
    description?: string;
    /**
     * 
     * @type {AtmAllOfDisplayCoordinate}
     * @memberof JobAllOf
     */
    displayCoordinate?: AtmAllOfDisplayCoordinate;
    /**
     * The employment type for the open job. Indicates whether the job is full-time, part-time, temporary, etc.
     * @type {string}
     * @memberof JobAllOf
     */
    employmentType?: JobAllOfEmploymentTypeEnum;
    /**
     * The unique IDs of the entity's Google My Business keywords, as well as the unique IDs of any values selected for each keyword.
     * 
     * Valid keywords (e.g., `has_drive_through`, `has_fitting_room`, `kitchen_in_room`) are determined by the entity's primary category. A full list of keywords can be retrieved with the Google Fields: List endpoint.
     * 
     * Keyword values provide more details on how the keyword applies to the entity (e.g., if the keyword is `has_drive_through`, its values may be `true` or `false`).
     * 
     * * If the **`v`** parameter is before `20181204`: **`googleAttributes`** is formatted as a map of key-value pairs (e.g., `[{ "id": "has_wheelchair_accessible_entrance", "values": [ "true" ] }]`)
     * * If the **`v`** parameter is on or after `20181204`: the contents are formatted as a list of objects (e.g., `{ "has_wheelchair_accessible_entrance": [ "true" ]}`)
     * 
     * **NOTE:** The latest Google Attributes are available via the Google Fields: List endpoint. Google Attributes are managed by Google and are subject to change without notice. To prevent errors, make sure your API implementation is not dependent on the presence of specific attributes.
     * @type {object}
     * @memberof JobAllOf
     */
    googleAttributes?: object;
    /**
     * The organization that is hiring for the open job
     * @type {string}
     * @memberof JobAllOf
     */
    hiringOrganization?: string;
    /**
     * Keywords that describe the entity.
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * 
     * Array item description:
     * 
     * >Cannot Include:
     * >* HTML markup
     * @type {Set<string>}
     * @memberof JobAllOf
     */
    keywords?: Set<string>;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<string>}
     * @memberof JobAllOf
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * @type {string}
     * @memberof JobAllOf
     */
    landingPageUrl?: string;
    /**
     * 
     * @type {JobAllOfLocation}
     * @memberof JobAllOf
     */
    location?: JobAllOfLocation;
    /**
     * 
     * @type {AtmAllOfLogo}
     * @memberof JobAllOf
     */
    logo?: AtmAllOfLogo;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof JobAllOf
     */
    nudgeEnabled?: boolean;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof JobAllOf
     */
    primaryConversationContact?: string;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * @type {string}
     * @memberof JobAllOf
     */
    timezone?: string;
    /**
     * The date this entity is valid through.
     * @type {Date}
     * @memberof JobAllOf
     */
    validThrough?: Date;
    /**
     * Indicates whether the job is remote.
     * @type {boolean}
     * @memberof JobAllOf
     */
    workRemote?: boolean;
}

/**
* @export
* @enum {string}
*/
export enum JobAllOfEmploymentTypeEnum {
    FullTime = 'FULL_TIME',
    PartTime = 'PART_TIME',
    Contractor = 'CONTRACTOR',
    Temporary = 'TEMPORARY',
    Intern = 'INTERN',
    Volunteer = 'VOLUNTEER',
    PerDiem = 'PER_DIEM',
    Other = 'OTHER'
}

export function JobAllOfFromJSON(json: any): JobAllOf {
    return JobAllOfFromJSONTyped(json, false);
}

export function JobAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : AtmAllOfMetaFromJSON(json['meta']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'applicationUrl': !exists(json, 'applicationUrl') ? undefined : json['applicationUrl'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'datePosted': !exists(json, 'datePosted') ? undefined : (new Date(json['datePosted'])),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'displayCoordinate': !exists(json, 'displayCoordinate') ? undefined : AtmAllOfDisplayCoordinateFromJSON(json['displayCoordinate']),
        'employmentType': !exists(json, 'employmentType') ? undefined : json['employmentType'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'hiringOrganization': !exists(json, 'hiringOrganization') ? undefined : json['hiringOrganization'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'location': !exists(json, 'location') ? undefined : JobAllOfLocationFromJSON(json['location']),
        'logo': !exists(json, 'logo') ? undefined : AtmAllOfLogoFromJSON(json['logo']),
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'validThrough': !exists(json, 'validThrough') ? undefined : (new Date(json['validThrough'])),
        'workRemote': !exists(json, 'workRemote') ? undefined : json['workRemote'],
    };
}

export function JobAllOfToJSON(value?: JobAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': AtmAllOfMetaToJSON(value.meta),
        'name': value.name,
        'applicationUrl': value.applicationUrl,
        'categoryIds': value.categoryIds,
        'datePosted': value.datePosted === undefined ? undefined : (value.datePosted.toISOString().substr(0,10)),
        'description': value.description,
        'displayCoordinate': AtmAllOfDisplayCoordinateToJSON(value.displayCoordinate),
        'employmentType': value.employmentType,
        'googleAttributes': value.googleAttributes,
        'hiringOrganization': value.hiringOrganization,
        'keywords': value.keywords,
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'location': JobAllOfLocationToJSON(value.location),
        'logo': AtmAllOfLogoToJSON(value.logo),
        'nudgeEnabled': value.nudgeEnabled,
        'primaryConversationContact': value.primaryConversationContact,
        'timezone': value.timezone,
        'validThrough': value.validThrough === undefined ? undefined : (value.validThrough.toISOString()),
        'workRemote': value.workRemote,
    };
}


