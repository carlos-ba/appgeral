import argparse
import random
import time
from datetime import datetime

import requests


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://localhost:8000/api/telemetry/ingest")
    parser.add_argument("--device-key", required=True)
    parser.add_argument("--interval", type=int, default=5)
    args = parser.parse_args()

    while True:
        payload = {
            "temperature": round(random.uniform(-5, 15), 2),
            "pressure": round(random.uniform(1.0, 3.5), 2),
            "recorded_at": datetime.utcnow().isoformat(),
        }
        response = requests.post(
            args.url,
            json=payload,
            headers={"x-device-key": args.device_key},
            timeout=10,
        )
        print(response.status_code, response.text)
        time.sleep(args.interval)


if __name__ == "__main__":
    main()
