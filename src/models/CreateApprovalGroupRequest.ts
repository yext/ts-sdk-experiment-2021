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
 * @interface CreateApprovalGroupRequest
 */
export interface CreateApprovalGroupRequest {
    /**
     * Approval Group Name
     * @type {string}
     * @memberof CreateApprovalGroupRequest
     */
    name: string;
    /**
     * Array of user ids associated with the Approval Group
     * @type {Array<number>}
     * @memberof CreateApprovalGroupRequest
     */
    users?: Array<number>;
    /**
     * True if Approval Group is default for assignment of new tasks. Defaults to false.
     * @type {boolean}
     * @memberof CreateApprovalGroupRequest
     */
    isDefault?: boolean;
}

export function CreateApprovalGroupRequestFromJSON(json: any): CreateApprovalGroupRequest {
    return CreateApprovalGroupRequestFromJSONTyped(json, false);
}

export function CreateApprovalGroupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateApprovalGroupRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'users': !exists(json, 'users') ? undefined : json['users'],
        'isDefault': !exists(json, 'isDefault') ? undefined : json['isDefault'],
    };
}

export function CreateApprovalGroupRequestToJSON(value?: CreateApprovalGroupRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'users': value.users,
        'isDefault': value.isDefault,
    };
}


