import app from "./app.js";
import config from "./app/config/index.js";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
