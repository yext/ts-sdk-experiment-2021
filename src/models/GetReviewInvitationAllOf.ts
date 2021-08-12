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
 * @interface GetReviewInvitationAllOf
 */
export interface GetReviewInvitationAllOf {
    /**
     * The determined sender of the invitation.
     * 
     * For invitations directed towards App Directory Partners, the ID of partner, otherwise this
     * will be FIRSTPARTY.
     * @type {string}
     * @memberof GetReviewInvitationAllOf
     */
    partnerId?: string;
    /**
     * 
     * @type {string}
     * @memberof GetReviewInvitationAllOf
     */
    type?: GetReviewInvitationAllOfTypeEnum;
    /**
     * The timestamp the invitation was requested.
     * @type {number}
     * @memberof GetReviewInvitationAllOf
     */
    requested?: number;
}

/**
* @export
* @enum {string}
*/
export enum GetReviewInvitationAllOfTypeEnum {
    Email = 'EMAIL',
    Sms = 'SMS'
}

export function GetReviewInvitationAllOfFromJSON(json: any): GetReviewInvitationAllOf {
    return GetReviewInvitationAllOfFromJSONTyped(json, false);
}

export function GetReviewInvitationAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetReviewInvitationAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'partnerId': !exists(json, 'partnerId') ? undefined : json['partnerId'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'requested': !exists(json, 'requested') ? undefined : json['requested'],
    };
}

export function GetReviewInvitationAllOfToJSON(value?: GetReviewInvitationAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'partnerId': value.partnerId,
        'type': value.type,
        'requested': value.requested,
    };
}


