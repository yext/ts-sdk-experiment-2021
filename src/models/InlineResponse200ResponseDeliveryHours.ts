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
    InlineResponse200ResponseDeliveryHoursFriday,
    InlineResponse200ResponseDeliveryHoursFridayFromJSON,
    InlineResponse200ResponseDeliveryHoursFridayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursFridayToJSON,
    InlineResponse200ResponseDeliveryHoursHolidayHours,
    InlineResponse200ResponseDeliveryHoursHolidayHoursFromJSON,
    InlineResponse200ResponseDeliveryHoursHolidayHoursFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursHolidayHoursToJSON,
    InlineResponse200ResponseDeliveryHoursMonday,
    InlineResponse200ResponseDeliveryHoursMondayFromJSON,
    InlineResponse200ResponseDeliveryHoursMondayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursMondayToJSON,
    InlineResponse200ResponseDeliveryHoursSaturday,
    InlineResponse200ResponseDeliveryHoursSaturdayFromJSON,
    InlineResponse200ResponseDeliveryHoursSaturdayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursSaturdayToJSON,
    InlineResponse200ResponseDeliveryHoursSunday,
    InlineResponse200ResponseDeliveryHoursSundayFromJSON,
    InlineResponse200ResponseDeliveryHoursSundayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursSundayToJSON,
    InlineResponse200ResponseDeliveryHoursThursday,
    InlineResponse200ResponseDeliveryHoursThursdayFromJSON,
    InlineResponse200ResponseDeliveryHoursThursdayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursThursdayToJSON,
    InlineResponse200ResponseDeliveryHoursTuesday,
    InlineResponse200ResponseDeliveryHoursTuesdayFromJSON,
    InlineResponse200ResponseDeliveryHoursTuesdayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursTuesdayToJSON,
    InlineResponse200ResponseDeliveryHoursWednesday,
    InlineResponse200ResponseDeliveryHoursWednesdayFromJSON,
    InlineResponse200ResponseDeliveryHoursWednesdayFromJSONTyped,
    InlineResponse200ResponseDeliveryHoursWednesdayToJSON,
} from './';

/**
 * Contains the daily delivery hours, holiday delivery hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `deliveryHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday delivery hours are represented by the `holidayHours` sub-field.
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
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseDeliveryHours
 */
export interface InlineResponse200ResponseDeliveryHours {
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursFriday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    friday?: InlineResponse200ResponseDeliveryHoursFriday;
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
     * @type {Set<InlineResponse200ResponseDeliveryHoursHolidayHours>}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    holidayHours?: Set<InlineResponse200ResponseDeliveryHoursHolidayHours>;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursMonday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    monday?: InlineResponse200ResponseDeliveryHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * 
     * Filtering Type: `date`
     * @type {Date}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursSaturday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    saturday?: InlineResponse200ResponseDeliveryHoursSaturday;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursSunday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    sunday?: InlineResponse200ResponseDeliveryHoursSunday;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursThursday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    thursday?: InlineResponse200ResponseDeliveryHoursThursday;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursTuesday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    tuesday?: InlineResponse200ResponseDeliveryHoursTuesday;
    /**
     * 
     * @type {InlineResponse200ResponseDeliveryHoursWednesday}
     * @memberof InlineResponse200ResponseDeliveryHours
     */
    wednesday?: InlineResponse200ResponseDeliveryHoursWednesday;
}

export function InlineResponse200ResponseDeliveryHoursFromJSON(json: any): InlineResponse200ResponseDeliveryHours {
    return InlineResponse200ResponseDeliveryHoursFromJSONTyped(json, false);
}

export function InlineResponse200ResponseDeliveryHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseDeliveryHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : InlineResponse200ResponseDeliveryHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(InlineResponse200ResponseDeliveryHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : InlineResponse200ResponseDeliveryHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : InlineResponse200ResponseDeliveryHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : InlineResponse200ResponseDeliveryHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : InlineResponse200ResponseDeliveryHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : InlineResponse200ResponseDeliveryHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : InlineResponse200ResponseDeliveryHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function InlineResponse200ResponseDeliveryHoursToJSON(value?: InlineResponse200ResponseDeliveryHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': InlineResponse200ResponseDeliveryHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(InlineResponse200ResponseDeliveryHoursHolidayHoursToJSON)),
        'monday': InlineResponse200ResponseDeliveryHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': InlineResponse200ResponseDeliveryHoursSaturdayToJSON(value.saturday),
        'sunday': InlineResponse200ResponseDeliveryHoursSundayToJSON(value.sunday),
        'thursday': InlineResponse200ResponseDeliveryHoursThursdayToJSON(value.thursday),
        'tuesday': InlineResponse200ResponseDeliveryHoursTuesdayToJSON(value.tuesday),
        'wednesday': InlineResponse200ResponseDeliveryHoursWednesdayToJSON(value.wednesday),
    };
}


