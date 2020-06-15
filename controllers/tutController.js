const fs = require('fs');

const tuts = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/simple-tuts.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tut id is: ${val}`);

  if (req.params.id * 1 > tuts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTuts = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tuts.length,
    data: {
      tuts,
    },
  });
};

exports.getTut = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const tut = tuts.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tut,
    },
  });
};

exports.createTut = (req, res) => {
  // console.log(req.body);

  const newId = tuts[tuts.length - 1].id + 1;
  const newTut = Object.assign({ id: newId }, req.body);

  tuts.push(newTut);

  fs.writeFile(
    `${__dirname}/dev-data/data/simple-tuts.json`,
    JSON.stringify(tuts),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tut: newTut,
        },
      });
    }
  );
};

exports.updateTut = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tut: '<Updated tut here...>',
    },
  });
};

exports.deleteTut = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
