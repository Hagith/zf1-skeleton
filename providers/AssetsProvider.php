<?php

/**
 * ModernWeb
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.modernweb.pl/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to kontakt@modernweb.pl so we can send you a copy immediately.
 *
 * @category    Modern
 * @package     Website_Tool
 * @author      Rafał Gałka <rafal@modernweb.pl>
 * @copyright   Copyright (c) 2007-2013 ModernWeb (http://www.modernweb.pl)
 * @license     http://www.modernweb.pl/license/new-bsd     New BSD License
 */

/**
 * @category    Modern
 * @package     Website_Tool
 * @author      Rafał Gałka <rafal@modernweb.pl>
 * @copyright   Copyright (c) 2007-2013 ModernWeb (http://www.modernweb.pl)
 */
class AssetsProvider extends Zend_Tool_Project_Provider_Abstract
{
    const JAVASCRIPT_SOURCE_DIR = 'application/assets/javascripts';
    const JAVASCRIPT_TARGET_DIR = 'public/assets/javascripts';

    public function compile()
    {
        $this->compass('compile');

        foreach (new DirectoryIterator(self::JAVASCRIPT_SOURCE_DIR) as $fileInfo) {
            if (!$fileInfo->isFile()) {
                continue;
            }

            // uncompressed target
            $target = self::JAVASCRIPT_TARGET_DIR . '/' . $fileInfo;
            $this->coyote(
                $fileInfo->getPathname() . ':'  .
                $target
            );
            // compressed target
            $target = str_replace('.js', '.min.js', $target);
            $this->coyote(
                '-c ' .
                $fileInfo->getPathname() . ':'  .
                $target
            );
        }
    }

    public function watch()
    {
    }

    public function compass($cmd = null)
    {
        system("compass $cmd");
    }

    public function coyote($cmd = null)
    {
        system("coyote $cmd");
    }

}
