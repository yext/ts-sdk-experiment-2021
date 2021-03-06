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
 * Filtering Type: `object`
 * @export
 * @interface InlineResponse200ResponseFrequentlyAskedQuestions
 */
export interface InlineResponse200ResponseFrequentlyAskedQuestions {
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseFrequentlyAskedQuestions
     */
    answer?: string;
    /**
     * Filtering Type: `text`
     * @type {string}
     * @memberof InlineResponse200ResponseFrequentlyAskedQuestions
     */
    question: string;
}

export function InlineResponse200ResponseFrequentlyAskedQuestionsFromJSON(json: any): InlineResponse200ResponseFrequentlyAskedQuestions {
    return InlineResponse200ResponseFrequentlyAskedQuestionsFromJSONTyped(json, false);
}

export function InlineResponse200ResponseFrequentlyAskedQuestionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse200ResponseFrequentlyAskedQuestions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'answer': !exists(json, 'answer') ? undefined : json['answer'],
        'question': json['question'],
    };
}

export function InlineResponse200ResponseFrequentlyAskedQuestionsToJSON(value?: InlineResponse200ResponseFrequentlyAskedQuestions | null): any {
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


