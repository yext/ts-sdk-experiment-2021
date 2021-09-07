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
    HealthcareFacilityWriteAllOfVideo,
    HealthcareFacilityWriteAllOfVideoFromJSON,
    HealthcareFacilityWriteAllOfVideoFromJSONTyped,
    HealthcareFacilityWriteAllOfVideoToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface HealthcareFacilityWriteAllOfVideos
 */
export interface HealthcareFacilityWriteAllOfVideos {
    /**
     * 
     * Cannot Include:
     * * HTML markup
     * @type {string}
     * @memberof HealthcareFacilityWriteAllOfVideos
     */
    description?: string;
    /**
     * 
     * @type {HealthcareFacilityWriteAllOfVideo}
     * @memberof HealthcareFacilityWriteAllOfVideos
     */
    video: HealthcareFacilityWriteAllOfVideo;
}

export function HealthcareFacilityWriteAllOfVideosFromJSON(json: any): HealthcareFacilityWriteAllOfVideos {
    return HealthcareFacilityWriteAllOfVideosFromJSONTyped(json, false);
}

export function HealthcareFacilityWriteAllOfVideosFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthcareFacilityWriteAllOfVideos {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'video': HealthcareFacilityWriteAllOfVideoFromJSON(json['video']),
    };
}

export function HealthcareFacilityWriteAllOfVideosToJSON(value?: HealthcareFacilityWriteAllOfVideos | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'video': HealthcareFacilityWriteAllOfVideoToJSON(value.video),
    };
}

