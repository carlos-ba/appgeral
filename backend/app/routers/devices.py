import secrets
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.db import get_db
from app.routers.deps import get_current_user

router = APIRouter(prefix="/devices", tags=["devices"])


@router.post("", response_model=schemas.DeviceOut)
def create_device(
    device_in: schemas.DeviceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    device = models.Device(
        name=device_in.name,
        api_key=secrets.token_urlsafe(32),
        user_id=current_user.id,
    )
    db.add(device)
    db.commit()
    db.refresh(device)
    return device


@router.get("", response_model=list[schemas.DeviceOut])
def list_devices(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return db.query(models.Device).filter(models.Device.user_id == current_user.id).all()
