const express = require('express');
const cors = require('cors');
const path = require('path');

class App {
    constructor() {
        this.app = express();
        this.setStatic();
    }

    setStatic() {
        this.app.use('/', express.static(path.join(__dirname, '/public')));
    }

}

module.exports = new App().app;