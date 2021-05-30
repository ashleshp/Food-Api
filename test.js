const axios = require('axios');

getMenu = async() => {
    const response = await axios.get('http://localhost:9500/menu')
    console.log(response.data.data)
}

getMenu()