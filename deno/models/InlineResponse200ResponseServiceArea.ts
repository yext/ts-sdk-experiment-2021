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
 * Information about the area that is served by this entity. It is specified as a list of cities and/or postal codes.
 * 
 * **Only for Google My Business and Bing:** Currently, **serviceArea** is only supported by Google My Business and Bing and will not affect your listings on other sites.
 * 
 * Filtering Type: `object`
 * 
 * ```
 * Eligible For: 
 *    * healthcareFacility
 *    * healthcareProfessional
 *    * hotel
 *    * location
 *    * restaurant
 * ```
 * @export
 * @interface InlineResponse200ResponseServiceArea
 */
export interface InlineResponse200ResponseServiceArea {
    /**
     * A list of places served by the entity, where each place is either:
     *  - a postal code, or
     *  - the name of a city.
     * 
     * 
     * 
     * Array must be ordered.
     * 
     * Array may have a maximum of 200 elements.
     * 
     * 
     * Filtering Type: `list of text`
     * @type {Set<string>}
     * @memberof InlineResponse200ResponseServiceArea
     */
    places?: Set<string>;
}

export function InlineResponse200ResponseServiceAreaFromJSON(json: any): InlineResponse200ResponseServiceArea {
    return InlineResponse200ResponseServiceAreaFromJSONTyped(json, false);
}

export function InlineResponse200ResponseServiceAreaFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseServiceArea {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'places': !exists(json, 'places') ? undefined : json['places'],
    };
}

export function InlineResponse200ResponseServiceAreaToJSON(value?: InlineResponse200ResponseServiceArea | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'places': value.places,
    };
}


