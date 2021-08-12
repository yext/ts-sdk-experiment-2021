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
 * @interface AssignLinkedAccountResponseResponse
 */
export interface AssignLinkedAccountResponseResponse {
    /**
     * The ID of the copied linked account. This ID will differ from the original linked account ID.
     * @type {string}
     * @memberof AssignLinkedAccountResponseResponse
     */
    linkedAccountId?: string;
}

export function AssignLinkedAccountResponseResponseFromJSON(json: any): AssignLinkedAccountResponseResponse {
    return AssignLinkedAccountResponseResponseFromJSONTyped(json, false);
}

export function AssignLinkedAccountResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssignLinkedAccountResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'linkedAccountId': !exists(json, 'linkedAccountId') ? undefined : json['linkedAccountId'],
    };
}

export function AssignLinkedAccountResponseResponseToJSON(value?: AssignLinkedAccountResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'linkedAccountId': value.linkedAccountId,
    };
}


