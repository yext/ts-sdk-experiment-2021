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
import {
    CustomEntityTypes,
    CustomEntityTypesFromJSON,
    CustomEntityTypesFromJSONTyped,
    CustomEntityTypesToJSON,
    CustomFieldAllOf,
    CustomFieldAllOfFromJSON,
    CustomFieldAllOfFromJSONTyped,
    CustomFieldAllOfToJSON,
    CustomFieldUpdate,
    CustomFieldUpdateFromJSON,
    CustomFieldUpdateFromJSONTyped,
    CustomFieldUpdateToJSON,
    CustomFieldUpdateDescription,
    CustomFieldUpdateDescriptionFromJSON,
    CustomFieldUpdateDescriptionFromJSONTyped,
    CustomFieldUpdateDescriptionToJSON,
    CustomFieldUpdateName,
    CustomFieldUpdateNameFromJSON,
    CustomFieldUpdateNameFromJSONTyped,
    CustomFieldUpdateNameToJSON,
    CustomOption,
    CustomOptionFromJSON,
    CustomOptionFromJSONTyped,
    CustomOptionToJSON,
    CustomValidation,
    CustomValidationFromJSON,
    CustomValidationFromJSONTyped,
    CustomValidationToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface CustomField
 */
export interface CustomField {
    /**
     * 
     * @type {CustomFieldUpdateName}
     * @memberof CustomField
     */
    name: CustomFieldUpdateName;
    /**
     * Present if and only if `type` is `SINGLE_OPTION` or `MULTI_OPTION`.
     * 
     * List of options (key, value, and translations) for the Custom Field.
     * 
     * **Example:**
     * {
     *   {
     *     "key": "TEMPORARILY_CLOSED",
     *     "value": "Temporarily Closed"
     *   },
     *   {
     *     "key": "COMING_SOON",
     *     "value": "Coming Soon"
     *   },
     *   {
     *     "key": "CLOSED",
     *     "value": "Closed"
     *     "translations": [
     *       {
     *         "languageCode": "fr",
     *         "value": "Fermé"
     *       }
     *     ]
     *   },
     *   {
     *     "key": "OPEN",
     *     "value": "Open"
     *   }
     * }
     * 
     * The behavior of the options' keys depends on which Custom Fields endpoint you are using:
     * * Get and List: The options' keys will be included in the response.
     * * Create: Do not specify option keys. They will be automatically assigned when the field is created.
     * * Update: If you include an option with an existing key, the option with that key will be updated with the value you specify. If you would like to add an option, specify its value but not its key, as the key will be automatically assigned when the option is added.
     *     * **NOTE:** If you do not include an existing option in your Update request, it will be deleted.
     * @type {Array<CustomOption>}
     * @memberof CustomField
     */
    options?: Array<CustomOption>;
    /**
     * The Custom Field's group.
     * @type {string}
     * @memberof CustomField
     */
    group?: CustomFieldGroupEnum;
    /**
     * 
     * @type {CustomFieldUpdateDescription}
     * @memberof CustomField
     */
    description?: CustomFieldUpdateDescription;
    /**
     * Custom Field multi-language profile behavior, which is one of:
     * 
     * `PRIMARY_ONLY`: The Custom Field can only have a value set on its primary language profile.
     * 
     * `OVERRIDABLE`: The Custom Field can have a value set on any alternate language profiles, which will override the primary language profile value when the alternate language profile is requested. When requested, if a value is not set for an alternate language profile, the primary language profile value will be returned.
     * 
     * `LANGUAGE_SPECIFIC`: The Custom Field can have a value set on any alternate language profiles. When requested, if a value is not set for an alternate language profile, no value will be returned.
     * @type {string}
     * @memberof CustomField
     */
    alternateLanguageBehavior?: string;
    /**
     * 
     * @type {CustomValidation}
     * @memberof CustomField
     */
    validation?: CustomValidation;
    /**
     * A list of entity types that the Custom Field is available to.
     * @type {Array<CustomEntityTypes>}
     * @memberof CustomField
     */
    entityAvailability?: Array<CustomEntityTypes>;
    /**
     * 
     * ID that should be used when referencing the field in API calls. This ID will also serve as the Custom Field's key in our upcoming Entities API endpoints.
     * Note that in Locations endpoints, Custom Fields are still referenced by their numeric **`id`**, which can be obtained by calling the Custom Fields: List endpoint with a **`v`** param before `20180809`.
     * (For Create requests) Must have a prefix of `c_` and contain only alphanumeric characters or underscores.
     * @type {string}
     * @memberof CustomField
     */
    id?: string;
    /**
     * 
     * The data type of the Custom Field's contents.
     * Note that the `LOCATION_LIST` type has been renamed to `ENTITY_LIST`. The former can still be obtained by calling Custom Fields endpoints with a **`v`** param before `20180809`.
     * @type {string}
     * @memberof CustomField
     */
    type: CustomFieldTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum CustomFieldGroupEnum {
    None = 'NONE',
    Group1 = 'GROUP_1',
    Group2 = 'GROUP_2',
    Group3 = 'GROUP_3',
    Group4 = 'GROUP_4',
    Group5 = 'GROUP_5',
    Group6 = 'GROUP_6',
    Group7 = 'GROUP_7',
    Group8 = 'GROUP_8',
    Group9 = 'GROUP_9',
    Group10 = 'GROUP_10',
    Group11 = 'GROUP_11',
    Group12 = 'GROUP_12',
    Group13 = 'GROUP_13',
    Group14 = 'GROUP_14',
    Group15 = 'GROUP_15',
    Group16 = 'GROUP_16',
    Group17 = 'GROUP_17',
    Group18 = 'GROUP_18',
    Group19 = 'GROUP_19',
    Group20 = 'GROUP_20',
    Group21 = 'GROUP_21',
    Group22 = 'GROUP_22',
    Group23 = 'GROUP_23',
    Group24 = 'GROUP_24',
    Group25 = 'GROUP_25',
    Group26 = 'GROUP_26',
    Group27 = 'GROUP_27',
    Group28 = 'GROUP_28',
    Group29 = 'GROUP_29',
    Group30 = 'GROUP_30'
}/**
* @export
* @enum {string}
*/
export enum CustomFieldTypeEnum {
    Boolean = 'BOOLEAN',
    Cta = 'CTA',
    DailyTimes = 'DAILY_TIMES',
    Date = 'DATE',
    Gallery = 'GALLERY',
    Hours = 'HOURS',
    EntityList = 'ENTITY_LIST',
    MultilineText = 'MULTILINE_TEXT',
    MultiOption = 'MULTI_OPTION',
    Number = 'NUMBER',
    Photo = 'PHOTO',
    RichText = 'RICH_TEXT',
    SingleOption = 'SINGLE_OPTION',
    Text = 'TEXT',
    TextList = 'TEXT_LIST',
    Url = 'URL',
    Video = 'VIDEO',
    VideoGallery = 'VIDEO_GALLERY'
}

export function CustomFieldFromJSON(json: any): CustomField {
    return CustomFieldFromJSONTyped(json, false);
}

export function CustomFieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomField {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': CustomFieldUpdateNameFromJSON(json['name']),
        'options': !exists(json, 'options') ? undefined : ((json['options'] as Array<any>).map(CustomOptionFromJSON)),
        'group': !exists(json, 'group') ? undefined : json['group'],
        'description': !exists(json, 'description') ? undefined : CustomFieldUpdateDescriptionFromJSON(json['description']),
        'alternateLanguageBehavior': !exists(json, 'alternateLanguageBehavior') ? undefined : json['alternateLanguageBehavior'],
        'validation': !exists(json, 'validation') ? undefined : CustomValidationFromJSON(json['validation']),
        'entityAvailability': !exists(json, 'entityAvailability') ? undefined : ((json['entityAvailability'] as Array<any>).map(CustomEntityTypesFromJSON)),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'type': json['type'],
    };
}

export function CustomFieldToJSON(value?: CustomField | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': CustomFieldUpdateNameToJSON(value.name),
        'options': value.options === undefined ? undefined : ((value.options as Array<any>).map(CustomOptionToJSON)),
        'group': value.group,
        'description': CustomFieldUpdateDescriptionToJSON(value.description),
        'alternateLanguageBehavior': value.alternateLanguageBehavior,
        'validation': CustomValidationToJSON(value.validation),
        'entityAvailability': value.entityAvailability === undefined ? undefined : ((value.entityAvailability as Array<any>).map(CustomEntityTypesToJSON)),
        'id': value.id,
        'type': value.type,
    };
}


