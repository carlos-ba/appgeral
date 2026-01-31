from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app import models, schemas
from app.db import get_db
from app.routers.deps import get_current_user

router = APIRouter(prefix="/telemetry", tags=["telemetry"])


@router.post("/ingest", response_model=schemas.TelemetryOut)
def ingest_telemetry(
    payload: schemas.TelemetryIn,
    db: Session = Depends(get_db),
    x_device_key: str | None = Header(default=None),
):
    if not x_device_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing device key")

    device = db.query(models.Device).filter(models.Device.api_key == x_device_key).first()
    if not device:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid device key")

    telemetry_data = {
        "device_id": device.id,
        "temperature": payload.temperature,
        "pressure": payload.pressure,
    }
    if payload.recorded_at:
        telemetry_data["recorded_at"] = payload.recorded_at

    telemetry = models.Telemetry(**telemetry_data)
    db.add(telemetry)
    db.commit()
    db.refresh(telemetry)
    return telemetry


@router.get("/devices/{device_id}", response_model=list[schemas.TelemetryOut])
def list_telemetry(
    device_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    device = (
        db.query(models.Device)
        .filter(models.Device.id == device_id, models.Device.user_id == current_user.id)
        .first()
    )
    if not device:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Device not found")

    return (
        db.query(models.Telemetry)
        .filter(models.Telemetry.device_id == device_id)
        .order_by(models.Telemetry.recorded_at.desc())
        .limit(500)
        .all()
    )
