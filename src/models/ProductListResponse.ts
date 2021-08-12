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
    Product,
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProductListResponse
 */
export interface ProductListResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof ProductListResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {Product}
     * @memberof ProductListResponse
     */
    response?: Product;
}

export function ProductListResponseFromJSON(json: any): ProductListResponse {
    return ProductListResponseFromJSONTyped(json, false);
}

export function ProductListResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductListResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : ProductFromJSON(json['response']),
    };
}

export function ProductListResponseToJSON(value?: ProductListResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': ProductToJSON(value.response),
    };
}


