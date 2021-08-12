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


import * as runtime from '../runtime.ts';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IdResponse,
    IdResponseFromJSON,
    IdResponseToJSON,
    PushDataResponse,
    PushDataResponseFromJSON,
    PushDataResponseToJSON,
} from '../models/index.ts';

export interface PushDataRequest {
    accountId: string;
    v: string;
    body: string;
    connectorId?: string;
}

export interface TriggerConnectorRequest {
    accountId: string;
    v: string;
    connectorId: string;
    runMode?: TriggerConnectorRunModeEnum;
}

/**
 * 
 */
export class ConnectorsApi extends runtime.BaseAPI {

    /**
     * Pushes data to be processed by a connector, then initiates a run for that connector.  **NOTE**: If no connector is specified, all connectors with app-based source configurations will run. 
     * Connectors: Push Data
     */
    async pushDataRaw(requestParameters: PushDataRequest): Promise<runtime.ApiResponse<PushDataResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling pushData.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling pushData.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling pushData.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.connectorId !== undefined) {
            queryParameters['connectorId'] = requestParameters.connectorId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/plain';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/connectors`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PushDataResponseFromJSON(jsonValue));
    }

    /**
     * Pushes data to be processed by a connector, then initiates a run for that connector.  **NOTE**: If no connector is specified, all connectors with app-based source configurations will run. 
     * Connectors: Push Data
     */
    async pushData(requestParameters: PushDataRequest): Promise<PushDataResponse> {
        const response = await this.pushDataRaw(requestParameters);
        return await response.value();
    }

    /**
     * Triggers a run of the specified connector.
     * Connectors: Trigger
     */
    async triggerConnectorRaw(requestParameters: TriggerConnectorRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling triggerConnector.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling triggerConnector.');
        }

        if (requestParameters.connectorId === null || requestParameters.connectorId === undefined) {
            throw new runtime.RequiredError('connectorId','Required parameter requestParameters.connectorId was null or undefined when calling triggerConnector.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.runMode !== undefined) {
            queryParameters['runMode'] = requestParameters.runMode;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/connectors/{connectorId}/trigger`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"connectorId"}}`, encodeURIComponent(String(requestParameters.connectorId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Triggers a run of the specified connector.
     * Connectors: Trigger
     */
    async triggerConnector(requestParameters: TriggerConnectorRequest): Promise<IdResponse> {
        const response = await this.triggerConnectorRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum TriggerConnectorRunModeEnum {
    Default = 'DEFAULT',
    Comprehensive = 'COMPREHENSIVE'
}
