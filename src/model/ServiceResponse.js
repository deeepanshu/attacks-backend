module.exports = class ServiceResponse {
    constructor(params) {
      return {
        err: params.err ? params.err : "",
        res: params.res ? params.res : "",
        msg: params.msg ? params.msg : ""
      };
    }
}