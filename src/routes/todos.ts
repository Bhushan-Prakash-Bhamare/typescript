import {Router} from 'express';

import {Todo} from '../models/todo';

type RequestBody={text:string};
type RequsetParams={todoId:string};

let todos:Todo[]=[];

const router=Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos});
})

router.post('/todo',(req,res,next)=>{
    const body=req.body as RequestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };

    todos.push(newTodo);

    res.status(201).json({message:'Added Todo',todo:newTodo,todos:todos});
})

router.put('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequsetParams;
    const tId=params.todoId;
    const body=req.body as RequestBody;
    const todoIndex=todos.findIndex((todoItem)=>todoItem.id===tId);
    if(todoIndex>=0){
        todos[todoIndex]={id:todos[todoIndex].id,text:body.text};
        return res.status(200).json({message:'Updated Todo',todos:todos});
    }
    res.status(404).json({message:'user not found'});
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const params=req.params as RequsetParams;
    todos=todos.filter((todoItem)=>todoItem.id!=params.todoId);
    res.status(200).json({message:'Deleted todo',todos:todos});
})

export default router;