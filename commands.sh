#!/bin/bash

# Simple command shortcuts for Good Way Travels project
# Usage: ./commands.sh <command> [arguments]

case "$1" in
    "students")
        case "$2" in
            "add")
                echo "Adding student record..."
                echo "Student management feature will be implemented here"
                ;;
            "list")
                echo "Listing students..."
                echo "Student list feature will be implemented here"
                ;;
            "remove")
                echo "Removing student record..."
                echo "Student removal feature will be implemented here"
                ;;
            *)
                echo "Usage: ./commands.sh students [add|list|remove]"
                ;;
        esac
        ;;
    "serve")
        echo "Starting local development server..."
        if command -v python3 &> /dev/null; then
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            python -m SimpleHTTPServer 8000
        else
            echo "Python not found. Please install Python to run local server."
        fi
        ;;
    "deploy")
        echo "Deploying to GitHub Pages..."
        git add .
        git commit -m "Deploy updates"
        git push origin main
        echo "Deployment complete!"
        ;;
    "build")
        echo "Building project..."
        echo "No build process required for static HTML project"
        echo "Project is ready to serve!"
        ;;
    "test")
        echo "Running tests..."
        echo "Opening inquiry page in browser for manual testing..."
        if command -v xdg-open &> /dev/null; then
            xdg-open inquiry.html
        elif command -v open &> /dev/null; then
            open inquiry.html
        else
            echo "Please open inquiry.html in your browser manually"
        fi
        ;;
    "help"|"--help"|"-h")
        echo "Available commands:"
        echo "  students add    - Add a new student record"
        echo "  students list   - List all students"
        echo "  students remove - Remove a student record"
        echo "  serve          - Start local development server"
        echo "  deploy         - Deploy to GitHub"
        echo "  build          - Build the project"
        echo "  test           - Test the application"
        echo "  help           - Show this help message"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Use './commands.sh help' to see available commands"
        ;;
esac