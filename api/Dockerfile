FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

ENV JWT_SECRET=aes2er132ewr4
ENV GOOGLE_CLIENT_ID=851906765277-sj6hrt33q346ooqm6i4c3ogt5tcnqh95.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV CALLBACK_URL=http://localhost:5000/api/v1/oauth2/redirect/google
ENV MONGODB_URI=mongodb://mongodb:27017/easyhome
ENV HOST_URL_FRONTEND=http://localhost:3000
ENV HOST_URL_BACKEND=http://localhost:5000/api/v1

CMD [ "npm", "run", "start:dev" ]