const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{
    //console.log("新聞頁面");
    res.render("login",{})    
    req.session.username = "IvesShe1688";
    req.session.age = 20;
    //res.send("執行登錄 -- "+req.session.username)  
})

router.get("/loginOut",(req,res)=>{
    // 設置session的過度時間為0(這裡會把所有的session都銷毀)
    //req.session.cookie.maxAge = 0;

    // 銷毀指定session
    //req.session.username="";

    // 銷毀session detroy
    req.session.destroy()

    res.send("退出登錄");
})

router.post("/doLogin",(req,res)=>{
    let body = req.body;
    console.log(body)
    res.send("執行提交"+body.username);
})

// app.post("/doLogin",(req,res)=>{
//     console.log("執行登錄")
//     res.send("執行登錄");
// })

module.exports = router;
