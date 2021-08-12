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
 * Coordinates of the drop-off area for the entity, as provided by you
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
 * @interface InlineResponse200ResponseDropoffCoordinate
 */
export interface InlineResponse200ResponseDropoffCoordinate {
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseDropoffCoordinate
     */
    latitude?: number;
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseDropoffCoordinate
     */
    longitude?: number;
}

export function InlineResponse200ResponseDropoffCoordinateFromJSON(json: any): InlineResponse200ResponseDropoffCoordinate {
    return InlineResponse200ResponseDropoffCoordinateFromJSONTyped(json, false);
}

export function InlineResponse200ResponseDropoffCoordinateFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseDropoffCoordinate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
    };
}

export function InlineResponse200ResponseDropoffCoordinateToJSON(value?: InlineResponse200ResponseDropoffCoordinate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latitude': value.latitude,
        'longitude': value.longitude,
    };
}


