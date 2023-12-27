FROM busybox:musl AS deploy

EXPOSE 80

RUN adduser -D static
USER static
WORKDIR /home/static

COPY ./files /data/www
COPY httpd.conf /data/httpd.conf

CMD ["busybox", "httpd", "-f", "-v", "-p", "80", "-h", "/data/www", "-c", "/data/httpd.conf"]
