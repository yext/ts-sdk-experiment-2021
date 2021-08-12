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
    GoogleFieldsResponseResponse,
    GoogleFieldsResponseResponseFromJSON,
    GoogleFieldsResponseResponseFromJSONTyped,
    GoogleFieldsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface GoogleFieldsResponse
 */
export interface GoogleFieldsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof GoogleFieldsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {GoogleFieldsResponseResponse}
     * @memberof GoogleFieldsResponse
     */
    response?: GoogleFieldsResponseResponse;
}

export function GoogleFieldsResponseFromJSON(json: any): GoogleFieldsResponse {
    return GoogleFieldsResponseFromJSONTyped(json, false);
}

export function GoogleFieldsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleFieldsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : GoogleFieldsResponseResponseFromJSON(json['response']),
    };
}

export function GoogleFieldsResponseToJSON(value?: GoogleFieldsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': GoogleFieldsResponseResponseToJSON(value.response),
    };
}


