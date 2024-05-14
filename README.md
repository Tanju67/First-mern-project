## trip-share Frontend

A trip share application built with React JS for the frontend and Express JS and Mongoose for the backend.In this application, the user can create a profile for himself and share photos of the places he has visited and his comments about that place. The user can also see photos and comments shared by other users.
![Trip Share](./frontend/src/assets/trip.gif)

## Features

### Sign In & Sign Out

The user must log in to share photos and comments .

### Usage of the trip-share aplication

After logging in, the user can create a profile for himself and share photos of the places he has visited and his comments about that place. The user can also see photos and comments shared by other users.

## Built With

- React JS
- React router dom
- CSS Modules

## Getting Started

### Prerequisites

Install npm.

- npm
  ```
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo.
   ```
   git clone https://github.com/Tanju67/First-mern-project.git
   ```
2. navigate into the frontend directory.
   ```
   cd .\frontend\
   ```
3. Install NPM packages.
   ```
   npm install
   ```
4. Create the backend url in a .env file.
   ```
   REACT_APP_BASE_URL=http://localhost:5000/
   ```
5. Start the frontend server (Firstly you must start backend server).
   ```
   npm start
   ```

# Trip-Share-Backend

**Trip-Share-website** is one of my personal projects.This repository holds the code of it's backend which is a **RESTful API**.

### Contents

- [Trip-Share-Backend](#trip-share-backend)
  - [Contents](#contents)
  - [Features:](#features-1)
  - [Tech used:](#tech-used)
  - [How to get the project:](#how-to-get-the-project)
  - [API endpoints:](#api-endpoints)
    - [_Indication_](#indication)
    - [Auth related](#auth-related)
    - [Profile related](#profile-related)
    - [Place related](#place-related)

## Features:

- Users can create,update and delete their profiles (token-based authentication)
- Users can create, update and delete their trips.
- Users can see all trips shared by the other user.
- Users can delete their accounts.

## Tech used:

**Runtime environment**

- [x] Node.js

**Database**

- [x] MongoDB

## How to get the project:

1. Navigate into backend directory.

```
  cd .\backend\
```

2. Create the backend url in a .env file.

```
MONGO_URI=(your mongo uri)
JWT_SECRET= (create your key)
PORT=5000
```

3.  Install NPM packages.

```
npm install
```

4.  Start the server .

```
npm start
```

## API endpoints:

#### _Indication_

- [x] **Authentication required**
- [ ] **Authentication not required**

### Auth related

- [ ] Resgister: `POST localhost:5000/api/v1/auth/register`
- [ ] Login: `POST localhost:5000/api/v1/auth/login`
- [ ] Logout: `GET localhost:5000/api/v1/auth/logout`
- [ ] Refetch: `GET localhost:5000/api/v1/auth/refetch`
- [ ] Get user: `GET localhost:5000/api/v1/auth/user/:id`
- [ ] Delete user: `DELETE localhost:5000/api/v1/auth/user/:id`

### Profile related

- [ ] Get profile: `GET localhost:5000/api/v1/profile/:id`
- [x] Create user profile: `POST localhost:5000/api/v1/profile/:id`

### Place related

- [ ] Get all places: `GET localhost:5000/api/v1/place`
- [x] Get user places: `GET localhost:5000/api/v1/place/user/:id`
- [x] Get single place: `GET localhost:5000/api/v1/place/:id`
- [x] Create Place: `POST localhost:5000/api/v1/place`
- [x] Update Place: `PATCH localhost:5000/api/v1/place/:id`
- [x] Delete Place: `DELETE localhost:5000/api/v1/place/:id`
