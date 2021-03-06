'use strict';

var Event = require('./event.model');

// get event name
exports.create = function(req, res){
  var eventName = req.body.name;
  console.log(req.body);
  if (!eventName){
    return handleError(res, "No event Specified");
  }
  var aEvent = new Event(req.body);
  aEvent.save(function(err, event){
    if (err) return validationError(res, err);
    res.send(204);
  });

};

// get event name
exports.edit = function(req, res){
  var name = req.body.name;
  if(!name) return handleError(res,err);
  Event.findOne({'name': name}, function(err, Event){
    if (err) return res.send(500, err);
      Event.cost = req.body.cost;
      Event.fun = req.body.fun;
      Event.save(function(err){
      if (err) return res.send(500, err);
        res.json(200, {success: true});
      })
    });
  };

exports.getName = function(req, res){
  if(!req.params.name){
    console.log("in getName with no value");
    return res.json("No Name Input"); }
  else{
    Event.findOne({'name':req.params.username}, function(err, Event){
      if (err) return res.send(500, err);
      return res.json(Event.name);
    })
  };
};


function handleError(res, err) {
  return res.send(500, err);
};

function validationError(res, err) {
  return res.json(422, err);
};
