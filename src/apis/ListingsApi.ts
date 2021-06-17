/* tslint:disable */
/* eslint-disable */
/**
 * Yext API
 * # Policies and Conventions  This section gives you the basic information you need to use our APIs.  ## API Availability  We currently offer three APIs: * **Knowledge API** * **Live API** * **Administrative API**  Each API is designed for a particular set of users.  To determine which APIs are available to users like you, see the \"Overview\" page in the Docs section of this site.  <a href=\"https://app.getpostman.com/run-collection/c42e6f39b0b10e56b1ca\"><img src=\"https://run.pstmn.io/button.svg\" alt=\"Run in Postman\" /></a>  (Postman collection includes Knowledge API, Live API, and Administrative API calls.)  ## Authentication All requests must be authenticated using an app’s API key via the api_key query parameter. Additionally, the API key can also be passed in as a header parameter named api-key. Note that this is slightly different from the parameter name accepted as a query param (api_key)  <pre>GET https://api.yext.com/v2/accounts/[accountId]/locations?<b>api_key=API_KEY</b>&v=YYYYMMDD</pre>  The API key should be kept secret.  ## Versioning All requests must be versioned using the **`v`** parameter.  <pre>GET https://api.yext.com/v2/accounts/[accountId]/locations?api_key=API_KEY&<b>v=YYYYMMDD</b></pre>  The **`v`** parameter (a date in `YYYYMMDD` format) is designed to give you the freedom to adapt to Yext API changes on your own schedule. When you pass this parameter, any backward-incompatible changes we made to the API after the specified date will not affect the behavior of the request or the content of the response. You will still benefit from any bug fixes or backward-compatible changes we may have made after the date you\'ve specified.  **NOTE:** Yext has the ability to make changes that affect previous versions of the API, if necessary.  ## Serialization API v2 only accepts data in JSON format.  ## Content-Type Headers For all requests that include a request body, the `Content-Type` header must be included and set to `application/json`.  ## PUT Requests Generally, all `PUT` operations behave as true RESTful `PUT`s, in which entire objects are overwritten with the provided content.  However, certain endpoints used to work with large, frequently-changing object models may have different semantics to prevent the accidental removal of content (e.g., Locations: Update lets you omit fields you don’t wish to change).  ## Errors and Warnings There are three kinds of issues that can be reported for a given request:  * **`FATAL_ERROR`**     * An issue caused the entire request to be rejected. * **`NON_FATAL_ERROR`**     * An item is rejected, but other items present in the request are accepted (e.g., one invalid Product List item).     * A field is rejected, but the item otherwise is accepted (e.g., invalid website URL in a Location). * **`WARNING`**     * The request did not adhere to our best practices or recommendations, but the data was accepted anyway (e.g., data was sent that may cause some listings to become unavailable, a deprecated API was used, or we changed the format of a field\'s content to meet our requirements).  ## Dates and Times * We always use milliseconds since epoch (a.k.a. Unix time) for timestamps (e.g., review creation times, webhook update times). * We always use ISO 8601 without timezone for local date times (e.g., Event start time, Event end time). Event times are always interpreted in the local timezone of their associated locations. * Dates are transmitted as strings: `YYYY-MM-DD`.  ## Account ID In keeping with RESTful design principles, every URL in API v2 has an account ID prefix. This prefix helps to ensure that you have unique URLs for all resources.  In addition to specifying resources by explicit account ID, the following two macros are defined: * **`me`** - refers to the account that owns the API key sent with the request * **`all`** - refers to the account that owns the API key sent with the request, as well as all sub-accounts (recursively)  **IMPORTANT:** The **`me`** macro is supported in all API methods.  The **`all`** macro will only be supported in certain URLs. Currently, it can only be used in Analytics, Reviews, and some Listings endpoints.  ### Examples This URL refers to an analytics report for all locations in account 123. <pre>https://api.yext.com/v2/accounts/<b>123</b>/analytics/reports?api_key=456&v=20160822</pre>  This URL refers to an analytics report for all locations in the account that owns API key 456. <pre>https://api.yext.com/v2/accounts/<b>me</b>/analytics/reports?<b>api_key=456</b>&v=20160822</pre>  This URL refers to an analytics report for all locations in the account that owns API key 456, as well as all locations from any of its child accounts. <pre>https://api.yext.com/v2/accounts/<b>all</b>/analytics/reports?<b>api_key=456</b>&v=20160822</pre>  ## Actor Headers  To attribute changes to a particular user, all `PUT`, `POST`, and `DELETE` requests may be passed with the following headers.  **NOTE:** If you choose to provide actor headers, and we are unable to authenticate the request using the values you provide, the request will result in an error and fail.  * Attribute activity to customer user via username     * Header: `Yext-Username`     * Value: Customer user’s username * Attribute activity to customer user via Yext user ID     * Header: `Yext-User-Id`     * Value: Customer user’s Yext user ID  Changes will be logged as follows:  * App with no designated actor     * History Entry \"Updated By\" Value: `App [App ID] - ‘[App Name]’`     * Example: `App 432 - ‘Hello World App’` * App with customer user actor     * History Entry \"Updated By\" Value: `[user name] ([user email]) (App [App ID] - ‘[App Name]’)`     * Example: `Jordan Smith (jsmith@example.com) (App 432 - ‘Hello World App’)`  ## Response Format * **`meta`**     * Response metadata * **`meta.uuid`**     * Unique ID for this request / response * **`meta.errors[]`**     * List of errors and warnings * **`meta.errors[].code`**     * Code that uniquely identifies the error or warning * **`meta.errors[].type`**     * One of:         * `FATAL_ERROR`         * `NON_FATAL_ERROR`         * `WARNING`     * See \"Errors and Warnings\" above for details. * **`meta.errors[].message`**     * An explanation of the issue * **`response`**     * The main content (body) of the response  Example: <pre><code> {     \"meta\": {         \"uuid\": \"bb0c7e19-4dc3-4891-bfa5-8593b1f124ad\",         \"errors\": [             {                 \"code\": ...error code...,                 \"type\": ...error, fatal error, non fatal error, or warning...,                 \"message\": ...explanation of the issue...             }         ]     },     \"response\": {         ...results...     } } </code></pre>  ## Status Codes * `200 OK`    * Either there are no errors or warnings, or the only issues are of type `WARNING`. * `207 Multi-Status`     * There are errors of type `itemError` or `fieldError` (but none of type `requestError`). * `400 Bad Request`     * A parameter is invalid, or a required parameter is missing. This includes the case where no API key is provided and the case where a resource ID is specified incorrectly in a path.     * This status is if any of the response errors are of type `requestError`. * `401 Unauthorized`     * The API key provided is invalid. * `403 Forbidden`     * The requested information cannot be viewed by the acting user. * `404 Not Found`     * The endpoint does not exist. * `405 Method Not Allowed`     * The request is using a method that is not allowed (e.g., `POST` with a `GET`-only endpoint). * `409 Conflict`     * The request could not be completed in its current state.     * Use the information included in the response to modify the request and retry. * `429 Too Many Requests`     * You have exceeded your rate limit / quota. * `500 Internal Server Error`     * Yext’s servers are not operating as expected. The request is likely valid but should be resent later. * `504 Timeout`     * Yext’s servers took too long to handle this request, and it timed out.  ## Quotas and Rate Limits Default quotas and rate limits are as follows.  * **Knowledge API** *(includes Analytics, Listings, Knowledge Manager, Reviews, Social, and User endpoints)*: 5,000 requests per hour * **Analytics API**: 1,000 requests per 60-minute sliding window (in addition to the Knowledge API quota) * **Administrative API**: 1,000 requests per hour * **Live API**: 100,000 requests per hour  With the exception of the Analytics API quota, hourly quotas are calculated from the beginning of the hour (minute zero, `:00`), not on a rolling basis past 60 minutes.  **NOTE:** Webhook requests do not count towards an account’s quota.  For the most current and accurate rate-limit usage information for a particular request type, check the **`Rate-Limit-Remaining`** and **`Rate-Limit-Limit`** HTTP headers of your API responses.  If you are currently over your limit, our API will return a `429` error, and the response object returned by our API will be empty. We will also include a **`Rate-Limit-Reset`** header in the response, which indicates when you will have additional quota.  ## Client- vs. Yext-assigned IDs You can set the ID for the following objects when you create them. If you do not provide an ID, Yext will generate one for you.  * Account * User * Location * Bio List * Menu * Product List * Event List * Bio List Item * Menu Item * Product List Item * Event List Item  ## Logging With the exception of Live API requests, all API requests are logged. API logs can be found in your Developer Console and are stored for 30 days. 
 *
 * The version of the OpenAPI document: 2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    AnswerRequest,
    AnswerRequestFromJSON,
    AnswerRequestToJSON,
    CompleteVerificationResponse,
    CompleteVerificationResponseFromJSON,
    CompleteVerificationResponseToJSON,
    CreateAnswerResponse,
    CreateAnswerResponseFromJSON,
    CreateAnswerResponseToJSON,
    DuplicatesResponse,
    DuplicatesResponseFromJSON,
    DuplicatesResponseToJSON,
    EmptyResponse,
    EmptyResponseFromJSON,
    EmptyResponseToJSON,
    EntityListingsResponse,
    EntityListingsResponseFromJSON,
    EntityListingsResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IdResponse,
    IdResponseFromJSON,
    IdResponseToJSON,
    InitiateVerificationResponse,
    InitiateVerificationResponseFromJSON,
    InitiateVerificationResponseToJSON,
    InviteAdminsResponse,
    InviteAdminsResponseFromJSON,
    InviteAdminsResponseToJSON,
    ListAdminsResponse,
    ListAdminsResponseFromJSON,
    ListAdminsResponseToJSON,
    ListMethodsResponse,
    ListMethodsResponseFromJSON,
    ListMethodsResponseToJSON,
    ListQuestionsReponse,
    ListQuestionsReponseFromJSON,
    ListQuestionsReponseToJSON,
    ListStatusesResponse,
    ListStatusesResponseFromJSON,
    ListStatusesResponseToJSON,
    ListingsResponse,
    ListingsResponseFromJSON,
    ListingsResponseToJSON,
    PublisherSuggestionResponse,
    PublisherSuggestionResponseFromJSON,
    PublisherSuggestionResponseToJSON,
    PublisherSuggestionsResponse,
    PublisherSuggestionsResponseFromJSON,
    PublisherSuggestionsResponseToJSON,
    PublishersResponse,
    PublishersResponseFromJSON,
    PublishersResponseToJSON,
    QuestionResponse,
    QuestionResponseFromJSON,
    QuestionResponseToJSON,
    UpdateAnswerResponse,
    UpdateAnswerResponseFromJSON,
    UpdateAnswerResponseToJSON,
    VerificationAdminInvite,
    VerificationAdminInviteFromJSON,
    VerificationAdminInviteToJSON,
    VerificationCompletion,
    VerificationCompletionFromJSON,
    VerificationCompletionToJSON,
    VerificationInitiation,
    VerificationInitiationFromJSON,
    VerificationInitiationToJSON,
} from '../models';

export interface CompleteVerificationRequest {
    accountId: string;
    v: string;
    publisherId: string;
    requests: Array<VerificationCompletion>;
}

export interface CreateAnswerRequest {
    accountId: string;
    questionId: number;
    v: string;
    createAnswerRequest: AnswerRequest;
}

export interface CreateDuplicateRequest {
    accountId: string;
    v: string;
    publisherId: string;
    url: string;
    locationId?: string;
}

export interface DeleteAnswerRequest {
    accountId: string;
    questionId: number;
    answerId: number;
    v: string;
}

export interface DeleteDuplicateRequest {
    accountId: string;
    v: string;
    duplicateId: string;
}

export interface DeleteListingsRequest {
    accountId: string;
    v: string;
    entityIds?: Array<string>;
    publisherIds?: Array<string>;
}

export interface GetPublisherSuggestionRequest {
    accountId: string;
    v: string;
    suggestionId: string;
}

export interface GetQuestionRequest {
    accountId: string;
    questionId: number;
    v: string;
}

export interface InitiateVerificationRequest {
    accountId: string;
    v: string;
    publisherId: string;
    locale: string;
    requests: Array<VerificationInitiation>;
}

export interface InviteAdminsRequest {
    accountId: string;
    v: string;
    publisherId: string;
    requests: Array<VerificationAdminInvite>;
}

export interface ListAdminsRequest {
    accountId: string;
    v: string;
    publisherId: string;
    entityIds?: string;
    pageToken?: string;
    limit?: number;
    offset?: number;
}

export interface ListDuplicatesRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    locationIds?: Array<string>;
    publisherIds?: Array<string>;
    statuses?: Array<ListDuplicatesStatusesEnum>;
}

export interface ListEntityListingsRequest {
    accountId: string;
    v: string;
    entityIds?: Array<string>;
    publisherIds?: Array<string>;
    statuses?: Array<ListEntityListingsStatusesEnum>;
    language?: string;
    pageToken?: string;
    limit?: number;
    offset?: number;
}

export interface ListListingsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    locationIds?: Array<string>;
    publisherIds?: Array<string>;
    statuses?: Array<ListListingsStatusesEnum>;
    language?: string;
}

export interface ListMethodsRequest {
    accountId: string;
    v: string;
    publisherId: string;
    locale: string;
    entityIds?: string;
    pageToken?: string;
    limit?: number;
    offset?: number;
}

export interface ListPublisherSuggestionsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    locationIds?: Array<string>;
    publisherIds?: Array<string>;
    statuses?: Array<ListPublisherSuggestionsStatusesEnum>;
}

export interface ListPublishersRequest {
    accountId: string;
    v: string;
    subset?: string;
    entityType?: Array<ListPublishersEntityTypeEnum>;
}

export interface ListQuestionsRequest {
    accountId: string;
    v: string;
    filter?: string;
    limit?: number;
    offset?: number;
    pageToken?: string;
}

export interface ListStatusesRequest {
    accountId: string;
    v: string;
    publisherId: string;
    entityIds?: string;
    pageToken?: string;
    limit?: number;
    offset?: number;
}

export interface OptInListingsRequest {
    accountId: string;
    v: string;
    locationIds?: Array<string>;
    publisherIds?: Array<string>;
}

export interface OptOutListingsRequest {
    accountId: string;
    v: string;
    locationIds?: Array<string>;
    publisherIds?: Array<string>;
}

export interface SuppressDuplicateRequest {
    accountId: string;
    v: string;
    duplicateId: string;
}

export interface UpdateAnswerRequest {
    accountId: string;
    questionId: number;
    answerId: number;
    v: string;
    updateAnswerRequest: AnswerRequest;
}

export interface UpdatePublisherSuggestionRequest {
    accountId: string;
    v: string;
    suggestionId: string;
    status: UpdatePublisherSuggestionStatusEnum;
}

/**
 * 
 */
export class ListingsApi extends runtime.BaseAPI {

    /**
     * Provides verification codes to complete the verification for entities in an account. 
     * Verification: Complete
     */
    async completeVerificationRaw(requestParameters: CompleteVerificationRequest): Promise<runtime.ApiResponse<CompleteVerificationResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling completeVerification.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling completeVerification.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling completeVerification.');
        }

        if (requestParameters.requests === null || requestParameters.requests === undefined) {
            throw new runtime.RequiredError('requests','Required parameter requestParameters.requests was null or undefined when calling completeVerification.');
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
            path: `/accounts/{accountId}/listings/verifications/{publisherId}/complete`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requests.map(VerificationCompletionToJSON),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CompleteVerificationResponseFromJSON(jsonValue));
    }

    /**
     * Provides verification codes to complete the verification for entities in an account. 
     * Verification: Complete
     */
    async completeVerification(requestParameters: CompleteVerificationRequest): Promise<CompleteVerificationResponse> {
        const response = await this.completeVerificationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new Answer on a Question.
     * Answer: Create
     */
    async createAnswerRaw(requestParameters: CreateAnswerRequest): Promise<runtime.ApiResponse<CreateAnswerResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createAnswer.');
        }

        if (requestParameters.questionId === null || requestParameters.questionId === undefined) {
            throw new runtime.RequiredError('questionId','Required parameter requestParameters.questionId was null or undefined when calling createAnswer.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createAnswer.');
        }

        if (requestParameters.createAnswerRequest === null || requestParameters.createAnswerRequest === undefined) {
            throw new runtime.RequiredError('createAnswerRequest','Required parameter requestParameters.createAnswerRequest was null or undefined when calling createAnswer.');
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
            path: `/accounts/{accountId}/questions/{questionId}/answers`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"questionId"}}`, encodeURIComponent(String(requestParameters.questionId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AnswerRequestToJSON(requestParameters.createAnswerRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateAnswerResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new Answer on a Question.
     * Answer: Create
     */
    async createAnswer(requestParameters: CreateAnswerRequest): Promise<CreateAnswerResponse> {
        const response = await this.createAnswerRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates a new Duplicate with **`status`** `SUPPRESSION_REQUESTED`.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Create
     */
    async createDuplicateRaw(requestParameters: CreateDuplicateRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createDuplicate.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createDuplicate.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling createDuplicate.');
        }

        if (requestParameters.url === null || requestParameters.url === undefined) {
            throw new runtime.RequiredError('url','Required parameter requestParameters.url was null or undefined when calling createDuplicate.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.locationId !== undefined) {
            queryParameters['locationId'] = requestParameters.locationId;
        }

        if (requestParameters.publisherId !== undefined) {
            queryParameters['publisherId'] = requestParameters.publisherId;
        }

        if (requestParameters.url !== undefined) {
            queryParameters['url'] = requestParameters.url;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/duplicates`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new Duplicate with **`status`** `SUPPRESSION_REQUESTED`.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Create
     */
    async createDuplicate(requestParameters: CreateDuplicateRequest): Promise<IdResponse> {
        const response = await this.createDuplicateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an Answer for a Question
     * Answer: Delete
     */
    async deleteAnswerRaw(requestParameters: DeleteAnswerRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteAnswer.');
        }

        if (requestParameters.questionId === null || requestParameters.questionId === undefined) {
            throw new runtime.RequiredError('questionId','Required parameter requestParameters.questionId was null or undefined when calling deleteAnswer.');
        }

        if (requestParameters.answerId === null || requestParameters.answerId === undefined) {
            throw new runtime.RequiredError('answerId','Required parameter requestParameters.answerId was null or undefined when calling deleteAnswer.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteAnswer.');
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
            path: `/accounts/{accountId}/questions/{questionId}/answers/{answerId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"questionId"}}`, encodeURIComponent(String(requestParameters.questionId))).replace(`{${"answerId"}}`, encodeURIComponent(String(requestParameters.answerId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes an Answer for a Question
     * Answer: Delete
     */
    async deleteAnswer(requestParameters: DeleteAnswerRequest): Promise<EmptyResponse> {
        const response = await this.deleteAnswerRaw(requestParameters);
        return await response.value();
    }

    /**
     * Indicates that a Duplicate should be ignored.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Delete
     */
    async deleteDuplicateRaw(requestParameters: DeleteDuplicateRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteDuplicate.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteDuplicate.');
        }

        if (requestParameters.duplicateId === null || requestParameters.duplicateId === undefined) {
            throw new runtime.RequiredError('duplicateId','Required parameter requestParameters.duplicateId was null or undefined when calling deleteDuplicate.');
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
            path: `/accounts/{accountId}/listings/duplicates/{duplicateId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"duplicateId"}}`, encodeURIComponent(String(requestParameters.duplicateId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Indicates that a Duplicate should be ignored.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Delete
     */
    async deleteDuplicate(requestParameters: DeleteDuplicateRequest): Promise<EmptyResponse> {
        const response = await this.deleteDuplicateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes event listings from publishers. If deletion is not supported by the publisher, then service is removed instead.  **NOTE:** You can delete a maximum of 100 listings in a single request. If the number of Entity IDs multiplied by the number of Publisher IDs in your request exceeds 100, you will receive a 400 error response.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Entity Listings: Delete
     */
    async deleteListingsRaw(requestParameters: DeleteListingsRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteListings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteListings.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityIds) {
            queryParameters['entityIds'] = requestParameters.entityIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/delete`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes event listings from publishers. If deletion is not supported by the publisher, then service is removed instead.  **NOTE:** You can delete a maximum of 100 listings in a single request. If the number of Entity IDs multiplied by the number of Publisher IDs in your request exceeds 100, you will receive a 400 error response.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Entity Listings: Delete
     */
    async deleteListings(requestParameters: DeleteListingsRequest): Promise<EmptyResponse> {
        const response = await this.deleteListingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Fetches details of a specific Publisher Suggestion
     * Publisher Suggestions: Get
     */
    async getPublisherSuggestionRaw(requestParameters: GetPublisherSuggestionRequest): Promise<runtime.ApiResponse<PublisherSuggestionResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getPublisherSuggestion.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getPublisherSuggestion.');
        }

        if (requestParameters.suggestionId === null || requestParameters.suggestionId === undefined) {
            throw new runtime.RequiredError('suggestionId','Required parameter requestParameters.suggestionId was null or undefined when calling getPublisherSuggestion.');
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
            path: `/accounts/{accountId}/listings/publishersuggestions/{suggestionId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"suggestionId"}}`, encodeURIComponent(String(requestParameters.suggestionId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PublisherSuggestionResponseFromJSON(jsonValue));
    }

    /**
     * Fetches details of a specific Publisher Suggestion
     * Publisher Suggestions: Get
     */
    async getPublisherSuggestion(requestParameters: GetPublisherSuggestionRequest): Promise<PublisherSuggestionResponse> {
        const response = await this.getPublisherSuggestionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve information for a Question
     * Question: Get
     */
    async getQuestionRaw(requestParameters: GetQuestionRequest): Promise<runtime.ApiResponse<QuestionResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getQuestion.');
        }

        if (requestParameters.questionId === null || requestParameters.questionId === undefined) {
            throw new runtime.RequiredError('questionId','Required parameter requestParameters.questionId was null or undefined when calling getQuestion.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getQuestion.');
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
            path: `/accounts/{accountId}/questions/{questionId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"questionId"}}`, encodeURIComponent(String(requestParameters.questionId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QuestionResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve information for a Question
     * Question: Get
     */
    async getQuestion(requestParameters: GetQuestionRequest): Promise<QuestionResponse> {
        const response = await this.getQuestionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Initiate verification for entities in an account. This request will trigger verification codes being sent to the specified addresses, phone numbers, or email addresses. 
     * Verification: Initiate
     */
    async initiateVerificationRaw(requestParameters: InitiateVerificationRequest): Promise<runtime.ApiResponse<InitiateVerificationResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling initiateVerification.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling initiateVerification.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling initiateVerification.');
        }

        if (requestParameters.locale === null || requestParameters.locale === undefined) {
            throw new runtime.RequiredError('locale','Required parameter requestParameters.locale was null or undefined when calling initiateVerification.');
        }

        if (requestParameters.requests === null || requestParameters.requests === undefined) {
            throw new runtime.RequiredError('requests','Required parameter requestParameters.requests was null or undefined when calling initiateVerification.');
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
            path: `/accounts/{accountId}/listings/verifications/{publisherId}/{locale}/initiate`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))).replace(`{${"locale"}}`, encodeURIComponent(String(requestParameters.locale))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requests.map(VerificationInitiationToJSON),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InitiateVerificationResponseFromJSON(jsonValue));
    }

    /**
     * Initiate verification for entities in an account. This request will trigger verification codes being sent to the specified addresses, phone numbers, or email addresses. 
     * Verification: Initiate
     */
    async initiateVerification(requestParameters: InitiateVerificationRequest): Promise<InitiateVerificationResponse> {
        const response = await this.initiateVerificationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sends invitations to new listing admins for entities in an account. For Google My Business listings, the admins will be given owner-level access. 
     * Listing Admin: Invite
     */
    async inviteAdminsRaw(requestParameters: InviteAdminsRequest): Promise<runtime.ApiResponse<InviteAdminsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling inviteAdmins.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling inviteAdmins.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling inviteAdmins.');
        }

        if (requestParameters.requests === null || requestParameters.requests === undefined) {
            throw new runtime.RequiredError('requests','Required parameter requestParameters.requests was null or undefined when calling inviteAdmins.');
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
            path: `/accounts/{accountId}/listings/admins/{publisherId}/invite`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requests.map(VerificationAdminInviteToJSON),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InviteAdminsResponseFromJSON(jsonValue));
    }

    /**
     * Sends invitations to new listing admins for entities in an account. For Google My Business listings, the admins will be given owner-level access. 
     * Listing Admin: Invite
     */
    async inviteAdmins(requestParameters: InviteAdminsRequest): Promise<InviteAdminsResponse> {
        const response = await this.inviteAdminsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve listing admins for entities in an account. 
     * Listing Admins: List
     */
    async listAdminsRaw(requestParameters: ListAdminsRequest): Promise<runtime.ApiResponse<ListAdminsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listAdmins.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listAdmins.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling listAdmins.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityIds !== undefined) {
            queryParameters['entityIds'] = requestParameters.entityIds;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/admins/{publisherId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListAdminsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve listing admins for entities in an account. 
     * Listing Admins: List
     */
    async listAdmins(requestParameters: ListAdminsRequest): Promise<ListAdminsResponse> {
        const response = await this.listAdminsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve Duplicates for an account  If the **`v`** parameter is `20180802` or later: only duplicates of live listings (**`status`**: `LIVE`) will be included 
     * Duplicates: List
     */
    async listDuplicatesRaw(requestParameters: ListDuplicatesRequest): Promise<runtime.ApiResponse<DuplicatesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listDuplicates.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listDuplicates.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.locationIds) {
            queryParameters['locationIds'] = requestParameters.locationIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/duplicates`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DuplicatesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve Duplicates for an account  If the **`v`** parameter is `20180802` or later: only duplicates of live listings (**`status`**: `LIVE`) will be included 
     * Duplicates: List
     */
    async listDuplicates(requestParameters: ListDuplicatesRequest): Promise<DuplicatesResponse> {
        const response = await this.listDuplicatesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Entity Listings matching the given criteria. Includes the status of each Listing and reasons why a Listing may not be live. This endpoint currently only supports Event Listings.  The results will first be sorted by publisher and then by Entity.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Entity Listings: List
     */
    async listEntityListingsRaw(requestParameters: ListEntityListingsRequest): Promise<runtime.ApiResponse<EntityListingsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listEntityListings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listEntityListings.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityIds) {
            queryParameters['entityIds'] = requestParameters.entityIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/entitylistings`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EntityListingsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Entity Listings matching the given criteria. Includes the status of each Listing and reasons why a Listing may not be live. This endpoint currently only supports Event Listings.  The results will first be sorted by publisher and then by Entity.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Entity Listings: List
     */
    async listEntityListings(requestParameters: ListEntityListingsRequest): Promise<EntityListingsResponse> {
        const response = await this.listEntityListingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Listings matching the given criteria including status and reasons why a Listing may be unavailable  The results will first be sorted by publisher and then by Location.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Listings: List
     */
    async listListingsRaw(requestParameters: ListListingsRequest): Promise<runtime.ApiResponse<ListingsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listListings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listListings.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.locationIds) {
            queryParameters['locationIds'] = requestParameters.locationIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/listings`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListingsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Listings matching the given criteria including status and reasons why a Listing may be unavailable  The results will first be sorted by publisher and then by Location.  **Support for `all` macro:** If you would like to use this endpoint to take action on your account and all of its sub-accounts, you can use the `all` macro in place of your account ID in your request URLs. For more information, see the \"Account ID\" section of \"Policies and Conventions\" at the top of this page. 
     * Listings: List
     */
    async listListings(requestParameters: ListListingsRequest): Promise<ListingsResponse> {
        const response = await this.listListingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve verification methods for entities in an account 
     * Verification Methods: List
     */
    async listMethodsRaw(requestParameters: ListMethodsRequest): Promise<runtime.ApiResponse<ListMethodsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listMethods.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listMethods.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling listMethods.');
        }

        if (requestParameters.locale === null || requestParameters.locale === undefined) {
            throw new runtime.RequiredError('locale','Required parameter requestParameters.locale was null or undefined when calling listMethods.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityIds !== undefined) {
            queryParameters['entityIds'] = requestParameters.entityIds;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/verifications/{publisherId}/{locale}/methods`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))).replace(`{${"locale"}}`, encodeURIComponent(String(requestParameters.locale))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListMethodsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve verification methods for entities in an account 
     * Verification Methods: List
     */
    async listMethods(requestParameters: ListMethodsRequest): Promise<ListMethodsResponse> {
        const response = await this.listMethodsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve suggestions publishers have submitted for the Locations in an account
     * Publisher Suggestions: List
     */
    async listPublisherSuggestionsRaw(requestParameters: ListPublisherSuggestionsRequest): Promise<runtime.ApiResponse<PublisherSuggestionsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listPublisherSuggestions.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listPublisherSuggestions.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.locationIds) {
            queryParameters['locationIds'] = requestParameters.locationIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/publishersuggestions`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PublisherSuggestionsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve suggestions publishers have submitted for the Locations in an account
     * Publisher Suggestions: List
     */
    async listPublisherSuggestions(requestParameters: ListPublisherSuggestionsRequest): Promise<PublisherSuggestionsResponse> {
        const response = await this.listPublisherSuggestionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a list of publishers included in an account\'s subscription 
     * Publishers: List
     */
    async listPublishersRaw(requestParameters: ListPublishersRequest): Promise<runtime.ApiResponse<PublishersResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listPublishers.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listPublishers.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.subset !== undefined) {
            queryParameters['subset'] = requestParameters.subset;
        }

        if (requestParameters.entityType) {
            queryParameters['entityType'] = requestParameters.entityType.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/publishers`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PublishersResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a list of publishers included in an account\'s subscription 
     * Publishers: List
     */
    async listPublishers(requestParameters: ListPublishersRequest): Promise<PublishersResponse> {
        const response = await this.listPublishersRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a list of Questions within an account
     * Questions: List
     */
    async listQuestionsRaw(requestParameters: ListQuestionsRequest): Promise<runtime.ApiResponse<ListQuestionsReponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listQuestions.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listQuestions.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.filter !== undefined) {
            queryParameters['filter'] = requestParameters.filter;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/questions`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListQuestionsReponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a list of Questions within an account
     * Questions: List
     */
    async listQuestions(requestParameters: ListQuestionsRequest): Promise<ListQuestionsReponse> {
        const response = await this.listQuestionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve verification statuses for entities in an account 
     * Verification Statuses: List
     */
    async listStatusesRaw(requestParameters: ListStatusesRequest): Promise<runtime.ApiResponse<ListStatusesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listStatuses.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listStatuses.');
        }

        if (requestParameters.publisherId === null || requestParameters.publisherId === undefined) {
            throw new runtime.RequiredError('publisherId','Required parameter requestParameters.publisherId was null or undefined when calling listStatuses.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.entityIds !== undefined) {
            queryParameters['entityIds'] = requestParameters.entityIds;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/verifications/{publisherId}/statuses`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"publisherId"}}`, encodeURIComponent(String(requestParameters.publisherId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ListStatusesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve verification statuses for entities in an account 
     * Verification Statuses: List
     */
    async listStatuses(requestParameters: ListStatusesRequest): Promise<ListStatusesResponse> {
        const response = await this.listStatusesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Opts designated locations into designated publishers  **NOTE:** The number of Location IDs multiplied by the number of Publisher IDs is capped at 100. If you exceed this, you will receive a 400 error response. 
     * Listings: Opt In
     */
    async optInListingsRaw(requestParameters: OptInListingsRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling optInListings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling optInListings.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.locationIds) {
            queryParameters['locationIds'] = requestParameters.locationIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/listings/optin`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Opts designated locations into designated publishers  **NOTE:** The number of Location IDs multiplied by the number of Publisher IDs is capped at 100. If you exceed this, you will receive a 400 error response. 
     * Listings: Opt In
     */
    async optInListings(requestParameters: OptInListingsRequest): Promise<EmptyResponse> {
        const response = await this.optInListingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Opts designated locations out of designated publishers  **NOTE:** The number of Location IDs multiplied by the number of Publisher IDs is capped at 100. If you exceed this, you will receive a 400 error response. 
     * Listings: Opt Out
     */
    async optOutListingsRaw(requestParameters: OptOutListingsRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling optOutListings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling optOutListings.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.locationIds) {
            queryParameters['locationIds'] = requestParameters.locationIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/listings/optout`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Opts designated locations out of designated publishers  **NOTE:** The number of Location IDs multiplied by the number of Publisher IDs is capped at 100. If you exceed this, you will receive a 400 error response. 
     * Listings: Opt Out
     */
    async optOutListings(requestParameters: OptOutListingsRequest): Promise<EmptyResponse> {
        const response = await this.optOutListingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Request suppression of a Duplicate.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Suppress
     */
    async suppressDuplicateRaw(requestParameters: SuppressDuplicateRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling suppressDuplicate.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling suppressDuplicate.');
        }

        if (requestParameters.duplicateId === null || requestParameters.duplicateId === undefined) {
            throw new runtime.RequiredError('duplicateId','Required parameter requestParameters.duplicateId was null or undefined when calling suppressDuplicate.');
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
            path: `/accounts/{accountId}/listings/duplicates/{duplicateId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"duplicateId"}}`, encodeURIComponent(String(requestParameters.duplicateId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Request suppression of a Duplicate.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Duplicates: Suppress
     */
    async suppressDuplicate(requestParameters: SuppressDuplicateRequest): Promise<EmptyResponse> {
        const response = await this.suppressDuplicateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an Answer for a Question
     * Answer: Update
     */
    async updateAnswerRaw(requestParameters: UpdateAnswerRequest): Promise<runtime.ApiResponse<UpdateAnswerResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateAnswer.');
        }

        if (requestParameters.questionId === null || requestParameters.questionId === undefined) {
            throw new runtime.RequiredError('questionId','Required parameter requestParameters.questionId was null or undefined when calling updateAnswer.');
        }

        if (requestParameters.answerId === null || requestParameters.answerId === undefined) {
            throw new runtime.RequiredError('answerId','Required parameter requestParameters.answerId was null or undefined when calling updateAnswer.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateAnswer.');
        }

        if (requestParameters.updateAnswerRequest === null || requestParameters.updateAnswerRequest === undefined) {
            throw new runtime.RequiredError('updateAnswerRequest','Required parameter requestParameters.updateAnswerRequest was null or undefined when calling updateAnswer.');
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
            path: `/accounts/{accountId}/questions/{questionId}/answers/{answerId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"questionId"}}`, encodeURIComponent(String(requestParameters.questionId))).replace(`{${"answerId"}}`, encodeURIComponent(String(requestParameters.answerId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AnswerRequestToJSON(requestParameters.updateAnswerRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateAnswerResponseFromJSON(jsonValue));
    }

    /**
     * Updates an Answer for a Question
     * Answer: Update
     */
    async updateAnswer(requestParameters: UpdateAnswerRequest): Promise<UpdateAnswerResponse> {
        const response = await this.updateAnswerRaw(requestParameters);
        return await response.value();
    }

    /**
     * Accept or reject a Publisher Suggestion.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Publisher Suggestions: Update
     */
    async updatePublisherSuggestionRaw(requestParameters: UpdatePublisherSuggestionRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updatePublisherSuggestion.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updatePublisherSuggestion.');
        }

        if (requestParameters.suggestionId === null || requestParameters.suggestionId === undefined) {
            throw new runtime.RequiredError('suggestionId','Required parameter requestParameters.suggestionId was null or undefined when calling updatePublisherSuggestion.');
        }

        if (requestParameters.status === null || requestParameters.status === undefined) {
            throw new runtime.RequiredError('status','Required parameter requestParameters.status was null or undefined when calling updatePublisherSuggestion.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/listings/publishersuggestions/{suggestionId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"suggestionId"}}`, encodeURIComponent(String(requestParameters.suggestionId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Accept or reject a Publisher Suggestion.  **NOTE:** When sending requests to this endpoint, you must provide your Yext user ID in the **`Yext-User-Id`** header. 
     * Publisher Suggestions: Update
     */
    async updatePublisherSuggestion(requestParameters: UpdatePublisherSuggestionRequest): Promise<EmptyResponse> {
        const response = await this.updatePublisherSuggestionRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListDuplicatesStatusesEnum {
    PossibleDuplicate = 'POSSIBLE_DUPLICATE',
    SuppressionRequested = 'SUPPRESSION_REQUESTED',
    Suppressed = 'SUPPRESSED',
    Unavailable = 'UNAVAILABLE'
}
/**
    * @export
    * @enum {string}
    */
export enum ListEntityListingsStatusesEnum {
    NotSynced = 'NOT_SYNCED',
    SyncInProgress = 'SYNC_IN_PROGRESS',
    Live = 'LIVE',
    UpdateInProgress = 'UPDATE_IN_PROGRESS',
    CancelingSync = 'CANCELING_SYNC',
    NotApplicable = 'NOT_APPLICABLE',
    DeletePending = 'DELETE_PENDING',
    DeleteFailed = 'DELETE_FAILED',
    Deleted = 'DELETED',
    SyncStopped = 'SYNC_STOPPED'
}
/**
    * @export
    * @enum {string}
    */
export enum ListListingsStatusesEnum {
    WaitingOnYext = 'WAITING_ON_YEXT',
    WaitingOnCustomer = 'WAITING_ON_CUSTOMER',
    WaitingOnPublisher = 'WAITING_ON_PUBLISHER',
    Live = 'LIVE',
    Unavailable = 'UNAVAILABLE',
    OptedOut = 'OPTED_OUT'
}
/**
    * @export
    * @enum {string}
    */
export enum ListPublisherSuggestionsStatusesEnum {
    WaitingOnCustomer = 'WAITING_ON_CUSTOMER',
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
    Expired = 'EXPIRED'
}
/**
    * @export
    * @enum {string}
    */
export enum ListPublishersEntityTypeEnum {
    Location = 'LOCATION',
    HealthcareProfessional = 'HEALTHCARE_PROFESSIONAL',
    HealthcareFacility = 'HEALTHCARE_FACILITY',
    Restaurant = 'RESTAURANT',
    Atm = 'ATM',
    Event = 'EVENT'
}
/**
    * @export
    * @enum {string}
    */
export enum UpdatePublisherSuggestionStatusEnum {
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED'
}
