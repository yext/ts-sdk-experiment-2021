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
 * A portrait of the healthcare professional
 * @export
 * @interface HealthcareProfessionalWriteAllOfHeadshot
 */
export interface HealthcareProfessionalWriteAllOfHeadshot {
    /**
     * 
     * @type {string}
     * @memberof HealthcareProfessionalWriteAllOfHeadshot
     */
    alternateText?: string;
    /**
     * 
     * @type {string}
     * @memberof HealthcareProfessionalWriteAllOfHeadshot
     */
    url: string;
}

export function HealthcareProfessionalWriteAllOfHeadshotFromJSON(json: any): HealthcareProfessionalWriteAllOfHeadshot {
    return HealthcareProfessionalWriteAllOfHeadshotFromJSONTyped(json, false);
}

export function HealthcareProfessionalWriteAllOfHeadshotFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthcareProfessionalWriteAllOfHeadshot {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'alternateText': !exists(json, 'alternateText') ? undefined : json['alternateText'],
        'url': json['url'],
    };
}

export function HealthcareProfessionalWriteAllOfHeadshotToJSON(value?: HealthcareProfessionalWriteAllOfHeadshot | null): any {
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


