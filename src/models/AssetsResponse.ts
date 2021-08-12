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
    AssetsResponseResponse,
    AssetsResponseResponseFromJSON,
    AssetsResponseResponseFromJSONTyped,
    AssetsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface AssetsResponse
 */
export interface AssetsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof AssetsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {AssetsResponseResponse}
     * @memberof AssetsResponse
     */
    response?: AssetsResponseResponse;
}

export function AssetsResponseFromJSON(json: any): AssetsResponse {
    return AssetsResponseFromJSONTyped(json, false);
}

export function AssetsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssetsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : AssetsResponseResponseFromJSON(json['response']),
    };
}

export function AssetsResponseToJSON(value?: AssetsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': AssetsResponseResponseToJSON(value.response),
    };
}


