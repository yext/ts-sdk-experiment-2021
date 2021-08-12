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
 * Indicates whether the event is online, offline, or a mix.
 * A `virtualLocationUrl` must be specified for online and mixed events.
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * event
 * ```
 * @export
 * @interface InlineResponse200ResponseAttendance
 */
export interface InlineResponse200ResponseAttendance {
    /**
     * Filtering Type: `option`
     * @type {string}
     * @memberof InlineResponse200ResponseAttendance
     */
    attendanceMode: InlineResponse200ResponseAttendanceAttendanceModeEnum;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseAttendance
     */
    virtualLocationUrl?: string;
}

/**
* @export
* @enum {string}
*/
export enum InlineResponse200ResponseAttendanceAttendanceModeEnum {
    Offline = 'OFFLINE',
    Online = 'ONLINE',
    Mixed = 'MIXED'
}

export function InlineResponse200ResponseAttendanceFromJSON(json: any): InlineResponse200ResponseAttendance {
    return InlineResponse200ResponseAttendanceFromJSONTyped(json, false);
}

export function InlineResponse200ResponseAttendanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseAttendance {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'attendanceMode': json['attendanceMode'],
        'virtualLocationUrl': !exists(json, 'virtualLocationUrl') ? undefined : json['virtualLocationUrl'],
    };
}

export function InlineResponse200ResponseAttendanceToJSON(value?: InlineResponse200ResponseAttendance | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'attendanceMode': value.attendanceMode,
        'virtualLocationUrl': value.virtualLocationUrl,
    };
}

