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
    AccountResponse,
    AccountResponseFromJSON,
    AccountResponseToJSON,
    AccountsResponse,
    AccountsResponseFromJSON,
    AccountsResponseToJSON,
    ApprovalGroup,
    ApprovalGroupFromJSON,
    ApprovalGroupToJSON,
    ApprovalGroupResponse,
    ApprovalGroupResponseFromJSON,
    ApprovalGroupResponseToJSON,
    ApprovalGroupsResponse,
    ApprovalGroupsResponseFromJSON,
    ApprovalGroupsResponseToJSON,
    AssignLinkedAccountRequest,
    AssignLinkedAccountRequestFromJSON,
    AssignLinkedAccountRequestToJSON,
    AssignLinkedAccountResponse,
    AssignLinkedAccountResponseFromJSON,
    AssignLinkedAccountResponseToJSON,
    CreateApprovalGroupRequest,
    CreateApprovalGroupRequestFromJSON,
    CreateApprovalGroupRequestToJSON,
    CreateUserRequest,
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    EmptyResponse,
    EmptyResponseFromJSON,
    EmptyResponseToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    IdResponse,
    IdResponseFromJSON,
    IdResponseToJSON,
    LinkedAccountResponse,
    LinkedAccountResponseFromJSON,
    LinkedAccountResponseToJSON,
    LinkedAccountsResponse,
    LinkedAccountsResponseFromJSON,
    LinkedAccountsResponseToJSON,
    RolesResponse,
    RolesResponseFromJSON,
    RolesResponseToJSON,
    UpdatePasswordRequest,
    UpdatePasswordRequestFromJSON,
    UpdatePasswordRequestToJSON,
    UpdateUserRequest,
    UpdateUserRequestFromJSON,
    UpdateUserRequestToJSON,
    UserResponse,
    UserResponseFromJSON,
    UserResponseToJSON,
    UsersResponse,
    UsersResponseFromJSON,
    UsersResponseToJSON,
} from '../models/index.ts';

export interface AssignLinkedAccountOperationRequest {
    accountId: string;
    linkedAccountId: string;
    v: string;
    assignLinkedAccountRequest: AssignLinkedAccountRequest;
}

export interface CreateApprovalGroupOperationRequest {
    accountId: string;
    v: string;
    createApprovalGroupRequest: CreateApprovalGroupRequest;
}

export interface CreateUserOperationRequest {
    accountId: string;
    v: string;
    createUserRequest: CreateUserRequest;
}

export interface DeleteApprovalGroupRequest {
    accountId: string;
    v: string;
    approvalGroupId: string;
}

export interface DeleteUserRequest {
    accountId: string;
    v: string;
    userId: string;
}

export interface GetAccountRequest {
    accountId: string;
    v: string;
}

export interface GetApprovalGroupRequest {
    accountId: string;
    v: string;
    approvalGroupId: string;
}

export interface GetApprovalGroupsRequest {
    accountId: string;
    v: string;
}

export interface GetLinkedAccountRequest {
    accountId: string;
    linkedAccountId: string;
    v: string;
}

export interface GetRolesRequest {
    accountId: string;
    v: string;
}

export interface GetUserRequest {
    accountId: string;
    v: string;
    userId: string;
}

export interface GetUsersRequest {
    accountId: string;
    v: string;
    limit?: number;
    offset?: number;
}

export interface ListAccountsRequest {
    v: string;
    name?: string;
    limit?: number;
    offset?: number;
}

export interface ListLinkedAccountsRequest {
    accountId: string;
    v: string;
    entityIds?: Array<string>;
    publisherIds?: Array<string>;
    statuses?: Array<ListLinkedAccountsStatusesEnum>;
    pageToken?: string;
    limit?: number;
    offset?: number;
}

export interface UpdateApprovalGroupRequest {
    accountId: string;
    v: string;
    approvalGroupId: string;
    updateApprovalGroup: ApprovalGroup;
}

export interface UpdateUserOperationRequest {
    accountId: string;
    v: string;
    userId: string;
    updateUserRequest: UpdateUserRequest;
}

export interface UpdateUserPasswordRequest {
    accountId: string;
    v: string;
    userId: string;
    updatePasswordRequest?: UpdatePasswordRequest;
}

/**
 * 
 */
export class AccountSettingsApi extends runtime.BaseAPI {

    /**
     * Copy an eligible Linked Account from the top-level parent account to a subaccount. Optionally assign the Linked Account to an entity in the subaccount.  This functionality is only available for certain Yext accounts. Please reach out to your Yext representative for more information. 
     * LinkedAccounts: Assign
     */
    async assignLinkedAccountRaw(requestParameters: AssignLinkedAccountOperationRequest): Promise<runtime.ApiResponse<AssignLinkedAccountResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling assignLinkedAccount.');
        }

        if (requestParameters.linkedAccountId === null || requestParameters.linkedAccountId === undefined) {
            throw new runtime.RequiredError('linkedAccountId','Required parameter requestParameters.linkedAccountId was null or undefined when calling assignLinkedAccount.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling assignLinkedAccount.');
        }

        if (requestParameters.assignLinkedAccountRequest === null || requestParameters.assignLinkedAccountRequest === undefined) {
            throw new runtime.RequiredError('assignLinkedAccountRequest','Required parameter requestParameters.assignLinkedAccountRequest was null or undefined when calling assignLinkedAccount.');
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
            path: `/accounts/{accountId}/linkedaccounts/{linkedAccountId}/assign`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"linkedAccountId"}}`, encodeURIComponent(String(requestParameters.linkedAccountId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: AssignLinkedAccountRequestToJSON(requestParameters.assignLinkedAccountRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AssignLinkedAccountResponseFromJSON(jsonValue));
    }

    /**
     * Copy an eligible Linked Account from the top-level parent account to a subaccount. Optionally assign the Linked Account to an entity in the subaccount.  This functionality is only available for certain Yext accounts. Please reach out to your Yext representative for more information. 
     * LinkedAccounts: Assign
     */
    async assignLinkedAccount(requestParameters: AssignLinkedAccountOperationRequest): Promise<AssignLinkedAccountResponse> {
        const response = await this.assignLinkedAccountRaw(requestParameters);
        return await response.value();
    }

    /**
     * Creates an Approval Group.
     * Approval Groups: Create
     */
    async createApprovalGroupRaw(requestParameters: CreateApprovalGroupOperationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createApprovalGroup.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createApprovalGroup.');
        }

        if (requestParameters.createApprovalGroupRequest === null || requestParameters.createApprovalGroupRequest === undefined) {
            throw new runtime.RequiredError('createApprovalGroupRequest','Required parameter requestParameters.createApprovalGroupRequest was null or undefined when calling createApprovalGroup.');
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
            path: `/accounts/{accountId}/approvalgroups`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateApprovalGroupRequestToJSON(requestParameters.createApprovalGroupRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Creates an Approval Group.
     * Approval Groups: Create
     */
    async createApprovalGroup(requestParameters: CreateApprovalGroupOperationRequest): Promise<IdResponse> {
        const response = await this.createApprovalGroupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Create a new User  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be accepted in the request body.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be accepted in the request body. 
     * Users: Create
     */
    async createUserRaw(requestParameters: CreateUserOperationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling createUser.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling createUser.');
        }

        if (requestParameters.createUserRequest === null || requestParameters.createUserRequest === undefined) {
            throw new runtime.RequiredError('createUserRequest','Required parameter requestParameters.createUserRequest was null or undefined when calling createUser.');
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
            path: `/accounts/{accountId}/users`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters.createUserRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Create a new User  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be accepted in the request body.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be accepted in the request body. 
     * Users: Create
     */
    async createUser(requestParameters: CreateUserOperationRequest): Promise<IdResponse> {
        const response = await this.createUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an Approval Group.
     * ApprovalGroups: Delete
     */
    async deleteApprovalGroupRaw(requestParameters: DeleteApprovalGroupRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteApprovalGroup.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteApprovalGroup.');
        }

        if (requestParameters.approvalGroupId === null || requestParameters.approvalGroupId === undefined) {
            throw new runtime.RequiredError('approvalGroupId','Required parameter requestParameters.approvalGroupId was null or undefined when calling deleteApprovalGroup.');
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
            path: `/accounts/{accountId}/approvalgroups/{approvalGroupId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"approvalGroupId"}}`, encodeURIComponent(String(requestParameters.approvalGroupId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes an Approval Group.
     * ApprovalGroups: Delete
     */
    async deleteApprovalGroup(requestParameters: DeleteApprovalGroupRequest): Promise<EmptyResponse> {
        const response = await this.deleteApprovalGroupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an existing User.
     * Users: Delete
     */
    async deleteUserRaw(requestParameters: DeleteUserRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling deleteUser.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling deleteUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deleteUser.');
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
            path: `/accounts/{accountId}/users/{userId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Deletes an existing User.
     * Users: Delete
     */
    async deleteUser(requestParameters: DeleteUserRequest): Promise<EmptyResponse> {
        const response = await this.deleteUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get details for an account
     * Accounts: Get
     */
    async getAccountRaw(requestParameters: GetAccountRequest): Promise<runtime.ApiResponse<AccountResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getAccount.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getAccount.');
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
            path: `/accounts/{accountId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountResponseFromJSON(jsonValue));
    }

    /**
     * Get details for an account
     * Accounts: Get
     */
    async getAccount(requestParameters: GetAccountRequest): Promise<AccountResponse> {
        const response = await this.getAccountRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets a single Approval Group.
     * ApprovalGroups: Get
     */
    async getApprovalGroupRaw(requestParameters: GetApprovalGroupRequest): Promise<runtime.ApiResponse<ApprovalGroupResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getApprovalGroup.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getApprovalGroup.');
        }

        if (requestParameters.approvalGroupId === null || requestParameters.approvalGroupId === undefined) {
            throw new runtime.RequiredError('approvalGroupId','Required parameter requestParameters.approvalGroupId was null or undefined when calling getApprovalGroup.');
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
            path: `/accounts/{accountId}/approvalgroups/{approvalGroupId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"approvalGroupId"}}`, encodeURIComponent(String(requestParameters.approvalGroupId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApprovalGroupResponseFromJSON(jsonValue));
    }

    /**
     * Gets a single Approval Group.
     * ApprovalGroups: Get
     */
    async getApprovalGroup(requestParameters: GetApprovalGroupRequest): Promise<ApprovalGroupResponse> {
        const response = await this.getApprovalGroupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Lists all Approval Groups in the account.
     * ApprovalGroups: List
     */
    async getApprovalGroupsRaw(requestParameters: GetApprovalGroupsRequest): Promise<runtime.ApiResponse<ApprovalGroupsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getApprovalGroups.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getApprovalGroups.');
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
            path: `/accounts/{accountId}/approvalgroups`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ApprovalGroupsResponseFromJSON(jsonValue));
    }

    /**
     * Lists all Approval Groups in the account.
     * ApprovalGroups: List
     */
    async getApprovalGroups(requestParameters: GetApprovalGroupsRequest): Promise<ApprovalGroupsResponse> {
        const response = await this.getApprovalGroupsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get details for an linked account.
     * LinkedAccounts: Get
     */
    async getLinkedAccountRaw(requestParameters: GetLinkedAccountRequest): Promise<runtime.ApiResponse<LinkedAccountResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getLinkedAccount.');
        }

        if (requestParameters.linkedAccountId === null || requestParameters.linkedAccountId === undefined) {
            throw new runtime.RequiredError('linkedAccountId','Required parameter requestParameters.linkedAccountId was null or undefined when calling getLinkedAccount.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getLinkedAccount.');
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
            path: `/accounts/{accountId}/linkedaccounts/{linkedAccountId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"linkedAccountId"}}`, encodeURIComponent(String(requestParameters.linkedAccountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LinkedAccountResponseFromJSON(jsonValue));
    }

    /**
     * Get details for an linked account.
     * LinkedAccounts: Get
     */
    async getLinkedAccount(requestParameters: GetLinkedAccountRequest): Promise<LinkedAccountResponse> {
        const response = await this.getLinkedAccountRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieves a list of the roles that users can have within a customer’s account.
     * Roles: Get
     */
    async getRolesRaw(requestParameters: GetRolesRequest): Promise<runtime.ApiResponse<RolesResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getRoles.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getRoles.');
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
            path: `/accounts/{accountId}/roles`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RolesResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves a list of the roles that users can have within a customer’s account.
     * Roles: Get
     */
    async getRoles(requestParameters: GetRolesRequest): Promise<RolesResponse> {
        const response = await this.getRolesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieves details of a specific User.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be included in the response.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be included in the response. 
     * Users: Get
     */
    async getUserRaw(requestParameters: GetUserRequest): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getUser.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUser.');
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
            path: `/accounts/{accountId}/users/{userId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves details of a specific User.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be included in the response.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be included in the response. 
     * Users: Get
     */
    async getUser(requestParameters: GetUserRequest): Promise<UserResponse> {
        const response = await this.getUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Lists all Users in an account.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be included in the response.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be included in the response.  This endpoint does not support the **`all`** macro. 
     * Users: List
     */
    async getUsersRaw(requestParameters: GetUsersRequest): Promise<runtime.ApiResponse<UsersResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling getUsers.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling getUsers.');
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

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["api-key"] = this.configuration.apiKey("api-key"); // api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/accounts/{accountId}/users`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UsersResponseFromJSON(jsonValue));
    }

    /**
     * Lists all Users in an account.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be included in the response.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be included in the response.  This endpoint does not support the **`all`** macro. 
     * Users: List
     */
    async getUsers(requestParameters: GetUsersRequest): Promise<UsersResponse> {
        const response = await this.getUsersRaw(requestParameters);
        return await response.value();
    }

    /**
     * List all accounts that you have access to. Unless you are in Partner Portal mode, this will only be your own account.
     * Accounts: List
     */
    async listAccountsRaw(requestParameters: ListAccountsRequest): Promise<runtime.ApiResponse<AccountsResponse>> {
        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listAccounts.');
        }

        const queryParameters: any = {};

        if (requestParameters.v !== undefined) {
            queryParameters['v'] = requestParameters.v;
        }

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
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
            path: `/accounts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountsResponseFromJSON(jsonValue));
    }

    /**
     * List all accounts that you have access to. Unless you are in Partner Portal mode, this will only be your own account.
     * Accounts: List
     */
    async listAccounts(requestParameters: ListAccountsRequest): Promise<AccountsResponse> {
        const response = await this.listAccountsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Lists all linked accounts in an account.
     * LinkedAccounts: List
     */
    async listLinkedAccountsRaw(requestParameters: ListLinkedAccountsRequest): Promise<runtime.ApiResponse<LinkedAccountsResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling listLinkedAccounts.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling listLinkedAccounts.');
        }

        const queryParameters: any = {};

        if (requestParameters.entityIds) {
            queryParameters['entityIds'] = requestParameters.entityIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.publisherIds) {
            queryParameters['publisherIds'] = requestParameters.publisherIds.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses.join(runtime.COLLECTION_FORMATS["csv"]);
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
            path: `/accounts/{accountId}/linkedaccounts`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => LinkedAccountsResponseFromJSON(jsonValue));
    }

    /**
     * Lists all linked accounts in an account.
     * LinkedAccounts: List
     */
    async listLinkedAccounts(requestParameters: ListLinkedAccountsRequest): Promise<LinkedAccountsResponse> {
        const response = await this.listLinkedAccountsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a single Approval Group.  **NOTE:** Despite using the PUT method, Approval Groups: Update only updates supplied fields. Omitted fields are not modified. However, the users list will be overwritten with what the user provides. 
     * ApprovalGroups: Update
     */
    async updateApprovalGroupRaw(requestParameters: UpdateApprovalGroupRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateApprovalGroup.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateApprovalGroup.');
        }

        if (requestParameters.approvalGroupId === null || requestParameters.approvalGroupId === undefined) {
            throw new runtime.RequiredError('approvalGroupId','Required parameter requestParameters.approvalGroupId was null or undefined when calling updateApprovalGroup.');
        }

        if (requestParameters.updateApprovalGroup === null || requestParameters.updateApprovalGroup === undefined) {
            throw new runtime.RequiredError('updateApprovalGroup','Required parameter requestParameters.updateApprovalGroup was null or undefined when calling updateApprovalGroup.');
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
            path: `/accounts/{accountId}/approvalgroups/{approvalGroupId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"approvalGroupId"}}`, encodeURIComponent(String(requestParameters.approvalGroupId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ApprovalGroupToJSON(requestParameters.updateApprovalGroup),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates a single Approval Group.  **NOTE:** Despite using the PUT method, Approval Groups: Update only updates supplied fields. Omitted fields are not modified. However, the users list will be overwritten with what the user provides. 
     * ApprovalGroups: Update
     */
    async updateApprovalGroup(requestParameters: UpdateApprovalGroupRequest): Promise<IdResponse> {
        const response = await this.updateApprovalGroupRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an existing User.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be accepted in the request body.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be accepted in the request body. If not provided, existing values will be cleared. 
     * Users: Update
     */
    async updateUserRaw(requestParameters: UpdateUserOperationRequest): Promise<runtime.ApiResponse<IdResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateUser.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateUser.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUserRequest === null || requestParameters.updateUserRequest === undefined) {
            throw new runtime.RequiredError('updateUserRequest','Required parameter requestParameters.updateUserRequest was null or undefined when calling updateUser.');
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
            path: `/accounts/{accountId}/users/{userId}`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateUserRequestToJSON(requestParameters.updateUserRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IdResponseFromJSON(jsonValue));
    }

    /**
     * Updates an existing User.  **NOTE**:  If the **`v`** parameter is before `20190225`: **`displayLanguagePreference`** and **`emailLanguagePreference`** will not be accepted in the request body.  If the **`v`** parameter is `20190225` or later: **`displayLanguagePreference`** and **`emailLanguagePreference`** will be accepted in the request body. If not provided, existing values will be cleared. 
     * Users: Update
     */
    async updateUser(requestParameters: UpdateUserOperationRequest): Promise<IdResponse> {
        const response = await this.updateUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a User\'s password.
     * Users: Update Password
     */
    async updateUserPasswordRaw(requestParameters: UpdateUserPasswordRequest): Promise<runtime.ApiResponse<EmptyResponse>> {
        if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
            throw new runtime.RequiredError('accountId','Required parameter requestParameters.accountId was null or undefined when calling updateUserPassword.');
        }

        if (requestParameters.v === null || requestParameters.v === undefined) {
            throw new runtime.RequiredError('v','Required parameter requestParameters.v was null or undefined when calling updateUserPassword.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling updateUserPassword.');
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
            path: `/accounts/{accountId}/users/{userId}/password`.replace(`{${"accountId"}}`, encodeURIComponent(String(requestParameters.accountId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdatePasswordRequestToJSON(requestParameters.updatePasswordRequest),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmptyResponseFromJSON(jsonValue));
    }

    /**
     * Updates a User\'s password.
     * Users: Update Password
     */
    async updateUserPassword(requestParameters: UpdateUserPasswordRequest): Promise<EmptyResponse> {
        const response = await this.updateUserPasswordRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListLinkedAccountsStatusesEnum {
    Valid = 'VALID',
    Invalid = 'INVALID'
}
