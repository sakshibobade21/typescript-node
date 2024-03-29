import { Router } from 'express'
import { Todo } from '../models/todo'

type RequestBody = { text: string }
type RequestParams = { todoId: string }

const router = Router()

let todos: Todo[] = []

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos })
})

router.post('/todo', (req, res, next) => {
    // const body = req.body as { text: string }
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo)
    return res.status(201).json({
        message: 'Todo Added',
        todo: newTodo,
        todos: todos
    })
})

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody
    const params = req.params as RequestParams
    const tid = params.todoId
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: tid,
            text: body.text
        }
        return res.status(200).json({
            message: 'Todo Updated',
            todos: todos
        })
    }
    res.status(404).json({ message: 'Could not find todo for this id' })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const tid = params.todoId

    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid)
    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== tid)
        return res.status(200).json({ message: 'Deleted todo' })
    }
    res.status(404).json({ message: 'Id not found' })
})




// module.exports = router
export default router

