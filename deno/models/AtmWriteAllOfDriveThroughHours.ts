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
    AtmWriteAllOfDriveThroughHoursFriday,
    AtmWriteAllOfDriveThroughHoursFridayFromJSON,
    AtmWriteAllOfDriveThroughHoursFridayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursFridayToJSON,
    AtmWriteAllOfDriveThroughHoursHolidayHours,
    AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSON,
    AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursHolidayHoursToJSON,
    AtmWriteAllOfDriveThroughHoursMonday,
    AtmWriteAllOfDriveThroughHoursMondayFromJSON,
    AtmWriteAllOfDriveThroughHoursMondayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursMondayToJSON,
    AtmWriteAllOfDriveThroughHoursSaturday,
    AtmWriteAllOfDriveThroughHoursSaturdayFromJSON,
    AtmWriteAllOfDriveThroughHoursSaturdayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursSaturdayToJSON,
    AtmWriteAllOfDriveThroughHoursSunday,
    AtmWriteAllOfDriveThroughHoursSundayFromJSON,
    AtmWriteAllOfDriveThroughHoursSundayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursSundayToJSON,
    AtmWriteAllOfDriveThroughHoursThursday,
    AtmWriteAllOfDriveThroughHoursThursdayFromJSON,
    AtmWriteAllOfDriveThroughHoursThursdayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursThursdayToJSON,
    AtmWriteAllOfDriveThroughHoursTuesday,
    AtmWriteAllOfDriveThroughHoursTuesdayFromJSON,
    AtmWriteAllOfDriveThroughHoursTuesdayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursTuesdayToJSON,
    AtmWriteAllOfDriveThroughHoursWednesday,
    AtmWriteAllOfDriveThroughHoursWednesdayFromJSON,
    AtmWriteAllOfDriveThroughHoursWednesdayFromJSONTyped,
    AtmWriteAllOfDriveThroughHoursWednesdayToJSON,
} from './index.ts';

/**
 * Contains the daily drive-through hours, holiday drive-through hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `driveThroughHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday drive-through hours are represented by the `holidayHours` sub-field.
 * Setting the `reopenDate` sub-field indicates that the business is temporarily closed and will reopen on the specified date.
 * SPECIAL CASES:
 * * To indicate that an Entity is open 24 hours on a specific day, set start to 00:00 and end to 23:59 in `openIntervals` for that day.
 * * To indicate that an Entity has split hours on specific day (e.g., open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM), supply up to two `openIntervals` values with non-overlapping sets of hours.
 * * If you are providing `openIntervals`, you may not set `isClosed` to true for that day.
 * @export
 * @interface AtmWriteAllOfDriveThroughHours
 */
export interface AtmWriteAllOfDriveThroughHours {
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursFriday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    friday?: AtmWriteAllOfDriveThroughHoursFriday;
    /**
     * 
     * **NOTE:** The list of Holiday Hours that you send us must be comprehensive. For example, if you send us a list of Holiday Hours that does not include Holiday Hours that you sent in your last update, Yext considers the missing Holiday Hours to be deleted, and we remove them.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<AtmWriteAllOfDriveThroughHoursHolidayHours>}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    holidayHours?: Set<AtmWriteAllOfDriveThroughHoursHolidayHours>;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursMonday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    monday?: AtmWriteAllOfDriveThroughHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * @type {Date}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursSaturday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    saturday?: AtmWriteAllOfDriveThroughHoursSaturday;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursSunday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    sunday?: AtmWriteAllOfDriveThroughHoursSunday;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursThursday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    thursday?: AtmWriteAllOfDriveThroughHoursThursday;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursTuesday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    tuesday?: AtmWriteAllOfDriveThroughHoursTuesday;
    /**
     * 
     * @type {AtmWriteAllOfDriveThroughHoursWednesday}
     * @memberof AtmWriteAllOfDriveThroughHours
     */
    wednesday?: AtmWriteAllOfDriveThroughHoursWednesday;
}

export function AtmWriteAllOfDriveThroughHoursFromJSON(json: any): AtmWriteAllOfDriveThroughHours {
    return AtmWriteAllOfDriveThroughHoursFromJSONTyped(json, false);
}

export function AtmWriteAllOfDriveThroughHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfDriveThroughHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : AtmWriteAllOfDriveThroughHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(AtmWriteAllOfDriveThroughHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : AtmWriteAllOfDriveThroughHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : AtmWriteAllOfDriveThroughHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : AtmWriteAllOfDriveThroughHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : AtmWriteAllOfDriveThroughHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : AtmWriteAllOfDriveThroughHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : AtmWriteAllOfDriveThroughHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function AtmWriteAllOfDriveThroughHoursToJSON(value?: AtmWriteAllOfDriveThroughHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': AtmWriteAllOfDriveThroughHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(AtmWriteAllOfDriveThroughHoursHolidayHoursToJSON)),
        'monday': AtmWriteAllOfDriveThroughHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': AtmWriteAllOfDriveThroughHoursSaturdayToJSON(value.saturday),
        'sunday': AtmWriteAllOfDriveThroughHoursSundayToJSON(value.sunday),
        'thursday': AtmWriteAllOfDriveThroughHoursThursdayToJSON(value.thursday),
        'tuesday': AtmWriteAllOfDriveThroughHoursTuesdayToJSON(value.tuesday),
        'wednesday': AtmWriteAllOfDriveThroughHoursWednesdayToJSON(value.wednesday),
    };
}

