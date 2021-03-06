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
    AtmWriteAllOfLogo,
    AtmWriteAllOfLogoFromJSON,
    AtmWriteAllOfLogoFromJSONTyped,
    AtmWriteAllOfLogoToJSON,
    AtmWriteAllOfMeta,
    AtmWriteAllOfMetaFromJSON,
    AtmWriteAllOfMetaFromJSONTyped,
    AtmWriteAllOfMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface FaqWriteAllOf
 */
export interface FaqWriteAllOf {
    /**
     * 
     * @type {AtmWriteAllOfMeta}
     * @memberof FaqWriteAllOf
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
     * @memberof FaqWriteAllOf
     */
    name?: string;
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
     * @type {string}
     * @memberof FaqWriteAllOf
     */
    answer?: string;
    /**
     * Yext Category IDs.
     * 
     * IDs must be valid and selectable (i.e., cannot be parent categories).
     * 
     * NOTE: The list of category IDs that you send us must be comprehensive. For example, if you send us a list of IDs that does not include IDs that you sent in your last update, Yext considers the missing categories to be deleted, and we remove them from your listings.
     * @type {Array<string>}
     * @memberof FaqWriteAllOf
     */
    categoryIds?: Array<string>;
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
     * @memberof FaqWriteAllOf
     */
    googleAttributes?: object;
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
     * @memberof FaqWriteAllOf
     */
    keywords?: Set<string>;
    /**
     * The IDs of the entity labels that have been added to this entity. Entity labels help you identify entities that share a certain characteristic; they do not appear on your entity's listings.
     * 
     * **NOTE:** You can only add labels that have already been created via our web interface. Currently, it is not possible to create new labels via the API.
     * @type {Array<string>}
     * @memberof FaqWriteAllOf
     */
    labels?: Array<string>;
    /**
     * The URL of this entity's Landing Page that was created with Yext Pages
     * @type {string}
     * @memberof FaqWriteAllOf
     */
    landingPageUrl?: string;
    /**
     * 
     * @type {AtmWriteAllOfLogo}
     * @memberof FaqWriteAllOf
     */
    logo?: AtmWriteAllOfLogo;
    /**
     * Indicates whether Knowledge Nudge is enabled for the Yext Knowledge Assistant for this entity
     * @type {boolean}
     * @memberof FaqWriteAllOf
     */
    nudgeEnabled?: boolean;
    /**
     * ID of the user who is the primary Knowledge Assistant contact for the entity
     * @type {string}
     * @memberof FaqWriteAllOf
     */
    primaryConversationContact?: string;
    /**
     * The timezone of the entity, in the standard `IANA time zone database` format (tz database). e.g. `"America/New_York"`
     * @type {string}
     * @memberof FaqWriteAllOf
     */
    timezone?: string;
}

export function FaqWriteAllOfFromJSON(json: any): FaqWriteAllOf {
    return FaqWriteAllOfFromJSONTyped(json, false);
}

export function FaqWriteAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): FaqWriteAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : AtmWriteAllOfMetaFromJSON(json['meta']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'answer': !exists(json, 'answer') ? undefined : json['answer'],
        'categoryIds': !exists(json, 'categoryIds') ? undefined : json['categoryIds'],
        'googleAttributes': !exists(json, 'googleAttributes') ? undefined : json['googleAttributes'],
        'keywords': !exists(json, 'keywords') ? undefined : json['keywords'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'landingPageUrl': !exists(json, 'landingPageUrl') ? undefined : json['landingPageUrl'],
        'logo': !exists(json, 'logo') ? undefined : AtmWriteAllOfLogoFromJSON(json['logo']),
        'nudgeEnabled': !exists(json, 'nudgeEnabled') ? undefined : json['nudgeEnabled'],
        'primaryConversationContact': !exists(json, 'primaryConversationContact') ? undefined : json['primaryConversationContact'],
        'timezone': !exists(json, 'timezone') ? undefined : json['timezone'],
    };
}

export function FaqWriteAllOfToJSON(value?: FaqWriteAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': AtmWriteAllOfMetaToJSON(value.meta),
        'name': value.name,
        'answer': value.answer,
        'categoryIds': value.categoryIds,
        'googleAttributes': value.googleAttributes,
        'keywords': value.keywords,
        'labels': value.labels,
        'landingPageUrl': value.landingPageUrl,
        'logo': AtmWriteAllOfLogoToJSON(value.logo),
        'nudgeEnabled': value.nudgeEnabled,
        'primaryConversationContact': value.primaryConversationContact,
        'timezone': value.timezone,
    };
}


