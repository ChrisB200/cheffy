# Use the official Node.js image from Docker Hub
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install the app dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on (typically 3000 for Node.js apps)
EXPOSE 8000

# Command to run the app
CMD ["node", "src/server.js"]
