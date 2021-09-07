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
 * @interface HotelWriteAllOfKitchenHoursFriday
 */
export interface HotelWriteAllOfKitchenHoursFriday {
    /**
     * Indicates if the kitchen hours are "closed" on Friday.
     * @type {boolean}
     * @memberof HotelWriteAllOfKitchenHoursFriday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity's kitchen is open on Friday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof HotelWriteAllOfKitchenHoursFriday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function HotelWriteAllOfKitchenHoursFridayFromJSON(json: any): HotelWriteAllOfKitchenHoursFriday {
    return HotelWriteAllOfKitchenHoursFridayFromJSONTyped(json, false);
}

export function HotelWriteAllOfKitchenHoursFridayFromJSONTyped(json: any, ignoreDiscriminator: boolean): HotelWriteAllOfKitchenHoursFriday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function HotelWriteAllOfKitchenHoursFridayToJSON(value?: HotelWriteAllOfKitchenHoursFriday | null): any {
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


