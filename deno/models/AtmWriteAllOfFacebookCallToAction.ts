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
 * Designates the Facebook Call-to-Action button text and value
 * 
 * Valid contents of **`value`** depends on the Call-to-Action's **`type`**:
 * * `NONE`: (optional)
 * * `BOOK_NOW`: URL
 * * `CALL_NOW`: Phone number
 * * `CONTACT_US`: URL
 * * `SEND_MESSAGE`: Any string
 * * `USE_APP`: URL
 * * `PLAY_GAME`: URL
 * * `SHOP_NOW`: URL
 * * `SIGN_UP`: URL
 * * `WATCH_VIDEO`: URL
 * * `SEND_EMAIL`: Email address
 * * `LEARN_MORE`: URL
 * * `PURCHASE_GIFT_CARDS`: URL
 * * `ORDER_NOW`: URL
 * * `FOLLOW_PAGE`: Any string
 * @export
 * @interface AtmWriteAllOfFacebookCallToAction
 */
export interface AtmWriteAllOfFacebookCallToAction {
    /**
     * The action the consumer is being prompted to take by the button's text
     * @type {string}
     * @memberof AtmWriteAllOfFacebookCallToAction
     */
    type: AtmWriteAllOfFacebookCallToActionTypeEnum;
    /**
     * Indicates where consumers will be directed to upon clicking the Call-to-Action button (e.g., a URL). It can be a free-form string or an embedded value, depending on what the user specifies.
     * 
     * For example, if the user sets the Facebook Call-to-Action as " 'Sign Up' using 'Website URL' " in the Yext platform, **`type`** will be `SIGN_UP` and **`value`** will be `[[websiteUrl]]`.
     * 
     * The Call-to-Action will have the same behavior if the user sets the value to "Custom Value" in the platform and embeds a field.
     * @type {string}
     * @memberof AtmWriteAllOfFacebookCallToAction
     */
    value?: string;
}

/**
* @export
* @enum {string}
*/
export enum AtmWriteAllOfFacebookCallToActionTypeEnum {
    None = 'NONE',
    BookNow = 'BOOK_NOW',
    CallNow = 'CALL_NOW',
    ContactUs = 'CONTACT_US',
    SendMessage = 'SEND_MESSAGE',
    UseApp = 'USE_APP',
    PlayGame = 'PLAY_GAME',
    ShopNow = 'SHOP_NOW',
    SignUp = 'SIGN_UP',
    WatchVideo = 'WATCH_VIDEO',
    SendEmail = 'SEND_EMAIL',
    LearnMore = 'LEARN_MORE',
    PurchaseGiftCards = 'PURCHASE_GIFT_CARDS',
    OrderNow = 'ORDER_NOW',
    FollowPage = 'FOLLOW_PAGE'
}

export function AtmWriteAllOfFacebookCallToActionFromJSON(json: any): AtmWriteAllOfFacebookCallToAction {
    return AtmWriteAllOfFacebookCallToActionFromJSONTyped(json, false);
}

export function AtmWriteAllOfFacebookCallToActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): AtmWriteAllOfFacebookCallToAction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function AtmWriteAllOfFacebookCallToActionToJSON(value?: AtmWriteAllOfFacebookCallToAction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'value': value.value,
    };
}


