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
    InlineResponse2003Response,
    InlineResponse2003ResponseFromJSON,
    InlineResponse2003ResponseFromJSONTyped,
    InlineResponse2003ResponseToJSON,
    InlineResponse200Meta,
    InlineResponse200MetaFromJSON,
    InlineResponse200MetaFromJSONTyped,
    InlineResponse200MetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
    /**
     * 
     * @type {InlineResponse200Meta}
     * @memberof InlineResponse2003
     */
    meta?: InlineResponse200Meta;
    /**
     * 
     * @type {InlineResponse2003Response}
     * @memberof InlineResponse2003
     */
    response?: InlineResponse2003Response;
}

export function InlineResponse2003FromJSON(json: any): InlineResponse2003 {
    return InlineResponse2003FromJSONTyped(json, false);
}

export function InlineResponse2003FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2003 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : InlineResponse200MetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : InlineResponse2003ResponseFromJSON(json['response']),
    };
}

export function InlineResponse2003ToJSON(value?: InlineResponse2003 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': InlineResponse200MetaToJSON(value.meta),
        'response': InlineResponse2003ResponseToJSON(value.response),
    };
}


