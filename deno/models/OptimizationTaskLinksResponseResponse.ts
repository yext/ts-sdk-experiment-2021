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
 * @interface OptimizationTaskLinksResponseResponse
 */
export interface OptimizationTaskLinksResponseResponse {
    /**
     * The URL where all requested task(s) for the requested location(s) can be completed.
     * 
     * Will be null if none of the requested tasks on the requested locations are pending and mode is PENDING_ONLY.
     * 
     * **Redirecting after the task:** You can automatically redirect users to a specific URL after they've completed the task. To do so, append a `continueUrl` parameter, whose value is the URL users should be redirected to, to the returned URL.
     * @type {string}
     * @memberof OptimizationTaskLinksResponseResponse
     */
    link?: string;
}

export function OptimizationTaskLinksResponseResponseFromJSON(json: any): OptimizationTaskLinksResponseResponse {
    return OptimizationTaskLinksResponseResponseFromJSONTyped(json, false);
}

export function OptimizationTaskLinksResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimizationTaskLinksResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'link': !exists(json, 'link') ? undefined : json['link'],
    };
}

export function OptimizationTaskLinksResponseResponseToJSON(value?: OptimizationTaskLinksResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'link': value.link,
    };
}


