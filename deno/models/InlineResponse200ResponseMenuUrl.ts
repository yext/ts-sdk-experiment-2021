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

import { exists, mapValues } from '../runtime.ts';
/**
 * Information about the URL where consumers can view the entity's menu
 * 
 * Filtering Type: `object`
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
 * @export
 * @interface InlineResponse200ResponseMenuUrl
 */
export interface InlineResponse200ResponseMenuUrl {
    /**
     * The URL that is shown on your listings in place of **`menuUrl.url`**. You can use **`menuUrl.displayUrl`** to display a short, memorable web address that redirects consumers to the URL given in **`menuUrl.url`**.
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseMenuUrl
     */
    displayUrl?: string;
    /**
     * If set to true, only the display URL will be sent to those publishers who do not support separate display and tracking URLs for this field.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseMenuUrl
     */
    preferDisplayUrl?: boolean;
    /**
     * A valid URL where consumers can view the entity's menu
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseMenuUrl
     */
    url?: string;
}

export function InlineResponse200ResponseMenuUrlFromJSON(json: any): InlineResponse200ResponseMenuUrl {
    return InlineResponse200ResponseMenuUrlFromJSONTyped(json, false);
}

export function InlineResponse200ResponseMenuUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseMenuUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'displayUrl': !exists(json, 'displayUrl') ? undefined : json['displayUrl'],
        'preferDisplayUrl': !exists(json, 'preferDisplayUrl') ? undefined : json['preferDisplayUrl'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function InlineResponse200ResponseMenuUrlToJSON(value?: InlineResponse200ResponseMenuUrl | null): any {
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


