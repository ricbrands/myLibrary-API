const http = require("http")
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('A simple API for library');
})

server.listen(port, () => {
    console.log(`Sever listening on http://localhost:${port}`)
})