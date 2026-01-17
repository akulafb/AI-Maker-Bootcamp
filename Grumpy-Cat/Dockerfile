# Start with a lightweight web server image
FROM nginx:alpine

# Copy all your website files into the web server's directory
COPY . /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Tell Docker that this container listens on the Railway PORT
EXPOSE $PORT

# nginx will automatically substitute $PORT in the template
CMD ["nginx", "-g", "daemon off;"]
