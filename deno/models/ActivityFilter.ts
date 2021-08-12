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
/**
 * 
 * @export
 * @interface ActivityFilter
 */
export interface ActivityFilter {
    /**
     * The inclusive start date for the activity data.
     * @type {Date}
     * @memberof ActivityFilter
     */
    startDate?: Date;
    /**
     * The inclusive end date for the activity data.
     * @type {Date}
     * @memberof ActivityFilter
     */
    endDate?: Date;
    /**
     * Array of locationIds
     * @type {Array<string>}
     * @memberof ActivityFilter
     */
    locationIds?: Array<string>;
    /**
     * Activity types to include in an Activity list.
     * @type {Array<string>}
     * @memberof ActivityFilter
     */
    activityTypes?: Array<ActivityFilterActivityTypesEnum>;
    /**
     * List of actors whose activities should be included in an Activity list.
     * @type {Array<string>}
     * @memberof ActivityFilter
     */
    actors?: Array<ActivityFilterActorsEnum>;
}

/**
* @export
* @enum {string}
*/
export enum ActivityFilterActivityTypesEnum {
    LocationUpdated = 'LOCATION_UPDATED',
    PublisherSuggestionCreated = 'PUBLISHER_SUGGESTION_CREATED',
    PublisherSuggestionApproved = 'PUBLISHER_SUGGESTION_APPROVED',
    PublisherSuggestionRejected = 'PUBLISHER_SUGGESTION_REJECTED',
    ReviewCreated = 'REVIEW_CREATED',
    SocialPostCreated = 'SOCIAL_POST_CREATED',
    ListingLive = 'LISTING_LIVE',
    DuplicateSuppressed = 'DUPLICATE_SUPPRESSED'
}/**
* @export
* @enum {string}
*/
export enum ActivityFilterActorsEnum {
    YextSystem = 'YEXT_SYSTEM',
    ScheduledContent = 'SCHEDULED_CONTENT',
    Api = 'API',
    Publisher = 'PUBLISHER'
}

export function ActivityFilterFromJSON(json: any): ActivityFilter {
    return ActivityFilterFromJSONTyped(json, false);
}

export function ActivityFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActivityFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'locationIds': !exists(json, 'locationIds') ? undefined : json['locationIds'],
        'activityTypes': !exists(json, 'activityTypes') ? undefined : json['activityTypes'],
        'actors': !exists(json, 'actors') ? undefined : json['actors'],
    };
}

export function ActivityFilterToJSON(value?: ActivityFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString().substr(0,10)),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString().substr(0,10)),
        'locationIds': value.locationIds,
        'activityTypes': value.activityTypes,
        'actors': value.actors,
    };
}


