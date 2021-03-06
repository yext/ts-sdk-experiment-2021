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
import {
    Account,
    AccountFromJSON,
    AccountFromJSONTyped,
    AccountToJSON,
} from './';

/**
 * 
 * @export
 * @interface AccountsResponseResponse
 */
export interface AccountsResponseResponse {
    /**
     * 
     * @type {number}
     * @memberof AccountsResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Account>}
     * @memberof AccountsResponseResponse
     */
    accounts?: Array<Account>;
}

export function AccountsResponseResponseFromJSON(json: any): AccountsResponseResponse {
    return AccountsResponseResponseFromJSONTyped(json, false);
}

export function AccountsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'accounts': !exists(json, 'accounts') ? undefined : ((json['accounts'] as Array<any>).map(AccountFromJSON)),
    };
}

export function AccountsResponseResponseToJSON(value?: AccountsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'accounts': value.accounts === undefined ? undefined : ((value.accounts as Array<any>).map(AccountToJSON)),
    };
}


