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
    AtmWriteAllOfLogoImage,
    AtmWriteAllOfLogoImageFromJSON,
    AtmWriteAllOfLogoImageFromJSONTyped,
    AtmWriteAllOfLogoImageToJSON,
} from './';

/**
 * An image of the entity's logo
 * 
 * 
 * Supported Aspect Ratios:
 * * 1 x 1
 * 
 * **NOTE**: Maximum image size is 5mb after normalization and padding (if applicable). As well, there is a 6 second download limit from the image host.
 * @export
 * @interface AtmWriteAllOfLogo
 */
export interface AtmWriteAllOfLogo {
    /**
     * 
     * @type {string}
     * @memberof AtmWriteAllOfLogo
     */
    clickthroughUrl?: string;
    /**
     * 
     * @type {string}
     * @memberof AtmWriteAllOfLogo
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof AtmWriteAllOfLogo
     */
    details?: string;
    /**
     * 
     * @type {AtmWriteAllOfLogoImage}
     * @memberof AtmWriteAllOfLogo
     */
    image: AtmWriteAllOfLogoImage;
}

export function AtmWriteAllOfLogoFromJSON(json: any): AtmWriteAllOfLogo {
    return AtmWriteAllOfLogoFromJSONTyped(json, false);
}

export function AtmWriteAllOfLogoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfLogo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clickthroughUrl': !exists(json, 'clickthroughUrl') ? undefined : json['clickthroughUrl'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'details': !exists(json, 'details') ? undefined : json['details'],
        'image': AtmWriteAllOfLogoImageFromJSON(json['image']),
    };
}

export function AtmWriteAllOfLogoToJSON(value?: AtmWriteAllOfLogo | null): any {
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
        'image': AtmWriteAllOfLogoImageToJSON(value.image),
    };
}


