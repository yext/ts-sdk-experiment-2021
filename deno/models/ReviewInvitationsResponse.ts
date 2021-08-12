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
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
    ReviewInvitationsResponseResponse,
    ReviewInvitationsResponseResponseFromJSON,
    ReviewInvitationsResponseResponseFromJSONTyped,
    ReviewInvitationsResponseResponseToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface ReviewInvitationsResponse
 */
export interface ReviewInvitationsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof ReviewInvitationsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {ReviewInvitationsResponseResponse}
     * @memberof ReviewInvitationsResponse
     */
    response?: ReviewInvitationsResponseResponse;
}

export function ReviewInvitationsResponseFromJSON(json: any): ReviewInvitationsResponse {
    return ReviewInvitationsResponseFromJSONTyped(json, false);
}

export function ReviewInvitationsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewInvitationsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : ReviewInvitationsResponseResponseFromJSON(json['response']),
    };
}

export function ReviewInvitationsResponseToJSON(value?: ReviewInvitationsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': ReviewInvitationsResponseResponseToJSON(value.response),
    };
}


