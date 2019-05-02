const app = require('./api/app');

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});