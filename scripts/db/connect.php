<?php
class connect {
    use getInstance;
    protected $conx;
    public function __construct(){
        $this->conx = new PDO("mysql:host=172.16.48.210;port=3306;username=sputnik;password=Sp3tn1kC@;database=db_hunter_factura");
    }
}
?>