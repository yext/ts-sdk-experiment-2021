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
import {
    Translation,
    TranslationFromJSON,
    TranslationFromJSONTyped,
    TranslationToJSON,
} from './index.ts';

/**
 * The Custom Field's name (including default value and translations).
 * 
 *  After March 19th 2020, if users **Update** Custom Field's name using older versions of the API without explicitly specifiying translations, any existing translations will be cleared.
 * 
 * **Example:**
 * "name": {
 *   "value": "The promotions",
 *   "translations": [
 *     {
 *       "languageCode": "fr",
 *       "value": "Les promotions"
 *     }
 *   ]
 * }
 * @export
 * @interface FieldUpdateName
 */
export interface FieldUpdateName {
    /**
     * The field's default name.
     * @type {string}
     * @memberof FieldUpdateName
     */
    value?: string;
    /**
     * Localized variations of **`value`**.
     * @type {Array<Translation>}
     * @memberof FieldUpdateName
     */
    translations?: Array<Translation>;
}

export function FieldUpdateNameFromJSON(json: any): FieldUpdateName {
    return FieldUpdateNameFromJSONTyped(json, false);
}

export function FieldUpdateNameFromJSONTyped(json: any, ignoreDiscriminator: boolean): FieldUpdateName {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
        'translations': !exists(json, 'translations') ? undefined : ((json['translations'] as Array<any>).map(TranslationFromJSON)),
    };
}

export function FieldUpdateNameToJSON(value?: FieldUpdateName | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
        'translations': value.translations === undefined ? undefined : ((value.translations as Array<any>).map(TranslationToJSON)),
    };
}


