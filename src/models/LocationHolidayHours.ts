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
 * @interface LocationHolidayHours
 */
export interface LocationHolidayHours {
    /**
     * Special opening and closing times in 24-hour format (OH:OM:CH:CM, where OH:OM is the opening time and CH:CM is the closing time).
     * 
     * Times with single-digit hours (e.g., 9 AM) can be submitted with or without a leading zero (9:00 or 09:00).
     * 
     * Examples:
     * * 9:00:15:00 — Opening at 9:00 AM, closing at 3:00 PM
     * * "" (empty string) — Closed all day
     * * 0:00:0:00 or 0:00:23:59 — Open 24 hours
     * * 9:00:15:00,17:00:19:00 — Split hours: open from 9:00 AM to 3:00 PM and again from 5:00 PM to 7:00 PM
     * 
     * **NOTE:** If **isRegularHours** is set to true, we will ignore this field.
     * @type {string}
     * @memberof LocationHolidayHours
     */
    hours?: string;
    /**
     * The date on which the holiday hours will be in effect
     * @type {Date}
     * @memberof LocationHolidayHours
     */
    date?: Date;
    /**
     * Indicates whether the holiday hours are the same as the regular business hours for the given date. If set to true, we will update the holiday hours if the regular business hours change for the date's day of the week.
     * @type {boolean}
     * @memberof LocationHolidayHours
     */
    isRegularHours?: boolean;
}

export function LocationHolidayHoursFromJSON(json: any): LocationHolidayHours {
    return LocationHolidayHoursFromJSONTyped(json, false);
}

export function LocationHolidayHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationHolidayHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'hours': !exists(json, 'hours') ? undefined : json['hours'],
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
        'isRegularHours': !exists(json, 'isRegularHours') ? undefined : json['isRegularHours'],
    };
}

export function LocationHolidayHoursToJSON(value?: LocationHolidayHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'hours': value.hours,
        'date': value.date === undefined ? undefined : (value.date.toISOString().substr(0,10)),
        'isRegularHours': value.isRegularHours,
    };
}


