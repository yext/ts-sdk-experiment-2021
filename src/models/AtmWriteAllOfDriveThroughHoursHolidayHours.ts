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
    AtmWriteAllOfAccessHoursFridayOpenIntervals,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSONTyped,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsToJSON,
} from './';

/**
 * 
 * @export
 * @interface AtmWriteAllOfDriveThroughHoursHolidayHours
 */
export interface AtmWriteAllOfDriveThroughHoursHolidayHours {
    /**
     * Date on which the holiday hours will be in effect. Cannot be in the past.
     * 
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * @type {Date}
     * @memberof AtmWriteAllOfDriveThroughHoursHolidayHours
     */
    date: Date;
    /**
     * Indicates if the drive-through hours are "closed" on on the given date.
     * @type {boolean}
     * @memberof AtmWriteAllOfDriveThroughHoursHolidayHours
     */
    isClosed?: boolean;
    /**
     * Indicates whether the holiday hours are the same as the regular business hours for the given date. If set to true, we will update the holiday hours if the regular business hours change for the date's day of the week.
     * @type {boolean}
     * @memberof AtmWriteAllOfDriveThroughHoursHolidayHours
     */
    isRegularHours?: boolean;
    /**
     * Contains the time intervals for which the Entity's drive-through is open on the specified date.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof AtmWriteAllOfDriveThroughHoursHolidayHours
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSON(json: any): AtmWriteAllOfDriveThroughHoursHolidayHours {
    return AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSONTyped(json, false);
}

export function AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfDriveThroughHoursHolidayHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'date': (new Date(json['date'])),
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'isRegularHours': !exists(json, 'isRegularHours') ? undefined : json['isRegularHours'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function AtmWriteAllOfDriveThroughHoursHolidayHoursToJSON(value?: AtmWriteAllOfDriveThroughHoursHolidayHours | null): any {
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
        'openIntervals': value.openIntervals === undefined ? undefined : ((value.openIntervals as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsToJSON)),
    };
}

