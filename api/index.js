import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server running on localhost:3000');
});
app.listen(3000, () => console.log('Server running on port: 3000'));