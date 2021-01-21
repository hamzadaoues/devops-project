FROM node:14
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN make install
EXPOSE 3000
CMD ["node", "index.js"]