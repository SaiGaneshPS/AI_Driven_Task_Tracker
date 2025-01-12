FROM rasa/rasa:stable-full

# Set the working directory
WORKDIR /app

# Copy your Rasa project files into the container
COPY . /app

# (Optional) Install additional dependencies if needed
# RUN pip install <your-dependencies>

# Expose Rasa's default port
EXPOSE 5005

# Run Rasa server
CMD ["run", "--enable-api", "--model", "models/", "--port", "5005", "--cors", "*"]