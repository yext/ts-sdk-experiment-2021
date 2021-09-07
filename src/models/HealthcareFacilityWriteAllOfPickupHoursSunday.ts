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
 * @interface HealthcareFacilityWriteAllOfPickupHoursSunday
 */
export interface HealthcareFacilityWriteAllOfPickupHoursSunday {
    /**
     * Indicates if the pickup hours are "closed" on Sunday.
     * @type {boolean}
     * @memberof HealthcareFacilityWriteAllOfPickupHoursSunday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for pickup on Sunday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof HealthcareFacilityWriteAllOfPickupHoursSunday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function HealthcareFacilityWriteAllOfPickupHoursSundayFromJSON(json: any): HealthcareFacilityWriteAllOfPickupHoursSunday {
    return HealthcareFacilityWriteAllOfPickupHoursSundayFromJSONTyped(json, false);
}

export function HealthcareFacilityWriteAllOfPickupHoursSundayFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthcareFacilityWriteAllOfPickupHoursSunday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function HealthcareFacilityWriteAllOfPickupHoursSundayToJSON(value?: HealthcareFacilityWriteAllOfPickupHoursSunday | null): any {
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


