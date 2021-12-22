FROM alpine:latest

WORKDIR /srv

EXPOSE 3333

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]

CMD ["/usr/bin/node", "src/app.js"]

RUN apk add dumb-init yarn && \
    adduser -D -h /srv srv && \
    chown -R srv:srv /srv

USER srv

COPY --chown=srv:srv ./package.json ./yarn.lock /srv/

RUN yarn install

COPY --chown=srv:srv ./src /srv/src
