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
    Location,
    LocationFromJSON,
    LocationFromJSONTyped,
    LocationToJSON,
} from './';

/**
 * 
 * @export
 * @interface LanguageProfilesResponseResponse
 */
export interface LanguageProfilesResponseResponse {
    /**
     * 
     * @type {Array<Location>}
     * @memberof LanguageProfilesResponseResponse
     */
    languageProfiles?: Array<Location>;
}

export function LanguageProfilesResponseResponseFromJSON(json: any): LanguageProfilesResponseResponse {
    return LanguageProfilesResponseResponseFromJSONTyped(json, false);
}

export function LanguageProfilesResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LanguageProfilesResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'languageProfiles': !exists(json, 'languageProfiles') ? undefined : ((json['languageProfiles'] as Array<any>).map(LocationFromJSON)),
    };
}

export function LanguageProfilesResponseResponseToJSON(value?: LanguageProfilesResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'languageProfiles': value.languageProfiles === undefined ? undefined : ((value.languageProfiles as Array<any>).map(LocationToJSON)),
    };
}


