const fs = require('fs');

const informations = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/testing.json`)
);

// Validator function
//validating the id
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > informations.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};

//Validating the body
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.description || !req.body.owner) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid body format',
    });
  }
  next();
};

//ROUTE HANDLER
exports.getAllInformations = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    data: {
      informations,
    },
  });
};

exports.getInformation = (req, res) => {
  const id = req.params.id * 1;
  const info = informations.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      info,
    },
  });
};

exports.postInformation = (req, res) => {
  const newId = informations.length;
  const newInfo = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  informations.push(newInfo);
  fs.writeFile(
    `${__dirname}/../data/testing.json`,
    JSON.stringify(informations),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          informations: newInfo,
        },
      });
    }
  );
};

exports.patchInformation = (req, res) => {
  //Implement here
  res.status(200).json({
    status: 'success',
    data: {
      name: 'updated',
    },
  });
};

exports.deleteInformation = (req, res) => {
  //Implement here
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
