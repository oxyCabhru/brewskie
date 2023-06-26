test() {
    if [[ $? -ne 0 ]]; then
        echo "Docker build failed. Try running this script with root privileges (sudo)"
        exit 1
    fi
}
docker build -t brewskie:latest . ; test
docker-compose up -d ; test
