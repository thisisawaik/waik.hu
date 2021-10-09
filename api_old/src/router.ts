import * as express from "express";
import * as glob from "glob";
import * as cors from "cors";
import * as fs from "fs";

const router = express.Router();

router.use(cors());
console.log("--- Startup ---");
const middlewaresReady = new Promise((resolve, reject) => {
  fs.readdirSync(__dirname + "/middleware").forEach(function(file) {
    const module = require(__dirname + "/middleware/" + file);
    if (module.autoRegister) {
      router.use(module.default);
      console.log(
        "\x1b[32m%s\x1b[0m",
        `Auto registered middleware: ${file.split(".")[0]}`
      );
    }
  });
});

const routesReady = new Promise((resolve, reject) => {
  var getDirectories = function(callback: {
    (err: any, res: any): void;
    (err: Error | null, matches: string[]): void;
  }) {
    glob(__dirname + "/routes/api" + "/**/*", callback);
  };
  getDirectories((err: any, res: Array<string>) => {
    if (err) {
      throw new Error(err);
    } else {
      res.forEach(async (file) => {
        if (file.endsWith(".js")) {
          const path = file.substring(__dirname.length);
          const route = path.substring(8).replace("_", ":");
          const routeModule = require(`.${path}`);
          if (routeModule.autoRegister) {
            try {
              const method: any = route.split("-")[1].split(".")[0] || "get";
              const routeName = route.split("-")[0].split(".")[0].replace('/index', '');
              try {
                eval(
                  `router.${method}(\`/\${routeName}\`, routeModule.default)`
                );
                console.log(
                  "\x1b[32m%s\x1b[0m",
                  `Auto registered route: /${routeName} (${method})`
                );
              } catch (error) {
                console.error(
                  "\x1b[31m%s\x1b[0m",
                  `Error registering route: /${routeName}`
                );
                console.error(error);
              }
            } catch (error) {
              const routeName = route.split("-")[0].split(".")[0].replace('/index', '');
              router.get(route.split(".")[0] === "index" ? "/" : `/${routeName}`, routeModule.default);
              console.log(
                "\x1b[32m%s\x1b[0m",
                route.split(".")[0] === "index"
                  ? "Auto registered route: / (get)"
                  : `Auto registered route: /${routeName} (get)`
              );
            }
          } else {
            try {
              const method: any = route.split("-")[1].split(".")[0] || "get";
              const routeName = route.split("-")[0].split(".")[0].replace('/index', '');
              console.log(
                "\x1b[33m%s\x1b[0m",
                `Skipping route: ${routeName} (${method})`
              );
            } catch (error) {
              const routeName = route.split("-")[0].split(".")[0].replace('/index', '');
              console.log(
                "\x1b[33m%s\x1b[0m",
                `Skipping route: ${routeName} (get)`
              );
            }
          }
        }
      });
    }
  });
});

export const ready = Promise.all([middlewaresReady, routesReady]);

export default router;
