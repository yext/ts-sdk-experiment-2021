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
 * The profile photo for the entity's Google profile
 * 
 * 
 * Image must be at least 250 x 250 pixels
 * 
 * Image may be no more than 500 x 500 pixels
 * 
 * Supported Aspect Ratios:
 * * 1 x 1
 * 
 * **NOTE**: Maximum image size is 5mb after normalization and padding (if applicable). As well, there is a 6 second download limit from the image host.
 * 
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * atm
 *    * financialProfessional
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseGoogleProfilePhoto
 */
export interface InlineResponse200ResponseGoogleProfilePhoto {
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseGoogleProfilePhoto
     */
    alternateText?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseGoogleProfilePhoto
     */
    url: string;
}

export function InlineResponse200ResponseGoogleProfilePhotoFromJSON(json: any): InlineResponse200ResponseGoogleProfilePhoto {
    return InlineResponse200ResponseGoogleProfilePhotoFromJSONTyped(json, false);
}

export function InlineResponse200ResponseGoogleProfilePhotoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseGoogleProfilePhoto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'alternateText': !exists(json, 'alternateText') ? undefined : json['alternateText'],
        'url': json['url'],
    };
}

export function InlineResponse200ResponseGoogleProfilePhotoToJSON(value?: InlineResponse200ResponseGoogleProfilePhoto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'alternateText': value.alternateText,
        'url': value.url,
    };
}


