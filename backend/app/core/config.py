from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AppGeral"
    api_v1_prefix: str = "/api"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 60 * 24
    database_url: str = "sqlite:///./app.db"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
