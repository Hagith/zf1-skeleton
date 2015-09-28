<?php

namespace Website\Console\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Website\Console\AbstractCommand;

class ExampleCommand extends AbstractCommand
{
    protected function configure()
    {
        $this
            ->setName('example')
            ->setDescription('Example command')
            ->addOption(
                'option', 'o',
                InputOption::VALUE_OPTIONAL,
                'Example option'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        if ($this->input->hasOption('option')) {
            $this->output->writeln('Called with option: ' . $this->input->getOption('option'));
        } else {
            $this->output->writeln('Called without option');
        }
    }
}
