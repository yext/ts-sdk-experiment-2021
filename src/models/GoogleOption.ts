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
 * @export
 * @interface GoogleOption
 */
export interface GoogleOption {
    /**
     * Google's ID for the option.
     * @type {string}
     * @memberof GoogleOption
     */
    id?: string;
    /**
     * Google's display name for the option.
     * @type {string}
     * @memberof GoogleOption
     */
    label?: string;
}

export function GoogleOptionFromJSON(json: any): GoogleOption {
    return GoogleOptionFromJSONTyped(json, false);
}

export function GoogleOptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleOption {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'label': !exists(json, 'label') ? undefined : json['label'],
    };
}

export function GoogleOptionToJSON(value?: GoogleOption | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'label': value.label,
    };
}


