# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm ci

# Copy source files
COPY src/ ./src/

# Build the bundled application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Add labels for container registry
LABEL org.opencontainers.image.source="https://github.com/NeonGamerBot-QK/crc"
LABEL org.opencontainers.image.description="Cloud Resume Project"

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Copy only the bundled output from builder stage
COPY --from=builder /app/dist ./dist

# Create directory for database file with correct permissions
RUN mkdir -p /app/data && chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV DB_PATH=/app/data/db.json

# Run the bundled application
CMD ["node", "dist/index.js"]
