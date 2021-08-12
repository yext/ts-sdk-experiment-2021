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
    InlineResponse200ResponseHappyHoursFriday,
    InlineResponse200ResponseHappyHoursFridayFromJSON,
    InlineResponse200ResponseHappyHoursFridayFromJSONTyped,
    InlineResponse200ResponseHappyHoursFridayToJSON,
    InlineResponse200ResponseHappyHoursHolidayHours,
    InlineResponse200ResponseHappyHoursHolidayHoursFromJSON,
    InlineResponse200ResponseHappyHoursHolidayHoursFromJSONTyped,
    InlineResponse200ResponseHappyHoursHolidayHoursToJSON,
    InlineResponse200ResponseHappyHoursMonday,
    InlineResponse200ResponseHappyHoursMondayFromJSON,
    InlineResponse200ResponseHappyHoursMondayFromJSONTyped,
    InlineResponse200ResponseHappyHoursMondayToJSON,
    InlineResponse200ResponseHappyHoursSaturday,
    InlineResponse200ResponseHappyHoursSaturdayFromJSON,
    InlineResponse200ResponseHappyHoursSaturdayFromJSONTyped,
    InlineResponse200ResponseHappyHoursSaturdayToJSON,
    InlineResponse200ResponseHappyHoursSunday,
    InlineResponse200ResponseHappyHoursSundayFromJSON,
    InlineResponse200ResponseHappyHoursSundayFromJSONTyped,
    InlineResponse200ResponseHappyHoursSundayToJSON,
    InlineResponse200ResponseHappyHoursThursday,
    InlineResponse200ResponseHappyHoursThursdayFromJSON,
    InlineResponse200ResponseHappyHoursThursdayFromJSONTyped,
    InlineResponse200ResponseHappyHoursThursdayToJSON,
    InlineResponse200ResponseHappyHoursTuesday,
    InlineResponse200ResponseHappyHoursTuesdayFromJSON,
    InlineResponse200ResponseHappyHoursTuesdayFromJSONTyped,
    InlineResponse200ResponseHappyHoursTuesdayToJSON,
    InlineResponse200ResponseHappyHoursWednesday,
    InlineResponse200ResponseHappyHoursWednesdayFromJSON,
    InlineResponse200ResponseHappyHoursWednesdayFromJSONTyped,
    InlineResponse200ResponseHappyHoursWednesdayToJSON,
} from './index.ts';

/**
 * Contains the daily happy hours, holiday happy hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `happyHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday happy hours are represented by the `holidayHours` sub-field.
 * Setting the `reopenDate` sub-field indicates that the business is temporarily closed and will reopen on the specified date.
 * SPECIAL CASES:
 * * To indicate that an Entity is open 24 hours on a specific day, set start to 00:00 and end to 23:59 in `openIntervals` for that day.
 * * To indicate that an Entity has split hours on specific day (e.g., open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM), supply up to two `openIntervals` values with non-overlapping sets of hours.
 * * If you are providing `openIntervals`, you may not set `isClosed` to true for that day.
 * 
 * Filtering Type: `hours`
 * 
 * ```
 * Eligible For: 
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseHappyHours
 */
export interface InlineResponse200ResponseHappyHours {
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursFriday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    friday?: InlineResponse200ResponseHappyHoursFriday;
    /**
     * 
     * **NOTE:** The list of Holiday Hours that you send us must be comprehensive. For example, if you send us a list of Holiday Hours that does not include Holiday Hours that you sent in your last update, Yext considers the missing Holiday Hours to be deleted, and we remove them.
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * 
     * Filtering Type: `list of object`
     * @type {Set<InlineResponse200ResponseHappyHoursHolidayHours>}
     * @memberof InlineResponse200ResponseHappyHours
     */
    holidayHours?: Set<InlineResponse200ResponseHappyHoursHolidayHours>;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursMonday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    monday?: InlineResponse200ResponseHappyHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * 
     * Filtering Type: `date`
     * @type {Date}
     * @memberof InlineResponse200ResponseHappyHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursSaturday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    saturday?: InlineResponse200ResponseHappyHoursSaturday;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursSunday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    sunday?: InlineResponse200ResponseHappyHoursSunday;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursThursday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    thursday?: InlineResponse200ResponseHappyHoursThursday;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursTuesday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    tuesday?: InlineResponse200ResponseHappyHoursTuesday;
    /**
     * 
     * @type {InlineResponse200ResponseHappyHoursWednesday}
     * @memberof InlineResponse200ResponseHappyHours
     */
    wednesday?: InlineResponse200ResponseHappyHoursWednesday;
}

export function InlineResponse200ResponseHappyHoursFromJSON(json: any): InlineResponse200ResponseHappyHours {
    return InlineResponse200ResponseHappyHoursFromJSONTyped(json, false);
}

export function InlineResponse200ResponseHappyHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseHappyHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : InlineResponse200ResponseHappyHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(InlineResponse200ResponseHappyHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : InlineResponse200ResponseHappyHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : InlineResponse200ResponseHappyHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : InlineResponse200ResponseHappyHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : InlineResponse200ResponseHappyHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : InlineResponse200ResponseHappyHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : InlineResponse200ResponseHappyHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function InlineResponse200ResponseHappyHoursToJSON(value?: InlineResponse200ResponseHappyHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': InlineResponse200ResponseHappyHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(InlineResponse200ResponseHappyHoursHolidayHoursToJSON)),
        'monday': InlineResponse200ResponseHappyHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': InlineResponse200ResponseHappyHoursSaturdayToJSON(value.saturday),
        'sunday': InlineResponse200ResponseHappyHoursSundayToJSON(value.sunday),
        'thursday': InlineResponse200ResponseHappyHoursThursdayToJSON(value.thursday),
        'tuesday': InlineResponse200ResponseHappyHoursTuesdayToJSON(value.tuesday),
        'wednesday': InlineResponse200ResponseHappyHoursWednesdayToJSON(value.wednesday),
    };
}


