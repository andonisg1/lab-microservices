const errorHandler = (err, req, res, next) =>{
    let msg=err;
    if(err.message)
        msg = err.message
    res.status(500).json({data: msg});
};
module.exports=errorHandler;
