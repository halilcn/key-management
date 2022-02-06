type messageType = string | object;

//todo: function type change to ()=>Response type ?
interface ResponseList {
    [key: string]: Function;
}

interface Response {
    status: number;
    message?: string | object;
    data?: any;
}

let response: ResponseList = {};

response.success = (message: messageType = 'Success'): Response => {
    const status = 200;

    return typeof message !== 'string'
        ? {
            data: message,
            status,
        }
        : {
            message,
            status
        }
};

response.created = (message: messageType = 'Created'): Response => {
    const status = 201;

    console.log(message)
    return {
        message,
        status
    }
};

response.noContent = (message: messageType = 'No Content'): Response => {
    const status = 204;

    return {
        message,
        status
    }
};

response.error = (message: messageType = 'Error'): Response => {
    const status = 400;

    return {
        message,
        status
    }
};

response.authenticationError = (message: messageType = 'Authentication Error'): Response => {
    const status = 401;

    return {
        message,
        status
    }
};

response.forbiddenError = (message: messageType = 'Forbidden Error'): Response => {
    const status = 403;

    return {
        message,
        status
    }
};

response.notFound = (message: messageType = 'Not Found'): Response => {
    const status = 404;

    return {
        message,
        status
    }
};

response.invalidInput = (message: messageType = 'Invalid Input'): Response => {
    const status = 422;

    return typeof message !== 'string'
        ? {
            data: message,
            status,
        }
        : {
            message,
            status
        }
};

export default response
