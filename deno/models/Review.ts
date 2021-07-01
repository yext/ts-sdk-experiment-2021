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
    ReviewComment,
    ReviewCommentFromJSON,
    ReviewCommentFromJSONTyped,
    ReviewCommentToJSON,
    ReviewLabel,
    ReviewLabelFromJSON,
    ReviewLabelFromJSONTyped,
    ReviewLabelToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface Review
 */
export interface Review {
    /**
     * ID of this review
     * @type {number}
     * @memberof Review
     */
    readonly id?: number;
    /**
     * ID of the location associated with this review
     * @type {string}
     * @memberof Review
     */
    locationId?: string;
    /**
     * ID of the account associated with this review
     * @type {string}
     * @memberof Review
     */
    accountId?: string;
    /**
     * For third-party reviews, the ID of publisher associated with this listing.
     * For first-party reviews, this will be FIRSTPARTY.
     * @type {string}
     * @memberof Review
     */
    readonly publisherId?: string;
    /**
     * Normalized rating out of 5.
     * This value is omitted if the review does not include a rating.
     * @type {number}
     * @memberof Review
     */
    rating?: number;
    /**
     * Title of the review.
     * This value is omitted if reviews on the publisher's site do not have titles.
     * @type {string}
     * @memberof Review
     */
    readonly title?: string;
    /**
     * Content of the review.
     * @type {string}
     * @memberof Review
     */
    content?: string;
    /**
     * The name of the person who wrote the review (if we have it).
     * @type {string}
     * @memberof Review
     */
    authorName?: string;
    /**
     * The email address of the person who wrote the review (if we have it).
     * @type {string}
     * @memberof Review
     */
    authorEmail?: string;
    /**
     * The URL of the review, or the URL of the listing where the review can be found if there is no specific URL for the review.
     * @type {string}
     * @memberof Review
     */
    readonly url?: string;
    /**
     * The timestamp of the review as reported by the publisher. If edits impact the review date on the publisher, then this date may change. This date always comes from the publisher and we respect whatever they have.
     * @type {number}
     * @memberof Review
     */
    readonly publisherDate?: number;
    /**
     * If the **`v`** parameter is before `20170512`: the timestamp of the review (including listing updates).
     * 
     * If the **`v`** parameter is `20170512` or later: the timestamp of the review (excluding listing updates), or the timestamp of the latest comment on the review.
     * @type {number}
     * @memberof Review
     */
    readonly lastYextUpdateTime?: number;
    /**
     * The current status of the review; only returned for First Party and External First Party reviews. Defaults to `QUARANTINED` when creating.
     * @type {string}
     * @memberof Review
     */
    status?: ReviewStatusEnum;
    /**
     * Indicates whether the review has been flagged for inappropriate or irrelevant content. Note that only First Party and External First Party reviews can be flagged.
     * @type {string}
     * @memberof Review
     */
    flagStatus?: ReviewFlagStatusEnum;
    /**
     * The language of the review, if identified.
     * @type {string}
     * @memberof Review
     */
    reviewLanguage?: string;
    /**
     * An ordered array of Comments on the review.
     * 
     * **NOTE:** The order is a flattened tree with depth ties broken by publisher date.
     * @type {Array<ReviewComment>}
     * @memberof Review
     */
    readonly comments?: Array<ReviewComment>;
    /**
     * If the **`v`** parameter is before `20180710`: The IDs of the review labels added to the review.
     * 
     * If the **`v`** parameter is `20180710` or later: Not present.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<number>}
     * @memberof Review
     */
    readonly labelIds?: Array<number>;
    /**
     * If the **`v`** parameter is before `20180710`: Not present.
     * 
     * If the **`v`** parameter is `20180710` or later: The names and IDs of the review labels added to the review.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<ReviewLabel>}
     * @memberof Review
     */
    readonly reviewLabels?: Array<ReviewLabel>;
    /**
     * If the **`v`** parameter is before `20181002`: Not present.
     * 
     * If the **`v`** parameter is `20181002` or later: Indicates whether the review is a rating or a recommendation.
     * 
     * **NOTE:** Only applicable to Facebook reviews.
     * @type {string}
     * @memberof Review
     */
    readonly reviewType?: ReviewReviewTypeEnum;
    /**
     * If the **`v`** parameter is before `20181002`: Not present.
     * 
     * If the **`v`** parameter is `20181002` or later: Indicates whether the consumer recommends the entity being reviewed.
     * 
     * **NOTE:** Only applicable to Facebook reviews.
     * @type {string}
     * @memberof Review
     */
    readonly recommendation?: ReviewRecommendationEnum;
    /**
     * If present, the transaction ID associated with the invitation that resulted in this review.
     * @type {string}
     * @memberof Review
     */
    transactionId?: string;
    /**
     * If present, the ID associated with the invitation that resulted in this review.
     * @type {string}
     * @memberof Review
     */
    invitationId?: string;
}

/**
* @export
* @enum {string}
*/
export enum ReviewStatusEnum {
    Live = 'LIVE',
    Quarantined = 'QUARANTINED',
    Removed = 'REMOVED'
}/**
* @export
* @enum {string}
*/
export enum ReviewFlagStatusEnum {
    Flagged = 'FLAGGED',
    NotFlagged = 'NOT_FLAGGED'
}/**
* @export
* @enum {string}
*/
export enum ReviewReviewTypeEnum {
    Rating = 'Rating',
    Recommendation = 'Recommendation'
}/**
* @export
* @enum {string}
*/
export enum ReviewRecommendationEnum {
    Recommended = 'Recommended',
    NotRecommended = 'Not Recommended'
}

export function ReviewFromJSON(json: any): Review {
    return ReviewFromJSONTyped(json, false);
}

export function ReviewFromJSONTyped(json: any, ignoreDiscriminator: boolean): Review {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'locationId': !exists(json, 'locationId') ? undefined : json['locationId'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'publisherId': !exists(json, 'publisherId') ? undefined : json['publisherId'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'authorName': !exists(json, 'authorName') ? undefined : json['authorName'],
        'authorEmail': !exists(json, 'authorEmail') ? undefined : json['authorEmail'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'publisherDate': !exists(json, 'publisherDate') ? undefined : json['publisherDate'],
        'lastYextUpdateTime': !exists(json, 'lastYextUpdateTime') ? undefined : json['lastYextUpdateTime'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'flagStatus': !exists(json, 'flagStatus') ? undefined : json['flagStatus'],
        'reviewLanguage': !exists(json, 'reviewLanguage') ? undefined : json['reviewLanguage'],
        'comments': !exists(json, 'comments') ? undefined : ((json['comments'] as Array<any>).map(ReviewCommentFromJSON)),
        'labelIds': !exists(json, 'labelIds') ? undefined : json['labelIds'],
        'reviewLabels': !exists(json, 'reviewLabels') ? undefined : ((json['reviewLabels'] as Array<any>).map(ReviewLabelFromJSON)),
        'reviewType': !exists(json, 'reviewType') ? undefined : json['reviewType'],
        'recommendation': !exists(json, 'recommendation') ? undefined : json['recommendation'],
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'invitationId': !exists(json, 'invitationId') ? undefined : json['invitationId'],
    };
}

export function ReviewToJSON(value?: Review | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'locationId': value.locationId,
        'accountId': value.accountId,
        'rating': value.rating,
        'content': value.content,
        'authorName': value.authorName,
        'authorEmail': value.authorEmail,
        'status': value.status,
        'flagStatus': value.flagStatus,
        'reviewLanguage': value.reviewLanguage,
        'transactionId': value.transactionId,
        'invitationId': value.invitationId,
    };
}


