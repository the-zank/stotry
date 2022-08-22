const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express();
app.use(express.static("public"))
 app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/sign-up.html")
   
})
app.post("/",function(req,res){
    const firstName = req.body.fName;
    const email = req.body.email;
    console.log(firstName,email);
    const data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us9.api.mailchimp.com/3.0/lists/dd06cb8865";
    const options = {
        method: "POST",
        auth:"pratikbilgi1999@gmail.com:33a79d586c7191a8e7d228cef9c801c1-us9"
    }
   const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/fail.html")
        }

    })
    request.write(jsonData)
    request.end()
})


app.listen(process.env.PORT || 3000,function(){
    console.log("App is running on port 3000");
})

//api_key 33a79d586c7191a8e7d228cef9c801c1-us9
//unique id dd06cb8865