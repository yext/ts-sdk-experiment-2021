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
    InlineResponse200ResponseAccessHoursFridayOpenIntervals,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSONTyped,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON,
} from './';

/**
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseDriveThroughHoursHolidayHours
 */
export interface InlineResponse200ResponseDriveThroughHoursHolidayHours {
    /**
     * Date on which the holiday hours will be in effect. Cannot be in the past.
     * 
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * 
     * Filtering Type: `date`
     * @type {Date}
     * @memberof InlineResponse200ResponseDriveThroughHoursHolidayHours
     */
    date: Date;
    /**
     * Indicates if the drive-through hours are "closed" on on the given date.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseDriveThroughHoursHolidayHours
     */
    isClosed?: boolean;
    /**
     * Indicates whether the holiday hours are the same as the regular business hours for the given date. If set to true, we will update the holiday hours if the regular business hours change for the date's day of the week.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseDriveThroughHoursHolidayHours
     */
    isRegularHours?: boolean;
    /**
     * Contains the time intervals for which the Entity's drive-through is open on the specified date.
     * 
     * Filtering Type: `list of object`
     * @type {Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>}
     * @memberof InlineResponse200ResponseDriveThroughHoursHolidayHours
     */
    openIntervals?: Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>;
}

export function InlineResponse200ResponseDriveThroughHoursHolidayHoursFromJSON(json: any): InlineResponse200ResponseDriveThroughHoursHolidayHours {
    return InlineResponse200ResponseDriveThroughHoursHolidayHoursFromJSONTyped(json, false);
}

export function InlineResponse200ResponseDriveThroughHoursHolidayHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseDriveThroughHoursHolidayHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': (new Date(json['date'])),
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'isRegularHours': !exists(json, 'isRegularHours') ? undefined : json['isRegularHours'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function InlineResponse200ResponseDriveThroughHoursHolidayHoursToJSON(value?: InlineResponse200ResponseDriveThroughHoursHolidayHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'date': (value.date.toISOString().substr(0,10)),
        'isClosed': value.isClosed,
        'isRegularHours': value.isRegularHours,
        'openIntervals': value.openIntervals === undefined ? undefined : ((value.openIntervals as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON)),
    };
}


