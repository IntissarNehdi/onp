# Bachelor Praktikum: Online-Nominierungsplattform

## Setup and Commands

To get started with the project and manage the services, follow the steps below. The project uses **Docker** for containerization and **Docker Compose** to manage services.

### Mandatory Commands

These commands are required to set up and run the application. You must run them in the order provided.

1. **Build and start the containers**:
   This command builds the services defined in `docker-compose.yml` .

   ```bash
   docker-compose up --build
   ```

   - `--build` ensures that Docker rebuilds the images.

2. **Access the backend container**:
   To run backend commands like migrations or check logs, you need to access the backend container. Run the following command to open a shell inside the `backend` container:

   ```bash
   docker-compose exec backend bash
   ```

   - This command allows you to interact with the backend service.

3. **Run Django migrations**:
   After starting the backend container, you need to run database migrations to set up the SQLite database. Inside the `backend` container, run:

   ```bash
   python manage.py migrate
   ```

   - This command applies the database schema and prepares the database for use.

### Optional Commands

These commands can be used to manage your services or troubleshoot if necessary.

1. **Restart a specific service**:
   If you need to restart a particular service (for example, the backend service), you can use this command:

   ```bash
   docker-compose restart <service-name>
   ```

   - Replace `<service-name>` with the name of the service you wish to restart (e.g., `frontend` or `backend`).

2. **Access a specific container**:
   If you need to access a running container directly (e.g., for debugging or troubleshooting), use this command:

   ```bash
   docker exec <container-name> sh
   ```

   - Replace `<container-name>` with the name of the container. You can find the container name by running `docker ps`.

### Additional Useful Commands

Here are a few more helpful Docker-related commands:

1. **Check running containers**:
   To list all running containers and their details, use the following command:

   ```bash
   docker ps
   ```

2. **Stop all running containers**:
   If you want to stop all containers running with Docker Compose, use:

   ```bash
   docker-compose down
   ```

   - This stops and removes the containers, networks, and volumes created by `docker-compose up`.

3. **View logs for a specific service**:
   If you want to view the logs of a specific service, you can use:

   ```bash
   docker-compose logs <service-name>
   ```

   - Replace `<service-name>` with the service you want to check logs for (e.g., `frontend` or `backend`).

4. **Rebuild the containers**:
   If you make changes to the Dockerfile or the application code and need to rebuild the images, run:

   ```bash
   docker-compose up --build
   ```

   - This command forces a rebuild of the Docker images.

5. **Run Django development server (in container)**:
   If you need to manually run the Django development server (after logging into the backend container), use:

   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

   - This command runs the Django application on port 8000, which is mapped to the host.

---

### Notes

- Make sure Docker and Docker Compose are installed and running before using any of the above commands.
- You can customize the `docker-compose.yml` file to include additional services or modify existing ones based on your requirements.

By following these commands, you should be able to successfully set up, manage, and troubleshoot the Online-Nominierungsplattform project.
