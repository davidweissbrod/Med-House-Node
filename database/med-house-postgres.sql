-- Crear la tabla Categorias
CREATE TABLE public.categorias (
    Id serial4 NOT NULL,
    Nombre varchar NOT NULL,
    Cd_time int NOT NULL,
    CONSTRAINT "PK_Categorias" PRIMARY KEY (Id)
);

-- Crear la tabla Farmaceutico
CREATE TABLE public.farmaceutico (
    Id serial4 NOT NULL,
    Dni int NOT NULL,
    Nombre varchar NOT NULL,
    Apellido varchar NOT NULL,
    Titulo varchar NOT NULL,
    "password" varchar NOT NULL,
    Email varchar NOT NULL,
    Genero varchar NULL,
    Foto_perfil varchar NULL,
    Fecha_de_nacimiento date NULL,
    Telefono int NULL,
    CONSTRAINT "PK_Farmaceutico" PRIMARY KEY (Id)
);

-- Crear la tabla Usuario
CREATE TABLE public.usuario (
    Id serial4 NOT NULL,
    Dni int NOT NULL,
    Nombre varchar NOT NULL,
    Apellido varchar NOT NULL,
    "password" varchar NOT NULL,
    Email varchar NOT NULL,
    Foto_perfil varchar NULL,
    Fecha_nacimiento date NULL,
    Genero varchar NULL,
    Telefono int NULL,
    CONSTRAINT "PK_Usuario" PRIMARY KEY (Id)
);

-- Crear la tabla Medicamento
CREATE TABLE public.medicamento (
    Id serial4 NOT NULL,
    Nombre varchar NOT NULL,
    Marca varchar NOT NULL,
    Dosis varchar NOT NULL,
    Forma_farm varchar NOT NULL,
    Droga varchar NOT NULL,
    Id_categoria int NOT NULL,
    Descripcion varchar NOT NULL,
    Stock int NOT NULL,
    CONSTRAINT "PK_Medicamento" PRIMARY KEY (Id),
    CONSTRAINT FK_Medicamento_Categoria FOREIGN KEY (Id_categoria) REFERENCES categorias (Id)
);

-- Crear la tabla Request
CREATE TABLE public.request (
    Id serial4 NOT NULL,
    Id_usuario int NOT NULL,
    Id_farmaceutico int NULL,
    Id_medicamento int NOT NULL,
    Estado boolean NULL,
    Descripcion varchar NOT NULL,
    Fecha_caducidad date NOT NULL,
    Fecha_apertura date NULL,
    Cantidad int NULL,
    Comentario varchar NULL,
    CONSTRAINT "PK_Request" PRIMARY KEY (Id),
    CONSTRAINT FK_Request_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Request_Farmaceutico FOREIGN KEY (Id_farmaceutico) REFERENCES farmaceutico (Id),
    CONSTRAINT FK_Request_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id)
);

-- Crear la tabla Preguntas
CREATE TABLE public.preguntas (
    Id_usuario int NOT NULL,
    Id_medicamento int NOT NULL,
    Pregunta varchar NOT NULL,
    Respuesta varchar NULL,
    CONSTRAINT FK_Preguntas_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Preguntas_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id)
);

-- Crear la tabla Necesitados
CREATE TABLE public.necesitados (
    Id_usuario int NOT NULL,
    Id_medicamento int NOT NULL,
    CONSTRAINT FK_Necesitados_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Necesitados_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id)
);

-- Crear la tabla Prioritarios
CREATE TABLE public.prioritarios (
    Id_usuario int NOT NULL,
    Id_categoria int NOT NULL,
    CONSTRAINT FK_Prioritarios_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Prioritarios_Categoria FOREIGN KEY (Id_categoria) REFERENCES categorias (Id)
);

-- Crear la tabla ImgRequest
CREATE TABLE public.img_request (
    Id serial4 NOT NULL,
    Id_request int NOT NULL,
    Image varchar NULL,
    CONSTRAINT "PK_ImgRequest" PRIMARY KEY (Id),
    CONSTRAINT FK_ImgRequest_Request FOREIGN KEY (Id_request) REFERENCES request (Id)
);

-- Crear la tabla MedicamentosDonados
CREATE TABLE public.medicamentos_donados (
    Id_usuario int NOT NULL,
    Id_medicamento int NOT NULL,
    Id_farmaceutico int NOT NULL,
    CONSTRAINT FK_MedicamentosDonados_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_MedicamentosDonados_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id),
    CONSTRAINT FK_MedicamentosDonados_Farmaceutico FOREIGN KEY (Id_farmaceutico) REFERENCES farmaceutico (Id)
);

-- Crear la tabla Transacciones
CREATE TABLE public.transacciones (
    Id_usuario int NOT NULL,
    Id_medicamento int NOT NULL,
    Tarjeta int NOT NULL,
    CONSTRAINT FK_Transacciones_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Transacciones_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id)
);

CREATE TABLE public.cooldowns (
    Fecha_termina date NOT NULL,
    Id_categoria int NOT NULL,
    Id_usuario int NOT NULL,
    CONSTRAINT FK_Cooldowns_Categoria FOREIGN KEY (Id_categoria) REFERENCES categorias (Id),
    CONSTRAINT FK_Cooldowns_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id)
);

CREATE TABLE public.bolsa (
    Id_usuario int NOT NULL,
    Id_medicamento int NOT NULL,
    CONSTRAINT FK_Bolsa_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id),
    CONSTRAINT FK_Bolsa_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id)
);

CREATE TABLE public.pedidos (
    Id serial4 NOT NULL,
    Fecha_pedido date NOT NULL,
    Id_usuario int NOT NULL,
	CONSTRAINT "PK_pedidos" PRIMARY KEY (Id),
    CONSTRAINT FK_pedidos_Usuario FOREIGN KEY (Id_usuario) REFERENCES usuario (Id)
);

CREATE TABLE public.detallepedidos (
    Id_medicamento int NOT NULL,
    Id_pedidos int NOT NULL,
    CONSTRAINT FK_Detallepedidos_Medicamento FOREIGN KEY (Id_medicamento) REFERENCES medicamento (Id),
    CONSTRAINT FK_Detallepedidos_Pedidos FOREIGN KEY (Id_pedidos) REFERENCES pedidos (Id)
);