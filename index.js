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