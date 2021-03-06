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
    LocationsResponseResponse,
    LocationsResponseResponseFromJSON,
    LocationsResponseResponseFromJSONTyped,
    LocationsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface LocationsResponse
 */
export interface LocationsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof LocationsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {LocationsResponseResponse}
     * @memberof LocationsResponse
     */
    response?: LocationsResponseResponse;
}

export function LocationsResponseFromJSON(json: any): LocationsResponse {
    return LocationsResponseFromJSONTyped(json, false);
}

export function LocationsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : LocationsResponseResponseFromJSON(json['response']),
    };
}

export function LocationsResponseToJSON(value?: LocationsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': LocationsResponseResponseToJSON(value.response),
    };
}


