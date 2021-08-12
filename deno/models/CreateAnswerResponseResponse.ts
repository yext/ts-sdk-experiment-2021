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
 * @interface CreateAnswerResponseResponse
 */
export interface CreateAnswerResponseResponse {
    /**
     * ID of the answer created.
     * @type {number}
     * @memberof CreateAnswerResponseResponse
     */
    id?: number;
    /**
     * The answer text.
     * @type {string}
     * @memberof CreateAnswerResponseResponse
     */
    content?: string;
}

export function CreateAnswerResponseResponseFromJSON(json: any): CreateAnswerResponseResponse {
    return CreateAnswerResponseResponseFromJSONTyped(json, false);
}

export function CreateAnswerResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAnswerResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'content': !exists(json, 'content') ? undefined : json['content'],
    };
}

export function CreateAnswerResponseResponseToJSON(value?: CreateAnswerResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'content': value.content,
    };
}


