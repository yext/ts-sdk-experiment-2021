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
    InviteAdminsResponseResponse,
    InviteAdminsResponseResponseFromJSON,
    InviteAdminsResponseResponseFromJSONTyped,
    InviteAdminsResponseResponseToJSON,
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
} from './';

/**
 * 
 * @export
 * @interface InviteAdminsResponse
 */
export interface InviteAdminsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof InviteAdminsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {InviteAdminsResponseResponse}
     * @memberof InviteAdminsResponse
     */
    response?: InviteAdminsResponseResponse;
}

export function InviteAdminsResponseFromJSON(json: any): InviteAdminsResponse {
    return InviteAdminsResponseFromJSONTyped(json, false);
}

export function InviteAdminsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): InviteAdminsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : InviteAdminsResponseResponseFromJSON(json['response']),
    };
}

export function InviteAdminsResponseToJSON(value?: InviteAdminsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': InviteAdminsResponseResponseToJSON(value.response),
    };
}


