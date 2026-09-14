import http ,{IncomingMessage,ServerResponse} from 'http'
import type {routes} from '../src/routes/routes.js' //  Replace with route
import { REPL_MODE_STRICT } from 'repl';

const PORT =6000;
   
const server = http.createServer((request, response) => {

    response.writeHead(200, {"content-type": " application/json"});
    response.end(JSON.stringify({message: "The server is running"}));
});

server.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});



