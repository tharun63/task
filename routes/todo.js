const express = require('express');
const { addListener } = require('../model/todo');
const router = express.Router();
const createError = require('http-errors');
const Todo = require('../model/todo')
// get list of all todos
router.get('/',async(req,res)=>{
    try{
        const todo = await Todo.find()
        res.json(todo)
    }catch(err){
        res.send('Error'+ err)
    }
    //res.send('get request')
});
// get todo list by id
router.get('/:id',async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
    
        if(!todo){
            throw createError(404,"todo Does not exist");

        }
        res.json(todo)
    }catch(err){
        //res.send('Error'+ err)
        console.log(error.message);
        next(error)
    }
    res.send('get request')
});
//create a todo list
router.post('/', async(req,res)=>{
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status

    })
     try{
         const list = await todo.save()
         res.json(list)

     }catch(err){
        res.send('Error')
     }
});

// updating a todo list
router.patch('/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true};

        const todo = await Todo.findByIdAndUpdate(id,updates,options);
        todo.status= req.body.status
        //const list = await todo.save()
        res.json(todo)
    }catch(err){
        res.send('Error'+ err)
    }
    res.send('get request')
});

//deleting a todo list by id

router.delete('/:id',async(req,res,next)=>{
    const id = req.params.id;
    try{
        const todo = await Todo.findByIdAndDelete(id);
        res.send(todo)
    }catch(err){
        res.send('Error'+ err)
    }
});


module.exports = router