import axiostodo from './api/axiostodo';

const END_POINT = {
    Values: "Values",
};

export const getTodoAPI = () => {
    return axiostodo.get(`${END_POINT.Values}`);
};
