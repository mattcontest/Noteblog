const User = require('../models/user');
const Note = require('../models/note')
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
//Importing  S3 Constructor
const S3 = require("aws-sdk/clients/s3");
// Initializing the S3 constructor
s3 = new S3();

const SECRET = process.env.SECRET;

const BUCKET_NAME = process.env.BUCKET_NAME;


module.exports = {
  signup,
  login,
  profile
};

async function signup(req, res) {


  console.log(req.body, req.file, ' req.body', 'req.file');

  // check if there is a file, if there isn't send back an error
  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"});

  // this is the location of where our file will stored 
  // on aws s3
  const filePath = `noteblog/${uuidv4()}-${req.file.originalname}`
  // create the object we want to send to aws 
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}

  s3.upload(params, async function(err, data){
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      res.status(400).json({error: 'error from aws, check your terminal'})
    }

    // if s3 upload was successful create the user and store the file location
    req.body.photoUrl = data.Location; // data.Location is what we get back from aws of where Our file is stored
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
      // this response gets process by the client 
      // utils/userService signup function, inside of the .thens
    } catch (err) {
      console.log(err)
      // Probably a duplicate email
      console.log(err)
      res.status(400).json(err);
    }

  })


  // const user = new User(req.body);
  // try {
  //   await user.save();
  //   const token = createJWT(user);
  //   res.json({ token });
  // } catch (err) {
  //   // Probably a duplicate email
  //   res.status(400).json(err);
  // }

}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}



async function profile(req,res){
  try {
    const user = await User.findOne({username: req.params.username})
    if(!user) return res.status(404).json({error: "User not found"});

    const notes = await Note.find({user: user._id}).populate("user").exec();
    console.log(notes, "These are the notes retrieved")
    res.status(200).json({notes: notes, user: user})
  } catch (err) {
    console.log(err);
    res.status(400).json({err})
    
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
