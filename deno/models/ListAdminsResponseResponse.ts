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
    Admin,
    AdminFromJSON,
    AdminFromJSONTyped,
    AdminToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface ListAdminsResponseResponse
 */
export interface ListAdminsResponseResponse {
    /**
     * Total number of admins that meet the filter criteria.
     * @type {number}
     * @memberof ListAdminsResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Admin>}
     * @memberof ListAdminsResponseResponse
     */
    admins?: Array<Admin>;
    /**
     * This field is only included if there is an additional page of data to display. To retrieve the next page of data, pass this field's value as the **``pageToken``** parameter in a subsequent request. 
     * @type {string}
     * @memberof ListAdminsResponseResponse
     */
    nextPageToken?: string;
}

export function ListAdminsResponseResponseFromJSON(json: any): ListAdminsResponseResponse {
    return ListAdminsResponseResponseFromJSONTyped(json, false);
}

export function ListAdminsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListAdminsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'admins': !exists(json, 'admins') ? undefined : ((json['admins'] as Array<any>).map(AdminFromJSON)),
        'nextPageToken': !exists(json, 'nextPageToken') ? undefined : json['nextPageToken'],
    };
}

export function ListAdminsResponseResponseToJSON(value?: ListAdminsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'admins': value.admins === undefined ? undefined : ((value.admins as Array<any>).map(AdminToJSON)),
        'nextPageToken': value.nextPageToken,
    };
}


