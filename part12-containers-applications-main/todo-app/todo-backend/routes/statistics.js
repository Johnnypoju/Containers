const express = require('express');
const router = express.Router();
const { Todo } = require('../mongo');
const redis = require('../redis');

router.get('/', async (_, res) => {
    const todoCount = await redis.getAsync("todoCount")
    console.log(todoCount)
    if (todoCount == null) {
        const tempCount = await Todo.find({}).countDocuments()
        const response = {
            added_todos: tempCount
        }
        await redis.setAsync("todoCount", tempCount)
        res.send(response)
    }
    const response = {
        added_todos: todoCount
    }
    res.send(response)
})

module.exports = router;