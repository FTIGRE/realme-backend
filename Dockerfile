# Use the official Node.js image
FROM node:20.3.1

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]