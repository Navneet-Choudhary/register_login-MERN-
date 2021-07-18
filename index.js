const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb+srv://admin1-navneet:iiU74acn3WLkz5Gc@cluster0.0ieuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority || mongodb://localhost:27017/customerDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    
}, () => {
    console.log("DB connected");
})

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    password: String
})

const User = new mongoose.model('User', userSchema)


app.post('/login', (req, res) => {
    const {email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user) {
            if(password === user.password ) {
                res.send({message: 'login successful', user: user})
            } else {
                res.send({message: 'wrong password'})
            }
        } else {
            res.send({message: 'User not registered'})
        }
    })
})

app.post('/register', (req, res) => {
    const {firstName, lastName, email, dateOfBirth, password} = req.body

    User.findOne({email: email}, (err, user) => {
        if(user) {
            res.send({message: 'User is already existed!'})
        } else {
            
            const user = new User({
                firstName,
                lastName,
                email,
                dateOfBirth,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: 'Successfully Registered'})
                }
            })
        }
    })

    
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('customer/build'))
}


app.listen(process.env.PORT || 3001, () => {
    console.log('Server started on port 3001');
})


