const { deepStrictEqual } = require('assert');
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
app.use(express.json());


app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours',(req,res)=>{
res.status(200).json({
    results : tours.length,
    status: "todos tush",
    data: {
        tours
    }
});
});


app.get('/api/v1/tours/:id',(req,res)=>{

    console.log(req.params);

    const id = req.params.id *1;

    if(id>tours.length){
        return res.status(404).json({
            status :"fallo",
            message: "No existe lo que buscas"
        })
    }
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        // results : tours.length,
        status: "todos tush",
         data: {
            tour
         }
    });
    });

app.post('/api/v1/tours', (req,res)=>{
    // console.log(req.body);

    const newID = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id : newID}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error=>{
        res.status(201).json({
            status:"Grande muy bien en los detalles",
            data:{
                tour: newTour
            }
        })
    })
    
})

const port = 3030;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
