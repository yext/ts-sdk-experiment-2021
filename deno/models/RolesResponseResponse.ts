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
    Role,
    RoleFromJSON,
    RoleFromJSONTyped,
    RoleToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface RolesResponseResponse
 */
export interface RolesResponseResponse {
    /**
     * Total number of Roles that meet filter criteria (ignores limit / offset)
     * @type {number}
     * @memberof RolesResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Role>}
     * @memberof RolesResponseResponse
     */
    roles?: Array<Role>;
}

export function RolesResponseResponseFromJSON(json: any): RolesResponseResponse {
    return RolesResponseResponseFromJSONTyped(json, false);
}

export function RolesResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): RolesResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'roles': !exists(json, 'roles') ? undefined : ((json['roles'] as Array<any>).map(RoleFromJSON)),
    };
}

export function RolesResponseResponseToJSON(value?: RolesResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'roles': value.roles === undefined ? undefined : ((value.roles as Array<any>).map(RoleToJSON)),
    };
}


