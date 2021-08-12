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
 * Destination coordinates to use for walking directions to the entity, as calculated by Yext
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
 * @interface InlineResponse200ResponseYextWalkableCoordinate
 */
export interface InlineResponse200ResponseYextWalkableCoordinate {
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseYextWalkableCoordinate
     */
    latitude?: number;
    /**
     * Filtering Type: `float`
     * @type {number}
     * @memberof InlineResponse200ResponseYextWalkableCoordinate
     */
    longitude?: number;
}

export function InlineResponse200ResponseYextWalkableCoordinateFromJSON(json: any): InlineResponse200ResponseYextWalkableCoordinate {
    return InlineResponse200ResponseYextWalkableCoordinateFromJSONTyped(json, false);
}

export function InlineResponse200ResponseYextWalkableCoordinateFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseYextWalkableCoordinate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
    };
}

export function InlineResponse200ResponseYextWalkableCoordinateToJSON(value?: InlineResponse200ResponseYextWalkableCoordinate | null): any {
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


