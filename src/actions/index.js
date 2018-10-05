export const getContent = (param) => (
    {
    type: 'REQUEST_CONTENT',
    param
}
);

export const getContentDetailed = (param) => (
    {
        type:"REQUEST_DETAILED",
        param
    }
);