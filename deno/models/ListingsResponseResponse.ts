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
    Listing,
    ListingFromJSON,
    ListingFromJSONTyped,
    ListingToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface ListingsResponseResponse
 */
export interface ListingsResponseResponse {
    /**
     * If the **`v`** parameter is before `20170420`: the Listings count, including alternate brands
     * 
     * If the **`v`** parameter is `20170420` or later: the Listings count, excluding alternate brands
     * 
     * Total number of Listings that meet the filter criteria (ignores **`limit`** and **`offset`**)
     * @type {number}
     * @memberof ListingsResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Listing>}
     * @memberof ListingsResponseResponse
     */
    listings?: Array<Listing>;
}

export function ListingsResponseResponseFromJSON(json: any): ListingsResponseResponse {
    return ListingsResponseResponseFromJSONTyped(json, false);
}

export function ListingsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListingsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'listings': !exists(json, 'listings') ? undefined : ((json['listings'] as Array<any>).map(ListingFromJSON)),
    };
}

export function ListingsResponseResponseToJSON(value?: ListingsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'listings': value.listings === undefined ? undefined : ((value.listings as Array<any>).map(ListingToJSON)),
    };
}


