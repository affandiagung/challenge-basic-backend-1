require("dotenv").config({ quiet: true });

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Swagger running on http://localhost:${PORT}/api/docs`);
    console.log(`BACKEND API's running on http://localhost:${PORT}/api`);
    console.log(`FRONTEND app running on http://localhost:${PORT}`);
    console.log(`
    ██╗███╗   ██╗ ██████╗ ███████╗████████╗██╗███╗   ██╗    ██████╗ ██╗    ██╗
    ██║████╗  ██║██╔════╝ ██╔════╝╚══██╔══╝██║████╗  ██║    ██╔════╝ ██║    ██║
    ██║██╔██╗ ██║██║  ███╗█████╗     ██║   ██║██╔██╗ ██║    ██║  ███╗██║ █╗ ██║
    ██║██║╚██╗██║██║   ██║██╔══╝     ██║   ██║██║╚██╗██║    ██║   ██║██║███╗██║
    ██║██║ ╚████║╚██████╔╝███████╗   ██║   ██║██║ ╚████║    ╚██████╔╝╚███╔███╔╝
    ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝    ╚═════╝  ╚══╝╚══╝ 
`);

});


