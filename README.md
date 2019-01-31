# Long Island Minecraft Server

# Docker
```
docker build -t godsflaw/lomc .
docker run -p 25565:25565 -it -e OPS=godsflaw -e ONLINE_MODE=true -v /Users/godsflaw/minecraft:/minecraft godsflaw/lomc:latest
```
