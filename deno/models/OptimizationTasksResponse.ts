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
    OptimizationTasksResponseResponse,
    OptimizationTasksResponseResponseFromJSON,
    OptimizationTasksResponseResponseFromJSONTyped,
    OptimizationTasksResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface OptimizationTasksResponse
 */
export interface OptimizationTasksResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof OptimizationTasksResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {OptimizationTasksResponseResponse}
     * @memberof OptimizationTasksResponse
     */
    response?: OptimizationTasksResponseResponse;
}

export function OptimizationTasksResponseFromJSON(json: any): OptimizationTasksResponse {
    return OptimizationTasksResponseFromJSONTyped(json, false);
}

export function OptimizationTasksResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimizationTasksResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : OptimizationTasksResponseResponseFromJSON(json['response']),
    };
}

export function OptimizationTasksResponseToJSON(value?: OptimizationTasksResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': OptimizationTasksResponseResponseToJSON(value.response),
    };
}


