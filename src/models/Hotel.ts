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
    HealthcareFacilityAllOfOrderUrl,
    HealthcareFacilityAllOfOrderUrlFromJSON,
    HealthcareFacilityAllOfOrderUrlFromJSONTyped,
    HealthcareFacilityAllOfOrderUrlToJSON,
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
    HotelAllOf,
    HotelAllOfFromJSON,
    HotelAllOfFromJSONTyped,
    HotelAllOfToJSON,
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
} from './';

/**
 * 
 * @export
 * @interface Hotel
 */
export interface Hotel extends EntityWrite {
    /**
     * 
     * @type {AtmAllOfMeta}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    name?: string;
    /**
     * 
     * @type {AtmAllOfAddress}
     * @memberof Hotel
     */
    address?: AtmAllOfAddress;
    /**
     * 
     * @type {AtmAllOfAccessHours}
     * @memberof Hotel
     */
    accessHours?: AtmAllOfAccessHours;
    /**
     * Additional information about hours that does not fit in **`hours`** (e.g., `"Closed during the winter"`)
     * @type {string}
     * @memberof Hotel
     */
    additionalHoursText?: string;
    /**
     * If `true`, the entity's street address will not be shown on listings. Defaults to `false`.
     * @type {boolean}
     * @memberof Hotel
     */
    addressHidden?: boolean;
    /**
     * Indicates whether the entity has a pool for adults only.
     * @type {string}
     * @memberof Hotel
     */
    adultPool?: HotelAdultPoolEnum;
    /**
     * Indicates whether the entity offers a shuttle to/from the airport.
     * @type {string}
     * @memberof Hotel
     */
    airportShuttle?: HotelAirportShuttleEnum;
    /**
     * Indicates whether the entity offers a shuttle service of car service to/from nearby airports or train stations.
     * @type {string}
     * @memberof Hotel
     */
    airportTransfer?: HotelAirportTransferEnum;
    /**
     * Indicates whether the entity offers all-inclusive rates.
     * @type {string}
     * @memberof Hotel
     */
    allInclusive?: HotelAllInclusiveEnum;
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
     * @memberof Hotel
     */
    alternateNames?: Set<string>;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    alternateWebsites?: Set<string>;
    /**
     * The URL where consumers can download the entity's Android app
     * @type {string}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    associations?: Set<string>;
    /**
     * Indicates whether the entity offers babysitting.
     * @type {string}
     * @memberof Hotel
     */
    babysittingOffered?: HotelBabysittingOfferedEnum;
    /**
     * Indicates whether the entity offers baggage storage pre check-in and post check-out.
     * @type {string}
     * @memberof Hotel
     */
    baggageStorage?: HotelBaggageStorageEnum;
    /**
     * Indicates whether the entity has an indoor or outdoor bar onsite.
     * @type {string}
     * @memberof Hotel
     */
    bar?: HotelBarEnum;
    /**
     * Indicates whether the entity has access to a beach.
     * @type {string}
     * @memberof Hotel
     */
    beachAccess?: HotelBeachAccessEnum;
    /**
     * Indicates whether the entity is physically located next to a beach.
     * @type {string}
     * @memberof Hotel
     */
    beachFrontProperty?: HotelBeachFrontPropertyEnum;
    /**
     * Indicates whether the entity offers bicycles for rent or for free.
     * @type {string}
     * @memberof Hotel
     */
    bicycles?: HotelBicyclesEnum;
    /**
     * 
     * @type {HealthcareFacilityAllOfBios}
     * @memberof Hotel
     */
    bios?: HealthcareFacilityAllOfBios;
    /**
     * Indicates whether the entity has a boutique store. Gift shop or convenience store are not eligible.
     * @type {string}
     * @memberof Hotel
     */
    boutiqueStores?: HotelBoutiqueStoresEnum;
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
     * @memberof Hotel
     */
    brands?: Set<string>;
    /**
     * Indicates whether the entity offers breakfast.
     * @type {string}
     * @memberof Hotel
     */
    breakfast?: HotelBreakfastEnum;
    /**
     * 
     * @type {HotelAllOfBrunchHours}
     * @memberof Hotel
     */
    brunchHours?: HotelAllOfBrunchHours;
    /**
     * Indicates whether the entity has a business center.
     * @type {string}
     * @memberof Hotel
     */
    businessCenter?: HotelBusinessCenterEnum;
    /**
     * 
     * @type {HealthcareFacilityAllOfCalendars}
     * @memberof Hotel
     */
    calendars?: HealthcareFacilityAllOfCalendars;
    /**
     * Indicates whether the entity offers car rental.
     * @type {string}
     * @memberof Hotel
     */
    carRental?: HotelCarRentalEnum;
    /**
     * Indicates whether the entity has a casino on premise or nearby.
     * @type {string}
     * @memberof Hotel
     */
    casino?: HotelCasinoEnum;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof Hotel
     */
    categoryIds?: Array<string>;
    /**
     * Indicates if the entity is cat friendly.
     * @type {string}
     * @memberof Hotel
     */
    catsAllowed?: HotelCatsAllowedEnum;
    /**
     * The check-in time
     * @type {string}
     * @memberof Hotel
     */
    checkInTime?: string;
    /**
     * The check-out time
     * @type {string}
     * @memberof Hotel
     */
    checkOutTime?: string;
    /**
     * The 1 to 5 star rating of the entitiy based on its services and facilities.
     * @type {string}
     * @memberof Hotel
     */
    classificationRating?: string;
    /**
     * Indicates whether the entity is closed
     * @type {boolean}
     * @memberof Hotel
     */
    closed?: boolean;
    /**
     * Indicates whether the entity offers concierge service.
     * @type {string}
     * @memberof Hotel
     */
    concierge?: HotelConciergeEnum;
    /**
     * Indicates whether the entity has a convenience store.
     * @type {string}
     * @memberof Hotel
     */
    convenienceStore?: HotelConvenienceStoreEnum;
    /**
     * Indicates whether the entity offers currency exchange services.
     * @type {string}
     * @memberof Hotel
     */
    currencyExchange?: HotelCurrencyExchangeEnum;
    /**
     * Additional keywords you would like us to use when tracking your search performance
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * @type {Set<string>}
     * @memberof Hotel
     */
    customKeywords?: Set<string>;
    /**
     * A description of the entity
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof Hotel
     */
    description?: string;
    /**
     * 
     * @type {AtmAllOfDisplayCoordinate}
     * @memberof Hotel
     */
    displayCoordinate?: AtmAllOfDisplayCoordinate;
    /**
     * Indicates whether the entity has a doctor on premise or on call.
     * @type {string}
     * @memberof Hotel
     */
    doctorOnCall?: HotelDoctorOnCallEnum;
    /**
     * Indicates if the entity is dog friendly.
     * @type {string}
     * @memberof Hotel
     */
    dogsAllowed?: HotelDogsAllowedEnum;
    /**
     * 
     * @type {AtmAllOfDropoffCoordinate}
     * @memberof Hotel
     */
    dropoffCoordinate?: AtmAllOfDropoffCoordinate;
    /**
     * Indicates whether the entity has electric car chargine stations on premise.
     * @type {string}
     * @memberof Hotel
     */
    electricChargingStation?: HotelElectricChargingStationEnum;
    /**
     * Indicates whether the entity has an elevator.
     * @type {string}
     * @memberof Hotel
     */
    elevator?: HotelElevatorEnum;
    /**
     * Indicates whether the entity has an elliptical machine.
     * @type {string}
     * @memberof Hotel
     */
    ellipticalMachine?: HotelEllipticalMachineEnum;
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
     * @memberof Hotel
     */
    emails?: Set<string>;
    /**
     * 
     * @type {AtmAllOfFacebookCallToAction}
     * @memberof Hotel
     */
    facebookCallToAction?: AtmAllOfFacebookCallToAction;
    /**
     * 
     * @type {AtmAllOfFacebookCoverPhoto}
     * @memberof Hotel
     */
    facebookCoverPhoto?: AtmAllOfFacebookCoverPhoto;
    /**
     * Location Descriptors are used for Enterprise businesses that sync Facebook listings using brand page location structure. The Location Descriptor is typically an additional geographic description (e.g. geomodifier) that will appear in parentheses after the name on the Facebook listing.
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof Hotel
     */
    facebookDescriptor?: string;
    /**
     * The name for this entity's Facebook profile.  A separate name may be specified to send only to Facebook in order to comply with any specific Facebook rules or naming conventions.
     * @type {string}
     * @memberof Hotel
     */
    facebookName?: string;
    /**
     * The city to be displayed on this entity's Facebook profile
     * @type {string}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    facebookPageUrl?: string;
    /**
     * 
     * @type {AtmAllOfFacebookProfilePhoto}
     * @memberof Hotel
     */
    facebookProfilePhoto?: AtmAllOfFacebookProfilePhoto;
    /**
     * The username that appear's in the Facebook listing URL to help customers find and remember a brand’s Facebook page.  The username is also be used for tagging the Facebook page in other users’ posts, and searching for the Facebook page.
     * @type {string}
     * @memberof Hotel
     */
    facebookVanityUrl?: string;
    /**
     * Must be a valid fax number.
     * 
     * If the fax number's calling code is for a country other than the one given in the entity's **`countryCode`**, the fax number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
     */
    fax?: string;
    /**
     * 
     * @type {AtmAllOfFeaturedMessage}
     * @memberof Hotel
     */
    featuredMessage?: AtmAllOfFeaturedMessage;
    /**
     * Link to the review-collection page, where consumers can leave first-party reviews
     * @type {string}
     * @memberof Hotel
     */
    firstPartyReviewPage?: string;
    /**
     * Indicates whether the entity has a fitness center.
     * @type {string}
     * @memberof Hotel
     */
    fitnessCenter?: HotelFitnessCenterEnum;
    /**
     * The number of floors the entity has from ground floor to top floor.
     * @type {number}
     * @memberof Hotel
     */
    floorCount?: number;
    /**
     * Indicates whether the entity has free weights.
     * @type {string}
     * @memberof Hotel
     */
    freeWeights?: HotelFreeWeightsEnum;
    /**
     * A list of questions that are frequently asked about this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * @type {Set<AtmAllOfFrequentlyAskedQuestions>}
     * @memberof Hotel
     */
    frequentlyAskedQuestions?: Set<AtmAllOfFrequentlyAskedQuestions>;
    /**
     * Indicates whether the entity has a front desk.
     * @type {string}
     * @memberof Hotel
     */
    frontDesk?: HotelFrontDeskEnum;
    /**
     * Indicates whether the entity has a game room.
     * @type {string}
     * @memberof Hotel
     */
    gameRoom?: HotelGameRoomEnum;
    /**
     * Provides additional information on where the entity can be found (e.g., `Times Square`, `Global Center Mall`)
     * @type {string}
     * @memberof Hotel
     */
    geomodifier?: string;
    /**
     * Indicates whether the entity has a gift shop.
     * @type {string}
     * @memberof Hotel
     */
    giftShop?: HotelGiftShopEnum;
    /**
     * Indicates whether the entity has a golf couse on premise or nearby. The golf course may be independently run.
     * @type {string}
     * @memberof Hotel
     */
    golf?: HotelGolfEnum;
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
     * @memberof Hotel
     */
    googleAttributes?: object;
    /**
     * 
     * @type {AtmAllOfGoogleCoverPhoto}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    googleMyBusinessLabels?: Set<string>;
    /**
     * The unique identifier of this entity on Google Maps.
     * @type {string}
     * @memberof Hotel
     */
    googlePlaceId?: string;
    /**
     * 
     * @type {AtmAllOfGoogleProfilePhoto}
     * @memberof Hotel
     */
    googleProfilePhoto?: AtmAllOfGoogleProfilePhoto;
    /**
     * The URL you would like to submit to Google My Business in place of the one given in **`websiteUrl`** (if applicable).
     * 
     * For example, if you want to analyze the traffic driven by your Google listings separately from other traffic, enter the alternate URL that you will use for tracking in this field.
     * @type {string}
     * @memberof Hotel
     */
    googleWebsiteOverride?: string;
    /**
     * 
     * @type {HotelAllOfHappyHours}
     * @memberof Hotel
     */
    happyHours?: HotelAllOfHappyHours;
    /**
     * Indicates whether holiday-hour confirmation alerts are enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof Hotel
     */
    holidayHoursConversationEnabled?: boolean;
    /**
     * Indicates whether the entity offers horseback riding.
     * @type {string}
     * @memberof Hotel
     */
    horsebackRiding?: HotelHorsebackRidingEnum;
    /**
     * Indicates whether the entity has a hot tub.
     * @type {string}
     * @memberof Hotel
     */
    hotTub?: HotelHotTubEnum;
    /**
     * 
     * @type {AtmAllOfHours}
     * @memberof Hotel
     */
    hours?: AtmAllOfHours;
    /**
     * Indicates whether the entity offers housekeeping services.
     * @type {string}
     * @memberof Hotel
     */
    housekeeping?: HotelHousekeepingEnum;
    /**
     * A statement of the ownership and authorship of a document. Individuals or organizations based in many German-speaking countries are required by law to include an Impressum in published media.
     * @type {string}
     * @memberof Hotel
     */
    impressum?: string;
    /**
     * A count of the number of indoor pools
     * @type {number}
     * @memberof Hotel
     */
    indoorPoolCount?: number;
    /**
     * Valid Instagram username for the entity without the leading "@" (e.g., `NewCityAuto`)
     * @type {string}
     * @memberof Hotel
     */
    instagramHandle?: string;
    /**
     * The URL where consumers can download the entity's app to their iPhone or iPad
     * @type {string}
     * @memberof Hotel
     */
    iosAppUrl?: string;
    /**
     * The ISO 3166-2 region code for the entity
     * 
     * Yext will determine the entity's code and update **`isoRegionCode`** with that value. If Yext is unable to determine the code for the entity, the entity'ss ISO 3166-1 alpha-2 country code will be used.
     * @type {string}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    keywords?: Set<string>;
    /**
     * Indicates if the entity is kid friendly.
     * @type {string}
     * @memberof Hotel
     */
    kidFriendly?: HotelKidFriendlyEnum;
    /**
     * Indicates if the property has a Kids Club.
     * @type {string}
     * @memberof Hotel
     */
    kidsClub?: HotelKidsClubEnum;
    /**
     * Indicates whether the entity allows kids to stay free.
     * @type {string}
     * @memberof Hotel
     */
    kidsStayFree?: HotelKidsStayFreeEnum;
    /**
     * 
     * @type {HotelAllOfKitchenHours}
     * @memberof Hotel
     */
    kitchenHours?: HotelAllOfKitchenHours;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<string>}
     * @memberof Hotel
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * @type {string}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    languages?: Set<string>;
    /**
     * Indicates whether the entity offers laundry services.
     * @type {string}
     * @memberof Hotel
     */
    laundry?: HotelLaundryEnum;
    /**
     * Indicates if the property has a lazy river
     * @type {string}
     * @memberof Hotel
     */
    lazyRiver?: HotelLazyRiverEnum;
    /**
     * Indicates if the property has a lifeguard on duty
     * @type {string}
     * @memberof Hotel
     */
    lifeguard?: HotelLifeguardEnum;
    /**
     * Must be a valid, non-toll-free phone number, based on the country specified in **`address.region`**. Phone numbers for US entities must contain 10 digits.
     * @type {string}
     * @memberof Hotel
     */
    localPhone?: string;
    /**
     * Indicates whether the entity offers local shuttle services.
     * @type {string}
     * @memberof Hotel
     */
    localShuttle?: HotelLocalShuttleEnum;
    /**
     * Indicates the entity's type, if it is not an event
     * @type {string}
     * @memberof Hotel
     */
    locationType?: HotelLocationTypeEnum;
    /**
     * 
     * @type {AtmAllOfLogo}
     * @memberof Hotel
     */
    logo?: AtmAllOfLogo;
    /**
     * The main phone number of the entity's point of contact
     * 
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
     */
    mainPhone?: string;
    /**
     * Indicates whether the entity offers massage services.
     * @type {string}
     * @memberof Hotel
     */
    massage?: HotelMassageEnum;
    /**
     * The maximum age specified by the property for children to stay in the room/suite of a parent or adult without an additional fee
     * @type {number}
     * @memberof Hotel
     */
    maxAgeOfKidsStayFree?: number;
    /**
     * The maximum number of children who can stay in the room/suite of a parent or adult without an additional fee
     * @type {number}
     * @memberof Hotel
     */
    maxNumberOfKidsStayFree?: number;
    /**
     * The number of meeting rooms the entity has.
     * @type {number}
     * @memberof Hotel
     */
    meetingRoomCount?: number;
    /**
     * 
     * @type {HealthcareFacilityAllOfMenuUrl}
     * @memberof Hotel
     */
    menuUrl?: HealthcareFacilityAllOfMenuUrl;
    /**
     * 
     * @type {HotelAllOfMenus}
     * @memberof Hotel
     */
    menus?: HotelAllOfMenus;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
     */
    mobilePhone?: string;
    /**
     * Indicates whether the entity is mobility/wheelchair accessible
     * @type {string}
     * @memberof Hotel
     */
    mobilityAccessible?: HotelMobilityAccessibleEnum;
    /**
     * Indicates whether the entity has a nightclub.
     * @type {string}
     * @memberof Hotel
     */
    nightclub?: HotelNightclubEnum;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof Hotel
     */
    nudgeEnabled?: boolean;
    /**
     * 
     * @type {HealthcareFacilityAllOfOrderUrl}
     * @memberof Hotel
     */
    orderUrl?: HealthcareFacilityAllOfOrderUrl;
    /**
     * The number of outdoor pools the entity has.
     * @type {number}
     * @memberof Hotel
     */
    outdoorPoolCount?: number;
    /**
     * Indicates whether the entity offers parking services.
     * @type {string}
     * @memberof Hotel
     */
    parking?: HotelParkingEnum;
    /**
     * The payment methods accepted by this entity
     * 
     * Valid elements depend on the entity's country.
     * @type {Set<string>}
     * @memberof Hotel
     */
    paymentOptions?: Set<HotelPaymentOptionsEnum>;
    /**
     * Indicates if the entity is pet friendly.
     * @type {string}
     * @memberof Hotel
     */
    petsAllowed?: HotelPetsAllowedEnum;
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
     * @memberof Hotel
     */
    photoGallery?: Array<EventAllOfPhotoGallery>;
    /**
     * 
     * @type {AtmAllOfPickupCoordinate}
     * @memberof Hotel
     */
    pickupCoordinate?: AtmAllOfPickupCoordinate;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof Hotel
     */
    primaryConversationContact?: string;
    /**
     * Indicates whether the entity has access to a private beach.
     * @type {string}
     * @memberof Hotel
     */
    privateBeach?: HotelPrivateBeachEnum;
    /**
     * Indicates whether the entity offers private car services.
     * @type {string}
     * @memberof Hotel
     */
    privateCarService?: HotelPrivateCarServiceEnum;
    /**
     * 
     * @type {HealthcareFacilityAllOfProductLists}
     * @memberof Hotel
     */
    productLists?: HealthcareFacilityAllOfProductLists;
    /**
     * Indicates whether Yext Knowledge Assistant question-and-answer conversations are enabled for this entity
     * @type {boolean}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    rankTrackingCompetitors?: Set<AtmAllOfRankTrackingCompetitors>;
    /**
     * Indicates whether Rank Tracking is enabled
     * @type {boolean}
     * @memberof Hotel
     */
    rankTrackingEnabled?: boolean;
    /**
     * How often we send search queries to track your search performance
     * @type {string}
     * @memberof Hotel
     */
    rankTrackingFrequency?: HotelRankTrackingFrequencyEnum;
    /**
     * The ways in which your keywords will be arranged in the search queries we use to track your performance
     * 
     * 
     * Array must have a minimum of 2 elements.
     * 
     * Array may have a maximum of 4 elements.
     * @type {Set<string>}
     * @memberof Hotel
     */
    rankTrackingQueryTemplates?: Set<HotelRankTrackingQueryTemplatesEnum>;
    /**
     * The search engines that we will use to track your performance
     * @type {Set<string>}
     * @memberof Hotel
     */
    rankTrackingSites?: Set<HotelRankTrackingSitesEnum>;
    /**
     * 
     * @type {HealthcareFacilityAllOfReservationUrl}
     * @memberof Hotel
     */
    reservationUrl?: HealthcareFacilityAllOfReservationUrl;
    /**
     * The number of restaurants the entity has.
     * @type {number}
     * @memberof Hotel
     */
    restaurantCount?: number;
    /**
     * The URL given Review Invitation emails where consumers can leave a review about the entity
     * @type {string}
     * @memberof Hotel
     */
    reviewGenerationUrl?: string;
    /**
     * Indicates whether Yext Knowledge Assistant review-response conversations are enabled for this entity
     * @type {boolean}
     * @memberof Hotel
     */
    reviewResponseConversationEnabled?: boolean;
    /**
     * The number of rooms the entity has.
     * @type {number}
     * @memberof Hotel
     */
    roomCount?: number;
    /**
     * Indicates whether the entity offers room service.
     * @type {string}
     * @memberof Hotel
     */
    roomService?: HotelRoomServiceEnum;
    /**
     * 
     * @type {AtmAllOfRoutableCoordinate}
     * @memberof Hotel
     */
    routableCoordinate?: AtmAllOfRoutableCoordinate;
    /**
     * Indicates whether the entity has a salon.
     * @type {string}
     * @memberof Hotel
     */
    salon?: HotelSalonEnum;
    /**
     * Indicates whether the entity has a sauna.
     * @type {string}
     * @memberof Hotel
     */
    sauna?: HotelSaunaEnum;
    /**
     * Indicates whether the entity offers scuba diving.
     * @type {string}
     * @memberof Hotel
     */
    scuba?: HotelScubaEnum;
    /**
     * Indicates whether the entity offers self parking services.
     * @type {string}
     * @memberof Hotel
     */
    selfParking?: HotelSelfParkingEnum;
    /**
     * 
     * @type {HealthcareFacilityAllOfServiceArea}
     * @memberof Hotel
     */
    serviceArea?: HealthcareFacilityAllOfServiceArea;
    /**
     * Information about the area that is served by this entity. It is specified as a list of service area names and their associated types.
     * **Only for Google My Business and Bing:** Currently, **serviceArea** is only supported by Google My Business and Bing and will not affect your listings on other sites.
     * 
     * 
     * Array may have a maximum of 200 elements.
     * @type {Set<HealthcareFacilityAllOfServiceAreaPlaces>}
     * @memberof Hotel
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
     * @memberof Hotel
     */
    services?: Set<string>;
    /**
     * Indicates if the entity is smoke free.
     * @type {string}
     * @memberof Hotel
     */
    smokeFreeProperty?: HotelSmokeFreePropertyEnum;
    /**
     * Indicates whether the entity offers snorkeling.
     * @type {string}
     * @memberof Hotel
     */
    snorkeling?: HotelSnorkelingEnum;
    /**
     * Indicates whether the entity offers a social hour.
     * @type {string}
     * @memberof Hotel
     */
    socialHour?: HotelSocialHourEnum;
    /**
     * Indicates whether the entity has a spa.
     * @type {string}
     * @memberof Hotel
     */
    spa?: HotelSpaEnum;
    /**
     * Indicates whether the entity has a sit-down restaurant.
     * @type {string}
     * @memberof Hotel
     */
    tableService?: HotelTableServiceEnum;
    /**
     * Indicates whether the entity has tennis courts.
     * @type {string}
     * @memberof Hotel
     */
    tennis?: HotelTennisEnum;
    /**
     * Indicates whether the entity has a thermal pool.
     * @type {string}
     * @memberof Hotel
     */
    thermalPool?: HotelThermalPoolEnum;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * @type {string}
     * @memberof Hotel
     */
    timezone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
     */
    tollFreePhone?: string;
    /**
     * Indicates whether the entity has a treadmill.
     * @type {string}
     * @memberof Hotel
     */
    treadmill?: HotelTreadmillEnum;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof Hotel
     */
    ttyPhone?: string;
    /**
     * Indicates whether the entity offers turndown service.
     * @type {string}
     * @memberof Hotel
     */
    turndownService?: HotelTurndownServiceEnum;
    /**
     * Valid Twitter handle for the entity without the leading "@" (e.g., `JohnSmith`)
     * 
     * If you submit an invalid Twitter handle, it will be ignored. The success response will contain a warning message explaining why your Twitter handle wasn't stored in the system.
     * @type {string}
     * @memberof Hotel
     */
    twitterHandle?: string;
    /**
     * 
     * @type {HealthcareFacilityAllOfUberLink}
     * @memberof Hotel
     */
    uberLink?: HealthcareFacilityAllOfUberLink;
    /**
     * 
     * @type {HealthcareFacilityAllOfUberTripBranding}
     * @memberof Hotel
     */
    uberTripBranding?: HealthcareFacilityAllOfUberTripBranding;
    /**
     * Indicates whether the entity offers valet parking services.
     * @type {string}
     * @memberof Hotel
     */
    valetParking?: HotelValetParkingEnum;
    /**
     * Indicates whether the entity has a vending machine.
     * @type {string}
     * @memberof Hotel
     */
    vendingMachine?: HotelVendingMachineEnum;
    /**
     * Valid YouTube URLs for embedding a video on some publisher sites
     * 
     * **NOTE:** Currently, only the first URL in the Array appears in your listings.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<HealthcareFacilityAllOfVideos>}
     * @memberof Hotel
     */
    videos?: Set<HealthcareFacilityAllOfVideos>;
    /**
     * Indicates whether the entity has a wading pool.
     * @type {string}
     * @memberof Hotel
     */
    wadingPool?: HotelWadingPoolEnum;
    /**
     * Indicates whether the entity offers wake up call services.
     * @type {string}
     * @memberof Hotel
     */
    wakeUpCalls?: HotelWakeUpCallsEnum;
    /**
     * 
     * @type {AtmAllOfWalkableCoordinate}
     * @memberof Hotel
     */
    walkableCoordinate?: AtmAllOfWalkableCoordinate;
    /**
     * Indicates whether the entity has a water park.
     * @type {string}
     * @memberof Hotel
     */
    waterPark?: HotelWaterParkEnum;
    /**
     * Indicates whether the entity offers water skiing.
     * @type {string}
     * @memberof Hotel
     */
    waterSkiing?: HotelWaterSkiingEnum;
    /**
     * Indicates whether the entity offers any kind of watercrafts.
     * @type {string}
     * @memberof Hotel
     */
    watercraft?: HotelWatercraftEnum;
    /**
     * Indicates whether the entity has a water slide.
     * @type {string}
     * @memberof Hotel
     */
    waterslide?: HotelWaterslideEnum;
    /**
     * Indicates whether the entity has a wave pool.
     * @type {string}
     * @memberof Hotel
     */
    wavePool?: HotelWavePoolEnum;
    /**
     * 
     * @type {AtmAllOfWebsiteUrl}
     * @memberof Hotel
     */
    websiteUrl?: AtmAllOfWebsiteUrl;
    /**
     * Indicates whether the entity has a weight machine.
     * @type {string}
     * @memberof Hotel
     */
    weightMachine?: HotelWeightMachineEnum;
    /**
     * Indicates if the entity is wheelchair accessible.
     * @type {string}
     * @memberof Hotel
     */
    wheelchairAccessible?: HotelWheelchairAccessibleEnum;
    /**
     * Indicates whether the entity has WiFi available
     * @type {string}
     * @memberof Hotel
     */
    wifiAvailable?: HotelWifiAvailableEnum;
    /**
     * The year the entity was established.
     * @type {number}
     * @memberof Hotel
     */
    yearEstablished?: number;
    /**
     * The most recent year the entity was partially or completely renovated.
     * @type {number}
     * @memberof Hotel
     */
    yearLastRenovated?: number;
}

/**
* @export
* @enum {string}
*/
export enum HotelAdultPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelAirportShuttleEnum {
    AirportShuttleAvailable = 'AIRPORT_SHUTTLE_AVAILABLE',
    AirportShuttleAvailableForFree = 'AIRPORT_SHUTTLE_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelAirportTransferEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelAllInclusiveEnum {
    AllInclusiveRatesAvailable = 'ALL_INCLUSIVE_RATES_AVAILABLE',
    AllInclusiveRatesOnly = 'ALL_INCLUSIVE_RATES_ONLY',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBabysittingOfferedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBaggageStorageEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBarEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBeachAccessEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBeachFrontPropertyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBicyclesEnum {
    BicycleRentals = 'BICYCLE_RENTALS',
    BicycleRentalsForFree = 'BICYCLE_RENTALS_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBoutiqueStoresEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBreakfastEnum {
    BreakfastAvailable = 'BREAKFAST_AVAILABLE',
    BreakfastAvailableForFree = 'BREAKFAST_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelBusinessCenterEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelCarRentalEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelCasinoEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelCatsAllowedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelConciergeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelConvenienceStoreEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelCurrencyExchangeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelDoctorOnCallEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelDogsAllowedEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelElectricChargingStationEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelElevatorEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelEllipticalMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelFitnessCenterEnum {
    FitnessCenterAvailable = 'FITNESS_CENTER_AVAILABLE',
    FitnessCenterAvailableForFree = 'FITNESS_CENTER_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelFreeWeightsEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelFrontDeskEnum {
    FrontDeskAvailable = 'FRONT_DESK_AVAILABLE',
    FrontDeskAvailable24Hours = 'FRONT_DESK_AVAILABLE_24_HOURS',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelGameRoomEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelGiftShopEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelGolfEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelHorsebackRidingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelHotTubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelHousekeepingEnum {
    HousekeepingAvailable = 'HOUSEKEEPING_AVAILABLE',
    HousekeepingAvailableDaily = 'HOUSEKEEPING_AVAILABLE_DAILY',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelKidFriendlyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelKidsClubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelKidsStayFreeEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelLaundryEnum {
    FullService = 'FULL_SERVICE',
    SelfService = 'SELF_SERVICE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelLazyRiverEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelLifeguardEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelLocalShuttleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelLocationTypeEnum {
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
export enum HotelMassageEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelMobilityAccessibleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelNightclubEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelParkingEnum {
    ParkingAvailable = 'PARKING_AVAILABLE',
    ParkingAvailableForFree = 'PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelPaymentOptionsEnum {
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
export enum HotelPetsAllowedEnum {
    PetsWelcome = 'PETS_WELCOME',
    PetsWelcomeForFree = 'PETS_WELCOME_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelPrivateBeachEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelPrivateCarServiceEnum {
    PrivateCarService = 'PRIVATE_CAR_SERVICE',
    PrivateCarServiceForFree = 'PRIVATE_CAR_SERVICE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelRankTrackingFrequencyEnum {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Quarterly = 'QUARTERLY'
}/**
* @export
* @enum {string}
*/
export enum HotelRankTrackingQueryTemplatesEnum {
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
export enum HotelRankTrackingSitesEnum {
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
export enum HotelRoomServiceEnum {
    RoomServiceAvailable = 'ROOM_SERVICE_AVAILABLE',
    RoomServiceAvailable24Hours = 'ROOM_SERVICE_AVAILABLE_24_HOURS',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSalonEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSaunaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelScubaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSelfParkingEnum {
    SelfParkingAvailable = 'SELF_PARKING_AVAILABLE',
    SelfParkingAvailableForFree = 'SELF_PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSmokeFreePropertyEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSnorkelingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSocialHourEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelSpaEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelTableServiceEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelTennisEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelThermalPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelTreadmillEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelTurndownServiceEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelValetParkingEnum {
    ValetParkingAvailable = 'VALET_PARKING_AVAILABLE',
    ValetParkingAvailableForFree = 'VALET_PARKING_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelVendingMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWadingPoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWakeUpCallsEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWaterParkEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWaterSkiingEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWatercraftEnum {
    WatercraftRentals = 'WATERCRAFT_RENTALS',
    WatercraftRentalsForFree = 'WATERCRAFT_RENTALS_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWaterslideEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWavePoolEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWeightMachineEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWheelchairAccessibleEnum {
    Yes = 'YES',
    No = 'NO',
    NotApplicable = 'NOT_APPLICABLE'
}/**
* @export
* @enum {string}
*/
export enum HotelWifiAvailableEnum {
    WifiAvailable = 'WIFI_AVAILABLE',
    WifiAvailableForFree = 'WIFI_AVAILABLE_FOR_FREE',
    NotApplicable = 'NOT_APPLICABLE'
}

export function HotelFromJSON(json: any): Hotel {
    return HotelFromJSONTyped(json, false);
}

export function HotelFromJSONTyped(json: any, ignoreDiscriminator: boolean): Hotel {
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
        'adultPool': !exists(json, 'adultPool') ? undefined : json['adultPool'],
        'airportShuttle': !exists(json, 'airportShuttle') ? undefined : json['airportShuttle'],
        'airportTransfer': !exists(json, 'airportTransfer') ? undefined : json['airportTransfer'],
        'allInclusive': !exists(json, 'allInclusive') ? undefined : json['allInclusive'],
        'alternateNames': !exists(json, 'alternateNames') ? undefined : json['alternateNames'],
        'alternatePhone': !exists(json, 'alternatePhone') ? undefined : json['alternatePhone'],
        'alternateWebsites': !exists(json, 'alternateWebsites') ? undefined : json['alternateWebsites'],
        'androidAppUrl': !exists(json, 'androidAppUrl') ? undefined : json['androidAppUrl'],
        'associations': !exists(json, 'associations') ? undefined : json['associations'],
        'babysittingOffered': !exists(json, 'babysittingOffered') ? undefined : json['babysittingOffered'],
        'baggageStorage': !exists(json, 'baggageStorage') ? undefined : json['baggageStorage'],
        'bar': !exists(json, 'bar') ? undefined : json['bar'],
        'beachAccess': !exists(json, 'beachAccess') ? undefined : json['beachAccess'],
        'beachFrontProperty': !exists(json, 'beachFrontProperty') ? undefined : json['beachFrontProperty'],
        'bicycles': !exists(json, 'bicycles') ? undefined : json['bicycles'],
        'bios': !exists(json, 'bios') ? undefined : HealthcareFacilityAllOfBiosFromJSON(json['bios']),
        'boutiqueStores': !exists(json, 'boutiqueStores') ? undefined : json['boutiqueStores'],
        'brands': !exists(json, 'brands') ? undefined : json['brands'],
        'breakfast': !exists(json, 'breakfast') ? undefined : json['breakfast'],
        'brunchHours': !exists(json, 'brunchHours') ? undefined : HotelAllOfBrunchHoursFromJSON(json['brunchHours']),
        'businessCenter': !exists(json, 'businessCenter') ? undefined : json['businessCenter'],
        'calendars': !exists(json, 'calendars') ? undefined : HealthcareFacilityAllOfCalendarsFromJSON(json['calendars']),
        'carRental': !exists(json, 'carRental') ? undefined : json['carRental'],
        'casino': !exists(json, 'casino') ? undefined : json['casino'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'catsAllowed': !exists(json, 'catsAllowed') ? undefined : json['catsAllowed'],
        'checkInTime': !exists(json, 'checkInTime') ? undefined : json['checkInTime'],
        'checkOutTime': !exists(json, 'checkOutTime') ? undefined : json['checkOutTime'],
        'classificationRating': !exists(json, 'classificationRating') ? undefined : json['classificationRating'],
        'closed': !exists(json, 'closed') ? undefined : json['closed'],
        'concierge': !exists(json, 'concierge') ? undefined : json['concierge'],
        'convenienceStore': !exists(json, 'convenienceStore') ? undefined : json['convenienceStore'],
        'currencyExchange': !exists(json, 'currencyExchange') ? undefined : json['currencyExchange'],
        'customKeywords': !exists(json, 'customKeywords') ? undefined : json['customKeywords'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'displayCoordinate': !exists(json, 'displayCoordinate') ? undefined : AtmAllOfDisplayCoordinateFromJSON(json['displayCoordinate']),
        'doctorOnCall': !exists(json, 'doctorOnCall') ? undefined : json['doctorOnCall'],
        'dogsAllowed': !exists(json, 'dogsAllowed') ? undefined : json['dogsAllowed'],
        'dropoffCoordinate': !exists(json, 'dropoffCoordinate') ? undefined : AtmAllOfDropoffCoordinateFromJSON(json['dropoffCoordinate']),
        'electricChargingStation': !exists(json, 'electricChargingStation') ? undefined : json['electricChargingStation'],
        'elevator': !exists(json, 'elevator') ? undefined : json['elevator'],
        'ellipticalMachine': !exists(json, 'ellipticalMachine') ? undefined : json['ellipticalMachine'],
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
        'fitnessCenter': !exists(json, 'fitnessCenter') ? undefined : json['fitnessCenter'],
        'floorCount': !exists(json, 'floorCount') ? undefined : json['floorCount'],
        'freeWeights': !exists(json, 'freeWeights') ? undefined : json['freeWeights'],
        'frequentlyAskedQuestions': !exists(json, 'frequentlyAskedQuestions') ? undefined : (new Set((json['frequentlyAskedQuestions'] as Array<any>).map(AtmAllOfFrequentlyAskedQuestionsFromJSON))),
        'frontDesk': !exists(json, 'frontDesk') ? undefined : json['frontDesk'],
        'gameRoom': !exists(json, 'gameRoom') ? undefined : json['gameRoom'],
        'geomodifier': !exists(json, 'geomodifier') ? undefined : json['geomodifier'],
        'giftShop': !exists(json, 'giftShop') ? undefined : json['giftShop'],
        'golf': !exists(json, 'golf') ? undefined : json['golf'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'googleCoverPhoto': !exists(json, 'googleCoverPhoto') ? undefined : AtmAllOfGoogleCoverPhotoFromJSON(json['googleCoverPhoto']),
        'googleMyBusinessLabels': !exists(json, 'googleMyBusinessLabels') ? undefined : json['googleMyBusinessLabels'],
        'googlePlaceId': !exists(json, 'googlePlaceId') ? undefined : json['googlePlaceId'],
        'googleProfilePhoto': !exists(json, 'googleProfilePhoto') ? undefined : AtmAllOfGoogleProfilePhotoFromJSON(json['googleProfilePhoto']),
        'googleWebsiteOverride': !exists(json, 'googleWebsiteOverride') ? undefined : json['googleWebsiteOverride'],
        'happyHours': !exists(json, 'happyHours') ? undefined : HotelAllOfHappyHoursFromJSON(json['happyHours']),
        'holidayHoursConversationEnabled': !exists(json, 'holidayHoursConversationEnabled') ? undefined : json['holidayHoursConversationEnabled'],
        'horsebackRiding': !exists(json, 'horsebackRiding') ? undefined : json['horsebackRiding'],
        'hotTub': !exists(json, 'hotTub') ? undefined : json['hotTub'],
        'hours': !exists(json, 'hours') ? undefined : AtmAllOfHoursFromJSON(json['hours']),
        'housekeeping': !exists(json, 'housekeeping') ? undefined : json['housekeeping'],
        'impressum': !exists(json, 'impressum') ? undefined : json['impressum'],
        'indoorPoolCount': !exists(json, 'indoorPoolCount') ? undefined : json['indoorPoolCount'],
        'instagramHandle': !exists(json, 'instagramHandle') ? undefined : json['instagramHandle'],
        'iosAppUrl': !exists(json, 'iosAppUrl') ? undefined : json['iosAppUrl'],
        'isoRegionCode': !exists(json, 'isoRegionCode') ? undefined : json['isoRegionCode'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'kidFriendly': !exists(json, 'kidFriendly') ? undefined : json['kidFriendly'],
        'kidsClub': !exists(json, 'kidsClub') ? undefined : json['kidsClub'],
        'kidsStayFree': !exists(json, 'kidsStayFree') ? undefined : json['kidsStayFree'],
        'kitchenHours': !exists(json, 'kitchenHours') ? undefined : HotelAllOfKitchenHoursFromJSON(json['kitchenHours']),
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'languages': !exists(json, 'languages') ? undefined : json['languages'],
        'laundry': !exists(json, 'laundry') ? undefined : json['laundry'],
        'lazyRiver': !exists(json, 'lazyRiver') ? undefined : json['lazyRiver'],
        'lifeguard': !exists(json, 'lifeguard') ? undefined : json['lifeguard'],
        'localPhone': !exists(json, 'localPhone') ? undefined : json['localPhone'],
        'localShuttle': !exists(json, 'localShuttle') ? undefined : json['localShuttle'],
        'locationType': !exists(json, 'locationType') ? undefined : json['locationType'],
        'logo': !exists(json, 'logo') ? undefined : AtmAllOfLogoFromJSON(json['logo']),
        'mainPhone': !exists(json, 'mainPhone') ? undefined : json['mainPhone'],
        'massage': !exists(json, 'massage') ? undefined : json['massage'],
        'maxAgeOfKidsStayFree': !exists(json, 'maxAgeOfKidsStayFree') ? undefined : json['maxAgeOfKidsStayFree'],
        'maxNumberOfKidsStayFree': !exists(json, 'maxNumberOfKidsStayFree') ? undefined : json['maxNumberOfKidsStayFree'],
        'meetingRoomCount': !exists(json, 'meetingRoomCount') ? undefined : json['meetingRoomCount'],
        'menuUrl': !exists(json, 'menuUrl') ? undefined : HealthcareFacilityAllOfMenuUrlFromJSON(json['menuUrl']),
        'menus': !exists(json, 'menus') ? undefined : HotelAllOfMenusFromJSON(json['menus']),
        'mobilePhone': !exists(json, 'mobilePhone') ? undefined : json['mobilePhone'],
        'mobilityAccessible': !exists(json, 'mobilityAccessible') ? undefined : json['mobilityAccessible'],
        'nightclub': !exists(json, 'nightclub') ? undefined : json['nightclub'],
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'orderUrl': !exists(json, 'orderUrl') ? undefined : HealthcareFacilityAllOfOrderUrlFromJSON(json['orderUrl']),
        'outdoorPoolCount': !exists(json, 'outdoorPoolCount') ? undefined : json['outdoorPoolCount'],
        'parking': !exists(json, 'parking') ? undefined : json['parking'],
        'paymentOptions': !exists(json, 'paymentOptions') ? undefined : json['paymentOptions'],
        'petsAllowed': !exists(json, 'petsAllowed') ? undefined : json['petsAllowed'],
        'photoGallery': !exists(json, 'photoGallery') ? undefined : ((json['photoGallery'] as Array<any>).map(EventAllOfPhotoGalleryFromJSON)),
        'pickupCoordinate': !exists(json, 'pickupCoordinate') ? undefined : AtmAllOfPickupCoordinateFromJSON(json['pickupCoordinate']),
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'privateBeach': !exists(json, 'privateBeach') ? undefined : json['privateBeach'],
        'privateCarService': !exists(json, 'privateCarService') ? undefined : json['privateCarService'],
        'productLists': !exists(json, 'productLists') ? undefined : HealthcareFacilityAllOfProductListsFromJSON(json['productLists']),
        'questionsAndAnswers': !exists(json, 'questionsAndAnswers') ? undefined : json['questionsAndAnswers'],
        'rankTrackingCompetitors': !exists(json, 'rankTrackingCompetitors') ? undefined : (new Set((json['rankTrackingCompetitors'] as Array<any>).map(AtmAllOfRankTrackingCompetitorsFromJSON))),
        'rankTrackingEnabled': !exists(json, 'rankTrackingEnabled') ? undefined : json['rankTrackingEnabled'],
        'rankTrackingFrequency': !exists(json, 'rankTrackingFrequency') ? undefined : json['rankTrackingFrequency'],
        'rankTrackingQueryTemplates': !exists(json, 'rankTrackingQueryTemplates') ? undefined : json['rankTrackingQueryTemplates'],
        'rankTrackingSites': !exists(json, 'rankTrackingSites') ? undefined : json['rankTrackingSites'],
        'reservationUrl': !exists(json, 'reservationUrl') ? undefined : HealthcareFacilityAllOfReservationUrlFromJSON(json['reservationUrl']),
        'restaurantCount': !exists(json, 'restaurantCount') ? undefined : json['restaurantCount'],
        'reviewGenerationUrl': !exists(json, 'reviewGenerationUrl') ? undefined : json['reviewGenerationUrl'],
        'reviewResponseConversationEnabled': !exists(json, 'reviewResponseConversationEnabled') ? undefined : json['reviewResponseConversationEnabled'],
        'roomCount': !exists(json, 'roomCount') ? undefined : json['roomCount'],
        'roomService': !exists(json, 'roomService') ? undefined : json['roomService'],
        'routableCoordinate': !exists(json, 'routableCoordinate') ? undefined : AtmAllOfRoutableCoordinateFromJSON(json['routableCoordinate']),
        'salon': !exists(json, 'salon') ? undefined : json['salon'],
        'sauna': !exists(json, 'sauna') ? undefined : json['sauna'],
        'scuba': !exists(json, 'scuba') ? undefined : json['scuba'],
        'selfParking': !exists(json, 'selfParking') ? undefined : json['selfParking'],
        'serviceArea': !exists(json, 'serviceArea') ? undefined : HealthcareFacilityAllOfServiceAreaFromJSON(json['serviceArea']),
        'serviceAreaPlaces': !exists(json, 'serviceAreaPlaces') ? undefined : (new Set((json['serviceAreaPlaces'] as Array<any>).map(HealthcareFacilityAllOfServiceAreaPlacesFromJSON))),
        'services': !exists(json, 'services') ? undefined : json['services'],
        'smokeFreeProperty': !exists(json, 'smokeFreeProperty') ? undefined : json['smokeFreeProperty'],
        'snorkeling': !exists(json, 'snorkeling') ? undefined : json['snorkeling'],
        'socialHour': !exists(json, 'socialHour') ? undefined : json['socialHour'],
        'spa': !exists(json, 'spa') ? undefined : json['spa'],
        'tableService': !exists(json, 'tableService') ? undefined : json['tableService'],
        'tennis': !exists(json, 'tennis') ? undefined : json['tennis'],
        'thermalPool': !exists(json, 'thermalPool') ? undefined : json['thermalPool'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'tollFreePhone': !exists(json, 'tollFreePhone') ? undefined : json['tollFreePhone'],
        'treadmill': !exists(json, 'treadmill') ? undefined : json['treadmill'],
        'ttyPhone': !exists(json, 'ttyPhone') ? undefined : json['ttyPhone'],
        'turndownService': !exists(json, 'turndownService') ? undefined : json['turndownService'],
        'twitterHandle': !exists(json, 'twitterHandle') ? undefined : json['twitterHandle'],
        'uberLink': !exists(json, 'uberLink') ? undefined : HealthcareFacilityAllOfUberLinkFromJSON(json['uberLink']),
        'uberTripBranding': !exists(json, 'uberTripBranding') ? undefined : HealthcareFacilityAllOfUberTripBrandingFromJSON(json['uberTripBranding']),
        'valetParking': !exists(json, 'valetParking') ? undefined : json['valetParking'],
        'vendingMachine': !exists(json, 'vendingMachine') ? undefined : json['vendingMachine'],
        'videos': !exists(json, 'videos') ? undefined : (new Set((json['videos'] as Array<any>).map(HealthcareFacilityAllOfVideosFromJSON))),
        'wadingPool': !exists(json, 'wadingPool') ? undefined : json['wadingPool'],
        'wakeUpCalls': !exists(json, 'wakeUpCalls') ? undefined : json['wakeUpCalls'],
        'walkableCoordinate': !exists(json, 'walkableCoordinate') ? undefined : AtmAllOfWalkableCoordinateFromJSON(json['walkableCoordinate']),
        'waterPark': !exists(json, 'waterPark') ? undefined : json['waterPark'],
        'waterSkiing': !exists(json, 'waterSkiing') ? undefined : json['waterSkiing'],
        'watercraft': !exists(json, 'watercraft') ? undefined : json['watercraft'],
        'waterslide': !exists(json, 'waterslide') ? undefined : json['waterslide'],
        'wavePool': !exists(json, 'wavePool') ? undefined : json['wavePool'],
        'websiteUrl': !exists(json, 'websiteUrl') ? undefined : AtmAllOfWebsiteUrlFromJSON(json['websiteUrl']),
        'weightMachine': !exists(json, 'weightMachine') ? undefined : json['weightMachine'],
        'wheelchairAccessible': !exists(json, 'wheelchairAccessible') ? undefined : json['wheelchairAccessible'],
        'wifiAvailable': !exists(json, 'wifiAvailable') ? undefined : json['wifiAvailable'],
        'yearEstablished': !exists(json, 'yearEstablished') ? undefined : json['yearEstablished'],
        'yearLastRenovated': !exists(json, 'yearLastRenovated') ? undefined : json['yearLastRenovated'],
    };
}

export function HotelToJSON(value?: Hotel | null): any {
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
        'adultPool': value.adultPool,
        'airportShuttle': value.airportShuttle,
        'airportTransfer': value.airportTransfer,
        'allInclusive': value.allInclusive,
        'alternateNames': value.alternateNames,
        'alternatePhone': value.alternatePhone,
        'alternateWebsites': value.alternateWebsites,
        'androidAppUrl': value.androidAppUrl,
        'associations': value.associations,
        'babysittingOffered': value.babysittingOffered,
        'baggageStorage': value.baggageStorage,
        'bar': value.bar,
        'beachAccess': value.beachAccess,
        'beachFrontProperty': value.beachFrontProperty,
        'bicycles': value.bicycles,
        'bios': HealthcareFacilityAllOfBiosToJSON(value.bios),
        'boutiqueStores': value.boutiqueStores,
        'brands': value.brands,
        'breakfast': value.breakfast,
        'brunchHours': HotelAllOfBrunchHoursToJSON(value.brunchHours),
        'businessCenter': value.businessCenter,
        'calendars': HealthcareFacilityAllOfCalendarsToJSON(value.calendars),
        'carRental': value.carRental,
        'casino': value.casino,
        'categoryIds': value.categoryIds,
        'catsAllowed': value.catsAllowed,
        'checkInTime': value.checkInTime,
        'checkOutTime': value.checkOutTime,
        'classificationRating': value.classificationRating,
        'closed': value.closed,
        'concierge': value.concierge,
        'convenienceStore': value.convenienceStore,
        'currencyExchange': value.currencyExchange,
        'customKeywords': value.customKeywords,
        'description': value.description,
        'displayCoordinate': AtmAllOfDisplayCoordinateToJSON(value.displayCoordinate),
        'doctorOnCall': value.doctorOnCall,
        'dogsAllowed': value.dogsAllowed,
        'dropoffCoordinate': AtmAllOfDropoffCoordinateToJSON(value.dropoffCoordinate),
        'electricChargingStation': value.electricChargingStation,
        'elevator': value.elevator,
        'ellipticalMachine': value.ellipticalMachine,
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
        'fitnessCenter': value.fitnessCenter,
        'floorCount': value.floorCount,
        'freeWeights': value.freeWeights,
        'frequentlyAskedQuestions': value.frequentlyAskedQuestions === undefined ? undefined : (Array.from(value.frequentlyAskedQuestions as Set<any>).map(AtmAllOfFrequentlyAskedQuestionsToJSON)),
        'frontDesk': value.frontDesk,
        'gameRoom': value.gameRoom,
        'geomodifier': value.geomodifier,
        'giftShop': value.giftShop,
        'golf': value.golf,
        'googleAttributes': value.googleAttributes,
        'googleCoverPhoto': AtmAllOfGoogleCoverPhotoToJSON(value.googleCoverPhoto),
        'googleMyBusinessLabels': value.googleMyBusinessLabels,
        'googlePlaceId': value.googlePlaceId,
        'googleProfilePhoto': AtmAllOfGoogleProfilePhotoToJSON(value.googleProfilePhoto),
        'googleWebsiteOverride': value.googleWebsiteOverride,
        'happyHours': HotelAllOfHappyHoursToJSON(value.happyHours),
        'holidayHoursConversationEnabled': value.holidayHoursConversationEnabled,
        'horsebackRiding': value.horsebackRiding,
        'hotTub': value.hotTub,
        'hours': AtmAllOfHoursToJSON(value.hours),
        'housekeeping': value.housekeeping,
        'impressum': value.impressum,
        'indoorPoolCount': value.indoorPoolCount,
        'instagramHandle': value.instagramHandle,
        'iosAppUrl': value.iosAppUrl,
        'isoRegionCode': value.isoRegionCode,
        'keywords': value.keywords,
        'kidFriendly': value.kidFriendly,
        'kidsClub': value.kidsClub,
        'kidsStayFree': value.kidsStayFree,
        'kitchenHours': HotelAllOfKitchenHoursToJSON(value.kitchenHours),
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'languages': value.languages,
        'laundry': value.laundry,
        'lazyRiver': value.lazyRiver,
        'lifeguard': value.lifeguard,
        'localPhone': value.localPhone,
        'localShuttle': value.localShuttle,
        'locationType': value.locationType,
        'logo': AtmAllOfLogoToJSON(value.logo),
        'mainPhone': value.mainPhone,
        'massage': value.massage,
        'maxAgeOfKidsStayFree': value.maxAgeOfKidsStayFree,
        'maxNumberOfKidsStayFree': value.maxNumberOfKidsStayFree,
        'meetingRoomCount': value.meetingRoomCount,
        'menuUrl': HealthcareFacilityAllOfMenuUrlToJSON(value.menuUrl),
        'menus': HotelAllOfMenusToJSON(value.menus),
        'mobilePhone': value.mobilePhone,
        'mobilityAccessible': value.mobilityAccessible,
        'nightclub': value.nightclub,
        'nudgeEnabled': value.nudgeEnabled,
        'orderUrl': HealthcareFacilityAllOfOrderUrlToJSON(value.orderUrl),
        'outdoorPoolCount': value.outdoorPoolCount,
        'parking': value.parking,
        'paymentOptions': value.paymentOptions,
        'petsAllowed': value.petsAllowed,
        'photoGallery': value.photoGallery === undefined ? undefined : ((value.photoGallery as Array<any>).map(EventAllOfPhotoGalleryToJSON)),
        'pickupCoordinate': AtmAllOfPickupCoordinateToJSON(value.pickupCoordinate),
        'primaryConversationContact': value.primaryConversationContact,
        'privateBeach': value.privateBeach,
        'privateCarService': value.privateCarService,
        'productLists': HealthcareFacilityAllOfProductListsToJSON(value.productLists),
        'questionsAndAnswers': value.questionsAndAnswers,
        'rankTrackingCompetitors': value.rankTrackingCompetitors === undefined ? undefined : (Array.from(value.rankTrackingCompetitors as Set<any>).map(AtmAllOfRankTrackingCompetitorsToJSON)),
        'rankTrackingEnabled': value.rankTrackingEnabled,
        'rankTrackingFrequency': value.rankTrackingFrequency,
        'rankTrackingQueryTemplates': value.rankTrackingQueryTemplates,
        'rankTrackingSites': value.rankTrackingSites,
        'reservationUrl': HealthcareFacilityAllOfReservationUrlToJSON(value.reservationUrl),
        'restaurantCount': value.restaurantCount,
        'reviewGenerationUrl': value.reviewGenerationUrl,
        'reviewResponseConversationEnabled': value.reviewResponseConversationEnabled,
        'roomCount': value.roomCount,
        'roomService': value.roomService,
        'routableCoordinate': AtmAllOfRoutableCoordinateToJSON(value.routableCoordinate),
        'salon': value.salon,
        'sauna': value.sauna,
        'scuba': value.scuba,
        'selfParking': value.selfParking,
        'serviceArea': HealthcareFacilityAllOfServiceAreaToJSON(value.serviceArea),
        'serviceAreaPlaces': value.serviceAreaPlaces === undefined ? undefined : (Array.from(value.serviceAreaPlaces as Set<any>).map(HealthcareFacilityAllOfServiceAreaPlacesToJSON)),
        'services': value.services,
        'smokeFreeProperty': value.smokeFreeProperty,
        'snorkeling': value.snorkeling,
        'socialHour': value.socialHour,
        'spa': value.spa,
        'tableService': value.tableService,
        'tennis': value.tennis,
        'thermalPool': value.thermalPool,
        'timezone': value.timezone,
        'tollFreePhone': value.tollFreePhone,
        'treadmill': value.treadmill,
        'ttyPhone': value.ttyPhone,
        'turndownService': value.turndownService,
        'twitterHandle': value.twitterHandle,
        'uberLink': HealthcareFacilityAllOfUberLinkToJSON(value.uberLink),
        'uberTripBranding': HealthcareFacilityAllOfUberTripBrandingToJSON(value.uberTripBranding),
        'valetParking': value.valetParking,
        'vendingMachine': value.vendingMachine,
        'videos': value.videos === undefined ? undefined : (Array.from(value.videos as Set<any>).map(HealthcareFacilityAllOfVideosToJSON)),
        'wadingPool': value.wadingPool,
        'wakeUpCalls': value.wakeUpCalls,
        'walkableCoordinate': AtmAllOfWalkableCoordinateToJSON(value.walkableCoordinate),
        'waterPark': value.waterPark,
        'waterSkiing': value.waterSkiing,
        'watercraft': value.watercraft,
        'waterslide': value.waterslide,
        'wavePool': value.wavePool,
        'websiteUrl': AtmAllOfWebsiteUrlToJSON(value.websiteUrl),
        'weightMachine': value.weightMachine,
        'wheelchairAccessible': value.wheelchairAccessible,
        'wifiAvailable': value.wifiAvailable,
        'yearEstablished': value.yearEstablished,
        'yearLastRenovated': value.yearLastRenovated,
    };
}


