FROM alpine:latest AS build

COPY ./files/assets/pdfs /pdfs
COPY ./unsplit_file.sh /unsplit_file.sh
RUN apk add --no-cache coreutils xz
RUN /unsplit_file.sh /pdfs
RUN unxz /pdfs/*.xz

FROM busybox:musl AS deploy

EXPOSE 80

RUN adduser -D static
USER static
WORKDIR /home/static

COPY ./files /data/www
COPY --from=build /pdfs /data/www/assets/pdfs

CMD ["busybox", "httpd", "-f", "-v", "-p", "80", "-h", "/data/www"]
