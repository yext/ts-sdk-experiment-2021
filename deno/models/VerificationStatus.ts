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
 * @interface VerificationStatus
 */
export interface VerificationStatus {
    /**
     * ID of the entity being verified.
     * @type {string}
     * @memberof VerificationStatus
     */
    entityId?: string;
    /**
     * 
     * @type {string}
     * @memberof VerificationStatus
     */
    state?: VerificationStatusStateEnum;
    /**
     * The time that the verification was created.
     * @type {string}
     * @memberof VerificationStatus
     */
    createTime?: string;
}

/**
* @export
* @enum {string}
*/
export enum VerificationStatusStateEnum {
    VerificationStateUnspecified = 'VERIFICATION_STATE_UNSPECIFIED',
    Pending = 'PENDING',
    Completed = 'COMPLETED',
    Failed = 'FAILED'
}

export function VerificationStatusFromJSON(json: any): VerificationStatus {
    return VerificationStatusFromJSONTyped(json, false);
}

export function VerificationStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerificationStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': !exists(json, 'entityId') ? undefined : json['entityId'],
        'state': !exists(json, 'state') ? undefined : json['state'],
        'createTime': !exists(json, 'createTime') ? undefined : json['createTime'],
    };
}

export function VerificationStatusToJSON(value?: VerificationStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entityId': value.entityId,
        'state': value.state,
        'createTime': value.createTime,
    };
}


