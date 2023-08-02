const Note = require("../models/note");
//With uuidv4 we ensure that every file name is unique
const {v4: uuidv4} = require("uuid");
//Importing  S3 Constructor
const S3 = require("aws-sdk/clients/s3");
// Initializing the S3 constructor
s3 = new S3();


const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports ={
    create,
    index
};


function create(req,res){
    console.log(req.body, req.file, "< req.body, req.file in routes/api/notes");
    if(!req.file) return res.status(400).json({error: "Need to submit a Photo"});
    const filePath = `noteblog/notes/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};

    s3.upload(params, async function (err,data){
        if(err){
            console.log("==================");
            console.log(err, "err from aws, either your bucket name is wrong or key are not correct");
            console.log("===================");
            res.status(400).json({error: "Error from AWS, Check Terminal for more info"});

        }

        try {
            const note = await Note.create({
                noteTxt: req.body.noteTxt,
                user: req.user, //We get the info from the JWT token
                photoUrl: data.Location, //data.Location is returned by AWS S3 upload
            });

            await note.populate("user");// Needed to pouplate a mongoose document
            res.status(201).json({data: note});
        } catch (err) {
            res.status(400).json({error: err});
        }
    });
}

async function index(req, res){
    try {
        // This populates the user when you find the notes
        const notes = await Note.find({}).populate("user").exec();
        res.status(200).json({notes})
    } catch (err) {
        
    }
}


