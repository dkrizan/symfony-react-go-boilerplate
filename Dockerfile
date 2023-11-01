FROM php:8.2-apache AS base

RUN a2enmod rewrite

RUN apt-get clean \
    && apt-get update \
    && apt-get install -y git \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install libraries
RUN apt-get update && apt-get install -y libpq-dev libzip-dev zip libicu-dev && docker-php-ext-install pdo pdo_pgsql pdo_mysql zip intl

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 80
EXPOSE 443

FROM base AS prod

COPY . /var/www/html
WORKDIR /var/www/html

ADD .env.prod .env
# Run composer install
RUN composer install --no-dev --no-scripts

# Generate JWT keypair (if not exists)
RUN ./bin/console lexik:jwt:generate-keypair --skip-if-exists

RUN chmod a+x ./build/run-prod.sh

CMD ["/bin/sh", "-c", "./build/run-prod.sh"]

FROM prod AS prod-heroku

RUN chmod a+x ./build/run-prod-heroku.sh

CMD ["/bin/sh", "-c", "./build/run-prod-heroku.sh"]

FROM base AS dev
# Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Docker user permissions
RUN usermod -u 1000 www-data

# php.ini
COPY docker/php.ini /usr/local/etc/php/

EXPOSE 9000

ENTRYPOINT []