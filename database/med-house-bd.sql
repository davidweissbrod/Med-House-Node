USE [master]
GO
/****** Object:  Database [med-house]    Script Date: 14/6/2024 11:04:15 ******/
CREATE DATABASE [med-house]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'med-house', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\med-house.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'med-house_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\med-house_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [med-house] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [med-house].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [med-house] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [med-house] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [med-house] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [med-house] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [med-house] SET ARITHABORT OFF 
GO
ALTER DATABASE [med-house] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [med-house] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [med-house] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [med-house] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [med-house] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [med-house] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [med-house] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [med-house] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [med-house] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [med-house] SET  DISABLE_BROKER 
GO
ALTER DATABASE [med-house] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [med-house] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [med-house] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [med-house] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [med-house] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [med-house] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [med-house] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [med-house] SET RECOVERY FULL 
GO
ALTER DATABASE [med-house] SET  MULTI_USER 
GO
ALTER DATABASE [med-house] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [med-house] SET DB_CHAINING OFF 
GO
ALTER DATABASE [med-house] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [med-house] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [med-house] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'med-house', N'ON'
GO
ALTER DATABASE [med-house] SET QUERY_STORE = OFF
GO
USE [med-house]
GO
/****** Object:  User [alumno]    Script Date: 14/6/2024 11:04:15 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[idCategoria] [int] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Farmaceutico]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Farmaceutico](
	[idFarmaceutico] [varchar](100) NOT NULL,
	[DNI] [int] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[Email] [varchar](200) NOT NULL,
	[Genero] [varchar](50) NULL,
	[fotoDePerfil] [image] NULL,
	[fechaDeNacimiento] [date] NULL,
	[Telefono] [int] NULL,
 CONSTRAINT [PK_Farmaceutico] PRIMARY KEY CLUSTERED 
(
	[idFarmaceutico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImgRequest]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImgRequest](
	[idImagen] [int] IDENTITY(1,1) NOT NULL,
	[idRequest] [int] NOT NULL,
	[Imagen] [image] NULL,
 CONSTRAINT [PK_ImgRequest_1] PRIMARY KEY CLUSTERED 
(
	[idImagen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicamento]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicamento](
	[idMedicamento] [int] NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
	[Marca] [varchar](100) NOT NULL,
	[Dosis] [varchar](50) NOT NULL,
	[formaFarm] [varchar](50) NOT NULL,
	[Droga] [varchar](100) NOT NULL,
	[idCategoria] [int] NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[Stock] [int] NOT NULL,
 CONSTRAINT [PK_Medicamento] PRIMARY KEY CLUSTERED 
(
	[idMedicamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicamentosDonados]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicamentosDonados](
	[idUsuario] [varchar](100) NOT NULL,
	[idMedicamento] [int] NOT NULL,
	[idFarmaceutico] [varchar](100) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Necesitados]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Necesitados](
	[idUsuario] [varchar](100) NOT NULL,
	[idMedicamento] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preguntas](
	[idUsuario] [varchar](100) NOT NULL,
	[idMedicamento] [int] NOT NULL,
	[Pregunta] [varchar](300) NOT NULL,
	[Respuesta] [varchar](600) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[priorizados]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[priorizados](
	[idUsuario] [varchar](100) NOT NULL,
	[idCategoria] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Request]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Request](
	[idRequest] [int] NOT NULL,
	[idUsuario] [varchar](100) NOT NULL,
	[idFarmaceutico] [varchar](100) NULL,
	[idMedicamento] [int] NOT NULL,
	[Estado] [bit] NULL,
	[Descripcion] [varchar](1000) NOT NULL,
	[fechaCaducidad] [date] NOT NULL,
	[fechaApertura] [date] NULL,
	[Cantidad] [int] NULL,
	[Comentario] [varchar](500) NULL,
 CONSTRAINT [PK_Request] PRIMARY KEY CLUSTERED 
(
	[idRequest] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transacciones]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transacciones](
	[idUsuario] [varchar](100) NOT NULL,
	[idMedicamento] [int] NOT NULL,
	[Tarjeta] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 14/6/2024 11:04:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [varchar](100) NOT NULL,
	[DNI] [int] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[Email] [varchar](200) NOT NULL,
	[fotoDePerfil] [image] NULL,
	[fechaNacimiento] [date] NULL,
	[Genero] [varchar](50) NULL,
	[Telefono] [int] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ImgRequest]  WITH CHECK ADD  CONSTRAINT [FK_ImgRequest_Request] FOREIGN KEY([idRequest])
REFERENCES [dbo].[Request] ([idRequest])
GO
ALTER TABLE [dbo].[ImgRequest] CHECK CONSTRAINT [FK_ImgRequest_Request]
GO
ALTER TABLE [dbo].[Medicamento]  WITH CHECK ADD  CONSTRAINT [FK_Medicamento_Categorias] FOREIGN KEY([idCategoria])
REFERENCES [dbo].[Categorias] ([idCategoria])
GO
ALTER TABLE [dbo].[Medicamento] CHECK CONSTRAINT [FK_Medicamento_Categorias]
GO
ALTER TABLE [dbo].[MedicamentosDonados]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentosDonados_Farmaceutico] FOREIGN KEY([idFarmaceutico])
REFERENCES [dbo].[Farmaceutico] ([idFarmaceutico])
GO
ALTER TABLE [dbo].[MedicamentosDonados] CHECK CONSTRAINT [FK_MedicamentosDonados_Farmaceutico]
GO
ALTER TABLE [dbo].[MedicamentosDonados]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentosDonados_Medicamento] FOREIGN KEY([idMedicamento])
REFERENCES [dbo].[Medicamento] ([idMedicamento])
GO
ALTER TABLE [dbo].[MedicamentosDonados] CHECK CONSTRAINT [FK_MedicamentosDonados_Medicamento]
GO
ALTER TABLE [dbo].[MedicamentosDonados]  WITH CHECK ADD  CONSTRAINT [FK_MedicamentosDonados_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[MedicamentosDonados] CHECK CONSTRAINT [FK_MedicamentosDonados_Usuario]
GO
ALTER TABLE [dbo].[Necesitados]  WITH CHECK ADD  CONSTRAINT [FK_Necesitados_Medicamento] FOREIGN KEY([idMedicamento])
REFERENCES [dbo].[Medicamento] ([idMedicamento])
GO
ALTER TABLE [dbo].[Necesitados] CHECK CONSTRAINT [FK_Necesitados_Medicamento]
GO
ALTER TABLE [dbo].[Necesitados]  WITH CHECK ADD  CONSTRAINT [FK_Necesitados_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Necesitados] CHECK CONSTRAINT [FK_Necesitados_Usuario]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Medicamento] FOREIGN KEY([idMedicamento])
REFERENCES [dbo].[Medicamento] ([idMedicamento])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Medicamento]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Usuario]
GO
ALTER TABLE [dbo].[priorizados]  WITH CHECK ADD  CONSTRAINT [FK_priorizados_Categorias] FOREIGN KEY([idCategoria])
REFERENCES [dbo].[Categorias] ([idCategoria])
GO
ALTER TABLE [dbo].[priorizados] CHECK CONSTRAINT [FK_priorizados_Categorias]
GO
ALTER TABLE [dbo].[priorizados]  WITH CHECK ADD  CONSTRAINT [FK_priorizados_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[priorizados] CHECK CONSTRAINT [FK_priorizados_Usuario]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FK_Request_Farmaceutico] FOREIGN KEY([idFarmaceutico])
REFERENCES [dbo].[Farmaceutico] ([idFarmaceutico])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FK_Request_Farmaceutico]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FK_Request_Medicamento] FOREIGN KEY([idMedicamento])
REFERENCES [dbo].[Medicamento] ([idMedicamento])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FK_Request_Medicamento]
GO
ALTER TABLE [dbo].[Request]  WITH CHECK ADD  CONSTRAINT [FK_Request_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Request] CHECK CONSTRAINT [FK_Request_Usuario]
GO
ALTER TABLE [dbo].[Transacciones]  WITH CHECK ADD  CONSTRAINT [FK_Transacciones_Medicamento] FOREIGN KEY([idMedicamento])
REFERENCES [dbo].[Medicamento] ([idMedicamento])
GO
ALTER TABLE [dbo].[Transacciones] CHECK CONSTRAINT [FK_Transacciones_Medicamento]
GO
ALTER TABLE [dbo].[Transacciones]  WITH CHECK ADD  CONSTRAINT [FK_Transacciones_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Transacciones] CHECK CONSTRAINT [FK_Transacciones_Usuario]
GO
USE [master]
GO
ALTER DATABASE [med-house] SET  READ_WRITE 
GO
