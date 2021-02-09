## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Pictures](#pictures)

## General info
This app is an exmaple of a simple rental website, this time sport equipment rental.  
In application we can :  
* register/login/logout
* order products
* with admin role - check statistics
	
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
