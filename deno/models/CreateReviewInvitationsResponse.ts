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
    ReviewInvitationOptional,
    ReviewInvitationOptionalFromJSON,
    ReviewInvitationOptionalFromJSONTyped,
    ReviewInvitationOptionalToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface CreateReviewInvitationsResponse
 */
export interface CreateReviewInvitationsResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof CreateReviewInvitationsResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {Array<ReviewInvitationOptional>}
     * @memberof CreateReviewInvitationsResponse
     */
    response?: Array<ReviewInvitationOptional>;
}

export function CreateReviewInvitationsResponseFromJSON(json: any): CreateReviewInvitationsResponse {
    return CreateReviewInvitationsResponseFromJSONTyped(json, false);
}

export function CreateReviewInvitationsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReviewInvitationsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : ((json['response'] as Array<any>).map(ReviewInvitationOptionalFromJSON)),
    };
}

export function CreateReviewInvitationsResponseToJSON(value?: CreateReviewInvitationsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': value.response === undefined ? undefined : ((value.response as Array<any>).map(ReviewInvitationOptionalToJSON)),
    };
}


