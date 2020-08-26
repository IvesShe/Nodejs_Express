const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{
    //let username = req.cookies.username;
    let username = req.signedCookies.username;
    console.log("用戶--"+username);
    res.send("用戶--"+username); 
})

router.get("/add",(req,res)=>{
    res.send("增加用戶"); 
})

router.get("/edit",(req,res)=>{
    res.send("修改用戶"); 
})

router.post("/doAdd",(req,res)=>{
    res.send("doAdd"); 
})

router.post("/doEdit",(req,res)=>{
    res.send("doEdit"); 
})


module.exports = router;
