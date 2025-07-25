# Vaccine Backend Monitoring with Prometheus & Grafana

## Overview

Dự án này đã được tích hợp monitoring với Prometheus và Grafana để theo dõi:
- Response time của các API endpoints
- Số lượng requests và status codes
- Custom metrics cho các operations cụ thể
- System metrics (CPU, Memory, etc.)

## Setup

### 1. Environment Variables

Các biến môi trường cần thiết đã được thêm vào `backend/.env`:

```bash
# Grafana Configuration
GF_SECURITY_ADMIN_PASSWORD=admin123
GF_SECURITY_ADMIN_USER=admin
GF_SERVER_HTTP_PORT=3000
GF_SERVER_DOMAIN=localhost
GF_USERS_ALLOW_SIGN_UP=false
```

### 2. Docker Services

Docker compose đã được cập nhật với:
- **Prometheus**: Port 9090 - Thu thập metrics
- **Grafana**: Port 3001 - Visualization dashboard

### 3. Start Services

```bash
docker-compose up -d
```

## Accessing Monitoring Tools

### Prometheus
- URL: http://localhost:9090
- Targets: http://localhost:9090/targets (kiểm tra backend metrics)

### Grafana
- URL: http://localhost:3001
- Username: admin
- Password: admin123

### Backend Metrics Endpoint
- URL: http://localhost:8080/metrics
- Format: Prometheus format
```
http://localhost:9090
```

4. Truy cập Grafana:
```
http://localhost:3001
```

## Import Dashboard vào Grafana:

1. Đăng nhập Grafana (admin/admin)
2. Vào Dashboards > Import
3. Upload file `grafana-dashboard.json`
4. Hoặc copy paste nội dung JSON

## Cấu hình Data Source trong Grafana:

1. Vào Configuration > Data Sources
2. Add data source > Prometheus
3. URL: `http://prometheus:9090`
4. Save & Test

## Sử dụng Custom Metrics:

### Trong Controller:
```typescript
import { TrackMetrics } from '../decorators/track-metrics.decorator';

@Controller('users')
export class UserController {
  @Get()
  @TrackMetrics({ 
    operation: 'list_users', 
    searchType: 'pagination', 
    trackDuration: true 
  })
  findAll() {
    // ...
  }
}
```

### Trong Service:
```typescript
constructor(private customMetrics: CustomMetricsService) {}

async someOperation() {
  this.customMetrics.incrementUserOperation('custom_op', 'success');
}
```

## Monitoring Dashboard bao gồm:

1. **HTTP Request Rate** - Tỷ lệ requests/giây
2. **Average Response Time** - Thời gian phản hồi trung bình
3. **HTTP Status Codes** - Phân bố status codes
4. **Requests in Progress** - Số requests đang xử lý
5. **Response Time by Endpoint** - Response time theo từng API
6. **Request Rate by Endpoint** - Request rate theo từng API
7. **Memory Usage** - Sử dụng memory
8. **CPU Usage** - Sử dụng CPU

## Alerts có thể cấu hình:

- Response time > 2s trong 5 phút
- Error rate > 5% trong 5 phút  
- Memory usage > 80%
- CPU usage > 80%
- Request rate tăng đột ngột

## Troubleshooting:

1. **Metrics endpoint không hoạt động:**
   - Kiểm tra backend có chạy không
   - Kiểm tra port 8080

2. **Prometheus không scrape được:**
   - Kiểm tra prometheus.yml config
   - Kiểm tra network connectivity giữa containers

3. **Grafana không kết nối được Prometheus:**
   - Kiểm tra data source URL
   - Kiểm tra cả 2 services đều chạy

## Lệnh hữu ích:

```bash
# Xem logs Prometheus
docker-compose logs prometheus

# Xem logs Grafana  
docker-compose logs grafana

# Restart services
docker-compose restart prometheus grafana

# Xem metrics raw
curl http://localhost:8080/metrics | grep http_requests
```
