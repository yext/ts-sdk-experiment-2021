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
import {
    VerificationMethodAddressData,
    VerificationMethodAddressDataFromJSON,
    VerificationMethodAddressDataFromJSONTyped,
    VerificationMethodAddressDataToJSON,
    VerificationMethodEmailData,
    VerificationMethodEmailDataFromJSON,
    VerificationMethodEmailDataFromJSONTyped,
    VerificationMethodEmailDataToJSON,
    VerificationMethodPhoneData,
    VerificationMethodPhoneDataFromJSON,
    VerificationMethodPhoneDataFromJSONTyped,
    VerificationMethodPhoneDataToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface VerificationMethod
 */
export interface VerificationMethod {
    /**
     * ID of the entity being verified.
     * @type {string}
     * @memberof VerificationMethod
     */
    entityId?: string;
    /**
     * 
     * @type {VerificationMethodAddressData}
     * @memberof VerificationMethod
     */
    addressData?: VerificationMethodAddressData;
    /**
     * 
     * @type {VerificationMethodPhoneData}
     * @memberof VerificationMethod
     */
    phoneData?: VerificationMethodPhoneData;
    /**
     * 
     * @type {VerificationMethodEmailData}
     * @memberof VerificationMethod
     */
    emailData?: VerificationMethodEmailData;
}

export function VerificationMethodFromJSON(json: any): VerificationMethod {
    return VerificationMethodFromJSONTyped(json, false);
}

export function VerificationMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerificationMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': !exists(json, 'entityId') ? undefined : json['entityId'],
        'addressData': !exists(json, 'addressData') ? undefined : VerificationMethodAddressDataFromJSON(json['addressData']),
        'phoneData': !exists(json, 'phoneData') ? undefined : VerificationMethodPhoneDataFromJSON(json['phoneData']),
        'emailData': !exists(json, 'emailData') ? undefined : VerificationMethodEmailDataFromJSON(json['emailData']),
    };
}

export function VerificationMethodToJSON(value?: VerificationMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entityId': value.entityId,
        'addressData': VerificationMethodAddressDataToJSON(value.addressData),
        'phoneData': VerificationMethodPhoneDataToJSON(value.phoneData),
        'emailData': VerificationMethodEmailDataToJSON(value.emailData),
    };
}


