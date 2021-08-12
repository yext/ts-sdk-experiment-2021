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
    InlineResponse200ResponseAccessHoursFridayOpenIntervals,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSONTyped,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON,
} from './index.ts';

/**
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseOnlineServiceHoursMonday
 */
export interface InlineResponse200ResponseOnlineServiceHoursMonday {
    /**
     * Indicates if the online service hours are "closed" on Monday.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseOnlineServiceHoursMonday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for the Entity's online service hours on Monday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * 
     * Filtering Type: `list of object`
     * @type {Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>}
     * @memberof InlineResponse200ResponseOnlineServiceHoursMonday
     */
    openIntervals?: Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>;
}

export function InlineResponse200ResponseOnlineServiceHoursMondayFromJSON(json: any): InlineResponse200ResponseOnlineServiceHoursMonday {
    return InlineResponse200ResponseOnlineServiceHoursMondayFromJSONTyped(json, false);
}

export function InlineResponse200ResponseOnlineServiceHoursMondayFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseOnlineServiceHoursMonday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function InlineResponse200ResponseOnlineServiceHoursMondayToJSON(value?: InlineResponse200ResponseOnlineServiceHoursMonday | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isClosed': value.isClosed,
        'openIntervals': value.openIntervals === undefined ? undefined : ((value.openIntervals as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON)),
    };
}


