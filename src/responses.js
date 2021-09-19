const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'CONTENT-Type': type });
  if (type === 'application/json') {
    response.write(JSON.stringify(object));
  } else {
    response.write(object);
  }
  response.end();
};

// Success

const success = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  return respond(request, response, 200, object, 'application/json');
};

// BadRequest

const badRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This request has the required parameters',
  };

  let statusCode = 200;
  if (!params.valid || params.valid !== 'true') {
    object.message = 'Missing valid query parameter set to true';
    object.id = 'badRequest';
    statusCode = 400;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (statusCode === 400) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }
  return respond(request, response, statusCode, object, 'application/json');
};

// Unauthorized

const unAuthorizedRequest = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are logged in and authorized to view',
  };

  let statusCode = 200;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    object.message = 'Missing loggedIn query parameter set to yes';
    object.id = 'unauthorized';
    statusCode = 401;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (statusCode === 401) {
      responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} </response>`;
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }
  return respond(request, response, statusCode, object, 'application/json');
};

// Forbidden

const forbidden = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'You are forbidden from accessing this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  return respond(request, response, 403, object, 'application/json');
};

// Internal Error

const internal = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  return respond(request, response, 500, object, 'application/json');
};

// Not Implemented

const notImplemented = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'This page has not been implemented',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  return respond(request, response, 501, object, 'application/json');
};

// Not Found

const notFound = (request, response, params, acceptedTypes) => {
  const object = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  return respond(request, response, 404, object, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unAuthorizedRequest,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
