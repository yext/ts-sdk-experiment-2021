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
 * Coordinates of where consumers can be picked up at the entity, as provided by you
 * @export
 * @interface AtmWriteAllOfPickupCoordinate
 */
export interface AtmWriteAllOfPickupCoordinate {
    /**
     * 
     * @type {number}
     * @memberof AtmWriteAllOfPickupCoordinate
     */
    latitude?: number;
    /**
     * 
     * @type {number}
     * @memberof AtmWriteAllOfPickupCoordinate
     */
    longitude?: number;
}

export function AtmWriteAllOfPickupCoordinateFromJSON(json: any): AtmWriteAllOfPickupCoordinate {
    return AtmWriteAllOfPickupCoordinateFromJSONTyped(json, false);
}

export function AtmWriteAllOfPickupCoordinateFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfPickupCoordinate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latitude': !exists(json, 'latitude') ? undefined : json['latitude'],
        'longitude': !exists(json, 'longitude') ? undefined : json['longitude'],
    };
}

export function AtmWriteAllOfPickupCoordinateToJSON(value?: AtmWriteAllOfPickupCoordinate | null): any {
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


