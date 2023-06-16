<?php
class clientes extends connect{
    //cuando creemos una clase hay que llamar a la instancia sin prentesis
    use getInstance;
    public function __construct(public $idCliente, public $nombreCliente, private $correoCliente, private $direccionCliente, private $telefonoCliente){
        echo $this->__get("nombreCliente");
    }
}


?>