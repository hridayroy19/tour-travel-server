import multer from "multer"
import path from "path";
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname.replace(fileExt,"")
        .toLowerCase()
        .split(" ")
        .join("-")+"-"+ Date.now()
        
        cb(null,filename+fileExt)
    }
})

export const upload = multer({ storage: storage })