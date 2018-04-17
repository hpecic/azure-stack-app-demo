const os      = require('os');

const ifaces    = os.networkInterfaces();
const adresses  = [];

const getAddresses = () => {
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      adresses.push(iface.address);
    });
  });
  return adresses;
};

module.exports = {
  getAddresses,
};
