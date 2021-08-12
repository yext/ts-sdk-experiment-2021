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
import {
    Location,
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface LocationsSearchResponseResponse
 */
export interface LocationsSearchResponseResponse {
    /**
     * Total number of Locations that meet filter criteria (ignores limit / offset).
     * @type {number}
     * @memberof LocationsSearchResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Location>}
     * @memberof LocationsSearchResponseResponse
     */
    locations?: Array<Location>;
}

export function LocationsSearchResponseResponseFromJSON(json: any): LocationsSearchResponseResponse {
    return LocationsSearchResponseResponseFromJSONTyped(json, false);
}

export function LocationsSearchResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationsSearchResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'locations': !exists(json, 'locations') ? undefined : ((json['locations'] as Array<any>).map(LocationFromJSON)),
    };
}

export function LocationsSearchResponseResponseToJSON(value?: LocationsSearchResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'locations': value.locations === undefined ? undefined : ((value.locations as Array<any>).map(LocationToJSON)),
    };
}


