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
 * @interface ReviewCommentUpdate
 */
export interface ReviewCommentUpdate {
    /**
     * Content of the comment.
     * @type {string}
     * @memberof ReviewCommentUpdate
     */
    content?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewCommentUpdate
     */
    visibility?: ReviewCommentUpdateVisibilityEnum;
}

/**
* @export
* @enum {string}
*/
export enum ReviewCommentUpdateVisibilityEnum {
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}

export function ReviewCommentUpdateFromJSON(json: any): ReviewCommentUpdate {
    return ReviewCommentUpdateFromJSONTyped(json, false);
}

export function ReviewCommentUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewCommentUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'content': !exists(json, 'content') ? undefined : json['content'],
        'visibility': !exists(json, 'visibility') ? undefined : json['visibility'],
    };
}

export function ReviewCommentUpdateToJSON(value?: ReviewCommentUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'content': value.content,
        'visibility': value.visibility,
    };
}


