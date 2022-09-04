-import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic
const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    try {
        return await todosAccess.getAllTodos(userId)
    }catch(error){
        createError('Error getting user todos ', error)
        return error
    }
}
export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    createLogger(`Creating a todo`)
    return await todosAccess.createTodo({
        userId:userId,
        todoId:uuid.v4(),
        name: createTodoRequest.name,
        createdAt: new Date().toISOString(),
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: ''
    })
}

export async function updateTodo(todoId: string, userId: string, updateTodoRequest: UpdateTodoRequest): Promise<void> {
    createLogger(`Updating todo`)

    return await todosAccess.updateTodo(todoId, userId, updateTodoRequest)
}

export async function updateTodoAttachmentUrl(todoId: string, userId: string): Promise<void> {
    createLogger(`Updating todo`)
    return await todosAccess.updateTodoAttachmentUrl(todoId, userId)
}



export async function createAttachmentPresignedUrl(todoId: string): Promise<String> {
   
    return await attachmentUtils.createAttachmentPresignedUrl(todoId)
}

export async function deleteTodo(todoId: string, userId: string): Promise<void> {
    return await todosAccess.deleteTodo(todoId, userId)
}

