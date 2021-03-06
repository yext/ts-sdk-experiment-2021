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
 * @interface HotelWriteAllOfBrunchHoursFriday
 */
export interface HotelWriteAllOfBrunchHoursFriday {
    /**
     * Indicates if the brunch hours are "closed" on Friday.
     * @type {boolean}
     * @memberof HotelWriteAllOfBrunchHoursFriday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for brunch on Friday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof HotelWriteAllOfBrunchHoursFriday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function HotelWriteAllOfBrunchHoursFridayFromJSON(json: any): HotelWriteAllOfBrunchHoursFriday {
    return HotelWriteAllOfBrunchHoursFridayFromJSONTyped(json, false);
}

export function HotelWriteAllOfBrunchHoursFridayFromJSONTyped(json: any, ignoreDiscriminator: boolean): HotelWriteAllOfBrunchHoursFriday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function HotelWriteAllOfBrunchHoursFridayToJSON(value?: HotelWriteAllOfBrunchHoursFriday | null): any {
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


