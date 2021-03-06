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
    ResponseMeta,
    ResponseMetaFromJSON,
    ResponseMetaFromJSONTyped,
    ResponseMetaToJSON,
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {ResponseMeta}
     * @memberof UserResponse
     */
    meta?: ResponseMeta;
    /**
     * 
     * @type {User}
     * @memberof UserResponse
     */
    response?: User;
}

export function UserResponseFromJSON(json: any): UserResponse {
    return UserResponseFromJSONTyped(json, false);
}

export function UserResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'meta': !exists(json, 'meta') ? undefined : ResponseMetaFromJSON(json['meta']),
        'response': !exists(json, 'response') ? undefined : UserFromJSON(json['response']),
    };
}

export function UserResponseToJSON(value?: UserResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'meta': ResponseMetaToJSON(value.meta),
        'response': UserToJSON(value.response),
    };
}


