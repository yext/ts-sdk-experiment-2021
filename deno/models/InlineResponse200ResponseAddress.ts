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
 * Contains the address of the entity (or where the entity is located)
 * 
 * Must be a valid address
 * Cannot be a P.O. Box
 * 
 * If the entity is an `event`, either an **`address`** value or a **`linkedLocation`** value can be provided.
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * atm
 *    * event
 *    * financialProfessional
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseAddress
 */
export interface InlineResponse200ResponseAddress {
    /**
     * The city the entity (or the entity's location) is in
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * a digit
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    city?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    countryCode?: string;
    /**
     * Provides additional information to help consumers get to the entity. This string appears along with the entity's address (e.g., `In Menlo Mall, 3rd Floor`).
     * It may also be used in conjunction with a hidden address (i.e., when **`addressHidden`** is `true`) to give consumers information about where the entity can be found (e.g., `Servicing the New York area`).
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    extraDescription?: string;
    /**
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    line1?: string;
    /**
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    line2?: string;
    /**
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    line3?: string;
    /**
     * The entity's postal code. The postal code must be valid for the entity's country. Cannot include a URL or domain name.
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    postalCode?: string;
    /**
     * The name of the entity's region or state.
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    region?: string;
    /**
     * The name of the entity's sublocality
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAddress
     */
    sublocality?: string;
}

export function InlineResponse200ResponseAddressFromJSON(json: any): InlineResponse200ResponseAddress {
    return InlineResponse200ResponseAddressFromJSONTyped(json, false);
}

export function InlineResponse200ResponseAddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseAddress {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'city': !exists(json, 'city') ? undefined : json['city'],
        'countryCode': !exists(json, 'countryCode') ? undefined : json['countryCode'],
        'extraDescription': !exists(json, 'extraDescription') ? undefined : json['extraDescription'],
        'line1': !exists(json, 'line1') ? undefined : json['line1'],
        'line2': !exists(json, 'line2') ? undefined : json['line2'],
        'line3': !exists(json, 'line3') ? undefined : json['line3'],
        'postalCode': !exists(json, 'postalCode') ? undefined : json['postalCode'],
        'region': !exists(json, 'region') ? undefined : json['region'],
        'sublocality': !exists(json, 'sublocality') ? undefined : json['sublocality'],
    };
}

export function InlineResponse200ResponseAddressToJSON(value?: InlineResponse200ResponseAddress | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'city': value.city,
        'countryCode': value.countryCode,
        'extraDescription': value.extraDescription,
        'line1': value.line1,
        'line2': value.line2,
        'line3': value.line3,
        'postalCode': value.postalCode,
        'region': value.region,
        'sublocality': value.sublocality,
    };
}


