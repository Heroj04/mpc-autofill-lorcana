from typing import Optional, Type

from django.conf import settings

from cardpicker.integrations.base import GameIntegration
from cardpicker.integrations.lorcana import Lorcana


def get_configured_game_integration() -> Optional[Type[GameIntegration]]:
    integrations: dict[str, Type[GameIntegration]] = {integration.__name__: integration for integration in [Lorcana]}
    return integrations.get(settings.GAME) if settings.GAME else None
