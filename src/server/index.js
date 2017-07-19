import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import fetch from "isomorphic-fetch";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { renderApp } from "./app";
import { schema } from "./schema";
import { rootResolvers } from "./resolvers";

let PORT = 25000;
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
  bodyParser.json(),
  graphqlExpress({
    schema,
    graphiql: true
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
  })
);

const server = createServer(app);

if (process.env.NODE_ENV !== "development") {
  let html = fs.readFileSync(path.resolve(publicDir, "index.html"), "utf8");
  app.get("*", (req, res) => {
    renderApp(html, req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema
      },
      {
        server: server,
        path: "/subscriptions"
      }
    );
  });
} else {
  fetch("http://localhost:24000/index.html", { headers: { pragma: "no-cache", "cache-control": "no-cache" } })
    .then(res => res.text())
    .then(html => {
      app.get("*", (req, res) => {
        renderApp(html, req, res);
      });

      server.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
        new SubscriptionServer(
          {
            execute,
            subscribe,
            schema
          },
          {
            server: server,
            path: "/subscriptions"
          }
        );
      });
    });
}
