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
    Field,
    FieldFromJSON,
    FieldFromJSONTyped,
    FieldToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface CustomFieldResponse
 */
export interface CustomFieldResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof CustomFieldResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {Field}
     * @memberof CustomFieldResponse
     */
    response?: Field;
}

export function CustomFieldResponseFromJSON(json: any): CustomFieldResponse {
    return CustomFieldResponseFromJSONTyped(json, false);
}

export function CustomFieldResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomFieldResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : FieldFromJSON(json['response']),
    };
}

export function CustomFieldResponseToJSON(value?: CustomFieldResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': FieldToJSON(value.response),
    };
}


