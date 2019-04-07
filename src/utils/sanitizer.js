const sanitizer = async (params) => {
  
    const tester = /[&\/\\#! ,_=+()$~%.'":*?<>{}]/g
    let keys = Object.keys(params);
    // console.log(params,keys);
    let sanitizedBody = {};
    await keys.map(ele => {
      return sanitizedBody[ele] = params[ele].replace(tester, " ");
    });
    
    return sanitizedBody;
}


module.exports = sanitizer;