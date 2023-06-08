<?php
class productos{
    //cuando creemos una clase hay que llamar a la instancia sin prentesis
    use getInstance;
    public function __construct($arg){
        var_dump($arg);
    }
}

?>