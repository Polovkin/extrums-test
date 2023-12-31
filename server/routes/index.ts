import {NextFunction,Request,Response} from "express";

const express = require('express');
const router = express.Router();

router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
