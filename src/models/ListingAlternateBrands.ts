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
 * 
 * @export
 * @interface ListingAlternateBrands
 */
export interface ListingAlternateBrands {
    /**
     * Alternate brand name
     * @type {string}
     * @memberof ListingAlternateBrands
     */
    brandName?: string;
    /**
     * The listing's URL on the alternate brand's site
     * @type {string}
     * @memberof ListingAlternateBrands
     */
    listingUrl?: string;
}

export function ListingAlternateBrandsFromJSON(json: any): ListingAlternateBrands {
    return ListingAlternateBrandsFromJSONTyped(json, false);
}

export function ListingAlternateBrandsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListingAlternateBrands {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'brandName': !exists(json, 'brandName') ? undefined : json['brandName'],
        'listingUrl': !exists(json, 'listingUrl') ? undefined : json['listingUrl'],
    };
}

export function ListingAlternateBrandsToJSON(value?: ListingAlternateBrands | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'brandName': value.brandName,
        'listingUrl': value.listingUrl,
    };
}


