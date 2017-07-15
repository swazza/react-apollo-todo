import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import fetch from "isomorphic-fetch";
import { renderApp } from "./app";
import { schema } from "./schema";
import { rootResolvers } from "./resolvers";

let publicDir = `${process.cwd()}/dist/client`;
let app = express();
app.use("/public", express.static(publicDir));
app.use(
  cors({
    origin: "*",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    methods: "GET,POST"
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: rootResolvers,
    graphiql: true
  })
);

if (process.env.NODE_ENV !== "development") {
  let html = fs.readFileSync(path.resolve(publicDir, "index.html"), "utf8");
  app.get("*", (req, res) => {
    renderApp(html, req, res);
  });

  app.listen(25000, () => {
    console.log("App Started on Port 25000");
  });
} else {
  fetch("http://localhost:24000/index.html", { headers: { pragma: "no-cache", "cache-control": "no-cache" } })
    .then(res => res.text())
    .then(html => {
      app.get("*", (req, res) => {
        renderApp(html, req, res);
      });

      app.listen(25000, () => {
        console.log("App Started on Port 25000");
      });
    });
}