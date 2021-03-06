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
    Asset,
    AssetFromJSON,
    AssetFromJSONTyped,
    AssetToJSON,
    AssetForComplexImageAllOf,
    AssetForComplexImageAllOfFromJSON,
    AssetForComplexImageAllOfFromJSONTyped,
    AssetForComplexImageAllOfToJSON,
    AssetForEntities,
    AssetForEntitiesFromJSON,
    AssetForEntitiesFromJSONTyped,
    AssetForEntitiesToJSON,
    AssetUsage,
    AssetUsageFromJSON,
    AssetUsageFromJSONTyped,
    AssetUsageToJSON,
    ComplexImageValue,
    ComplexImageValueFromJSON,
    ComplexImageValueFromJSONTyped,
    ComplexImageValueToJSON,
} from './';

/**
 * 
 * @export
 * @interface AssetForComplexImage
 */
export interface AssetForComplexImage extends Asset {
    /**
     * 
     * @type {ComplexImageValue}
     * @memberof AssetForComplexImage
     */
    value?: ComplexImageValue;
}

export function AssetForComplexImageFromJSON(json: any): AssetForComplexImage {
    return AssetForComplexImageFromJSONTyped(json, false);
}

export function AssetForComplexImageFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssetForComplexImage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...AssetFromJSONTyped(json, ignoreDiscriminator),
        'value': !exists(json, 'value') ? undefined : ComplexImageValueFromJSON(json['value']),
    };
}

export function AssetForComplexImageToJSON(value?: AssetForComplexImage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...AssetToJSON(value),
        'value': ComplexImageValueToJSON(value.value),
    };
}


