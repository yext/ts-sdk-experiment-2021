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
 * The location where this job opening exists as either an existing location or an external location
 * @export
 * @interface JobWriteAllOfLocation
 */
export interface JobWriteAllOfLocation {
    /**
     * A location entity referenced by Yext ID or Entity ID where this job opening exists
     * @type {string}
     * @memberof JobWriteAllOfLocation
     */
    existingLocation?: string;
    /**
     * A location string where this job opening exists
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * HTML markup
     * @type {string}
     * @memberof JobWriteAllOfLocation
     */
    externalLocation?: string;
}

export function JobWriteAllOfLocationFromJSON(json: any): JobWriteAllOfLocation {
    return JobWriteAllOfLocationFromJSONTyped(json, false);
}

export function JobWriteAllOfLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobWriteAllOfLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'existingLocation': !exists(json, 'existingLocation') ? undefined : json['existingLocation'],
        'externalLocation': !exists(json, 'externalLocation') ? undefined : json['externalLocation'],
    };
}

export function JobWriteAllOfLocationToJSON(value?: JobWriteAllOfLocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'existingLocation': value.existingLocation,
        'externalLocation': value.externalLocation,
    };
}


