## **PART A**

The first part of the project consists from 3 different services: 

1) A fleetAPI which includes CRUD requests for updating the database.
The POST Trip endpoint populates the tripsQueue (producer) of the RabbitMQ.

2) A heartbeatsMS which is responsible for consuming a trip in tripsQueue from the POST Trip endpoint and simulates the heartbeat of the project. 
Each simulation is then produced to a different queue (heartBeatsQueue) of the RabbitMQ.

3) An enforcementMS which is responsible for consuming all the data produced by the heartbeatMS, allowing it to enforce the rules of the scenario provided.

Moreover, the project also contains a dockerized MongoDB and a dockerized RabbitMQ. Since Mongodb and RabbitMQ instances need to be created before the Microservices, both docker files added separetely.  
If we would like to add them in a single docker-compose file we could add a dependency in the docker yml file so they could start in the proper order.


## How to run

cd  mongoDB
docker-compose up -d
cd ..
cd rabbitMQ
docker-compose up -d
cd ..
docker-compose up -d


## What could be further developed/added:

1) A logger (like winston) which could log messages in proper levels (for example: info, debug, warning).
2) Swagger, which will provide a friendly GUI for the customer to run the API and most importantly a description for each endpoint. 
3) Integration Testings.
4) JWT Authorization for securing the API. A token could be used within all endpoints to prevent unauthorized access.
5) Use soft delete instead of hard delete for the DELETE requests.   

## PART B

***Provide your own thoughts (i.e. user-stories), where OPA can be a good fit for the fictious FMS in Part A***

The Open Policy Agent could be used in the above scenario at the point when we apply the checks in order to add penalty points to the drivers if the breach the speed limit. We therefore provide a set of rules that we are able to change in real time instead of changing the code. 
Also, OPA could be applied to provide specific roles/permissions for the API. As an example, we could use it within the API to block unauthorized access for specific calls.
Another scenario within the FMS project, might be to further enhance the speed limit penalty restrictions. For example when driving under severe weather conditions we could easily change the policy to apply new rules, or even when creating a trip and marking it as an 'emergency' route, no penalties will be applied.


***What is the benefit of OPA?***

In a few words, OPA can help us remove the business logic from our code and instead apply rules that could be easily changed based on any situation. You can apply new policies in different countries and easily change them in real time scenarios. It could be used as a stand-alone service able to remove complexity from our system. 


***Where could OPA potentially reside in the FMS architecture?***
We could deploy a new stand alone service and let the OPA act as the projects main authority service. All the other services can easily communicate with the new service and apply any restrictions, validations or even scaling instructions when reaching certain thresholds in all of our microservices.