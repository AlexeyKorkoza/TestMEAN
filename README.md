## Description
TestMEAN is test application for working with map.

## Demo
https://powerful-ocean-87208.herokuapp.com/

## Install
First of all, clone the repository:
```
git clone https://github.com/AlexeyKorkoza/TestMEAN.git
```

After that install packages using <b>npm</b>:  

``` npm install ```

Using <b>yarn</b>:

``` yarn install ```

Create .env file where you must write credentials to Database. See .env.example as example

Create database with name ```interactive_map```

## Run
Start client part:

``` npm run webpack:watch ```

Start server part:

``` npm dev:watch ```

## API

Url | Method | Description |
------- | ---------------- | ---------:
/login  | POST | Log in application
/logout  | -        | Log out from application
/signup   | POST | Sign up in application      
/app | GET | Render main page
/api/v1/profile/:id/ | PUT | Update user profile
/api/v1/types/ | GET | Get all types of places
/api/v1/types/:id/ | GET | Get one type by id
/api/v1/types/ | POST | Create new type
/api/v1/types/:id/ | PUT | Update type
/api/v1/types/:id/ | DELETE | Remove type
/api/v1/places/ | GET | Get all places
/api/v1/places/:id/ | GET | Get one place by id
/api/v1/places/ | POST | Create new place
/api/v1/places/:id/ | PUT | Update place
/api/v1/places/:id/ | DELETE | Remove place


## Tests

``` npm run test ```
