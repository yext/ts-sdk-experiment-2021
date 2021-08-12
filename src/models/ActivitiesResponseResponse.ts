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
    Activity,
    ActivityFromJSON,
    ActivityFromJSONTyped,
    ActivityToJSON,
} from './';

/**
 * 
 * @export
 * @interface ActivitiesResponseResponse
 */
export interface ActivitiesResponseResponse {
    /**
     * Total number of activities that meet the filter criteria (ignores limit / offset)
     * @type {number}
     * @memberof ActivitiesResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Activity>}
     * @memberof ActivitiesResponseResponse
     */
    activities?: Array<Activity>;
}

export function ActivitiesResponseResponseFromJSON(json: any): ActivitiesResponseResponse {
    return ActivitiesResponseResponseFromJSONTyped(json, false);
}

export function ActivitiesResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActivitiesResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'activities': !exists(json, 'activities') ? undefined : ((json['activities'] as Array<any>).map(ActivityFromJSON)),
    };
}

export function ActivitiesResponseResponseToJSON(value?: ActivitiesResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'activities': value.activities === undefined ? undefined : ((value.activities as Array<any>).map(ActivityToJSON)),
    };
}


