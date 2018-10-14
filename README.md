

## Stats-Manager-Server
This is a simple user authentication and update user server for Stats Manager front end application.
It has the following REST APIs:

@route   POST api/user
@desc    Sign up a new user

@route   POST api/user
@desc    Sign in an existing user

@route   GET api/user/userId
@desc    Get an existing user by user id

@route   PUT api/user
@desc    Update an existing user

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm`
* Ensure you're running the latest versions Node and NPM

## Installing
* `clone` this repo
* `npm install` to install all dependencies 

## Running the app
After you have installed all dependencies you can now run the app. Run `npm start` to start a local server which will watch, build, and reload for you. The port will be displayed to you as `http://localhost:5000`

## Front-end application
https://github.com/Developer-JL/stats-manager