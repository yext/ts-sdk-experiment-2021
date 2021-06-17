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
    EntityAccessHours,
    EntityAccessHoursFromJSON,
    EntityAccessHoursFromJSONTyped,
    EntityAccessHoursToJSON,
    EntityAddress,
    EntityAddressFromJSON,
    EntityAddressFromJSONTyped,
    EntityAddressToJSON,
    EntityAgeRange,
    EntityAgeRangeFromJSON,
    EntityAgeRangeFromJSONTyped,
    EntityAgeRangeToJSON,
    EntityAttendance,
    EntityAttendanceFromJSON,
    EntityAttendanceFromJSONTyped,
    EntityAttendanceToJSON,
    EntityBios,
    EntityBiosFromJSON,
    EntityBiosFromJSONTyped,
    EntityBiosToJSON,
    EntityBrunchHours,
    EntityBrunchHoursFromJSON,
    EntityBrunchHoursFromJSONTyped,
    EntityBrunchHoursToJSON,
    EntityCalendars,
    EntityCalendarsFromJSON,
    EntityCalendarsFromJSONTyped,
    EntityCalendarsToJSON,
    EntityDeliveryHours,
    EntityDeliveryHoursFromJSON,
    EntityDeliveryHoursFromJSONTyped,
    EntityDeliveryHoursToJSON,
    EntityDisplayCoordinate,
    EntityDisplayCoordinateFromJSON,
    EntityDisplayCoordinateFromJSONTyped,
    EntityDisplayCoordinateToJSON,
    EntityDriveThroughHours,
    EntityDriveThroughHoursFromJSON,
    EntityDriveThroughHoursFromJSONTyped,
    EntityDriveThroughHoursToJSON,
    EntityDropoffCoordinate,
    EntityDropoffCoordinateFromJSON,
    EntityDropoffCoordinateFromJSONTyped,
    EntityDropoffCoordinateToJSON,
    EntityEducationList,
    EntityEducationListFromJSON,
    EntityEducationListFromJSONTyped,
    EntityEducationListToJSON,
    EntityFacebookCallToAction,
    EntityFacebookCallToActionFromJSON,
    EntityFacebookCallToActionFromJSONTyped,
    EntityFacebookCallToActionToJSON,
    EntityFacebookCoverPhoto,
    EntityFacebookCoverPhotoFromJSON,
    EntityFacebookCoverPhotoFromJSONTyped,
    EntityFacebookCoverPhotoToJSON,
    EntityFacebookProfilePhoto,
    EntityFacebookProfilePhotoFromJSON,
    EntityFacebookProfilePhotoFromJSONTyped,
    EntityFacebookProfilePhotoToJSON,
    EntityFeaturedMessage,
    EntityFeaturedMessageFromJSON,
    EntityFeaturedMessageFromJSONTyped,
    EntityFeaturedMessageToJSON,
    EntityFrequentlyAskedQuestions,
    EntityFrequentlyAskedQuestionsFromJSON,
    EntityFrequentlyAskedQuestionsFromJSONTyped,
    EntityFrequentlyAskedQuestionsToJSON,
    EntityGoogleCoverPhoto,
    EntityGoogleCoverPhotoFromJSON,
    EntityGoogleCoverPhotoFromJSONTyped,
    EntityGoogleCoverPhotoToJSON,
    EntityGoogleProfilePhoto,
    EntityGoogleProfilePhotoFromJSON,
    EntityGoogleProfilePhotoFromJSONTyped,
    EntityGoogleProfilePhotoToJSON,
    EntityHappyHours,
    EntityHappyHoursFromJSON,
    EntityHappyHoursFromJSONTyped,
    EntityHappyHoursToJSON,
    EntityHeadshot,
    EntityHeadshotFromJSON,
    EntityHeadshotFromJSONTyped,
    EntityHeadshotToJSON,
    EntityHours,
    EntityHoursFromJSON,
    EntityHoursFromJSONTyped,
    EntityHoursToJSON,
    EntityKitchenHours,
    EntityKitchenHoursFromJSON,
    EntityKitchenHoursFromJSONTyped,
    EntityKitchenHoursToJSON,
    EntityLocation,
    EntityLocationFromJSON,
    EntityLocationFromJSONTyped,
    EntityLocationToJSON,
    EntityLogo,
    EntityLogoFromJSON,
    EntityLogoFromJSONTyped,
    EntityLogoToJSON,
    EntityMenuUrl,
    EntityMenuUrlFromJSON,
    EntityMenuUrlFromJSONTyped,
    EntityMenuUrlToJSON,
    EntityMenus,
    EntityMenusFromJSON,
    EntityMenusFromJSONTyped,
    EntityMenusToJSON,
    EntityMeta,
    EntityMetaFromJSON,
    EntityMetaFromJSONTyped,
    EntityMetaToJSON,
    EntityOnlineServiceHours,
    EntityOnlineServiceHoursFromJSON,
    EntityOnlineServiceHoursFromJSONTyped,
    EntityOnlineServiceHoursToJSON,
    EntityOrderUrl,
    EntityOrderUrlFromJSON,
    EntityOrderUrlFromJSONTyped,
    EntityOrderUrlToJSON,
    EntityPhotoGallery,
    EntityPhotoGalleryFromJSON,
    EntityPhotoGalleryFromJSONTyped,
    EntityPhotoGalleryToJSON,
    EntityPickupCoordinate,
    EntityPickupCoordinateFromJSON,
    EntityPickupCoordinateFromJSONTyped,
    EntityPickupCoordinateToJSON,
    EntityPickupHours,
    EntityPickupHoursFromJSON,
    EntityPickupHoursFromJSONTyped,
    EntityPickupHoursToJSON,
    EntityProductLists,
    EntityProductListsFromJSON,
    EntityProductListsFromJSONTyped,
    EntityProductListsToJSON,
    EntityRankTrackingCompetitors,
    EntityRankTrackingCompetitorsFromJSON,
    EntityRankTrackingCompetitorsFromJSONTyped,
    EntityRankTrackingCompetitorsToJSON,
    EntityReservationUrl,
    EntityReservationUrlFromJSON,
    EntityReservationUrlFromJSONTyped,
    EntityReservationUrlToJSON,
    EntityRoutableCoordinate,
    EntityRoutableCoordinateFromJSON,
    EntityRoutableCoordinateFromJSONTyped,
    EntityRoutableCoordinateToJSON,
    EntitySeniorHours,
    EntitySeniorHoursFromJSON,
    EntitySeniorHoursFromJSONTyped,
    EntitySeniorHoursToJSON,
    EntityServiceArea,
    EntityServiceAreaFromJSON,
    EntityServiceAreaFromJSONTyped,
    EntityServiceAreaToJSON,
    EntityServiceAreaPlaces,
    EntityServiceAreaPlacesFromJSON,
    EntityServiceAreaPlacesFromJSONTyped,
    EntityServiceAreaPlacesToJSON,
    EntityTakeoutHours,
    EntityTakeoutHoursFromJSON,
    EntityTakeoutHoursFromJSONTyped,
    EntityTakeoutHoursToJSON,
    EntityTicketPriceRange,
    EntityTicketPriceRangeFromJSON,
    EntityTicketPriceRangeFromJSONTyped,
    EntityTicketPriceRangeToJSON,
    EntityTime,
    EntityTimeFromJSON,
    EntityTimeFromJSONTyped,
    EntityTimeToJSON,
    EntityUberLink,
    EntityUberLinkFromJSON,
    EntityUberLinkFromJSONTyped,
    EntityUberLinkToJSON,
    EntityUberTripBranding,
    EntityUberTripBrandingFromJSON,
    EntityUberTripBrandingFromJSONTyped,
    EntityUberTripBrandingToJSON,
    EntityVideos,
    EntityVideosFromJSON,
    EntityVideosFromJSONTyped,
    EntityVideosToJSON,
    EntityWalkableCoordinate,
    EntityWalkableCoordinateFromJSON,
    EntityWalkableCoordinateFromJSONTyped,
    EntityWalkableCoordinateToJSON,
    EntityWebsiteUrl,
    EntityWebsiteUrlFromJSON,
    EntityWebsiteUrlFromJSONTyped,
    EntityWebsiteUrlToJSON,
    EntityYextDisplayCoordinate,
    EntityYextDisplayCoordinateFromJSON,
    EntityYextDisplayCoordinateFromJSONTyped,
    EntityYextDisplayCoordinateToJSON,
    EntityYextDropoffCoordinate,
    EntityYextDropoffCoordinateFromJSON,
    EntityYextDropoffCoordinateFromJSONTyped,
    EntityYextDropoffCoordinateToJSON,
    EntityYextPickupCoordinate,
    EntityYextPickupCoordinateFromJSON,
    EntityYextPickupCoordinateFromJSONTyped,
    EntityYextPickupCoordinateToJSON,
    EntityYextRoutableCoordinate,
    EntityYextRoutableCoordinateFromJSON,
    EntityYextRoutableCoordinateFromJSONTyped,
    EntityYextRoutableCoordinateToJSON,
    EntityYextWalkableCoordinate,
    EntityYextWalkableCoordinateFromJSON,
    EntityYextWalkableCoordinateFromJSONTyped,
    EntityYextWalkableCoordinateToJSON,
} from './';

/**
 * 
 * @export
 * @interface Entity
 */
export interface Entity {
    /**
     * 
     * @type {EntityMeta}
     * @memberof Entity
     */
    meta?: EntityMeta;
    /**
     * 
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * * a phone number
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * event
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    name?: string;
    /**
     * 
     * @type {EntityAddress}
     * @memberof Entity
     */
    address?: EntityAddress;
    /**
     * Indicates whether the healthcare provider is accepting new patients.
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * healthcareFacility
     *    * healthcareProfessional
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    acceptingNewPatients?: boolean;
    /**
     * Indicates whether the entity accepts reservations.
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    acceptsReservations?: boolean;
    /**
     * 
     * @type {EntityAccessHours}
     * @memberof Entity
     */
    accessHours?: EntityAccessHours;
    /**
     * Additional information about hours that does not fit in **`hours`** (e.g., `"Closed during the winter"`)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    additionalHoursText?: string;
    /**
     * If other locations are promoting this event, a list of those locations' **`id`**s in the Yext Knowledge Manager
     * 
     * 
     * Array must be ordered.
     * 
     * 
     * Filtering Type: `list of entityId`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    additionalPromotingLocations?: Set<string>;
    /**
     * If `true`, the entity's street address will not be shown on listings. Defaults to `false`.
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    addressHidden?: boolean;
    /**
     * A list of hospitals where the healthcare professional admits patients
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    admittingHospitals?: Set<string>;
    /**
     * Indicates whether the entity has a pool for adults only.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    adultPool?: EntityAdultPoolEnum;
    /**
     * 
     * @type {EntityAgeRange}
     * @memberof Entity
     */
    ageRange?: EntityAgeRange;
    /**
     * Indicates whether the entity offers a shuttle to/from the airport.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    airportShuttle?: EntityAirportShuttleEnum;
    /**
     * Indicates whether the entity offers a shuttle service of car service to/from nearby airports or train stations.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    airportTransfer?: EntityAirportTransferEnum;
    /**
     * Indicates whether the entity offers all-inclusive rates.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    allInclusive?: EntityAllInclusiveEnum;
    /**
     * Other names for your business that you would like us to use when tracking your search performance
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 3 elements.
     * 
     * Array item description:
     * 
     * >Cannot Include:
     * >* HTML markup
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    alternateNames?: Set<string>;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    alternatePhone?: string;
    /**
     * Other websites for your business that we should search for when tracking your search performance
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 3 elements.
     * 
     * Array item description:
     * 
     * >Cannot Include:
     * >* common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    alternateWebsites?: Set<string>;
    /**
     * The URL where consumers can download the entity's Android app
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    androidAppUrl?: string;
    /**
     * The answer to the frequently asked question represented by this entity
     * 
     * 
     * Character limit: 0 .. 15000
     * 
     * Supported formats include:
     * * BOLD
     * * ITALICS
     * * UNDERLINE
     * * BULLETED_LIST
     * * NUMBERED_LIST
     * * HYPERLINK
     * * IMAGE
     * * CODE_SPAN
     * * HEADINGS
     * 
     * ```
     * Eligible For: 
     *    * faq
     * ```
     * @type {string}
     * @memberof Entity
     */
    answer?: string;
    /**
     * The application URL
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {string}
     * @memberof Entity
     */
    applicationUrl?: string;
    /**
     * Association memberships relevant to the entity (e.g., `"New York Doctors Association"`)
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    associations?: Set<string>;
    /**
     * 
     * @type {EntityAttendance}
     * @memberof Entity
     */
    attendance?: EntityAttendance;
    /**
     * The formality of clothing typically worn at this restaurant
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    attire?: EntityAttireEnum;
    /**
     * Indicates whether the entity offers babysitting.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    babysittingOffered?: EntityBabysittingOfferedEnum;
    /**
     * Indicates whether the entity offers baggage storage pre check-in and post check-out.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    baggageStorage?: EntityBaggageStorageEnum;
    /**
     * Indicates whether the entity has an indoor or outdoor bar onsite.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    bar?: EntityBarEnum;
    /**
     * Indicates whether the entity has access to a beach.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    beachAccess?: EntityBeachAccessEnum;
    /**
     * Indicates whether the entity is physically located next to a beach.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    beachFrontProperty?: EntityBeachFrontPropertyEnum;
    /**
     * Indicates whether the entity offers bicycles for rent or for free.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    bicycles?: EntityBicyclesEnum;
    /**
     * 
     * @type {EntityBios}
     * @memberof Entity
     */
    bios?: EntityBios;
    /**
     * Indicates whether the entity has a boutique store. Gift shop or convenience store are not eligible.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    boutiqueStores?: EntityBoutiqueStoresEnum;
    /**
     * Brands sold by this entity
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    brands?: Set<string>;
    /**
     * Indicates whether the entity offers breakfast.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    breakfast?: EntityBreakfastEnum;
    /**
     * 
     * @type {EntityBrunchHours}
     * @memberof Entity
     */
    brunchHours?: EntityBrunchHours;
    /**
     * Indicates whether the entity has a business center.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    businessCenter?: EntityBusinessCenterEnum;
    /**
     * 
     * @type {EntityCalendars}
     * @memberof Entity
     */
    calendars?: EntityCalendars;
    /**
     * Indicates whether the entity offers car rental.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    carRental?: EntityCarRentalEnum;
    /**
     * Indicates whether the entity has a casino on premise or nearby.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    casino?: EntityCasinoEnum;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * 
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * event
     *    * faq
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * job
     *    * location
     *    * restaurant
     * ```
     * @type {Array<string>}
     * @memberof Entity
     */
    categoryIds?: Array<string>;
    /**
     * Indicates if the entity is cat friendly.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    catsAllowed?: EntityCatsAllowedEnum;
    /**
     * A list of the certifications held by the healthcare professional
     * **NOTE:** This field is only available to locations whose **`entityType`** is `healthcareProfessional`.
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareProfessional
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    certifications?: Set<string>;
    /**
     * The check-in time
     * 
     * Filtering Type: `time`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    checkInTime?: string;
    /**
     * The check-out time
     * 
     * Filtering Type: `time`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    checkOutTime?: string;
    /**
     * The 1 to 5 star rating of the entitiy based on its services and facilities.
     * 
     * Filtering Type: `decimal`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    classificationRating?: string;
    /**
     * Indicates whether the entity is closed
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    closed?: boolean;
    /**
     * Indicates whether the entity offers concierge service.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    concierge?: EntityConciergeEnum;
    /**
     * A list of the conditions treated by the healthcare provider
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareFacility
     *    * healthcareProfessional
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    conditionsTreated?: Set<string>;
    /**
     * Indicates whether the entity has a convenience store.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    convenienceStore?: EntityConvenienceStoreEnum;
    /**
     * Indicates whether the entity offers currency exchange services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    currencyExchange?: EntityCurrencyExchangeEnum;
    /**
     * Additional keywords you would like us to use when tracking your search performance
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * 
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    customKeywords?: Set<string>;
    /**
     * The date this entity was posted
     * 
     * Filtering Type: `date`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {Date}
     * @memberof Entity
     */
    datePosted?: Date;
    /**
     * A list of the degrees earned by the healthcare professional
     * 
     * 
     * Array must be ordered.
     * 
     * 
     * Filtering Type: `list of option`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    degrees?: Set<EntityDegreesEnum>;
    /**
     * 
     * @type {EntityDeliveryHours}
     * @memberof Entity
     */
    deliveryHours?: EntityDeliveryHours;
    /**
     * A description of the entity
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * event
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * job
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    description?: string;
    /**
     * 
     * @type {EntityDisplayCoordinate}
     * @memberof Entity
     */
    displayCoordinate?: EntityDisplayCoordinate;
    /**
     * Indicates whether the entity has a doctor on premise or on call.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    doctorOnCall?: EntityDoctorOnCallEnum;
    /**
     * Indicates if the entity is dog friendly.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    dogsAllowed?: EntityDogsAllowedEnum;
    /**
     * 
     * @type {EntityDriveThroughHours}
     * @memberof Entity
     */
    driveThroughHours?: EntityDriveThroughHours;
    /**
     * 
     * @type {EntityDropoffCoordinate}
     * @memberof Entity
     */
    dropoffCoordinate?: EntityDropoffCoordinate;
    /**
     * Information about the education or training completed by the healthcare professional
     * 
     * 
     * Array must be ordered.
     * 
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {Set<EntityEducationList>}
     * @memberof Entity
     */
    educationList?: Set<EntityEducationList>;
    /**
     * Indicates whether the entity has electric car chargine stations on premise.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    electricChargingStation?: EntityElectricChargingStationEnum;
    /**
     * Indicates whether the entity has an elevator.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    elevator?: EntityElevatorEnum;
    /**
     * Indicates whether the entity has an elliptical machine.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    ellipticalMachine?: EntityEllipticalMachineEnum;
    /**
     * Emails addresses for this entity's point of contact
     * 
     * Must be valid email addresses
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * 
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * contactCard
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    emails?: Set<string>;
    /**
     * The employment type for the open job. Indicates whether the job is full-time, part-time, temporary, etc.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {string}
     * @memberof Entity
     */
    employmentType?: EntityEmploymentTypeEnum;
    /**
     * Information on whether the event will take place as scheduled
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    eventStatus?: EntityEventStatusEnum;
    /**
     * 
     * @type {EntityFacebookCallToAction}
     * @memberof Entity
     */
    facebookCallToAction?: EntityFacebookCallToAction;
    /**
     * 
     * @type {EntityFacebookCoverPhoto}
     * @memberof Entity
     */
    facebookCoverPhoto?: EntityFacebookCoverPhoto;
    /**
     * Location Descriptors are used for Enterprise businesses that sync Facebook listings using brand page location structure. The Location Descriptor is typically an additional geographic description (e.g. geomodifier) that will appear in parentheses after the name on the Facebook listing.
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    facebookDescriptor?: string;
    /**
     * The name for this entity's Facebook profile.  A separate name may be specified to send only to Facebook in order to comply with any specific Facebook rules or naming conventions.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    facebookName?: string;
    /**
     * The city to be displayed on this entity's Facebook profile
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    facebookOverrideCity?: string;
    /**
     * URL for the entity's Facebook Page.
     * 
     * Valid formats:
     * 
     * - facebook.com/profile.php?id=[numId]
     * - facebook.com/group.php?gid=[numId]
     * - facebook.com/groups/[numId]
     * - facebook.com/[Name]
     * - facebook.com/pages/[Name]/[numId]
     * 
     * where [Name] is a String and [numId] is an Integer
     * 
     * If you submit a URL that is not in one of the valid formats, it will be ignored. The success response will contain a warning message explaining why the URL wasn't stored in the system.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    facebookPageUrl?: string;
    /**
     * 
     * @type {EntityFacebookProfilePhoto}
     * @memberof Entity
     */
    facebookProfilePhoto?: EntityFacebookProfilePhoto;
    /**
     * The username that appear's in the Facebook listing URL to help customers find and remember a brand’s Facebook page.  The username is also be used for tagging the Facebook page in other users’ posts, and searching for the Facebook page.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    facebookVanityUrl?: string;
    /**
     * Must be a valid fax number.
     * 
     * If the fax number's calling code is for a country other than the one given in the entity's **`countryCode`**, the fax number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    fax?: string;
    /**
     * 
     * @type {EntityFeaturedMessage}
     * @memberof Entity
     */
    featuredMessage?: EntityFeaturedMessage;
    /**
     * The first name of the healthcare professional
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * HTML markup
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    firstName?: string;
    /**
     * Link to the review-collection page, where consumers can leave first-party reviews
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    firstPartyReviewPage?: string;
    /**
     * Indicates whether the entity has a fitness center.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    fitnessCenter?: EntityFitnessCenterEnum;
    /**
     * The number of floors the entity has from ground floor to top floor.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    floorCount?: number;
    /**
     * Indicates whether the entity has free weights.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    freeWeights?: EntityFreeWeightsEnum;
    /**
     * A list of questions that are frequently asked about this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * 
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<EntityFrequentlyAskedQuestions>}
     * @memberof Entity
     */
    frequentlyAskedQuestions?: Set<EntityFrequentlyAskedQuestions>;
    /**
     * Indicates whether the entity has a front desk.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    frontDesk?: EntityFrontDeskEnum;
    /**
     * Indicates whether the entity has a game room.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    gameRoom?: EntityGameRoomEnum;
    /**
     * The gender of the healthcare professional
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    gender?: EntityGenderEnum;
    /**
     * Provides additional information on where the entity can be found (e.g., `Times Square`, `Global Center Mall`)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    geomodifier?: string;
    /**
     * Indicates whether the entity has a gift shop.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    giftShop?: EntityGiftShopEnum;
    /**
     * Indicates whether the entity has a golf couse on premise or nearby. The golf course may be independently run.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    golf?: EntityGolfEnum;
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
     * 
     * Filtering Type: `object`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * event
     *    * faq
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * job
     *    * location
     *    * restaurant
     * ```
     * @type {object}
     * @memberof Entity
     */
    googleAttributes?: object;
    /**
     * 
     * @type {EntityGoogleCoverPhoto}
     * @memberof Entity
     */
    googleCoverPhoto?: EntityGoogleCoverPhoto;
    /**
     * Google My Business Labels help users organize their locations into groups within GMB.
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 10 elements.
     * 
     * Array item description:
     * 
     * >Cannot Include:
     * >* HTML markup
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    googleMyBusinessLabels?: Set<string>;
    /**
     * The unique identifier of this entity on Google Maps.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    googlePlaceId?: string;
    /**
     * 
     * @type {EntityGoogleProfilePhoto}
     * @memberof Entity
     */
    googleProfilePhoto?: EntityGoogleProfilePhoto;
    /**
     * The URL you would like to submit to Google My Business in place of the one given in **`websiteUrl`** (if applicable).
     * 
     * For example, if you want to analyze the traffic driven by your Google listings separately from other traffic, enter the alternate URL that you will use for tracking in this field.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    googleWebsiteOverride?: string;
    /**
     * 
     * @type {EntityHappyHours}
     * @memberof Entity
     */
    happyHours?: EntityHappyHours;
    /**
     * 
     * @type {EntityHeadshot}
     * @memberof Entity
     */
    headshot?: EntityHeadshot;
    /**
     * The organization that is hiring for the open job
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {string}
     * @memberof Entity
     */
    hiringOrganization?: string;
    /**
     * Indicates whether holiday-hour confirmation alerts are enabled for the Yext Knowledge Assistant for this entity
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    holidayHoursConversationEnabled?: boolean;
    /**
     * Indicates whether the entity offers horseback riding.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    horsebackRiding?: EntityHorsebackRidingEnum;
    /**
     * Indicates whether the entity has a hot tub.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    hotTub?: EntityHotTubEnum;
    /**
     * 
     * @type {EntityHours}
     * @memberof Entity
     */
    hours?: EntityHours;
    /**
     * Indicates whether the entity offers housekeeping services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    housekeeping?: EntityHousekeepingEnum;
    /**
     * A statement of the ownership and authorship of a document. Individuals or organizations based in many German-speaking countries are required by law to include an Impressum in published media.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    impressum?: string;
    /**
     * A count of the number of indoor pools
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    indoorPoolCount?: number;
    /**
     * Valid Instagram username for the entity without the leading "@" (e.g., `NewCityAuto`)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    instagramHandle?: string;
    /**
     * A list of insurance policies accepted by the healthcare provider
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareFacility
     *    * healthcareProfessional
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    insuranceAccepted?: Set<string>;
    /**
     * The URL where consumers can download the entity's app to their iPhone or iPad
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    iosAppUrl?: string;
    /**
     * Indicates whether the healthcare entity is the primary entity in its group
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    isClusterPrimary?: boolean;
    /**
     * Indicates whether or not the event is free
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    isFreeEvent?: boolean;
    /**
     * The ISO 3166-2 region code for the entity
     * 
     * Yext will determine the entity's code and update **`isoRegionCode`** with that value. If Yext is unable to determine the code for the entity, the entity'ss ISO 3166-1 alpha-2 country code will be used.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    isoRegionCode?: string;
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * event
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    keywords?: Set<string>;
    /**
     * Indicates if the entity is kid friendly.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    kidFriendly?: EntityKidFriendlyEnum;
    /**
     * Indicates if the property has a Kids Club.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    kidsClub?: EntityKidsClubEnum;
    /**
     * Indicates whether the entity allows kids to stay free.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    kidsStayFree?: EntityKidsStayFreeEnum;
    /**
     * 
     * @type {EntityKitchenHours}
     * @memberof Entity
     */
    kitchenHours?: EntityKitchenHours;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * 
     * Filtering Type: `opaque`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * event
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {Array<string>}
     * @memberof Entity
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * event
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    landingPageUrl?: string;
    /**
     * The langauges in which consumers can commicate with this entity or its staff members
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    languages?: Set<string>;
    /**
     * The last name of the healthcare professional
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * HTML markup
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    lastName?: string;
    /**
     * Indicates whether the entity offers laundry services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    laundry?: EntityLaundryEnum;
    /**
     * Indicates if the property has a lazy river
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    lazyRiver?: EntityLazyRiverEnum;
    /**
     * Indicates if the property has a lifeguard on duty
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    lifeguard?: EntityLifeguardEnum;
    /**
     * location ID of the event location, if the event is held at a location managed in the Yext Knowledge Manager
     * 
     * Filtering Type: `entityId`
     * 
     * ```
     * Eligible For: 
     *    * contactCard
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    linkedLocation?: string;
    /**
     * Must be a valid, non-toll-free phone number, based on the country specified in **`address.region`**. Phone numbers for US entities must contain 10 digits.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    localPhone?: string;
    /**
     * Indicates whether the entity offers local shuttle services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    localShuttle?: EntityLocalShuttleEnum;
    /**
     * For atms, the external ID of the entity that the atm is installed in. The entity must be in the same business account as the atm.
     * 
     * Filtering Type: `entityId`
     * 
     * ```
     * Eligible For: 
     *    * atm
     * ```
     * @type {string}
     * @memberof Entity
     */
    locatedIn?: string;
    /**
     * 
     * @type {EntityLocation}
     * @memberof Entity
     */
    location?: EntityLocation;
    /**
     * Indicates the entity's type, if it is not an event
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    locationType?: EntityLocationTypeEnum;
    /**
     * 
     * @type {EntityLogo}
     * @memberof Entity
     */
    logo?: EntityLogo;
    /**
     * The main phone number of the entity's point of contact
     * 
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    mainPhone?: string;
    /**
     * Indicates whether the entity offers massage services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    massage?: EntityMassageEnum;
    /**
     * The maximum age specified by the property for children to stay in the room/suite of a parent or adult without an additional fee
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    maxAgeOfKidsStayFree?: number;
    /**
     * The maximum number of children who can stay in the room/suite of a parent or adult without an additional fee
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    maxNumberOfKidsStayFree?: number;
    /**
     * Types of meals served at this restaurant
     * 
     * Filtering Type: `list of option`
     * 
     * ```
     * Eligible For: 
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    mealsServed?: Set<EntityMealsServedEnum>;
    /**
     * The number of meeting rooms the entity has.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    meetingRoomCount?: number;
    /**
     * 
     * @type {EntityMenuUrl}
     * @memberof Entity
     */
    menuUrl?: EntityMenuUrl;
    /**
     * 
     * @type {EntityMenus}
     * @memberof Entity
     */
    menus?: EntityMenus;
    /**
     * The middle name of the healthcare professional
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * HTML markup
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    middleName?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    mobilePhone?: string;
    /**
     * Indicates whether the entity is mobility/wheelchair accessible
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    mobilityAccessible?: EntityMobilityAccessibleEnum;
    /**
     * Indicates whether the entity has a nightclub.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    nightclub?: EntityNightclubEnum;
    /**
     * The National Provider Identifier (NPI) of the healthcare provider
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareFacility
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    npi?: string;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    nudgeEnabled?: boolean;
    /**
     * The name of the office where the healthcare professional works, if different from **`name`**
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * healthcareProfessional
     * ```
     * @type {string}
     * @memberof Entity
     */
    officeName?: string;
    /**
     * 
     * @type {EntityOnlineServiceHours}
     * @memberof Entity
     */
    onlineServiceHours?: EntityOnlineServiceHours;
    /**
     * 
     * @type {EntityOrderUrl}
     * @memberof Entity
     */
    orderUrl?: EntityOrderUrl;
    /**
     * Point of contact for the event organizer (not to be published publicly)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    organizerEmail?: string;
    /**
     * Point of contact for the event organizer (not to be published publicly)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    organizerName?: string;
    /**
     * Point of contact for the event organizer (not to be published publicly)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    organizerPhone?: string;
    /**
     * The number of outdoor pools the entity has.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    outdoorPoolCount?: number;
    /**
     * Indicates whether the entity offers parking services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    parking?: EntityParkingEnum;
    /**
     * The payment methods accepted by this entity
     * 
     * Valid elements depend on the entity's country.
     * 
     * 
     * Filtering Type: `list of option`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    paymentOptions?: Set<EntityPaymentOptionsEnum>;
    /**
     * Performers at the event
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * 
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    performers?: Set<string>;
    /**
     * Indicates if the entity is pet friendly.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    petsAllowed?: EntityPetsAllowedEnum;
    /**
     * 
     * **NOTE:** The list of photos that you send us must be comprehensive. For example, if you send us a list of photos that does not include photos that you sent in your last update, Yext considers the missing photos to be deleted, and we remove them from your listings.
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * 
     * Array item description:
     * 
     * >Supported Aspect Ratios:
     * >* 1 x 1
     * >* 4 x 3
     * >* 3 x 2
     * >* 5 x 3
     * >* 16 x 9
     * >* 3 x 1
     * >* 2 x 3
     * >* 5 x 7
     * >* 4 x 5
     * >* 4 x 1
     * >
     * >**NOTE**: Maximum image size is 5mb after normalization and padding (if applicable). As well, there is a 6 second download limit from the image host.
     * >
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * event
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {Array<EntityPhotoGallery>}
     * @memberof Entity
     */
    photoGallery?: Array<EntityPhotoGallery>;
    /**
     * 
     * @type {EntityPickupCoordinate}
     * @memberof Entity
     */
    pickupCoordinate?: EntityPickupCoordinate;
    /**
     * 
     * @type {EntityPickupHours}
     * @memberof Entity
     */
    pickupHours?: EntityPickupHours;
    /**
     * he typical price of products sold by this location, on a scale of 1 (low) to 4 (high)
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    priceRange?: EntityPriceRangeEnum;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    primaryConversationContact?: string;
    /**
     * Indicates whether the entity has access to a private beach.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    privateBeach?: EntityPrivateBeachEnum;
    /**
     * Indicates whether the entity offers private car services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    privateCarService?: EntityPrivateCarServiceEnum;
    /**
     * 
     * @type {EntityProductLists}
     * @memberof Entity
     */
    productLists?: EntityProductLists;
    /**
     * Products sold by this entity
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * location
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    products?: Set<string>;
    /**
     * Indicates whether Yext Knowledge Assistant question-and-answer conversations are enabled for this entity
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    questionsAndAnswers?: boolean;
    /**
     * Information about the competitors whose search performance you would like to compare to your own
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * 
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<EntityRankTrackingCompetitors>}
     * @memberof Entity
     */
    rankTrackingCompetitors?: Set<EntityRankTrackingCompetitors>;
    /**
     * Indicates whether Rank Tracking is enabled
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    rankTrackingEnabled?: boolean;
    /**
     * How often we send search queries to track your search performance
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    rankTrackingFrequency?: EntityRankTrackingFrequencyEnum;
    /**
     * The ways in which your keywords will be arranged in the search queries we use to track your performance
     * 
     * 
     * Array must have a minimum of 2 elements.
     * 
     * Array may have a maximum of 4 elements.
     * 
     * 
     * Filtering Type: `list of option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    rankTrackingQueryTemplates?: Set<EntityRankTrackingQueryTemplatesEnum>;
    /**
     * The search engines that we will use to track your performance
     * 
     * Filtering Type: `list of option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    rankTrackingSites?: Set<EntityRankTrackingSitesEnum>;
    /**
     * 
     * @type {EntityReservationUrl}
     * @memberof Entity
     */
    reservationUrl?: EntityReservationUrl;
    /**
     * The number of restaurants the entity has.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    restaurantCount?: number;
    /**
     * The URL given Review Invitation emails where consumers can leave a review about the entity
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    reviewGenerationUrl?: string;
    /**
     * Indicates whether Yext Knowledge Assistant review-response conversations are enabled for this entity
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    reviewResponseConversationEnabled?: boolean;
    /**
     * The number of rooms the entity has.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    roomCount?: number;
    /**
     * Indicates whether the entity offers room service.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    roomService?: EntityRoomServiceEnum;
    /**
     * 
     * @type {EntityRoutableCoordinate}
     * @memberof Entity
     */
    routableCoordinate?: EntityRoutableCoordinate;
    /**
     * Indicates whether the entity has a salon.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    salon?: EntitySalonEnum;
    /**
     * Indicates whether the entity has a sauna.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    sauna?: EntitySaunaEnum;
    /**
     * Indicates whether the entity offers scuba diving.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    scuba?: EntityScubaEnum;
    /**
     * Indicates whether the entity offers self parking services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    selfParking?: EntitySelfParkingEnum;
    /**
     * 
     * @type {EntitySeniorHours}
     * @memberof Entity
     */
    seniorHours?: EntitySeniorHours;
    /**
     * 
     * @type {EntityServiceArea}
     * @memberof Entity
     */
    serviceArea?: EntityServiceArea;
    /**
     * Information about the area that is served by this entity. It is specified as a list of service area names and their associated types.
     * **Only for Google My Business and Bing:** Currently, **serviceArea** is only supported by Google My Business and Bing and will not affect your listings on other sites.
     * 
     * 
     * Array may have a maximum of 200 elements.
     * 
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<EntityServiceAreaPlaces>}
     * @memberof Entity
     */
    serviceAreaPlaces?: Set<EntityServiceAreaPlaces>;
    /**
     * Services offered by this entity
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    services?: Set<string>;
    /**
     * Indicates if the entity is smoke free.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    smokeFreeProperty?: EntitySmokeFreePropertyEnum;
    /**
     * Indicates whether the entity offers snorkeling.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    snorkeling?: EntitySnorkelingEnum;
    /**
     * Indicates whether the entity offers a social hour.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    socialHour?: EntitySocialHourEnum;
    /**
     * Indicates whether the entity has a spa.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    spa?: EntitySpaEnum;
    /**
     * Up to 100 of this entity's specialities (e.g., for food and dining: `Chicago style`)
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
     * 
     * Filtering Type: `list of text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * location
     *    * restaurant
     * ```
     * @type {Set<string>}
     * @memberof Entity
     */
    specialities?: Set<string>;
    /**
     * Indicates whether the entity has a sit-down restaurant.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    tableService?: EntityTableServiceEnum;
    /**
     * 
     * @type {EntityTakeoutHours}
     * @memberof Entity
     */
    takeoutHours?: EntityTakeoutHours;
    /**
     * Indicates whether the entity has tennis courts.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    tennis?: EntityTennisEnum;
    /**
     * Indicates whether the entity has a thermal pool.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    thermalPool?: EntityThermalPoolEnum;
    /**
     * Information about the availability of tickets for the event
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    ticketAvailability?: EntityTicketAvailabilityEnum;
    /**
     * 
     * @type {EntityTicketPriceRange}
     * @memberof Entity
     */
    ticketPriceRange?: EntityTicketPriceRange;
    /**
     * The date/time tickets are available for sale (local time)
     * 
     * Filtering Type: `datetime`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {Date}
     * @memberof Entity
     */
    ticketSaleDateTime?: Date;
    /**
     * URL to purchase tickets for the event (if ticketed)
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    ticketUrl?: string;
    /**
     * 
     * @type {EntityTime}
     * @memberof Entity
     */
    time?: EntityTime;
    /**
     * Represents the time zone offset of the entity from UTC, in `±hh:mm` format.
     * 
     * For example, if the entity is 4 hours ahead of UTC time, the offset will be `+04:00`.
     * 
     * If the entity is 15.5 hours behind UTC time, the offset will be `-15:30`.
     * 
     * If the entity is in UTC time, the offset will be `+00:00`.
     * 
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * event
     *    * faq
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * job
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    timeZoneUtcOffset?: string;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * contactCard
     *    * event
     *    * faq
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * helpArticle
     *    * hotel
     *    * job
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    timezone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    tollFreePhone?: string;
    /**
     * Indicates whether the entity has a treadmill.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    treadmill?: EntityTreadmillEnum;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * atm
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    ttyPhone?: string;
    /**
     * Indicates whether the entity offers turndown service.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    turndownService?: EntityTurndownServiceEnum;
    /**
     * Valid Twitter handle for the entity without the leading "@" (e.g., `JohnSmith`)
     * 
     * If you submit an invalid Twitter handle, it will be ignored. The success response will contain a warning message explaining why your Twitter handle wasn't stored in the system.
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {string}
     * @memberof Entity
     */
    twitterHandle?: string;
    /**
     * 
     * @type {EntityUberLink}
     * @memberof Entity
     */
    uberLink?: EntityUberLink;
    /**
     * 
     * @type {EntityUberTripBranding}
     * @memberof Entity
     */
    uberTripBranding?: EntityUberTripBranding;
    /**
     * Indicates whether the entity offers valet parking services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    valetParking?: EntityValetParkingEnum;
    /**
     * The date this entity is valid through.
     * 
     * Filtering Type: `datetime`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {Date}
     * @memberof Entity
     */
    validThrough?: Date;
    /**
     * Indicates whether the entity has a vending machine.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    vendingMachine?: EntityVendingMachineEnum;
    /**
     * Name of the venue where the event is being held
     * 
     * Filtering Type: `text`
     * 
     * ```
     * Eligible For: 
     *    * event
     * ```
     * @type {string}
     * @memberof Entity
     */
    venueName?: string;
    /**
     * Valid YouTube URLs for embedding a video on some publisher sites
     * 
     * **NOTE:** Currently, only the first URL in the Array appears in your listings.
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * 
     * Filtering Type: `list of object`
     * 
     * ```
     * Eligible For: 
     *    * financialProfessional
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * product
     *    * restaurant
     * ```
     * @type {Set<EntityVideos>}
     * @memberof Entity
     */
    videos?: Set<EntityVideos>;
    /**
     * Indicates whether the entity has a wading pool.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    wadingPool?: EntityWadingPoolEnum;
    /**
     * Indicates whether the entity offers wake up call services.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    wakeUpCalls?: EntityWakeUpCallsEnum;
    /**
     * 
     * @type {EntityWalkableCoordinate}
     * @memberof Entity
     */
    walkableCoordinate?: EntityWalkableCoordinate;
    /**
     * Indicates whether the entity has a water park.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    waterPark?: EntityWaterParkEnum;
    /**
     * Indicates whether the entity offers water skiing.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    waterSkiing?: EntityWaterSkiingEnum;
    /**
     * Indicates whether the entity offers any kind of watercrafts.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    watercraft?: EntityWatercraftEnum;
    /**
     * Indicates whether the entity has a water slide.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    waterslide?: EntityWaterslideEnum;
    /**
     * Indicates whether the entity has a wave pool.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    wavePool?: EntityWavePoolEnum;
    /**
     * 
     * @type {EntityWebsiteUrl}
     * @memberof Entity
     */
    websiteUrl?: EntityWebsiteUrl;
    /**
     * Indicates whether the entity has a weight machine.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    weightMachine?: EntityWeightMachineEnum;
    /**
     * Indicates if the entity is wheelchair accessible.
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    wheelchairAccessible?: EntityWheelchairAccessibleEnum;
    /**
     * Indicates whether the entity has WiFi available
     * 
     * Filtering Type: `option`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {string}
     * @memberof Entity
     */
    wifiAvailable?: EntityWifiAvailableEnum;
    /**
     * Indicates whether the job is remote.
     * 
     * Filtering Type: `boolean`
     * 
     * ```
     * Eligible For: 
     *    * job
     * ```
     * @type {boolean}
     * @memberof Entity
     */
    workRemote?: boolean;
    /**
     * The year the entity was established.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * healthcareFacility
     *    * healthcareProfessional
     *    * hotel
     *    * location
     *    * restaurant
     * ```
     * @type {number}
     * @memberof Entity
     */
    yearEstablished?: number;
    /**
     * The most recent year the entity was partially or completely renovated.
     * 
     * Filtering Type: `integer`
     * 
     * ```
     * Eligible For: 
     *    * hotel
     * ```
     * @type {number}
     * @memberof Entity
     */
    yearLastRenovated?: number;
    /**
     * 
     * @type {EntityYextDisplayCoordinate}
     * @memberof Entity
     */
    yextDisplayCoordinate?: EntityYextDisplayCoordinate;
    /**
     * 
     * @type {EntityYextDropoffCoordinate}
     * @memberof Entity
     */
    yextDropoffCoordinate?: EntityYextDropoffCoordinate;
    /**
     * 
     * @type {EntityYextPickupCoordinate}
     * @memberof Entity
     */
    yextPickupCoordinate?: EntityYextPickupCoordinate;
    /**
     * 
     * @type {EntityYextRoutableCoordinate}
     * @memberof Entity
     */
    yextRoutableCoordinate?: EntityYextRoutableCoordinate;
    /**
     * 
     * @type {EntityYextWalkableCoordinate}
     * @memberof Entity
     */
    yextWalkableCoordinate?: EntityYextWalkableCoordinate;
}

/**
* @export
* @enum {string}
*/
export enum EntityAdultPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityAirportShuttleEnum {
    AirportShuttleAvailable = 'AIRPORT_SHUTTLE_AVAILABLE',
    AirportShuttleAvailableForFree = 'AIRPORT_SHUTTLE_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityAirportTransferEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityAllInclusiveEnum {
    AllInclusiveRatesAvailable = 'ALL_INCLUSIVE_RATES_AVAILABLE',
    AllInclusiveRatesOnly = 'ALL_INCLUSIVE_RATES_ONLY',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityAttireEnum {
    Unspecified = 'UNSPECIFIED',
    Dressy = 'DRESSY',
    Casual = 'CASUAL',
    Formal = 'FORMAL'
}/**
* @export
* @enum {string}
*/
export enum EntityBabysittingOfferedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBaggageStorageEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBarEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBeachAccessEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBeachFrontPropertyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBicyclesEnum {
    BicycleRentals = 'BICYCLE_RENTALS',
    BicycleRentalsForFree = 'BICYCLE_RENTALS_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBoutiqueStoresEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBreakfastEnum {
    BreakfastAvailable = 'BREAKFAST_AVAILABLE',
    BreakfastAvailableForFree = 'BREAKFAST_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityBusinessCenterEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityCarRentalEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityCasinoEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityCatsAllowedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityConciergeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityConvenienceStoreEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityCurrencyExchangeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityDegreesEnum {
    Anp = 'ANP',
    Apn = 'APN',
    Aprn = 'APRN',
    Arnp = 'ARNP',
    Cnm = 'CNM',
    Cnp = 'CNP',
    Cns = 'CNS',
    Cpnp = 'CPNP',
    Crna = 'CRNA',
    Crnp = 'CRNP',
    Dc = 'DC',
    Dds = 'DDS',
    Dmd = 'DMD',
    Dnp = 'DNP',
    Do = 'DO',
    Dpm = 'DPM',
    Dvm = 'DVM',
    Fnp = 'FNP',
    Gnp = 'GNP',
    Lac = 'LAC',
    Lpn = 'LPN',
    Mba = 'MBA',
    Mbbs = 'MBBS',
    Md = 'MD',
    Mph = 'MPH',
    Nd = 'ND',
    Np = 'NP',
    Od = 'OD',
    Pa = 'PA',
    Pac = 'PAC',
    Pharmd = 'PHARMD',
    Phd = 'PHD',
    Pnp = 'PNP',
    Psyd = 'PSYD',
    Vmd = 'VMD',
    Whnp = 'WHNP'
}/**
* @export
* @enum {string}
*/
export enum EntityDoctorOnCallEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityDogsAllowedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityElectricChargingStationEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityElevatorEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityEllipticalMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityEmploymentTypeEnum {
    FullTime = 'FULL_TIME',
    PartTime = 'PART_TIME',
    Contractor = 'CONTRACTOR',
    Temporary = 'TEMPORARY',
    Intern = 'INTERN',
    Volunteer = 'VOLUNTEER',
    PerDiem = 'PER_DIEM',
    Other = 'OTHER'
}/**
* @export
* @enum {string}
*/
export enum EntityEventStatusEnum {
    Scheduled = 'SCHEDULED',
    Rescheduled = 'RESCHEDULED',
    Postponed = 'POSTPONED',
    Canceled = 'CANCELED',
    EventMovedOnline = 'EVENT_MOVED_ONLINE'
}/**
* @export
* @enum {string}
*/
export enum EntityFitnessCenterEnum {
    FitnessCenterAvailable = 'FITNESS_CENTER_AVAILABLE',
    FitnessCenterAvailableForFree = 'FITNESS_CENTER_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityFreeWeightsEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityFrontDeskEnum {
    FrontDeskAvailable = 'FRONT_DESK_AVAILABLE',
    FrontDeskAvailable24Hours = 'FRONT_DESK_AVAILABLE_24_HOURS',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityGameRoomEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityGenderEnum {
    Unspecified = 'UNSPECIFIED',
    Female = 'FEMALE',
    Male = 'MALE'
}/**
* @export
* @enum {string}
*/
export enum EntityGiftShopEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityGolfEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityHorsebackRidingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityHotTubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityHousekeepingEnum {
    HousekeepingAvailable = 'HOUSEKEEPING_AVAILABLE',
    HousekeepingAvailableDaily = 'HOUSEKEEPING_AVAILABLE_DAILY',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityKidFriendlyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityKidsClubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityKidsStayFreeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityLaundryEnum {
    FullService = 'FULL_SERVICE',
    SelfService = 'SELF_SERVICE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityLazyRiverEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityLifeguardEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityLocalShuttleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityLocationTypeEnum {
    Location = 'LOCATION',
    HealthcareFacility = 'HEALTHCARE_FACILITY',
    HealthcareProfessional = 'HEALTHCARE_PROFESSIONAL',
    Atm = 'ATM',
    Restaurant = 'RESTAURANT',
    Hotel = 'HOTEL'
}/**
* @export
* @enum {string}
*/
export enum EntityMassageEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityMealsServedEnum {
    Breakfast = 'BREAKFAST',
    Lunch = 'LUNCH',
    Brunch = 'BRUNCH',
    Dinner = 'DINNER',
    HappyHour = 'HAPPY_HOUR',
    LateNight = 'LATE_NIGHT'
}/**
* @export
* @enum {string}
*/
export enum EntityMobilityAccessibleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityNightclubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityParkingEnum {
    ParkingAvailable = 'PARKING_AVAILABLE',
    ParkingAvailableForFree = 'PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityPaymentOptionsEnum {
    Alipay = 'ALIPAY',
    Americanexpress = 'AMERICANEXPRESS',
    Androidpay = 'ANDROIDPAY',
    Applepay = 'APPLEPAY',
    Atm = 'ATM',
    Atmquick = 'ATMQUICK',
    Bacs = 'BACS',
    Bancontact = 'BANCONTACT',
    Bankdeposit = 'BANKDEPOSIT',
    Bankpay = 'BANKPAY',
    Bgo = 'BGO',
    Bitcoin = 'BITCOIN',
    Bar = 'Bar',
    Cartasi = 'CARTASI',
    Cash = 'CASH',
    Ccs = 'CCS',
    Check = 'CHECK',
    Conb = 'CONB',
    Cvvv = 'CVVV',
    Debitnote = 'DEBITNOTE',
    Dinersclub = 'DINERSCLUB',
    Directdebit = 'DIRECTDEBIT',
    Discover = 'DISCOVER',
    Eckarte = 'ECKARTE',
    Ecocheque = 'ECOCHEQUE',
    Ekena = 'EKENA',
    Emv = 'EMV',
    Financing = 'FINANCING',
    Gopay = 'GOPAY',
    Hayakaken = 'HAYAKAKEN',
    Hebag = 'HEBAG',
    Ibod = 'IBOD',
    Iccards = 'ICCARDS',
    Icoca = 'ICOCA',
    Id = 'ID',
    Ideal = 'IDEAL',
    Inca = 'INCA',
    Invoice = 'INVOICE',
    Jcb = 'JCB',
    JCoinPay = 'JCoinPay',
    Jkopay = 'JKOPAY',
    Kitaca = 'KITACA',
    Kla = 'KLA',
    Klarna = 'KLARNA',
    Linepay = 'LINEPAY',
    Maestro = 'MAESTRO',
    Manaca = 'MANACA',
    Mastercard = 'MASTERCARD',
    Mipay = 'MIPAY',
    Monizze = 'MONIZZE',
    Mpay = 'MPAY',
    ManuelleLastsch = 'Manuelle Lastsch',
    Merpay = 'Merpay',
    Nanaco = 'NANACO',
    Nexi = 'NEXI',
    Nimoca = 'NIMOCA',
    Orem = 'OREM',
    Pasmo = 'PASMO',
    Paybackpay = 'PAYBACKPAY',
    Paybox = 'PAYBOX',
    Payconiq = 'PAYCONIQ',
    Paypal = 'PAYPAL',
    Paypay = 'PAYPAY',
    Paysec = 'PAYSEC',
    Pin = 'PIN',
    Postepay = 'POSTEPAY',
    Qrcode = 'QRCODE',
    Quicpay = 'QUICPAY',
    Rakutenedy = 'RAKUTENEDY',
    Rakutenpay = 'RAKUTENPAY',
    Samsungpay = 'SAMSUNGPAY',
    Sodexo = 'SODEXO',
    Sugoca = 'SUGOCA',
    Suica = 'SUICA',
    Swish = 'SWISH',
    Ticketrestaurant = 'TICKETRESTAURANT',
    Toica = 'TOICA',
    Travelerscheck = 'TRAVELERSCHECK',
    Tscubic = 'TSCUBIC',
    Twint = 'TWINT',
    Unionpay = 'UNIONPAY',
    Vev = 'VEV',
    Visa = 'VISA',
    Visaelectron = 'VISAELECTRON',
    Vob = 'VOB',
    Voucher = 'VOUCHER',
    Vpay = 'VPAY',
    Waon = 'WAON',
    Wechatpay = 'WECHATPAY',
    Wiretransfer = 'WIRETRANSFER',
    YuchoPay = 'Yucho Pay',
    Zelle = 'ZELLE',
    AuPay = 'auPay',
    DBarai = 'dBarai',
    Berweisung = 'Überweisung'
}/**
* @export
* @enum {string}
*/
export enum EntityPetsAllowedEnum {
    PetsWelcome = 'PETS_WELCOME',
    PetsWelcomeForFree = 'PETS_WELCOME_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityPriceRangeEnum {
    Unspecified = 'UNSPECIFIED',
    One = 'ONE',
    Two = 'TWO',
    Three = 'THREE',
    Four = 'FOUR'
}/**
* @export
* @enum {string}
*/
export enum EntityPrivateBeachEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityPrivateCarServiceEnum {
    PrivateCarService = 'PRIVATE_CAR_SERVICE',
    PrivateCarServiceForFree = 'PRIVATE_CAR_SERVICE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityRankTrackingFrequencyEnum {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Quarterly = 'QUARTERLY'
}/**
* @export
* @enum {string}
*/
export enum EntityRankTrackingQueryTemplatesEnum {
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
export enum EntityRankTrackingSitesEnum {
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
export enum EntityRoomServiceEnum {
    RoomServiceAvailable = 'ROOM_SERVICE_AVAILABLE',
    RoomServiceAvailable24Hours = 'ROOM_SERVICE_AVAILABLE_24_HOURS',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySalonEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySaunaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityScubaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySelfParkingEnum {
    SelfParkingAvailable = 'SELF_PARKING_AVAILABLE',
    SelfParkingAvailableForFree = 'SELF_PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySmokeFreePropertyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySnorkelingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySocialHourEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntitySpaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityTableServiceEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityTennisEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityThermalPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityTicketAvailabilityEnum {
    InStock = 'IN_STOCK',
    SoldOut = 'SOLD_OUT',
    PreOrder = 'PRE_ORDER',
    Unspecified = 'UNSPECIFIED'
}/**
* @export
* @enum {string}
*/
export enum EntityTreadmillEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityTurndownServiceEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityValetParkingEnum {
    ValetParkingAvailable = 'VALET_PARKING_AVAILABLE',
    ValetParkingAvailableForFree = 'VALET_PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityVendingMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWadingPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWakeUpCallsEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWaterParkEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWaterSkiingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWatercraftEnum {
    WatercraftRentals = 'WATERCRAFT_RENTALS',
    WatercraftRentalsForFree = 'WATERCRAFT_RENTALS_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWaterslideEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWavePoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWeightMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWheelchairAccessibleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum EntityWifiAvailableEnum {
    WifiAvailable = 'WIFI_AVAILABLE',
    WifiAvailableForFree = 'WIFI_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}

export function EntityFromJSON(json: any): Entity {
    return EntityFromJSONTyped(json, false);
}

export function EntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): Entity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : EntityMetaFromJSON(json['meta']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'address': !exists(json, 'address') ? undefined : EntityAddressFromJSON(json['address']),
        'acceptingNewPatients': !exists(json, 'acceptingNewPatients') ? undefined : json['acceptingNewPatients'],
        'acceptsReservations': !exists(json, 'acceptsReservations') ? undefined : json['acceptsReservations'],
        'accessHours': !exists(json, 'accessHours') ? undefined : EntityAccessHoursFromJSON(json['accessHours']),
        'additionalHoursText': !exists(json, 'additionalHoursText') ? undefined : json['additionalHoursText'],
        'additionalPromotingLocations': !exists(json, 'additionalPromotingLocations') ? undefined : json['additionalPromotingLocations'],
        'addressHidden': !exists(json, 'addressHidden') ? undefined : json['addressHidden'],
        'admittingHospitals': !exists(json, 'admittingHospitals') ? undefined : json['admittingHospitals'],
        'adultPool': !exists(json, 'adultPool') ? undefined : json['adultPool'],
        'ageRange': !exists(json, 'ageRange') ? undefined : EntityAgeRangeFromJSON(json['ageRange']),
        'airportShuttle': !exists(json, 'airportShuttle') ? undefined : json['airportShuttle'],
        'airportTransfer': !exists(json, 'airportTransfer') ? undefined : json['airportTransfer'],
        'allInclusive': !exists(json, 'allInclusive') ? undefined : json['allInclusive'],
        'alternateNames': !exists(json, 'alternateNames') ? undefined : json['alternateNames'],
        'alternatePhone': !exists(json, 'alternatePhone') ? undefined : json['alternatePhone'],
        'alternateWebsites': !exists(json, 'alternateWebsites') ? undefined : json['alternateWebsites'],
        'androidAppUrl': !exists(json, 'androidAppUrl') ? undefined : json['androidAppUrl'],
        'answer': !exists(json, 'answer') ? undefined : json['answer'],
        'applicationUrl': !exists(json, 'applicationUrl') ? undefined : json['applicationUrl'],
        'associations': !exists(json, 'associations') ? undefined : json['associations'],
        'attendance': !exists(json, 'attendance') ? undefined : EntityAttendanceFromJSON(json['attendance']),
        'attire': !exists(json, 'attire') ? undefined : json['attire'],
        'babysittingOffered': !exists(json, 'babysittingOffered') ? undefined : json['babysittingOffered'],
        'baggageStorage': !exists(json, 'baggageStorage') ? undefined : json['baggageStorage'],
        'bar': !exists(json, 'bar') ? undefined : json['bar'],
        'beachAccess': !exists(json, 'beachAccess') ? undefined : json['beachAccess'],
        'beachFrontProperty': !exists(json, 'beachFrontProperty') ? undefined : json['beachFrontProperty'],
        'bicycles': !exists(json, 'bicycles') ? undefined : json['bicycles'],
        'bios': !exists(json, 'bios') ? undefined : EntityBiosFromJSON(json['bios']),
        'boutiqueStores': !exists(json, 'boutiqueStores') ? undefined : json['boutiqueStores'],
        'brands': !exists(json, 'brands') ? undefined : json['brands'],
        'breakfast': !exists(json, 'breakfast') ? undefined : json['breakfast'],
        'brunchHours': !exists(json, 'brunchHours') ? undefined : EntityBrunchHoursFromJSON(json['brunchHours']),
        'businessCenter': !exists(json, 'businessCenter') ? undefined : json['businessCenter'],
        'calendars': !exists(json, 'calendars') ? undefined : EntityCalendarsFromJSON(json['calendars']),
        'carRental': !exists(json, 'carRental') ? undefined : json['carRental'],
        'casino': !exists(json, 'casino') ? undefined : json['casino'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'catsAllowed': !exists(json, 'catsAllowed') ? undefined : json['catsAllowed'],
        'certifications': !exists(json, 'certifications') ? undefined : json['certifications'],
        'checkInTime': !exists(json, 'checkInTime') ? undefined : json['checkInTime'],
        'checkOutTime': !exists(json, 'checkOutTime') ? undefined : json['checkOutTime'],
        'classificationRating': !exists(json, 'classificationRating') ? undefined : json['classificationRating'],
        'closed': !exists(json, 'closed') ? undefined : json['closed'],
        'concierge': !exists(json, 'concierge') ? undefined : json['concierge'],
        'conditionsTreated': !exists(json, 'conditionsTreated') ? undefined : json['conditionsTreated'],
        'convenienceStore': !exists(json, 'convenienceStore') ? undefined : json['convenienceStore'],
        'currencyExchange': !exists(json, 'currencyExchange') ? undefined : json['currencyExchange'],
        'customKeywords': !exists(json, 'customKeywords') ? undefined : json['customKeywords'],
        'datePosted': !exists(json, 'datePosted') ? undefined : (new Date(json['datePosted'])),
        'degrees': !exists(json, 'degrees') ? undefined : json['degrees'],
        'deliveryHours': !exists(json, 'deliveryHours') ? undefined : EntityDeliveryHoursFromJSON(json['deliveryHours']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'displayCoordinate': !exists(json, 'displayCoordinate') ? undefined : EntityDisplayCoordinateFromJSON(json['displayCoordinate']),
        'doctorOnCall': !exists(json, 'doctorOnCall') ? undefined : json['doctorOnCall'],
        'dogsAllowed': !exists(json, 'dogsAllowed') ? undefined : json['dogsAllowed'],
        'driveThroughHours': !exists(json, 'driveThroughHours') ? undefined : EntityDriveThroughHoursFromJSON(json['driveThroughHours']),
        'dropoffCoordinate': !exists(json, 'dropoffCoordinate') ? undefined : EntityDropoffCoordinateFromJSON(json['dropoffCoordinate']),
        'educationList': !exists(json, 'educationList') ? undefined : (new Set((json['educationList'] as Array<any>).map(EntityEducationListFromJSON))),
        'electricChargingStation': !exists(json, 'electricChargingStation') ? undefined : json['electricChargingStation'],
        'elevator': !exists(json, 'elevator') ? undefined : json['elevator'],
        'ellipticalMachine': !exists(json, 'ellipticalMachine') ? undefined : json['ellipticalMachine'],
        'emails': !exists(json, 'emails') ? undefined : json['emails'],
        'employmentType': !exists(json, 'employmentType') ? undefined : json['employmentType'],
        'eventStatus': !exists(json, 'eventStatus') ? undefined : json['eventStatus'],
        'facebookCallToAction': !exists(json, 'facebookCallToAction') ? undefined : EntityFacebookCallToActionFromJSON(json['facebookCallToAction']),
        'facebookCoverPhoto': !exists(json, 'facebookCoverPhoto') ? undefined : EntityFacebookCoverPhotoFromJSON(json['facebookCoverPhoto']),
        'facebookDescriptor': !exists(json, 'facebookDescriptor') ? undefined : json['facebookDescriptor'],
        'facebookName': !exists(json, 'facebookName') ? undefined : json['facebookName'],
        'facebookOverrideCity': !exists(json, 'facebookOverrideCity') ? undefined : json['facebookOverrideCity'],
        'facebookPageUrl': !exists(json, 'facebookPageUrl') ? undefined : json['facebookPageUrl'],
        'facebookProfilePhoto': !exists(json, 'facebookProfilePhoto') ? undefined : EntityFacebookProfilePhotoFromJSON(json['facebookProfilePhoto']),
        'facebookVanityUrl': !exists(json, 'facebookVanityUrl') ? undefined : json['facebookVanityUrl'],
        'fax': !exists(json, 'fax') ? undefined : json['fax'],
        'featuredMessage': !exists(json, 'featuredMessage') ? undefined : EntityFeaturedMessageFromJSON(json['featuredMessage']),
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'firstPartyReviewPage': !exists(json, 'firstPartyReviewPage') ? undefined : json['firstPartyReviewPage'],
        'fitnessCenter': !exists(json, 'fitnessCenter') ? undefined : json['fitnessCenter'],
        'floorCount': !exists(json, 'floorCount') ? undefined : json['floorCount'],
        'freeWeights': !exists(json, 'freeWeights') ? undefined : json['freeWeights'],
        'frequentlyAskedQuestions': !exists(json, 'frequentlyAskedQuestions') ? undefined : (new Set((json['frequentlyAskedQuestions'] as Array<any>).map(EntityFrequentlyAskedQuestionsFromJSON))),
        'frontDesk': !exists(json, 'frontDesk') ? undefined : json['frontDesk'],
        'gameRoom': !exists(json, 'gameRoom') ? undefined : json['gameRoom'],
        'gender': !exists(json, 'gender') ? undefined : json['gender'],
        'geomodifier': !exists(json, 'geomodifier') ? undefined : json['geomodifier'],
        'giftShop': !exists(json, 'giftShop') ? undefined : json['giftShop'],
        'golf': !exists(json, 'golf') ? undefined : json['golf'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'googleCoverPhoto': !exists(json, 'googleCoverPhoto') ? undefined : EntityGoogleCoverPhotoFromJSON(json['googleCoverPhoto']),
        'googleMyBusinessLabels': !exists(json, 'googleMyBusinessLabels') ? undefined : json['googleMyBusinessLabels'],
        'googlePlaceId': !exists(json, 'googlePlaceId') ? undefined : json['googlePlaceId'],
        'googleProfilePhoto': !exists(json, 'googleProfilePhoto') ? undefined : EntityGoogleProfilePhotoFromJSON(json['googleProfilePhoto']),
        'googleWebsiteOverride': !exists(json, 'googleWebsiteOverride') ? undefined : json['googleWebsiteOverride'],
        'happyHours': !exists(json, 'happyHours') ? undefined : EntityHappyHoursFromJSON(json['happyHours']),
        'headshot': !exists(json, 'headshot') ? undefined : EntityHeadshotFromJSON(json['headshot']),
        'hiringOrganization': !exists(json, 'hiringOrganization') ? undefined : json['hiringOrganization'],
        'holidayHoursConversationEnabled': !exists(json, 'holidayHoursConversationEnabled') ? undefined : json['holidayHoursConversationEnabled'],
        'horsebackRiding': !exists(json, 'horsebackRiding') ? undefined : json['horsebackRiding'],
        'hotTub': !exists(json, 'hotTub') ? undefined : json['hotTub'],
        'hours': !exists(json, 'hours') ? undefined : EntityHoursFromJSON(json['hours']),
        'housekeeping': !exists(json, 'housekeeping') ? undefined : json['housekeeping'],
        'impressum': !exists(json, 'impressum') ? undefined : json['impressum'],
        'indoorPoolCount': !exists(json, 'indoorPoolCount') ? undefined : json['indoorPoolCount'],
        'instagramHandle': !exists(json, 'instagramHandle') ? undefined : json['instagramHandle'],
        'insuranceAccepted': !exists(json, 'insuranceAccepted') ? undefined : json['insuranceAccepted'],
        'iosAppUrl': !exists(json, 'iosAppUrl') ? undefined : json['iosAppUrl'],
        'isClusterPrimary': !exists(json, 'isClusterPrimary') ? undefined : json['isClusterPrimary'],
        'isFreeEvent': !exists(json, 'isFreeEvent') ? undefined : json['isFreeEvent'],
        'isoRegionCode': !exists(json, 'isoRegionCode') ? undefined : json['isoRegionCode'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'kidFriendly': !exists(json, 'kidFriendly') ? undefined : json['kidFriendly'],
        'kidsClub': !exists(json, 'kidsClub') ? undefined : json['kidsClub'],
        'kidsStayFree': !exists(json, 'kidsStayFree') ? undefined : json['kidsStayFree'],
        'kitchenHours': !exists(json, 'kitchenHours') ? undefined : EntityKitchenHoursFromJSON(json['kitchenHours']),
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'languages': !exists(json, 'languages') ? undefined : json['languages'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'laundry': !exists(json, 'laundry') ? undefined : json['laundry'],
        'lazyRiver': !exists(json, 'lazyRiver') ? undefined : json['lazyRiver'],
        'lifeguard': !exists(json, 'lifeguard') ? undefined : json['lifeguard'],
        'linkedLocation': !exists(json, 'linkedLocation') ? undefined : json['linkedLocation'],
        'localPhone': !exists(json, 'localPhone') ? undefined : json['localPhone'],
        'localShuttle': !exists(json, 'localShuttle') ? undefined : json['localShuttle'],
        'locatedIn': !exists(json, 'locatedIn') ? undefined : json['locatedIn'],
        'location': !exists(json, 'location') ? undefined : EntityLocationFromJSON(json['location']),
        'locationType': !exists(json, 'locationType') ? undefined : json['locationType'],
        'logo': !exists(json, 'logo') ? undefined : EntityLogoFromJSON(json['logo']),
        'mainPhone': !exists(json, 'mainPhone') ? undefined : json['mainPhone'],
        'massage': !exists(json, 'massage') ? undefined : json['massage'],
        'maxAgeOfKidsStayFree': !exists(json, 'maxAgeOfKidsStayFree') ? undefined : json['maxAgeOfKidsStayFree'],
        'maxNumberOfKidsStayFree': !exists(json, 'maxNumberOfKidsStayFree') ? undefined : json['maxNumberOfKidsStayFree'],
        'mealsServed': !exists(json, 'mealsServed') ? undefined : json['mealsServed'],
        'meetingRoomCount': !exists(json, 'meetingRoomCount') ? undefined : json['meetingRoomCount'],
        'menuUrl': !exists(json, 'menuUrl') ? undefined : EntityMenuUrlFromJSON(json['menuUrl']),
        'menus': !exists(json, 'menus') ? undefined : EntityMenusFromJSON(json['menus']),
        'middleName': !exists(json, 'middleName') ? undefined : json['middleName'],
        'mobilePhone': !exists(json, 'mobilePhone') ? undefined : json['mobilePhone'],
        'mobilityAccessible': !exists(json, 'mobilityAccessible') ? undefined : json['mobilityAccessible'],
        'nightclub': !exists(json, 'nightclub') ? undefined : json['nightclub'],
        'npi': !exists(json, 'npi') ? undefined : json['npi'],
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'officeName': !exists(json, 'officeName') ? undefined : json['officeName'],
        'onlineServiceHours': !exists(json, 'onlineServiceHours') ? undefined : EntityOnlineServiceHoursFromJSON(json['onlineServiceHours']),
        'orderUrl': !exists(json, 'orderUrl') ? undefined : EntityOrderUrlFromJSON(json['orderUrl']),
        'organizerEmail': !exists(json, 'organizerEmail') ? undefined : json['organizerEmail'],
        'organizerName': !exists(json, 'organizerName') ? undefined : json['organizerName'],
        'organizerPhone': !exists(json, 'organizerPhone') ? undefined : json['organizerPhone'],
        'outdoorPoolCount': !exists(json, 'outdoorPoolCount') ? undefined : json['outdoorPoolCount'],
        'parking': !exists(json, 'parking') ? undefined : json['parking'],
        'paymentOptions': !exists(json, 'paymentOptions') ? undefined : json['paymentOptions'],
        'performers': !exists(json, 'performers') ? undefined : json['performers'],
        'petsAllowed': !exists(json, 'petsAllowed') ? undefined : json['petsAllowed'],
        'photoGallery': !exists(json, 'photoGallery') ? undefined : ((json['photoGallery'] as Array<any>).map(EntityPhotoGalleryFromJSON)),
        'pickupCoordinate': !exists(json, 'pickupCoordinate') ? undefined : EntityPickupCoordinateFromJSON(json['pickupCoordinate']),
        'pickupHours': !exists(json, 'pickupHours') ? undefined : EntityPickupHoursFromJSON(json['pickupHours']),
        'priceRange': !exists(json, 'priceRange') ? undefined : json['priceRange'],
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'privateBeach': !exists(json, 'privateBeach') ? undefined : json['privateBeach'],
        'privateCarService': !exists(json, 'privateCarService') ? undefined : json['privateCarService'],
        'productLists': !exists(json, 'productLists') ? undefined : EntityProductListsFromJSON(json['productLists']),
        'products': !exists(json, 'products') ? undefined : json['products'],
        'questionsAndAnswers': !exists(json, 'questionsAndAnswers') ? undefined : json['questionsAndAnswers'],
        'rankTrackingCompetitors': !exists(json, 'rankTrackingCompetitors') ? undefined : (new Set((json['rankTrackingCompetitors'] as Array<any>).map(EntityRankTrackingCompetitorsFromJSON))),
        'rankTrackingEnabled': !exists(json, 'rankTrackingEnabled') ? undefined : json['rankTrackingEnabled'],
        'rankTrackingFrequency': !exists(json, 'rankTrackingFrequency') ? undefined : json['rankTrackingFrequency'],
        'rankTrackingQueryTemplates': !exists(json, 'rankTrackingQueryTemplates') ? undefined : json['rankTrackingQueryTemplates'],
        'rankTrackingSites': !exists(json, 'rankTrackingSites') ? undefined : json['rankTrackingSites'],
        'reservationUrl': !exists(json, 'reservationUrl') ? undefined : EntityReservationUrlFromJSON(json['reservationUrl']),
        'restaurantCount': !exists(json, 'restaurantCount') ? undefined : json['restaurantCount'],
        'reviewGenerationUrl': !exists(json, 'reviewGenerationUrl') ? undefined : json['reviewGenerationUrl'],
        'reviewResponseConversationEnabled': !exists(json, 'reviewResponseConversationEnabled') ? undefined : json['reviewResponseConversationEnabled'],
        'roomCount': !exists(json, 'roomCount') ? undefined : json['roomCount'],
        'roomService': !exists(json, 'roomService') ? undefined : json['roomService'],
        'routableCoordinate': !exists(json, 'routableCoordinate') ? undefined : EntityRoutableCoordinateFromJSON(json['routableCoordinate']),
        'salon': !exists(json, 'salon') ? undefined : json['salon'],
        'sauna': !exists(json, 'sauna') ? undefined : json['sauna'],
        'scuba': !exists(json, 'scuba') ? undefined : json['scuba'],
        'selfParking': !exists(json, 'selfParking') ? undefined : json['selfParking'],
        'seniorHours': !exists(json, 'seniorHours') ? undefined : EntitySeniorHoursFromJSON(json['seniorHours']),
        'serviceArea': !exists(json, 'serviceArea') ? undefined : EntityServiceAreaFromJSON(json['serviceArea']),
        'serviceAreaPlaces': !exists(json, 'serviceAreaPlaces') ? undefined : (new Set((json['serviceAreaPlaces'] as Array<any>).map(EntityServiceAreaPlacesFromJSON))),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'smokeFreeProperty': !exists(json, 'smokeFreeProperty') ? undefined : json['smokeFreeProperty'],
        'snorkeling': !exists(json, 'snorkeling') ? undefined : json['snorkeling'],
        'socialHour': !exists(json, 'socialHour') ? undefined : json['socialHour'],
        'spa': !exists(json, 'spa') ? undefined : json['spa'],
        'specialities': !exists(json, 'specialities') ? undefined : json['specialities'],
        'tableService': !exists(json, 'tableService') ? undefined : json['tableService'],
        'takeoutHours': !exists(json, 'takeoutHours') ? undefined : EntityTakeoutHoursFromJSON(json['takeoutHours']),
        'tennis': !exists(json, 'tennis') ? undefined : json['tennis'],
        'thermalPool': !exists(json, 'thermalPool') ? undefined : json['thermalPool'],
        'ticketAvailability': !exists(json, 'ticketAvailability') ? undefined : json['ticketAvailability'],
        'ticketPriceRange': !exists(json, 'ticketPriceRange') ? undefined : EntityTicketPriceRangeFromJSON(json['ticketPriceRange']),
        'ticketSaleDateTime': !exists(json, 'ticketSaleDateTime') ? undefined : (new Date(json['ticketSaleDateTime'])),
        'ticketUrl': !exists(json, 'ticketUrl') ? undefined : json['ticketUrl'],
        'time': !exists(json, 'time') ? undefined : EntityTimeFromJSON(json['time']),
        'timeZoneUtcOffset': !exists(json, 'timeZoneUtcOffset') ? undefined : json['timeZoneUtcOffset'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'tollFreePhone': !exists(json, 'tollFreePhone') ? undefined : json['tollFreePhone'],
        'treadmill': !exists(json, 'treadmill') ? undefined : json['treadmill'],
        'ttyPhone': !exists(json, 'ttyPhone') ? undefined : json['ttyPhone'],
        'turndownService': !exists(json, 'turndownService') ? undefined : json['turndownService'],
        'twitterHandle': !exists(json, 'twitterHandle') ? undefined : json['twitterHandle'],
        'uberLink': !exists(json, 'uberLink') ? undefined : EntityUberLinkFromJSON(json['uberLink']),
        'uberTripBranding': !exists(json, 'uberTripBranding') ? undefined : EntityUberTripBrandingFromJSON(json['uberTripBranding']),
        'valetParking': !exists(json, 'valetParking') ? undefined : json['valetParking'],
        'validThrough': !exists(json, 'validThrough') ? undefined : (new Date(json['validThrough'])),
        'vendingMachine': !exists(json, 'vendingMachine') ? undefined : json['vendingMachine'],
        'venueName': !exists(json, 'venueName') ? undefined : json['venueName'],
        'videos': !exists(json, 'videos') ? undefined : (new Set((json['videos'] as Array<any>).map(EntityVideosFromJSON))),
        'wadingPool': !exists(json, 'wadingPool') ? undefined : json['wadingPool'],
        'wakeUpCalls': !exists(json, 'wakeUpCalls') ? undefined : json['wakeUpCalls'],
        'walkableCoordinate': !exists(json, 'walkableCoordinate') ? undefined : EntityWalkableCoordinateFromJSON(json['walkableCoordinate']),
        'waterPark': !exists(json, 'waterPark') ? undefined : json['waterPark'],
        'waterSkiing': !exists(json, 'waterSkiing') ? undefined : json['waterSkiing'],
        'watercraft': !exists(json, 'watercraft') ? undefined : json['watercraft'],
        'waterslide': !exists(json, 'waterslide') ? undefined : json['waterslide'],
        'wavePool': !exists(json, 'wavePool') ? undefined : json['wavePool'],
        'websiteUrl': !exists(json, 'websiteUrl') ? undefined : EntityWebsiteUrlFromJSON(json['websiteUrl']),
        'weightMachine': !exists(json, 'weightMachine') ? undefined : json['weightMachine'],
        'wheelchairAccessible': !exists(json, 'wheelchairAccessible') ? undefined : json['wheelchairAccessible'],
        'wifiAvailable': !exists(json, 'wifiAvailable') ? undefined : json['wifiAvailable'],
        'workRemote': !exists(json, 'workRemote') ? undefined : json['workRemote'],
        'yearEstablished': !exists(json, 'yearEstablished') ? undefined : json['yearEstablished'],
        'yearLastRenovated': !exists(json, 'yearLastRenovated') ? undefined : json['yearLastRenovated'],
        'yextDisplayCoordinate': !exists(json, 'yextDisplayCoordinate') ? undefined : EntityYextDisplayCoordinateFromJSON(json['yextDisplayCoordinate']),
        'yextDropoffCoordinate': !exists(json, 'yextDropoffCoordinate') ? undefined : EntityYextDropoffCoordinateFromJSON(json['yextDropoffCoordinate']),
        'yextPickupCoordinate': !exists(json, 'yextPickupCoordinate') ? undefined : EntityYextPickupCoordinateFromJSON(json['yextPickupCoordinate']),
        'yextRoutableCoordinate': !exists(json, 'yextRoutableCoordinate') ? undefined : EntityYextRoutableCoordinateFromJSON(json['yextRoutableCoordinate']),
        'yextWalkableCoordinate': !exists(json, 'yextWalkableCoordinate') ? undefined : EntityYextWalkableCoordinateFromJSON(json['yextWalkableCoordinate']),
    };
}

export function EntityToJSON(value?: Entity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': EntityMetaToJSON(value.meta),
        'name': value.name,
        'address': EntityAddressToJSON(value.address),
        'acceptingNewPatients': value.acceptingNewPatients,
        'acceptsReservations': value.acceptsReservations,
        'accessHours': EntityAccessHoursToJSON(value.accessHours),
        'additionalHoursText': value.additionalHoursText,
        'additionalPromotingLocations': value.additionalPromotingLocations,
        'addressHidden': value.addressHidden,
        'admittingHospitals': value.admittingHospitals,
        'adultPool': value.adultPool,
        'ageRange': EntityAgeRangeToJSON(value.ageRange),
        'airportShuttle': value.airportShuttle,
        'airportTransfer': value.airportTransfer,
        'allInclusive': value.allInclusive,
        'alternateNames': value.alternateNames,
        'alternatePhone': value.alternatePhone,
        'alternateWebsites': value.alternateWebsites,
        'androidAppUrl': value.androidAppUrl,
        'answer': value.answer,
        'applicationUrl': value.applicationUrl,
        'associations': value.associations,
        'attendance': EntityAttendanceToJSON(value.attendance),
        'attire': value.attire,
        'babysittingOffered': value.babysittingOffered,
        'baggageStorage': value.baggageStorage,
        'bar': value.bar,
        'beachAccess': value.beachAccess,
        'beachFrontProperty': value.beachFrontProperty,
        'bicycles': value.bicycles,
        'bios': EntityBiosToJSON(value.bios),
        'boutiqueStores': value.boutiqueStores,
        'brands': value.brands,
        'breakfast': value.breakfast,
        'brunchHours': EntityBrunchHoursToJSON(value.brunchHours),
        'businessCenter': value.businessCenter,
        'calendars': EntityCalendarsToJSON(value.calendars),
        'carRental': value.carRental,
        'casino': value.casino,
        'categoryIds': value.categoryIds,
        'catsAllowed': value.catsAllowed,
        'certifications': value.certifications,
        'checkInTime': value.checkInTime,
        'checkOutTime': value.checkOutTime,
        'classificationRating': value.classificationRating,
        'closed': value.closed,
        'concierge': value.concierge,
        'conditionsTreated': value.conditionsTreated,
        'convenienceStore': value.convenienceStore,
        'currencyExchange': value.currencyExchange,
        'customKeywords': value.customKeywords,
        'datePosted': value.datePosted === undefined ? undefined : (value.datePosted.toISOString().substr(0,10)),
        'degrees': value.degrees,
        'deliveryHours': EntityDeliveryHoursToJSON(value.deliveryHours),
        'description': value.description,
        'displayCoordinate': EntityDisplayCoordinateToJSON(value.displayCoordinate),
        'doctorOnCall': value.doctorOnCall,
        'dogsAllowed': value.dogsAllowed,
        'driveThroughHours': EntityDriveThroughHoursToJSON(value.driveThroughHours),
        'dropoffCoordinate': EntityDropoffCoordinateToJSON(value.dropoffCoordinate),
        'educationList': value.educationList === undefined ? undefined : (Array.from(value.educationList as Set<any>).map(EntityEducationListToJSON)),
        'electricChargingStation': value.electricChargingStation,
        'elevator': value.elevator,
        'ellipticalMachine': value.ellipticalMachine,
        'emails': value.emails,
        'employmentType': value.employmentType,
        'eventStatus': value.eventStatus,
        'facebookCallToAction': EntityFacebookCallToActionToJSON(value.facebookCallToAction),
        'facebookCoverPhoto': EntityFacebookCoverPhotoToJSON(value.facebookCoverPhoto),
        'facebookDescriptor': value.facebookDescriptor,
        'facebookName': value.facebookName,
        'facebookOverrideCity': value.facebookOverrideCity,
        'facebookPageUrl': value.facebookPageUrl,
        'facebookProfilePhoto': EntityFacebookProfilePhotoToJSON(value.facebookProfilePhoto),
        'facebookVanityUrl': value.facebookVanityUrl,
        'fax': value.fax,
        'featuredMessage': EntityFeaturedMessageToJSON(value.featuredMessage),
        'firstName': value.firstName,
        'firstPartyReviewPage': value.firstPartyReviewPage,
        'fitnessCenter': value.fitnessCenter,
        'floorCount': value.floorCount,
        'freeWeights': value.freeWeights,
        'frequentlyAskedQuestions': value.frequentlyAskedQuestions === undefined ? undefined : (Array.from(value.frequentlyAskedQuestions as Set<any>).map(EntityFrequentlyAskedQuestionsToJSON)),
        'frontDesk': value.frontDesk,
        'gameRoom': value.gameRoom,
        'gender': value.gender,
        'geomodifier': value.geomodifier,
        'giftShop': value.giftShop,
        'golf': value.golf,
        'googleAttributes': value.googleAttributes,
        'googleCoverPhoto': EntityGoogleCoverPhotoToJSON(value.googleCoverPhoto),
        'googleMyBusinessLabels': value.googleMyBusinessLabels,
        'googlePlaceId': value.googlePlaceId,
        'googleProfilePhoto': EntityGoogleProfilePhotoToJSON(value.googleProfilePhoto),
        'googleWebsiteOverride': value.googleWebsiteOverride,
        'happyHours': EntityHappyHoursToJSON(value.happyHours),
        'headshot': EntityHeadshotToJSON(value.headshot),
        'hiringOrganization': value.hiringOrganization,
        'holidayHoursConversationEnabled': value.holidayHoursConversationEnabled,
        'horsebackRiding': value.horsebackRiding,
        'hotTub': value.hotTub,
        'hours': EntityHoursToJSON(value.hours),
        'housekeeping': value.housekeeping,
        'impressum': value.impressum,
        'indoorPoolCount': value.indoorPoolCount,
        'instagramHandle': value.instagramHandle,
        'insuranceAccepted': value.insuranceAccepted,
        'iosAppUrl': value.iosAppUrl,
        'isClusterPrimary': value.isClusterPrimary,
        'isFreeEvent': value.isFreeEvent,
        'isoRegionCode': value.isoRegionCode,
        'keywords': value.keywords,
        'kidFriendly': value.kidFriendly,
        'kidsClub': value.kidsClub,
        'kidsStayFree': value.kidsStayFree,
        'kitchenHours': EntityKitchenHoursToJSON(value.kitchenHours),
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'languages': value.languages,
        'lastName': value.lastName,
        'laundry': value.laundry,
        'lazyRiver': value.lazyRiver,
        'lifeguard': value.lifeguard,
        'linkedLocation': value.linkedLocation,
        'localPhone': value.localPhone,
        'localShuttle': value.localShuttle,
        'locatedIn': value.locatedIn,
        'location': EntityLocationToJSON(value.location),
        'locationType': value.locationType,
        'logo': EntityLogoToJSON(value.logo),
        'mainPhone': value.mainPhone,
        'massage': value.massage,
        'maxAgeOfKidsStayFree': value.maxAgeOfKidsStayFree,
        'maxNumberOfKidsStayFree': value.maxNumberOfKidsStayFree,
        'mealsServed': value.mealsServed,
        'meetingRoomCount': value.meetingRoomCount,
        'menuUrl': EntityMenuUrlToJSON(value.menuUrl),
        'menus': EntityMenusToJSON(value.menus),
        'middleName': value.middleName,
        'mobilePhone': value.mobilePhone,
        'mobilityAccessible': value.mobilityAccessible,
        'nightclub': value.nightclub,
        'npi': value.npi,
        'nudgeEnabled': value.nudgeEnabled,
        'officeName': value.officeName,
        'onlineServiceHours': EntityOnlineServiceHoursToJSON(value.onlineServiceHours),
        'orderUrl': EntityOrderUrlToJSON(value.orderUrl),
        'organizerEmail': value.organizerEmail,
        'organizerName': value.organizerName,
        'organizerPhone': value.organizerPhone,
        'outdoorPoolCount': value.outdoorPoolCount,
        'parking': value.parking,
        'paymentOptions': value.paymentOptions,
        'performers': value.performers,
        'petsAllowed': value.petsAllowed,
        'photoGallery': value.photoGallery === undefined ? undefined : ((value.photoGallery as Array<any>).map(EntityPhotoGalleryToJSON)),
        'pickupCoordinate': EntityPickupCoordinateToJSON(value.pickupCoordinate),
        'pickupHours': EntityPickupHoursToJSON(value.pickupHours),
        'priceRange': value.priceRange,
        'primaryConversationContact': value.primaryConversationContact,
        'privateBeach': value.privateBeach,
        'privateCarService': value.privateCarService,
        'productLists': EntityProductListsToJSON(value.productLists),
        'products': value.products,
        'questionsAndAnswers': value.questionsAndAnswers,
        'rankTrackingCompetitors': value.rankTrackingCompetitors === undefined ? undefined : (Array.from(value.rankTrackingCompetitors as Set<any>).map(EntityRankTrackingCompetitorsToJSON)),
        'rankTrackingEnabled': value.rankTrackingEnabled,
        'rankTrackingFrequency': value.rankTrackingFrequency,
        'rankTrackingQueryTemplates': value.rankTrackingQueryTemplates,
        'rankTrackingSites': value.rankTrackingSites,
        'reservationUrl': EntityReservationUrlToJSON(value.reservationUrl),
        'restaurantCount': value.restaurantCount,
        'reviewGenerationUrl': value.reviewGenerationUrl,
        'reviewResponseConversationEnabled': value.reviewResponseConversationEnabled,
        'roomCount': value.roomCount,
        'roomService': value.roomService,
        'routableCoordinate': EntityRoutableCoordinateToJSON(value.routableCoordinate),
        'salon': value.salon,
        'sauna': value.sauna,
        'scuba': value.scuba,
        'selfParking': value.selfParking,
        'seniorHours': EntitySeniorHoursToJSON(value.seniorHours),
        'serviceArea': EntityServiceAreaToJSON(value.serviceArea),
        'serviceAreaPlaces': value.serviceAreaPlaces === undefined ? undefined : (Array.from(value.serviceAreaPlaces as Set<any>).map(EntityServiceAreaPlacesToJSON)),
        'services': value.services,
        'smokeFreeProperty': value.smokeFreeProperty,
        'snorkeling': value.snorkeling,
        'socialHour': value.socialHour,
        'spa': value.spa,
        'specialities': value.specialities,
        'tableService': value.tableService,
        'takeoutHours': EntityTakeoutHoursToJSON(value.takeoutHours),
        'tennis': value.tennis,
        'thermalPool': value.thermalPool,
        'ticketAvailability': value.ticketAvailability,
        'ticketPriceRange': EntityTicketPriceRangeToJSON(value.ticketPriceRange),
        'ticketSaleDateTime': value.ticketSaleDateTime === undefined ? undefined : (value.ticketSaleDateTime.toISOString()),
        'ticketUrl': value.ticketUrl,
        'time': EntityTimeToJSON(value.time),
        'timeZoneUtcOffset': value.timeZoneUtcOffset,
        'timezone': value.timezone,
        'tollFreePhone': value.tollFreePhone,
        'treadmill': value.treadmill,
        'ttyPhone': value.ttyPhone,
        'turndownService': value.turndownService,
        'twitterHandle': value.twitterHandle,
        'uberLink': EntityUberLinkToJSON(value.uberLink),
        'uberTripBranding': EntityUberTripBrandingToJSON(value.uberTripBranding),
        'valetParking': value.valetParking,
        'validThrough': value.validThrough === undefined ? undefined : (value.validThrough.toISOString()),
        'vendingMachine': value.vendingMachine,
        'venueName': value.venueName,
        'videos': value.videos === undefined ? undefined : (Array.from(value.videos as Set<any>).map(EntityVideosToJSON)),
        'wadingPool': value.wadingPool,
        'wakeUpCalls': value.wakeUpCalls,
        'walkableCoordinate': EntityWalkableCoordinateToJSON(value.walkableCoordinate),
        'waterPark': value.waterPark,
        'waterSkiing': value.waterSkiing,
        'watercraft': value.watercraft,
        'waterslide': value.waterslide,
        'wavePool': value.wavePool,
        'websiteUrl': EntityWebsiteUrlToJSON(value.websiteUrl),
        'weightMachine': value.weightMachine,
        'wheelchairAccessible': value.wheelchairAccessible,
        'wifiAvailable': value.wifiAvailable,
        'workRemote': value.workRemote,
        'yearEstablished': value.yearEstablished,
        'yearLastRenovated': value.yearLastRenovated,
        'yextDisplayCoordinate': EntityYextDisplayCoordinateToJSON(value.yextDisplayCoordinate),
        'yextDropoffCoordinate': EntityYextDropoffCoordinateToJSON(value.yextDropoffCoordinate),
        'yextPickupCoordinate': EntityYextPickupCoordinateToJSON(value.yextPickupCoordinate),
        'yextRoutableCoordinate': EntityYextRoutableCoordinateToJSON(value.yextRoutableCoordinate),
        'yextWalkableCoordinate': EntityYextWalkableCoordinateToJSON(value.yextWalkableCoordinate),
    };
}


