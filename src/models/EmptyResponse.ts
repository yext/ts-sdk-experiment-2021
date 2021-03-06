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
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface EmptyResponse
 */
export interface EmptyResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof EmptyResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {object}
     * @memberof EmptyResponse
     */
    response?: object;
}

export function EmptyResponseFromJSON(json: any): EmptyResponse {
    return EmptyResponseFromJSONTyped(json, false);
}

export function EmptyResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmptyResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : json['response'],
    };
}

export function EmptyResponseToJSON(value?: EmptyResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': value.response,
    };
}


