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
 * 
 * @export
 * @interface PublisherSuggestion
 */
export interface PublisherSuggestion {
    /**
     * ID of this Publisher Suggestion
     * @type {string}
     * @memberof PublisherSuggestion
     */
    id?: string;
    /**
     * ID of the publisher who submitted the suggestion
     * @type {string}
     * @memberof PublisherSuggestion
     */
    publisherId?: string;
    /**
     * ID of the location the suggestion is for
     * @type {string}
     * @memberof PublisherSuggestion
     */
    locationId?: string;
    /**
     * The date Yext received the suggestion
     * @type {Date}
     * @memberof PublisherSuggestion
     */
    dateCreated?: Date;
    /**
     * The date the suggestion expired or was accepted or rejected
     * @type {Date}
     * @memberof PublisherSuggestion
     */
    dateResolved?: Date;
    /**
     * The location field the suggestion is for
     * @type {string}
     * @memberof PublisherSuggestion
     */
    fieldName?: string;
    /**
     * The status of the suggestion
     * @type {string}
     * @memberof PublisherSuggestion
     */
    status?: PublisherSuggestionStatusEnum;
    /**
     * Resolver of the Publisher Suggestion
     * @type {string}
     * @memberof PublisherSuggestion
     */
    resolvedBy?: string;
    /**
     * The content that the publisher suggested to change
     * @type {string}
     * @memberof PublisherSuggestion
     */
    originalContent?: string;
    /**
     * The content suggested as a replacement of the `originalContent`
     * @type {string}
     * @memberof PublisherSuggestion
     */
    suggestedContent?: string;
}

/**
* @export
* @enum {string}
*/
export enum PublisherSuggestionStatusEnum {
    WaitingOnCustomer = 'WAITING_ON_CUSTOMER',
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
    Expired = 'EXPIRED'
}

export function PublisherSuggestionFromJSON(json: any): PublisherSuggestion {
    return PublisherSuggestionFromJSONTyped(json, false);
}

export function PublisherSuggestionFromJSONTyped(json: any, ignoreDiscriminator: boolean): PublisherSuggestion {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'publisherId': !exists(json, 'publisherId') ? undefined : json['publisherId'],
        'locationId': !exists(json, 'locationId') ? undefined : json['locationId'],
        'dateCreated': !exists(json, 'dateCreated') ? undefined : (new Date(json['dateCreated'])),
        'dateResolved': !exists(json, 'dateResolved') ? undefined : (new Date(json['dateResolved'])),
        'fieldName': !exists(json, 'fieldName') ? undefined : json['fieldName'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'resolvedBy': !exists(json, 'resolvedBy') ? undefined : json['resolvedBy'],
        'originalContent': !exists(json, 'originalContent') ? undefined : json['originalContent'],
        'suggestedContent': !exists(json, 'suggestedContent') ? undefined : json['suggestedContent'],
    };
}

export function PublisherSuggestionToJSON(value?: PublisherSuggestion | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'publisherId': value.publisherId,
        'locationId': value.locationId,
        'dateCreated': value.dateCreated === undefined ? undefined : (value.dateCreated.toISOString().substr(0,10)),
        'dateResolved': value.dateResolved === undefined ? undefined : (value.dateResolved.toISOString().substr(0,10)),
        'fieldName': value.fieldName,
        'status': value.status,
        'resolvedBy': value.resolvedBy,
        'originalContent': value.originalContent,
        'suggestedContent': value.suggestedContent,
    };
}


