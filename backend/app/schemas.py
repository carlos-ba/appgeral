from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


class DeviceCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)


class DeviceOut(BaseModel):
    id: int
    name: str
    api_key: str

    class Config:
        from_attributes = True


class TelemetryIn(BaseModel):
    temperature: float
    pressure: float | None = None
    recorded_at: datetime | None = None


class TelemetryOut(BaseModel):
    id: int
    device_id: int
    temperature: float
    pressure: float | None = None
    recorded_at: datetime

    class Config:
        from_attributes = True
