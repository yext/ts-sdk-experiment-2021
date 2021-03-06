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
 * @interface UpdatePasswordRequest
 */
export interface UpdatePasswordRequest {
    /**
     * User's new password
     * @type {string}
     * @memberof UpdatePasswordRequest
     */
    newPassword: string;
}

export function UpdatePasswordRequestFromJSON(json: any): UpdatePasswordRequest {
    return UpdatePasswordRequestFromJSONTyped(json, false);
}

export function UpdatePasswordRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdatePasswordRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'newPassword': json['newPassword'],
    };
}

export function UpdatePasswordRequestToJSON(value?: UpdatePasswordRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'newPassword': value.newPassword,
    };
}


