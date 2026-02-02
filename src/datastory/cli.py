import argparse
import uvicorn


def main():
    parser = argparse.ArgumentParser(description="DataStory CLI")
    subparsers = parser.add_subparsers(dest="command")

    serve_parser = subparsers.add_parser("serve", help="Run the FastAPI server")
    serve_parser.add_argument("--host", default="0.0.0.0", help="Host to bind to")
    serve_parser.add_argument("--port", type=int, default=8000, help="Port to bind to")

    args = parser.parse_args()

    if args.command == "serve":
        uvicorn.run("datastory.main:app", host=args.host, port=args.port, reload=True)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
