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
 * Destination coordinates to use for walking directions to the entity, as provided by you
 * @export
 * @interface AtmWriteAllOfWalkableCoordinate
 */
export interface AtmWriteAllOfWalkableCoordinate {
    /**
     * 
     * @type {number}
     * @memberof AtmWriteAllOfWalkableCoordinate
     */
    latitude?: number;
    /**
     * 
     * @type {number}
     * @memberof AtmWriteAllOfWalkableCoordinate
     */
    longitude?: number;
}

export function AtmWriteAllOfWalkableCoordinateFromJSON(json: any): AtmWriteAllOfWalkableCoordinate {
    return AtmWriteAllOfWalkableCoordinateFromJSONTyped(json, false);
}

export function AtmWriteAllOfWalkableCoordinateFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfWalkableCoordinate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
    };
}

export function AtmWriteAllOfWalkableCoordinateToJSON(value?: AtmWriteAllOfWalkableCoordinate | null): any {
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


