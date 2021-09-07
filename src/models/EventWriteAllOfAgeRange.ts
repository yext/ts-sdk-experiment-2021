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
/**
 * Contains the age range for the event
 * @export
 * @interface EventWriteAllOfAgeRange
 */
export interface EventWriteAllOfAgeRange {
    /**
     * Maximum age for the event
     * @type {number}
     * @memberof EventWriteAllOfAgeRange
     */
    maxValue?: number;
    /**
     * Minimum age for the event
     * @type {number}
     * @memberof EventWriteAllOfAgeRange
     */
    minValue?: number;
}

export function EventWriteAllOfAgeRangeFromJSON(json: any): EventWriteAllOfAgeRange {
    return EventWriteAllOfAgeRangeFromJSONTyped(json, false);
}

export function EventWriteAllOfAgeRangeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventWriteAllOfAgeRange {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxValue': !exists(json, 'maxValue') ? undefined : json['maxValue'],
        'minValue': !exists(json, 'minValue') ? undefined : json['minValue'],
    };
}

export function EventWriteAllOfAgeRangeToJSON(value?: EventWriteAllOfAgeRange | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxValue': value.maxValue,
        'minValue': value.minValue,
    };
}


