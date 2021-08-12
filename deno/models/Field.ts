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
    EntityTypes,
    EntityTypesFromJSON,
    EntityTypesFromJSONTyped,
    EntityTypesToJSON,
    FieldAllOf,
    FieldAllOfFromJSON,
    FieldAllOfFromJSONTyped,
    FieldAllOfToJSON,
    FieldUpdate,
    FieldUpdateFromJSON,
    FieldUpdateFromJSONTyped,
    FieldUpdateToJSON,
    FieldUpdateDescription,
    FieldUpdateDescriptionFromJSON,
    FieldUpdateDescriptionFromJSONTyped,
    FieldUpdateDescriptionToJSON,
    FieldUpdateName,
    FieldUpdateNameFromJSON,
    FieldUpdateNameFromJSONTyped,
    FieldUpdateNameToJSON,
    Option,
    OptionFromJSON,
    OptionFromJSONTyped,
    OptionToJSON,
    Validation,
    ValidationFromJSON,
    ValidationFromJSONTyped,
    ValidationToJSON,
} from './index.ts';

/**
 * 
 * @export
 * @interface Field
 */
export interface Field {
    /**
     * 
     * @type {FieldUpdateName}
     * @memberof Field
     */
    name: FieldUpdateName;
    /**
     * Present if and only if `type` is `SINGLE_OPTION` or `MULTI_OPTION`.
     * 
     * List of options (key, value, and translations) for the Custom Field.
     * 
     * **Example:**
     * {
     *   {
     *     "key": "TEMPORARILY_CLOSED",
     *     "value": "Temporarily Closed"
     *   },
     *   {
     *     "key": "COMING_SOON",
     *     "value": "Coming Soon"
     *   },
     *   {
     *     "key": "CLOSED",
     *     "value": "Closed"
     *     "translations": [
     *       {
     *         "languageCode": "fr",
     *         "value": "Fermé"
     *       }
     *     ]
     *   },
     *   {
     *     "key": "OPEN",
     *     "value": "Open"
     *   }
     * }
     * 
     * The behavior of the options' keys depends on which Custom Fields endpoint you are using:
     * * Get and List: The options' keys will be included in the response.
     * * Create: Do not specify option keys. They will be automatically assigned when the field is created.
     * * Update: If you include an option with an existing key, the option with that key will be updated with the value you specify. If you would like to add an option, specify its value but not its key, as the key will be automatically assigned when the option is added.
     *     * **NOTE:** If you do not include an existing option in your Update request, it will be deleted.
     * @type {Array<Option>}
     * @memberof Field
     */
    options?: Array<Option>;
    /**
     * The Custom Field's group.
     * @type {string}
     * @memberof Field
     */
    group?: FieldGroupEnum;
    /**
     * 
     * @type {FieldUpdateDescription}
     * @memberof Field
     */
    description?: FieldUpdateDescription;
    /**
     * Custom Field multi-language profile behavior, which is one of:
     * 
     * `PRIMARY_ONLY`: The Custom Field can only have a value set on its primary language profile.
     * 
     * `OVERRIDABLE`: The Custom Field can have a value set on any alternate language profiles, which will override the primary language profile value when the alternate language profile is requested. When requested, if a value is not set for an alternate language profile, the primary language profile value will be returned.
     * 
     * `LANGUAGE_SPECIFIC`: The Custom Field can have a value set on any alternate language profiles. When requested, if a value is not set for an alternate language profile, no value will be returned.
     * @type {string}
     * @memberof Field
     */
    alternateLanguageBehavior?: string;
    /**
     * 
     * @type {Validation}
     * @memberof Field
     */
    validation?: Validation;
    /**
     * A list of entity types that the Custom Field is available to.
     * @type {Array<EntityTypes>}
     * @memberof Field
     */
    entityAvailability?: Array<EntityTypes>;
    /**
     * 
     * ID that should be used when referencing the field in API calls. This ID will also serve as the Custom Field's key in our upcoming Entities API endpoints.
     * Note that in Locations endpoints, Custom Fields are still referenced by their numeric **`id`**, which can be obtained by calling the Custom Fields: List endpoint with a **`v`** param before `20180809`.
     * (For Create requests) Must have a prefix of `c_` and contain only alphanumeric characters or underscores.
     * @type {string}
     * @memberof Field
     */
    id?: string;
    /**
     * 
     * The data type of the Custom Field's contents.
     * Note that the `LOCATION_LIST` type has been renamed to `ENTITY_LIST`. The former can still be obtained by calling Custom Fields endpoints with a **`v`** param before `20180809`.
     * @type {string}
     * @memberof Field
     */
    type: FieldTypeEnum;
}

/**
* @export
* @enum {string}
*/
export enum FieldGroupEnum {
    None = 'NONE',
    Group1 = 'GROUP_1',
    Group2 = 'GROUP_2',
    Group3 = 'GROUP_3',
    Group4 = 'GROUP_4',
    Group5 = 'GROUP_5',
    Group6 = 'GROUP_6',
    Group7 = 'GROUP_7',
    Group8 = 'GROUP_8',
    Group9 = 'GROUP_9',
    Group10 = 'GROUP_10',
    Group11 = 'GROUP_11',
    Group12 = 'GROUP_12',
    Group13 = 'GROUP_13',
    Group14 = 'GROUP_14',
    Group15 = 'GROUP_15',
    Group16 = 'GROUP_16',
    Group17 = 'GROUP_17',
    Group18 = 'GROUP_18',
    Group19 = 'GROUP_19',
    Group20 = 'GROUP_20',
    Group21 = 'GROUP_21',
    Group22 = 'GROUP_22',
    Group23 = 'GROUP_23',
    Group24 = 'GROUP_24',
    Group25 = 'GROUP_25',
    Group26 = 'GROUP_26',
    Group27 = 'GROUP_27',
    Group28 = 'GROUP_28',
    Group29 = 'GROUP_29',
    Group30 = 'GROUP_30'
}/**
* @export
* @enum {string}
*/
export enum FieldTypeEnum {
    Boolean = 'BOOLEAN',
    Cta = 'CTA',
    DailyTimes = 'DAILY_TIMES',
    Date = 'DATE',
    Gallery = 'GALLERY',
    Hours = 'HOURS',
    EntityList = 'ENTITY_LIST',
    MultilineText = 'MULTILINE_TEXT',
    MultiOption = 'MULTI_OPTION',
    Number = 'NUMBER',
    Photo = 'PHOTO',
    RichText = 'RICH_TEXT',
    SingleOption = 'SINGLE_OPTION',
    Text = 'TEXT',
    TextList = 'TEXT_LIST',
    Url = 'URL',
    Video = 'VIDEO',
    VideoGallery = 'VIDEO_GALLERY'
}

export function FieldFromJSON(json: any): Field {
    return FieldFromJSONTyped(json, false);
}

export function FieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): Field {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': FieldUpdateNameFromJSON(json['name']),
        'options': !exists(json, 'options') ? undefined : ((json['options'] as Array<any>).map(OptionFromJSON)),
        'group': !exists(json, 'group') ? undefined : json['group'],
        'description': !exists(json, 'description') ? undefined : FieldUpdateDescriptionFromJSON(json['description']),
        'alternateLanguageBehavior': !exists(json, 'alternateLanguageBehavior') ? undefined : json['alternateLanguageBehavior'],
        'validation': !exists(json, 'validation') ? undefined : ValidationFromJSON(json['validation']),
        'entityAvailability': !exists(json, 'entityAvailability') ? undefined : ((json['entityAvailability'] as Array<any>).map(EntityTypesFromJSON)),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'type': json['type'],
    };
}

export function FieldToJSON(value?: Field | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': FieldUpdateNameToJSON(value.name),
        'options': value.options === undefined ? undefined : ((value.options as Array<any>).map(OptionToJSON)),
        'group': value.group,
        'description': FieldUpdateDescriptionToJSON(value.description),
        'alternateLanguageBehavior': value.alternateLanguageBehavior,
        'validation': ValidationToJSON(value.validation),
        'entityAvailability': value.entityAvailability === undefined ? undefined : ((value.entityAvailability as Array<any>).map(EntityTypesToJSON)),
        'id': value.id,
        'type': value.type,
    };
}


