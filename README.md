# Node-CRUD-challenge


## Simple CRUD API

Your task is to implement simple CRUD API using in-memory database underneath.  

## Details:
1. API path `/person`:
    * **GET** `/person` or `/person/${personId}` returns all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
2. Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `/some-non/existing/resource`) is handled.
4. Internal server errors is handled and processed correctly.
5. the api is accesible by frontend apps hosted on a different domain (cross-site resource sharing)
