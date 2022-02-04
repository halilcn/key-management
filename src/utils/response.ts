//todo:

interface Response {
    status: number;
    message?: string;
    data?: any;
}

let response: Response[]={};


response.success = (message: string | object = 'Success', status = 200) => {
    return typeof message !== 'string'
        ? {
            data: message,
            status: status,
        }
        : {
            message: message,
            status: status
        }
};

//todo: type belirlenmesin ??
//todo: type'lerin interface olması, duplicate engelleme

response.authError = (message: string = 'Authentication Error', status: number = 401): Object => {
    return {
        message,
        status
    }
};

export default response
