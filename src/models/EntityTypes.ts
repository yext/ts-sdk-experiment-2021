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

/**
 * 
 * @export
 * @enum {string}
 */
export enum EntityTypes {
    Location = 'location',
    Event = 'event',
    HealthcareProfessional = 'healthcareProfessional',
    HealthcareFacility = 'healthcareFacility',
    Atm = 'atm',
    Restaurant = 'restaurant'
}

export function EntityTypesFromJSON(json: any): EntityTypes {
    return EntityTypesFromJSONTyped(json, false);
}

export function EntityTypesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityTypes {
    return json as EntityTypes;
}

export function EntityTypesToJSON(value?: EntityTypes | null): any {
    return value as any;
}

