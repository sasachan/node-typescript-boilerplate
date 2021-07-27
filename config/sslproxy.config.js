import * as httpProxy from 'http-proxy';
import * as fs from 'fs';
import * as path from 'path';

//
// Create the HTTPS proxy server in front of a HTTP server
//
const secureProxy = httpProxy.createProxyServer({
    target: { host: 'xyz.com', port: 3146 },
    ssl: {
        key: fs.readFileSync(path.join(__dirname,'ssl.key'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname,'ssl.crt'), 'utf8')
    }
}).listen(443);


//
// Create the HTTP proxy server in front of a HTTP server
//
const proxy = httpProxy.createProxyServer({
    target: { host: 'xyz.com', port: 3146 }
}).listen(80);

// Listen for the `error` event on `proxy`.
proxy.on('error', (err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

// Listen for the `error` event on `proxy`.
secureProxy.on('error', (err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});
