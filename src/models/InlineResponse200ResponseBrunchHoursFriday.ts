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
    InlineResponse200ResponseAccessHoursFridayOpenIntervals,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSONTyped,
    InlineResponse200ResponseAccessHoursFridayOpenIntervalsToJSON,
} from './';

/**
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseBrunchHoursFriday
 */
export interface InlineResponse200ResponseBrunchHoursFriday {
    /**
     * Indicates if the brunch hours are "closed" on Friday.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseBrunchHoursFriday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for which the Entity is open for brunch on Friday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * 
     * Filtering Type: `list of object`
     * @type {Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>}
     * @memberof InlineResponse200ResponseBrunchHoursFriday
     */
    openIntervals?: Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>;
}

export function InlineResponse200ResponseBrunchHoursFridayFromJSON(json: any): InlineResponse200ResponseBrunchHoursFriday {
    return InlineResponse200ResponseBrunchHoursFridayFromJSONTyped(json, false);
}

export function InlineResponse200ResponseBrunchHoursFridayFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseBrunchHoursFriday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function InlineResponse200ResponseBrunchHoursFridayToJSON(value?: InlineResponse200ResponseBrunchHoursFriday | null): any {
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


