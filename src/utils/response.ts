interface ResponseParameters {
    status: number;
    message: string | object;
}

interface Response {
    status: number;
    message?: string | object;
    data?: any;
}

//todo: bunu interface ile yap

type test = (message: string | object, status: number) => Response

//todo: !!
let response: any = {};

response.success = (message = 'Success', status = 200) => {
    console.log(message)
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

response.created = ({message = 'Created', status = 201}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.noContent = ({message = 'No Content', status = 204}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.error = ({message = 'Error', status = 400}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.authenticationError = ({message = 'Authentication Error', status = 401}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.forbiddenError = ({message = 'Forbidden Error', status = 403}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.notFound = ({message = 'Not Found', status = 404}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

response.invalidInput = ({message = 'Invalid Input', status = 422}: ResponseParameters): Response => {
    return {
        message,
        status
    }
};

export default response
