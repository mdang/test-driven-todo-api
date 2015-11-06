// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to ejs
// app.set('view engine', 'ejs');


// pre-seeded todo data; our "database" is an array for now
var todos = [
  {id: 1, task: 'Laundry', description: 'Clean clothes'},
  {id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week'},
  {id: 3, task: 'Homework', description: 'Make this app super awesome!'}
];


// API ROUTES

// get all todos
app.get('/todos', function (req, res) {
  // send all todos as JSON response
  res.json({ todos: todos });
});

// create new todo
app.post('/todos', function (req, res) {
  // create new todo with form data (`req.body`)
  var newTodo = req.body;
  
  // set sequential id (last id in `todos` array + 1)
  if (todos.length > 0) {
    newTodo.id = todos[todos.length - 1].id + 1;
  } else {
    newTodo.id = 1;
  }

  // add newTodo to `todos` array
  todos.push(newTodo);

  // send newTodo as JSON response
  res.json(newTodo);
});

// get one todo
app.get('/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);

  // find todo to by its id
  var foundTodo = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];

  // send foundTodo as JSON response
  res.json(foundTodo);
});

// update todo
app.put('/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);

  // find todo to update by its id
  var todoToUpdate = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];

  // update the todo's task
  todoToUpdate.task = req.body.task;

  // update the todo's description
  todoToUpdate.description = req.body.description;

  // send back updated todo
  res.json(todoToUpdate);
});

// delete todo
app.delete('/todos/:id', function (req, res) {
  // get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);

  // find todo to delete by its id
  var todoToDelete = todos.filter(function (todo) {
    return todo.id == todoId;
  })[0];
  
  // remove todo from `todos` array
  todos.splice(todos.indexOf(todoToDelete), 1);
  
  // send back deleted todo
  res.json(todoToDelete);
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});