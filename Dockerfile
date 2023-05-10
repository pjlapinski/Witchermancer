#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /
RUN apt-get update; \
    apt-get install -y curl; \
    curl -sL https://deb.nodesource.com/setup_18.x | bash; \
    apt-get install -y nodejs
COPY ["server/server.csproj", "server/"]
RUN dotnet restore "server/server.csproj"
WORKDIR "/src/server"
COPY ["server/", "./"]
RUN dotnet build "server.csproj" -c Release -o /app/build
RUN dotnet dev-certs https -t
WORKDIR "/src/frontend"
COPY ["client/package.json", "client/package-lock.json", "./"]
RUN npm i
RUN node scripts/fetchLocalization.js
COPY ["client/", "./"]
ENV npm_package_name="witchermancer"
RUN node scripts/aspnetcore-https.js
RUN npm run build

FROM build AS publish
WORKDIR "/src/server"
RUN dotnet publish "server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN ls
ENTRYPOINT ["dotnet", "Witchermancer.dll"]
