# Debug_ACA-Py_Controller
Simple controller for debugging ACA-Py connections

You will need to set your own IP address for your server that you are running the ACA-Py on in the webhook.js route code.  Otherwise, it does not know where to make the REST Call to your ACA-Py that you are controlling.

Register the IP address for this app in your ACA-Py using the --webhook-url command

-- change restEndpoint(Aca-py server) in webhook.js
restEndpoint = 'http://20.120.87.99:8080';


--webhook-url http://34.224.165.20:3000
