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
 * @interface AdminInvite
 */
export interface AdminInvite {
    /**
     * ID of the entity that the admin will be associated with.
     * @type {string}
     * @memberof AdminInvite
     */
    entityId?: string;
    /**
     * Email of the admin to be invited.
     * @type {string}
     * @memberof AdminInvite
     */
    adminEmail?: string;
}

export function AdminInviteFromJSON(json: any): AdminInvite {
    return AdminInviteFromJSONTyped(json, false);
}

export function AdminInviteFromJSONTyped(json: any, ignoreDiscriminator: boolean): AdminInvite {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': !exists(json, 'entityId') ? undefined : json['entityId'],
        'adminEmail': !exists(json, 'adminEmail') ? undefined : json['adminEmail'],
    };
}

export function AdminInviteToJSON(value?: AdminInvite | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entityId': value.entityId,
        'adminEmail': value.adminEmail,
    };
}


