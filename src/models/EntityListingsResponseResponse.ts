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
import {
    EntityListing,
    EntityListingFromJSON,
    EntityListingFromJSONTyped,
    EntityListingToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntityListingsResponseResponse
 */
export interface EntityListingsResponseResponse {
    /**
     * Total number of Listings that meet the filter criteria (ignores **`limit`** and **`offset`**)
     * @type {number}
     * @memberof EntityListingsResponseResponse
     */
    count?: number;
    /**
     * This field is only included if there is an additional page of data to display. To retrieve the next page of data, pass this field's value as the **`pageToken`** parameter in a subsequent request.
     * @type {string}
     * @memberof EntityListingsResponseResponse
     */
    nextPageToken?: string;
    /**
     * 
     * @type {Array<EntityListing>}
     * @memberof EntityListingsResponseResponse
     */
    listings?: Array<EntityListing>;
}

export function EntityListingsResponseResponseFromJSON(json: any): EntityListingsResponseResponse {
    return EntityListingsResponseResponseFromJSONTyped(json, false);
}

export function EntityListingsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityListingsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'nextPageToken': !exists(json, 'nextPageToken') ? undefined : json['nextPageToken'],
        'listings': !exists(json, 'listings') ? undefined : ((json['listings'] as Array<any>).map(EntityListingFromJSON)),
    };
}

export function EntityListingsResponseResponseToJSON(value?: EntityListingsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'nextPageToken': value.nextPageToken,
        'listings': value.listings === undefined ? undefined : ((value.listings as Array<any>).map(EntityListingToJSON)),
    };
}


