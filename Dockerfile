FROM smuellner/alpine-lighttpd

COPY --chown=www:www . /var/www
