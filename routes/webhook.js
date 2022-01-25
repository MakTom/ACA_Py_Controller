var express = require("express");
var router = express.Router();
const axios = require("axios");

// Replace with IP of your ACA-Py controller server.
restEndpoint = "http://52.188.211.100:8080";

router.get("/connections", function (req, res, next) {

  restURL = restEndpoint + "/connections";
  axios.get(restURL)
    .then((resp) => {
      //console.log(resp.data);
      res.send(resp.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post("/connections", function (req, res, next) {
  console.log(req.body);
  state = req.body?.rfc23_state;
  switch (state) {
    case "invitation-sent":
      console.log("*** Invitation created by ACA-Py");
      console.log("Connection ID=", req.body?.connection_id);
      break;
    case "request-received":
      console.log("*** Invitation Request from invitee");
      console.log("Connection ID=", req.body?.connection_id);
      console.log("Send Accept-Requst to invitee");

      // Replace with IP of your ACA-Py controller server.
      //restEndpoint = "http://52.188.211.100:8080";
      restURL = restEndpoint + "/connections/" + req.body?.connection_id + "/accept-request?my_endpoint=" + encodeURI(restEndpoint);
      restData = {};
      restHeaders = {
        headers: {},
      };
      axios.post(restURL, restData, restHeaders)
        .then((res) => {
          console.log("statusCode: ${res.status}");
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    case "response-sent":
      console.log("*** Invitation Response sent to invitee");
      console.log("Connection ID=", req.body?.connection_id);
      break;
    case "completed":
      console.log("*** Connection is complete!");
      console.log("Connection ID=", req.body?.connection_id);
      break;
    case "undefined":
      console.log("Unkown connection state");
      console.log("Connection ID=", req.body?.connection_id);
  }
  res.status(200).send("OK");
});

module.exports = router;
