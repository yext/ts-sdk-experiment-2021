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

import { exists, mapValues } from '../runtime';
import {
    AnalyticsFilter,
    AnalyticsFilterFromJSON,
    AnalyticsFilterFromJSONTyped,
    AnalyticsFilterToJSON,
} from './';

/**
 * 
 * @export
 * @interface CreateReportRequestBody
 */
export interface CreateReportRequestBody {
    /**
     * The kinds of data the report should include. Specify up to 10 values.
     * 
     * * **`PROFILE_VIEWS`**: The number of times your listings were viewed. Does not include listings on Yelp, Bing, or Google.
     * * **`SEARCHES`**: The number of times your listings were included in search results. Does not include search results on Yelp, Facebook, Bing, or Google.
     * * **`POWERLISTINGS_LIVE`**: The total number of your listings that were live.
     * * **`FEATURED_MESSAGE_CLICKS`**: The number of times consumers clicked on your Featured Messsage. Does not include Featured Messages on Yelp, Facebook, Bing, or Google.
     * * **`EVENT_SEARCHES`**: The number of times a consumer has run a search and seen your event listing in the search result on a Yext Listings Publisher site.
     * * **`EVENT_PROFILEVIEWS`**: The number of times a consumer has seen your full event listing profile on a publisher site, either by clicking on your event listing from a search on the publisher site or from another search engine.
     * * **`TICKET_CLICKS`**: Clicks to a button that allows users to get tickets.
     * * **`YELP_PAGE_VIEWS`**: Number of times your listings on Yelp ("pages") were viewed.
     * * **`BING_SEARCHES`**: The number of times your listings were included in Bing search results. Because Bing sends data for full weeks rather than individual days, **`dimensions`** cannot contain `DAYS`, `MONTHS`, or `MONTHS_RETAIL` if `BING_SEARCHES` is in **`metrics`**. Also, reports with `BING_SEARCHES` have different reporting maximum dates than reports with other metrics.
     * * **`FACEBOOK_LIKES`**: The number of consumers who have "liked" your Page.
     * * **`FACEBOOK_TALKING_ABOUT`**: The number of unique consumers who had an interaction with your Page. For an interaction to be included in this total, it must result in a story being posted to the newsfeeds of those consumers' friends. Examples of these interactions include, but are not limited to, sharing a post on your Page, liking your Page, or tagging your location in a photo.
     * * **`FACEBOOK_WERE_HERE`**: The total number of consumers who have checked into your business on Facebook, along with the people tagged as being with them when checking in.
     * * **`FACEBOOK_CTA_CLICKS`**: The total number of clicks on your Page CTA button by people who are logged in to Facebook.
     * * **`FACEBOOK_IMPRESSIONS`**: The total number of impressions seen of any content associated with your Page.
     * * **`FACEBOOK_CHECKINS`**: The total number of consumers who have checked into your business, along with the people tagged as being with them when checking in.
     * * **`FACEBOOK_PAGE_VIEWS`**: The total number of times your Page has been viewed.
     * * **`FACEBOOK_POST_IMPRESSIONS`**: The number of impressions for your Page post.
     * * **`FACEBOOK_EVENT_NEW_RSVPS`**: The number of new RSVPs to your Facebook event.
     * * **`FOURSQUARE_DAILY_CHECKINS`**: The number of consumers who checked into your business on Foursquare on a given date.
     * * **`INSTAGRAM_POSTS`**: *NOTE: This metric is deprecated.* The number of times consumers posted Instagram content geotagged at your business.
     * * **`GOOGLE_SEARCH_QUERIES`**: The number of times your listings appeared in search results on either Google Search or Google Maps.
     * * **`GOOGLE_SEARCH_VIEWS`**: The number of times your listings were viewed on Google Search.
     * * **`GOOGLE_MAP_VIEWS`**: The number of times your listings were viewed on Google Maps.
     * * **`GOOGLE_CUSTOMER_ACTIONS`**: The number of times consumers called your business, got driving directions to your business, or visited your website via the links in your Google listings.
     * * **`GOOGLE_PHONE_CALLS`**: The number of times consumers called your business by clicking your phone number in your Google listings during the past 90 days. You must use the `GOOGLE_PHONE_CALL_HOURS` dimension with this metric.
     * * **`GOOGLE_USER_PHOTOS`**: The number of photos uploaded by Google users (consumers) to your Google listing.
     * * **`YELP_CUSTOMER_ACTIONS`**: The number of times consumers called your business, got driving directions to your business, or visited your website via the links in your Yelp listings. Available with **`v`** parameters `20170914` and later.
     * * **`AVERAGE_RATING`**: The cumulative average of the ratings your business has received.
     * * **`NEW_REVIEWS`**: The number of new reviews your business has received.
     * * **`KEYWORD_SENTIMENT`**: The sentiment score of review keywords.
     * * **`KEYWORD_MENTIONS`**: The number of times a review keyword is mentioned.
     * * **`RESPONSE_COUNT`**: The number of reviews with responses on publishers that support in-platform response.
     * * **`RESPONSE_TIME`**: The average time in hours between the review date and the response date of all reviews with responses that can be responded to in the platform.
     * * **`RESPONSE_RATE`**: The percentage of reviews with responses on publishers that support in-platform response.
     * * **`CUMULATIVE_RATING`**: Average review rating of Competitors.
     * * **`WIDGETS_REVIEWS_VIEWS`**: The number of views of embedded 'widgets' containing reviews.
     * * **`STOREPAGES_SESSIONS`**:  The number of unique visitors (sessions) to your Store Pages.
     * * **`STOREPAGES_PAGEVIEWS`**:  The number of page views on your Store Pages.
     * * **`STOREPAGES_DRIVINGDIRECTIONS`**:  The number of times someone clicked for directions on your Store Pages.
     * * **`STOREPAGES_PHONECALLS`**:  The number of times someone clicked to make a phone call from your Store Pages.
     * * **`STOREPAGES_CALLTOACTIONCLICKS`**:  The number of times someone clicked a call to action on your Store Pages.
     * * **`STOREPAGES_CLICKSTOWEBSITE`**:  The number of times someone clicked to go to your website from your Store Pages.
     * * **`STOREPAGES_EVENT_eventtype`**:  the number of times the Store Pages custom event occurred. Replace "eventtype" with the custom event name.
     * * **`PROFILE_UPDATES`**: Count of updates to your Yext profile.
     * * **`PUBLISHER_SUGGESTIONS`**: Count of all publisher suggestions.
     * * **`SOCIAL_ACTIVITIES`**: Count of all new social posts.
     * * **`DUPLICATES_SUPPRESSED`**: Count of all duplicates suppressed.
     * * **`DUPLICATES_DETECTED`**: Count of all duplicates detected.
     * * **`LISTINGS_LIVE`**: Count of new listings live.
     * * **`IST_SEARCH_REQUESTS`**: The number of search requests that were successfully analyzed.
     * * **`IST_AVERAGE_LOCAL_PACK_POSITION`**: The average position of the local pack when it appears in a search engine results page.
     * * **`IST_AVERAGE_LOCAL_PACK_NUMBER_OF_RESULTS`**: The average number of results in the local pack when it appears in a search engine results page.
     * * **`IST_LOCAL_PACK_EXISTED`**: The percentage of times a local pack showed up in search results.
     * * **`IST_LOCAL_PACK_PRESENCE`**: The percentage of times your business appears in a local pack when one was shown.
     * * **`IST_KNOWLEDGE_CARD_EXISTED`**: The percentage of times a knowledge card showed up in search results.
     * * **`IST_MATCHES_PER_SEARCH`**: The total number of matches on the first page of the search engine results.
     * * **`IST_AVERAGE_FIRST_ORGANIC_MATCH_POSITION`**: The average position of the first match in the organic results in the search engine results page if one exists.
     * * **`IST_AVERAGE_FIRST_LOCAL_PACK_MATCH_POSITION`**: The average position of the first match in the local pack in the search engine results page if one exists.
     * * **`IST_AVERAGE_FIRST_MATCH_POSITION`**: The average position of the first match in either the local pack or organic results in the search engine results page if one exists.
     * * **`IST_ORGANIC_SHARE_OF_SEARCH`**: The share of search for all organic matches in the search engine results page.
     * * **`IST_LOCAL_PACK_SHARE_OF_SEARCH`**: The share of search for all local pack matches in the search engine results page.
     * * **`IST_SHARE_OF_INTELLIGENT_SEARCH`**: The share of search for all matches in the search engine results page.
     * * **`IST_TOTAL_MATCHES`**: The total number of matches on the first page of the search engine results.
     * * **`IST_AD_MATCHES`**: The total number of ads matched to the location or one of its competitors.
     * * **`IST_AD_PRESENCE`**: The percentage of searches in which at least one ad appeared for the location or one of its competitors.
     * * **`ST_EVENT_SHARE_OF_INTELLIGENT_SEARCH`**: Share of Intelligent Search for your Events.
     * * **`ST_EVENT_RICH_RESULT_PRESENCE`**: The percentage of time your event appeared in an event rich result when one was shown.
     * * **`ST_EVENT_MATCHES_PER_SEARCH`**: Matches per Search for Events.
     * * **`CLICKS`**: The number of times consumers clicked on your online properties.
     * * **`CONVERSIONS`**: The number of conversions based on the methodology you selected.
     * * **`CONVERSION_RATE`**: Conversions divided by clicks.
     * * **`CONVERSION_VALUE`**: The monetary impact of your conversions.
     * * **`ANSWERS_CLICKS`**: Number of times content has been clicked.
     * * **`ANSWERS_CLICK_THROUGH_RATE`**: Percentage of Searches with a click, rounded to the 1’s place i.e. `67.96% → 68%`. CTR = Searches with Click / Searches.
     * * **`ANSWERS_SEARCHES`**: Number of times a user ran a Search.
     * * **`ANSWERS_SEARCHES_WITH_CLICKS`**: Number of times a user ran a Search and clicked a link.
     * * **`ANSWERS_SESSIONS`**: Number of times a Session was started. A Session begins on user’s first search and ends when user closes the browser.
     * @type {Array<string>}
     * @memberof CreateReportRequestBody
     */
    metrics: Array<string>;
    /**
     * Determines how the data will be grouped. Specify up to 3 values.
     * <br><br>
     * **NOTES:**
     * <br>
     * You can only use one time-based dimension (e.g., `DAYS`, `WEEKS`) per report.
     * <br>
     * You can only use one location-based dimenion (e.g., `FOLDER_IDS`, `LOCATION_NAMES`) per report.
     * <br><br>
     * * **`ACCOUNT_IDS`**
     * * **`LOCATION_IDS`**
     * * **`FOLDER_IDS`**
     * * **`LOCATION_NAMES`**
     * * **`FOLDER_NAMES`**
     * * **`DAYS`**
     * * **`WEEKS`**
     * * **`MONTHS`**: Refers to the Gregorian calendar (January, February, etc.).
     * * **`MONTHS_RETAIL`**: Refers to the 4-5-4 merchandising calendar.
     * * **`WEEK_NUMBER`** A given week labeled with the number of weeks into a year and its corresponding year. A week is always Monday to Sunday, “Week 1” will always contain January 1st, and the year is the year of the last day (Sunday) of that week (Week 1 (2017), Week 2 (2017), etc.).
     * * **`DAY_OF_WEEK`** Refers to a day of the week (Monday, Tuesday, etc.).
     * * **`ENTITY_IDS`** Identify events by the corresponding entity.
     * * **`ENTITY_TYPES`** Identify events by the type of the corresponding entity.
     * * **`ENTITY_GROUPS`** Identify events by the type group of the corresponding entity.
     * * **`EVENTS`** Identify events by the corresponding event.
     * * **`PLATFORM`**: Groups data by the platform on which the action measured in **`metrics`** was conducted (e.g., Desktop, Mobile).
     * * **`PUBLISHERS`**: Groups data about the site-interaction events listed in **`metrics`** by the sites on which they occurred.
     * * **`FOURSQUARE_GENDER`**: Groups checkins by users' sexes (`male` or `female`). Can only be used with the `FOURSQUARE_DAILY_CHECKINS` metric.
     * * **`FOURSQUARE_AGE`**: Groups checkins by the users' ages (`13-17`, `18-24`, `25-34`, `35-44`, `45-54`, `55+`). Can only be used with the `FOURSQUARE_DAILY_CHECKINS` metric.
     * * **`FOURSQUARE_TIME`**: Groups checkins by their times (`morning`: 7 AM - 10:59 AM, `noon`: 11 AM - 1:59 PM, `afternoon`: 2 PM - 5:59 PM, `evening`: 6 PM - 8:59 PM, `night`: 9 PM - 6:59 AM). Can only be used with the `FOURSQUARE_DAILY_CHECKINS` metric.
     * * **`SEARCH_QUERY`**: Groups searches according to the search criteria used. Can only be used with the `SEARCHES` metric.
     * * **`GOOGLE_ACTION_TYPE`**: The type of action consumers took through your Google listings (Phone Calls, Get Directions, or Website Clicks). Can only be used with the `GOOGLE_CUSTOMER_ACTIONS` metric. Only works with **`v`** parameters before `20170914`.
     * * **`CUSTOMER_ACTION_TYPE`**: The type of action consumers took through your Google or Yelp listings (Phone Calls, Get Directions, or Website Clicks). Can only be used with the `GOOGLE_CUSTOMER_ACTIONS` and `YELP_CUSTOMER_ACTIONS` metrics. Replaces `GOOGLE_ACTION_TYPE` for **`v`** parameters `20170914` and later.
     * * **`GOOGLE_QUERY_TYPE`**: Groups search criteria based on whether they contained your brand name (branded) or not (unbranded). Can only be used with the `GOOGLE_SEARCH_QUERIES` metric. If the **`v`** parameter is before `20171020`: groupings are `BRANDED QUERIES` and `UNBRANDED QUERIES`, otherwise groupings are `DIRECT` and `DISCOVERY`. If the **`v`** parameter is `20190425` or later: a new query type `BRANDED` is added.
     * * **`GOOGLE_PHONE_CALL_HOURS`**: Can only be used with the `GOOGLE_PHONE_CALLS` metric.
     * * **`RATINGS`**: Can only be used with Reviews metrics except CUMULATIVE_RATING.
     * * **`FREQUENT_WORDS`**: The words that most frequently appear in your reviews.
     * * **`PARTNERS`**: The sites your reviews appear on. Can only be used with Reviews metrics.
     * * **`REVIEW_KEYWORDS`**: The keywords used in your reviews.
     * * **`SENTIMENT_COLLECTION`**: Identify reviews by their sentiment collection of keywords.
     * * **`STOREPAGES_PAGE_TYPE`**: The page types for your Store Pages. Can only be used with Store Pages metrics.
     * * **`STOREPAGES_PAGE_URL`**: The urls people visited on your Store Pages. Can only be used with Store Pages metrics.
     * * **`STOREPAGES_DIRECTORY`**: The directories of your Store Pages. Can only be used with Store Pages metrics.
     * * **`PUBLISHER_SUGGESTION_TYPE`**: The type of the publisher suggestion (can only be used with the `PUBLISHER_SUGGESTIONS` metric).
     * * **`FIELD_NAME`**: The name of the field being updated in your profile (can only be used with the `PROFILE_UPDATES` metric).
     * * **`LISTINGS_LIVE_TYPE`**: The type of of listings live, either be `Claimed` or `Created` (can only be used with `LISTINGS_LIVE` metric).
     * * **`IST_QUERY_TEMPLATE`**: The query template used to create search requests. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_KEYWORD`**: The keyword used to create search requests. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_SEARCH_ENGINE`**: The search engine used for the Intelligent Search Tracker. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_COMPETITOR`**: Competitors monitored by the Intelligent Search Tracker. Can be used with Intelligent Search Tracker metrics and the Cumulative Rating metric.
     * * **`IST_MATCH_POSITION`**: The local pack or organic position of the search result. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_SEARCH_RESULT_TYPE`**: One of Organic, Local Pack or Knowledge Card. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_MATCH_TYPE`**: One of Local Map Pack, Listings, Pages and Corporate Website. Can only be used with Intelligent Search Tracker metrics.
     * * **`IST_LOCAL_PACK_COMPETITOR`**: Local pack competitors monitored by the Intelligent Search Tracker. Can be used with `IST_MATCHES_PER_SEARCH` and `IST_TOTAL_MATCHES`.
     * * **`AGE`**: The age range of a Facebook user. Can be used with `FACEBOOK_LIKES`, `FACEBOOK_TALKING_ABOUT`, `FACEBOOK_CHECKINS`, `FACEBOOK_IMPRESSIONS`, and `FACEBOOK_PAGE_VIEWS`.
     * * **`GENDER`**: The gender of a Facebook user. Can be used with `FACEBOOK_LIKES`, `FACEBOOK_TALKING_ABOUT`, `FACEBOOK_CHECKINS`, `FACEBOOK_IMPRESSIONS`, and `FACEBOOK_PAGE_VIEWS`.
     * * **`FACEBOOK_IMPRESSION_TYPE`**: Indicates whether your Facebook Impressions came from Organic, Paid, or Viral content. Can only be used with the `FACEBOOK_IMPRESSIONS` and `FACEBOOK_POST_IMPRESSIONS` metrics.
     * * **`FACEBOOK_STORY_TYPE`**: How people are talking about your Page (e.g., posts, likes, comments). Can only be used with the `FACEBOOK_TALKING_ABOUT` metric.
     * * **`FACEBOOK_RSVP_TYPE`**: Identify Facebook Events by RSVP type. Can be used with `FACEBOOK_EVENT_NEW_RSVPS`.
     * * **`EVENT_SEARCH_CONDITION`**: Identify Search Tracker for Events metrics by the event search schedule condition. Can be used with Search Tracker Event metrics.
     * * **`PRODUCT`**: Identify conversion analytics by the product in which they occurred. Can only be used with Conversion Tracking metrics.
     * * **`MEDIUM_ID`**: Identify the source of click this conversion is attributed to. Can only be used with Conversion Tracking metrics.
     * * **`MEDIUM_TYPE`**: Identify the type of source of click this conversion is attributed to. Can only be used with Conversion Tracking metrics.
     * * **`CLICK_TYPE`**: Identify the type of click that a conversion is attributed to. Can only be used with Conversion Tracking metrics.
     * * **`CONVERSION_ACTION_ID`**: Can only be used with Conversion Tracking metrics.
     * * **`ANSWERS_EXPERIENCE`**: Name of Answers Experience. Can only be used with Answers metrics.
     * * **`ANSWERS_EXPERIENCE_KEY`**: Key of Answers Experience. Can only be used with Answers metrics.
     * * **`ANSWERS_BACKEND`**: Backend(s) used to return results. Currently includes: <ul><li>`Algolia`<li>`Bing CSE`<li>`Custom Covid Backend`<li>`Knowledge Manager`<li>`Google CSE`<li>`Zendesk`</ul> Can only be used with Answers metrics.
     * * **`ANSWERS_CONFIGURATION_VERSION`**: Version Number of Configuration used to run the Search. Can only be used with Answers metrics.
     * * **`ANSWERS_CONFIGURATION_VERSION_LABEL`**: Version Label of Configuration used to run the Search. Can only be used with Answers metrics.
     * * **`ANSWERS_LOCALE`**: Locale Search was run in. Can only be used with Answers metrics.
     * * **`ANSWERS_SEARCH_ID`**: ID of Search. Can only be used with Answers metrics.
     * * **`ANSWERS_SEARCH_TERM`**: Normalized Search Term of Search. Normalization removes: <ul><li>`Capitalization`<li>`Punctuation`<li>`White Space`</ul> Can only be used with Answers metrics.
     * * **`ANSWERS_SESSION_ID`**: ID of Session Search was run in. Can only be used with Answers metrics.
     * * **`ANSWERS_SEARCH_VERTICAL`**: Vertical Search was ran on. Can only be used with Answers metrics.
     * * **`ANSWERS_TRAFFIC_TYPE`**: `External` or `Internal`. Can only be used with Answers metrics.
     * * **`ANSWERS_CLICK_TYPE`**: Type of Click. Can only be used with Answers metrics.
     * * **`ANSWERS_VERTICAL_CONFIG_ID`**: Vertical associated with Event. Can only be used with Answers metrics.
     * @type {Array<string>}
     * @memberof CreateReportRequestBody
     */
    dimensions: Array<string>;
    /**
     * 
     * @type {AnalyticsFilter}
     * @memberof CreateReportRequestBody
     */
    filters?: AnalyticsFilter;
}

export function CreateReportRequestBodyFromJSON(json: any): CreateReportRequestBody {
    return CreateReportRequestBodyFromJSONTyped(json, false);
}

export function CreateReportRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateReportRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'metrics': json['metrics'],
        'dimensions': json['dimensions'],
        'filters': !exists(json, 'filters') ? undefined : AnalyticsFilterFromJSON(json['filters']),
    };
}

export function CreateReportRequestBodyToJSON(value?: CreateReportRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'metrics': value.metrics,
        'dimensions': value.dimensions,
        'filters': AnalyticsFilterToJSON(value.filters),
    };
}


