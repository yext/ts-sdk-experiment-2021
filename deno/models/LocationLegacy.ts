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
    LocationLegacyClosed,
    LocationLegacyClosedFromJSON,
    LocationLegacyClosedFromJSONTyped,
    LocationLegacyClosedToJSON,
    LocationLegacyCompetitors,
    LocationLegacyCompetitorsFromJSON,
    LocationLegacyCompetitorsFromJSONTyped,
    LocationLegacyCompetitorsToJSON,
    LocationLegacyEducationList,
    LocationLegacyEducationListFromJSON,
    LocationLegacyEducationListFromJSONTyped,
    LocationLegacyEducationListToJSON,
    LocationLegacyFacebookCallToAction,
    LocationLegacyFacebookCallToActionFromJSON,
    LocationLegacyFacebookCallToActionFromJSONTyped,
    LocationLegacyFacebookCallToActionToJSON,
    LocationLegacyGoogleAttributes,
    LocationLegacyGoogleAttributesFromJSON,
    LocationLegacyGoogleAttributesFromJSONTyped,
    LocationLegacyGoogleAttributesToJSON,
    LocationLegacyHolidayHours,
    LocationLegacyHolidayHoursFromJSON,
    LocationLegacyHolidayHoursFromJSONTyped,
    LocationLegacyHolidayHoursToJSON,
    LocationLegacyServiceArea,
    LocationLegacyServiceAreaFromJSON,
    LocationLegacyServiceAreaFromJSONTyped,
    LocationLegacyServiceAreaToJSON,
    LocationPhoto,
    LocationPhotoFromJSON,
    LocationPhotoFromJSONTyped,
    LocationPhotoToJSON,
    LocationType,
    LocationTypeFromJSON,
    LocationTypeFromJSONTyped,
    LocationTypeToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface LocationLegacy
 */
export interface LocationLegacy {
    /**
     * Primary key. Unique alphanumeric (Latin-1) ID assigned by the Customer.
     * @type {string}
     * @memberof LocationLegacy
     */
    id?: string;
    /**
     * A static globally unique id for the location. Note that this field cannot be used in place of the location id in API calls to get or update location information.
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly uid?: string;
    /**
     * Must refer to an **account.id** that already exists.
     * @type {string}
     * @memberof LocationLegacy
     */
    accountId?: string;
    /**
     * The timestamp of the most recent change to this location record.  Will be ignored when the client is saving location data to Yext.
     * 
     * **NOTE:** The timestamp may change even if observable fields stay the same.
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly timestamp?: number;
    /**
     * The timezone of the location
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly timezone?: string;
    /**
     * 
     * @type {LocationType}
     * @memberof LocationLegacy
     */
    locationType?: LocationType;
    /**
     * Cannot include:
     * * inappropriate language
     * * HTML markup or entities
     * * a URL or domain name
     * * a phone number
     * * control characters ([\x00-\x1F\x7F])
     * 
     * Should be in appropriate letter case (e.g., not in all capital letters)
     * @type {string}
     * @memberof LocationLegacy
     */
    locationName?: string;
    /**
     * The first name of the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {string}
     * @memberof LocationLegacy
     */
    firstName?: string;
    /**
     * The middle name of the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {string}
     * @memberof LocationLegacy
     */
    middleName?: string;
    /**
     * The last name of the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {string}
     * @memberof LocationLegacy
     */
    lastName?: string;
    /**
     * The name of the office where the healthcare professional works, if different from **locationName**
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {string}
     * @memberof LocationLegacy
     */
    officeName?: string;
    /**
     * The gender of the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {string}
     * @memberof LocationLegacy
     */
    gender?: LocationLegacyGenderEnum;
    /**
     * The National Provider Identifier (NPI) of the healthcare provider
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL` or `HEALTHCARE_FACILITY`.
     * @type {string}
     * @memberof LocationLegacy
     */
    npi?: string;
    /**
     * Must be a valid address
     * 
     * Cannot be a P.O. Box
     * @type {string}
     * @memberof LocationLegacy
     */
    address?: string;
    /**
     * Cannot be a P.O. Box
     * @type {string}
     * @memberof LocationLegacy
     */
    address2?: string;
    /**
     * If true, do not show street address on listings. Defaults to false.
     * @type {boolean}
     * @memberof LocationLegacy
     */
    suppressAddress?: boolean;
    /**
     * Provides additional information to help consumers get to the location. This string appears along with the location's address (e.g., In Menlo Mall, 3rd Floor).
     * 
     * It may also be used in conjunction with a hidden address (i.e., when **suppressAddress** is true) to give consumers information about where the location is found (e.g., Servicing the New York area).
     * 
     * Cannot be a P.O. Box
     * @type {string}
     * @memberof LocationLegacy
     */
    displayAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof LocationLegacy
     */
    city?: string;
    /**
     * For US locations, the two-character code of the location’s state, or DC for the District of Columbia
     * For non-US locations, the name of the location’s province / region / state
     * @type {string}
     * @memberof LocationLegacy
     */
    state?: string;
    /**
     * The name of the location's sublocality.
     * @type {string}
     * @memberof LocationLegacy
     */
    sublocality?: string;
    /**
     * The location's postal code. For US locations, this field contains the five- or nine-digit ZIP code (the hyphen is optional). Validations are only done on `zip` if `countryCode` is US.
     * @type {string}
     * @memberof LocationLegacy
     */
    zip?: string;
    /**
     * The two-character ISO 3166-1 code of the location's country or region. If omitted, US is used.
     * @type {string}
     * @memberof LocationLegacy
     */
    countryCode?: string;
    /**
     * 
     * @type {LocationLegacyServiceArea}
     * @memberof LocationLegacy
     */
    serviceArea?: LocationLegacyServiceArea;
    /**
     * Must be a valid phone number.
     * @type {string}
     * @memberof LocationLegacy
     */
    phone?: string;
    /**
     * Set to true if the number listed in **phone** is a tracked phone number.
     * 
     * **NOTE:** When updating **isPhoneTracked**, you must provide a value for **phone** in the same request.
     * @type {boolean}
     * @memberof LocationLegacy
     */
    isPhoneTracked?: boolean;
    /**
     * Must be a valid, non-toll-free phone number.
     * 
     * Required if:
     * * **isPhoneTracked** is true and the non-tracked number is a toll-free number, **OR**
     * * **isPhoneTracked** is false and **phone** is a toll-free number
     * @type {string}
     * @memberof LocationLegacy
     */
    localPhone?: string;
    /**
     * Must be a valid phone number, based on the country specified in `countryCode`. Phone numbers for US locations must contain 10 digits.
     * @type {string}
     * @memberof LocationLegacy
     */
    alternatePhone?: string;
    /**
     * Must be a valid phone number, based on the country specified in `countryCode`. Phone numbers for US locations must contain 10 digits.
     * @type {string}
     * @memberof LocationLegacy
     */
    faxPhone?: string;
    /**
     * Must be a valid phone number, based on the country specified in `countryCode`. Phone numbers for US locations must contain 10 digits.
     * @type {string}
     * @memberof LocationLegacy
     */
    mobilePhone?: string;
    /**
     * Must be a valid phone number, based on the country specified in `countryCode`. Phone numbers for US locations must contain 10 digits.
     * @type {string}
     * @memberof LocationLegacy
     */
    tollFreePhone?: string;
    /**
     * Must be a valid phone number, based on the country specified in `countryCode`. Phone numbers for US locations must contain 10 digits.
     * @type {string}
     * @memberof LocationLegacy
     */
    ttyPhone?: string;
    /**
     * Yext Category IDs. A Location must have at least one and at most 10 Categories.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * **NOTE:** The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    categoryIds?: Array<string>;
    /**
     * The Featured Message. Default: Call today!
     * 
     * Cannot include:
     * * inappropriate language
     * * HTML markup
     * * a URL or domain name
     * * a phone number
     * * control characters ([\x00-\x1F\x7F])
     * * insufficient spacing
     * 
     * If you submit a Featured Message that contains profanity or more than 50 characters, it will be ignored. The success response will contain a warning message explaining why your Featured Message wasn't stored in the system.
     * @type {string}
     * @memberof LocationLegacy
     */
    featuredMessage?: string;
    /**
     * Valid URL to which the Featured Message is linked
     * @type {string}
     * @memberof LocationLegacy
     */
    featuredMessageUrl?: string;
    /**
     * The URL of the location's website. This URL will be shown on your listings unless you specify a value for `displayWebsiteUrl`.
     * 
     * Must be a valid URL and is required whenever `displayWebsiteUrl` is specified.
     * @type {string}
     * @memberof LocationLegacy
     */
    websiteUrl?: string;
    /**
     * The URL that is shown on your listings in place of `websiteUrl`. You can use `displayWebsiteUrl` to display a short, memorable web address that redirects consumers to the URL given in `websiteUrl`.
     * 
     * Must be a valid URL and be specified along with `websiteUrl`.
     * @type {string}
     * @memberof LocationLegacy
     */
    displayWebsiteUrl?: string;
    /**
     * A valid URL used for reservations at this location.
     * @type {string}
     * @memberof LocationLegacy
     */
    reservationUrl?: string;
    /**
     * The URL that is shown on your listings in place of `reservationUrl`. You can use `displayReservationUrl` to display a short, memorable web address that redirects consumers to the URL given in `reservationUrl`.
     * 
     * Must be a valid URL and be specified along with `reservationUrl`.
     * @type {string}
     * @memberof LocationLegacy
     */
    displayReservationUrl?: string;
    /**
     * The URL of the location's menu.
     * @type {string}
     * @memberof LocationLegacy
     */
    menuUrl?: string;
    /**
     * The URL that is shown on your listings in place of `menuUrl`. You can use `displayMenuUrl` to display a short, memorable web address that redirects consumers to the URL given in `menuUrl`.
     * 
     * Must be a valid URL and be specified along with `menuUrl`.
     * @type {string}
     * @memberof LocationLegacy
     */
    displayMenuUrl?: string;
    /**
     * The URL used to place orders that will be fulfilled at the location.
     * @type {string}
     * @memberof LocationLegacy
     */
    orderUrl?: string;
    /**
     * The URL that is shown on your listings in place of `orderUrl`. You can use `displayOrderUrl` to display a short, memorable web address that redirects consumers to the URL given in `orderUrl`.
     * 
     * Must be a valid URL and be specified along with `orderUrl`.
     * @type {string}
     * @memberof LocationLegacy
     */
    displayOrderUrl?: string;
    /**
     * Hours should be submitted as a comma-separated list of days, where each day's hours are specified as follows:
     * 
     * d:oh:om:ch:cm
     * * d = day of the week –
     *   * 1 – Sunday
     *   * 2 – Monday
     *   * 3 – Tuesday
     *   * 4 – Wednesday
     *   * 5 – Thursday
     *   * 6 – Friday
     *   * 7 – Saturday
     * * oh:om = opening time in 24-hour format
     * * ch:cm = closing time in 24-hour format
     * 
     * Times with single-digit hours (e.g., 9 AM) can be submitted with or without a leading zero (9:00 or 09:00).
     * 
     * **Example:** open 9 AM to 5 PM Monday and Tuesday, open 10 AM to 4 PM on Saturday – 2:9:00:17:00,3:9:00:17:00,7:10:00:16:00
     * 
     * SPECIAL CASES:
     * * To indicate that a location is open 24 hours on a specific day, set 00:00 as both the opening and closing time for that day.
     *   * **Example:** open all day on Saturdays – 7:00:00:00:00
     * * To indicate that a location is closed on a specific day, omit that day from the list or set it as closed ("closed" is not case sensitive).
     *   * **Example:** closed on Sundays – 1:closed
     *   * **NOTE:** If a location is closed seven days a week, set at least one day to closed. Otherwise, **hours** is an empty string, and we assume you are not submitting hours information for that location.
     * * To indicate that a location has split hours on a specific day, submit a set of hours for each block of time the location is open.
     *   * **Example:** open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM on Mondays – 2:9:00:12:00,2:13:00:17:00
     * 
     * **NOTE:** To set hours for specific days of the year rather than days of the week, use **holidayHours**.
     * @type {string}
     * @memberof LocationLegacy
     */
    hours?: string;
    /**
     * Additional information about business hours that does not fit in **hours** (e.g., Closed during the winter)
     * @type {string}
     * @memberof LocationLegacy
     */
    additionalHoursText?: string;
    /**
     * Holiday hours for this location.
     * 
     * **NOTE:** hours must be set in order for holidayHours to appear on your listings)
     * @type {Array<LocationLegacyHolidayHours>}
     * @memberof LocationLegacy
     */
    holidayHours?: Array<LocationLegacyHolidayHours>;
    /**
     * 
     * @type {string}
     * @memberof LocationLegacy
     */
    description?: string;
    /**
     * A list of the conditions treated by the healthcare provider
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL` or `HEALTHCARE_FACILITY`.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    conditionsTreated?: Array<string>;
    /**
     * A list of the certifications held by the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    certifications?: Array<string>;
    /**
     * A list of the types of education and training completed by the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {Array<LocationLegacyEducationList>}
     * @memberof LocationLegacy
     */
    educationList?: Array<LocationLegacyEducationList>;
    /**
     * A list of the degrees earned by the healthcare professional
     * 
     * **NOTE:**  This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * 
     * Valid values:
     * 
     * * `ANP` (Adult Nurse Practitioner)
     * * `APN` (Advanced Practice Nurse)
     * * `APRN` (Advanced Practice Registered Nurse)
     * * `ARNP` (Advanced Registered Nurse Practitioner)
     * * `CNM` (Certified Nurse Midwife)
     * * `CNP` (Certified Nurse Practitioner)
     * * `CNS` (Clinical Nurse Specialist)
     * * `CPNP` (Certified Pediatric Nurse Practitioner)
     * * `CRNA` (Certified Registered Nurse Anesthetist)
     * * `CRNP` (Certified Registered Nurse Practitioner)
     * * `DC` (Doctor of Chiropractic)
     * * `DDS` (Doctor of Dental Surgery)
     * * `DMD` (Doctor of Dental Medicine)
     * * `DO` (Doctor of Osteopathy)
     * * `DPM` (Doctor of Podiatric Medicine)
     * * `DVM` (Doctor of Veterinary Medicine)
     * * `FNP` (Family Nurse Practitioner)
     * * `GNP` (Geriatric Nurse Practitioner)
     * * `LAC` (Licensed Acupuncturist)
     * * `LPN` (Licensed Practical Nurse)
     * * `MD` (Medical Doctor)
     * * `ND` (Naturopathic Doctor)
     * * `NP` (Nurse Practitioner)
     * * `OD` (Doctor of Optometry)
     * * `PA` (Physician Assistant)
     * * `PAC` (Physician Assistant Certified)
     * * `PHARMD` (Doctor of Pharmacy)
     * * `PHD` (Doctor of Philosophy)
     * * `PNP` (Pediatric Nurse Practitioner)
     * * `VMD` (Veterinary Medical Doctor)
     * * `WHNP` (Womens Health Nurse Practitioner)
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    degrees?: Array<string>;
    /**
     * A list of hospitals where the healthcare professional admits patients
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    admittingHospitals?: Array<string>;
    /**
     * Indicates whether the healthcare provider is accepting new patients
     * 
     * Default is true
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL` or `HEALTHCARE_FACILITY`.
     * @type {boolean}
     * @memberof LocationLegacy
     */
    acceptingNewPatients?: boolean;
    /**
     * 
     * @type {LocationLegacyClosed}
     * @memberof LocationLegacy
     */
    closed?: LocationLegacyClosed;
    /**
     * The payment methods accepted at this location
     * 
     * Valid elements depend on the location's country. For US locations, valid elements are:
     * * AMERICANEXPRESS
     * * CASH
     * * CHECK
     * * DINERSCLUB
     * * DISCOVER
     * * FINANCING
     * * INVOICE
     * * MASTERCARD
     * * TRAVELERSCHECK
     * * VISA
     * * ANDROIDPAY
     * * APPLEPAY
     * * SAMSUNGPAY
     * * BITCOIN
     * * PAYPAL
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    paymentOptions?: Array<string>;
    /**
     * A list of insurance policies accepted by the healthcare provider
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    insuranceAccepted?: Array<string>;
    /**
     * 
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    logo?: LocationPhoto;
    /**
     * Up to 50 Photos.
     * 
     * **NOTE:** The list of photos that you send us must be comprehensive. For example, if you send us a list of photos that does not include photos that you sent in your last update, Yext considers the missing photos to be deleted, and we remove them from your listings.
     * @type {Array<LocationPhoto>}
     * @memberof LocationLegacy
     */
    photos?: Array<LocationPhoto>;
    /**
     * A portrait of the healthcare professional
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `HEALTHCARE_PROFESSIONAL`.
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    headshot?: LocationPhoto;
    /**
     * Valid YouTube URLs for embedding a video on some publisher sites.
     * 
     * **NOTE:** Currently, only the first URL in the Array appears in your listings.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    videoUrls?: Array<string>;
    /**
     * Valid Instagram username for the location (e.g., NewCityFiat (without the leading "@"))
     * @type {string}
     * @memberof LocationLegacy
     */
    instagramHandle?: string;
    /**
     * Valid Twitter handle for the location (e.g., JohnSmith (without the leading '@')).
     * If you submit an invalid Twitter handle, it will be ignored. The success response will contain a warning message explaining why your Twitter handle wasn't stored in the system.
     * @type {string}
     * @memberof LocationLegacy
     */
    twitterHandle?: string;
    /**
     * The URL you would like to submit to Google My Business in place of the one given in **websiteUrl** (if applicable).
     * 
     * For example, if you want to analyze the traffic driven by your Google listings separately from other traffic, enter the alternate URL that you will use for tracking in this field.
     * @type {string}
     * @memberof LocationLegacy
     */
    googleWebsiteOverride?: string;
    /**
     * The cover photo for your business's Google profile
     * 
     * NOTE: Your cover photo must meet all of the following requirements:
     * * have a 16:9 aspect ratio
     * * be at least 480 x 270 pixels
     * * be no more than 2120 x 1192 pixels
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    googleCoverPhoto?: LocationPhoto;
    /**
     * The profile photo for your business's Google profile
     * 
     * **NOTE:** Your profile picture must meet all of the following requirements:
     * * be a square
     * * be at least 250 x 250 pixels
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    googleProfilePhoto?: LocationPhoto;
    /**
     * The Google My Business attributes for this location.
     * @type {Array<LocationLegacyGoogleAttributes>}
     * @memberof LocationLegacy
     */
    googleAttributes?: Array<LocationLegacyGoogleAttributes>;
    /**
     * URL for the location's Facebook Page.
     * 
     * Valid formats:
     * * facebook.com/profile.php?id=[numId]
     * * facebook.com/group.php?gid=[numId]
     * * facebook.com/groups/[numId]
     * * facebook.com/[Name]
     * * facebook.com/pages/[Name]/[numId]
     * 
     * where [Name] is a String and [numId] is an Integer
     * 
     * If you submit a URL that is not in one of the valid formats, it will be ignored. The success response will contain a warning message explaining why the URL wasn't stored in the system.
     * 
     * **NOTE:** This value is automatically set to the location's Facebook Page URL. You can only manually set **facebookPageUrl** if the location meets one of the following criteria:
     * * It is not subscribed to a Listings package that contains Facebook.
     * * It is opted out of Facebook.
     * @type {string}
     * @memberof LocationLegacy
     */
    facebookPageUrl?: string;
    /**
     * 
     * @type {LocationLegacyFacebookCallToAction}
     * @memberof LocationLegacy
     */
    facebookCallToAction?: LocationLegacyFacebookCallToAction;
    /**
     * The cover photo for your business's Facebook profile
     * 
     * Displayed as a 851 x 315 pixel image
     * 
     * You must have a cover photo in order for your listing to appear on Facebook.
     * 
     * **NOTE:** Your cover photo must be at least 400 pixels wide.
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    facebookCoverPhoto?: LocationPhoto;
    /**
     * The profile picture for your business's Facebook profile
     * 
     * You must have a profile picture in order for your listing to appear on Facebook.
     * 
     * **NOTE:** Your profile picture must be larger than 180 x 180 pixels.
     * @type {LocationPhoto}
     * @memberof LocationLegacy
     */
    facebookProfilePicture?: LocationPhoto;
    /**
     * Indicates whether the embedded Uber link for this location appears as text or a button
     * 
     * When consumers click on this link on a mobile device, the Uber app (if installed) will open with your location set as the trip destination. If the Uber app is not installed, the consumer will be prompted to download it.
     * @type {string}
     * @memberof LocationLegacy
     */
    uberLinkType?: LocationLegacyUberLinkTypeEnum;
    /**
     * The text of the embedded Uber link
     * 
     * Default is "Ride there with Uber".
     * 
     * **NOTE:** This field is only available if **uberLinkType** is LINK.
     * @type {string}
     * @memberof LocationLegacy
     */
    uberLinkText?: string;
    /**
     * The text of the call-to-action that will appear in the Uber app during a trip to your location (e.g., Check out our menu!)
     * 
     * **NOTE:** If a value for **uberTripBrandingText** is provided, values must also be provided for **uberTripBrandingUrl** and **uberTripBrandingDescription**.
     * @type {string}
     * @memberof LocationLegacy
     */
    uberTripBrandingText?: string;
    /**
     * The URL that the consumer will be redirected to when tapping on the call-to-action in the Uber app during a trip to your location.
     * 
     * **NOTE:** If a value for **uberTripBrandingUrl** is provided, values must also be provided for **uberTripBrandingText** and **uberTripBrandingDescription**.
     * @type {string}
     * @memberof LocationLegacy
     */
    uberTripBrandingUrl?: string;
    /**
     * A longer description that will appear near the call-to-action in the Uber app during a trip to your location.
     * 
     * **NOTE:** If a value for **uberTripBrandingDescription** is provided, values must also be provided for **uberTripBrandingText** and **uberTripBrandingUrl**.
     * @type {string}
     * @memberof LocationLegacy
     */
    uberTripBrandingDescription?: string;
    /**
     * The Yext-powered code that can be copied and pasted into the markup of emails or web pages where the embedded Uber link should appear
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly uberEmbedCode?: string;
    /**
     * The Yext-powered link that can be copied and pasted into the markup of Yext Pages where the embedded Uber link should appear
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly uberLink?: string;
    /**
     * The Uber universal link for the location.
     * 
     * For more information on universal links, see Uber's developer documentation.
     * 
     * **NOTE**: This field is only available in the LiveAPI and only for US locations. 
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly uberLinkRaw?: string;
    /**
     * The year that this location was opened, not the number of years it was open
     * 
     * Minimum of 1000, maximum of current year + 10.
     * @type {string}
     * @memberof LocationLegacy
     */
    yearEstablished?: string;
    /**
     * Latitude where the map pin should be displayed, as provided by you
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    displayLat?: number;
    /**
     * Longitude where the map pin should be displayed, as provided by you
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    displayLng?: number;
    /**
     * Latitude to use for driving directions to the location, as provided by you
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    routableLat?: number;
    /**
     * Longitude to use for driving directions to the location, as provided by you
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    routableLng?: number;
    /**
     * Latitude to use for walking directions to the location, as provided by you
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    walkableLat?: number;
    /**
     * Longitude to use for walking directions to the location, as provided by you
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    walkableLng?: number;
    /**
     * Latitude to use for pickup spot for the location, as provided by you
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    pickupLat?: number;
    /**
     * Longitude to use for pickup spot for the location, as provided by you
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    pickupLng?: number;
    /**
     * Latitude to use for drop off spot for the location, as provided by you
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    dropoffLat?: number;
    /**
     * Longitude to use for drop off spot for the location, as provided by you
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    dropoffLng?: number;
    /**
     * Latitude where the map pin should be displayed, as calculated by Yext
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextDisplayLat?: number;
    /**
     * Longitude where the map pin should be displayed, as calculated by Yext
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextDisplayLng?: number;
    /**
     * Latitude to use for driving directions to the location, as calculated by Yext
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextRoutableLat?: number;
    /**
     * Longitude to use for driving directions to the location, as calculated by Yext
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextRoutableLng?: number;
    /**
     * Latitude to use for walking directions to the location, as calculated by Yext
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextWalkableLat?: number;
    /**
     * Longitude to use for walking directions to the location, as calculated by Yext
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextWalkableLng?: number;
    /**
     * Latitude to use for pickup spot for the location, as calculated by Yext
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextPickupLat?: number;
    /**
     * Longitude to use for pickup spot for the location, as calculated by Yext
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextPickupLng?: number;
    /**
     * Latitude to use for drop off spot for the location, as calculated by Yext
     * 
     * Between -90.0 and 90.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextDropoffLat?: number;
    /**
     * Longitude to use for drop off spot for the location, as calculated by Yext
     * 
     * Between -180.0 and 180.0, inclusive
     * @type {number}
     * @memberof LocationLegacy
     */
    readonly yextDropoffLng?: number;
    /**
     * Up to five emails addresses for reaching this location
     * 
     * Must be valid email addresses
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    emails?: Array<string>;
    /**
     * Up to 100 specialities (e.g., for food and dining: Chicago style)
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    specialities?: Array<string>;
    /**
     * Up to 100 association memberships relevant to the location (e.g., New York Doctors Association)
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    associations?: Array<string>;
    /**
     * Up to 100 products sold at this location
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    products?: Array<string>;
    /**
     * Up to 100 services offered at this location
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    services?: Array<string>;
    /**
     * Up to 100 brands sold by this location
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    brands?: Array<string>;
    /**
     * Language code of the language in which this location's information is provided. This language is considered the Location's primary language in our system.
     * 
     * 
     * If you would like to provide your Location data in more than one language, you can create a Language Profile for each of these additional (alternate) languages.
     * @type {string}
     * @memberof LocationLegacy
     */
    language?: string;
    /**
     * Up to 100 languages spoken at this location.
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    languages?: Array<string>;
    /**
     * Up to 100 keywords may be provided
     * 
     * All strings must be non-empty when trimmed of whitespace.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    keywords?: Array<string>;
    /**
     * Label to be used for this location’s Menus. This label will appear on your location's listings.
     * @type {string}
     * @memberof LocationLegacy
     */
    menusLabel?: string;
    /**
     * IDs of Menus associated with this location.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    menuIds?: Array<string>;
    /**
     * Label to be used for this location’s Bio lists. This label will appear on your location's listings.
     * @type {string}
     * @memberof LocationLegacy
     */
    bioListsLabel?: string;
    /**
     * IDs of Bio lists associated with this location.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    bioListIds?: Array<string>;
    /**
     * Label to be used for this location’s Product & Services lists. This label will appear on your location's listings.
     * @type {string}
     * @memberof LocationLegacy
     */
    productListsLabel?: string;
    /**
     * IDs of Product lists associated with this location.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    productListIds?: Array<string>;
    /**
     * Label to be used for this location’s Event lists. This label will appear on your location's listings.
     * @type {string}
     * @memberof LocationLegacy
     */
    eventListsLabel?: string;
    /**
     * IDs of Event lists associated with this location.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    eventListIds?: Array<string>;
    /**
     * The folder that this location is in. If the location is in the customer-level (root) folder, its folderId will be 0. Must be a valid, existing Yext Folder ID or 0
     * @type {string}
     * @memberof LocationLegacy
     */
    folderId?: string;
    /**
     * The IDs of the location labels that have been added to this location. Location labels help you identify locations that share a certain characteristic; they do not appear on your location's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * 
     * In Locations: Update requests:
     * * If the **`v`** parameter is before `20180223`: setting the value of **`labelIds`** to an empty array has no effect on the current value
     * * If the **`v`** parameter is `20180223` or after: setting the value of **`labelIds`** to an empty array deletes the current value
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    labelIds?: Array<string>;
    /**
     * A set of key-value pairs indicating the location's custom fields and their values. The keys are the **`ids`** of the custom fields, and the values are the fields' contents for this location.
     * 
     * To retrieve a list of custom fields for your account, use the Custom Fields: List endpoint.
     * 
     * If a field's **`type`** is `SINGLE_OPTION` or `MULTI_OPTION`, the option or options that apply to this location must be represented by their **`key`**s.
     * 
     * Examples of each type of custom field:
     * 
     * * BOOLEAN:
     *     * `{ "9662": "true" }`
     * * DAILY_TIMES:
     *     * `{ "10012": { "dailyTimes": "2:7:00,3:7:00,4:7:00,5:7:00,6:7:00,7:7:00,1:7:00" } }`
     * * DATE:
     *     * `{ "7066": "2016-10-12" }`
     * * GALLERY:
     *     * `{ "7070": [ { "url": "http://a.mktgcdn.com/p/ounkg7aq6Oy029-sRf4CIH64/128x128.jpg" }, { "url": "http://a.mktgcdn.com/p/YkQGqxK8jFBqOlailQ9QIBsgs/1.0000/316x316.png" } ] }`
     * * HOURS:
     *     * `{ "10011": { "hours": "1:7:00:20:00,2:7:00:20:00,3:7:00:20:00,4:7:00:20:00,5:7:00:20:00,6:7:00:20:00,7:7:00:20:00", "additionalHoursText": "Also by appointment" }`
     * * LOCATION_LIST:
     *     * `{ "8098" : [ "locationId1", "locationId2" ] }`
     * * MULTILINE_TEXT (up to 4,000 characters):
     *     * `{ "1592": "Take Route 13 south. Pass Riverrun Reservoir. At the traffic light before the post office, turn right off of Route 13. Pass the library and community center on your right and then pass a diner on your left. Cross over the bridge and at the third intersection, turn left onto Jones Street. We are located on the right side in the middle of the block." }`
     * * MULTI_OPTION:
     *     * `{ "7068": ["2614", "2615"] }` (`"2614"` and `"2615"` are the options' **`key`**s)
     * * NUMBER:
     *     * `{ "7078": "123" }`
     * * PHOTO:
     *     * `{ "7071": { "url": "http://a.mktgcdn.com/p/bRtQXQZP2kEzgy2C8/800x800.jpg", "description": "New storefront", "details": "A picture of the new storefront" } }`
     *     * `{ "7071": null }` (This setting will clear the existing value of the Photo custom field.)
     * * SINGLE_OPTION:
     *     * `{ "7069": "2617" }` (`"2617"` is the option's **`key`**)
     * * TEXT (up to 255 characters):
     *     * `{ "6157": "Buy One, Get One 50% Off" }`
     * * TEXT_LIST:
     *     * `{ "7072": [ "Item 1", "Item 2", "Item 3" ] }`
     * * URL:
     *     * `{ "9381": "http://www.location.example.com" }`
     * * VIDEO:
     *     * `{ "7077": { "url": "http://www.youtube.com/watch?v=6KQPho" } }`
     * * VIDEO_GALLERY:
     *     * `{ "8452": [ { "url": "http://www.youtube.com/watch?v=B1EC1U" }, { "url": "http://www.youtube.com/watch?v=SkEtnN" } ] }`
     * @type {{ [key: string]: object; }}
     * @memberof LocationLegacy
     */
    customFields?: { [key: string]: object; };
    /**
     * Indicates whether Intelligent Search Tracker is enabled.
     * 
     * The Intelligent Search Tracker allows you to understand your performance in local search.
     * @type {boolean}
     * @memberof LocationLegacy
     */
    intelligentSearchTrackingEnabled?: boolean;
    /**
     * How often we send search queries to track your search performance.
     * @type {string}
     * @memberof LocationLegacy
     */
    intelligentSearchTrackingFrequency?: LocationLegacyIntelligentSearchTrackingFrequencyEnum;
    /**
     * Keywords that we will use to track your search performance. These keywords are based on the location information you've stored in our system.
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    locationKeywords?: Array<LocationLegacyLocationKeywordsEnum>;
    /**
     * Additional keywords you would like us to use when tracking your search performance
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    customKeywords?: Array<string>;
    /**
     * The ways in which your keywords will be arranged in the search queries we use to track your performance
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    queryTemplates?: Array<LocationLegacyQueryTemplatesEnum>;
    /**
     * Other names for your business that you would like us to use when tracking your search performance
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    alternateNames?: Array<string>;
    /**
     * Other websites for your business that we should look for when tracking your search performance
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    alternateWebsites?: Array<string>;
    /**
     * The names and websites of the competitors whose search performance you would like to compare to your own
     * @type {Array<LocationLegacyCompetitors>}
     * @memberof LocationLegacy
     */
    competitors?: Array<LocationLegacyCompetitors>;
    /**
     * The search engines that we will use to track your performance
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    trackingSites?: Array<LocationLegacyTrackingSitesEnum>;
    /**
     * The ISO 3166-2 region code for the location.
     * 
     * Yext will determine the location’s code and update isoRegionCode with that value. If Yext is unable to determine the code for the location, the location’s ISO 3166-1 alpha-2 country code will be used.
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly isoRegionCode?: string;
    /**
     * Link to the balancing URL that will auto-direct consumers to certain sites to leave reviews, based on review-generation settings
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly reviewBalancingURL?: string;
    /**
     * Link to the review-collection page, where consumers can leave first-party reviews
     * @type {string}
     * @memberof LocationLegacy
     */
    readonly firstPartyReviewPage?: string;
    /**
     * Indicates whether the location is the primary location in its group
     * @type {boolean}
     * @memberof LocationLegacy
     */
    isClusterPrimary?: boolean;
    /**
     * List of Schema Types for this location, based on its categories
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    readonly schemaTypes?: Array<string>;
    /**
     * The formality of clothing typically worn at this location
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `RESTAURANT`.
     * @type {string}
     * @memberof LocationLegacy
     */
    attire?: LocationLegacyAttireEnum;
    /**
     * The typical price of products sold at this location, on a scale of 1 (low) to 4 (high)
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `RESTAURANT`.
     * @type {string}
     * @memberof LocationLegacy
     */
    priceRange?: LocationLegacyPriceRangeEnum;
    /**
     * Types of meals served at this location
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `RESTAURANT`.
     * 
     * Valid values:
     * 
     * * `BREAKFAST`
     * * `LUNCH`
     * * `BRUNCH`
     * * `HAPPY_HOUR`
     * * `LATE_NIGHT`
     * @type {Array<string>}
     * @memberof LocationLegacy
     */
    mealsServed?: Array<string>;
    /**
     * For ATMs, the external ID of the location that the ATM is installed in. The location must be in the same business account as the ATM.
     * 
     * **NOTE:** This field is only available to locations whose **`locationType`** is `ATM`.
     * @type {string}
     * @memberof LocationLegacy
     */
    locatedIn?: string;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof LocationLegacy
     */
    primaryContact?: string;
    /**
     * Indicates whether or not review response conversations are enabled for the Yext Knowledge Assistant
     * @type {boolean}
     * @memberof LocationLegacy
     */
    reviewResponseConversationEnabled?: boolean;
    /**
     * Indicates whether or not holiday hour confirmation alerts are enabled for the Yext Knowledge Assistant
     * @type {boolean}
     * @memberof LocationLegacy
     */
    holidayHoursConfirmationEnabled?: boolean;
}

/**
* @export
* @enum {string}
*/
export enum LocationLegacyGenderEnum {
    Female = 'FEMALE',
    F = 'F',
    Male = 'MALE',
    M = 'M',
    Unspecified = 'UNSPECIFIED'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyUberLinkTypeEnum {
    Link = 'LINK',
    Button = 'BUTTON'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyIntelligentSearchTrackingFrequencyEnum {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Quarterly = 'QUARTERLY'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyLocationKeywordsEnum {
    Name = 'NAME',
    PrimaryCategory = 'PRIMARY_CATEGORY'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyQueryTemplatesEnum {
    Keyword = 'KEYWORD',
    KeywordZip = 'KEYWORD_ZIP',
    KeywordCity = 'KEYWORD_CITY',
    KeywordInCity = 'KEYWORD_IN_CITY',
    KeywordNearMe = 'KEYWORD_NEAR_ME',
    KeywordCityState = 'KEYWORD_CITY_STATE'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyTrackingSitesEnum {
    GoogleDesktop = 'GOOGLE_DESKTOP',
    GoogleMobile = 'GOOGLE_MOBILE',
    BingDesktop = 'BING_DESKTOP',
    BingMobile = 'BING_MOBILE',
    YahooDesktop = 'YAHOO_DESKTOP',
    YahooMobile = 'YAHOO_MOBILE'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyAttireEnum {
    Unspecified = 'UNSPECIFIED',
    Dressy = 'DRESSY',
    Casual = 'CASUAL',
    Formal = 'FORMAL'
}/**
* @export
* @enum {string}
*/
export enum LocationLegacyPriceRangeEnum {
    Unspecified = 'UNSPECIFIED',
    One = 'ONE',
    Two = 'TWO',
    Three = 'THREE',
    Four = 'FOUR'
}

export function LocationLegacyFromJSON(json: any): LocationLegacy {
    return LocationLegacyFromJSONTyped(json, false);
}

export function LocationLegacyFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationLegacy {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'timestamp': !exists(json, 'timestamp') ? undefined : json['timestamp'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'locationType': !exists(json, 'locationType') ? undefined : LocationTypeFromJSON(json['locationType']),
        'locationName': !exists(json, 'locationName') ? undefined : json['locationName'],
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'middleName': !exists(json, 'middleName') ? undefined : json['middleName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'officeName': !exists(json, 'officeName') ? undefined : json['officeName'],
        'gender': !exists(json, 'gender') ? undefined : json['gender'],
        'npi': !exists(json, 'npi') ? undefined : json['npi'],
        'address': !exists(json, 'address') ? undefined : json['address'],
        'address2': !exists(json, 'address2') ? undefined : json['address2'],
        'suppressAddress': !exists(json, 'suppressAddress') ? undefined : json['suppressAddress'],
        'displayAddress': !exists(json, 'displayAddress') ? undefined : json['displayAddress'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'sublocality': !exists(json, 'sublocality') ? undefined : json['sublocality'],
        'zip': !exists(json, 'zip') ? undefined : json['zip'],
        'countryCode': !exists(json, 'countryCode') ? undefined : json['countryCode'],
        'serviceArea': !exists(json, 'serviceArea') ? undefined : LocationLegacyServiceAreaFromJSON(json['serviceArea']),
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'isPhoneTracked': !exists(json, 'isPhoneTracked') ? undefined : json['isPhoneTracked'],
        'localPhone': !exists(json, 'localPhone') ? undefined : json['localPhone'],
        'alternatePhone': !exists(json, 'alternatePhone') ? undefined : json['alternatePhone'],
        'faxPhone': !exists(json, 'faxPhone') ? undefined : json['faxPhone'],
        'mobilePhone': !exists(json, 'mobilePhone') ? undefined : json['mobilePhone'],
        'tollFreePhone': !exists(json, 'tollFreePhone') ? undefined : json['tollFreePhone'],
        'ttyPhone': !exists(json, 'ttyPhone') ? undefined : json['ttyPhone'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'featuredMessage': !exists(json, 'featuredMessage') ? undefined : json['featuredMessage'],
        'featuredMessageUrl': !exists(json, 'featuredMessageUrl') ? undefined : json['featuredMessageUrl'],
        'websiteUrl': !exists(json, 'websiteUrl') ? undefined : json['websiteUrl'],
        'displayWebsiteUrl': !exists(json, 'displayWebsiteUrl') ? undefined : json['displayWebsiteUrl'],
        'reservationUrl': !exists(json, 'reservationUrl') ? undefined : json['reservationUrl'],
        'displayReservationUrl': !exists(json, 'displayReservationUrl') ? undefined : json['displayReservationUrl'],
        'menuUrl': !exists(json, 'menuUrl') ? undefined : json['menuUrl'],
        'displayMenuUrl': !exists(json, 'displayMenuUrl') ? undefined : json['displayMenuUrl'],
        'orderUrl': !exists(json, 'orderUrl') ? undefined : json['orderUrl'],
        'displayOrderUrl': !exists(json, 'displayOrderUrl') ? undefined : json['displayOrderUrl'],
        'hours': !exists(json, 'hours') ? undefined : json['hours'],
        'additionalHoursText': !exists(json, 'additionalHoursText') ? undefined : json['additionalHoursText'],
        'holidayHours': !exists(json, 'holidayHours') ? undefined : ((json['holidayHours'] as Array<any>).map(LocationLegacyHolidayHoursFromJSON)),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'conditionsTreated': !exists(json, 'conditionsTreated') ? undefined : json['conditionsTreated'],
        'certifications': !exists(json, 'certifications') ? undefined : json['certifications'],
        'educationList': !exists(json, 'educationList') ? undefined : ((json['educationList'] as Array<any>).map(LocationLegacyEducationListFromJSON)),
        'degrees': !exists(json, 'degrees') ? undefined : json['degrees'],
        'admittingHospitals': !exists(json, 'admittingHospitals') ? undefined : json['admittingHospitals'],
        'acceptingNewPatients': !exists(json, 'acceptingNewPatients') ? undefined : json['acceptingNewPatients'],
        'closed': !exists(json, 'closed') ? undefined : LocationLegacyClosedFromJSON(json['closed']),
        'paymentOptions': !exists(json, 'paymentOptions') ? undefined : json['paymentOptions'],
        'insuranceAccepted': !exists(json, 'insuranceAccepted') ? undefined : json['insuranceAccepted'],
        'logo': !exists(json, 'logo') ? undefined : LocationPhotoFromJSON(json['logo']),
        'photos': !exists(json, 'photos') ? undefined : ((json['photos'] as Array<any>).map(LocationPhotoFromJSON)),
        'headshot': !exists(json, 'headshot') ? undefined : LocationPhotoFromJSON(json['headshot']),
        'videoUrls': !exists(json, 'videoUrls') ? undefined : json['videoUrls'],
        'instagramHandle': !exists(json, 'instagramHandle') ? undefined : json['instagramHandle'],
        'twitterHandle': !exists(json, 'twitterHandle') ? undefined : json['twitterHandle'],
        'googleWebsiteOverride': !exists(json, 'googleWebsiteOverride') ? undefined : json['googleWebsiteOverride'],
        'googleCoverPhoto': !exists(json, 'googleCoverPhoto') ? undefined : LocationPhotoFromJSON(json['googleCoverPhoto']),
        'googleProfilePhoto': !exists(json, 'googleProfilePhoto') ? undefined : LocationPhotoFromJSON(json['googleProfilePhoto']),
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : ((json['googleAttributes'] as Array<any>).map(LocationLegacyGoogleAttributesFromJSON)),
        'facebookPageUrl': !exists(json, 'facebookPageUrl') ? undefined : json['facebookPageUrl'],
        'facebookCallToAction': !exists(json, 'facebookCallToAction') ? undefined : LocationLegacyFacebookCallToActionFromJSON(json['facebookCallToAction']),
        'facebookCoverPhoto': !exists(json, 'facebookCoverPhoto') ? undefined : LocationPhotoFromJSON(json['facebookCoverPhoto']),
        'facebookProfilePicture': !exists(json, 'facebookProfilePicture') ? undefined : LocationPhotoFromJSON(json['facebookProfilePicture']),
        'uberLinkType': !exists(json, 'uberLinkType') ? undefined : json['uberLinkType'],
        'uberLinkText': !exists(json, 'uberLinkText') ? undefined : json['uberLinkText'],
        'uberTripBrandingText': !exists(json, 'uberTripBrandingText') ? undefined : json['uberTripBrandingText'],
        'uberTripBrandingUrl': !exists(json, 'uberTripBrandingUrl') ? undefined : json['uberTripBrandingUrl'],
        'uberTripBrandingDescription': !exists(json, 'uberTripBrandingDescription') ? undefined : json['uberTripBrandingDescription'],
        'uberEmbedCode': !exists(json, 'uberEmbedCode') ? undefined : json['uberEmbedCode'],
        'uberLink': !exists(json, 'uberLink') ? undefined : json['uberLink'],
        'uberLinkRaw': !exists(json, 'uberLinkRaw') ? undefined : json['uberLinkRaw'],
        'yearEstablished': !exists(json, 'yearEstablished') ? undefined : json['yearEstablished'],
        'displayLat': !exists(json, 'displayLat') ? undefined : json['displayLat'],
        'displayLng': !exists(json, 'displayLng') ? undefined : json['displayLng'],
        'routableLat': !exists(json, 'routableLat') ? undefined : json['routableLat'],
        'routableLng': !exists(json, 'routableLng') ? undefined : json['routableLng'],
        'walkableLat': !exists(json, 'walkableLat') ? undefined : json['walkableLat'],
        'walkableLng': !exists(json, 'walkableLng') ? undefined : json['walkableLng'],
        'pickupLat': !exists(json, 'pickupLat') ? undefined : json['pickupLat'],
        'pickupLng': !exists(json, 'pickupLng') ? undefined : json['pickupLng'],
        'dropoffLat': !exists(json, 'dropoffLat') ? undefined : json['dropoffLat'],
        'dropoffLng': !exists(json, 'dropoffLng') ? undefined : json['dropoffLng'],
        'yextDisplayLat': !exists(json, 'yextDisplayLat') ? undefined : json['yextDisplayLat'],
        'yextDisplayLng': !exists(json, 'yextDisplayLng') ? undefined : json['yextDisplayLng'],
        'yextRoutableLat': !exists(json, 'yextRoutableLat') ? undefined : json['yextRoutableLat'],
        'yextRoutableLng': !exists(json, 'yextRoutableLng') ? undefined : json['yextRoutableLng'],
        'yextWalkableLat': !exists(json, 'yextWalkableLat') ? undefined : json['yextWalkableLat'],
        'yextWalkableLng': !exists(json, 'yextWalkableLng') ? undefined : json['yextWalkableLng'],
        'yextPickupLat': !exists(json, 'yextPickupLat') ? undefined : json['yextPickupLat'],
        'yextPickupLng': !exists(json, 'yextPickupLng') ? undefined : json['yextPickupLng'],
        'yextDropoffLat': !exists(json, 'yextDropoffLat') ? undefined : json['yextDropoffLat'],
        'yextDropoffLng': !exists(json, 'yextDropoffLng') ? undefined : json['yextDropoffLng'],
        'emails': !exists(json, 'emails') ? undefined : json['emails'],
        'specialities': !exists(json, 'specialities') ? undefined : json['specialities'],
        'associations': !exists(json, 'associations') ? undefined : json['associations'],
        'products': !exists(json, 'products') ? undefined : json['products'],
        'services': !exists(json, 'services') ? undefined : json['services'],
        'brands': !exists(json, 'brands') ? undefined : json['brands'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'languages': !exists(json, 'languages') ? undefined : json['languages'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'menusLabel': !exists(json, 'menusLabel') ? undefined : json['menusLabel'],
        'menuIds': !exists(json, 'menuIds') ? undefined : json['menuIds'],
        'bioListsLabel': !exists(json, 'bioListsLabel') ? undefined : json['bioListsLabel'],
        'bioListIds': !exists(json, 'bioListIds') ? undefined : json['bioListIds'],
        'productListsLabel': !exists(json, 'productListsLabel') ? undefined : json['productListsLabel'],
        'productListIds': !exists(json, 'productListIds') ? undefined : json['productListIds'],
        'eventListsLabel': !exists(json, 'eventListsLabel') ? undefined : json['eventListsLabel'],
        'eventListIds': !exists(json, 'eventListIds') ? undefined : json['eventListIds'],
        'folderId': !exists(json, 'folderId') ? undefined : json['folderId'],
        'labelIds': !exists(json, 'labelIds') ? undefined : json['labelIds'],
        'customFields': !exists(json, 'customFields') ? undefined : json['customFields'],
        'intelligentSearchTrackingEnabled': !exists(json, 'intelligentSearchTrackingEnabled') ? undefined : json['intelligentSearchTrackingEnabled'],
        'intelligentSearchTrackingFrequency': !exists(json, 'intelligentSearchTrackingFrequency') ? undefined : json['intelligentSearchTrackingFrequency'],
        'locationKeywords': !exists(json, 'locationKeywords') ? undefined : json['locationKeywords'],
        'customKeywords': !exists(json, 'customKeywords') ? undefined : json['customKeywords'],
        'queryTemplates': !exists(json, 'queryTemplates') ? undefined : json['queryTemplates'],
        'alternateNames': !exists(json, 'alternateNames') ? undefined : json['alternateNames'],
        'alternateWebsites': !exists(json, 'alternateWebsites') ? undefined : json['alternateWebsites'],
        'competitors': !exists(json, 'competitors') ? undefined : ((json['competitors'] as Array<any>).map(LocationLegacyCompetitorsFromJSON)),
        'trackingSites': !exists(json, 'trackingSites') ? undefined : json['trackingSites'],
        'isoRegionCode': !exists(json, 'isoRegionCode') ? undefined : json['isoRegionCode'],
        'reviewBalancingURL': !exists(json, 'reviewBalancingURL') ? undefined : json['reviewBalancingURL'],
        'firstPartyReviewPage': !exists(json, 'firstPartyReviewPage') ? undefined : json['firstPartyReviewPage'],
        'isClusterPrimary': !exists(json, 'isClusterPrimary') ? undefined : json['isClusterPrimary'],
        'schemaTypes': !exists(json, 'schemaTypes') ? undefined : json['schemaTypes'],
        'attire': !exists(json, 'attire') ? undefined : json['attire'],
        'priceRange': !exists(json, 'priceRange') ? undefined : json['priceRange'],
        'mealsServed': !exists(json, 'mealsServed') ? undefined : json['mealsServed'],
        'locatedIn': !exists(json, 'locatedIn') ? undefined : json['locatedIn'],
        'primaryContact': !exists(json, 'primaryContact') ? undefined : json['primaryContact'],
        'reviewResponseConversationEnabled': !exists(json, 'reviewResponseConversationEnabled') ? undefined : json['reviewResponseConversationEnabled'],
        'holidayHoursConfirmationEnabled': !exists(json, 'holidayHoursConfirmationEnabled') ? undefined : json['holidayHoursConfirmationEnabled'],
    };
}

export function LocationLegacyToJSON(value?: LocationLegacy | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'accountId': value.accountId,
        'locationType': LocationTypeToJSON(value.locationType),
        'locationName': value.locationName,
        'firstName': value.firstName,
        'middleName': value.middleName,
        'lastName': value.lastName,
        'officeName': value.officeName,
        'gender': value.gender,
        'npi': value.npi,
        'address': value.address,
        'address2': value.address2,
        'suppressAddress': value.suppressAddress,
        'displayAddress': value.displayAddress,
        'city': value.city,
        'state': value.state,
        'sublocality': value.sublocality,
        'zip': value.zip,
        'countryCode': value.countryCode,
        'serviceArea': LocationLegacyServiceAreaToJSON(value.serviceArea),
        'phone': value.phone,
        'isPhoneTracked': value.isPhoneTracked,
        'localPhone': value.localPhone,
        'alternatePhone': value.alternatePhone,
        'faxPhone': value.faxPhone,
        'mobilePhone': value.mobilePhone,
        'tollFreePhone': value.tollFreePhone,
        'ttyPhone': value.ttyPhone,
        'categoryIds': value.categoryIds,
        'featuredMessage': value.featuredMessage,
        'featuredMessageUrl': value.featuredMessageUrl,
        'websiteUrl': value.websiteUrl,
        'displayWebsiteUrl': value.displayWebsiteUrl,
        'reservationUrl': value.reservationUrl,
        'displayReservationUrl': value.displayReservationUrl,
        'menuUrl': value.menuUrl,
        'displayMenuUrl': value.displayMenuUrl,
        'orderUrl': value.orderUrl,
        'displayOrderUrl': value.displayOrderUrl,
        'hours': value.hours,
        'additionalHoursText': value.additionalHoursText,
        'holidayHours': value.holidayHours === undefined ? undefined : ((value.holidayHours as Array<any>).map(LocationLegacyHolidayHoursToJSON)),
        'description': value.description,
        'conditionsTreated': value.conditionsTreated,
        'certifications': value.certifications,
        'educationList': value.educationList === undefined ? undefined : ((value.educationList as Array<any>).map(LocationLegacyEducationListToJSON)),
        'degrees': value.degrees,
        'admittingHospitals': value.admittingHospitals,
        'acceptingNewPatients': value.acceptingNewPatients,
        'closed': LocationLegacyClosedToJSON(value.closed),
        'paymentOptions': value.paymentOptions,
        'insuranceAccepted': value.insuranceAccepted,
        'logo': LocationPhotoToJSON(value.logo),
        'photos': value.photos === undefined ? undefined : ((value.photos as Array<any>).map(LocationPhotoToJSON)),
        'headshot': LocationPhotoToJSON(value.headshot),
        'videoUrls': value.videoUrls,
        'instagramHandle': value.instagramHandle,
        'twitterHandle': value.twitterHandle,
        'googleWebsiteOverride': value.googleWebsiteOverride,
        'googleCoverPhoto': LocationPhotoToJSON(value.googleCoverPhoto),
        'googleProfilePhoto': LocationPhotoToJSON(value.googleProfilePhoto),
        'googleAttributes': value.googleAttributes === undefined ? undefined : ((value.googleAttributes as Array<any>).map(LocationLegacyGoogleAttributesToJSON)),
        'facebookPageUrl': value.facebookPageUrl,
        'facebookCallToAction': LocationLegacyFacebookCallToActionToJSON(value.facebookCallToAction),
        'facebookCoverPhoto': LocationPhotoToJSON(value.facebookCoverPhoto),
        'facebookProfilePicture': LocationPhotoToJSON(value.facebookProfilePicture),
        'uberLinkType': value.uberLinkType,
        'uberLinkText': value.uberLinkText,
        'uberTripBrandingText': value.uberTripBrandingText,
        'uberTripBrandingUrl': value.uberTripBrandingUrl,
        'uberTripBrandingDescription': value.uberTripBrandingDescription,
        'yearEstablished': value.yearEstablished,
        'displayLat': value.displayLat,
        'displayLng': value.displayLng,
        'routableLat': value.routableLat,
        'routableLng': value.routableLng,
        'walkableLat': value.walkableLat,
        'walkableLng': value.walkableLng,
        'pickupLat': value.pickupLat,
        'pickupLng': value.pickupLng,
        'dropoffLat': value.dropoffLat,
        'dropoffLng': value.dropoffLng,
        'emails': value.emails,
        'specialities': value.specialities,
        'associations': value.associations,
        'products': value.products,
        'services': value.services,
        'brands': value.brands,
        'language': value.language,
        'languages': value.languages,
        'keywords': value.keywords,
        'menusLabel': value.menusLabel,
        'menuIds': value.menuIds,
        'bioListsLabel': value.bioListsLabel,
        'bioListIds': value.bioListIds,
        'productListsLabel': value.productListsLabel,
        'productListIds': value.productListIds,
        'eventListsLabel': value.eventListsLabel,
        'eventListIds': value.eventListIds,
        'folderId': value.folderId,
        'labelIds': value.labelIds,
        'customFields': value.customFields,
        'intelligentSearchTrackingEnabled': value.intelligentSearchTrackingEnabled,
        'intelligentSearchTrackingFrequency': value.intelligentSearchTrackingFrequency,
        'locationKeywords': value.locationKeywords,
        'customKeywords': value.customKeywords,
        'queryTemplates': value.queryTemplates,
        'alternateNames': value.alternateNames,
        'alternateWebsites': value.alternateWebsites,
        'competitors': value.competitors === undefined ? undefined : ((value.competitors as Array<any>).map(LocationLegacyCompetitorsToJSON)),
        'trackingSites': value.trackingSites,
        'isClusterPrimary': value.isClusterPrimary,
        'attire': value.attire,
        'priceRange': value.priceRange,
        'mealsServed': value.mealsServed,
        'locatedIn': value.locatedIn,
        'primaryContact': value.primaryContact,
        'reviewResponseConversationEnabled': value.reviewResponseConversationEnabled,
        'holidayHoursConfirmationEnabled': value.holidayHoursConfirmationEnabled,
    };
}


