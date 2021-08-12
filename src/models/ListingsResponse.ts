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
    ListingsResponseResponse,
    ListingsResponseResponseFromJSON,
    ListingsResponseResponseFromJSONTyped,
    ListingsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListingsResponse
 */
export interface ListingsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof ListingsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {ListingsResponseResponse}
     * @memberof ListingsResponse
     */
    response?: ListingsResponseResponse;
}

export function ListingsResponseFromJSON(json: any): ListingsResponse {
    return ListingsResponseFromJSONTyped(json, false);
}

export function ListingsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListingsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : ListingsResponseResponseFromJSON(json['response']),
    };
}

export function ListingsResponseToJSON(value?: ListingsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': ListingsResponseResponseToJSON(value.response),
    };
}


