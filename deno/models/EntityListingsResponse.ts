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
    EntityListingsResponseResponse,
    EntityListingsResponseResponseFromJSON,
    EntityListingsResponseResponseFromJSONTyped,
    EntityListingsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface EntityListingsResponse
 */
export interface EntityListingsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof EntityListingsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {EntityListingsResponseResponse}
     * @memberof EntityListingsResponse
     */
    response?: EntityListingsResponseResponse;
}

export function EntityListingsResponseFromJSON(json: any): EntityListingsResponse {
    return EntityListingsResponseFromJSONTyped(json, false);
}

export function EntityListingsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityListingsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : EntityListingsResponseResponseFromJSON(json['response']),
    };
}

export function EntityListingsResponseToJSON(value?: EntityListingsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': EntityListingsResponseResponseToJSON(value.response),
    };
}


