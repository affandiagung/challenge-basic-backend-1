require("dotenv").config({ quiet: true });

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Swagger Docs running on : http://localhost:${PORT}/api/docs`);
    console.log(`FRONTEND app running on : http://localhost:${PORT}`);
    console.log(`Mailpit app running on : http://localhost:8025`);
    console.log(`
    ██╗███╗   ██╗ ██████╗ ███████╗████████╗██╗███╗   ██╗    ██████╗ ██╗    ██╗
    ██║████╗  ██║██╔════╝ ██╔════╝╚══██╔══╝██║████╗  ██║    ██╔════╝ ██║    ██║
    ██║██╔██╗ ██║██║  ███╗█████╗     ██║   ██║██╔██╗ ██║    ██║  ███╗██║ █╗ ██║
    ██║██║╚██╗██║██║   ██║██╔══╝     ██║   ██║██║╚██╗██║    ██║   ██║██║███╗██║
    ██║██║ ╚████║╚██████╔╝███████╗   ██║   ██║██║ ╚████║    ╚██████╔╝╚███╔███╔╝
    ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝    ╚═════╝  ╚══╝╚══╝ 
`);

});


