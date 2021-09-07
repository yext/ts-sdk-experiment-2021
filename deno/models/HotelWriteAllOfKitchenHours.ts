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
    HotelWriteAllOfKitchenHoursFriday,
    HotelWriteAllOfKitchenHoursFridayFromJSON,
    HotelWriteAllOfKitchenHoursFridayFromJSONTyped,
    HotelWriteAllOfKitchenHoursFridayToJSON,
    HotelWriteAllOfKitchenHoursHolidayHours,
    HotelWriteAllOfKitchenHoursHolidayHoursFromJSON,
    HotelWriteAllOfKitchenHoursHolidayHoursFromJSONTyped,
    HotelWriteAllOfKitchenHoursHolidayHoursToJSON,
    HotelWriteAllOfKitchenHoursMonday,
    HotelWriteAllOfKitchenHoursMondayFromJSON,
    HotelWriteAllOfKitchenHoursMondayFromJSONTyped,
    HotelWriteAllOfKitchenHoursMondayToJSON,
    HotelWriteAllOfKitchenHoursSaturday,
    HotelWriteAllOfKitchenHoursSaturdayFromJSON,
    HotelWriteAllOfKitchenHoursSaturdayFromJSONTyped,
    HotelWriteAllOfKitchenHoursSaturdayToJSON,
    HotelWriteAllOfKitchenHoursSunday,
    HotelWriteAllOfKitchenHoursSundayFromJSON,
    HotelWriteAllOfKitchenHoursSundayFromJSONTyped,
    HotelWriteAllOfKitchenHoursSundayToJSON,
    HotelWriteAllOfKitchenHoursThursday,
    HotelWriteAllOfKitchenHoursThursdayFromJSON,
    HotelWriteAllOfKitchenHoursThursdayFromJSONTyped,
    HotelWriteAllOfKitchenHoursThursdayToJSON,
    HotelWriteAllOfKitchenHoursTuesday,
    HotelWriteAllOfKitchenHoursTuesdayFromJSON,
    HotelWriteAllOfKitchenHoursTuesdayFromJSONTyped,
    HotelWriteAllOfKitchenHoursTuesdayToJSON,
    HotelWriteAllOfKitchenHoursWednesday,
    HotelWriteAllOfKitchenHoursWednesdayFromJSON,
    HotelWriteAllOfKitchenHoursWednesdayFromJSONTyped,
    HotelWriteAllOfKitchenHoursWednesdayToJSON,
} from './index.ts';

/**
 * Contains the daily kitchen hours, holiday kitchen hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `kitchenHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday kitchen hours are represented by the `holidayHours` sub-field.
 * Setting the `reopenDate` sub-field indicates that the business is temporarily closed and will reopen on the specified date.
 * SPECIAL CASES:
 * * To indicate that an Entity is open 24 hours on a specific day, set start to 00:00 and end to 23:59 in `openIntervals` for that day.
 * * To indicate that an Entity has split hours on specific day (e.g., open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM), supply up to two `openIntervals` values with non-overlapping sets of hours.
 * * If you are providing `openIntervals`, you may not set `isClosed` to true for that day.
 * @export
 * @interface HotelWriteAllOfKitchenHours
 */
export interface HotelWriteAllOfKitchenHours {
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursFriday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    friday?: HotelWriteAllOfKitchenHoursFriday;
    /**
     * 
     * **NOTE:** The list of Holiday Hours that you send us must be comprehensive. For example, if you send us a list of Holiday Hours that does not include Holiday Hours that you sent in your last update, Yext considers the missing Holiday Hours to be deleted, and we remove them.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<HotelWriteAllOfKitchenHoursHolidayHours>}
     * @memberof HotelWriteAllOfKitchenHours
     */
    holidayHours?: Set<HotelWriteAllOfKitchenHoursHolidayHours>;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursMonday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    monday?: HotelWriteAllOfKitchenHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * @type {Date}
     * @memberof HotelWriteAllOfKitchenHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursSaturday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    saturday?: HotelWriteAllOfKitchenHoursSaturday;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursSunday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    sunday?: HotelWriteAllOfKitchenHoursSunday;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursThursday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    thursday?: HotelWriteAllOfKitchenHoursThursday;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursTuesday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    tuesday?: HotelWriteAllOfKitchenHoursTuesday;
    /**
     * 
     * @type {HotelWriteAllOfKitchenHoursWednesday}
     * @memberof HotelWriteAllOfKitchenHours
     */
    wednesday?: HotelWriteAllOfKitchenHoursWednesday;
}

export function HotelWriteAllOfKitchenHoursFromJSON(json: any): HotelWriteAllOfKitchenHours {
    return HotelWriteAllOfKitchenHoursFromJSONTyped(json, false);
}

export function HotelWriteAllOfKitchenHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): HotelWriteAllOfKitchenHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : HotelWriteAllOfKitchenHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(HotelWriteAllOfKitchenHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : HotelWriteAllOfKitchenHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : HotelWriteAllOfKitchenHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : HotelWriteAllOfKitchenHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : HotelWriteAllOfKitchenHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : HotelWriteAllOfKitchenHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : HotelWriteAllOfKitchenHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function HotelWriteAllOfKitchenHoursToJSON(value?: HotelWriteAllOfKitchenHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': HotelWriteAllOfKitchenHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(HotelWriteAllOfKitchenHoursHolidayHoursToJSON)),
        'monday': HotelWriteAllOfKitchenHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': HotelWriteAllOfKitchenHoursSaturdayToJSON(value.saturday),
        'sunday': HotelWriteAllOfKitchenHoursSundayToJSON(value.sunday),
        'thursday': HotelWriteAllOfKitchenHoursThursdayToJSON(value.thursday),
        'tuesday': HotelWriteAllOfKitchenHoursTuesdayToJSON(value.tuesday),
        'wednesday': HotelWriteAllOfKitchenHoursWednesdayToJSON(value.wednesday),
    };
}

