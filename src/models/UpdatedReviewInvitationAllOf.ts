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
    ReviewInvitationOptionalEntity,
    ReviewInvitationOptionalEntityFromJSON,
    ReviewInvitationOptionalEntityFromJSONTyped,
    ReviewInvitationOptionalEntityToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdatedReviewInvitationAllOf
 */
export interface UpdatedReviewInvitationAllOf {
    /**
     * The UID of this Review Invitation. This UID can be included as part of Review Creation
     * requests for attribution.
     * 
     * If the **`v`** parameter is before `20210728`, please refer to **`id`** as the parameter
     * name instead of **`invitationUid`**.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    readonly invitationUid?: string;
    /**
     * 
     * @type {ReviewInvitationOptionalEntity}
     * @memberof UpdatedReviewInvitationAllOf
     */
    entity?: ReviewInvitationOptionalEntity;
    /**
     * The first name of the person from whom a review is being requested.
     * 
     * The **`firstName`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    firstName?: string;
    /**
     * The last name of the person from whom a review is being requested.
     * 
     * The **`lastName`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    lastName?: string;
    /**
     * The title of the person from whom a review is being requested
     * (e.g., Mr., Mrs., Miss, etc.).
     * 
     * The **`title`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    title?: string;
    /**
     * The email address or phone number of the person from whom a review is being requested.
     * 
     * Phone numbers will be formatted in the E.164 standard international format, with a
     * leading "+".
     * 
     * The **`contact`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    contact?: string;
    /**
     * The ID of the transaction being reviewed in response to this invitation.
     * 
     * The **`transactionId`** parameter will only be respected for **`v`** parameters of
     * `20210728` or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    transactionId?: string;
    /**
     * A JSON object containing the key, value pairs for any additional URL parameters. These URL
     * parameters will be appended to the First-Party Review Collection URL.
     * 
     * The **`additionalURLParameters`** parameter will only be respected for **`v`** parameters
     * of `20210728` or later.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    additionalURLParameters?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    status?: UpdatedReviewInvitationAllOfStatusEnum;
    /**
     * The error code of the invitation if applicable.
     * 
     * The **`errorCode`** parameter will only be respected for **`v`** parameters of `20210727`
     * or earlier.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    errorCode?: string;
    /**
     * The error reason text of the invitation if applicable.
     * 
     * The **`errorReason`** parameter will only be respected for **`v`** parameters of
     * `20210727` or earlier.
     * @type {string}
     * @memberof UpdatedReviewInvitationAllOf
     */
    errorReason?: string;
}

/**
* @export
* @enum {string}
*/
export enum UpdatedReviewInvitationAllOfStatusEnum {
    Sent = 'SENT',
    Pending = 'PENDING',
    Canceled = 'CANCELED',
    Attempted = 'ATTEMPTED',
    NotDelivered = 'NOT_DELIVERED',
    Failed = 'FAILED',
    Disabled = 'DISABLED'
}

export function UpdatedReviewInvitationAllOfFromJSON(json: any): UpdatedReviewInvitationAllOf {
    return UpdatedReviewInvitationAllOfFromJSONTyped(json, false);
}

export function UpdatedReviewInvitationAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdatedReviewInvitationAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'invitationUid': !exists(json, 'invitationUid') ? undefined : json['invitationUid'],
        'entity': !exists(json, 'entity') ? undefined : ReviewInvitationOptionalEntityFromJSON(json['entity']),
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'contact': !exists(json, 'contact') ? undefined : json['contact'],
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'additionalURLParameters': !exists(json, 'additionalURLParameters') ? undefined : json['additionalURLParameters'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'errorCode': !exists(json, 'errorCode') ? undefined : json['errorCode'],
        'errorReason': !exists(json, 'errorReason') ? undefined : json['errorReason'],
    };
}

export function UpdatedReviewInvitationAllOfToJSON(value?: UpdatedReviewInvitationAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity': ReviewInvitationOptionalEntityToJSON(value.entity),
        'firstName': value.firstName,
        'lastName': value.lastName,
        'title': value.title,
        'contact': value.contact,
        'transactionId': value.transactionId,
        'additionalURLParameters': value.additionalURLParameters,
        'status': value.status,
        'errorCode': value.errorCode,
        'errorReason': value.errorReason,
    };
}


