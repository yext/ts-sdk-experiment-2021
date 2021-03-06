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
    ReviewInvitationDates,
    ReviewInvitationDatesFromJSON,
    ReviewInvitationDatesFromJSONTyped,
    ReviewInvitationDatesToJSON,
    UpdateReviewInvitationRequestAllOf,
    UpdateReviewInvitationRequestAllOfFromJSON,
    UpdateReviewInvitationRequestAllOfFromJSONTyped,
    UpdateReviewInvitationRequestAllOfToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateReviewInvitationRequest
 */
export interface UpdateReviewInvitationRequest {
    /**
     * The timestamp the invitation was sent (seconds since epoch), if the invitation was sent.
     * @type {number}
     * @memberof UpdateReviewInvitationRequest
     */
    sent?: number;
    /**
     * The timestamp the invitation was opened (seconds since epoch), if the invitation was opened.
     * This value will always be null for SMS type invitations.
     * @type {number}
     * @memberof UpdateReviewInvitationRequest
     */
    opened?: number;
    /**
     * The timestamp the invitation was clicked (seconds since epoch).
     * @type {number}
     * @memberof UpdateReviewInvitationRequest
     */
    clicked?: number;
    /**
     * The timestamp the review was generated as a result of this invitation (seconds since epoch).
     * 
     * If the **`v`** parameter is before `20210728`, please refer to **`responded`** as the
     * parameter name instead of **`reviewed`**.
     * @type {number}
     * @memberof UpdateReviewInvitationRequest
     */
    reviewed?: number;
    /**
     * The first name of the person from whom a review is being requested.
     * 
     * The **`firstName`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    firstName?: string;
    /**
     * The last name of the person from whom a review is being requested
     * 
     * The **`lastName`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    lastName?: string;
    /**
     * The title of the person from whom a review is being requested (e.g., Mr., Mrs., Miss, etc.)
     * 
     * The **`title`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    title?: string;
    /**
     * The email address or phone number of the person from whom a review is being requested.
     * 
     * Phone numbers should be formatted in one of the following ways:
     * * E.164 standard international format, with a leading "+"
     * * National format, according to the country of the corresponding location
     * 
     * The **`contact`** parameter will only be respected for **`v`** parameters of `20210728`
     * or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    contact?: string;
    /**
     * The ID of the transaction being reviewed in response to this invitation.
     * 
     * The **`transactionId`** parameter will only be respected for **`v`** parameters of
     * `20210728` or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    transactionId?: string;
    /**
     * A JSON object containing the key, value pairs for any additional URL parameters. These URL
     * parameters will be appended to the First-Party Review Collection URL.
     * 
     * The **`additionalURLParameters`** parameter will only be respected for **`v`** parameters
     * of `20210728` or later.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    additionalURLParameters?: string;
    /**
     * Cancel an existing review invitation with `PENDING` status by updating status to `CANCELED`
     * Please note that if the invitation status is not `PENDING`, attempting to set the status
     * to `CANCELED` will fail.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    status?: UpdateReviewInvitationRequestStatusEnum;
    /**
     * The error code of the invitation if applicable. Required if `errorReason` is specified.
     * 
     * The **`errorCode`** parameter will only be respected for **`v`** parameters of `20210727`
     * or earlier.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    errorCode?: string;
    /**
     * The error reason text of the invitation if applicable. Required if `errorCode` is specified.
     * 
     * The **`errorReason`** parameter will only be respected for **`v`** parameters of
     * `20210727` or earlier.
     * @type {string}
     * @memberof UpdateReviewInvitationRequest
     */
    errorReason?: string;
}

/**
* @export
* @enum {string}
*/
export enum UpdateReviewInvitationRequestStatusEnum {
    Canceled = 'CANCELED'
}

export function UpdateReviewInvitationRequestFromJSON(json: any): UpdateReviewInvitationRequest {
    return UpdateReviewInvitationRequestFromJSONTyped(json, false);
}

export function UpdateReviewInvitationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateReviewInvitationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sent': !exists(json, 'sent') ? undefined : json['sent'],
        'opened': !exists(json, 'opened') ? undefined : json['opened'],
        'clicked': !exists(json, 'clicked') ? undefined : json['clicked'],
        'reviewed': !exists(json, 'reviewed') ? undefined : json['reviewed'],
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

export function UpdateReviewInvitationRequestToJSON(value?: UpdateReviewInvitationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sent': value.sent,
        'opened': value.opened,
        'clicked': value.clicked,
        'reviewed': value.reviewed,
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


