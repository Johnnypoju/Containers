const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const getCounter = await redis.getAsync("todoCount")
  const addTodoCounter = await redis.setAsync("todoCount", Number(getCounter)+1)
  console.log(addTodoCounter)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});


singleRouter.get('/', async (req, res) => {
  res.send(req.todo); 
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body)
  const todoAdded = await Todo.updateOne(req.todo, req.body)
  
  
  res.sendStatus(200); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
