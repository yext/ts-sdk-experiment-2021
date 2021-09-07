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
 * Contains the start/end times for the event
 * @export
 * @interface EventWriteAllOfTime
 */
export interface EventWriteAllOfTime {
    /**
     * End date/time of the event, in local time (see timezone field)
     * Standard ISO 8601 datetime without timezone
     * Format: `YYYY-MM-DDThh:mm`
     * @type {Date}
     * @memberof EventWriteAllOfTime
     */
    end?: Date;
    /**
     * Start date/time of the event, in local time (see timezone field)
     * Standard ISO 8601 datetime without timezone
     * Format: `YYYY-MM-DDThh:mm`
     * @type {Date}
     * @memberof EventWriteAllOfTime
     */
    start?: Date;
}

export function EventWriteAllOfTimeFromJSON(json: any): EventWriteAllOfTime {
    return EventWriteAllOfTimeFromJSONTyped(json, false);
}

export function EventWriteAllOfTimeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventWriteAllOfTime {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'end': !exists(json, 'end') ? undefined : (new Date(json['end'])),
        'start': !exists(json, 'start') ? undefined : (new Date(json['start'])),
    };
}

export function EventWriteAllOfTimeToJSON(value?: EventWriteAllOfTime | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'end': value.end === undefined ? undefined : (value.end.toISOString()),
        'start': value.start === undefined ? undefined : (value.start.toISOString()),
    };
}

