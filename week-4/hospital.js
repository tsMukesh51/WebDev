const express = require('express');

let users = [
    {
        name: 'harkirart',
        kidneys: [
            {
                healthy: false
            },
            {
                healthy: true
            }
        ]
    },
    {
        name: 'Gowtham',
        kidneys: [
            {
                healthy: true
            },
            {
                healthy: true
            }]
    }
]

app = express();

app.use(express.json());

app.get('/', function(req, res) {
    let num = 0;
    users[0].kidneys.forEach((kidney) => {
        if(kidney.healthy)
            num++;
    })
    res.send(num.toString());
})

app.post('/',function(req, res) {
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    });
    res.send({
        msg: 'Added'
    });
})

app.listen(3000);