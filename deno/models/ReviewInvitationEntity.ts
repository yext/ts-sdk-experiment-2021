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
/**
 * 
 * @export
 * @interface ReviewInvitationEntity
 */
export interface ReviewInvitationEntity {
    /**
     * ID of the entity associated with this review.
     * 
     * If the **`v`** parameter is before `20210728`, please refer to **`locationId`** as the
     * parameter name instead of **`entity`**.
     * @type {string}
     * @memberof ReviewInvitationEntity
     */
    id?: string;
}

export function ReviewInvitationEntityFromJSON(json: any): ReviewInvitationEntity {
    return ReviewInvitationEntityFromJSONTyped(json, false);
}

export function ReviewInvitationEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewInvitationEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function ReviewInvitationEntityToJSON(value?: ReviewInvitationEntity | null): any {
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

