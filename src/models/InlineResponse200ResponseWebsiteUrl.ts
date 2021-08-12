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
/**
 * Information about the website for this entity
 * 
 * Filtering Type: `object`
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
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseWebsiteUrl
 */
export interface InlineResponse200ResponseWebsiteUrl {
    /**
     * The URL that is shown on your listings in place of **`websiteUrl.url`**. You can use **`websiteUrl.displayUrl`** to display a short, memorable web address that redirects consumers to the URL given in **`websiteUrl.url`**.
     * 
     * Must be a valid URL and be specified along with **`websiteUrl.url`**.
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseWebsiteUrl
     */
    displayUrl?: string;
    /**
     * If set to true, only the display URL will be sent to those publishers who do not support separate display and tracking URLs for this field.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseWebsiteUrl
     */
    preferDisplayUrl?: boolean;
    /**
     * A valid URL for this entity's website
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseWebsiteUrl
     */
    url?: string;
}

export function InlineResponse200ResponseWebsiteUrlFromJSON(json: any): InlineResponse200ResponseWebsiteUrl {
    return InlineResponse200ResponseWebsiteUrlFromJSONTyped(json, false);
}

export function InlineResponse200ResponseWebsiteUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseWebsiteUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'displayUrl': !exists(json, 'displayUrl') ? undefined : json['displayUrl'],
        'preferDisplayUrl': !exists(json, 'preferDisplayUrl') ? undefined : json['preferDisplayUrl'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function InlineResponse200ResponseWebsiteUrlToJSON(value?: InlineResponse200ResponseWebsiteUrl | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'displayUrl': value.displayUrl,
        'preferDisplayUrl': value.preferDisplayUrl,
        'url': value.url,
    };
}


