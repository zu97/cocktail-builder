const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        url: 'mongodb://localhost/hw96_zush',
        options: { useNewUrlParser: true }
    },
    google: {
        appId: '100603535689-v40d9bfb8p4q6bamicrckn5ttcjao19j.apps.googleusercontent.com',
        appSecret: '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'
    }
};