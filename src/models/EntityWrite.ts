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
     AtmWriteFromJSONTyped,
     EventWriteFromJSONTyped,
     FaqWriteFromJSONTyped,
     HealthcareFacilityWriteFromJSONTyped,
     HealthcareProfessionalWriteFromJSONTyped,
     HotelWriteFromJSONTyped,
     JobWriteFromJSONTyped,
     LocationWriteFromJSONTyped,
     RestaurantWriteFromJSONTyped
} from './';

/**
 * 
 * @export
 * @interface EntityWrite
 */
export interface EntityWrite {
    /**
     * **This is used only to filter the fields below and should NOT be included in any API calls.
     * Specify the entity type in the query parameter described above.**
     * @type {string}
     * @memberof EntityWrite
     */
    entityType?: string;
}

export function EntityWriteFromJSON(json: any): EntityWrite {
    return EntityWriteFromJSONTyped(json, false);
}

export function EntityWriteFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityWrite {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['entityType'] === 'atm') {
            return AtmWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'event') {
            return EventWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'faq') {
            return FaqWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'healthcareFacility') {
            return HealthcareFacilityWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'healthcareProfessional') {
            return HealthcareProfessionalWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'hotel') {
            return HotelWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'job') {
            return JobWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'location') {
            return LocationWriteFromJSONTyped(json, true);
        }
        if (json['entityType'] === 'restaurant') {
            return RestaurantWriteFromJSONTyped(json, true);
        }
    }
    return {
        
        'entityType': !exists(json, 'EntityType') ? undefined : json['EntityType'],
    };
}

export function EntityWriteToJSON(value?: EntityWrite | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'EntityType': value.entityType,
    };
}


