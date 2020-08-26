const express = require("express");

const router = express.Router();


router.get("/",(req,res)=>{
    console.log("您好 Express");
    //res.send("您好 Express");

    // 名稱、值、過期時間
    // res.cookie("username","ivesshe888",{maxAge:1000*60*60});

    // 名稱、值、過期時間、配置訪問目錄
    //res.cookie("username","ivesshe888",{maxAge:1000*60*60,path:"/article"});

    // 多個域名共享cookie , bbb.ivesshe.com:3000 , aaa.ivesshe.com:3000
    // res.cookie("username","ivesshe888",{maxAge:1000*60*60,domain:".ivesshe.com"});

    // cookie的加密
    //res.cookie("username","ivesshe888",{maxAge:1000*60*60,signed:true});
    //res.cookie("username","ivesshe888",{maxAge:1000*60*60,signed:true});
    res.cookie("username","ivesshe888",{maxAge:1000*60*60,signed:true});

    //let title = "您好 ejs"
    // res.render("index",{
    //     title: title
    // });
    //res.send("首頁");
    // 獲取session
    if(req.session.username){
        res.send("首頁 -- "+req.session.username+"--"+req.session.age+" - 已登錄");
    }else{
        res.send("首頁 -- 沒有登錄");
    }
})

module.exports = router;
