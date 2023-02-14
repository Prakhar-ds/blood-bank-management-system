import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';

//register callback
export const registerController = async (req, res) => {
     
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    if(error)
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
//login handler
export const loginController=async(req,res)=>{
try {
  const user=await userModel.findOne({email:req.body.email})
  if(!user){
    return res.status(200).send({message:'user not found',success:false})
  }
  const isMatch=await bcrypt.compare(req.body.password,user.password)
  if(!isMatch){
    return res.status(200).send({message:'invalid email or passowrd '})
  }
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
  res.status(200).send({message:"login success",success:true,token})
} catch (error) {
  console.log(error)
  res.status(500).send({message:`error in logincontroller${error.message}`})
}
};

