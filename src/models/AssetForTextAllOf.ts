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
 * @interface AssetForTextAllOf
 */
export interface AssetForTextAllOf {
    /**
     * The content of the asset.
     * @type {string}
     * @memberof AssetForTextAllOf
     */
    value?: string;
}

export function AssetForTextAllOfFromJSON(json: any): AssetForTextAllOf {
    return AssetForTextAllOfFromJSONTyped(json, false);
}

export function AssetForTextAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssetForTextAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function AssetForTextAllOfToJSON(value?: AssetForTextAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}


