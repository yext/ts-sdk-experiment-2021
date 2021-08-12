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
 * @interface VerificationMethodEmailData
 */
export interface VerificationMethodEmailData {
    /**
     * The domain name of the email address where the verification code will be sent.
     * 
     * Ex: “@yext.com” in “test@yext.com”
     * @type {string}
     * @memberof VerificationMethodEmailData
     */
    domainName?: string;
    /**
     * The username portion of the email address where the verification code will be sent.
     * 
     * Ex: “test” in “test@yext.com”
     * @type {string}
     * @memberof VerificationMethodEmailData
     */
    userName?: string;
    /**
     * If true, a verification may be initiated using a different username on the same email domain.
     * @type {boolean}
     * @memberof VerificationMethodEmailData
     */
    userNameEditable?: boolean;
}

export function VerificationMethodEmailDataFromJSON(json: any): VerificationMethodEmailData {
    return VerificationMethodEmailDataFromJSONTyped(json, false);
}

export function VerificationMethodEmailDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerificationMethodEmailData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'domainName': !exists(json, 'domainName') ? undefined : json['domainName'],
        'userName': !exists(json, 'userName') ? undefined : json['userName'],
        'userNameEditable': !exists(json, 'userNameEditable') ? undefined : json['userNameEditable'],
    };
}

export function VerificationMethodEmailDataToJSON(value?: VerificationMethodEmailData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'domainName': value.domainName,
        'userName': value.userName,
        'userNameEditable': value.userNameEditable,
    };
}


