const express = require('express');

const app = express();
app.use(express.json());

const db = {
    "user1": {"kidneys": ["healthy", "healthy"]},
    "user2": {"kidneys": ["healthy", "damaged"]},
    "user3": {"kidneys": ["healthy", "healthy", "healthy"]},
    "user4": {"kidneys": ["damaged", "damaged"]},
    "user5": {"kidneys": ["healthy"]},
    "user6": {"kidneys": ["healthy", "healthy", "damaged"]},
    "user7": {"kidneys": ["healthy", "healthy"]},
    "user8": {"kidneys": ["damaged", "healthy", "healthy"]},
    "user9": {"kidneys": ["damaged"]},
    "user10": {"kidneys": ["healthy", "healthy", "healthy", "healthy"]}
}

app.get("/hospital.com", (req, res)=>{
    let userId = `user${req.query.userId}`;
        let kidneys = db[userId].kidneys.length;
        let noOfHealthyKidneys = db[userId].kidneys.filter(kidney => kidney === "healthy").length;
        let UnhealthyKidneys = kidneys - noOfHealthyKidneys;
        res.json({
            "Total Kidneys" : kidneys,
            "Healthy Kidneys" : noOfHealthyKidneys,
            "Unhealthy Kidneys": UnhealthyKidneys 
        });
})

app.post("/hospital.com",(req, res)=>{
    let add = req.query.add;
    let userId = `user${req.query.userId}`;
    db[userId].kidneys.push("healthy");
    let kidneys = db[userId].kidneys.length;
    let noOfHealthyKidneys = db[userId].kidneys.filter(kidney => kidney === "healthy").length;
    let UnhealthyKidneys = kidneys - noOfHealthyKidneys;
    res.json({
        "Kidneys added": `Add ${add} healthy kidney`,
        "Total Kidneys" : kidneys,
        "Healthy Kidneys" : noOfHealthyKidneys,
        "Unhealthy Kidneys": UnhealthyKidneys 
    });
})

app.put("/hospital.com",(req, res)=>{
    let userId = `user${req.query.userId}`;
    let kidneys = db[userId].kidneys.length;
    let noOfHealthyKidneys = db[userId].kidneys.filter(kidney => kidney === "healthy").length;
    let UnhealthyKidneys = kidneys - noOfHealthyKidneys;
    if(UnhealthyKidneys > 0){
        db[userId].kidneys.pop("damaged");
        db[userId].kidneys.push("healthy");

        kidneys = db[userId].kidneys.length;
        noOfHealthyKidneys = db[userId].kidneys.filter(kidney => kidney === "healthy").length;
        UnhealthyKidneys = kidneys - noOfHealthyKidneys;
        res.json({
            "Kidneys replace" : 1,
            "Total Kidneys": kidneys,
            "Healthy Kidneys": noOfHealthyKidneys,
            "Remaining damaged kidneys" : UnhealthyKidneys
        })
    }else{
        res.json({
            "msg": "No damaged kidneys to replace"
        })
    }
})

app.delete("/hospital.com",(req, res)=>{
    let userId = `user${req.query.userId}`;
    let kidneysbefore = db[userId].kidneys.length;
    const damagedKidney = db[userId].kidneys.indexOf("damaged");
    if(damagedKidney !== -1){
        db[userId].kidneys.splice(damagedKidney, 1);
        let kidneysafter = db[userId].kidneys.length;
    res.json({
        "Total Kidneys before removal": kidneysbefore,
        "msg":"Damaged kidney removed",
        "totoal kidneys after removal": kidneysafter
    });
    }else{
        res.json({
            "msg": "No damaged kidneys to remove"
        })
    }
    
})

app.listen(3000, ()=>{
    console.log("Hospital is listening on port: 3000...")
})

