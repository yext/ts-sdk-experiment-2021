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
    Duplicate,
    DuplicateFromJSON,
    DuplicateFromJSONTyped,
    DuplicateToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface DuplicatesResponseResponse
 */
export interface DuplicatesResponseResponse {
    /**
     * Total number of locations that meet filter criteria (ignores limit/offset)
     * @type {number}
     * @memberof DuplicatesResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Duplicate>}
     * @memberof DuplicatesResponseResponse
     */
    duplicates?: Array<Duplicate>;
}

export function DuplicatesResponseResponseFromJSON(json: any): DuplicatesResponseResponse {
    return DuplicatesResponseResponseFromJSONTyped(json, false);
}

export function DuplicatesResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DuplicatesResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'duplicates': !exists(json, 'duplicates') ? undefined : ((json['duplicates'] as Array<any>).map(DuplicateFromJSON)),
    };
}

export function DuplicatesResponseResponseToJSON(value?: DuplicatesResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'duplicates': value.duplicates === undefined ? undefined : ((value.duplicates as Array<any>).map(DuplicateToJSON)),
    };
}


