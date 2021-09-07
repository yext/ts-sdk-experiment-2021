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
    LocationWriteAllOfSeniorHoursFriday,
    LocationWriteAllOfSeniorHoursFridayFromJSON,
    LocationWriteAllOfSeniorHoursFridayFromJSONTyped,
    LocationWriteAllOfSeniorHoursFridayToJSON,
    LocationWriteAllOfSeniorHoursHolidayHours,
    LocationWriteAllOfSeniorHoursHolidayHoursFromJSON,
    LocationWriteAllOfSeniorHoursHolidayHoursFromJSONTyped,
    LocationWriteAllOfSeniorHoursHolidayHoursToJSON,
    LocationWriteAllOfSeniorHoursMonday,
    LocationWriteAllOfSeniorHoursMondayFromJSON,
    LocationWriteAllOfSeniorHoursMondayFromJSONTyped,
    LocationWriteAllOfSeniorHoursMondayToJSON,
    LocationWriteAllOfSeniorHoursSaturday,
    LocationWriteAllOfSeniorHoursSaturdayFromJSON,
    LocationWriteAllOfSeniorHoursSaturdayFromJSONTyped,
    LocationWriteAllOfSeniorHoursSaturdayToJSON,
    LocationWriteAllOfSeniorHoursSunday,
    LocationWriteAllOfSeniorHoursSundayFromJSON,
    LocationWriteAllOfSeniorHoursSundayFromJSONTyped,
    LocationWriteAllOfSeniorHoursSundayToJSON,
    LocationWriteAllOfSeniorHoursThursday,
    LocationWriteAllOfSeniorHoursThursdayFromJSON,
    LocationWriteAllOfSeniorHoursThursdayFromJSONTyped,
    LocationWriteAllOfSeniorHoursThursdayToJSON,
    LocationWriteAllOfSeniorHoursTuesday,
    LocationWriteAllOfSeniorHoursTuesdayFromJSON,
    LocationWriteAllOfSeniorHoursTuesdayFromJSONTyped,
    LocationWriteAllOfSeniorHoursTuesdayToJSON,
    LocationWriteAllOfSeniorHoursWednesday,
    LocationWriteAllOfSeniorHoursWednesdayFromJSON,
    LocationWriteAllOfSeniorHoursWednesdayFromJSONTyped,
    LocationWriteAllOfSeniorHoursWednesdayToJSON,
} from './index.ts';

/**
 * Contains the daily senior hours, holiday senior hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `seniorHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday senior hours are represented by the `holidayHours` sub-field.
 * Setting the `reopenDate` sub-field indicates that the business is temporarily closed and will reopen on the specified date.
 * SPECIAL CASES:
 * * To indicate that an Entity is open 24 hours on a specific day, set start to 00:00 and end to 23:59 in `openIntervals` for that day.
 * * To indicate that an Entity has split hours on specific day (e.g., open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM), supply up to two `openIntervals` values with non-overlapping sets of hours.
 * * If you are providing `openIntervals`, you may not set `isClosed` to true for that day.
 * @export
 * @interface LocationWriteAllOfSeniorHours
 */
export interface LocationWriteAllOfSeniorHours {
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursFriday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    friday?: LocationWriteAllOfSeniorHoursFriday;
    /**
     * 
     * **NOTE:** The list of Holiday Hours that you send us must be comprehensive. For example, if you send us a list of Holiday Hours that does not include Holiday Hours that you sent in your last update, Yext considers the missing Holiday Hours to be deleted, and we remove them.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<LocationWriteAllOfSeniorHoursHolidayHours>}
     * @memberof LocationWriteAllOfSeniorHours
     */
    holidayHours?: Set<LocationWriteAllOfSeniorHoursHolidayHours>;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursMonday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    monday?: LocationWriteAllOfSeniorHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * @type {Date}
     * @memberof LocationWriteAllOfSeniorHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursSaturday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    saturday?: LocationWriteAllOfSeniorHoursSaturday;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursSunday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    sunday?: LocationWriteAllOfSeniorHoursSunday;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursThursday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    thursday?: LocationWriteAllOfSeniorHoursThursday;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursTuesday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    tuesday?: LocationWriteAllOfSeniorHoursTuesday;
    /**
     * 
     * @type {LocationWriteAllOfSeniorHoursWednesday}
     * @memberof LocationWriteAllOfSeniorHours
     */
    wednesday?: LocationWriteAllOfSeniorHoursWednesday;
}

export function LocationWriteAllOfSeniorHoursFromJSON(json: any): LocationWriteAllOfSeniorHours {
    return LocationWriteAllOfSeniorHoursFromJSONTyped(json, false);
}

export function LocationWriteAllOfSeniorHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationWriteAllOfSeniorHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : LocationWriteAllOfSeniorHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(LocationWriteAllOfSeniorHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : LocationWriteAllOfSeniorHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : LocationWriteAllOfSeniorHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : LocationWriteAllOfSeniorHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : LocationWriteAllOfSeniorHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : LocationWriteAllOfSeniorHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : LocationWriteAllOfSeniorHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function LocationWriteAllOfSeniorHoursToJSON(value?: LocationWriteAllOfSeniorHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': LocationWriteAllOfSeniorHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(LocationWriteAllOfSeniorHoursHolidayHoursToJSON)),
        'monday': LocationWriteAllOfSeniorHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': LocationWriteAllOfSeniorHoursSaturdayToJSON(value.saturday),
        'sunday': LocationWriteAllOfSeniorHoursSundayToJSON(value.sunday),
        'thursday': LocationWriteAllOfSeniorHoursThursdayToJSON(value.thursday),
        'tuesday': LocationWriteAllOfSeniorHoursTuesdayToJSON(value.tuesday),
        'wednesday': LocationWriteAllOfSeniorHoursWednesdayToJSON(value.wednesday),
    };
}


