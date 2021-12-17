FROM alpine:3.9


RUN apk update && apk add --no-cache ca-certificates

WORKDIR /drone/src

COPY wecomchan /usr/local/bin/wecomchan

ENTRYPOINT ["wecomchan"]