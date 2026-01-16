# Start with a lightweight web server image
FROM nginx:alpine

# Copy all your website files into the web server's directory
COPY . /usr/share/nginx/html

# Tell Docker that this container listens on port 80
EXPOSE 80

# nginx starts automatically, so no CMD needed
