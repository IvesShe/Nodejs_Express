// 引入
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// 另外有connect-redis、connect-mysql

// 引入外部模塊
//const login = require("./routes/login")
//const user = require("./routes/admin/user")
const admin = require("./routes/admin")
const index = require("./routes/index")
const api = require("./routes/api")




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

// 配置第三方中間件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 配置cookieParser中間件，中間是密碼
app.use(cookieParser("ivesshe104"));

// 配置session的中間件
app.use(session({
    secret:"secret ivesshe",    // 服務器端生成session的簽名
    name:"ivesshe888",          // 修改session對應cookie的名稱
    resave:false,               // 強制保存session即使它並沒有變化
    saveUninitialized:true,     // 強制將未初始化的session存儲
    cookie:{
        maxAge:1000*60*30,
        secure:false             // true表示只有https協議才能訪問cookie
    },
    rolling:true,                // 在每次請求時強行設置cookie，這將重置cookie過渡時間(默認:false)

    // 使用 connect-mongo
    // store: new MongoStore({
    //     //url: 'mongodb://user12345:foobar@localhost/test-app?authSource=admins&w=1',
    //     url: 'mongodb://127.0.0.1:27017/shop',
    //     //不管發出多少請求，在24小時內只更新一次session, 除非改變了這個session
    //     touchAfter: 24*3600 
    //     //mongoOptions: advancedOptions // See below for details
    // })
}))

// app.use(session({
//     secret:"keyboard cat",
//     resave:false,
//     saveUninitialized:true,
//     cookie:{secure:true}
// }))


// 配置靜態web目錄
// 內置中間件
app.use(express.static("static"));

// 掛載login模塊
//app.use("/login",login);

// 掛載user模塊
//app.use("/user",user);

// 配置外部路由模塊
app.use("/admin",admin);
app.use("/api",api);
app.use("/",index);

// 配置路由


app.get("/article",(req,res)=>{    
    let username = req.cookies.username;
    console.log("新聞頁面--"+username);
    res.send("新聞頁面--"+username);
})

app.get("/product",(req,res)=>{    
    // 獲取加密的cookie
    let username = req.signedCookies.username;
    console.log("product--"+username);
    res.send("product--"+username);
})

// app.get("/login",(req,res)=>{
//     console.log("登錄");
//     res.send("登錄");
// })



app.get("/register",(req,res)=>{
    console.log("注冊頁面");
    res.send("注冊頁面");
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