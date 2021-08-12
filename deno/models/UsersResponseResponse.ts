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
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface UsersResponseResponse
 */
export interface UsersResponseResponse {
    /**
     * Total number of Users that meet the filter criteria (ignores limit / offset)
     * @type {number}
     * @memberof UsersResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<User>}
     * @memberof UsersResponseResponse
     */
    users?: Array<User>;
}

export function UsersResponseResponseFromJSON(json: any): UsersResponseResponse {
    return UsersResponseResponseFromJSONTyped(json, false);
}

export function UsersResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'users': !exists(json, 'users') ? undefined : ((json['users'] as Array<any>).map(UserFromJSON)),
    };
}

export function UsersResponseResponseToJSON(value?: UsersResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'users': value.users === undefined ? undefined : ((value.users as Array<any>).map(UserToJSON)),
    };
}


