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
    EventEclSection,
    EventEclSectionFromJSON,
    EventEclSectionFromJSONTyped,
    EventEclSectionToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface EventAllOf
 */
export interface EventAllOf {
    /**
     * A list of sections. However, Calendars cannot have more than one section.
     * @type {Array<EventEclSection>}
     * @memberof EventAllOf
     */
    sections?: Array<EventEclSection>;
}

export function EventAllOfFromJSON(json: any): EventAllOf {
    return EventAllOfFromJSONTyped(json, false);
}

export function EventAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sections': !exists(json, 'sections') ? undefined : ((json['sections'] as Array<any>).map(EventEclSectionFromJSON)),
    };
}

export function EventAllOfToJSON(value?: EventAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'sections': value.sections === undefined ? undefined : ((value.sections as Array<any>).map(EventEclSectionToJSON)),
    };
}


