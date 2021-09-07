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
    AtmWriteAllOfAccessHoursFriday,
    AtmWriteAllOfAccessHoursFridayFromJSON,
    AtmWriteAllOfAccessHoursFridayFromJSONTyped,
    AtmWriteAllOfAccessHoursFridayToJSON,
    AtmWriteAllOfAccessHoursHolidayHours,
    AtmWriteAllOfAccessHoursHolidayHoursFromJSON,
    AtmWriteAllOfAccessHoursHolidayHoursFromJSONTyped,
    AtmWriteAllOfAccessHoursHolidayHoursToJSON,
    AtmWriteAllOfAccessHoursMonday,
    AtmWriteAllOfAccessHoursMondayFromJSON,
    AtmWriteAllOfAccessHoursMondayFromJSONTyped,
    AtmWriteAllOfAccessHoursMondayToJSON,
    AtmWriteAllOfAccessHoursSaturday,
    AtmWriteAllOfAccessHoursSaturdayFromJSON,
    AtmWriteAllOfAccessHoursSaturdayFromJSONTyped,
    AtmWriteAllOfAccessHoursSaturdayToJSON,
    AtmWriteAllOfAccessHoursSunday,
    AtmWriteAllOfAccessHoursSundayFromJSON,
    AtmWriteAllOfAccessHoursSundayFromJSONTyped,
    AtmWriteAllOfAccessHoursSundayToJSON,
    AtmWriteAllOfAccessHoursThursday,
    AtmWriteAllOfAccessHoursThursdayFromJSON,
    AtmWriteAllOfAccessHoursThursdayFromJSONTyped,
    AtmWriteAllOfAccessHoursThursdayToJSON,
    AtmWriteAllOfAccessHoursTuesday,
    AtmWriteAllOfAccessHoursTuesdayFromJSON,
    AtmWriteAllOfAccessHoursTuesdayFromJSONTyped,
    AtmWriteAllOfAccessHoursTuesdayToJSON,
    AtmWriteAllOfAccessHoursWednesday,
    AtmWriteAllOfAccessHoursWednesdayFromJSON,
    AtmWriteAllOfAccessHoursWednesdayFromJSONTyped,
    AtmWriteAllOfAccessHoursWednesdayToJSON,
} from './';

/**
 * Contains the daily access hours, holiday access hours, and reopen date for the Entity.
 * 
 * Each day is represented by a sub-field of `accessHours`. (e.g. `monday`, `tuesday`, etc.) Open times can be specified per day through the `openIntervals` field and the `isClosed` flag.
 * Similarly, holiday access hours are represented by the `holidayHours` sub-field.
 * Setting the `reopenDate` sub-field indicates that the business is temporarily closed and will reopen on the specified date.
 * SPECIAL CASES:
 * * To indicate that an Entity is open 24 hours on a specific day, set start to 00:00 and end to 23:59 in `openIntervals` for that day.
 * * To indicate that an Entity has split hours on specific day (e.g., open from 9:00 AM to 12:00 PM and again from 1:00 PM to 5:00 PM), supply up to two `openIntervals` values with non-overlapping sets of hours.
 * * If you are providing `openIntervals`, you may not set `isClosed` to true for that day.
 * @export
 * @interface AtmWriteAllOfAccessHours
 */
export interface AtmWriteAllOfAccessHours {
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursFriday}
     * @memberof AtmWriteAllOfAccessHours
     */
    friday?: AtmWriteAllOfAccessHoursFriday;
    /**
     * 
     * **NOTE:** The list of Holiday Hours that you send us must be comprehensive. For example, if you send us a list of Holiday Hours that does not include Holiday Hours that you sent in your last update, Yext considers the missing Holiday Hours to be deleted, and we remove them.
     * 
     * 
     * 
     * Array must be ordered.
     * @type {Set<AtmWriteAllOfAccessHoursHolidayHours>}
     * @memberof AtmWriteAllOfAccessHours
     */
    holidayHours?: Set<AtmWriteAllOfAccessHoursHolidayHours>;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursMonday}
     * @memberof AtmWriteAllOfAccessHours
     */
    monday?: AtmWriteAllOfAccessHoursMonday;
    /**
     * 
     * Date must be on or after 1970-01-01
     * Date must be before or on 2038-01-01
     * @type {Date}
     * @memberof AtmWriteAllOfAccessHours
     */
    reopenDate?: Date;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursSaturday}
     * @memberof AtmWriteAllOfAccessHours
     */
    saturday?: AtmWriteAllOfAccessHoursSaturday;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursSunday}
     * @memberof AtmWriteAllOfAccessHours
     */
    sunday?: AtmWriteAllOfAccessHoursSunday;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursThursday}
     * @memberof AtmWriteAllOfAccessHours
     */
    thursday?: AtmWriteAllOfAccessHoursThursday;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursTuesday}
     * @memberof AtmWriteAllOfAccessHours
     */
    tuesday?: AtmWriteAllOfAccessHoursTuesday;
    /**
     * 
     * @type {AtmWriteAllOfAccessHoursWednesday}
     * @memberof AtmWriteAllOfAccessHours
     */
    wednesday?: AtmWriteAllOfAccessHoursWednesday;
}

export function AtmWriteAllOfAccessHoursFromJSON(json: any): AtmWriteAllOfAccessHours {
    return AtmWriteAllOfAccessHoursFromJSONTyped(json, false);
}

export function AtmWriteAllOfAccessHoursFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfAccessHours {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'friday': !exists(json, 'friday') ? undefined : AtmWriteAllOfAccessHoursFridayFromJSON(json['friday']),
        'holidayHours': !exists(json, 'holidayHours') ? undefined : (new Set((json['holidayHours'] as Array<any>).map(AtmWriteAllOfAccessHoursHolidayHoursFromJSON))),
        'monday': !exists(json, 'monday') ? undefined : AtmWriteAllOfAccessHoursMondayFromJSON(json['monday']),
        'reopenDate': !exists(json, 'reopenDate') ? undefined : (new Date(json['reopenDate'])),
        'saturday': !exists(json, 'saturday') ? undefined : AtmWriteAllOfAccessHoursSaturdayFromJSON(json['saturday']),
        'sunday': !exists(json, 'sunday') ? undefined : AtmWriteAllOfAccessHoursSundayFromJSON(json['sunday']),
        'thursday': !exists(json, 'thursday') ? undefined : AtmWriteAllOfAccessHoursThursdayFromJSON(json['thursday']),
        'tuesday': !exists(json, 'tuesday') ? undefined : AtmWriteAllOfAccessHoursTuesdayFromJSON(json['tuesday']),
        'wednesday': !exists(json, 'wednesday') ? undefined : AtmWriteAllOfAccessHoursWednesdayFromJSON(json['wednesday']),
    };
}

export function AtmWriteAllOfAccessHoursToJSON(value?: AtmWriteAllOfAccessHours | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'friday': AtmWriteAllOfAccessHoursFridayToJSON(value.friday),
        'holidayHours': value.holidayHours === undefined ? undefined : (Array.from(value.holidayHours as Set<any>).map(AtmWriteAllOfAccessHoursHolidayHoursToJSON)),
        'monday': AtmWriteAllOfAccessHoursMondayToJSON(value.monday),
        'reopenDate': value.reopenDate === undefined ? undefined : (value.reopenDate.toISOString().substr(0,10)),
        'saturday': AtmWriteAllOfAccessHoursSaturdayToJSON(value.saturday),
        'sunday': AtmWriteAllOfAccessHoursSundayToJSON(value.sunday),
        'thursday': AtmWriteAllOfAccessHoursThursdayToJSON(value.thursday),
        'tuesday': AtmWriteAllOfAccessHoursTuesdayToJSON(value.tuesday),
        'wednesday': AtmWriteAllOfAccessHoursWednesdayToJSON(value.wednesday),
    };
}


