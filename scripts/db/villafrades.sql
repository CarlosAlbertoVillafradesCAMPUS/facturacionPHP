CREATE DATABASE db_hunter_facture_villafrades;
USE db_hunter_facture_villafrades;
CREATE TABLE factura(
    numeroFactura VARCHAR(25) NOT NULL PRIMARY KEY COMMENT "Numero de la factura",
    fechaFactura DATETIME NOT NULL DEFAULT NOW() UNIQUE COMMENT "Agrega de manera automatica la fechas actual del server"
);
CREATE TABLE clientes(
    idCliente INT(10) NOT NULL PRIMARY KEY COMMENT "Numero de identificacion del cliente",
    nombreCliente VARCHAR(60) NOT NULL COMMENT "Nombre completo del cliente",
    correoCliente VARCHAR(30) NOT NULL COMMENT "Correo electronico del cliente",
    direccionCliente VARCHAR(60) NOT NULL COMMENT "Direccion del cliente",
    telefonoCliente VARCHAR(10) NOT NULL COMMENT "Numero telefonico del cliente"
);
CREATE TABLE productos(
    codProducto VARCHAR(10) NOT NULL PRIMARY KEY COMMENT "Codigo del producto",
    nameProducto VARCHAR(30) NOT NULL COMMENT "Nombre del producto",
    amountProducto INT(3) NOT NULL COMMENT "Cacntidad de ese producto",
    valUnidadProducto int(7) NOT NULL COMMENT "Valor por unidad de cada producto"
);
CREATE TABLE empresa(
    idVendedor INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "id del vendedor",
    vendedor VARCHAR(60) NOT NULL COMMENT "Nombre completo del vendedor"
);

/* creamos los campos de las llaves foraneas */

ALTER TABLE factura ADD fk_idCliente INT(10) NOT NULL COMMENT "relacion con la tabala clientes";
ALTER TABLE factura ADD fk_idVendedor INTEGER(11) NOT NULL COMMENT "relacion con la tabla empresa";
ALTER TABLE factura ADD fk_codProducto VARCHAR(10) NOT NULL COMMENT "relacion con la tabla productos";


/* creamos las relaciones de las tablas con las llaves foraneas */

ALTER TABLE factura ADD CONSTRAINT factura_cliente_fk FOREIGN KEY(fk_idCliente) REFERENCES clientes(idCliente);
ALTER TABLE factura ADD CONSTRAINT factura_empresa_fk FOREIGN KEY(fk_idVendedor) REFERENCES empresa(idVendedor);
ALTER TABLE factura ADD CONSTRAINT factura_productos_fk FOREIGN KEY(fk_codProducto) REFERENCES productos(codProducto);



