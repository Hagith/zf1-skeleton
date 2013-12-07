<?php

require_once((is_readable('application/configs/env.php'))
    ? 'application/configs/env.php'
    : 'application/configs/env.php.dist'
);

/** Modern_Application */
require_once 'Modern/Application.php';

// Create application, bootstrap, and run
$application = new Modern_Application(
    ENVIRONMENT,
    APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap()->run();
