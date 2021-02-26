## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Pictures](#pictures)

## General info
This app is an exmaple of a simple polish rental website, this time sport equipment rental.  
In application we can create an account with user role, what is a must to make an order. If we would try to place an order without being logged in, we will get a message to log in. Ofcourse we can also logout. In application we can order various products from different categories. As a normal Guest we are availiable to check those products and their price. If we are logged in we can finally go to order page of the product we are interested in and make a reservation of the product, but only if product is availiable and in choosen date it is not busy. Otherwise we will be not able to click Order button. As User we can change our email, username, password with the same requirements as it was when creating the account. Last User functionality is to cancel personal future bookings. There is also Admin user in the app, who can in addition set product unavailiable, check statistics on tables and sales on the chart.

In brief we are availiable to:  
- as guest
  - register/login
  - check products and their prices
- as user
  - everything of guest's functionality 
  - place an order
  - change username/email/password
  - cancel personal future bookings
- as admin
  - everything of user's functionality
  - set product unavailiable
  - check statictics on table
  - check sales on chart
	
## Technologies
Project is created with:
* React.js
* Spring Boot
* Bootstrap
	
## Setup
To run this project:  

#### Database
* Create database instance in MSSQL named "wypozyczalnia_sportowa"

#### Backend
* Set in application.properties your SQL Server username and password
* Install Json Package
```
$ cd ../backend
$ npm install
```
* After that just run the "backend/src/main/java/com.dgwiazda/wypozyczalnia"

#### Frontend

```
$ cd ../frontend
$ npm install
$ npm start
```
##### Now You can use application on http://localhost:8081
## Pictures

#### Database Relations
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/DataBaseRelations.PNG?raw=true)

#### Home Page
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/homePage.PNG?raw=true)

#### Product Page
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/Product.PNG?raw=true)

#### Order Page
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/Order.PNG?raw=true)

#### Admin Board Page - table
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/AdminBoardTable.PNG?raw=true)

#### Admin Board Page - chart
![alt text](https://github.com/dgwiazda/rental/blob/master/pictures/AdminBoardChart.PNG?raw=true)
