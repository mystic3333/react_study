import config from './config'
import {httpGet} from '../utils/http'

const api = {
    getList(api) {
        return httpGet(config.baseUrl + api)
    }
}

export default api