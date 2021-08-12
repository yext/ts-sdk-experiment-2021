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
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * job
 * ```
 * @export
 * @interface InlineResponse200ResponseLocation
 */
export interface InlineResponse200ResponseLocation {
    /**
     * A location entity referenced by Yext ID or Entity ID where this job opening exists
     * 
     * Filtering Type: `entityId`
     * @type {string}
     * @memberof InlineResponse200ResponseLocation
     */
    existingLocation?: string;
    /**
     * A location string where this job opening exists
     * 
     * 
     * Cannot Include:
     * * a URL or domain name
     * * HTML markup
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseLocation
     */
    externalLocation?: string;
}

export function InlineResponse200ResponseLocationFromJSON(json: any): InlineResponse200ResponseLocation {
    return InlineResponse200ResponseLocationFromJSONTyped(json, false);
}

export function InlineResponse200ResponseLocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseLocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'existingLocation': !exists(json, 'existingLocation') ? undefined : json['existingLocation'],
        'externalLocation': !exists(json, 'externalLocation') ? undefined : json['externalLocation'],
    };
}

export function InlineResponse200ResponseLocationToJSON(value?: InlineResponse200ResponseLocation | null): any {
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

