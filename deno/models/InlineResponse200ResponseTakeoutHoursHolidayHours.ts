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
    InlineResponse200ResponseAccessHoursFridayOpenIntervals,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSONTyped,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON,
} from './index.ts';

/**
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseTakeoutHoursHolidayHours
 */
export interface InlineResponse200ResponseTakeoutHoursHolidayHours {
    /**
     * Date on which the holiday hours will be in effect. Cannot be in the past.
     * 
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * 
     * Filtering Type: `date`
     * @type {Date}
     * @memberof InlineResponse200ResponseTakeoutHoursHolidayHours
     */
    date: Date;
    /**
     * Indicates if the takeout hours are "closed" on on the given date.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseTakeoutHoursHolidayHours
     */
    isClosed?: boolean;
    /**
     * Indicates whether the holiday hours are the same as the regular business hours for the given date. If set to true, we will update the holiday hours if the regular business hours change for the date's day of the week.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseTakeoutHoursHolidayHours
     */
    isRegularHours?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for takeout on the specified date.
     * 
     * Filtering Type: `list of object`
     * @type {Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>}
     * @memberof InlineResponse200ResponseTakeoutHoursHolidayHours
     */
    openIntervals?: Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>;
}

export function InlineResponse200ResponseTakeoutHoursHolidayHoursFromJSON(json: any): InlineResponse200ResponseTakeoutHoursHolidayHours {
    return InlineResponse200ResponseTakeoutHoursHolidayHoursFromJSONTyped(json, false);
}

export function InlineResponse200ResponseTakeoutHoursHolidayHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseTakeoutHoursHolidayHours {
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

export function InlineResponse200ResponseTakeoutHoursHolidayHoursToJSON(value?: InlineResponse200ResponseTakeoutHoursHolidayHours | null): any {
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


