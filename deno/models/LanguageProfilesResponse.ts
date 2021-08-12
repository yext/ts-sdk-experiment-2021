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
    LanguageProfilesResponseResponse,
    LanguageProfilesResponseResponseFromJSON,
    LanguageProfilesResponseResponseFromJSONTyped,
    LanguageProfilesResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface LanguageProfilesResponse
 */
export interface LanguageProfilesResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof LanguageProfilesResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {LanguageProfilesResponseResponse}
     * @memberof LanguageProfilesResponse
     */
    response?: LanguageProfilesResponseResponse;
}

export function LanguageProfilesResponseFromJSON(json: any): LanguageProfilesResponse {
    return LanguageProfilesResponseFromJSONTyped(json, false);
}

export function LanguageProfilesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LanguageProfilesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : LanguageProfilesResponseResponseFromJSON(json['response']),
    };
}

export function LanguageProfilesResponseToJSON(value?: LanguageProfilesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': LanguageProfilesResponseResponseToJSON(value.response),
    };
}


