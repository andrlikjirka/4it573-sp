# Dreamify - crowdfunding app

## Project description
...

### Tech-stack

- Node.js & Express
- Nunjucks templating engine
- Mongoose ODM
- MongoDB
- Websockets
- JSON WebTokens
- Playwright
- PayPal API
- Docker
 
### Functionality

#### Public module
- registration and login process
- dreams categories
- publishing new dreams
- contribution to dream authors using PayPal (helping to make their dreams come true)
- real-time updates when a new contribution made
- user profile
- author's dreams 

#### Administration module
- dreams approval process
- dream administration
- users administration

## How to run the project

To run app instance (on port 3000)
1. `git clone ...`
2. edit `app.env` and `db.env` files
3. run: `docker compose up`
4. go to: `http://localhost:3000/`


To run end-to-end tests (using independent test-app instance on port 3001):

1. make sure you have node.js installed on your machine
2. run: `npm install`
3. run on your local machine in new terminal window: `npm run test`
4. run tests in UI mode
