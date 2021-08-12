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
 * @interface CreateReviewInvitationRequestAllOf
 */
export interface CreateReviewInvitationRequestAllOf {
    /**
     * The names of the Review Labels which will be attached to the resulting review.
     * 
     * This is an upsert operation, meaning the system will determine if a Review Label exists
     * already in your account, and create and append a new label if not.
     * 
     * The **`reviewLabelNames`** parameter will only be respected with the inclusion of a
     * **`v`** parameter of `20210728` or later.
     * @type {Array<string>}
     * @memberof CreateReviewInvitationRequestAllOf
     */
    reviewLabelNames?: Array<string>;
}

export function CreateReviewInvitationRequestAllOfFromJSON(json: any): CreateReviewInvitationRequestAllOf {
    return CreateReviewInvitationRequestAllOfFromJSONTyped(json, false);
}

export function CreateReviewInvitationRequestAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReviewInvitationRequestAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'reviewLabelNames': !exists(json, 'reviewLabelNames') ? undefined : json['reviewLabelNames'],
    };
}

export function CreateReviewInvitationRequestAllOfToJSON(value?: CreateReviewInvitationRequestAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'reviewLabelNames': value.reviewLabelNames,
    };
}


