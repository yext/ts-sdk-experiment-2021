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
 * @interface HotelWriteAllOfHappyHoursTuesday
 */
export interface HotelWriteAllOfHappyHoursTuesday {
    /**
     * Indicates if the happy hours are "closed" on Tuesday.
     * @type {boolean}
     * @memberof HotelWriteAllOfHappyHoursTuesday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for the Entity's happy hours on Tuesday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof HotelWriteAllOfHappyHoursTuesday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function HotelWriteAllOfHappyHoursTuesdayFromJSON(json: any): HotelWriteAllOfHappyHoursTuesday {
    return HotelWriteAllOfHappyHoursTuesdayFromJSONTyped(json, false);
}

export function HotelWriteAllOfHappyHoursTuesdayFromJSONTyped(json: any, ignoreDiscriminator: boolean): HotelWriteAllOfHappyHoursTuesday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function HotelWriteAllOfHappyHoursTuesdayToJSON(value?: HotelWriteAllOfHappyHoursTuesday | null): any {
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


