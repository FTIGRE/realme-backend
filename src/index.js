const {server, app} = require('./app');

server.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto ', app.get('port'));
});

