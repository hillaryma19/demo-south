import services from "./services.js";

const env = process.env.NODE_ENV;
export default {
  baseUrl: services[env],
  poolUrl: services[env],
  mapUrl: services[env],
};
