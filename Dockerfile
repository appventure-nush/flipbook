FROM busybox:musl AS deploy

EXPOSE 80

COPY . /data/www
RUN mv /data/www/httpd.conf /data/httpd.conf

RUN adduser -D static
USER static
WORKDIR /home/static

CMD ["busybox", "httpd", "-f", "-v", "-p", "80", "-h", "/data/www", "-c", "/data/httpd.conf"]
