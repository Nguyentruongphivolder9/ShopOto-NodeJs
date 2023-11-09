const multer = require("multer");
const fs = require("fs");

const createStorage = (destination) =>{
    if(!fs.existsSync(destination)){
        fs.mkdirSync(destination,{recursive:true});
    }
    return multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,destination);
        },
        filename: (req,file,cb) =>{
            cb(null,`${Date.now()}-${file.originalname}`);
        },
    });
};

const uploadFile = (destination) =>{
    const storage = createStorage(destination);
    const upload = multer({storage});

    return upload;
}

module.exports = uploadFile;