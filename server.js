import express from "express";
import { createServer } from "http";
import path from "path";
import bodyParser from "body-parser";
import axios from "axios";

const HOST = "localhost";
const PORT = 3001;

const app = express();
const server = createServer(app);
const jsonParser = bodyParser.json();

const client = path.join(__dirname, "./build", "index.html");

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

app.use(express.static(path.join(__dirname, "./build")));

app.get(`*`, (req, res) => {
  res.sendFile(client);
});

app.post("/api/code", jsonParser, (req, res) => {
  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: "08807a0b282ee2d2b960",
      client_secret: "dffeeed95ba5b47a7ffe3e0edcccbe43db9acfa0",
      code: req.body.code
    })
    .then(({ data }) => {
      const params = String(data)
        .split("&")
        .map(item => {
          const values = String(item).split("=");
          return {
            key: values[0],
            value: values[1]
          };
        });
      res.send({
        token: params
          .filter(item => item.key === "access_token")
          .map(item => item.value)[0]
      });
    })
    .catch(err => {
      res.send({ err: err.message });
    });
});
