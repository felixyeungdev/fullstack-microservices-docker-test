# Example Microservices with Docker

## Folder Structure
```
.
├── backend
│   └── services
│       ├── orders
│       ├── products
│       ├── restaurants
│       ├── shops
│       ├── transactions
│       └── users
├── frontend
│   └── web
└── gateway
```

## Run
### Production
```sh
docker compose build
docker compose up
```

Visit http://localhost:80/


### Development
```sh
docker compose -f docker-compose.dev.yaml build
docker compose -f docker-compose.dev.yaml up
```

Visit http://localhost:80/
