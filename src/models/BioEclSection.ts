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
    BaseEclSection,
    BaseEclSectionFromJSON,
    BaseEclSectionFromJSONTyped,
    BaseEclSectionToJSON,
    BioEclSectionAllOf,
    BioEclSectionAllOfFromJSON,
    BioEclSectionAllOfFromJSONTyped,
    BioEclSectionAllOfToJSON,
    BioItem,
    BioItemFromJSON,
    BioItemFromJSONTyped,
    BioItemToJSON,
} from './';

/**
 * 
 * @export
 * @interface BioEclSection
 */
export interface BioEclSection {
    /**
     * Section ID.
     * @type {string}
     * @memberof BioEclSection
     */
    id?: string;
    /**
     * Section name.
     * @type {string}
     * @memberof BioEclSection
     */
    name?: string;
    /**
     * Section description.
     * @type {string}
     * @memberof BioEclSection
     */
    description?: string;
    /**
     * Section Items.
     * @type {Array<BioItem>}
     * @memberof BioEclSection
     */
    items?: Array<BioItem>;
}

export function BioEclSectionFromJSON(json: any): BioEclSection {
    return BioEclSectionFromJSONTyped(json, false);
}

export function BioEclSectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): BioEclSection {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'items': !exists(json, 'items') ? undefined : ((json['items'] as Array<any>).map(BioItemFromJSON)),
    };
}

export function BioEclSectionToJSON(value?: BioEclSection | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'items': value.items === undefined ? undefined : ((value.items as Array<any>).map(BioItemToJSON)),
    };
}

