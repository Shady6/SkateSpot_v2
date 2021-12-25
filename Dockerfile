FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 80

copy *.sln ./
copy ./Backend ./Backend

RUN dotnet restore
RUN dotnet publish -c Release -r linux-x64 -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "SkateSpot.Api.dll"]