import dns from "dns";

class CheckDns {
  constructor() {}

  static getInstance() {
    if (typeof CheckDns.instance === "object") {
      return CheckDns.instance;
    }
    CheckDns.instance = new CheckDns();
    return CheckDns.instance;
  }

  async domainInfo(domain) {
    return new Promise((resolve, reject) => {
      dns.resolveAny(domain, (err, address, family) => {
        if (err) reject(err);
        resolve(address);
      });
    });
  }
}

export default CheckDns.getInstance();
