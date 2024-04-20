const WebSocketServer = require("ws").Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT });
  const wsConnection = "connection";
  const wsMessage = "message";
  const wsClose = "close";
  const wsError = "error";

  wsServer.on(wsConnection, handleConnection);

  function handleConnection(socket) {
    socket.on(wsMessage, handleMessage);
    socket.on(wsClose, handleClose);
    socket.on(wsError, handleError);
  }

  function handleMessage(message) {
    try {
      const updateData = JSON.parse(message);
      if (isValidUserCumulativeStep(updateData)) {
        handleUpdatedCumulativeStep(updateData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleClose() {}

  function handleError() {}

  function isValidUserCumulativeStep(cumulativeDetail) {
    return (
      cumulativeDetail?.update_id &&
      cumulativeDetail?.username &&
      cumulativeDetail?.ts &&
      typeof cumulativeDetail?.newSteps === "number"
    );
  }

  function handleUpdatedCumulativeStep(update) {
    stepService.add(update.username, update.ts, update.newSteps);
  }

  return wsServer;
};
