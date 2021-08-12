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
    ProductListsResponseResponse,
    ProductListsResponseResponseFromJSON,
    ProductListsResponseResponseFromJSONTyped,
    ProductListsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface ProductListsResponse
 */
export interface ProductListsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof ProductListsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {ProductListsResponseResponse}
     * @memberof ProductListsResponse
     */
    response?: ProductListsResponseResponse;
}

export function ProductListsResponseFromJSON(json: any): ProductListsResponse {
    return ProductListsResponseFromJSONTyped(json, false);
}

export function ProductListsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductListsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : ProductListsResponseResponseFromJSON(json['response']),
    };
}

export function ProductListsResponseToJSON(value?: ProductListsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': ProductListsResponseResponseToJSON(value.response),
    };
}


