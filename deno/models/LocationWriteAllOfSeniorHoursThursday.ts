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
 * @interface LocationWriteAllOfSeniorHoursThursday
 */
export interface LocationWriteAllOfSeniorHoursThursday {
    /**
     * Indicates if the senior hours are "closed" on Thursday.
     * @type {boolean}
     * @memberof LocationWriteAllOfSeniorHoursThursday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for the Entity's senior hours on Thursday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * @type {Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>}
     * @memberof LocationWriteAllOfSeniorHoursThursday
     */
    openIntervals?: Array<AtmWriteAllOfAccessHoursFridayOpenIntervals>;
}

export function LocationWriteAllOfSeniorHoursThursdayFromJSON(json: any): LocationWriteAllOfSeniorHoursThursday {
    return LocationWriteAllOfSeniorHoursThursdayFromJSONTyped(json, false);
}

export function LocationWriteAllOfSeniorHoursThursdayFromJSONTyped(json: any, ignoreDiscriminator: boolean): LocationWriteAllOfSeniorHoursThursday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(AtmWriteAllOfAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function LocationWriteAllOfSeniorHoursThursdayToJSON(value?: LocationWriteAllOfSeniorHoursThursday | null): any {
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


