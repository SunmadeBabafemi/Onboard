const cloudinary = require('../config/cloudinary')
exports.ImageUploader = async (file) =>{
    const {url} = await cloudinary.uploader.upload(file)
    return url
}


exports.FileUploader = async (file) =>{
    const {url} = await cloudinary.uploader.upload(file)
    return url
}