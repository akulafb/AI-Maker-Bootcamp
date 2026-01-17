# Start with a lightweight web server image
FROM nginx:alpine

# Copy all your website files into the web server's directory
COPY . /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Tell Docker that this container listens on port 8080
EXPOSE 8080

# nginx will automatically substitute $PORT in the template
CMD ["nginx", "-g", "daemon off;"]
