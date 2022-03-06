const asyncHandler= require('express-async-handler')
const Goal= require ('../model/goalModel')
const User= require('../model/userModel')

const getGoals= asyncHandler(async (req, res)=>{
    const goals= await Goal.find({user:req.user.id})
    res.status(200).send(goals)
})

const createGoal= asyncHandler( async (req, res)=>{
    if(!req.body.text){
      res.status(400)
      throw new Error('please add text')
    }
        const goal= await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(200).send(goal)
     
    
    
})

const updateGoal= asyncHandler( async (req, res)=>{
    const goal= await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user=await User.findById(req.user.id)
    if(!user){
       res.status(401)
       throw new Error('user not found') 
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    const updateGoal= await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    res.status(200).send(updateGoal)
})

const deleteGoal= asyncHandler( async (req, res)=>{
    const goal= await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    
    }
    const user=await User.findById(req.user.id)
    if(!user){
       res.status(401)
       throw new Error('user not found') 
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !==user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
   await goal.remove()
    res.status(200).send({id: req.params.id})
})

module.exports={
    getGoals, createGoal, updateGoal,deleteGoal
}