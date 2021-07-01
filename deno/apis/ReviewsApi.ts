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


import * as runtime from '../runtime.ts';
import {
    CreateReview,
    CreateReviewFromJSON,
    CreateReviewToJSON,
    CreateReviewCommentResponse,
    CreateReviewCommentResponseFromJSON,
    CreateReviewCommentResponseToJSON,
    CreateReviewInvitationsResponse,
    CreateReviewInvitationsResponseFromJSON,
    CreateReviewInvitationsResponseToJSON,
    EmptyResponse,
    EmptyResponseFromJSON,
    EmptyResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IdResponse,
    IdResponseFromJSON,
    IdResponseToJSON,
    ReviewComment,
    ReviewCommentFromJSON,
    ReviewCommentToJSON,
    ReviewCommentUpdate,
    ReviewCommentUpdateFromJSON,
    ReviewCommentUpdateToJSON,
    ReviewGenerationSettings,
    ReviewGenerationSettingsFromJSON,
    ReviewGenerationSettingsToJSON,
    ReviewGenerationSettingsResponse,
    ReviewGenerationSettingsResponseFromJSON,
    ReviewGenerationSettingsResponseToJSON,
    ReviewInvitation,
    ReviewInvitationFromJSON,
    ReviewInvitationToJSON,
    ReviewInvitationResponse,
    ReviewInvitationResponseFromJSON,
    ReviewInvitationResponseToJSON,
    ReviewInvitationsResponse,
    ReviewInvitationsResponseFromJSON,
    ReviewInvitationsResponseToJSON,
    ReviewResponse,
    ReviewResponseFromJSON,
    ReviewResponseToJSON,
    ReviewsResponse,
    ReviewsResponseFromJSON,
    ReviewsResponseToJSON,
    UpdateReview,
    UpdateReviewFromJSON,
    UpdateReviewToJSON,
    UpdateReviewGenerationSettingsResponse,
    UpdateReviewGenerationSettingsResponseFromJSON,
    UpdateReviewGenerationSettingsResponseToJSON,
    UpdateReviewInvitationRequest,
    UpdateReviewInvitationRequestFromJSON,
    UpdateReviewInvitationRequestToJSON,
    UpdateReviewLabelsRequest,
    UpdateReviewLabelsRequestFromJSON,
    UpdateReviewLabelsRequestToJSON,
    UpdateReviewLabelsResponse,
    UpdateReviewLabelsResponseFromJSON,
    UpdateReviewLabelsResponseToJSON,
} from '../models/index.ts';

export interface CreateCommentRequest {
    accountId: string;
    reviewId: number;
    v: string;
    commentRequest: ReviewComment;
}

export interface CreateReviewRequest {
    accountId: string;
    v: string;
    createReviewRequestBody: CreateReview;
}

export interface CreateReviewInvitesRequest {
    accountId: string;
    v: string;
    reviews: Array<ReviewInvitation>;
}

export interface DeleteCommentRequest {
    accountId: string;
    reviewId: number;
    commentId: string;
    v: string;
}

export interface GetReviewRequest {
    accountId: string;
    reviewId: number;
    v: string;
}

export interface GetReviewGenerationSettingsRequest {
    accountId: string;
    v: string;
}

export interface GetReviewInvitationRequest {
    accountId: string;
    invitationId: string;
    v: string;
}

export interface ListReviewInvitationsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    locationIds?: Array<string>;
    folderIds?: Array<string>;
    locationLabels?: Array<string>;
    templateIds?: Array<string>;
    status?: ListReviewInvitationsStatusEnum;
    type?: ListReviewInvitationsTypeEnum;
}

export interface ListReviewsRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
    locationIds?: Array<string>;
    reviewExternalId?: string;
    folderId?: string;
    countries?: Array<string>;
    locationLabels?: Array<string>;
    publisherIds?: Array<string>;
    reviewContent?: string;
    minRating?: number;
    maxRating?: number;
    minPublisherDate?: Date;
    maxPublisherDate?: Date;
    minLastYextUpdateDate?: Date;
    maxLastYextUpdateDate?: Date;
    awaitingResponse?: ListReviewsAwaitingResponseEnum;
    minNonOwnerComments?: number;
    reviewerName?: string;
    status?: ListReviewsStatusEnum;
    pageToken?: string;
    reviewLanguage?: string;
    labelIds?: Array<string>;
    reviewType?: ListReviewsReviewTypeEnum;
    recommendation?: ListReviewsRecommendationEnum;
    flagStatus?: ListReviewsFlagStatusEnum;
}

export interface UpdateCommentRequest {
    accountId: string;
    reviewId: number;
    commentId: string;
    v: string;
    commentUpdateRequest: ReviewCommentUpdate;
}

export interface UpdateReviewRequest {
    accountId: string;
    reviewId: number;
    v: string;
    updateReviewRequestBody: UpdateReview;
}

export interface UpdateReviewGenerationSettingsRequest {
    accountId: string;
    v: string;
    reviewGenerationSettingsRequest: ReviewGenerationSettings;
}

export interface UpdateReviewInvitationOperationRequest {
    accountId: string;
    invitationId: string;
    v: string;
    updateReviewInvitationRequest: UpdateReviewInvitationRequest;
}

export interface UpdateReviewLabelsOperationRequest {
    accountId: string;
    reviewId: number;
    v: string;
    updateReviewLabelsRequest: UpdateReviewLabelsRequest;
}

/**
 * 
 */
export class ReviewsApi extends runtime.BaseAPI {

    /**
     * Creates a new Comment on a Review. <br><br>  ## Required fields * **`content`** <br><br>  ## Optional fields * **`parentId`** * **`visibility`** <br><br> 
     * Comment: Create
     */
    async createCommentRaw(requestParameters: CreateCommentRequest): Promise<runtime.ApiResponse<CreateReviewCommentResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createComment.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling createComment.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createComment.');
        }

        if (requestParameters.commentRequest === null || requestParameters.commentRequest === undefined) {
            throw new runtime.RequiredError('commentRequest','Required parameter requestParameters.commentRequest was null or undefined when calling createComment.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}/comments`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewCommentToJSON(requestParameters.commentRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateReviewCommentResponseFromJSON(jsonValue));
    }

    /**
     * Creates a new Comment on a Review. <br><br>  ## Required fields * **`content`** <br><br>  ## Optional fields * **`parentId`** * **`visibility`** <br><br> 
     * Comment: Create
     */
    async createComment(requestParameters: CreateCommentRequest): Promise<CreateReviewCommentResponse> {
        const response = await this.createCommentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new External First Party Review. 
     * Reviews: Create
     */
    async createReviewRaw(requestParameters: CreateReviewRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createReview.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createReview.');
        }

        if (requestParameters.createReviewRequestBody === null || requestParameters.createReviewRequestBody === undefined) {
            throw new runtime.RequiredError('createReviewRequestBody','Required parameter requestParameters.createReviewRequestBody was null or undefined when calling createReview.');
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
            path: `/accounts/{accountId}/reviews`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateReviewToJSON(requestParameters.createReviewRequestBody),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create a new External First Party Review. 
     * Reviews: Create
     */
    async createReview(requestParameters: CreateReviewRequest): Promise<IdResponse> {
        const response = await this.createReviewRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sends review invitations to one or more consumers. <br><br>  ## Optional fields * **`templateId`** * **`transactionId`** <br><br> 
     * Review Invitations: Create
     */
    async createReviewInvitesRaw(requestParameters: CreateReviewInvitesRequest): Promise<runtime.ApiResponse<CreateReviewInvitationsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createReviewInvites.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createReviewInvites.');
        }

        if (requestParameters.reviews === null || requestParameters.reviews === undefined) {
            throw new runtime.RequiredError('reviews','Required parameter requestParameters.reviews was null or undefined when calling createReviewInvites.');
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
            path: `/accounts/{accountId}/reviewinvites`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.reviews.map(ReviewInvitationToJSON),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateReviewInvitationsResponseFromJSON(jsonValue));
    }

    /**
     * Sends review invitations to one or more consumers. <br><br>  ## Optional fields * **`templateId`** * **`transactionId`** <br><br> 
     * Review Invitations: Create
     */
    async createReviewInvites(requestParameters: CreateReviewInvitesRequest): Promise<CreateReviewInvitationsResponse> {
        const response = await this.createReviewInvitesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes a Comment on a Review. <br><br> 
     * Comment: Delete
     */
    async deleteCommentRaw(requestParameters: DeleteCommentRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteComment.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling deleteComment.');
        }

        if (requestParameters.commentId === null || requestParameters.commentId === undefined) {
            throw new runtime.RequiredError('commentId','Required parameter requestParameters.commentId was null or undefined when calling deleteComment.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteComment.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}/comments/{commentId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))).replace(`{${"commentId"}}`, encodeURIComponent(String(requestParameters.commentId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes a Comment on a Review. <br><br> 
     * Comment: Delete
     */
    async deleteComment(requestParameters: DeleteCommentRequest): Promise<EmptyResponse> {
        const response = await this.deleteCommentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific Review.
     * Review: Get
     */
    async getReviewRaw(requestParameters: GetReviewRequest): Promise<runtime.ApiResponse<ReviewResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getReview.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling getReview.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getReview.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific Review.
     * Review: Get
     */
    async getReview(requestParameters: GetReviewRequest): Promise<ReviewResponse> {
        const response = await this.getReviewRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns all current generation settings for a specified account.
     * Review Generation Settings: Get
     */
    async getReviewGenerationSettingsRaw(requestParameters: GetReviewGenerationSettingsRequest): Promise<runtime.ApiResponse<ReviewGenerationSettingsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getReviewGenerationSettings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getReviewGenerationSettings.');
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
            path: `/accounts/{accountId}/reviews/settings/generation`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewGenerationSettingsResponseFromJSON(jsonValue));
    }

    /**
     * Returns all current generation settings for a specified account.
     * Review Generation Settings: Get
     */
    async getReviewGenerationSettings(requestParameters: GetReviewGenerationSettingsRequest): Promise<ReviewGenerationSettingsResponse> {
        const response = await this.getReviewGenerationSettingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve a specific review invitation
     * Review Invitation: Get
     */
    async getReviewInvitationRaw(requestParameters: GetReviewInvitationRequest): Promise<runtime.ApiResponse<ReviewInvitationResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getReviewInvitation.');
        }

        if (requestParameters.invitationId === null || requestParameters.invitationId === undefined) {
            throw new runtime.RequiredError('invitationId','Required parameter requestParameters.invitationId was null or undefined when calling getReviewInvitation.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getReviewInvitation.');
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
            path: `/accounts/{accountId}/reviewinvites/{invitationId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"invitationId"}}`, encodeURIComponent(String(requestParameters.invitationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewInvitationResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a specific review invitation
     * Review Invitation: Get
     */
    async getReviewInvitation(requestParameters: GetReviewInvitationRequest): Promise<ReviewInvitationResponse> {
        const response = await this.getReviewInvitationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieves all review invitations for an account
     * Review Invitations: List
     */
    async listReviewInvitationsRaw(requestParameters: ListReviewInvitationsRequest): Promise<runtime.ApiResponse<ReviewInvitationsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listReviewInvitations.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listReviewInvitations.');
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

        if (requestParameters.folderIds) {
            queryParameters['folderIds'] = requestParameters.folderIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.locationLabels) {
            queryParameters['locationLabels'] = requestParameters.locationLabels.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.templateIds) {
            queryParameters['templateIds'] = requestParameters.templateIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/reviewinvites`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewInvitationsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves all review invitations for an account
     * Review Invitations: List
     */
    async listReviewInvitations(requestParameters: ListReviewInvitationsRequest): Promise<ReviewInvitationsResponse> {
        const response = await this.listReviewInvitationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve all Reviews matching the given criteria.  **NOTE:** Not all publishers\' reviews will be included in the response. For more details, please contact your Account Manager. 
     * Reviews: List
     */
    async listReviewsRaw(requestParameters: ListReviewsRequest): Promise<runtime.ApiResponse<ReviewsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listReviews.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listReviews.');
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

        if (requestParameters.reviewExternalId !== undefined) {
            queryParameters['reviewExternalId'] = requestParameters.reviewExternalId;
        }

        if (requestParameters.folderId !== undefined) {
            queryParameters['folderId'] = requestParameters.folderId;
        }

        if (requestParameters.countries) {
            queryParameters['countries'] = requestParameters.countries.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.locationLabels) {
            queryParameters['locationLabels'] = requestParameters.locationLabels.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.reviewContent !== undefined) {
            queryParameters['reviewContent'] = requestParameters.reviewContent;
        }

        if (requestParameters.minRating !== undefined) {
            queryParameters['minRating'] = requestParameters.minRating;
        }

        if (requestParameters.maxRating !== undefined) {
            queryParameters['maxRating'] = requestParameters.maxRating;
        }

        if (requestParameters.minPublisherDate !== undefined) {
            queryParameters['minPublisherDate'] = (requestParameters.minPublisherDate as any).toISOString().substr(0,10);
        }

        if (requestParameters.maxPublisherDate !== undefined) {
            queryParameters['maxPublisherDate'] = (requestParameters.maxPublisherDate as any).toISOString().substr(0,10);
        }

        if (requestParameters.minLastYextUpdateDate !== undefined) {
            queryParameters['minLastYextUpdateDate'] = (requestParameters.minLastYextUpdateDate as any).toISOString().substr(0,10);
        }

        if (requestParameters.maxLastYextUpdateDate !== undefined) {
            queryParameters['maxLastYextUpdateDate'] = (requestParameters.maxLastYextUpdateDate as any).toISOString().substr(0,10);
        }

        if (requestParameters.awaitingResponse !== undefined) {
            queryParameters['awaitingResponse'] = requestParameters.awaitingResponse;
        }

        if (requestParameters.minNonOwnerComments !== undefined) {
            queryParameters['minNonOwnerComments'] = requestParameters.minNonOwnerComments;
        }

        if (requestParameters.reviewerName !== undefined) {
            queryParameters['reviewerName'] = requestParameters.reviewerName;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.pageToken !== undefined) {
            queryParameters['pageToken'] = requestParameters.pageToken;
        }

        if (requestParameters.reviewLanguage !== undefined) {
            queryParameters['reviewLanguage'] = requestParameters.reviewLanguage;
        }

        if (requestParameters.labelIds) {
            queryParameters['labelIds'] = requestParameters.labelIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.reviewType !== undefined) {
            queryParameters['reviewType'] = requestParameters.reviewType;
        }

        if (requestParameters.recommendation !== undefined) {
            queryParameters['recommendation'] = requestParameters.recommendation;
        }

        if (requestParameters.flagStatus !== undefined) {
            queryParameters['flagStatus'] = requestParameters.flagStatus;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/reviews`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewsResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve all Reviews matching the given criteria.  **NOTE:** Not all publishers\' reviews will be included in the response. For more details, please contact your Account Manager. 
     * Reviews: List
     */
    async listReviews(requestParameters: ListReviewsRequest): Promise<ReviewsResponse> {
        const response = await this.listReviewsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a Comment on a Review. <br><br>  ## Optional fields * **`content`** * **`visibility`** <br><br> 
     * Comment: Update
     */
    async updateCommentRaw(requestParameters: UpdateCommentRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateComment.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling updateComment.');
        }

        if (requestParameters.commentId === null || requestParameters.commentId === undefined) {
            throw new runtime.RequiredError('commentId','Required parameter requestParameters.commentId was null or undefined when calling updateComment.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateComment.');
        }

        if (requestParameters.commentUpdateRequest === null || requestParameters.commentUpdateRequest === undefined) {
            throw new runtime.RequiredError('commentUpdateRequest','Required parameter requestParameters.commentUpdateRequest was null or undefined when calling updateComment.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}/comments/{commentId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))).replace(`{${"commentId"}}`, encodeURIComponent(String(requestParameters.commentId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewCommentUpdateToJSON(requestParameters.commentUpdateRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Updates a Comment on a Review. <br><br>  ## Optional fields * **`content`** * **`visibility`** <br><br> 
     * Comment: Update
     */
    async updateComment(requestParameters: UpdateCommentRequest): Promise<EmptyResponse> {
        const response = await this.updateCommentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an External First Party Review or a First Party Review. <br><br> **NOTE:** Despite using the `PUT` method, Reviews: Update only updates supplied fields. Omitted fields are not modified. <br><br> 
     * Review: Update
     */
    async updateReviewRaw(requestParameters: UpdateReviewRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateReview.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling updateReview.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateReview.');
        }

        if (requestParameters.updateReviewRequestBody === null || requestParameters.updateReviewRequestBody === undefined) {
            throw new runtime.RequiredError('updateReviewRequestBody','Required parameter requestParameters.updateReviewRequestBody was null or undefined when calling updateReview.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateReviewToJSON(requestParameters.updateReviewRequestBody),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates an External First Party Review or a First Party Review. <br><br> **NOTE:** Despite using the `PUT` method, Reviews: Update only updates supplied fields. Omitted fields are not modified. <br><br> 
     * Review: Update
     */
    async updateReview(requestParameters: UpdateReviewRequest): Promise<IdResponse> {
        const response = await this.updateReviewRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates any generation settings specified in a specified account. Call may include any/all settings available to the account. Settings not included will remain unchanged. 
     * Review Generation Settings: Update
     */
    async updateReviewGenerationSettingsRaw(requestParameters: UpdateReviewGenerationSettingsRequest): Promise<runtime.ApiResponse<UpdateReviewGenerationSettingsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateReviewGenerationSettings.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateReviewGenerationSettings.');
        }

        if (requestParameters.reviewGenerationSettingsRequest === null || requestParameters.reviewGenerationSettingsRequest === undefined) {
            throw new runtime.RequiredError('reviewGenerationSettingsRequest','Required parameter requestParameters.reviewGenerationSettingsRequest was null or undefined when calling updateReviewGenerationSettings.');
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
            path: `/accounts/{accountId}/reviews/settings/generation`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewGenerationSettingsToJSON(requestParameters.reviewGenerationSettingsRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateReviewGenerationSettingsResponseFromJSON(jsonValue));
    }

    /**
     * Updates any generation settings specified in a specified account. Call may include any/all settings available to the account. Settings not included will remain unchanged. 
     * Review Generation Settings: Update
     */
    async updateReviewGenerationSettings(requestParameters: UpdateReviewGenerationSettingsRequest): Promise<UpdateReviewGenerationSettingsResponse> {
        const response = await this.updateReviewGenerationSettingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates the metadata for a specific review invitation. May also be used to cancel pending invitations. 
     * Review Invitation: Update Metadata
     */
    async updateReviewInvitationRaw(requestParameters: UpdateReviewInvitationOperationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateReviewInvitation.');
        }

        if (requestParameters.invitationId === null || requestParameters.invitationId === undefined) {
            throw new runtime.RequiredError('invitationId','Required parameter requestParameters.invitationId was null or undefined when calling updateReviewInvitation.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateReviewInvitation.');
        }

        if (requestParameters.updateReviewInvitationRequest === null || requestParameters.updateReviewInvitationRequest === undefined) {
            throw new runtime.RequiredError('updateReviewInvitationRequest','Required parameter requestParameters.updateReviewInvitationRequest was null or undefined when calling updateReviewInvitation.');
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
            path: `/accounts/{accountId}/reviewinvites/{invitationId}:updatemetadata`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"invitationId"}}`, encodeURIComponent(String(requestParameters.invitationId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateReviewInvitationRequestToJSON(requestParameters.updateReviewInvitationRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates the metadata for a specific review invitation. May also be used to cancel pending invitations. 
     * Review Invitation: Update Metadata
     */
    async updateReviewInvitation(requestParameters: UpdateReviewInvitationOperationRequest): Promise<IdResponse> {
        const response = await this.updateReviewInvitationRaw(requestParameters);
        return await response.value();
    }

    /**
     * Adds the specified review labels to the specified review.
     * Review Labels: Update
     */
    async updateReviewLabelsRaw(requestParameters: UpdateReviewLabelsOperationRequest): Promise<runtime.ApiResponse<UpdateReviewLabelsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateReviewLabels.');
        }

        if (requestParameters.reviewId === null || requestParameters.reviewId === undefined) {
            throw new runtime.RequiredError('reviewId','Required parameter requestParameters.reviewId was null or undefined when calling updateReviewLabels.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateReviewLabels.');
        }

        if (requestParameters.updateReviewLabelsRequest === null || requestParameters.updateReviewLabelsRequest === undefined) {
            throw new runtime.RequiredError('updateReviewLabelsRequest','Required parameter requestParameters.updateReviewLabelsRequest was null or undefined when calling updateReviewLabels.');
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
            path: `/accounts/{accountId}/reviews/{reviewId}/labels`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"reviewId"}}`, encodeURIComponent(String(requestParameters.reviewId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateReviewLabelsRequestToJSON(requestParameters.updateReviewLabelsRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdateReviewLabelsResponseFromJSON(jsonValue));
    }

    /**
     * Adds the specified review labels to the specified review.
     * Review Labels: Update
     */
    async updateReviewLabels(requestParameters: UpdateReviewLabelsOperationRequest): Promise<UpdateReviewLabelsResponse> {
        const response = await this.updateReviewLabelsRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListReviewInvitationsStatusEnum {
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
    Pending = 'PENDING'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewInvitationsTypeEnum {
    Email = 'EMAIL',
    Sms = 'SMS'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewsAwaitingResponseEnum {
    Review = 'REVIEW',
    Comment = 'COMMENT',
    ReviewOrComment = 'REVIEW_OR_COMMENT'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewsStatusEnum {
    Live = 'LIVE',
    Quarantined = 'QUARANTINED',
    Removed = 'REMOVED'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewsReviewTypeEnum {
    Rating = 'Rating',
    Recommendation = 'Recommendation'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewsRecommendationEnum {
    Recommended = 'Recommended',
    NotRecommended = 'Not Recommended'
}
/**
    * @export
    * @enum {string}
    */
export enum ListReviewsFlagStatusEnum {
    Flagged = 'FLAGGED',
    NotFlagged = 'NOT_FLAGGED'
}
