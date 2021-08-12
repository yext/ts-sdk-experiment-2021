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
    GoogleCategory,
    GoogleCategoryFromJSON,
    GoogleCategoryFromJSONTyped,
    GoogleCategoryToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface GoogleFieldsResponseResponse
 */
export interface GoogleFieldsResponseResponse {
    /**
     * List of Google Fields.
     * @type {Array<GoogleCategory>}
     * @memberof GoogleFieldsResponseResponse
     */
    items?: Array<GoogleCategory>;
}

export function GoogleFieldsResponseResponseFromJSON(json: any): GoogleFieldsResponseResponse {
    return GoogleFieldsResponseResponseFromJSONTyped(json, false);
}

export function GoogleFieldsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleFieldsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': !exists(json, 'items') ? undefined : ((json['items'] as Array<any>).map(GoogleCategoryFromJSON)),
    };
}

export function GoogleFieldsResponseResponseToJSON(value?: GoogleFieldsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': value.items === undefined ? undefined : ((value.items as Array<any>).map(GoogleCategoryToJSON)),
    };
}


