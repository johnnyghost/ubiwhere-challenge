<?php
define('ROOT_DIR', realpath(dirname(__FILE__) . '/../'));
define('APP_DIR', ROOT_DIR . '/app');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');


require_once ROOT_DIR . '/config/config.php';

try {
    $request = new Request();
    $request->enableUrlRewriting();
    $request->enableRestfulMapping();
    $request->dispatch();
} catch (Exception $e) {
	print_r($e);
    $request->catchException($e);
}

