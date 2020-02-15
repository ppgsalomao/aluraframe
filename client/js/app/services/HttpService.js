class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.open('GET', url);
            request.onreadystatechange = () => {
                /*
                 States:
                   0 => Not started
                   1 => Connection established
                   2 => Request received
                   3 => Processing request
                   4 => Request finished and response received.
                 */

                if(request.readyState === 4) {
                    if(request.status === 200) {
                        resolve(JSON.parse(request.responseText));
                    } else {
                        reject(request.responseText);
                    }
                }
            };
            request.send();
        });
    }
}