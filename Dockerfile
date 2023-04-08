FROM node:alpine
WORKDIR /app

COPY package.json .
RUN npm i
COPY . .

ENV PORT=8080
ENV DB_HOST=localhost
ENV DB_DATABASE=mizule
ENV DB_USER=postgres
ENV DB_PASSWORD=Mizule@123
ENV EMAIL=mizuleofficial@gmail.com
ENV PASS=ygmmtqnpltbbpuwj
ENV BASE_URL=http://3.109.4.187/api
ENV SECRET=yfuhkdjcvdgsyhilugyfhidljfurelsjdgyjuwiadsiUCoydfugskhdaliteg7rwuqhelkfgiuyeudfogbikrhql3giudfhldwefigyulefkiugehdljafskyidgrufeoljbkdghyrieui

EXPOSE 8080
EXPOSE 5432
CMD ["npm","start"]