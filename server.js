const http = require('http');
const colors = require('colors');
const fs = require('fs');
const path = require('path');


const dados = [
    { id: 1, nomedados: "Sushi de Salmão (4 unid)", valor: 25.00 },
    { id: 2, nomedados: "Temaki Completo", valor: 32.90 },
    { id: 3, nomedados: "Uramaki Philadelphia (8 unid)", valor: 28.50 }
];

const server = http.createServer((req, res) => {

    console.log(`Requisitação recebida: ${req.url}`.green);


    if (req.url === '/') {
        const filePath = path.join(__dirname, 'public', 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro no servidor');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
    

    else if (req.url === '/api/dados') {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(dados));
    }


    else if (req.url.endsWith('.css')) {
        const cssPath = path.join(__dirname, 'public', req.url);

        fs.readFile(cssPath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('CSS não encontrado');
            } else {

                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(content);
            }
        });
    }


    else {
        const filePath = path.join(__dirname, 'public', '404.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('Página não encontrada.');
            } else {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`.green.bold);
});