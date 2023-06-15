CREATE DATABASE db_hunter_facture_villafrades;
USE db_hunter_facture_villafrades;
CREATE TABLE tb_factura(
    numeroFactura VARCHAR(25) NOT NULL PRIMARY KEY COMMENT "Numero de la factura",
    fechaFactura DATETIME NOT NULL DEFAULT NOW() UNIQUE COMMENT "Agrega de manera automatica la fechas actual del server"
);
CREATE TABLE tb_clientes(
    idCliente INT(10) NOT NULL PRIMARY KEY COMMENT "Numero de identificacion del cliente",
    nombreCliente VARCHAR(60) NOT NULL COMMENT "Nombre completo del cliente",
    correoCliente VARCHAR(30) NOT NULL COMMENT "Correo electronico del cliente",
    direccionCliente VARCHAR(60) NOT NULL COMMENT "Direccion del cliente",
    telefonoCliente VARCHAR(10) NOT NULL COMMENT "Numero telefonico del cliente"
);
CREATE TABLE tb_productos(
    codProducto VARCHAR(10) NOT NULL PRIMARY KEY COMMENT "Codigo del producto",
    nameProducto VARCHAR(30) NOT NULL COMMENT "Nombre del producto",
    amountProducto INT(3) NOT NULL COMMENT "Cacntidad de ese producto",
    valUnidadProducto int(7) NOT NULL COMMENT "Valor por unidad de cada producto"
);
CREATE TABLE tb_empresa(
    idVendedor INTEGER(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "id del vendedor",
    vendedor VARCHAR(60) NOT NULL COMMENT "Nombre completo del vendedor"
);

/* creamos los campos de las llaves foraneas */

ALTER TABLE tb_factura ADD fk_idCliente INT(10) NOT NULL COMMENT "relacion con la tabala clientes";
ALTER TABLE tb_factura ADD fk_idVendedor INTEGER(11) NOT NULL COMMENT "relacion con la tabla empresa";
ALTER TABLE tb_factura ADD fk_codProducto VARCHAR(10) NOT NULL COMMENT "relacion con la tabla productos";


/* creamos las relaciones de las tablas con las llaves foraneas */

ALTER TABLE tb_factura ADD CONSTRAINT tb_factura_tb_cliente_fk FOREIGN KEY(fk_idCliente) REFERENCES tb_clientes(idCliente);
ALTER TABLE tb_factura ADD CONSTRAINT tb_factura_tb_empresa_fk FOREIGN KEY(fk_idVendedor) REFERENCES tb_empresa(idVendedor);
ALTER TABLE tb_factura ADD CONSTRAINT tb_factura_tb_productos_fk FOREIGN KEY(fk_codProducto) REFERENCES tb_productos(codProducto);

/*Insertamos registros a cada uno de las tablas*/

INSERT INTO tb_clientes(idCliente, nombreCliente, correoCliente, direccionCliente, telefonoCliente) VALUES(1245, "Carlos Villafrades", "cavillafrades@gmail.com", "lebrija-santander", "3238884307");
INSERT INTO tb_empresa(vendedor) VALUES("Chepe Contreras");
INSERT INTO tb_productos(codProducto, nameProducto, amountProducto, valUnidadProducto) VALUES("AZ210", "Edwin mamahuevo", 2, 2000);
INSERT INTO tb_factura(numeroFactura, fk_idCliente, fk_idVendedor, fk_codProducto) VALUES("xx12", 1245, 1, "AZ210");

/*Actualizar registros a cada uno de las tablas*/

UPDATE tb_clientes SET nombreCliente = "CARLOS VILLAFRADES" WHERE idCliente = 1245;
UPDATE tb_productos SET nameProducto = "Camisas" WHERE codProducto = "AZ210";
UPDATE tb_empresa SET vendedor = "JOSE SANCHEZ" WHERE idVendedor = 1;


/*Borrar registros a cada uno de las tablas*/

DELETE FROM tb_clientes WHERE idCliente = 1245;
DELETE FROM tb_productos WHERE codProducto = "AZ210";
DELETE FROM tb_empresa WHERE idVendedor = 1;
DELETE FROM tb_factura WHERE idFactura = "xx12";


