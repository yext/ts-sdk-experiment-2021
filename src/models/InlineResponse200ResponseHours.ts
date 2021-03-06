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
    InlineResponse200ResponseHoursFriday,
    InlineResponse200ResponseHoursFridayFromJSON,
    InlineResponse200ResponseHoursFridayFromJSONTyped,
    InlineResponse200ResponseHoursFridayToJSON,
    InlineResponse200ResponseHoursHolidayHours,
    InlineResponse200ResponseHoursHolidayHoursFromJSON,
    InlineResponse200ResponseHoursHolidayHoursFromJSONTyped,
    InlineResponse200ResponseHoursHolidayHoursToJSON,
    InlineResponse200ResponseHoursMonday,
    InlineResponse200ResponseHoursMondayFromJSON,
    InlineResponse200ResponseHoursMondayFromJSONTyped,
    InlineResponse200ResponseHoursMondayToJSON,
    InlineResponse200ResponseHoursSaturday,
    InlineResponse200ResponseHoursSaturdayFromJSON,
    InlineResponse200ResponseHoursSaturdayFromJSONTyped,
    InlineResponse200ResponseHoursSaturdayToJSON,
    InlineResponse200ResponseHoursSunday,
    InlineResponse200ResponseHoursSundayFromJSON,
    InlineResponse200ResponseHoursSundayFromJSONTyped,
    InlineResponse200ResponseHoursSundayToJSON,
    InlineResponse200ResponseHoursThursday,
    InlineResponse200ResponseHoursThursdayFromJSON,
    InlineResponse200ResponseHoursThursdayFromJSONTyped,
    InlineResponse200ResponseHoursThursdayToJSON,
    InlineResponse200ResponseHoursTuesday,
    InlineResponse200ResponseHoursTuesdayFromJSON,
    InlineResponse200ResponseHoursTuesdayFromJSONTyped,
    InlineResponse200ResponseHoursTuesdayToJSON,
    InlineResponse200ResponseHoursWednesday,
    InlineResponse200ResponseHoursWednesdayFromJSON,
    InlineResponse200ResponseHoursWednesdayFromJSONTyped,
    InlineResponse200ResponseHoursWednesdayToJSON,
} from './';

/**
 * Contains the daily hours, holiday hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `hours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday hours are represented by the `holidayHours` sub-field.
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
 *    * atm
 *    * contactCard
 *    * financialProfessional
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseHours
 */
export interface InlineResponse200ResponseHours {
    /**
     * 
     * @type {InlineResponse200ResponseHoursFriday}
     * @memberof InlineResponse200ResponseHours
     */
    friday?: InlineResponse200ResponseHoursFriday;
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
     * @type {Set<InlineResponse200ResponseHoursHolidayHours>}
     * @memberof InlineResponse200ResponseHours
     */
    holidayHours?: Set<InlineResponse200ResponseHoursHolidayHours>;
    /**
     * 
     * @type {InlineResponse200ResponseHoursMonday}
     * @memberof InlineResponse200ResponseHours
     */
    monday?: InlineResponse200ResponseHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * 
     * Filtering Type: `date`
     * @type {Date}
     * @memberof InlineResponse200ResponseHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {InlineResponse200ResponseHoursSaturday}
     * @memberof InlineResponse200ResponseHours
     */
    saturday?: InlineResponse200ResponseHoursSaturday;
    /**
     * 
     * @type {InlineResponse200ResponseHoursSunday}
     * @memberof InlineResponse200ResponseHours
     */
    sunday?: InlineResponse200ResponseHoursSunday;
    /**
     * 
     * @type {InlineResponse200ResponseHoursThursday}
     * @memberof InlineResponse200ResponseHours
     */
    thursday?: InlineResponse200ResponseHoursThursday;
    /**
     * 
     * @type {InlineResponse200ResponseHoursTuesday}
     * @memberof InlineResponse200ResponseHours
     */
    tuesday?: InlineResponse200ResponseHoursTuesday;
    /**
     * 
     * @type {InlineResponse200ResponseHoursWednesday}
     * @memberof InlineResponse200ResponseHours
     */
    wednesday?: InlineResponse200ResponseHoursWednesday;
}

export function InlineResponse200ResponseHoursFromJSON(json: any): InlineResponse200ResponseHours {
    return InlineResponse200ResponseHoursFromJSONTyped(json, false);
}

export function InlineResponse200ResponseHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : InlineResponse200ResponseHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(InlineResponse200ResponseHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : InlineResponse200ResponseHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : InlineResponse200ResponseHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : InlineResponse200ResponseHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : InlineResponse200ResponseHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : InlineResponse200ResponseHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : InlineResponse200ResponseHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function InlineResponse200ResponseHoursToJSON(value?: InlineResponse200ResponseHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': InlineResponse200ResponseHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(InlineResponse200ResponseHoursHolidayHoursToJSON)),
        'monday': InlineResponse200ResponseHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': InlineResponse200ResponseHoursSaturdayToJSON(value.saturday),
        'sunday': InlineResponse200ResponseHoursSundayToJSON(value.sunday),
        'thursday': InlineResponse200ResponseHoursThursdayToJSON(value.thursday),
        'tuesday': InlineResponse200ResponseHoursTuesdayToJSON(value.tuesday),
        'wednesday': InlineResponse200ResponseHoursWednesdayToJSON(value.wednesday),
    };
}


