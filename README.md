# ETH Pizza

[NOW LIVE](https://ethpizza.biz)


ETH Pizza is a POS SaaS product for a fictional pizza restaurant built using blockchain technology. It is designed to handle payments, store payment data, manage rewards points and gift cards, and provide interfaces for employees and users.

## Purpose

The purpose of this project is to showcase how blockchain can be integrated into small businesses and provide real value. It will also demonstrate my wide knowledge of software development, as it will contain everything from project management to backend services to smart contracts.

## Technologies Used

- Ethereum blockchain
- Solidity smart contracts
- Next js frontend using typescript, react and Tailwind css
- GoLang backend
- openAI tools for planning and development help

## Installation

To install and run the ETH Pizza project, follow these steps:

1. Clone the repository to your local machine.
2. Create a .env in each of the directories (there is an ex.env in each) and populate api key values.
    - Next steps will explain how to get the mongoDB and contract address values for /backend/.env
    - Default backend server used by the frontend is the live version on ethpizza.biz, if you want to use your own as done below, replace the endpoint value in /frontend/.env with localhost:8080
    - The private key in smart-contracts/.env will be the only wallet that can create new orders. Anyone however, can pay.

3. Create a MongoDB instance for your database. You will need to paste the connection URI into the backend .env file
    - You will need to create a Database named "data" with 2 collections named "orders" and "menuItems"
    - Menu items will need to be added to the database. You can copy the ones I use [here](https://ethpizza.biz/backend/menuItems) or add your own according to the same schema.
4. Install the necessary dependencies in /frontend and /smart-contracts using `npm install`.
5. Start the /backend server using `go run main.go`.
6. Start the frontend server using `npm run dev`.
7. In the /smart-contracts directory run `npx hardhat node` to start a local node.
8. Deploy smart contracts with `npx hardhat deploy --network local` you will be returned with a contract address
9. Populate that address in the /backend .env
10. In parent directory run `cp /smart-contracts/deployments/local/Router.json /frontend/public/` to copy the Router deployment file to the frontend
11. Visit localhost:8080 to see the site!

## Project Objectives

The ETH Pizza POS system will have the following features, as defined by the fictional pizza restaurant owner (GPT-4):

1. Ethereum payment integration
2. Real-time conversion rates
3. QR code generation
4. Transaction confirmation
5. Refund functionality
6. Sales reporting
7. Tax compliance
8. Security
9. User-friendly interface
11. Scalability
12. Customer loyalty program

The user-friendly interface will have the following features, as defined by a pretend pizza chain worker:

1. Clear and organized layout
2. Search functionality
3. Customization options
4. Order summary and modifications
5. Efficient payment processing
6. Order tracking and history

## Scope

The following features will not be included in the ETH Pizza project:

1. Development of a mobile app or web-based version of the POS system.
2. Ongoing maintenance and updates after the initial release.
3. Custom hardware development or procurement for the POS system.
4. Employee training and onboarding.
5. Beautiful/fancy styling for the frontend.
6. Advanced testing or support for edge cases.
7. Convenient scripting or interfaces for addition of new features.
8. Employee management or separate logins.
9. Customer facing application for rewards or order tracking.

## Stakeholders and Roles

The developer will be the only stakeholder and will take on all roles in the project, being a portfolio project the only interest is to be impressive and demonstrate clear knowledge of software development.

## Medium
The projects construction is documented on Medium in a series:
https://medium.com/@carsonpcase