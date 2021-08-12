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
    InlineResponse200ResponseImage,
    InlineResponse200ResponseImageFromJSON,
    InlineResponse200ResponseImageFromJSONTyped,
    InlineResponse200ResponseImageToJSON,
} from './';

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
 * @interface InlineResponse200ResponsePhotoGallery
 */
export interface InlineResponse200ResponsePhotoGallery {
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponsePhotoGallery
     */
    clickthroughUrl?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponsePhotoGallery
     */
    description?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponsePhotoGallery
     */
    details?: string;
    /**
     * 
     * @type {InlineResponse200ResponseImage}
     * @memberof InlineResponse200ResponsePhotoGallery
     */
    image: InlineResponse200ResponseImage;
}

export function InlineResponse200ResponsePhotoGalleryFromJSON(json: any): InlineResponse200ResponsePhotoGallery {
    return InlineResponse200ResponsePhotoGalleryFromJSONTyped(json, false);
}

export function InlineResponse200ResponsePhotoGalleryFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponsePhotoGallery {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clickthroughUrl': !exists(json, 'clickthroughUrl') ? undefined : json['clickthroughUrl'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'details': !exists(json, 'details') ? undefined : json['details'],
        'image': InlineResponse200ResponseImageFromJSON(json['image']),
    };
}

export function InlineResponse200ResponsePhotoGalleryToJSON(value?: InlineResponse200ResponsePhotoGallery | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clickthroughUrl': value.clickthroughUrl,
        'description': value.description,
        'details': value.details,
        'image': InlineResponse200ResponseImageToJSON(value.image),
    };
}

