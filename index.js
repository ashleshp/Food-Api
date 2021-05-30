const express = require('express');
const cors = require('cors') 
const fs = require('fs');

const MENUPATH = './menu.json';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/menu', async(req, res) => {
    const menu = await fs.readFileSync(MENUPATH);
    res.status(200).json({success: true, data: JSON.parse(menu)});
});

app.post('/menu', async(req, res) => {
    const data = req.body;
    const menu = JSON.parse(await fs.readFileSync(MENUPATH));
    menu.push(data);
    await fs.writeFileSync(MENUPATH, JSON.stringify(menu));
    res.status(200).json({success: true});
});

app.post('/delete', async(req, res) => {
    await fs.writeFileSync(MENUPATH, JSON.stringify([]));
    res.status(200).json({success: true})
})

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});

