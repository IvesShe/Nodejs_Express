const express = require("express");

const router = express.Router();

// 引入模塊
const user = require("./admin/user");
const login = require("./admin/login");
const nav = require("./admin/nav");

router.get("/",(req,res)=>{
    res.send("後台管理中心"); 
})

// 掛載路由
router.use("/user",user);
router.use("/login",login);
router.use("/nav",nav);

module.exports = router;