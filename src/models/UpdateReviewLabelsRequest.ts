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
 * @interface UpdateReviewLabelsRequest
 */
export interface UpdateReviewLabelsRequest {
    /**
     * The IDs of the review labels added to the review.
     * @type {Array<number>}
     * @memberof UpdateReviewLabelsRequest
     */
    labelIds?: Array<number>;
}

export function UpdateReviewLabelsRequestFromJSON(json: any): UpdateReviewLabelsRequest {
    return UpdateReviewLabelsRequestFromJSONTyped(json, false);
}

export function UpdateReviewLabelsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateReviewLabelsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'labelIds': !exists(json, 'labelIds') ? undefined : json['labelIds'],
    };
}

export function UpdateReviewLabelsRequestToJSON(value?: UpdateReviewLabelsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'labelIds': value.labelIds,
    };
}


