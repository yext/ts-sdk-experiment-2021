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
    CommonEclDefinitionsPhoto,
    CommonEclDefinitionsPhotoFromJSON,
    CommonEclDefinitionsPhotoFromJSONTyped,
    CommonEclDefinitionsPhotoToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface EventItemAllOf
 */
export interface EventItemAllOf {
    /**
     * User-provided event type.
     * @type {string}
     * @memberof EventItemAllOf
     */
    type?: string;
    /**
     * Start time in ISO 8601 format (yyyy-mm-ddThh:mm) (e.g., 2012-01-09T04:00).
     * @type {Date}
     * @memberof EventItemAllOf
     */
    starts?: Date;
    /**
     * End time in ISO 8601 format (yyyy-mm-ddThh:mm) (e.g., 2012-01-09T05:00).
     * @type {Date}
     * @memberof EventItemAllOf
     */
    ends?: Date;
    /**
     * List of up to 5 photos.
     * @type {Array<CommonEclDefinitionsPhoto>}
     * @memberof EventItemAllOf
     */
    photos?: Array<CommonEclDefinitionsPhoto>;
    /**
     * Item URL.
     * @type {string}
     * @memberof EventItemAllOf
     */
    url?: string;
    /**
     * Youtube URL.
     * @type {string}
     * @memberof EventItemAllOf
     */
    video?: string;
}

export function EventItemAllOfFromJSON(json: any): EventItemAllOf {
    return EventItemAllOfFromJSONTyped(json, false);
}

export function EventItemAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventItemAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'starts': !exists(json, 'starts') ? undefined : (new Date(json['starts'])),
        'ends': !exists(json, 'ends') ? undefined : (new Date(json['ends'])),
        'photos': !exists(json, 'photos') ? undefined : ((json['photos'] as Array<any>).map(CommonEclDefinitionsPhotoFromJSON)),
        'url': !exists(json, 'url') ? undefined : json['url'],
        'video': !exists(json, 'video') ? undefined : json['video'],
    };
}

export function EventItemAllOfToJSON(value?: EventItemAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'starts': value.starts === undefined ? undefined : (value.starts.toISOString().substr(0,10)),
        'ends': value.ends === undefined ? undefined : (value.ends.toISOString().substr(0,10)),
        'photos': value.photos === undefined ? undefined : ((value.photos as Array<any>).map(CommonEclDefinitionsPhotoToJSON)),
        'url': value.url,
        'video': value.video,
    };
}


