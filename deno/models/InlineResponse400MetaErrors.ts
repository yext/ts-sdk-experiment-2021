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
 * @interface InlineResponse400MetaErrors
 */
export interface InlineResponse400MetaErrors {
    /**
     * Code that uniquely identifies the error or warning.
     * @type {number}
     * @memberof InlineResponse400MetaErrors
     */
    code?: number;
    /**
     * Message explaining the problem.
     * @type {string}
     * @memberof InlineResponse400MetaErrors
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse400MetaErrors
     */
    type?: InlineResponse400MetaErrorsTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum InlineResponse400MetaErrorsTypeEnum {
    FatalError = 'FATAL_ERROR',
    NonFatalError = 'NON_FATAL_ERROR',
    Warning = 'WARNING'
}

export function InlineResponse400MetaErrorsFromJSON(json: any): InlineResponse400MetaErrors {
    return InlineResponse400MetaErrorsFromJSONTyped(json, false);
}

export function InlineResponse400MetaErrorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse400MetaErrors {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function InlineResponse400MetaErrorsToJSON(value?: InlineResponse400MetaErrors | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
        'type': value.type,
    };
}

