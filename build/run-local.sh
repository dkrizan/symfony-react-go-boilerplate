#!/bin/bash

# Generate JWT keypair (if not exists)
./bin/console lexik:jwt:generate-keypair --skip-if-exists

# Run composer install
composer install -n

# Run DB migrations
php bin/console d:m:m --no-interaction

# Run apache server
apache2-foreground