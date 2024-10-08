import logging
import sys
import time
from os import urandom

from curl_cffi import requests
import execjs


class NegroFormatter(logging.Formatter):
    COLORS = {
        'DBG': '\033[94m',
        'INF': '\033[0m',
        'WAR': '\033[93m',
        'ERR': '\033[91m',
        'SUC': '\033[92m'
    }
    RESET = '\033[0m'

    def format(self, record):
        levelname_short = {
            'DEBUG': 'DBG',
            'INFO': 'INF',
            'WARNING': 'WAR',
            'ERROR': 'ERR',
            'SUCCESS': 'SUC'
        }.get(record.levelname, record.levelname[:3].upper())
        log_color = self.COLORS.get(levelname_short, self.RESET)
        timestamp = self.formatTime(record, "%H:%M:%S")
        log_message = super().format(record)
        return f"{log_color}[{timestamp}] {log_color}{levelname_short:<3}{self.RESET}: {log_message}"

    def formatMessage(self, record):
        levelname_short = {
            'DEBUG': '🛠️',
            'INFO': '📢',
            'WARNING': '⚠️',
            'ERROR': '⛔',
            'SUCCESS': '✅'
        }.get(record.levelname, record.levelname[:3].upper())
        return f"{levelname_short} {super().formatMessage(record)}"

class NegroLogger:
    SUCCESS = 25

    def __init__(self, name='FancyLogger', level=logging.DEBUG):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        if not any(isinstance(h, logging.StreamHandler) for h in self.logger.handlers):
            self._configure_logger()

    def _configure_logger(self):
        handler = logging.StreamHandler(sys.stdout)
        formatter = NegroFormatter()
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

        logging.addLevelName(self.SUCCESS, 'SUCCESS')
        setattr(self.logger, 'success', lambda message, *args, **kwargs: self.logger.log(self.SUCCESS, message, *args, **kwargs))

    def get_logger(self):
        return self.logger


negrologger = NegroLogger().get_logger()




castle_js = execjs.compile(open("castle.js", "r").read())
__cuid = urandom(16).hex()

time.time()
castle_token = castle_js.call("create_castle_token", __cuid, "pk_1Tt6Yzr1WFzxrJCh7WzMZzY1rHpaPudN")

negrologger.success(f"[{time.time() - time.time()}s.] Castle Token: {castle_token[:100]}..")

headers = {
    'sec-ch-ua-platform': '"Windows"',
    'Referer': 'https://signin.rockstargames.com/signin/user-form?cid=rsg',
    'sec-ch-ua': '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'x-castle-request-token': castle_token,
    'sec-ch-ua-mobile': '?0',
    'x-lang': 'en-US',
    'x-requested-with': 'XMLHttpRequest',
    'content-type': 'application/json',
}

json_data = {
    'email': f'{urandom(16).hex()}@gmail.com',
    'password': urandom(16).hex(),
    'keepMeSignedIn': False,
    'fingerprint': '{"fp":{"user_agent":"0af3a18b4829f65865ed84e2f7ad657c","language":"tr-TR","pixel_ratio":1,"timezone_offset":-180,"session_storage":1,"local_storage":1,"indexed_db":1,"open_database":0,"cpu_class":"unknown","navigator_platform":"Win32","do_not_track":"unknown","regular_plugins":"872496686b4bf1a369c31ed7e4b7dacd","canvas":"0a5ac826007e4286ad3a9c7974c1f406","webgl":"1caac62c79dd9bc6e786173a52c088d1","adblock":false,"has_lied_os":true,"touch_support":"0;false;false","device_name":"Chrome on Windows","js_fonts":"0ab4c48ed29474e7e2648ea1657b3574"}}',
    'linkInfo': {
        'shouldLink': False,
        'service': None,
        'username': None,
        'serviceVisibility': None,
    },
    'events': [
        {
            'eventName': 'Sign In Form',
            'eventType': 'page-view',
        },
    ],
}

response = requests.post('https://signin.rockstargames.com/api/login/rsg', headers=headers, json=json_data, impersonate="chrome")

if response.status_code == 400:
    negrologger.success(f"Castle token passed successfully: {response.json()}")