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
 * Information about the call-to-action consumers will see in the Uber app during a trip to your entity
 * @export
 * @interface HealthcareFacilityWriteAllOfUberTripBranding
 */
export interface HealthcareFacilityWriteAllOfUberTripBranding {
    /**
     * A longer description that will appear near the call-to-action in the Uber app during a trip to your entity.
     * 
     * **NOTE:** If a value for **`uberTripBranding.description`** is provided, values must also be provided for **`uberTripBranding.text`** and **`uberTripBranding.url`**.
     * @type {string}
     * @memberof HealthcareFacilityWriteAllOfUberTripBranding
     */
    description: string;
    /**
     * The text of the call-to-action that will appear in the Uber app during a trip to your entity (e.g., `Check out our menu!`)
     * 
     * **NOTE:** If a value for **`uberTripBranding.text`** is provided, values must also be provided for **`uberTripBranding.url`** and **`uberTripBranding.description`**.
     * @type {string}
     * @memberof HealthcareFacilityWriteAllOfUberTripBranding
     */
    text: string;
    /**
     * The URL that the consumer will be redirected to when tapping on the call-to-action in the Uber app during a trip to your entity.
     * 
     * **NOTE:** If a value for **`uberTripBranding.url`** is provided, values must also be provided for **`uberTripBranding.text`** and **`uberTripBranding.description`**.
     * @type {string}
     * @memberof HealthcareFacilityWriteAllOfUberTripBranding
     */
    url: string;
}

export function HealthcareFacilityWriteAllOfUberTripBrandingFromJSON(json: any): HealthcareFacilityWriteAllOfUberTripBranding {
    return HealthcareFacilityWriteAllOfUberTripBrandingFromJSONTyped(json, false);
}

export function HealthcareFacilityWriteAllOfUberTripBrandingFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthcareFacilityWriteAllOfUberTripBranding {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'text': json['text'],
        'url': json['url'],
    };
}

export function HealthcareFacilityWriteAllOfUberTripBrandingToJSON(value?: HealthcareFacilityWriteAllOfUberTripBranding | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'text': value.text,
        'url': value.url,
    };
}

