# 1. Build stage
FROM golang:1.24-alpine AS builder

# Enable Go modules, install tools
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

WORKDIR /app

# Cache dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy source
COPY . .

# Build binary
RUN go build -o mailer ./main.go

# 2. Runtime stage
FROM alpine:latest

# Create non-root user for security
RUN adduser -D -g '' appuser

# Set working directory and copy binary + static files
WORKDIR /app
COPY --from=builder /app/mailer .

# Use non-root user
USER appuser

# Expose HTTP port
EXPOSE 8080

# Run the app
ENTRYPOINT ["./mailer"]
