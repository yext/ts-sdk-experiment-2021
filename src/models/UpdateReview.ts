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
 * @interface UpdateReview
 */
export interface UpdateReview {
    /**
     * Normalized rating out of 5. Can only be specified for External First Party Reviews.
     * @type {number}
     * @memberof UpdateReview
     */
    rating?: number;
    /**
     * Content of the review. Can only be specified for External First Party Reviews.
     * @type {string}
     * @memberof UpdateReview
     */
    content?: string;
    /**
     * The name of the person who wrote the review. Can only be specified for External First Party
     * Reviews.
     * @type {string}
     * @memberof UpdateReview
     */
    authorName?: string;
    /**
     * The email address of the person who wrote the review. Can only be specified for External
     * First Party Reviews.
     * @type {string}
     * @memberof UpdateReview
     */
    authorEmail?: string;
    /**
     * The current status of the review.
     * @type {string}
     * @memberof UpdateReview
     */
    status?: UpdateReviewStatusEnum;
    /**
     * Indicates whether the review has been flagged for inappropriate or irrelevant
     * content.
     * @type {string}
     * @memberof UpdateReview
     */
    flagStatus?: UpdateReviewFlagStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum UpdateReviewStatusEnum {
    Live = 'LIVE',
    Quarantined = 'QUARANTINED',
    Removed = 'REMOVED'
}/**
* @export
* @enum {string}
*/
export enum UpdateReviewFlagStatusEnum {
    Inappropriate = 'INAPPROPRIATE',
    Spam = 'SPAM',
    Irrelevant = 'IRRELEVANT',
    Sensitive = 'SENSITIVE',
    NotFlagged = 'NOT_FLAGGED'
}

export function UpdateReviewFromJSON(json: any): UpdateReview {
    return UpdateReviewFromJSONTyped(json, false);
}

export function UpdateReviewFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateReview {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'content': !exists(json, 'content') ? undefined : json['content'],
        'authorName': !exists(json, 'authorName') ? undefined : json['authorName'],
        'authorEmail': !exists(json, 'authorEmail') ? undefined : json['authorEmail'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'flagStatus': !exists(json, 'flagStatus') ? undefined : json['flagStatus'],
    };
}

export function UpdateReviewToJSON(value?: UpdateReview | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rating': value.rating,
        'content': value.content,
        'authorName': value.authorName,
        'authorEmail': value.authorEmail,
        'status': value.status,
        'flagStatus': value.flagStatus,
    };
}


