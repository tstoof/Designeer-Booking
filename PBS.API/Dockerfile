# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use SDK for building the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the entire project structure
COPY ../PBS.Domain/ PBS.Domain/
COPY ../PBS.Persistence/ PBS.Persistence/
COPY . PBS.API/

WORKDIR /src/PBS.API

# Restore and build
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "PBS.API.dll"]
