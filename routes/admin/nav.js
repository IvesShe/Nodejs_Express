const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{    
    res.send("導航列表"); 
})

router.get("/add",(req,res)=>{
    res.send("增加導航"); 
})

router.get("/edit",(req,res)=>{
    res.send("修改導航"); 
})

module.exports = router;
