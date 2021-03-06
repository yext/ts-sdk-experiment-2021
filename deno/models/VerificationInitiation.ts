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
 * @interface VerificationInitiation
 */
export interface VerificationInitiation {
    /**
     * ID of the entity being verified.
     * @type {string}
     * @memberof VerificationInitiation
     */
    entityId?: string;
    /**
     * 
     * @type {string}
     * @memberof VerificationInitiation
     */
    method?: VerificationInitiationMethodEnum;
    /**
     * Provides a user-specified email address that the verification code should be sent to
     * when **`userNameEditable`** is `true` in the VerificationMethod response.
     * @type {string}
     * @memberof VerificationInitiation
     */
    alternateEmail?: string;
    /**
     * Contact name the mail should be addressed to.
     * Only applies if the verification **`method`** is `POSTCARD`.
     * @type {string}
     * @memberof VerificationInitiation
     */
    recipientName?: string;
}

/**
* @export
* @enum {string}
*/
export enum VerificationInitiationMethodEnum {
    Postcard = 'POSTCARD',
    Email = 'EMAIL',
    Phone = 'PHONE',
    Sms = 'SMS'
}

export function VerificationInitiationFromJSON(json: any): VerificationInitiation {
    return VerificationInitiationFromJSONTyped(json, false);
}

export function VerificationInitiationFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerificationInitiation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': !exists(json, 'entityId') ? undefined : json['entityId'],
        'method': !exists(json, 'method') ? undefined : json['method'],
        'alternateEmail': !exists(json, 'alternateEmail') ? undefined : json['alternateEmail'],
        'recipientName': !exists(json, 'recipientName') ? undefined : json['recipientName'],
    };
}

export function VerificationInitiationToJSON(value?: VerificationInitiation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entityId': value.entityId,
        'method': value.method,
        'alternateEmail': value.alternateEmail,
        'recipientName': value.recipientName,
    };
}


