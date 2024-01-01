FROM alpine:latest AS build

COPY ./files /files
COPY ./unsplit_file.sh /unsplit_file.sh
RUN apk add --no-cache coreutils xz
RUN /unsplit_file.sh /files/assets/pdfs
RUN unxz /files/assets/pdfs/*.xz

FROM busybox:musl AS deploy

EXPOSE 80

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build /files /data/www/

CMD ["busybox", "httpd", "-f", "-v", "-p", "80", "-h", "/data/www"]
