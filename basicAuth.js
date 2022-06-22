function authUser(req,res,next){
    if(req.user == null){
        res.status(403)
        return res.send("need to SIGN IN")
    }
    next()
}

//role-AUTH
function authRole(role){
    return (req,res,next)=>{
     if(req.user.role !== role){
        res.status(401)
        return res.send("permission denied ")

     }
     next()
    }
}

module.exports = {
    authUser,
    authRole
}