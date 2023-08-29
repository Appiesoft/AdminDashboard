const getBase64 = async (file) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);
        // on reader load somthing...
        reader.onload = async () => {
            // Make a fileInfo Object
            baseURL = reader.result.replace('data:', '')
                .replace(/^.+,/, '');
            resolve(baseURL);
        };
    });
};

export {getBase64}
   