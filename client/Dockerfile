FROM node

WORKDIR /app

ENV NEXTAUTH_SECRET=asdq1fwer548s
ENV NEXT_PUBLIC_GOOGLE_ID=851906765277-sj6hrt33q346ooqm6i4c3ogt5tcnqh95.apps.googleusercontent.com
ENV NEXT_PUBLIC_GOOGLE_SECRET=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
ENV NEXT_PUBLIC_BACKEND=http://localhost:5000/api/v1

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]