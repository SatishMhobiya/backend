import User from "../models/user.js";

export const getAllUsers = async(req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        users: users
    })
}

export const loginUserFunction = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    
    console.log("request body login",req.params,req.query, req.body, user, password)
    if(!user){
        return res.json({
            success: false,
            message: "user does not exist"
        })
    }

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({
            success: false,
            message: "incorrect password"
        })
    }
    const token = jwt.sign({_id: user._id}, "112233")
    res.cookie("token", token, {
        httpOnly: true,
    })

    console.log("request body", req.body)
    res.json({
        success: true,
        token: token,
        message: "user logged in successfully",
    })
}

export const registerUserFunction = async(req, res)=>{
    console.log("request body", req.body)
    const {name, email, password} = req.body;
    const user = await User.findOne({email: email})
    if(user){
        return res.json({
            success: false,
            message: "user already exists"
        })
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name, email, password: hasedPassword
    })
    res.json({
        success: true,
        user: newUser
    });
    console.log("newUser", newUser)
}

export const deleteUserFunction = async(req, res) => {
    const {id} = req.body;
    const user = await User.findByIdAndDelete(id);
    res.json({
        success: true,
        user: user,
        message: "user deleted successfully"
    })
}