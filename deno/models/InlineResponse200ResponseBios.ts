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
 * Information about the Bio Content Lists associated with this entity
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * financialProfessional
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseBios
 */
export interface InlineResponse200ResponseBios {
    /**
     * IDs of the Bio Lists associated with this entity
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 40 elements.
     * 
     * 
     * Filtering Type: `list of text`
     * @type {Set<string>}
     * @memberof InlineResponse200ResponseBios
     */
    ids?: Set<string>;
    /**
     * Label to be used for this entity's Bio Lists. This label will appear on your entity's listings.
     * 
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseBios
     */
    label?: string;
}

export function InlineResponse200ResponseBiosFromJSON(json: any): InlineResponse200ResponseBios {
    return InlineResponse200ResponseBiosFromJSONTyped(json, false);
}

export function InlineResponse200ResponseBiosFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseBios {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ids': !exists(json, 'ids') ? undefined : json['ids'],
        'label': !exists(json, 'label') ? undefined : json['label'],
    };
}

export function InlineResponse200ResponseBiosToJSON(value?: InlineResponse200ResponseBios | null): any {
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


