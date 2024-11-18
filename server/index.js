require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connector");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Importação das rotas
const taskRoutes = require('./routers/tasks'); // Ajuste do nome do arquivo de rota
const landingpageRoute = require("./routers/landing_page");
const projectsRoute = require("./routers/projects");
const usersRoute = require("./routers/user");
const authRoute = require("./routers/auth");
const commentsRoute = require("./routers/comments");

// Carregamento do Swagger
const swaggerDocument = YAML.load('./docs/auth.yaml'); // O caminho para o seu arquivo YAML

const app = express();
const PORT = process.env.PORT || 8000;

// Conectar ao banco de dados
connectDB();

// Configuração de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(cookieParser()); // Deixe o cookie parser aqui
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de CORS
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.PROD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Definição das rotas
app.use("/", landingpageRoute);
app.use("/projects", projectsRoute);
app.use("/tasks", taskRoutes); // Certifique-se de usar uma única importação para essa rota
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);

// Tratamento de erros
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
