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
    InlineResponse200Meta,
    InlineResponse200MetaFromJSON,
    InlineResponse200MetaFromJSONTyped,
    InlineResponse200MetaToJSON,
    InlineResponse200Response,
    InlineResponse200ResponseFromJSON,
    InlineResponse200ResponseFromJSONTyped,
    InlineResponse200ResponseToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * 
     * @type {InlineResponse200Meta}
     * @memberof InlineResponse200
     */
    meta?: InlineResponse200Meta;
    /**
     * 
     * @type {InlineResponse200Response}
     * @memberof InlineResponse200
     */
    response?: InlineResponse200Response;
}

export function InlineResponse200FromJSON(json: any): InlineResponse200 {
    return InlineResponse200FromJSONTyped(json, false);
}

export function InlineResponse200FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : InlineResponse200MetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : InlineResponse200ResponseFromJSON(json['response']),
    };
}

export function InlineResponse200ToJSON(value?: InlineResponse200 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': InlineResponse200MetaToJSON(value.meta),
        'response': InlineResponse200ResponseToJSON(value.response),
    };
}


