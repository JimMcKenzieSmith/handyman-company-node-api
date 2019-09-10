# Handyman Company NodeJS API

## Developing
Ensure you have the latest LTS NodeJS and NPM versions installed. Preferred version is NodeJS v10.x and NPM v6.x.
```bash
# Install dependencies
npm install

# Install nodemon globally, if you have not already done so
sudo npm install -g nodemon

# Start mongo db in a separate terminal
mongod

# Run it
nodemon index.js
```
Navigate to `localhost:3000` on your machine--all API endpoints listed in `index.js` should be accessible from this URL and port.

## Data Schema Reference
Here are some simple examples of the four data types used in this project. 

**Customer**
```json5
{
  "_id":"5d748578d697c5dbfecff763",
  "name":"Breanne Smith",
  "phone":"555-555-5555",
  "email":"breanne@example.com",
  "__v":0
}
```
**ServiceCategory**
```json5
{
  "_id":"5d7476b4c472a8d1dba681c3",
  "name":"Plumbing",
  "__v":0
}
```
**HandymanService**
```json5
{
  "_id":"5d74818bd196a8d9d8278980",
  "title":"Garbage Disposal Replacement",
  "serviceCategory":{
    "_id":"5d7476b4c472a8d1dba681c3",
    "name":"Plumbing"
  },
  "price":175,
  "__v":0
}
```
**Job**
```json5
{
  "_id":"5d7517ca50a0eeea30ac2112",
  "customer":{
    "_id":"5d748578d697c5dbfecff763",
    "name":"Breanne Smith",
    "phone":"555-555-5555"
  },
  "handymanService":{
    "_id":"5d74833d718a7dda2f770318",
    "title":"Treadmill Assembly",
    "price":125
  },
  "startDate":"2019-09-09T15:00:00.000Z",
  "endDate":"2019-09-09T18:00:00.000Z",
  "__v":0
}
```
