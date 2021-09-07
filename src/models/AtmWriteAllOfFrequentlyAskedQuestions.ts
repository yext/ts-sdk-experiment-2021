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
 * 
 * @export
 * @interface AtmWriteAllOfFrequentlyAskedQuestions
 */
export interface AtmWriteAllOfFrequentlyAskedQuestions {
    /**
     * 
     * @type {string}
     * @memberof AtmWriteAllOfFrequentlyAskedQuestions
     */
    answer?: string;
    /**
     * 
     * @type {string}
     * @memberof AtmWriteAllOfFrequentlyAskedQuestions
     */
    question: string;
}

export function AtmWriteAllOfFrequentlyAskedQuestionsFromJSON(json: any): AtmWriteAllOfFrequentlyAskedQuestions {
    return AtmWriteAllOfFrequentlyAskedQuestionsFromJSONTyped(json, false);
}

export function AtmWriteAllOfFrequentlyAskedQuestionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfFrequentlyAskedQuestions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'answer': !exists(json, 'answer') ? undefined : json['answer'],
        'question': json['question'],
    };
}

export function AtmWriteAllOfFrequentlyAskedQuestionsToJSON(value?: AtmWriteAllOfFrequentlyAskedQuestions | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'answer': value.answer,
        'question': value.question,
    };
}

