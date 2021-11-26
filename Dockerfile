FROM node:14.15.5

LABEL version="1.0"
LABEL maintainer = ["tienlm@infoplusvn.com"]

WORKDIR /opt/app

COPY ["package.json","package-lock.json","./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm" , "start"]


