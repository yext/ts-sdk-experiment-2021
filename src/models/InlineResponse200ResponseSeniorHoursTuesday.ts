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
 * @interface InlineResponse200ResponseSeniorHoursTuesday
 */
export interface InlineResponse200ResponseSeniorHoursTuesday {
    /**
     * Indicates if the senior hours are "closed" on Tuesday.
     * 
     * Filtering Type: `boolean`
     * @type {boolean}
     * @memberof InlineResponse200ResponseSeniorHoursTuesday
     */
    isClosed?: boolean;
    /**
     * Contains the time intervals for the Entity's senior hours on Tuesday. Note that if isClosed is set to true, "openIntervals" cannot be provided in an update.
     * 
     * Filtering Type: `list of object`
     * @type {Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>}
     * @memberof InlineResponse200ResponseSeniorHoursTuesday
     */
    openIntervals?: Array<InlineResponse200ResponseAccessHoursFridayOpenIntervals>;
}

export function InlineResponse200ResponseSeniorHoursTuesdayFromJSON(json: any): InlineResponse200ResponseSeniorHoursTuesday {
    return InlineResponse200ResponseSeniorHoursTuesdayFromJSONTyped(json, false);
}

export function InlineResponse200ResponseSeniorHoursTuesdayFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseSeniorHoursTuesday {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isClosed': !exists(json, 'isClosed') ? undefined : json['isClosed'],
        'openIntervals': !exists(json, 'openIntervals') ? undefined : ((json['openIntervals'] as Array<any>).map(InlineResponse200ResponseAccessHoursFridayOpenIntervalsFromJSON)),
    };
}

export function InlineResponse200ResponseSeniorHoursTuesdayToJSON(value?: InlineResponse200ResponseSeniorHoursTuesday | null): any {
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


