# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .
COPY ../shared ../

# Expose the port the app runs on
EXPOSE 8080

# Run the command to start your app
CMD [ "npm", "start" ]
