# DataStory Collector

DataStory Collector is a tool designed to help organizations collect and manage "data stories"—descriptions of business problems, required metrics, and desired outcomes. It bridging the gap between business needs and data implementation by providing a structured way to capture requirements.

## Features

- **Story Collection**: Capture pain points and desired data outcomes from business users.
- **Structured Configuration**: Define available actions, metrics, dimensions, and sources via `config.json`.
- **Modern UI**: A responsive React-based frontend for easy story management.
- **Backend API**: A FastAPI-powered backend for storing and retrieving stories.

## Deployment

### Using Docker Compose (Recommended)

The easiest way to get started is using Docker Compose, which sets up both the application and a PostgreSQL database.

1. Clone the repository.
2. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```
   The application will be available at `http://localhost:8000`.

### Using Docker Image

You can run the pre-built container image directly:

```bash
docker run -p 8000:80 \
  -e DATASTORY_DATABASE_URL=postgresql://user:password@host:port/db \
  ghcr.io/koslab/datastory-collector:latest
```

### Deploying with Helm (Kubernetes)

For Kubernetes environments, a Helm chart is provided in the `charts/datastory-collector` directory.

```bash
helm install my-datastory ./charts/datastory-collector
```

## Configuration

DataStory Collector is configured primarily through a `config.json` file. This file defines the options available to users when they are creating data stories.

### `config.json` Structure

The configuration file allows you to customize the following categories:

- `actions`: Potential outcomes or visualizations (e.g., "view a dashboard").
- `metrics`: Key indicators (e.g., "Total Revenue").
- `dimensions`: Ways to slice the data (e.g., "Region", "Date").
- `sources`: Data source systems (e.g., "Salesforce", "Google Analytics").
- `modules`: Business domains (e.g., "Sales", "Finance").
- `branding`: Customization options like logos.

#### Example `config.json`

```json
{
  "actions": [
    "view an interactive dashboard",
    "generate a scheduled PDF report",
    "download raw data in Excel"
  ],
  "metrics": [
    "Total Revenue",
    "Net Margin",
    "Churn Rate"
  ],
  "dimensions": [
    "Region",
    "Product Category",
    "Date"
  ],
  "sources": [
    "Salesforce",
    "Google Analytics 4",
    "AWS S3 Logs"
  ],
  "modules": [
    "Sales",
    "Finance",
    "Marketing"
  ],
  "branding": {
    "logo": "https://example.com/logo.png"
  }
}
```

### Providing the Configuration

- **In Docker**: Mount your custom `config.json` to `/usr/share/nginx/html/config.json`:
  ```bash
  docker run -v $(pwd)/my-config.json:/usr/share/nginx/html/config.json ...
  ```
- **In Helm**: Update the `datastory_config` section in your `values.yaml`. This will automatically generate a ConfigMap that is mounted into the pod.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATASTORY_DATABASE_URL` | PostgreSQL connection string | `sqlite:///./datastory.db` |
| `VITE_API_BASE_URL` | The base URL for the API (used by frontend) | `/api/v1` |
| `PORT` | The port the application listens on | `8000` |

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.
