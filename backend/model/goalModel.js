const mongoose= require('mongoose')
const goalSchema= mongoose.Schema(
    {
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    ref: 'User'
    },
    
    text:{
        type: String,
        requires: [true, 'Please add a text value']

    }
},
{
    timestamps:true
}
)
const Goal=mongoose.model('goalschema', goalSchema)
module.exports=Goal