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
 * 
 * @export
 * @interface ReviewLabel
 */
export interface ReviewLabel {
    /**
     * The ID of this review label.
     * @type {number}
     * @memberof ReviewLabel
     */
    readonly id?: number;
    /**
     * The name of this review label.
     * @type {string}
     * @memberof ReviewLabel
     */
    readonly name?: string;
}

export function ReviewLabelFromJSON(json: any): ReviewLabel {
    return ReviewLabelFromJSONTyped(json, false);
}

export function ReviewLabelFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewLabel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function ReviewLabelToJSON(value?: ReviewLabel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}


