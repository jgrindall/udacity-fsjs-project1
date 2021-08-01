export const getExtension = (filename:string):string => {
    return filename.split('.').pop() || "";
};

export const getFilename = (filename:string):string => {
    const parts = filename.split('.');
    parts.pop();
    return parts.join(".");
};