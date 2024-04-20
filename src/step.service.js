module.exports = function stepService(store) {
  const service = {};
  const errorInvalidUser = "Invalid username";

  service.add = (username, timeStamp, newSteps) => {
    if (!username) {
      throw new Error(errorInvalidUser);
    }

    if (store[username]) {
      store[username].ts = timeStamp;
      store[username].cumulativeSteps += newSteps;
    } else {
      store[username] = {
        ts: timeStamp,
        cumulativeSteps: newSteps,
      };
    }
  };

  service.get = (username) => {
    return store.hasOwnProperty(username) ? store[username] : undefined;
  };

  return service;
};
