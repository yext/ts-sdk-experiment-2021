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
    InlineResponse2002Response,
    InlineResponse2002ResponseFromJSON,
    InlineResponse2002ResponseFromJSONTyped,
    InlineResponse2002ResponseToJSON,
    InlineResponse200Meta,
    InlineResponse200MetaFromJSON,
    InlineResponse200MetaFromJSONTyped,
    InlineResponse200MetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface InlineResponse2002
 */
export interface InlineResponse2002 {
    /**
     * 
     * @type {InlineResponse200Meta}
     * @memberof InlineResponse2002
     */
    meta?: InlineResponse200Meta;
    /**
     * 
     * @type {InlineResponse2002Response}
     * @memberof InlineResponse2002
     */
    response?: InlineResponse2002Response;
}

export function InlineResponse2002FromJSON(json: any): InlineResponse2002 {
    return InlineResponse2002FromJSONTyped(json, false);
}

export function InlineResponse2002FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2002 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : InlineResponse200MetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : InlineResponse2002ResponseFromJSON(json['response']),
    };
}

export function InlineResponse2002ToJSON(value?: InlineResponse2002 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': InlineResponse200MetaToJSON(value.meta),
        'response': InlineResponse2002ResponseToJSON(value.response),
    };
}


