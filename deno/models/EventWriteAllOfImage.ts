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
 * @export
 * @interface EventWriteAllOfImage
 */
export interface EventWriteAllOfImage {
    /**
     * 
     * @type {string}
     * @memberof EventWriteAllOfImage
     */
    alternateText?: string;
    /**
     * 
     * @type {string}
     * @memberof EventWriteAllOfImage
     */
    url: string;
}

export function EventWriteAllOfImageFromJSON(json: any): EventWriteAllOfImage {
    return EventWriteAllOfImageFromJSONTyped(json, false);
}

export function EventWriteAllOfImageFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventWriteAllOfImage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'alternateText': !exists(json, 'alternateText') ? undefined : json['alternateText'],
        'url': json['url'],
    };
}

export function EventWriteAllOfImageToJSON(value?: EventWriteAllOfImage | null): any {
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

