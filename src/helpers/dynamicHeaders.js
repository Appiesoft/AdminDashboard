const DynamicHeaders = (data, nonLables) => {
    const headers = []
    if (data) {
        if (typeof data === 'object' && data[0]) {
            let headersDatas = Object.keys(data[0]);
            for (let headersData of headersDatas) {
                if (!nonLables.includes(headersData)) {
                    //remove number form string
                    let label = headersData.replace(/[0-9]/g, '');
                    //Remove under score form string
                    label = label.replace(/_/g, " ");
                    //capitalize first and last letter string 
                    let arrs = label.split(" ");
                    if (arrs.length > 2) {
                        arrs = [arrs[0], arrs[arrs.length - 1]];
                    }
                    for (let i = 0; i < arrs.length; i++) {
                        arrs[i] = arrs[i].charAt(0).toUpperCase() + arrs[i].slice(1);
                    }
                    label = arrs.join(" ");
                    headers.push(
                        { label, key: headersData },
                    )
                }
            }
            return headers;
        }
    }

}

export default DynamicHeaders