FROM node:10

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

# to debug, current directory try
RUN ls
RUN pwd

EXPOSE 3000

# can use npm start but it masks some errors and can be hard to debug so we
#  will be using node command
# CMD ["npm", "start"]
CMD node index.js

# To build run
# docker build -t <image_name>
