# Use Node.js LTS (Iron)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]