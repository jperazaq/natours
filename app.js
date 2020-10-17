const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(404).json({
//     mensaje: 'Esto es el servidor subido con node y express',
//     App: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('Esta es la prueba');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    Results: tours.length,
    Status: 'Exito',
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  var tourId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: tourId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTour),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.use(express.json());
app.get('/', (req, res) => {
  res.status(404).json({
    mensaje: 'Esto es el servidor subido con node y express',
    App: 'Natours',
  });
});

// app.post('/', (req, res) => {
//   res.send('Esta es la prueba');
// });

const port = 3030;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
