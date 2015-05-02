/**
 * Created by pery on 18/04/2015.
 */

require("http").createServer(function(request, response){
    response.writeHeader(200, {"Content-Type": "text/plain"});
    response.write("Hello World!");
    response.end();
}).listen(80);
