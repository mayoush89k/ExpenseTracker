import {model , Schema} from 'mongoose'

const userSchema = Schema({

    name: String,
    username: {
        type: String,
        required: [true , 'Username is required'],
        unique: [true , 'Username must be unique']
    },
    email:{
        type: String,
        lowercase : true,  //transforms the data to lower case letters.
        required: [true,'Email is required'],
        validate: {
            validator: function (value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: "invalid email address",
          }
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
            "please enter strong password",
          ],
    },
    expenses:[{
        type:Schema.Types.ObjectId,
        ref:'Expense',
    }]

})

const User = model('User', userSchema)
export default User