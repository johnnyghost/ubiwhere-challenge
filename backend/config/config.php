<?php
// Error reporting level
define('DEBUG', true);
if (DEBUG) {
    error_reporting(E_ALL | E_STRICT);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Appfog connection
$services_json = json_decode(getenv("VCAP_SERVICES"),true);
$mysql_config = $services_json["mysql-5.1"][0]["credentials"];

// Information required to connect to the database
define('DB_HOST', $mysql_config["hostname"]);
define('DB_NAME', $mysql_config["name"]);
define('DB_PORT', $mysql_config["port"]);
define('DB_USER', $mysql_config["username"]);
define('DB_PASS', $mysql_config["password"]);

// Default timezone used by all date/time functions
date_default_timezone_set('Europe/London');

// Set PHP config values
ini_set('register_globals', 'Off');
ini_set('short_open_tag', 'Off');
ini_set('session.cookie_lifetime', 0); // until browser is restarted
ini_set('session.gc_maxlifetime', 3600); // number of seconds (1 hour)
if (get_magic_quotes_runtime()) {
    set_magic_quotes_runtime(0);
}

// Required files
require_once ROOT_DIR . '/library/Exceptions.php';
require_once ROOT_DIR . '/library/Loader.php';
require_once ROOT_DIR . '/library/Model.php';
require_once ROOT_DIR . '/library/Router.php';
// ZF base controller (optional)
require_once APP_DIR . '/controllers/Controller.php';

// Include path
set_include_path(ROOT_DIR . '/library' . PATH_SEPARATOR . APP_DIR . '/models');
spl_autoload_register(array('Loader', 'autoload'));



