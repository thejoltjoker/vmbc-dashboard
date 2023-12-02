# Use an official Node.js runtime as a base image
FROM --platform=linux/amd64 node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run the command to start your app
CMD [ "npm", "start" ]
