/* tslint:disable */
/* eslint-disable */
/**
 * Yext API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
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
    AtmWriteAllOfAccessHours,
    AtmWriteAllOfAccessHoursFromJSON,
    AtmWriteAllOfAccessHoursFromJSONTyped,
    AtmWriteAllOfAccessHoursToJSON,
    AtmWriteAllOfAddress,
    AtmWriteAllOfAddressFromJSON,
    AtmWriteAllOfAddressFromJSONTyped,
    AtmWriteAllOfAddressToJSON,
    AtmWriteAllOfDisplayCoordinate,
    AtmWriteAllOfDisplayCoordinateFromJSON,
    AtmWriteAllOfDisplayCoordinateFromJSONTyped,
    AtmWriteAllOfDisplayCoordinateToJSON,
    AtmWriteAllOfDriveThroughHours,
    AtmWriteAllOfDriveThroughHoursFromJSON,
    AtmWriteAllOfDriveThroughHoursFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursToJSON,
    AtmWriteAllOfDropoffCoordinate,
    AtmWriteAllOfDropoffCoordinateFromJSON,
    AtmWriteAllOfDropoffCoordinateFromJSONTyped,
    AtmWriteAllOfDropoffCoordinateToJSON,
    AtmWriteAllOfFacebookCallToAction,
    AtmWriteAllOfFacebookCallToActionFromJSON,
    AtmWriteAllOfFacebookCallToActionFromJSONTyped,
    AtmWriteAllOfFacebookCallToActionToJSON,
    AtmWriteAllOfFacebookCoverPhoto,
    AtmWriteAllOfFacebookCoverPhotoFromJSON,
    AtmWriteAllOfFacebookCoverPhotoFromJSONTyped,
    AtmWriteAllOfFacebookCoverPhotoToJSON,
    AtmWriteAllOfFacebookProfilePhoto,
    AtmWriteAllOfFacebookProfilePhotoFromJSON,
    AtmWriteAllOfFacebookProfilePhotoFromJSONTyped,
    AtmWriteAllOfFacebookProfilePhotoToJSON,
    AtmWriteAllOfFeaturedMessage,
    AtmWriteAllOfFeaturedMessageFromJSON,
    AtmWriteAllOfFeaturedMessageFromJSONTyped,
    AtmWriteAllOfFeaturedMessageToJSON,
    AtmWriteAllOfFrequentlyAskedQuestions,
    AtmWriteAllOfFrequentlyAskedQuestionsFromJSON,
    AtmWriteAllOfFrequentlyAskedQuestionsFromJSONTyped,
    AtmWriteAllOfFrequentlyAskedQuestionsToJSON,
    AtmWriteAllOfGoogleCoverPhoto,
    AtmWriteAllOfGoogleCoverPhotoFromJSON,
    AtmWriteAllOfGoogleCoverPhotoFromJSONTyped,
    AtmWriteAllOfGoogleCoverPhotoToJSON,
    AtmWriteAllOfGoogleProfilePhoto,
    AtmWriteAllOfGoogleProfilePhotoFromJSON,
    AtmWriteAllOfGoogleProfilePhotoFromJSONTyped,
    AtmWriteAllOfGoogleProfilePhotoToJSON,
    AtmWriteAllOfHours,
    AtmWriteAllOfHoursFromJSON,
    AtmWriteAllOfHoursFromJSONTyped,
    AtmWriteAllOfHoursToJSON,
    AtmWriteAllOfLogo,
    AtmWriteAllOfLogoFromJSON,
    AtmWriteAllOfLogoFromJSONTyped,
    AtmWriteAllOfLogoToJSON,
    AtmWriteAllOfMeta,
    AtmWriteAllOfMetaFromJSON,
    AtmWriteAllOfMetaFromJSONTyped,
    AtmWriteAllOfMetaToJSON,
    AtmWriteAllOfPickupCoordinate,
    AtmWriteAllOfPickupCoordinateFromJSON,
    AtmWriteAllOfPickupCoordinateFromJSONTyped,
    AtmWriteAllOfPickupCoordinateToJSON,
    AtmWriteAllOfRankTrackingCompetitors,
    AtmWriteAllOfRankTrackingCompetitorsFromJSON,
    AtmWriteAllOfRankTrackingCompetitorsFromJSONTyped,
    AtmWriteAllOfRankTrackingCompetitorsToJSON,
    AtmWriteAllOfRoutableCoordinate,
    AtmWriteAllOfRoutableCoordinateFromJSON,
    AtmWriteAllOfRoutableCoordinateFromJSONTyped,
    AtmWriteAllOfRoutableCoordinateToJSON,
    AtmWriteAllOfWalkableCoordinate,
    AtmWriteAllOfWalkableCoordinateFromJSON,
    AtmWriteAllOfWalkableCoordinateFromJSONTyped,
    AtmWriteAllOfWalkableCoordinateToJSON,
    AtmWriteAllOfWebsiteUrl,
    AtmWriteAllOfWebsiteUrlFromJSON,
    AtmWriteAllOfWebsiteUrlFromJSONTyped,
    AtmWriteAllOfWebsiteUrlToJSON,
} from './';

/**
 * 
 * @export
 * @interface AtmWriteAllOf
 */
export interface AtmWriteAllOf {
    /**
     * 
     * @type {AtmWriteAllOfMeta}
     * @memberof AtmWriteAllOf
     */
    meta?: AtmWriteAllOfMeta;
    /**
     * 
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * * a phone number
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    name?: string;
    /**
     * 
     * @type {AtmWriteAllOfAddress}
     * @memberof AtmWriteAllOf
     */
    address?: AtmWriteAllOfAddress;
    /**
     * 
     * @type {AtmWriteAllOfAccessHours}
     * @memberof AtmWriteAllOf
     */
    accessHours?: AtmWriteAllOfAccessHours;
    /**
     * Additional information about hours that does not fit in **`hours`** (e.g., `"Closed during the winter"`)
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    additionalHoursText?: string;
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
     * @memberof AtmWriteAllOf
     */
    alternateNames?: Set<string>;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
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
     * @memberof AtmWriteAllOf
     */
    alternateWebsites?: Set<string>;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof AtmWriteAllOf
     */
    categoryIds?: Array<string>;
    /**
     * Indicates whether the entity is closed
     * @type {boolean}
     * @memberof AtmWriteAllOf
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
     * @memberof AtmWriteAllOf
     */
    customKeywords?: Set<string>;
    /**
     * A description of the entity
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    description?: string;
    /**
     * 
     * @type {AtmWriteAllOfDisplayCoordinate}
     * @memberof AtmWriteAllOf
     */
    displayCoordinate?: AtmWriteAllOfDisplayCoordinate;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHours}
     * @memberof AtmWriteAllOf
     */
    driveThroughHours?: AtmWriteAllOfDriveThroughHours;
    /**
     * 
     * @type {AtmWriteAllOfDropoffCoordinate}
     * @memberof AtmWriteAllOf
     */
    dropoffCoordinate?: AtmWriteAllOfDropoffCoordinate;
    /**
     * 
     * @type {AtmWriteAllOfFacebookCallToAction}
     * @memberof AtmWriteAllOf
     */
    facebookCallToAction?: AtmWriteAllOfFacebookCallToAction;
    /**
     * 
     * @type {AtmWriteAllOfFacebookCoverPhoto}
     * @memberof AtmWriteAllOf
     */
    facebookCoverPhoto?: AtmWriteAllOfFacebookCoverPhoto;
    /**
     * Location Descriptors are used for Enterprise businesses that sync Facebook listings using brand page location structure. The Location Descriptor is typically an additional geographic description (e.g. geomodifier) that will appear in parentheses after the name on the Facebook listing.
     * 
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    facebookDescriptor?: string;
    /**
     * The name for this entity's Facebook profile.  A separate name may be specified to send only to Facebook in order to comply with any specific Facebook rules or naming conventions.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    facebookName?: string;
    /**
     * The city to be displayed on this entity's Facebook profile
     * @type {string}
     * @memberof AtmWriteAllOf
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
     * @memberof AtmWriteAllOf
     */
    facebookPageUrl?: string;
    /**
     * 
     * @type {AtmWriteAllOfFacebookProfilePhoto}
     * @memberof AtmWriteAllOf
     */
    facebookProfilePhoto?: AtmWriteAllOfFacebookProfilePhoto;
    /**
     * The username that appear's in the Facebook listing URL to help customers find and remember a brand’s Facebook page.  The username is also be used for tagging the Facebook page in other users’ posts, and searching for the Facebook page.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    facebookVanityUrl?: string;
    /**
     * Must be a valid fax number.
     * 
     * If the fax number's calling code is for a country other than the one given in the entity's **`countryCode`**, the fax number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    fax?: string;
    /**
     * 
     * @type {AtmWriteAllOfFeaturedMessage}
     * @memberof AtmWriteAllOf
     */
    featuredMessage?: AtmWriteAllOfFeaturedMessage;
    /**
     * A list of questions that are frequently asked about this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 100 elements.
     * @type {Set<AtmWriteAllOfFrequentlyAskedQuestions>}
     * @memberof AtmWriteAllOf
     */
    frequentlyAskedQuestions?: Set<AtmWriteAllOfFrequentlyAskedQuestions>;
    /**
     * Provides additional information on where the entity can be found (e.g., `Times Square`, `Global Center Mall`)
     * @type {string}
     * @memberof AtmWriteAllOf
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
     * @memberof AtmWriteAllOf
     */
    googleAttributes?: object;
    /**
     * 
     * @type {AtmWriteAllOfGoogleCoverPhoto}
     * @memberof AtmWriteAllOf
     */
    googleCoverPhoto?: AtmWriteAllOfGoogleCoverPhoto;
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
     * @memberof AtmWriteAllOf
     */
    googleMyBusinessLabels?: Set<string>;
    /**
     * The unique identifier of this entity on Google Maps.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    googlePlaceId?: string;
    /**
     * 
     * @type {AtmWriteAllOfGoogleProfilePhoto}
     * @memberof AtmWriteAllOf
     */
    googleProfilePhoto?: AtmWriteAllOfGoogleProfilePhoto;
    /**
     * The URL you would like to submit to Google My Business in place of the one given in **`websiteUrl`** (if applicable).
     * 
     * For example, if you want to analyze the traffic driven by your Google listings separately from other traffic, enter the alternate URL that you will use for tracking in this field.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    googleWebsiteOverride?: string;
    /**
     * Indicates whether holiday-hour confirmation alerts are enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof AtmWriteAllOf
     */
    holidayHoursConversationEnabled?: boolean;
    /**
     * 
     * @type {AtmWriteAllOfHours}
     * @memberof AtmWriteAllOf
     */
    hours?: AtmWriteAllOfHours;
    /**
     * A statement of the ownership and authorship of a document. Individuals or organizations based in many German-speaking countries are required by law to include an Impressum in published media.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    impressum?: string;
    /**
     * The ISO 3166-2 region code for the entity
     * 
     * Yext will determine the entity's code and update **`isoRegionCode`** with that value. If Yext is unable to determine the code for the entity, the entity'ss ISO 3166-1 alpha-2 country code will be used.
     * @type {string}
     * @memberof AtmWriteAllOf
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
     * @memberof AtmWriteAllOf
     */
    keywords?: Set<string>;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<string>}
     * @memberof AtmWriteAllOf
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    landingPageUrl?: string;
    /**
     * Must be a valid, non-toll-free phone number, based on the country specified in **`address.region`**. Phone numbers for US entities must contain 10 digits.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    localPhone?: string;
    /**
     * For atms, the external ID of the entity that the atm is installed in. The entity must be in the same business account as the atm.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    locatedIn?: string;
    /**
     * Indicates the entity's type, if it is not an event
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    locationType?: AtmWriteAllOfLocationTypeEnum;
    /**
     * 
     * @type {AtmWriteAllOfLogo}
     * @memberof AtmWriteAllOf
     */
    logo?: AtmWriteAllOfLogo;
    /**
     * The main phone number of the entity's point of contact
     * 
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    mainPhone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    mobilePhone?: string;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof AtmWriteAllOf
     */
    nudgeEnabled?: boolean;
    /**
     * 
     * @type {AtmWriteAllOfPickupCoordinate}
     * @memberof AtmWriteAllOf
     */
    pickupCoordinate?: AtmWriteAllOfPickupCoordinate;
    /**
     * he typical price of products sold by this location, on a scale of 1 (low) to 4 (high)
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    priceRange?: AtmWriteAllOfPriceRangeEnum;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    primaryConversationContact?: string;
    /**
     * Indicates whether Yext Knowledge Assistant question-and-answer conversations are enabled for this entity
     * @type {boolean}
     * @memberof AtmWriteAllOf
     */
    questionsAndAnswers?: boolean;
    /**
     * Information about the competitors whose search performance you would like to compare to your own
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 5 elements.
     * @type {Set<AtmWriteAllOfRankTrackingCompetitors>}
     * @memberof AtmWriteAllOf
     */
    rankTrackingCompetitors?: Set<AtmWriteAllOfRankTrackingCompetitors>;
    /**
     * Indicates whether Rank Tracking is enabled
     * @type {boolean}
     * @memberof AtmWriteAllOf
     */
    rankTrackingEnabled?: boolean;
    /**
     * How often we send search queries to track your search performance
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    rankTrackingFrequency?: AtmWriteAllOfRankTrackingFrequencyEnum;
    /**
     * The ways in which your keywords will be arranged in the search queries we use to track your performance
     * 
     * 
     * Array must have a minimum of 2 elements.
     * 
     * Array may have a maximum of 4 elements.
     * @type {Set<string>}
     * @memberof AtmWriteAllOf
     */
    rankTrackingQueryTemplates?: Set<AtmWriteAllOfRankTrackingQueryTemplatesEnum>;
    /**
     * The search engines that we will use to track your performance
     * @type {Set<string>}
     * @memberof AtmWriteAllOf
     */
    rankTrackingSites?: Set<AtmWriteAllOfRankTrackingSitesEnum>;
    /**
     * Indicates whether Yext Knowledge Assistant review-response conversations are enabled for this entity
     * @type {boolean}
     * @memberof AtmWriteAllOf
     */
    reviewResponseConversationEnabled?: boolean;
    /**
     * 
     * @type {AtmWriteAllOfRoutableCoordinate}
     * @memberof AtmWriteAllOf
     */
    routableCoordinate?: AtmWriteAllOfRoutableCoordinate;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    timezone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    tollFreePhone?: string;
    /**
     * Must be a valid phone number.
     * 
     * If the phone number's calling code is for a country other than the one given in the entity's **`countryCode`**, the phone number provided must contain the calling code (e.g., `+44` in `+442038083831`). Otherwise, the calling code is optional.
     * @type {string}
     * @memberof AtmWriteAllOf
     */
    ttyPhone?: string;
    /**
     * 
     * @type {AtmWriteAllOfWalkableCoordinate}
     * @memberof AtmWriteAllOf
     */
    walkableCoordinate?: AtmWriteAllOfWalkableCoordinate;
    /**
     * 
     * @type {AtmWriteAllOfWebsiteUrl}
     * @memberof AtmWriteAllOf
     */
    websiteUrl?: AtmWriteAllOfWebsiteUrl;
}

/**
* @export
* @enum {string}
*/
export enum AtmWriteAllOfLocationTypeEnum {
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
export enum AtmWriteAllOfPriceRangeEnum {
    Unspecified = 'UNSPECIFIED',
    One = 'ONE',
    Two = 'TWO',
    Three = 'THREE',
    Four = 'FOUR'
}/**
* @export
* @enum {string}
*/
export enum AtmWriteAllOfRankTrackingFrequencyEnum {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Quarterly = 'QUARTERLY'
}/**
* @export
* @enum {string}
*/
export enum AtmWriteAllOfRankTrackingQueryTemplatesEnum {
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
export enum AtmWriteAllOfRankTrackingSitesEnum {
    GoogleDesktop = 'GOOGLE_DESKTOP',
    GoogleMobile = 'GOOGLE_MOBILE',
    BingDesktop = 'BING_DESKTOP',
    BingMobile = 'BING_MOBILE',
    YahooDesktop = 'YAHOO_DESKTOP',
    YahooMobile = 'YAHOO_MOBILE'
}

export function AtmWriteAllOfFromJSON(json: any): AtmWriteAllOf {
    return AtmWriteAllOfFromJSONTyped(json, false);
}

export function AtmWriteAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : AtmWriteAllOfMetaFromJSON(json['meta']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'address': !exists(json, 'address') ? undefined : AtmWriteAllOfAddressFromJSON(json['address']),
        'accessHours': !exists(json, 'accessHours') ? undefined : AtmWriteAllOfAccessHoursFromJSON(json['accessHours']),
        'additionalHoursText': !exists(json, 'additionalHoursText') ? undefined : json['additionalHoursText'],
        'alternateNames': !exists(json, 'alternateNames') ? undefined : json['alternateNames'],
        'alternatePhone': !exists(json, 'alternatePhone') ? undefined : json['alternatePhone'],
        'alternateWebsites': !exists(json, 'alternateWebsites') ? undefined : json['alternateWebsites'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'closed': !exists(json, 'closed') ? undefined : json['closed'],
        'customKeywords': !exists(json, 'customKeywords') ? undefined : json['customKeywords'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'displayCoordinate': !exists(json, 'displayCoordinate') ? undefined : AtmWriteAllOfDisplayCoordinateFromJSON(json['displayCoordinate']),
        'driveThroughHours': !exists(json, 'driveThroughHours') ? undefined : AtmWriteAllOfDriveThroughHoursFromJSON(json['driveThroughHours']),
        'dropoffCoordinate': !exists(json, 'dropoffCoordinate') ? undefined : AtmWriteAllOfDropoffCoordinateFromJSON(json['dropoffCoordinate']),
        'facebookCallToAction': !exists(json, 'facebookCallToAction') ? undefined : AtmWriteAllOfFacebookCallToActionFromJSON(json['facebookCallToAction']),
        'facebookCoverPhoto': !exists(json, 'facebookCoverPhoto') ? undefined : AtmWriteAllOfFacebookCoverPhotoFromJSON(json['facebookCoverPhoto']),
        'facebookDescriptor': !exists(json, 'facebookDescriptor') ? undefined : json['facebookDescriptor'],
        'facebookName': !exists(json, 'facebookName') ? undefined : json['facebookName'],
        'facebookOverrideCity': !exists(json, 'facebookOverrideCity') ? undefined : json['facebookOverrideCity'],
        'facebookPageUrl': !exists(json, 'facebookPageUrl') ? undefined : json['facebookPageUrl'],
        'facebookProfilePhoto': !exists(json, 'facebookProfilePhoto') ? undefined : AtmWriteAllOfFacebookProfilePhotoFromJSON(json['facebookProfilePhoto']),
        'facebookVanityUrl': !exists(json, 'facebookVanityUrl') ? undefined : json['facebookVanityUrl'],
        'fax': !exists(json, 'fax') ? undefined : json['fax'],
        'featuredMessage': !exists(json, 'featuredMessage') ? undefined : AtmWriteAllOfFeaturedMessageFromJSON(json['featuredMessage']),
        'frequentlyAskedQuestions': !exists(json, 'frequentlyAskedQuestions') ? undefined : (new Set((json['frequentlyAskedQuestions'] as Array<any>).map(AtmWriteAllOfFrequentlyAskedQuestionsFromJSON))),
        'geomodifier': !exists(json, 'geomodifier') ? undefined : json['geomodifier'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'googleCoverPhoto': !exists(json, 'googleCoverPhoto') ? undefined : AtmWriteAllOfGoogleCoverPhotoFromJSON(json['googleCoverPhoto']),
        'googleMyBusinessLabels': !exists(json, 'googleMyBusinessLabels') ? undefined : json['googleMyBusinessLabels'],
        'googlePlaceId': !exists(json, 'googlePlaceId') ? undefined : json['googlePlaceId'],
        'googleProfilePhoto': !exists(json, 'googleProfilePhoto') ? undefined : AtmWriteAllOfGoogleProfilePhotoFromJSON(json['googleProfilePhoto']),
        'googleWebsiteOverride': !exists(json, 'googleWebsiteOverride') ? undefined : json['googleWebsiteOverride'],
        'holidayHoursConversationEnabled': !exists(json, 'holidayHoursConversationEnabled') ? undefined : json['holidayHoursConversationEnabled'],
        'hours': !exists(json, 'hours') ? undefined : AtmWriteAllOfHoursFromJSON(json['hours']),
        'impressum': !exists(json, 'impressum') ? undefined : json['impressum'],
        'isoRegionCode': !exists(json, 'isoRegionCode') ? undefined : json['isoRegionCode'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'localPhone': !exists(json, 'localPhone') ? undefined : json['localPhone'],
        'locatedIn': !exists(json, 'locatedIn') ? undefined : json['locatedIn'],
        'locationType': !exists(json, 'locationType') ? undefined : json['locationType'],
        'logo': !exists(json, 'logo') ? undefined : AtmWriteAllOfLogoFromJSON(json['logo']),
        'mainPhone': !exists(json, 'mainPhone') ? undefined : json['mainPhone'],
        'mobilePhone': !exists(json, 'mobilePhone') ? undefined : json['mobilePhone'],
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'pickupCoordinate': !exists(json, 'pickupCoordinate') ? undefined : AtmWriteAllOfPickupCoordinateFromJSON(json['pickupCoordinate']),
        'priceRange': !exists(json, 'priceRange') ? undefined : json['priceRange'],
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'questionsAndAnswers': !exists(json, 'questionsAndAnswers') ? undefined : json['questionsAndAnswers'],
        'rankTrackingCompetitors': !exists(json, 'rankTrackingCompetitors') ? undefined : (new Set((json['rankTrackingCompetitors'] as Array<any>).map(AtmWriteAllOfRankTrackingCompetitorsFromJSON))),
        'rankTrackingEnabled': !exists(json, 'rankTrackingEnabled') ? undefined : json['rankTrackingEnabled'],
        'rankTrackingFrequency': !exists(json, 'rankTrackingFrequency') ? undefined : json['rankTrackingFrequency'],
        'rankTrackingQueryTemplates': !exists(json, 'rankTrackingQueryTemplates') ? undefined : json['rankTrackingQueryTemplates'],
        'rankTrackingSites': !exists(json, 'rankTrackingSites') ? undefined : json['rankTrackingSites'],
        'reviewResponseConversationEnabled': !exists(json, 'reviewResponseConversationEnabled') ? undefined : json['reviewResponseConversationEnabled'],
        'routableCoordinate': !exists(json, 'routableCoordinate') ? undefined : AtmWriteAllOfRoutableCoordinateFromJSON(json['routableCoordinate']),
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
        'tollFreePhone': !exists(json, 'tollFreePhone') ? undefined : json['tollFreePhone'],
        'ttyPhone': !exists(json, 'ttyPhone') ? undefined : json['ttyPhone'],
        'walkableCoordinate': !exists(json, 'walkableCoordinate') ? undefined : AtmWriteAllOfWalkableCoordinateFromJSON(json['walkableCoordinate']),
        'websiteUrl': !exists(json, 'websiteUrl') ? undefined : AtmWriteAllOfWebsiteUrlFromJSON(json['websiteUrl']),
    };
}

export function AtmWriteAllOfToJSON(value?: AtmWriteAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': AtmWriteAllOfMetaToJSON(value.meta),
        'name': value.name,
        'address': AtmWriteAllOfAddressToJSON(value.address),
        'accessHours': AtmWriteAllOfAccessHoursToJSON(value.accessHours),
        'additionalHoursText': value.additionalHoursText,
        'alternateNames': value.alternateNames,
        'alternatePhone': value.alternatePhone,
        'alternateWebsites': value.alternateWebsites,
        'categoryIds': value.categoryIds,
        'closed': value.closed,
        'customKeywords': value.customKeywords,
        'description': value.description,
        'displayCoordinate': AtmWriteAllOfDisplayCoordinateToJSON(value.displayCoordinate),
        'driveThroughHours': AtmWriteAllOfDriveThroughHoursToJSON(value.driveThroughHours),
        'dropoffCoordinate': AtmWriteAllOfDropoffCoordinateToJSON(value.dropoffCoordinate),
        'facebookCallToAction': AtmWriteAllOfFacebookCallToActionToJSON(value.facebookCallToAction),
        'facebookCoverPhoto': AtmWriteAllOfFacebookCoverPhotoToJSON(value.facebookCoverPhoto),
        'facebookDescriptor': value.facebookDescriptor,
        'facebookName': value.facebookName,
        'facebookOverrideCity': value.facebookOverrideCity,
        'facebookPageUrl': value.facebookPageUrl,
        'facebookProfilePhoto': AtmWriteAllOfFacebookProfilePhotoToJSON(value.facebookProfilePhoto),
        'facebookVanityUrl': value.facebookVanityUrl,
        'fax': value.fax,
        'featuredMessage': AtmWriteAllOfFeaturedMessageToJSON(value.featuredMessage),
        'frequentlyAskedQuestions': value.frequentlyAskedQuestions === undefined ? undefined : (Array.from(value.frequentlyAskedQuestions as Set<any>).map(AtmWriteAllOfFrequentlyAskedQuestionsToJSON)),
        'geomodifier': value.geomodifier,
        'googleAttributes': value.googleAttributes,
        'googleCoverPhoto': AtmWriteAllOfGoogleCoverPhotoToJSON(value.googleCoverPhoto),
        'googleMyBusinessLabels': value.googleMyBusinessLabels,
        'googlePlaceId': value.googlePlaceId,
        'googleProfilePhoto': AtmWriteAllOfGoogleProfilePhotoToJSON(value.googleProfilePhoto),
        'googleWebsiteOverride': value.googleWebsiteOverride,
        'holidayHoursConversationEnabled': value.holidayHoursConversationEnabled,
        'hours': AtmWriteAllOfHoursToJSON(value.hours),
        'impressum': value.impressum,
        'isoRegionCode': value.isoRegionCode,
        'keywords': value.keywords,
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'localPhone': value.localPhone,
        'locatedIn': value.locatedIn,
        'locationType': value.locationType,
        'logo': AtmWriteAllOfLogoToJSON(value.logo),
        'mainPhone': value.mainPhone,
        'mobilePhone': value.mobilePhone,
        'nudgeEnabled': value.nudgeEnabled,
        'pickupCoordinate': AtmWriteAllOfPickupCoordinateToJSON(value.pickupCoordinate),
        'priceRange': value.priceRange,
        'primaryConversationContact': value.primaryConversationContact,
        'questionsAndAnswers': value.questionsAndAnswers,
        'rankTrackingCompetitors': value.rankTrackingCompetitors === undefined ? undefined : (Array.from(value.rankTrackingCompetitors as Set<any>).map(AtmWriteAllOfRankTrackingCompetitorsToJSON)),
        'rankTrackingEnabled': value.rankTrackingEnabled,
        'rankTrackingFrequency': value.rankTrackingFrequency,
        'rankTrackingQueryTemplates': value.rankTrackingQueryTemplates,
        'rankTrackingSites': value.rankTrackingSites,
        'reviewResponseConversationEnabled': value.reviewResponseConversationEnabled,
        'routableCoordinate': AtmWriteAllOfRoutableCoordinateToJSON(value.routableCoordinate),
        'timezone': value.timezone,
        'tollFreePhone': value.tollFreePhone,
        'ttyPhone': value.ttyPhone,
        'walkableCoordinate': AtmWriteAllOfWalkableCoordinateToJSON(value.walkableCoordinate),
        'websiteUrl': AtmWriteAllOfWebsiteUrlToJSON(value.websiteUrl),
    };
}


