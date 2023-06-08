<?php
class factura{
    //cuando creemos una clase hay que llamar a la instancia sin prentesis
    use getInstance;
    public function __construct(public $numeroFactura, public $fechaFactura){
        echo json_encode($numeroFactura);
        echo json_encode($fechaFactura);
    }
}

?>