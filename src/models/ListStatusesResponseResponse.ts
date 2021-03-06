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
    VerificationStatus,
    VerificationStatusFromJSON,
    VerificationStatusFromJSONTyped,
    VerificationStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface ListStatusesResponseResponse
 */
export interface ListStatusesResponseResponse {
    /**
     * Total number of verification statuses that meet the filter criteria.
     * @type {number}
     * @memberof ListStatusesResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<VerificationStatus>}
     * @memberof ListStatusesResponseResponse
     */
    verifications?: Array<VerificationStatus>;
    /**
     * This field is only included if there is an additional page of data to display. To retrieve the next page of data, pass this field's value as the **``pageToken``** parameter in a subsequent request. 
     * @type {string}
     * @memberof ListStatusesResponseResponse
     */
    nextPageToken?: string;
}

export function ListStatusesResponseResponseFromJSON(json: any): ListStatusesResponseResponse {
    return ListStatusesResponseResponseFromJSONTyped(json, false);
}

export function ListStatusesResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListStatusesResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'verifications': !exists(json, 'verifications') ? undefined : ((json['verifications'] as Array<any>).map(VerificationStatusFromJSON)),
        'nextPageToken': !exists(json, 'nextPageToken') ? undefined : json['nextPageToken'],
    };
}

export function ListStatusesResponseResponseToJSON(value?: ListStatusesResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'verifications': value.verifications === undefined ? undefined : ((value.verifications as Array<any>).map(VerificationStatusToJSON)),
        'nextPageToken': value.nextPageToken,
    };
}


