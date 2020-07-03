### Wanplan REST API Ver 1.5.3 Overview

| Table         | Primary Key   | Available Filter              |
| ------------- | ------------- | ----------------------------- |
| attraction    | attraction_id | city, style, google_place_id  |
| city          | city_id       | prefecture, region, country   |
| country       | country_id    | -                             |
| image         | image_id      | -                             |
| plan_detail   | -             | -                             |
| plan_location | plan_id       | -                             |
| plan_overview | plan_id       | user, city, style             |
| plan_startday | -             | -                             |
| response      | response_id   | -                             |
| transport     | -             | -                             |
| user          | user_id       | username, email               |
| ward          | ward_id       | -                             |

## Attraction

| HTTP Type | API URL                                  | Comments                                                                                        |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/attraction                          | Create a new attraction                                                                         |
| GET       | /api/attraction                          | List attractions                                                                                |
| GET       | /api/attraction/:attractionId            | Retrieve an attraction by attraction id                                                         |
| GET       | /api/attraction/google_id/:placeId       | Retrieve an attraction by google place id                                                       |
| GET       | /api/attraction/ward/:wardId             | Retrieve attractions by ward id                                                                 |
| GET       | /api/attraction/city/:cityId             | Retrieve attractions by city id                                                                 |
| GET       | /api/attraction/style/:style             | Retrieve attractions by style                                                                   |
| PUT       | /api/attraction/:attractionId            | Update attraction by attraction id (except city, country)                                       |
| DELETE    | /api/attraction/:attractionId            | Delete an attraction by atraction id                                                            |

## Attraction Tag

| HTTP Type | API URL                                             | Comments                                                    |
| --------- | --------------------------------------------------- | ----------------------------------------------------------- |
| POST      | /api/attraction_tag                                 | Create a new attraction tags                                |
| GET       | /api/attraction_tag/attraction/:attractionId        | Retrieve attraction tags by attraction id                   |
| GET       | /api/attraction_tag/style/:style                    | Retrieve attraction tags by style                           |
| DELETE    | /api/attraction_tag/delete/attraction/:attractionId | Delete attraction tags by atraction id                      |
| DELETE    | /api/attraction_tag/delete/style/:style             | Delete attraction tags by style                             |

## City

| HTTP Type | API URL                           | Comments                                                                                        |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/city                         | Create a new city                                                                               |
| GET       | /api/city                         | List cities                                                                                     |
| GET       | /api/city/:cityId                 | Retrieve a city by city id                                                                      |
| GET       | /api/city/prefecture/:prefecture  | Retrieve cities by prefecture                                                                   |
| GET       | /api/city/region/:region          | Retrieve cities by region                                                                       |
| GET       | /api/city/country/:countryId      | Retrieve cities by country id                                                                   |
| DELETE    | /api/city/:cityId                 | Delete a city by city id                                                                        |

## Country

| HTTP Type | API URL                           | Comments                                                                                        |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/country                      | Create a new country                                                                            |
| GET       | /api/country                      | List countries                                                                                  |
| DELETE    | /api/country/:countryId           | Delete a country by country id                                                                  |

## Google API


| HTTP Type | API URL                                                 | Comments                                                                                        |
| --------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| GET       | /api/googleplace/:placeId                               | Retrieve a place by google place id                                                             |
| GET       | /api/googlephoto/:placeId                               | Retrieve photo's urls by google place id                                                        |
| GET       | /api/googletransport/:originPlaceId/:destinationPlaceId | Retrieve distance, duration, and mode by google place id                                        |

## Image

| HTTP Type | API URL                             | Comments                                                                                        |
| --------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/image                          | Create a new image                                                                              |
| GET       | /api/image/:imageId                 | Retrieve an image by image id                                                                   |
| GET       | /api/image/attraction/:attractionId | Retrieve images by attraction id                                                                |
| PUT       | /api/image/:imageId                 | Update image by image id                                                                        |
| DELETE    | /api/image/:imageId                 | Delete an image by image id                                                                     |
| DELETE    | /api/image/attraction/:attractionId | Delete images by attraction id                                                                  |

## Load Plan

| HTTP Type | API URL                             | Comments                                                                                        |
| --------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| GET       | /api/load_plan/:planId              | Retrieve all information about a plan by plan id                                                |


## Plan Detail

| HTTP Type | API URL                                 | Comments                                                                  |
| --------- | --------------------------------------- | ------------------------------------------------------------------------- |
| POST      | /api/plan_detail                        | Create a new plan detail                                                  |
| POST      | /api/plan_detail/:planId/:newplanId     | Duplicate plan details by plan id then change user_id and plan_id         |
| GET       | /api/plan_detail/:planId                | Retrieve plan details by plan id                                          |
| PUT       | /api/plan_detail/:planId/:order         | Update a plan detail by plan id and order                                 |
| DELETE    | /api/plan_detail/delete/:planId         | Delete a plan details by plan id                                          |
| DELETE    | /api/plan_detail/delete/:planId         | Delete a plan detail by plan id and order                                 |

## Plan Location

| HTTP Type | API URL                                 | Comments                                                                  |
| --------- | --------------------------------------- | ------------------------------------------------------------------------- |
| POST      | /api/plan_location                      | Create a new plan location                                                |
| POST      | /api/plan_location/:planId/:newplanId   | Duplicate a plan location by city id then change user_id and plan id      |
| GET       | /api/plan_location/plan/:planId         | Retrieve a plan location by plan id                                       |
| GET       | /api/plan_location/city/:cityId         | Retrieve a plan location by city id                                       |
| DELETE    | /api/plan_location/delete/plan/:planId  | Delete a plan location by plan id                                         |
| DELETE    | /api/plan_location/delete/city/:cityId  | Delete a plan location by city id                                         |

## Plan Overview

| HTTP Type | API URL                                                 | Comments                                                                                 |
| --------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| POST      | /api/plan_overview                                      | Create a new plan overview                                                               |
| POST      | /api/plan_overview/:planId/:userId                      | Duplicate a new plan overview by plan id then change user id                             |
| GET       | /api/plan_overview                                      | Lists plan overviews                                                                     |
| GET       | /api/plan_overview/:planId                              | Retrieve a plan overview by plan id                                                      |
| GET       | /api/plan_overview/user/:userId                         | Retrieve plan overviews by user id                                                       |
| GET       | /api/plan_overview/criteria/:cityId/:start/:stop/:style | Retrieve plan overviews by city id                                                       |
| PUT       | /api/plan_overview/:planId                              | Update plan overview by plan id                                                          |
| DELETE    | /api/plan_overview/:planId                              | Delete a plan overview by plan id                                                        |

## Plan Review

| HTTP Type | API URL                                | Comments                                                          |
| --------- | -------------------------------------- | ----------------------------------------------------------------- |
| POST      | /api/plan_review                       | Create a new plan review                                          |
| GET       | /api/plan_review                       | Retrieve plan reviews                                             |
| GET       | /api/plan_review/:reviewId             | Retrieve plan reviews by reviewId                                 |
| GET       | /api/plan_review/plan_id/:planId       | Retrieve plan reviews by plan_id                                  |
| PUT       | /api/plan_review/:reviewId             | Update a plan review by review id                                 |
| DELETE    | /api/plan_startday/delete/:planId/:day | Delete a plan review by plan_id and day                           |

## Plan Startday

| HTTP Type | API URL                                | Comments                                                          |
| --------- | -------------------------------------- | ----------------------------------------------------------------- |
| POST      | /api/plan_startday                     | Create a new plan startday                                        |
| POST      | /api/plan_startday/:planId/:newPlanId  | Duplicate plan startdays by plan_id then change plan_id           |
| GET       | /api/plan_startday/:planId             | Retrieve plan startdays by plan_id                                |
| PUT       | /api/plan_startday/:planId/:day        | Update a plan startday by plan_id and day                         |
| DELETE    | /api/plan_startday/delete/:planId      | Delete plan startdays by plan_id                                  |
| DELETE    | /api/plan_startday/delete/:planId/:day | Delete a plan startday by plan_id and day                         |

## Response

| HTTP Type | API URL                           | Comments                                                                                        |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/response                     | Create a new response                                                                           |
| GET       | /api/response                     | List responses                                                                                  |
| GET       | /api/response/:responseId         | Retrieve a response by response id                                                              |
| DELETE    | /api/response/:responseId         | Delete a response by response id                                                                |

## Transport

| HTTP Type | API URL                                        | Comments                                                                       |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| POST      | /api/transport                                 | Create a new row                                                               |
| GET       | /api/transport/find/from/:sourceId             | Retrieves rows by source_id                                                    |
| GET       | /api/transport/find/to/:destinationId          | Retrieves rows by destination_id                                               |
| GET       | /api/transport/find/:sourceId/:destinationId   | Retrieves a row by source_id and destination_id                                |
| PUT       | /api/transport/:sourceId/:destinationId        | Updates row element by composite primary key i.e. source_id and destination_id |
| DELETE    | /api/transport/delete/from/:sourceId           | Delete rows by source_id                                                       |
| DELETE    | /api/transport/delete/to/:destinationId        | Delete rows by destination_id                                                  |
| DELETE    | /api/transport/delete/:sourceId/:destinationId | Delete a row by source_id and destination_id                                   |

## User

| HTTP Type | API URL                                  | Comments                                                                                        |
| --------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/user                                | Create a new user                                                                               |
| GET       | /api/user/                               | List users                                                                                      |
| GET       | /api/user/:userId                        | Retrieve a user by user id                                                                      |
| GET       | /api/user/username/:username             | Retrieve a user by username                                                                     |
| GET       | /api/user/email/:email                   | Retrieve a user by email                                                                        |
| PUT       | /api/user/:userId                        | Update a user by user id                                                                        |
| DELETE    | /api/user/:userId                        | Delete a user by user id                                                                        |

## Ward

| HTTP Type | API URL                           | Comments                                                                                        |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| POST      | /api/ward                         | Create a new ward                                                                               |
| GET       | /api/ward                         | List wards                                                                                      |
| GET       | /api/ward/:wardId                 | Retrieve a ward by ward id                                                                      |
| DELETE    | /api/ward/:wardId                 | Delete a ward by ward id                                                                        |
