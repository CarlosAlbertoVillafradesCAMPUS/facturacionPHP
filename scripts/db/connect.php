<?php
 interface environments{
    public function __get($name);
}
 abstract class connect extends credentials implements environments{
    use getInstance;
    private $conx;
    public function __construct(public $driver = "mysql", private $port = 3306){
        try {
            $this->conx = new PDO($this->driver.":host=".$this->__get("host").";port=".$this->port.";user=".$this->user.";password=".$this->password.";dbname=".$this->__get("dbname"));

            $this->conx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //!conexión PDO

            echo "OK";

        } catch (\PDOException $e) {
           print_r($e->getMessage());
           $this->conx = $e->getMessage();
        }
    }
}
?>