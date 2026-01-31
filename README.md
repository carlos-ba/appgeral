# AppGeral

Plataforma de monitoramento de refrigeração com IoT + FastAPI + Next.js. O objetivo
é evoluir para um SaaS com ingestao de dados, series temporais e dashboards.

## Stack
- Backend: Python + FastAPI
- Frontend: Next.js (TypeScript)
- Banco: PostgreSQL (via Docker) ou SQLite local
- Dashboards: Grafana (futuro)

## Estrutura
- `backend/`: API FastAPI, auth, ingestao e modelos
- `frontend/`: Web app Next.js
- `scripts/`: scripts utilitarios (ex: simulador de dispositivo)

## Setup rapido

### Backend
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

### Banco (opcional)
```powershell
docker compose up -d
```

Atualize o `DATABASE_URL` em `backend/.env` para usar Postgres.

## Fluxo basico
1) Registrar usuario
2) Logar para pegar token
3) Criar dispositivo (gera `api_key`)
4) Enviar telemetria com `x-device-key`

### Exemplos
```powershell
# register
curl -X POST http://localhost:8000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"you@email.com\",\"password\":\"Senha1234\"}"

# login (gets token)
curl -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/x-www-form-urlencoded" -d "username=you@email.com&password=Senha1234"

# create device (use token)
curl -X POST http://localhost:8000/api/devices -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d "{\"name\":\"Freezer A\"}"
```

### Simular dados
```powershell
python scripts\simulate_device.py --device-key <API_KEY>
```

## Proximos passos
- Configurar Grafana com Postgres
- Deploy AWS (Elastic Beanstalk + RDS + S3/CloudFront)
- Autenticacao avancada e multi-tenant
