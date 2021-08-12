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
    BaseEclItem,
    BaseEclItemFromJSON,
    BaseEclItemFromJSONTyped,
    BaseEclItemToJSON,
    CommonEclDefinitionsPhoto,
    CommonEclDefinitionsPhotoFromJSON,
    CommonEclDefinitionsPhotoFromJSONTyped,
    CommonEclDefinitionsPhotoToJSON,
    EventItemAllOf,
    EventItemAllOfFromJSON,
    EventItemAllOfFromJSONTyped,
    EventItemAllOfToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface EventItem
 */
export interface EventItem {
    /**
     * Item ID.
     * @type {string}
     * @memberof EventItem
     */
    id?: string;
    /**
     * Item name.
     * @type {string}
     * @memberof EventItem
     */
    name?: string;
    /**
     * Item description.
     * @type {string}
     * @memberof EventItem
     */
    description?: string;
    /**
     * User-provided event type.
     * @type {string}
     * @memberof EventItem
     */
    type?: string;
    /**
     * Start time in ISO 8601 format (yyyy-mm-ddThh:mm) (e.g., 2012-01-09T04:00).
     * @type {Date}
     * @memberof EventItem
     */
    starts?: Date;
    /**
     * End time in ISO 8601 format (yyyy-mm-ddThh:mm) (e.g., 2012-01-09T05:00).
     * @type {Date}
     * @memberof EventItem
     */
    ends?: Date;
    /**
     * List of up to 5 photos.
     * @type {Array<CommonEclDefinitionsPhoto>}
     * @memberof EventItem
     */
    photos?: Array<CommonEclDefinitionsPhoto>;
    /**
     * Item URL.
     * @type {string}
     * @memberof EventItem
     */
    url?: string;
    /**
     * Youtube URL.
     * @type {string}
     * @memberof EventItem
     */
    video?: string;
}

export function EventItemFromJSON(json: any): EventItem {
    return EventItemFromJSONTyped(json, false);
}

export function EventItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'starts': !exists(json, 'starts') ? undefined : (new Date(json['starts'])),
        'ends': !exists(json, 'ends') ? undefined : (new Date(json['ends'])),
        'photos': !exists(json, 'photos') ? undefined : ((json['photos'] as Array<any>).map(CommonEclDefinitionsPhotoFromJSON)),
        'url': !exists(json, 'url') ? undefined : json['url'],
        'video': !exists(json, 'video') ? undefined : json['video'],
    };
}

export function EventItemToJSON(value?: EventItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'type': value.type,
        'starts': value.starts === undefined ? undefined : (value.starts.toISOString().substr(0,10)),
        'ends': value.ends === undefined ? undefined : (value.ends.toISOString().substr(0,10)),
        'photos': value.photos === undefined ? undefined : ((value.photos as Array<any>).map(CommonEclDefinitionsPhotoToJSON)),
        'url': value.url,
        'video': value.video,
    };
}


