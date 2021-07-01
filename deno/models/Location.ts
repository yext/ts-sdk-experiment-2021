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
    AtmAllOfAccessHours,
    AtmAllOfAccessHoursFromJSON,
    AtmAllOfAccessHoursFromJSONTyped,
    AtmAllOfAccessHoursToJSON,
    AtmAllOfAddress,
    AtmAllOfAddressFromJSON,
    AtmAllOfAddressFromJSONTyped,
    AtmAllOfAddressToJSON,
    AtmAllOfDisplayCoordinate,
    AtmAllOfDisplayCoordinateFromJSON,
    AtmAllOfDisplayCoordinateFromJSONTyped,
    AtmAllOfDisplayCoordinateToJSON,
    AtmAllOfDriveThroughHours,
    AtmAllOfDriveThroughHoursFromJSON,
    AtmAllOfDriveThroughHoursFromJSONTyped,
    AtmAllOfDriveThroughHoursToJSON,
    AtmAllOfDropoffCoordinate,
    AtmAllOfDropoffCoordinateFromJSON,
    AtmAllOfDropoffCoordinateFromJSONTyped,
    AtmAllOfDropoffCoordinateToJSON,
    AtmAllOfFacebookCallToAction,
    AtmAllOfFacebookCallToActionFromJSON,
    AtmAllOfFacebookCallToActionFromJSONTyped,
    AtmAllOfFacebookCallToActionToJSON,
    AtmAllOfFacebookCoverPhoto,
    AtmAllOfFacebookCoverPhotoFromJSON,
    AtmAllOfFacebookCoverPhotoFromJSONTyped,
    AtmAllOfFacebookCoverPhotoToJSON,
    AtmAllOfFacebookProfilePhoto,
    AtmAllOfFacebookProfilePhotoFromJSON,
    AtmAllOfFacebookProfilePhotoFromJSONTyped,
    AtmAllOfFacebookProfilePhotoToJSON,
    AtmAllOfFeaturedMessage,
    AtmAllOfFeaturedMessageFromJSON,
    AtmAllOfFeaturedMessageFromJSONTyped,
    AtmAllOfFeaturedMessageToJSON,
    AtmAllOfFrequentlyAskedQuestions,
    AtmAllOfFrequentlyAskedQuestionsFromJSON,
    AtmAllOfFrequentlyAskedQuestionsFromJSONTyped,
    AtmAllOfFrequentlyAskedQuestionsToJSON,
    AtmAllOfGoogleCoverPhoto,
    AtmAllOfGoogleCoverPhotoFromJSON,
    AtmAllOfGoogleCoverPhotoFromJSONTyped,
    AtmAllOfGoogleCoverPhotoToJSON,
    AtmAllOfGoogleProfilePhoto,
    AtmAllOfGoogleProfilePhotoFromJSON,
    AtmAllOfGoogleProfilePhotoFromJSONTyped,
    AtmAllOfGoogleProfilePhotoToJSON,
    AtmAllOfHours,
    AtmAllOfHoursFromJSON,
    AtmAllOfHoursFromJSONTyped,
    AtmAllOfHoursToJSON,
    AtmAllOfLogo,
    AtmAllOfLogoFromJSON,
    AtmAllOfLogoFromJSONTyped,
    AtmAllOfLogoToJSON,
    AtmAllOfMeta,
    AtmAllOfMetaFromJSON,
    AtmAllOfMetaFromJSONTyped,
    AtmAllOfMetaToJSON,
    AtmAllOfPickupCoordinate,
    AtmAllOfPickupCoordinateFromJSON,
    AtmAllOfPickupCoordinateFromJSONTyped,
    AtmAllOfPickupCoordinateToJSON,
    AtmAllOfRankTrackingCompetitors,
    AtmAllOfRankTrackingCompetitorsFromJSON,
    AtmAllOfRankTrackingCompetitorsFromJSONTyped,
    AtmAllOfRankTrackingCompetitorsToJSON,
    AtmAllOfRoutableCoordinate,
    AtmAllOfRoutableCoordinateFromJSON,
    AtmAllOfRoutableCoordinateFromJSONTyped,
    AtmAllOfRoutableCoordinateToJSON,
    AtmAllOfWalkableCoordinate,
    AtmAllOfWalkableCoordinateFromJSON,
    AtmAllOfWalkableCoordinateFromJSONTyped,
    AtmAllOfWalkableCoordinateToJSON,
    AtmAllOfWebsiteUrl,
    AtmAllOfWebsiteUrlFromJSON,
    AtmAllOfWebsiteUrlFromJSONTyped,
    AtmAllOfWebsiteUrlToJSON,
    EntityWrite,
    EntityWriteFromJSON,
    EntityWriteFromJSONTyped,
    EntityWriteToJSON,
    EventAllOfPhotoGallery,
    EventAllOfPhotoGalleryFromJSON,
    EventAllOfPhotoGalleryFromJSONTyped,
    EventAllOfPhotoGalleryToJSON,
    HealthcareFacilityAllOfBios,
    HealthcareFacilityAllOfBiosFromJSON,
    HealthcareFacilityAllOfBiosFromJSONTyped,
    HealthcareFacilityAllOfBiosToJSON,
    HealthcareFacilityAllOfCalendars,
    HealthcareFacilityAllOfCalendarsFromJSON,
    HealthcareFacilityAllOfCalendarsFromJSONTyped,
    HealthcareFacilityAllOfCalendarsToJSON,
    HealthcareFacilityAllOfMenuUrl,
    HealthcareFacilityAllOfMenuUrlFromJSON,
    HealthcareFacilityAllOfMenuUrlFromJSONTyped,
    HealthcareFacilityAllOfMenuUrlToJSON,
    HealthcareFacilityAllOfOnlineServiceHours,
    HealthcareFacilityAllOfOnlineServiceHoursFromJSON,
    HealthcareFacilityAllOfOnlineServiceHoursFromJSONTyped,
    HealthcareFacilityAllOfOnlineServiceHoursToJSON,
    HealthcareFacilityAllOfOrderUrl,
    HealthcareFacilityAllOfOrderUrlFromJSON,
    HealthcareFacilityAllOfOrderUrlFromJSONTyped,
    HealthcareFacilityAllOfOrderUrlToJSON,
    HealthcareFacilityAllOfPickupHours,
    HealthcareFacilityAllOfPickupHoursFromJSON,
    HealthcareFacilityAllOfPickupHoursFromJSONTyped,
    HealthcareFacilityAllOfPickupHoursToJSON,
    HealthcareFacilityAllOfProductLists,
    HealthcareFacilityAllOfProductListsFromJSON,
    HealthcareFacilityAllOfProductListsFromJSONTyped,
    HealthcareFacilityAllOfProductListsToJSON,
    HealthcareFacilityAllOfReservationUrl,
    HealthcareFacilityAllOfReservationUrlFromJSON,
    HealthcareFacilityAllOfReservationUrlFromJSONTyped,
    HealthcareFacilityAllOfReservationUrlToJSON,
    HealthcareFacilityAllOfServiceArea,
    HealthcareFacilityAllOfServiceAreaFromJSON,
    HealthcareFacilityAllOfServiceAreaFromJSONTyped,
    HealthcareFacilityAllOfServiceAreaToJSON,
    HealthcareFacilityAllOfServiceAreaPlaces,
    HealthcareFacilityAllOfServiceAreaPlacesFromJSON,
    HealthcareFacilityAllOfServiceAreaPlacesFromJSONTyped,
    HealthcareFacilityAllOfServiceAreaPlacesToJSON,
    HealthcareFacilityAllOfUberLink,
    HealthcareFacilityAllOfUberLinkFromJSON,
    HealthcareFacilityAllOfUberLinkFromJSONTyped,
    HealthcareFacilityAllOfUberLinkToJSON,
    HealthcareFacilityAllOfUberTripBranding,
    HealthcareFacilityAllOfUberTripBrandingFromJSON,
    HealthcareFacilityAllOfUberTripBrandingFromJSONTyped,
    HealthcareFacilityAllOfUberTripBrandingToJSON,
    HealthcareFacilityAllOfVideos,
    HealthcareFacilityAllOfVideosFromJSON,
    HealthcareFacilityAllOfVideosFromJSONTyped,
    HealthcareFacilityAllOfVideosToJSON,
    HotelAllOfBrunchHours,
    HotelAllOfBrunchHoursFromJSON,
    HotelAllOfBrunchHoursFromJSONTyped,
    HotelAllOfBrunchHoursToJSON,
    HotelAllOfHappyHours,
    HotelAllOfHappyHoursFromJSON,
    HotelAllOfHappyHoursFromJSONTyped,
    HotelAllOfHappyHoursToJSON,
    HotelAllOfKitchenHours,
    HotelAllOfKitchenHoursFromJSON,
    HotelAllOfKitchenHoursFromJSONTyped,
    HotelAllOfKitchenHoursToJSON,
    HotelAllOfMenus,
    HotelAllOfMenusFromJSON,
    HotelAllOfMenusFromJSONTyped,
    HotelAllOfMenusToJSON,
    LocationAllOf,
    LocationAllOfFromJSON,
    LocationAllOfFromJSONTyped,
    LocationAllOfToJSON,
    LocationAllOfDeliveryHours,
    LocationAllOfDeliveryHoursFromJSON,
    LocationAllOfDeliveryHoursFromJSONTyped,
    LocationAllOfDeliveryHoursToJSON,
    LocationAllOfSeniorHours,
    LocationAllOfSeniorHoursFromJSON,
    LocationAllOfSeniorHoursFromJSONTyped,
    LocationAllOfSeniorHoursToJSON,
    LocationAllOfTakeoutHours,
    LocationAllOfTakeoutHoursFromJSON,
    LocationAllOfTakeoutHoursFromJSONTyped,
    LocationAllOfTakeoutHoursToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface Location
 */
export interface Location extends EntityWrite {
    /**
     * 
     * @type {AtmAllOfMeta}
     * @memberof Location
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
     * @memberof Location
     */
    name?: string;
    /**
     * 
     * @type {AtmAllOfAddress}
     * @memberof Location
     */
    address?: AtmAllOfAddress;
    /**
     * 
     * @type {AtmAllOfAccessHours}
     * @memberof Location
     */
    accessHours?: AtmAllOfAccessHours;
    /**
     * Additional information about hours that does not fit in **`hours`** (e.g., `"Closed during the winter"`)
     * @type {string}
     * @memberof Location
     */
    additionalHoursText?: string;
    /**
     * If `true`, the entity's street address will not be shown on listings. Defaults to `false`.
     * @type {boolean}
     * @memberof Location
     */
    addressHidden?: boolean;
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
     * @type {Set<string>}
     * @memberof Location
     */
    alternateNames?: Set<string>;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
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
     * @type {Set<string>}
     * @memberof Location
     */
    alternateWebsites?: Set<string>;
    /**
     * The URL where consumers can download the entity's Android app
     * @type {string}
     * @memberof Location
     */
    androidAppUrl?: string;
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
     * @type {Set<string>}
     * @memberof Location
     */
    associations?: Set<string>;
    /**
     * 
     * @type {HealthcareFacilityAllOfBios}
     * @memberof Location
     */
    bios?: HealthcareFacilityAllOfBios;
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
     * @type {Set<string>}
     * @memberof Location
     */
    brands?: Set<string>;
    /**
     * 
     * @type {HotelAllOfBrunchHours}
     * @memberof Location
     */
    brunchHours?: HotelAllOfBrunchHours;
    /**
     * 
     * @type {HealthcareFacilityAllOfCalendars}
     * @memberof Location
     */
    calendars?: HealthcareFacilityAllOfCalendars;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof Location
     */
    categoryIds?: Array<string>;
    /**
     * Indicates whether the entity is closed
     * @type {boolean}
     * @memberof Location
     */
    closed?: boolean;
    /**
     * Additional keywords you would like us to use when tracking your search performance
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * @type {Set<string>}
     * @memberof Location
     */
    customKeywords?: Set<string>;
    /**
     * 
     * @type {LocationAllOfDeliveryHours}
     * @memberof Location
     */
    deliveryHours?: LocationAllOfDeliveryHours;
    /**
     * A description of the entity
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof Location
     */
    description?: string;
    /**
     * 
     * @type {AtmAllOfDisplayCoordinate}
     * @memberof Location
     */
    displayCoordinate?: AtmAllOfDisplayCoordinate;
    /**
     * 
     * @type {AtmAllOfDriveThroughHours}
     * @memberof Location
     */
    driveThroughHours?: AtmAllOfDriveThroughHours;
    /**
     * 
     * @type {AtmAllOfDropoffCoordinate}
     * @memberof Location
     */
    dropoffCoordinate?: AtmAllOfDropoffCoordinate;
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
     * @type {Set<string>}
     * @memberof Location
     */
    emails?: Set<string>;
    /**
     * 
     * @type {AtmAllOfFacebookCallToAction}
     * @memberof Location
     */
    facebookCallToAction?: AtmAllOfFacebookCallToAction;
    /**
     * 
     * @type {AtmAllOfFacebookCoverPhoto}
     * @memberof Location
     */
    facebookCoverPhoto?: AtmAllOfFacebookCoverPhoto;
    /**
     * Location Descriptors are used for Enterprise businesses that sync Facebook listings using brand page location structure. The Location Descriptor is typically an additional geographic description (e.g. geomodifier) that will appear in parentheses after the name on the Facebook listing.
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof Location
     */
    facebookDescriptor?: string;
    /**
     * The name for this entity's Facebook profile.  A separate name may be specified to send only to Facebook in order to comply with any specific Facebook rules or naming conventions.
     * @type {string}
     * @memberof Location
     */
    facebookName?: string;
    /**
     * The city to be displayed on this entity's Facebook profile
     * @type {string}
     * @memberof Location
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
     * @type {string}
     * @memberof Location
     */
    facebookPageUrl?: string;
    /**
     * 
     * @type {AtmAllOfFacebookProfilePhoto}
     * @memberof Location
     */
    facebookProfilePhoto?: AtmAllOfFacebookProfilePhoto;
    /**
     * The username that appear's in the Facebook listing URL to help customers find and remember a brand’s Facebook page.  The username is also be used for tagging the Facebook page in other users’ posts, and searching for the Facebook page.
     * @type {string}
     * @memberof Location
     */
    facebookVanityUrl?: string;
    /**
     * Must be a valid fax number.
     * 
     * If the fax number's calling code is for a country other than the one given in the entity's **`countryCode`**, the fax number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
     */
    fax?: string;
    /**
     * 
     * @type {AtmAllOfFeaturedMessage}
     * @memberof Location
     */
    featuredMessage?: AtmAllOfFeaturedMessage;
    /**
     * Link to the review-collection page, where consumers can leave first-party reviews
     * @type {string}
     * @memberof Location
     */
    firstPartyReviewPage?: string;
    /**
     * A list of questions that are frequently asked about this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * @type {Set<AtmAllOfFrequentlyAskedQuestions>}
     * @memberof Location
     */
    frequentlyAskedQuestions?: Set<AtmAllOfFrequentlyAskedQuestions>;
    /**
     * Provides additional information on where the entity can be found (e.g., `Times Square`, `Global Center Mall`)
     * @type {string}
     * @memberof Location
     */
    geomodifier?: string;
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
     * @memberof Location
     */
    googleAttributes?: object;
    /**
     * 
     * @type {AtmAllOfGoogleCoverPhoto}
     * @memberof Location
     */
    googleCoverPhoto?: AtmAllOfGoogleCoverPhoto;
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
     * @type {Set<string>}
     * @memberof Location
     */
    googleMyBusinessLabels?: Set<string>;
    /**
     * The unique identifier of this entity on Google Maps.
     * @type {string}
     * @memberof Location
     */
    googlePlaceId?: string;
    /**
     * 
     * @type {AtmAllOfGoogleProfilePhoto}
     * @memberof Location
     */
    googleProfilePhoto?: AtmAllOfGoogleProfilePhoto;
    /**
     * The URL you would like to submit to Google My Business in place of the one given in **`websiteUrl`** (if applicable).
     * 
     * For example, if you want to analyze the traffic driven by your Google listings separately from other traffic, enter the alternate URL that you will use for tracking in this field.
     * @type {string}
     * @memberof Location
     */
    googleWebsiteOverride?: string;
    /**
     * 
     * @type {HotelAllOfHappyHours}
     * @memberof Location
     */
    happyHours?: HotelAllOfHappyHours;
    /**
     * Indicates whether holiday-hour confirmation alerts are enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof Location
     */
    holidayHoursConversationEnabled?: boolean;
    /**
     * 
     * @type {AtmAllOfHours}
     * @memberof Location
     */
    hours?: AtmAllOfHours;
    /**
     * A statement of the ownership and authorship of a document. Individuals or organizations based in many German-speaking countries are required by law to include an Impressum in published media.
     * @type {string}
     * @memberof Location
     */
    impressum?: string;
    /**
     * Valid Instagram username for the entity without the leading "@" (e.g., `NewCityAuto`)
     * @type {string}
     * @memberof Location
     */
    instagramHandle?: string;
    /**
     * The URL where consumers can download the entity's app to their iPhone or iPad
     * @type {string}
     * @memberof Location
     */
    iosAppUrl?: string;
    /**
     * The ISO 3166-2 region code for the entity
     * 
     * Yext will determine the entity's code and update **`isoRegionCode`** with that value. If Yext is unable to determine the code for the entity, the entity'ss ISO 3166-1 alpha-2 country code will be used.
     * @type {string}
     * @memberof Location
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
     * @type {Set<string>}
     * @memberof Location
     */
    keywords?: Set<string>;
    /**
     * 
     * @type {HotelAllOfKitchenHours}
     * @memberof Location
     */
    kitchenHours?: HotelAllOfKitchenHours;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<string>}
     * @memberof Location
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * @type {string}
     * @memberof Location
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
     * @type {Set<string>}
     * @memberof Location
     */
    languages?: Set<string>;
    /**
     * Must be a valid, non-toll-free phone number, based on the country specified in **`address.region`**. Phone numbers for US entities must contain 10 digits.
     * @type {string}
     * @memberof Location
     */
    localPhone?: string;
    /**
     * Indicates the entity's type, if it is not an event
     * @type {string}
     * @memberof Location
     */
    locationType?: LocationLocationTypeEnum;
    /**
     * 
     * @type {AtmAllOfLogo}
     * @memberof Location
     */
    logo?: AtmAllOfLogo;
    /**
     * The main phone number of the entity's point of contact
     * 
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
     */
    mainPhone?: string;
    /**
     * 
     * @type {HealthcareFacilityAllOfMenuUrl}
     * @memberof Location
     */
    menuUrl?: HealthcareFacilityAllOfMenuUrl;
    /**
     * 
     * @type {HotelAllOfMenus}
     * @memberof Location
     */
    menus?: HotelAllOfMenus;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
     */
    mobilePhone?: string;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof Location
     */
    nudgeEnabled?: boolean;
    /**
     * 
     * @type {HealthcareFacilityAllOfOnlineServiceHours}
     * @memberof Location
     */
    onlineServiceHours?: HealthcareFacilityAllOfOnlineServiceHours;
    /**
     * 
     * @type {HealthcareFacilityAllOfOrderUrl}
     * @memberof Location
     */
    orderUrl?: HealthcareFacilityAllOfOrderUrl;
    /**
     * The payment methods accepted by this entity
     * 
     * Valid elements depend on the entity's country.
     * @type {Set<string>}
     * @memberof Location
     */
    paymentOptions?: Set<LocationPaymentOptionsEnum>;
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
     * @type {Array<EventAllOfPhotoGallery>}
     * @memberof Location
     */
    photoGallery?: Array<EventAllOfPhotoGallery>;
    /**
     * 
     * @type {AtmAllOfPickupCoordinate}
     * @memberof Location
     */
    pickupCoordinate?: AtmAllOfPickupCoordinate;
    /**
     * 
     * @type {HealthcareFacilityAllOfPickupHours}
     * @memberof Location
     */
    pickupHours?: HealthcareFacilityAllOfPickupHours;
    /**
     * he typical price of products sold by this location, on a scale of 1 (low) to 4 (high)
     * @type {string}
     * @memberof Location
     */
    priceRange?: LocationPriceRangeEnum;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof Location
     */
    primaryConversationContact?: string;
    /**
     * 
     * @type {HealthcareFacilityAllOfProductLists}
     * @memberof Location
     */
    productLists?: HealthcareFacilityAllOfProductLists;
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
     * @type {Set<string>}
     * @memberof Location
     */
    products?: Set<string>;
    /**
     * Indicates whether Yext Knowledge Assistant question-and-answer conversations are enabled for this entity
     * @type {boolean}
     * @memberof Location
     */
    questionsAndAnswers?: boolean;
    /**
     * Information about the competitors whose search performance you would like to compare to your own
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * @type {Set<AtmAllOfRankTrackingCompetitors>}
     * @memberof Location
     */
    rankTrackingCompetitors?: Set<AtmAllOfRankTrackingCompetitors>;
    /**
     * Indicates whether Rank Tracking is enabled
     * @type {boolean}
     * @memberof Location
     */
    rankTrackingEnabled?: boolean;
    /**
     * How often we send search queries to track your search performance
     * @type {string}
     * @memberof Location
     */
    rankTrackingFrequency?: LocationRankTrackingFrequencyEnum;
    /**
     * The ways in which your keywords will be arranged in the search queries we use to track your performance
     * 
     * 
     * Array must have a minimum of 2 elements.
     * 
     * Array may have a maximum of 4 elements.
     * @type {Set<string>}
     * @memberof Location
     */
    rankTrackingQueryTemplates?: Set<LocationRankTrackingQueryTemplatesEnum>;
    /**
     * The search engines that we will use to track your performance
     * @type {Set<string>}
     * @memberof Location
     */
    rankTrackingSites?: Set<LocationRankTrackingSitesEnum>;
    /**
     * 
     * @type {HealthcareFacilityAllOfReservationUrl}
     * @memberof Location
     */
    reservationUrl?: HealthcareFacilityAllOfReservationUrl;
    /**
     * The URL given Review Invitation emails where consumers can leave a review about the entity
     * @type {string}
     * @memberof Location
     */
    reviewGenerationUrl?: string;
    /**
     * Indicates whether Yext Knowledge Assistant review-response conversations are enabled for this entity
     * @type {boolean}
     * @memberof Location
     */
    reviewResponseConversationEnabled?: boolean;
    /**
     * 
     * @type {AtmAllOfRoutableCoordinate}
     * @memberof Location
     */
    routableCoordinate?: AtmAllOfRoutableCoordinate;
    /**
     * 
     * @type {LocationAllOfSeniorHours}
     * @memberof Location
     */
    seniorHours?: LocationAllOfSeniorHours;
    /**
     * 
     * @type {HealthcareFacilityAllOfServiceArea}
     * @memberof Location
     */
    serviceArea?: HealthcareFacilityAllOfServiceArea;
    /**
     * Information about the area that is served by this entity. It is specified as a list of service area names and their associated types.
     * **Only for Google My Business and Bing:** Currently, **serviceArea** is only supported by Google My Business and Bing and will not affect your listings on other sites.
     * 
     * 
     * Array may have a maximum of 200 elements.
     * @type {Set<HealthcareFacilityAllOfServiceAreaPlaces>}
     * @memberof Location
     */
    serviceAreaPlaces?: Set<HealthcareFacilityAllOfServiceAreaPlaces>;
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
     * @type {Set<string>}
     * @memberof Location
     */
    services?: Set<string>;
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
     * @type {Set<string>}
     * @memberof Location
     */
    specialities?: Set<string>;
    /**
     * 
     * @type {LocationAllOfTakeoutHours}
     * @memberof Location
     */
    takeoutHours?: LocationAllOfTakeoutHours;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * @type {string}
     * @memberof Location
     */
    timezone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
     */
    tollFreePhone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Location
     */
    ttyPhone?: string;
    /**
     * Valid Twitter handle for the entity without the leading "@" (e.g., `JohnSmith`)
     * 
     * If you submit an invalid Twitter handle, it will be ignored. The success response will contain a warning message explaining why your Twitter handle wasn't stored in the system.
     * @type {string}
     * @memberof Location
     */
    twitterHandle?: string;
    /**
     * 
     * @type {HealthcareFacilityAllOfUberLink}
     * @memberof Location
     */
    uberLink?: HealthcareFacilityAllOfUberLink;
    /**
     * 
     * @type {HealthcareFacilityAllOfUberTripBranding}
     * @memberof Location
     */
    uberTripBranding?: HealthcareFacilityAllOfUberTripBranding;
    /**
     * Valid YouTube URLs for embedding a video on some publisher sites
     * 
     * **NOTE:** Currently, only the first URL in the Array appears in your listings.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<HealthcareFacilityAllOfVideos>}
     * @memberof Location
     */
    videos?: Set<HealthcareFacilityAllOfVideos>;
    /**
     * 
     * @type {AtmAllOfWalkableCoordinate}
     * @memberof Location
     */
    walkableCoordinate?: AtmAllOfWalkableCoordinate;
    /**
     * 
     * @type {AtmAllOfWebsiteUrl}
     * @memberof Location
     */
    websiteUrl?: AtmAllOfWebsiteUrl;
    /**
     * The year the entity was established.
     * @type {number}
     * @memberof Location
     */
    yearEstablished?: number;
}

/**
* @export
* @enum {string}
*/
export enum LocationLocationTypeEnum {
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
export enum LocationPaymentOptionsEnum {
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
export enum LocationPriceRangeEnum {
    Unspecified = 'UNSPECIFIED',
    One = 'ONE',
    Two = 'TWO',
    Three = 'THREE',
    Four = 'FOUR'
}/**
* @export
* @enum {string}
*/
export enum LocationRankTrackingFrequencyEnum {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Quarterly = 'QUARTERLY'
}/**
* @export
* @enum {string}
*/
export enum LocationRankTrackingQueryTemplatesEnum {
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
export enum LocationRankTrackingSitesEnum {
    GoogleDesktop = 'GOOGLE_DESKTOP',
    GoogleMobile = 'GOOGLE_MOBILE',
    BingDesktop = 'BING_DESKTOP',
    BingMobile = 'BING_MOBILE',
    YahooDesktop = 'YAHOO_DESKTOP',
    YahooMobile = 'YAHOO_MOBILE'
}

export function LocationFromJSON(json: any): Location {
    return LocationFromJSONTyped(json, false);
}

export function LocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Location {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...EntityWriteFromJSONTyped(json, ignoreDiscriminator),
        'meta': !exists(json, 'meta') ? undefined : AtmAllOfMetaFromJSON(json['meta']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'address': !exists(json, 'address') ? undefined : AtmAllOfAddressFromJSON(json['address']),
        'accessHours': !exists(json, 'accessHours') ? undefined : AtmAllOfAccessHoursFromJSON(json['accessHours']),
        'additionalHoursText': !exists(json, 'additionalHoursText') ? undefined : json['additionalHoursText'],
        'addressHidden': !exists(json, 'addressHidden') ? undefined : json['addressHidden'],
        'alternateNames': !exists(json, 'alternateNames') ? undefined : json['alternateNames'],
        'alternatePhone': !exists(json, 'alternatePhone') ? undefined : json['alternatePhone'],
        'alternateWebsites': !exists(json, 'alternateWebsites') ? undefined : json['alternateWebsites'],
        'androidAppUrl': !exists(json, 'androidAppUrl') ? undefined : json['androidAppUrl'],
        'associations': !exists(json, 'associations') ? undefined : json['associations'],
        'bios': !exists(json, 'bios') ? undefined : HealthcareFacilityAllOfBiosFromJSON(json['bios']),
        'brands': !exists(json, 'brands') ? undefined : json['brands'],
        'brunchHours': !exists(json, 'brunchHours') ? undefined : HotelAllOfBrunchHoursFromJSON(json['brunchHours']),
        'calendars': !exists(json, 'calendars') ? undefined : HealthcareFacilityAllOfCalendarsFromJSON(json['calendars']),
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'closed': !exists(json, 'closed') ? undefined : json['closed'],
        'customKeywords': !exists(json, 'customKeywords') ? undefined : json['customKeywords'],
        'deliveryHours': !exists(json, 'deliveryHours') ? undefined : LocationAllOfDeliveryHoursFromJSON(json['deliveryHours']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'displayCoordinate': !exists(json, 'displayCoordinate') ? undefined : AtmAllOfDisplayCoordinateFromJSON(json['displayCoordinate']),
        'driveThroughHours': !exists(json, 'driveThroughHours') ? undefined : AtmAllOfDriveThroughHoursFromJSON(json['driveThroughHours']),
        'dropoffCoordinate': !exists(json, 'dropoffCoordinate') ? undefined : AtmAllOfDropoffCoordinateFromJSON(json['dropoffCoordinate']),
        'emails': !exists(json, 'emails') ? undefined : json['emails'],
        'facebookCallToAction': !exists(json, 'facebookCallToAction') ? undefined : AtmAllOfFacebookCallToActionFromJSON(json['facebookCallToAction']),
        'facebookCoverPhoto': !exists(json, 'facebookCoverPhoto') ? undefined : AtmAllOfFacebookCoverPhotoFromJSON(json['facebookCoverPhoto']),
        'facebookDescriptor': !exists(json, 'facebookDescriptor') ? undefined : json['facebookDescriptor'],
        'facebookName': !exists(json, 'facebookName') ? undefined : json['facebookName'],
        'facebookOverrideCity': !exists(json, 'facebookOverrideCity') ? undefined : json['facebookOverrideCity'],
        'facebookPageUrl': !exists(json, 'facebookPageUrl') ? undefined : json['facebookPageUrl'],
        'facebookProfilePhoto': !exists(json, 'facebookProfilePhoto') ? undefined : AtmAllOfFacebookProfilePhotoFromJSON(json['facebookProfilePhoto']),
        'facebookVanityUrl': !exists(json, 'facebookVanityUrl') ? undefined : json['facebookVanityUrl'],
        'fax': !exists(json, 'fax') ? undefined : json['fax'],
        'featuredMessage': !exists(json, 'featuredMessage') ? undefined : AtmAllOfFeaturedMessageFromJSON(json['featuredMessage']),
        'firstPartyReviewPage': !exists(json, 'firstPartyReviewPage') ? undefined : json['firstPartyReviewPage'],
        'frequentlyAskedQuestions': !exists(json, 'frequentlyAskedQuestions') ? undefined : (new Set((json['frequentlyAskedQuestions'] as Array<any>).map(AtmAllOfFrequentlyAskedQuestionsFromJSON))),
        'geomodifier': !exists(json, 'geomodifier') ? undefined : json['geomodifier'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'googleCoverPhoto': !exists(json, 'googleCoverPhoto') ? undefined : AtmAllOfGoogleCoverPhotoFromJSON(json['googleCoverPhoto']),
        'googleMyBusinessLabels': !exists(json, 'googleMyBusinessLabels') ? undefined : json['googleMyBusinessLabels'],
        'googlePlaceId': !exists(json, 'googlePlaceId') ? undefined : json['googlePlaceId'],
        'googleProfilePhoto': !exists(json, 'googleProfilePhoto') ? undefined : AtmAllOfGoogleProfilePhotoFromJSON(json['googleProfilePhoto']),
        'googleWebsiteOverride': !exists(json, 'googleWebsiteOverride') ? undefined : json['googleWebsiteOverride'],
        'happyHours': !exists(json, 'happyHours') ? undefined : HotelAllOfHappyHoursFromJSON(json['happyHours']),
        'holidayHoursConversationEnabled': !exists(json, 'holidayHoursConversationEnabled') ? undefined : json['holidayHoursConversationEnabled'],
        'hours': !exists(json, 'hours') ? undefined : AtmAllOfHoursFromJSON(json['hours']),
        'impressum': !exists(json, 'impressum') ? undefined : json['impressum'],
        'instagramHandle': !exists(json, 'instagramHandle') ? undefined : json['instagramHandle'],
        'iosAppUrl': !exists(json, 'iosAppUrl') ? undefined : json['iosAppUrl'],
        'isoRegionCode': !exists(json, 'isoRegionCode') ? undefined : json['isoRegionCode'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'kitchenHours': !exists(json, 'kitchenHours') ? undefined : HotelAllOfKitchenHoursFromJSON(json['kitchenHours']),
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'languages': !exists(json, 'languages') ? undefined : json['languages'],
        'localPhone': !exists(json, 'localPhone') ? undefined : json['localPhone'],
        'locationType': !exists(json, 'locationType') ? undefined : json['locationType'],
        'logo': !exists(json, 'logo') ? undefined : AtmAllOfLogoFromJSON(json['logo']),
        'mainPhone': !exists(json, 'mainPhone') ? undefined : json['mainPhone'],
        'menuUrl': !exists(json, 'menuUrl') ? undefined : HealthcareFacilityAllOfMenuUrlFromJSON(json['menuUrl']),
        'menus': !exists(json, 'menus') ? undefined : HotelAllOfMenusFromJSON(json['menus']),
        'mobilePhone': !exists(json, 'mobilePhone') ? undefined : json['mobilePhone'],
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'onlineServiceHours': !exists(json, 'onlineServiceHours') ? undefined : HealthcareFacilityAllOfOnlineServiceHoursFromJSON(json['onlineServiceHours']),
        'orderUrl': !exists(json, 'orderUrl') ? undefined : HealthcareFacilityAllOfOrderUrlFromJSON(json['orderUrl']),
        'paymentOptions': !exists(json, 'paymentOptions') ? undefined : json['paymentOptions'],
        'photoGallery': !exists(json, 'photoGallery') ? undefined : ((json['photoGallery'] as Array<any>).map(EventAllOfPhotoGalleryFromJSON)),
        'pickupCoordinate': !exists(json, 'pickupCoordinate') ? undefined : AtmAllOfPickupCoordinateFromJSON(json['pickupCoordinate']),
        'pickupHours': !exists(json, 'pickupHours') ? undefined : HealthcareFacilityAllOfPickupHoursFromJSON(json['pickupHours']),
        'priceRange': !exists(json, 'priceRange') ? undefined : json['priceRange'],
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'productLists': !exists(json, 'productLists') ? undefined : HealthcareFacilityAllOfProductListsFromJSON(json['productLists']),
        'products': !exists(json, 'products') ? undefined : json['products'],
        'questionsAndAnswers': !exists(json, 'questionsAndAnswers') ? undefined : json['questionsAndAnswers'],
        'rankTrackingCompetitors': !exists(json, 'rankTrackingCompetitors') ? undefined : (new Set((json['rankTrackingCompetitors'] as Array<any>).map(AtmAllOfRankTrackingCompetitorsFromJSON))),
        'rankTrackingEnabled': !exists(json, 'rankTrackingEnabled') ? undefined : json['rankTrackingEnabled'],
        'rankTrackingFrequency': !exists(json, 'rankTrackingFrequency') ? undefined : json['rankTrackingFrequency'],
        'rankTrackingQueryTemplates': !exists(json, 'rankTrackingQueryTemplates') ? undefined : json['rankTrackingQueryTemplates'],
        'rankTrackingSites': !exists(json, 'rankTrackingSites') ? undefined : json['rankTrackingSites'],
        'reservationUrl': !exists(json, 'reservationUrl') ? undefined : HealthcareFacilityAllOfReservationUrlFromJSON(json['reservationUrl']),
        'reviewGenerationUrl': !exists(json, 'reviewGenerationUrl') ? undefined : json['reviewGenerationUrl'],
        'reviewResponseConversationEnabled': !exists(json, 'reviewResponseConversationEnabled') ? undefined : json['reviewResponseConversationEnabled'],
        'routableCoordinate': !exists(json, 'routableCoordinate') ? undefined : AtmAllOfRoutableCoordinateFromJSON(json['routableCoordinate']),
        'seniorHours': !exists(json, 'seniorHours') ? undefined : LocationAllOfSeniorHoursFromJSON(json['seniorHours']),
        'serviceArea': !exists(json, 'serviceArea') ? undefined : HealthcareFacilityAllOfServiceAreaFromJSON(json['serviceArea']),
        'serviceAreaPlaces': !exists(json, 'serviceAreaPlaces') ? undefined : (new Set((json['serviceAreaPlaces'] as Array<any>).map(HealthcareFacilityAllOfServiceAreaPlacesFromJSON))),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'specialities': !exists(json, 'specialities') ? undefined : json['specialities'],
        'takeoutHours': !exists(json, 'takeoutHours') ? undefined : LocationAllOfTakeoutHoursFromJSON(json['takeoutHours']),
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'tollFreePhone': !exists(json, 'tollFreePhone') ? undefined : json['tollFreePhone'],
        'ttyPhone': !exists(json, 'ttyPhone') ? undefined : json['ttyPhone'],
        'twitterHandle': !exists(json, 'twitterHandle') ? undefined : json['twitterHandle'],
        'uberLink': !exists(json, 'uberLink') ? undefined : HealthcareFacilityAllOfUberLinkFromJSON(json['uberLink']),
        'uberTripBranding': !exists(json, 'uberTripBranding') ? undefined : HealthcareFacilityAllOfUberTripBrandingFromJSON(json['uberTripBranding']),
        'videos': !exists(json, 'videos') ? undefined : (new Set((json['videos'] as Array<any>).map(HealthcareFacilityAllOfVideosFromJSON))),
        'walkableCoordinate': !exists(json, 'walkableCoordinate') ? undefined : AtmAllOfWalkableCoordinateFromJSON(json['walkableCoordinate']),
        'websiteUrl': !exists(json, 'websiteUrl') ? undefined : AtmAllOfWebsiteUrlFromJSON(json['websiteUrl']),
        'yearEstablished': !exists(json, 'yearEstablished') ? undefined : json['yearEstablished'],
    };
}

export function LocationToJSON(value?: Location | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...EntityWriteToJSON(value),
        'meta': AtmAllOfMetaToJSON(value.meta),
        'name': value.name,
        'address': AtmAllOfAddressToJSON(value.address),
        'accessHours': AtmAllOfAccessHoursToJSON(value.accessHours),
        'additionalHoursText': value.additionalHoursText,
        'addressHidden': value.addressHidden,
        'alternateNames': value.alternateNames,
        'alternatePhone': value.alternatePhone,
        'alternateWebsites': value.alternateWebsites,
        'androidAppUrl': value.androidAppUrl,
        'associations': value.associations,
        'bios': HealthcareFacilityAllOfBiosToJSON(value.bios),
        'brands': value.brands,
        'brunchHours': HotelAllOfBrunchHoursToJSON(value.brunchHours),
        'calendars': HealthcareFacilityAllOfCalendarsToJSON(value.calendars),
        'categoryIds': value.categoryIds,
        'closed': value.closed,
        'customKeywords': value.customKeywords,
        'deliveryHours': LocationAllOfDeliveryHoursToJSON(value.deliveryHours),
        'description': value.description,
        'displayCoordinate': AtmAllOfDisplayCoordinateToJSON(value.displayCoordinate),
        'driveThroughHours': AtmAllOfDriveThroughHoursToJSON(value.driveThroughHours),
        'dropoffCoordinate': AtmAllOfDropoffCoordinateToJSON(value.dropoffCoordinate),
        'emails': value.emails,
        'facebookCallToAction': AtmAllOfFacebookCallToActionToJSON(value.facebookCallToAction),
        'facebookCoverPhoto': AtmAllOfFacebookCoverPhotoToJSON(value.facebookCoverPhoto),
        'facebookDescriptor': value.facebookDescriptor,
        'facebookName': value.facebookName,
        'facebookOverrideCity': value.facebookOverrideCity,
        'facebookPageUrl': value.facebookPageUrl,
        'facebookProfilePhoto': AtmAllOfFacebookProfilePhotoToJSON(value.facebookProfilePhoto),
        'facebookVanityUrl': value.facebookVanityUrl,
        'fax': value.fax,
        'featuredMessage': AtmAllOfFeaturedMessageToJSON(value.featuredMessage),
        'firstPartyReviewPage': value.firstPartyReviewPage,
        'frequentlyAskedQuestions': value.frequentlyAskedQuestions === undefined ? undefined : (Array.from(value.frequentlyAskedQuestions as Set<any>).map(AtmAllOfFrequentlyAskedQuestionsToJSON)),
        'geomodifier': value.geomodifier,
        'googleAttributes': value.googleAttributes,
        'googleCoverPhoto': AtmAllOfGoogleCoverPhotoToJSON(value.googleCoverPhoto),
        'googleMyBusinessLabels': value.googleMyBusinessLabels,
        'googlePlaceId': value.googlePlaceId,
        'googleProfilePhoto': AtmAllOfGoogleProfilePhotoToJSON(value.googleProfilePhoto),
        'googleWebsiteOverride': value.googleWebsiteOverride,
        'happyHours': HotelAllOfHappyHoursToJSON(value.happyHours),
        'holidayHoursConversationEnabled': value.holidayHoursConversationEnabled,
        'hours': AtmAllOfHoursToJSON(value.hours),
        'impressum': value.impressum,
        'instagramHandle': value.instagramHandle,
        'iosAppUrl': value.iosAppUrl,
        'isoRegionCode': value.isoRegionCode,
        'keywords': value.keywords,
        'kitchenHours': HotelAllOfKitchenHoursToJSON(value.kitchenHours),
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'languages': value.languages,
        'localPhone': value.localPhone,
        'locationType': value.locationType,
        'logo': AtmAllOfLogoToJSON(value.logo),
        'mainPhone': value.mainPhone,
        'menuUrl': HealthcareFacilityAllOfMenuUrlToJSON(value.menuUrl),
        'menus': HotelAllOfMenusToJSON(value.menus),
        'mobilePhone': value.mobilePhone,
        'nudgeEnabled': value.nudgeEnabled,
        'onlineServiceHours': HealthcareFacilityAllOfOnlineServiceHoursToJSON(value.onlineServiceHours),
        'orderUrl': HealthcareFacilityAllOfOrderUrlToJSON(value.orderUrl),
        'paymentOptions': value.paymentOptions,
        'photoGallery': value.photoGallery === undefined ? undefined : ((value.photoGallery as Array<any>).map(EventAllOfPhotoGalleryToJSON)),
        'pickupCoordinate': AtmAllOfPickupCoordinateToJSON(value.pickupCoordinate),
        'pickupHours': HealthcareFacilityAllOfPickupHoursToJSON(value.pickupHours),
        'priceRange': value.priceRange,
        'primaryConversationContact': value.primaryConversationContact,
        'productLists': HealthcareFacilityAllOfProductListsToJSON(value.productLists),
        'products': value.products,
        'questionsAndAnswers': value.questionsAndAnswers,
        'rankTrackingCompetitors': value.rankTrackingCompetitors === undefined ? undefined : (Array.from(value.rankTrackingCompetitors as Set<any>).map(AtmAllOfRankTrackingCompetitorsToJSON)),
        'rankTrackingEnabled': value.rankTrackingEnabled,
        'rankTrackingFrequency': value.rankTrackingFrequency,
        'rankTrackingQueryTemplates': value.rankTrackingQueryTemplates,
        'rankTrackingSites': value.rankTrackingSites,
        'reservationUrl': HealthcareFacilityAllOfReservationUrlToJSON(value.reservationUrl),
        'reviewGenerationUrl': value.reviewGenerationUrl,
        'reviewResponseConversationEnabled': value.reviewResponseConversationEnabled,
        'routableCoordinate': AtmAllOfRoutableCoordinateToJSON(value.routableCoordinate),
        'seniorHours': LocationAllOfSeniorHoursToJSON(value.seniorHours),
        'serviceArea': HealthcareFacilityAllOfServiceAreaToJSON(value.serviceArea),
        'serviceAreaPlaces': value.serviceAreaPlaces === undefined ? undefined : (Array.from(value.serviceAreaPlaces as Set<any>).map(HealthcareFacilityAllOfServiceAreaPlacesToJSON)),
        'services': value.services,
        'specialities': value.specialities,
        'takeoutHours': LocationAllOfTakeoutHoursToJSON(value.takeoutHours),
        'timezone': value.timezone,
        'tollFreePhone': value.tollFreePhone,
        'ttyPhone': value.ttyPhone,
        'twitterHandle': value.twitterHandle,
        'uberLink': HealthcareFacilityAllOfUberLinkToJSON(value.uberLink),
        'uberTripBranding': HealthcareFacilityAllOfUberTripBrandingToJSON(value.uberTripBranding),
        'videos': value.videos === undefined ? undefined : (Array.from(value.videos as Set<any>).map(HealthcareFacilityAllOfVideosToJSON)),
        'walkableCoordinate': AtmAllOfWalkableCoordinateToJSON(value.walkableCoordinate),
        'websiteUrl': AtmAllOfWebsiteUrlToJSON(value.websiteUrl),
        'yearEstablished': value.yearEstablished,
    };
}


