import http ,{IncomingMessage,ServerResponse} from 'http'
import type {routes} from '../src/routes/routes.js' //  Replace with route

const PORT =6000;

const requestListener = (request : IncomingMessage, response: ServerResponse) => {

    if(request.url?.startsWith("/data")){
      //Execute the request
        
    }
    else{
        response.writeHead(200, {"content-type" : "application/json"});
        response.end((JSON.stringify({message : "This is an error that will be displayed when the endpontds are not working"})));
    }
    const server =http.createServer(requestListener);
    server.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});



}