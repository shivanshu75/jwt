const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
    },
},{timestamps:true})

const User=new mongoose.model("User",userSchema)


const userController=async(req,res)=>{
    try {
        const {name,password,email,phone}=req.body;
        const users=await User.create({
            name,
            password,
            email,
            phone
        })
        res.status(201).json({
            msg:'User Created',
            data:users
        })
    } catch (error) {
        console.log("Server Error",error)
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email are required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Compare provided password with stored hashed password
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ msg: 'Invalid credentials' });
        // }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Use a secret key from your environment variables
            { expiresIn: '1h' } // Token expiry time
        );

        // Respond with the token and user info (excluding the password)
        res.status(200).json({
            msg: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message,
        });
    }
}

module.exports={userController,loginController}