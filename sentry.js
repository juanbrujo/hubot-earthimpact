// Description:
//   Get the potential future Earth impact events from an alien object that has been detected based on currently available observations.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot impact
//
// Author:
//   @juanbrujo

module.exports = function(robot) {
  robot.respond(/impact/i, function(msg) {
    const url = `https://ssd-api.jpl.nasa.gov/sentry.api?www=1&days=30&ps-min=-6&h-max=24`;

    robot.http(url).get()(function(err, res, body) {
      const data = JSON.parse(body);
      if (data) {
        return (() => {
          let impacts = []
          data.data.forEach(function (e) {
            impacts.push('<https://cneos.jpl.nasa.gov/sentry/details.html#?des=' + e.des + '|' + e.fullname + ': año: ' + e.range + ', diámetro (kms): ' + e.diameter + '>');
          })
          msg.send(impacts);
        })();
      } else {
        msg.send('ERROR');
      }
    });
  });
}
