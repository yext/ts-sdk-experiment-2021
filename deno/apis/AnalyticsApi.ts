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
    ActivitiesResponse,
    ActivitiesResponseFromJSON,
    ActivitiesResponseToJSON,
    ActivityLogRequest,
    ActivityLogRequestFromJSON,
    ActivityLogRequestToJSON,
    CatalogResponse,
    CatalogResponseFromJSON,
    CatalogResponseToJSON,
    CreateReportRequestBody,
    CreateReportRequestBodyFromJSON,
    CreateReportRequestBodyToJSON,
    CreateReportsResponse,
    CreateReportsResponseFromJSON,
    CreateReportsResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    MaximumDatesResponse,
    MaximumDatesResponseFromJSON,
    MaximumDatesResponseToJSON,
    ReportStatusResponse,
    ReportStatusResponseFromJSON,
    ReportStatusResponseToJSON,
} from '../models/index.ts';

export interface ActivityLogOperationRequest {
    accountId: string;
    v: string;
    activityLogRequest?: ActivityLogRequest;
}

export interface CreateReportsRequest {
    accountId: string;
    v: string;
    async?: boolean;
    callback?: string;
    createReportRequestBody?: CreateReportRequestBody;
}

export interface GetCatalogRequest {
    accountId: string;
    v: string;
}

export interface GetMaxDatesRequest {
    accountId: string;
    v: string;
}

export interface ReportStatusRequest {
    accountId: string;
    v: string;
    reportId: number;
}

/**
 * 
 */
export class AnalyticsApi extends runtime.BaseAPI {

    /**
     * Fetches account activity information.
     * Activity Log
     */
    async activityLogRaw(requestParameters: ActivityLogOperationRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ActivitiesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling activityLog.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling activityLog.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/analytics/activity`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ActivityLogRequestToJSON(requestParameters.activityLogRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ActivitiesResponseFromJSON(jsonValue));
    }

    /**
     * Fetches account activity information.
     * Activity Log
     */
    async activityLog(requestParameters: ActivityLogOperationRequest, initOverrides?: RequestInit): Promise<ActivitiesResponse> {
        const response = await this.activityLogRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a report to retrieve analytics for each of your products using synchronous or asynchronous requests depending on the size of your data.
     * Reports
     */
    async createReportsRaw(requestParameters: CreateReportsRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CreateReportsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createReports.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createReports.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.async !== undefined) {
            queryParameters['async'] = requestParameters.async;
        }

        if (requestParameters.callback !== undefined) {
            queryParameters['callback'] = requestParameters.callback;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/analytics/reports`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateReportRequestBodyToJSON(requestParameters.createReportRequestBody),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateReportsResponseFromJSON(jsonValue));
    }

    /**
     * Create a report to retrieve analytics for each of your products using synchronous or asynchronous requests depending on the size of your data.
     * Reports
     */
    async createReports(requestParameters: CreateReportsRequest, initOverrides?: RequestInit): Promise<CreateReportsResponse> {
        const response = await this.createReportsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List of all metrics for which reporting data is available, along with their completed dates.
     * Catalog
     */
    async getCatalogRaw(requestParameters: GetCatalogRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CatalogResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getCatalog.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getCatalog.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/analytics/catalog`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CatalogResponseFromJSON(jsonValue));
    }

    /**
     * List of all metrics for which reporting data is available, along with their completed dates.
     * Catalog
     */
    async getCatalog(requestParameters: GetCatalogRequest, initOverrides?: RequestInit): Promise<CatalogResponse> {
        const response = await this.getCatalogRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetch the completed date for Listings and Bing metrics. Fetching the completed date for individual metrics can be done using the catalog endpoint.
     * Max Dates
     */
    async getMaxDatesRaw(requestParameters: GetMaxDatesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<MaximumDatesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getMaxDates.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getMaxDates.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/analytics/maxdates`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MaximumDatesResponseFromJSON(jsonValue));
    }

    /**
     * Fetch the completed date for Listings and Bing metrics. Fetching the completed date for individual metrics can be done using the catalog endpoint.
     * Max Dates
     */
    async getMaxDates(requestParameters: GetMaxDatesRequest, initOverrides?: RequestInit): Promise<MaximumDatesResponse> {
        const response = await this.getMaxDatesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Checks the status of a Report created with async=true.
     * Report Status
     */
    async reportStatusRaw(requestParameters: ReportStatusRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ReportStatusResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling reportStatus.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling reportStatus.');
        }

        if (requestParameters.reportId === null || requestParameters.reportId === undefined) {
            throw new runtime.RequiredError('reportId','Required parameter requestParameters.reportId was null or undefined when calling reportStatus.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/analytics/standardreports/{reportId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reportId"}}`, encodeURIComponent(String(requestParameters.reportId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReportStatusResponseFromJSON(jsonValue));
    }

    /**
     * Checks the status of a Report created with async=true.
     * Report Status
     */
    async reportStatus(requestParameters: ReportStatusRequest, initOverrides?: RequestInit): Promise<ReportStatusResponse> {
        const response = await this.reportStatusRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
