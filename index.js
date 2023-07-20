const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

let persons = [
    {
        id: '1',
        name: 'Sam',
        age: '26',
        hobbies: []    
    }
] //This is your in memory database




app.set('db', persons)




// CREATE
app.post('/person', (req,res) => {
    if (!req.body.name || !req.body.age || !req.body.hobbies){
        return res.status(400).json({
            status : "ERROR OCCURED",
            message : "Please provide all the datas"
        })
    }


    if (typeof(req.body.name) !== 'string' || !Number(req.body.age) || typeof(req.body.hobbies) !== 'object'){
        return res.status(400).json({
            status : "ERROR OCCURED",
            message : "Incorrect data-type"
        })
    }
    

    try {
        const newPerson = {
            id : (persons.length - 1 > -1 ? (Number(persons[persons.length - 1].id) + 1) : 1).toString(),
            name : req.body.name,
            age : req.body.age,
            hobbies : req.body.hobbies
        }
    
        persons.push(newPerson);
        return res.status(200).json({
            message : "CREATED",
            person : newPerson
        })
    }

    catch (error)
    {
        return res.status(400).json({
            status : "ERROR OCCURED",
            message : error.message
        })
    }
    

})



//READ
app.get('/person',(req,res) => {
    return res.json(persons);
})

app.get('/person/:id', (req,res,next) => {
    const person = persons.find(
        (data) =>data.id === req.params.id
    );

    if (!person){
        return res.status(404).json({ 
            status : "NOT_FOUND",
            message : `Person with id ${req.params.id} is not found`
        });
    }

    return res.json(person);

})




//UPDATE
app.put('/person/:id',(req,res,next) =>{
    if (req.body.id)  delete req.body.id;

    // find person and update his data
    for (let index = 0; index < persons.length; index++){
        if (persons[index].id === req.params.id){
            persons[index] = {
                ...persons[index],
                ...req.body,
            }
            return res.status(201).json({
                message: "UPDATED_SUCCESSFULLY",
                data : persons[index]
            });
        }
    }

    // person may not be found
    return res.status(404).json({ 
        status : "NOT_FOUND",
        message : `Person with id ${req.params.id} is not found`
    });
})





// DELETE
app.delete('/person/:id', (req,res) => {
    if (persons.length == 0){
        return res.status(404).json({ 
            status : "NOT_FOUND",
            message : `Person with id ${req.params.id} is not found`
        });
    }

    for (let index = 0; index < persons.length; index++){
        if (persons[index].id === req.params.id){
            persons.splice(index,1);
            return res.status(200).json({
                message: "DELETED_SUCCESSFULLY",
            });
        }
    }

    return res.status(404).json({ 
        status : "NOT_FOUND",
        message : `Person with id ${req.params.id} is not found`
    });

});







app.use((req, res) => {
    return res.status(404).json({ error: 'Route not found' });
});


if (require.main === module) {
    app.listen(3000)
}


module.exports = app;

/*

Reviewed by Temesgen Zewude, A2SV G43 Member

Positives:

    Modularization:
        The code is relatively well-organized with separate endpoints for each CRUD operation.

    Error Handling: 
        The code includes error handling for various scenarios, such as missing data or incorrect data types with appropriate error responses. 

    RESTful API:
        The code follows RESTful principles by using appropriate HTTP methods (POST, GET, PUT, DELETE) and URL paths for different operations.

    In-memory Database: 
        The use of an in-memory database (using the persons array) is a simple and effective approach for demonstration purposes.


Improvements:
    Input Validation: 
        While the code checks for missing data and incorrect data types, it could benefit from more robust input validation().  
        Suggestions: Check for valid age ranges or ensuring that the name and hobbies properties are not empty strings.

   
    Id Generation:
     The current approach of id generation by incrementing the last element's id is not foolproof, especially in a multi-user environment. 
     Suggestions: Use library that generates unique ids, like uuid.

    Separation of Concerns: 
        The code currently handles everything in a single file. 
        Suggestions : It would be better to separate concerns into different files/modules, such as routes, controllers, and models.

    Use of Express Router:
        Suggestions: To enhance modularity, Use the express.Router feature to define separate routers for each CRUD operation.
    
    Database Abstraction: 
        Instead of directly working with the persons array, it would be beneficial to abstract the data access layer by using functions that interact with the array. This would make it easier to switch to a different database later if needed.
        Suggestions: Use separate data access layer by using functions that interact with the array

    Functionality:

        Creating a Person: 
            The code generates the id based on the current array's length, which might not work as expected if items are deleted.
            Suggestions: A more robust approach would be to use a separate id generation mechanism.

        Updating a Person: 
            The current implementation allows updating any field, including the id, which could lead to unintended changes. 
            Suggestions: The id should be immutable, don't update the id.
    

    Request Validation: 

        Suggestions: The request validation logic for data types (name, age, hobbies) can be simplified by using a validation library like Joi or creating custom validation functions.
   
    Design:

        Code Reusability: 
            Some parts of the code, like request validation and error handling, are repeated for each CRUD operation.
            Suggestions: Separate these functionalities into separate utility functions for better code reusability.

        Consistent Naming: 
            The naming conventions for variables and properties can be improved to follow a consistent style.
            Suggestions: use camelCase for variable names and PascalCase for class names.

*/