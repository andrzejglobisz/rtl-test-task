import Axios from 'axios';
import * as http from 'http';
import * as https from 'https';

export default Axios.create({
    timeout: 300000,
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    maxRedirects: 10,
});
