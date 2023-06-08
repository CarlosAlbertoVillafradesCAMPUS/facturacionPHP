<?php
trait getInstance{
    public static $instance;
    public static function getInstance() {
        $arg = func_get_args();
        $arg = array_pop($arg);
        return (!(self::$instance instanceof self) || !empty($arg)) ? self::$instance = new static(...(array) $arg) : self::$instance;
    }
}
    function autoload($class) {
        // Directorios donde buscar archivos de clases
        $directories = [
            dirname(__DIR__).'/scripts/'
        ];
        // Convertir el nombre de la clase en un nombre de archivo relativo
        $classFile = str_replace('\\', '/', $class) . '.php';
    
        // Recorrer los directorios y buscar el archivo de la clase
        foreach ($directories as $directory) {
            $file = $directory.$classFile;
            // Verificar si el archivo existe y cargarlo
            if (file_exists($file)) {
                require $file;
                break;
            }
        }
    }
    spl_autoload_register("autoload");

    class superApi{
        use getInstance;
        public function __construct(private $_METHOD,private $_DATA, public $_HEADER ){
            match($_METHOD){
                "POST" => $this->enviarDatos($_DATA),  
            };
            
        }

        public function enviarDatos($_DATA){
            factura::getInstance($_DATA["facturas"]);
            empresa::getInstance($_DATA["empresa"]);
            clientes::getInstance($_DATA["cliente"]);
            productos::getInstance($_DATA["productos"]);
        }
    }

    $data = [
        "_METHOD"=>$_SERVER["REQUEST_METHOD"],
        "_DATA"=> json_decode(file_get_contents("php://input"), true),
        "_HEADER"=> apache_request_headers()
    ];
    //llmamos la instancia y le pasamos la data del contrsuctor
    superApi::getInstance($data);
?>