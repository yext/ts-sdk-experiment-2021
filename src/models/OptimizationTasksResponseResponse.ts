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
    OptimizationTask,
    OptimizationTaskFromJSON,
    OptimizationTaskFromJSONTyped,
    OptimizationTaskToJSON,
} from './';

/**
 * 
 * @export
 * @interface OptimizationTasksResponseResponse
 */
export interface OptimizationTasksResponseResponse {
    /**
     * 
     * @type {Array<OptimizationTask>}
     * @memberof OptimizationTasksResponseResponse
     */
    optimizationTasks?: Array<OptimizationTask>;
}

export function OptimizationTasksResponseResponseFromJSON(json: any): OptimizationTasksResponseResponse {
    return OptimizationTasksResponseResponseFromJSONTyped(json, false);
}

export function OptimizationTasksResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimizationTasksResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'optimizationTasks': !exists(json, 'optimizationTasks') ? undefined : ((json['optimizationTasks'] as Array<any>).map(OptimizationTaskFromJSON)),
    };
}

export function OptimizationTasksResponseResponseToJSON(value?: OptimizationTasksResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'optimizationTasks': value.optimizationTasks === undefined ? undefined : ((value.optimizationTasks as Array<any>).map(OptimizationTaskToJSON)),
    };
}


