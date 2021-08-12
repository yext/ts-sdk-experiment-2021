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
 * Information about the URL consumers can visit to make reservations at this entity
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
 * @interface InlineResponse200ResponseReservationUrl
 */
export interface InlineResponse200ResponseReservationUrl {
    /**
     * The URL that is shown on your listings in place of **`reservationUrl.url`**. You can use **`reservationUrl.displayUrl`** to display a short, memorable web address that redirects consumers to the URL given in **`reservationUrl.url`**.
     * 
     * Must be a valid URL and be specified along with **`reservationUrl.url`**.
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseReservationUrl
     */
    displayUrl?: string;
    /**
     * If set to true, only the display URL will be sent to those publishers who do not support separate display and tracking URLs for this field.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseReservationUrl
     */
    preferDisplayUrl?: boolean;
    /**
     * A valid URL used to make reservations at this entity
     * 
     * 
     * Cannot Include:
     * * common domain names, e.g., google.com, youtube.com, etc.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseReservationUrl
     */
    url?: string;
}

export function InlineResponse200ResponseReservationUrlFromJSON(json: any): InlineResponse200ResponseReservationUrl {
    return InlineResponse200ResponseReservationUrlFromJSONTyped(json, false);
}

export function InlineResponse200ResponseReservationUrlFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseReservationUrl {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'displayUrl': !exists(json, 'displayUrl') ? undefined : json['displayUrl'],
        'preferDisplayUrl': !exists(json, 'preferDisplayUrl') ? undefined : json['preferDisplayUrl'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function InlineResponse200ResponseReservationUrlToJSON(value?: InlineResponse200ResponseReservationUrl | null): any {
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

