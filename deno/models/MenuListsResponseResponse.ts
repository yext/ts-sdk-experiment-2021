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
    Menu,
    MenuFromJSON,
    MenuFromJSONTyped,
    MenuToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface MenuListsResponseResponse
 */
export interface MenuListsResponseResponse {
    /**
     * Total number of Menus that meet filter criteria (ignores limit / offset).
     * @type {number}
     * @memberof MenuListsResponseResponse
     */
    count?: number;
    /**
     * 
     * @type {Array<Menu>}
     * @memberof MenuListsResponseResponse
     */
    menus?: Array<Menu>;
}

export function MenuListsResponseResponseFromJSON(json: any): MenuListsResponseResponse {
    return MenuListsResponseResponseFromJSONTyped(json, false);
}

export function MenuListsResponseResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MenuListsResponseResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'menus': !exists(json, 'menus') ? undefined : ((json['menus'] as Array<any>).map(MenuFromJSON)),
    };
}

export function MenuListsResponseResponseToJSON(value?: MenuListsResponseResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'menus': value.menus === undefined ? undefined : ((value.menus as Array<any>).map(MenuToJSON)),
    };
}


