// 引入
const express = require('express');
const app = express();

// 配置模板引擎(html)
const ejs = require("ejs")
app.engine("html",ejs.__express);
app.set("view engine", "html");

// 配置模板引擎(ejs)
//app.set("view engine", "ejs"); 

// 應用級中間級(用戶權限判斷)
app.use((req,res,next)=>{
    console.log(new Date()+" 中間件...");
    next();
})

// 配置靜態web目錄
// 內置中間件
app.use(express.static("static"));

// 配置路由
app.get("/",(req,res)=>{
    console.log("您好 Express");
    //res.send("您好 Express");
    let title = "您好 ejs"
    res.render("index",{
        title: title
    });
})

app.get("/login",(req,res)=>{
    console.log("新聞頁面");
    res.render("login",{})    
})

app.post("/doLogin",(req,res)=>{
    res.send("執行提交");
})

app.get("/article",(req,res)=>{
    console.log("新聞頁面");
    res.send("新聞頁面");
})

app.get("/login",(req,res)=>{
    console.log("登錄");
    res.send("登錄");
})

app.get("/register",(req,res)=>{
    console.log("注冊頁面");
    res.send("注冊頁面");
})

app.post("/doLogin",(req,res)=>{
    console.log("執行登錄")
    res.send("執行登錄");
})

app.put("/editUser",(req,res)=>{    // put：主要用於修改數據
    console.log("修改用戶");
    res.send("修改用戶");
})

app.delete("/deleteUser",(req,res)=>{    // put：主要用於刪除數據
    console.log("執行刪除");
    res.send("執行刪除");
})

// 路由里面配置多級目錄
app.get("/admin/user/add",(req,res)=>{
    res.send("admin user add");
})

app.get("/admin/user/edit",(req,res)=>{
    res.send("admin user edit");
})

// 配置路由的時候，要注意順序
app.get("/article/add",(req,res)=>{
    res.send("article add");
})

// 動態路由
app.get("/article/:id",(req,res)=>{
    var id = req.params["id"];
    console.log("/article/:id  ",id);
    res.send("article 動態路由 ,id = "+id);
})

// get傳值 http://localhost:3000/product?id=ivesshe&cid=123456
app.get("/product",(req,res)=>{
    let query = req.query;
    console.log(query)
    res.send("product: "+ query.id);
})

app.get("/news",(req,res)=>{
    var userinfo={
        username:"艾米斯",
        age:22
    }

    let article="<h3>我是一個h3</h3>";

    let list=["1111","2222","3333"];

    let newList=[
        {
            title: "新聞1111",
        },
        {
            title: "新聞22222",
        },
        {
            title: "新聞33333",
        },
        {
            title: "新聞4444",
        },
    ]

    res.render("news",{
       userinfo:userinfo,
       article:article,
       flag:true,
       score:50,
       list:list,
       newList:newList
    })
})

// 路由級中間件(用的比較少)
app.get("/news/add",(req,res,next)=>{
    console.log("執行增加新聞 中間件...");
    next();
})

app.get("/news/:id",(req,res)=>{
    res.send("新聞動態路由");
})

// 錯誤處理中間級
app.use((req,res,next)=>{
    res.status(404).send("404 Not Found");
    console.log("錯誤處理 中間件...")
})


// 監聽端口
app.listen(3000,()=>{
    console.log("監聽端口3000中...")
});