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
 * Information about the Bio Content Lists associated with this entity
 * @export
 * @interface HealthcareFacilityWriteAllOfBios
 */
export interface HealthcareFacilityWriteAllOfBios {
    /**
     * IDs of the Bio Lists associated with this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 40 elements.
     * @type {Set<string>}
     * @memberof HealthcareFacilityWriteAllOfBios
     */
    ids?: Set<string>;
    /**
     * Label to be used for this entity's Bio Lists. This label will appear on your entity's listings.
     * @type {string}
     * @memberof HealthcareFacilityWriteAllOfBios
     */
    label?: string;
}

export function HealthcareFacilityWriteAllOfBiosFromJSON(json: any): HealthcareFacilityWriteAllOfBios {
    return HealthcareFacilityWriteAllOfBiosFromJSONTyped(json, false);
}

export function HealthcareFacilityWriteAllOfBiosFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthcareFacilityWriteAllOfBios {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ids': !exists(json, 'ids') ? undefined : json['ids'],
        'label': !exists(json, 'label') ? undefined : json['label'],
    };
}

export function HealthcareFacilityWriteAllOfBiosToJSON(value?: HealthcareFacilityWriteAllOfBios | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ids': value.ids,
        'label': value.label,
    };
}


