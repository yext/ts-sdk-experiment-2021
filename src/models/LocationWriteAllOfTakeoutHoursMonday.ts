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
 * @interface LocationWriteAllOfTakeoutHoursMonday
 */
export interface LocationWriteAllOfTakeoutHoursMonday {
    /**
     * Indicates if the takeout hours are "closed" on Monday.
     * @type {boolean}
     * @memberof LocationWriteAllOfTakeoutHoursMonday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for takeout on Monday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof LocationWriteAllOfTakeoutHoursMonday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function LocationWriteAllOfTakeoutHoursMondayFromJSON(json: any): LocationWriteAllOfTakeoutHoursMonday {
    return LocationWriteAllOfTakeoutHoursMondayFromJSONTyped(json, false);
}

export function LocationWriteAllOfTakeoutHoursMondayFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationWriteAllOfTakeoutHoursMonday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function LocationWriteAllOfTakeoutHoursMondayToJSON(value?: LocationWriteAllOfTakeoutHoursMonday | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isClosed': value.isClosed,
        'openIntervals': value.openIntervals === undefined ? undefined : ((value.openIntervals as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsToJSON)),
    };
}


