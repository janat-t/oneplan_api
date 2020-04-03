## Wanplan REST API Ver 1.3.0 Overview

| Table         | Primary Key   | Available Filter            |
| ------------- | ------------- | --------------------------- |
| attraction    | attraction_id | city, style                 |
| city          | city_id       | prefecture, region, country |
| country       | country_id    | -                           |
| image         | image_id      | -                           |
| transport     | -             | -                           |
| plan_detail   | -             | -                           |
| plan_overview | plan_id       | user, city, style           |
| plan_startday | -             | -                           |
| user          | user_id       | username, email             |

The follow table is for all table except plan_detail and transport.

| HTTP Type | API URL                           | Comments                                                                                        |
| --------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| GET       | /api/plan/:planId                 | Retrieves information from table plan_detail, plan_overview, plan_startday, and user by plan_id |
| GET       | /api/tableName                    | Lists rows of table (except image)                                                              |
| POST      | /api/tableName                    | Create a new row                                                                                |
| GET       | /api/tableName/:id                | Retrieves a row by primary key (except country)                                                 |
| PUT       | /api/tableName/:id                | Updates row element by primary key (except city, country)                                       |
| DELETE    | /api/tableName/:id                | Delete a row by primary key                                                                     |
| POST      | /api/tableName/:planId/:newuserId | Duplicates a row by primary key then change user_id (only plan_overview)                        |
| GET       | /api/tableName/filterName/:id     | Retrieves rows by filter (except country and image)                                             |

The follow table is for plan_detail only.

| HTTP Type | API URL                                 | Comments                                                                  |
| --------- | --------------------------------------- | ------------------------------------------------------------------------- |
| POST      | /api/plan_detail                        | Create a new row                                                          |
| GET       | /api/plan_detail/:id                    | Retrieves a row by plan_id                                                |
| PUT       | /api/plan_detail/:planId/:day/:order    | Updates row element by composite primary key i.e. plan_id, day, and order |
| POST      | /api/plan_detail/:planId/:newplanId     | Duplicates a row by plan_id then change user_id and plan_id               |
| DELETE    | /api/plan_detail/delete/:id             | Delete a row by plan_id                                                   |
| DELETE    | /api/plan_detail/delete/:id/:day/:order | Delete a row by composite primary key i.e. plan_id, day, and order        |

The follow table is for transport only.

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

The follow table is for plan_startday only.

| HTTP Type | API URL                                | Comments                                                          |
| --------- | -------------------------------------- | ----------------------------------------------------------------- |
| POST      | /api/plan_startday                     | Create a new row                                                  |
| GET       | /api/plan_startday/:planId             | Retrieves a row by plan_id                                        |
| PUT       | /api/plan_startday/:planId/:day        | Updates row element by composite primary key i.e. plan_id and day |
| POST      | /api/plan_startday/:planId/:newPlanId  | Duplicates a row by plan_id then change plan_id                   |
| DELETE    | /api/plan_startday/delete/:planId      | Delete rows by plan_id                                            |
| DELETE    | /api/plan_startday/delete/:planId/:day | Delete a row by composite primary key i.e. plan_id and day        |
