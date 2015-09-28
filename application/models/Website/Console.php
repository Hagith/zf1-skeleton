<?php

namespace Website;

use Symfony\Component\Console\Application;
use Symfony\Component\Finder\Finder;

class Console extends Application
{
    /**
     * Add a namespace to autoload commands from
     *
     * @param $namespace
     * @param $directory
     * @return self
     */
    public function addAutoloadNamespace($namespace, $directory)
    {
        foreach ($this->findNamespaceCommands($namespace, $directory) as $className) {
            $this->add(new $className());
        }

        return $this;
    }

    /**
     * Find all commands in a namespace. Commands must extend Symfony\Component\Console\Command\Command and
     * have its name ending in Command (e.g. AwesomeCommand).
     *
     * @param $namespace
     * @param $directory
     * @return array
     */
    public function findNamespaceCommands($namespace, $directory)
    {
        $commands = [];

        if (!(file_exists($directory) && is_dir($directory))) {
            return $commands;
        }

        $finder = new Finder();
        $finder
            ->files()
            ->in($directory)
            ->name('*Command.php');

        /** @var \SplFileInfo $file */
        foreach ($finder as $file) {
            $subNamespace = trim(str_replace($directory, '', $file->getPath()), '/');
            if (!empty($subNamespace)) {
                $subNamespace = str_replace('/', '\\', $subNamespace);
                $subNamespace = '\\' . $subNamespace;
            }

            $class = $namespace . $subNamespace . '\\' . $file->getBasename('.php');
            if (class_exists($class)) {
                $reflector = new \ReflectionClass($class);
                if ($reflector->isInstantiable() && $reflector->isSubclassOf('Symfony\\Component\\Console\\Command\\Command')) {
                    $commands[] = $class;
                }
            }
        }

        return $commands;
    }
}
