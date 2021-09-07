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
    AtmWriteAllOfAccessHoursFridayOpenIntervals,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSONTyped,
    AtmWriteAllOfAccessHoursFridayOpenIntervalsToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface HotelWriteAllOfBrunchHoursSaturday
 */
export interface HotelWriteAllOfBrunchHoursSaturday {
    /**
     * Indicates if the brunch hours are "closed" on Saturday.
     * @type {boolean}
     * @memberof HotelWriteAllOfBrunchHoursSaturday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for brunch on Saturday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof HotelWriteAllOfBrunchHoursSaturday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function HotelWriteAllOfBrunchHoursSaturdayFromJSON(json: any): HotelWriteAllOfBrunchHoursSaturday {
    return HotelWriteAllOfBrunchHoursSaturdayFromJSONTyped(json, false);
}

export function HotelWriteAllOfBrunchHoursSaturdayFromJSONTyped(json: any, ignoreDiscriminator: boolean): HotelWriteAllOfBrunchHoursSaturday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function HotelWriteAllOfBrunchHoursSaturdayToJSON(value?: HotelWriteAllOfBrunchHoursSaturday | null): any {
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


