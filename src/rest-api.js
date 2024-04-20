const express = require("express");

module.exports = (stepService) => {
  const REST_PORT = 8080;
  const app = express();
  const errorNotFoundUserText = "User doesn't exist";
  const errorPathNotFound = "Path Not Found";
  const successStatusResponse = 200;
  const errorNotFoundStatusResponse = 404;

  app.use(express.json());

  app.get("/users/:username/steps", (req, res) => {
    const username = req.params.username;
    const userSteps = stepService.get(username);

    if (userSteps) {
      res.status(successStatusResponse).json({
        cumulativeSteps: userSteps.cumulativeSteps,
        ts: userSteps.ts,
      });
    } else {
      res
        .status(errorNotFoundStatusResponse)
        .json({ error: errorNotFoundUserText });
    }
  });

  app.all("*", (_, res) => {
    res.status(errorNotFoundStatusResponse).json({ error: errorPathNotFound });
  });

  const server = app.listen(REST_PORT, () => {});

  const closeServer = () => {
    server.close();
  };

  return {
    close: closeServer,
  };
};
