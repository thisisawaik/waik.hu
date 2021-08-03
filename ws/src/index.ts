import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import * as admin from "firebase-admin";
import * as cors from "cors";

import discordLogin from "./functions/discordLogin";
import discordAccountLink from "./functions/discordAccountLink";

admin.initializeApp();

const app = express();

app.use(cors({
  origin: '*'
}))

const PORT =  process.env.PORT || 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

instrument(io, {
  auth: false,
});

// const db = admin.firestore();

io.on("connection", (socket: Socket) => {
  console.log(socket.id);

  socket.on("ping", (data) => {
    socket.emit("pong", "PONG");
  });
  socket.on("getMessage", async (data) => {
    console.log(data);
    socket.emit("test_resp", socket.id, "gfjaklé");
  });
  socket.on("test", (id, msg) => {
    console.log(id, msg);
  });

  socket.on("discordLogin", async (data) => {
    try {
      const resp = await discordLogin(data);
      console.log(resp)
      socket.emit("discordLoginSuccess", resp);
    } catch (error) {
      socket.emit("discordLoginError", error);
    }
  });

  socket.on("discordAccountLink", async (data) => {
    try {
      const resp = await discordAccountLink(data);
      socket.emit("discordAccountLinkSuccess", resp);
    } catch (error) {
      socket.emit("discordAccountLinkError", error);
    }
  });

  socket.on("userStateUpdate", async (data) => {
    if (data) {
      admin
        .auth()
        .verifyIdToken(data)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          console.log(uid);
          // ...
          socket.emit("userSyncComplete", uid);
          /*
          qdb.set(`socket.${socket.id}.uid`, uid);
          if (!qdb.get(`user.${uid}.sockets`))
            qdb.set(`user.${uid}.sockets`, []);
          if (
            !qdb.get(`user.${uid}.sockets`).find((e: string) => e === socket.id)
          )
            qdb.push(`user.${uid}.sockets`, socket.id);
          console.log(qdb.get(`user.${uid}.sockets`));
          */
        });
    }
  });

  socket.on("userData", async (data) => {
    console.log("--------------------------------------------------------");
    console.log(data.token);
    console.log("--------------------------------------------------------");

    admin
      .auth()
      .verifyIdToken(data.token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
        // ...
      });
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on: ${PORT}`);
});

/*
process.stdin.resume()

function exitHandler(options: any, exitCode: number) {
  if (options.cleanup) console.log('clean');
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();

  process.on('SIGINT', exitHandler.bind(null, {exit:true}));
}

process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
*/