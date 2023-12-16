# Space_Exploration_Dashboard_Service_Layers

## Description of Application
The Space Exploration Dashboard is a web application designed to provide users with the latest updates on space missions, upcoming space-related events, and current space weather conditions. It's tailored for space enthusiasts and professionals alike to stay informed and engaged with the progress of space exploration.

## Overview of this Repo
The Service Layers for the Space Exploration Dashboard acts as the middleware between the user interface and the database. It handles all backend logic, data retrieval, manipulation, and API endpoint exposure.

## Purpose of this Repo
The service layers ensure that data is correctly processed and served to the UI. They enable the core functionalities of the dashboard by providing RESTful APIs that the front end consumes.

## Role in the Overall Application 

The service layers play a critical role in the application's architecture, providing a separation of concerns that enhances maintainability and scalability. They act as an abstraction layer that allows the UI to be developed and function independently of the data storage mechanisms.

## Installation

Instructions on how to install the Space Exploration Dashboard.

Clone the Repository:
git clone https://github.com/your-username/Space_Exploration_Dashboard_Service_Layers.git
cd Space_Exploration_Dashboard_Service_Layers

Install Dependencies:
npm install

Environment Configuration:

Create a .env file in the root of the project.
Add necessary environment variables like PORT, MONGODB_URI, and NASA API key.

## Running the Project

To run the project locally:
Start the Server:
node server.js

Accessing the API:

Once the server is running, you can access the API endpoints via http://localhost:<PORT>, replacing <PORT> with the port number in your .env file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contact
Elysia Burton - [eburton4@live.maryville.edu](mailto:eburton4@live.maryville.edu)
