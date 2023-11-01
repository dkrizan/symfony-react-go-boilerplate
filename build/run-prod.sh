#!/bin/bash

# Run DB migrations
php bin/console d:m:m -n

# Clear cache
php bin/console cache:clear

# Run apache server
apache2-foreground