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
 * Coordinates of where consumers can be picked up at the entity, as calculated by Yext
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
 * @interface InlineResponse200ResponseYextPickupCoordinate
 */
export interface InlineResponse200ResponseYextPickupCoordinate {
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseYextPickupCoordinate
     */
    latitude?: number;
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseYextPickupCoordinate
     */
    longitude?: number;
}

export function InlineResponse200ResponseYextPickupCoordinateFromJSON(json: any): InlineResponse200ResponseYextPickupCoordinate {
    return InlineResponse200ResponseYextPickupCoordinateFromJSONTyped(json, false);
}

export function InlineResponse200ResponseYextPickupCoordinateFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseYextPickupCoordinate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
    };
}

export function InlineResponse200ResponseYextPickupCoordinateToJSON(value?: InlineResponse200ResponseYextPickupCoordinate | null): any {
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

