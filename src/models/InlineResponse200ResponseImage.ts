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
 * Supported Aspect Ratios:
 * * 1 x 1
 * * 4 x 3
 * * 3 x 2
 * * 5 x 3
 * * 16 x 9
 * * 3 x 1
 * * 2 x 3
 * * 5 x 7
 * * 4 x 5
 * * 4 x 1
 * 
 * **NOTE**: Maximum image size is 5mb after normalization and padding (if applicable). As well, there is a 6 second download limit from the image host.
 * 
 * 
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseImage
 */
export interface InlineResponse200ResponseImage {
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseImage
     */
    alternateText?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseImage
     */
    url: string;
}

export function InlineResponse200ResponseImageFromJSON(json: any): InlineResponse200ResponseImage {
    return InlineResponse200ResponseImageFromJSONTyped(json, false);
}

export function InlineResponse200ResponseImageFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseImage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'alternateText': !exists(json, 'alternateText') ? undefined : json['alternateText'],
        'url': json['url'],
    };
}

export function InlineResponse200ResponseImageToJSON(value?: InlineResponse200ResponseImage | null): any {
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


