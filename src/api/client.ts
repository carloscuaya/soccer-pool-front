import axios from 'axios'

const client = axios.create({
    baseURL: 'https://spb-4d1b4d1e.fastapicloud.dev',
    headers: { 'Content-Type': 'application/json' },
})

export default client
