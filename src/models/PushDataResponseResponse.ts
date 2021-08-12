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
/**
 * 
 * @export
 * @interface PushDataResponseResponse
 */
export interface PushDataResponseResponse {
    /**
     * A comma-seperated list of IDs of all connectors for which a run attempt was initiated.
     * @type {string}
     * @memberof PushDataResponseResponse
     */
    ids?: string;
}

export function PushDataResponseResponseFromJSON(json: any): PushDataResponseResponse {
    return PushDataResponseResponseFromJSONTyped(json, false);
}

export function PushDataResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PushDataResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ids': !exists(json, 'ids') ? undefined : json['ids'],
    };
}

export function PushDataResponseResponseToJSON(value?: PushDataResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ids': value.ids,
    };
}


