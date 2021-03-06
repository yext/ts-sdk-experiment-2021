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
    CreateReportsResponseResponse,
    CreateReportsResponseResponseFromJSON,
    CreateReportsResponseResponseFromJSONTyped,
    CreateReportsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface CreateReportsResponse
 */
export interface CreateReportsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof CreateReportsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {CreateReportsResponseResponse}
     * @memberof CreateReportsResponse
     */
    response?: CreateReportsResponseResponse;
}

export function CreateReportsResponseFromJSON(json: any): CreateReportsResponse {
    return CreateReportsResponseFromJSONTyped(json, false);
}

export function CreateReportsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReportsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : CreateReportsResponseResponseFromJSON(json['response']),
    };
}

export function CreateReportsResponseToJSON(value?: CreateReportsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': CreateReportsResponseResponseToJSON(value.response),
    };
}


