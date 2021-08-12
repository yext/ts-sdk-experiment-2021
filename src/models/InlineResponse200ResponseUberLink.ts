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
 * Information about the Yext-powered link that can be copied and pasted into the markup of Yext Pages where the embedded Uber link should appear
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseUberLink
 */
export interface InlineResponse200ResponseUberLink {
    /**
     * Indicates whether the embedded Uber link for this entity appears as text or a button
     * 
     * When consumers click on this link on a mobile device, the Uber app (if installed) will open with your entity set as the trip destination. If the Uber app is not installed, the consumer will be prompted to download it.
     * 
     * Filtering Type: `option`
     * @type {string}
     * @memberof InlineResponse200ResponseUberLink
     */
    presentation: InlineResponse200ResponseUberLinkPresentationEnum;
    /**
     * The text of the embedded Uber link
     * 
     * Default is `Ride there with Uber`.
     * 
     * **NOTE:** This field is only available if **`uberLink.presentation`** is `LINK`.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseUberLink
     */
    text?: string;
}

/**
* @export
* @enum {string}
*/
export enum InlineResponse200ResponseUberLinkPresentationEnum {
    Button = 'BUTTON',
    Link = 'LINK'
}

export function InlineResponse200ResponseUberLinkFromJSON(json: any): InlineResponse200ResponseUberLink {
    return InlineResponse200ResponseUberLinkFromJSONTyped(json, false);
}

export function InlineResponse200ResponseUberLinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseUberLink {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'presentation': json['presentation'],
        'text': !exists(json, 'text') ? undefined : json['text'],
    };
}

export function InlineResponse200ResponseUberLinkToJSON(value?: InlineResponse200ResponseUberLink | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'presentation': value.presentation,
        'text': value.text,
    };
}


