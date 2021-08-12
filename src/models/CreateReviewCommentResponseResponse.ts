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
 * @interface CreateReviewCommentResponseResponse
 */
export interface CreateReviewCommentResponseResponse {
    /**
     * If the **`v`** parameter is before `20210616`, **`id`** will be returned as a
     * type string instead of an integer.
     * @type {number}
     * @memberof CreateReviewCommentResponseResponse
     */
    id?: number;
}

export function CreateReviewCommentResponseResponseFromJSON(json: any): CreateReviewCommentResponseResponse {
    return CreateReviewCommentResponseResponseFromJSONTyped(json, false);
}

export function CreateReviewCommentResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReviewCommentResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function CreateReviewCommentResponseResponseToJSON(value?: CreateReviewCommentResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}


