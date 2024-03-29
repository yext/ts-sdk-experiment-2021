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
    CreateReviewInvitationRequestAllOf,
    CreateReviewInvitationRequestAllOfFromJSON,
    CreateReviewInvitationRequestAllOfFromJSONTyped,
    CreateReviewInvitationRequestAllOfToJSON,
    ReviewInvitation,
    ReviewInvitationFromJSON,
    ReviewInvitationFromJSONTyped,
    ReviewInvitationToJSON,
    ReviewInvitationOptionalEntity,
    ReviewInvitationOptionalEntityFromJSON,
    ReviewInvitationOptionalEntityFromJSONTyped,
    ReviewInvitationOptionalEntityToJSON,
} from './';

/**
 * 
 * @export
 * @interface CreateReviewInvitationRequest
 */
export interface CreateReviewInvitationRequest {
    /**
     * The UID of this Review Invitation. This UID can be included as part of Review Creation
     * requests for attribution.
     * 
     * If the **`v`** parameter is before `20210728`, please refer to **`id`** as the parameter
     * name instead of **`invitationUid`**.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    readonly invitationUid?: string;
    /**
     * 
     * @type {ReviewInvitationOptionalEntity}
     * @memberof CreateReviewInvitationRequest
     */
    entity: ReviewInvitationOptionalEntity;
    /**
     * The first name of the person from whom a review is being requested.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    firstName: string;
    /**
     * The last name of the person from whom a review is being requested.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    lastName: string;
    /**
     * The title of the person from whom a review is being requested
     * (e.g., Mr., Mrs., Miss, etc.).
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    title: string;
    /**
     * The email address or phone number of the person from whom a review is being requested.
     * 
     * Phone numbers should be formatted in one of the following ways:
     * * E.164 standard international format, with a leading "+"
     * * National format, according to the country of the corresponding location
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    contact: string;
    /**
     * Only valid for SMS invitations.
     * 
     * If set to true, include the image provided in the relevant template in the SMS invitation.
     * Please note that an image counts as an SMS message towards your SMS capacity.
     * 
     * Otherwise, the SMS message will not include an image.
     * 
     * If the **`v`** parameter is before `20210728`, please refer to **`image`** as the parameter
     * name instead of **`includeImage`**.
     * @type {boolean}
     * @memberof CreateReviewInvitationRequest
     */
    includeImage?: boolean;
    /**
     * If specified, the ID of the template used to format the email.
     * 
     * If not specified, the entity’s default email template is used. If the entity has no default
     * template, the account’s default template is used.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    templateId?: string;
    /**
     * The ID of the transaction being reviewed in response to this invitation.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    transactionId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    readonly status?: CreateReviewInvitationRequestStatusEnum;
    /**
     * If status is REJECTED, describes why the invitation could not be processed.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    readonly details?: string;
    /**
     * The ISO 639-1 code of the review invitation's language. Only valid for invitations created
     * from built-in templates. Defaults to `en`.
     * 
     * Supported languages:
     *   * `en`
     *   * `de`
     *   * `fr`
     *   * `es`
     *   * `it`
     *   * `nl`
     *   * `ja`
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    language?: string;
    /**
     * A JSON object containing the key, value pairs for any additional URL parameters. These URL
     * parameters will be appended to the First-Party Review Collection URL.
     * 
     * The **`additionalUrlParameters`** parameter will only be respected with the inclusion of
     * a **`v`** parameter of `20210728` or later.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    additionalUrlParameters?: string;
    /**
     * Defaults to true. If set to false, Yext will not fulfill the invitation and will simply
     * return the created invitation object.
     * 
     * The **`sendInvitationFromYext`** parameter will only be respected with the inclusion of a
     * **`v`** parameter of `20210728` or later.
     * @type {boolean}
     * @memberof CreateReviewInvitationRequest
     */
    sendInvitationFromYext?: boolean;
    /**
     * The created Feedback URL unique to this invitation.
     * 
     * The **`feedbackURL`** parameter will only be respected with the inclusion of a **`v`**
     * parameter of `20210728` or later.
     * @type {string}
     * @memberof CreateReviewInvitationRequest
     */
    readonly feedbackURL?: string;
    /**
     * Review Labels associated with the review.
     * 
     * The **`reviewLabels`** parameter will only be respected with the inclusion of a **`v`**
     * parameter of `20210728` or later.
     * @type {Array<object>}
     * @memberof CreateReviewInvitationRequest
     */
    readonly reviewLabels?: Array<object>;
    /**
     * The names of the Review Labels which will be attached to the resulting review.
     * 
     * This is an upsert operation, meaning the system will determine if a Review Label exists
     * already in your account, and create and append a new label if not.
     * 
     * The **`reviewLabelNames`** parameter will only be respected with the inclusion of a
     * **`v`** parameter of `20210728` or later.
     * @type {Array<string>}
     * @memberof CreateReviewInvitationRequest
     */
    reviewLabelNames?: Array<string>;
}

/**
* @export
* @enum {string}
*/
export enum CreateReviewInvitationRequestStatusEnum {
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
    Pending = 'PENDING'
}

export function CreateReviewInvitationRequestFromJSON(json: any): CreateReviewInvitationRequest {
    return CreateReviewInvitationRequestFromJSONTyped(json, false);
}

export function CreateReviewInvitationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReviewInvitationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'invitationUid': !exists(json, 'invitationUid') ? undefined : json['invitationUid'],
        'entity': ReviewInvitationOptionalEntityFromJSON(json['entity']),
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'title': json['title'],
        'contact': json['contact'],
        'includeImage': !exists(json, 'includeImage') ? undefined : json['includeImage'],
        'templateId': !exists(json, 'templateId') ? undefined : json['templateId'],
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'details': !exists(json, 'details') ? undefined : json['details'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'additionalUrlParameters': !exists(json, 'additionalUrlParameters') ? undefined : json['additionalUrlParameters'],
        'sendInvitationFromYext': !exists(json, 'sendInvitationFromYext') ? undefined : json['sendInvitationFromYext'],
        'feedbackURL': !exists(json, 'feedbackURL') ? undefined : json['feedbackURL'],
        'reviewLabels': !exists(json, 'reviewLabels') ? undefined : json['reviewLabels'],
        'reviewLabelNames': !exists(json, 'reviewLabelNames') ? undefined : json['reviewLabelNames'],
    };
}

export function CreateReviewInvitationRequestToJSON(value?: CreateReviewInvitationRequest | null): any {
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
        'includeImage': value.includeImage,
        'templateId': value.templateId,
        'transactionId': value.transactionId,
        'language': value.language,
        'additionalUrlParameters': value.additionalUrlParameters,
        'sendInvitationFromYext': value.sendInvitationFromYext,
        'reviewLabelNames': value.reviewLabelNames,
    };
}


