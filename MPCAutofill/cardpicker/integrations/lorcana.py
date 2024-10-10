from typing import Type
from urllib.parse import urlparse

from cardpicker.integrations.base import GameIntegration, ImportSite
from cardpicker.models import DFCPair

# region import sites


class Dreamborn(ImportSite):
    @staticmethod
    def get_host_names() -> list[str]:
        return ["dreamborn.ink"]

    @classmethod
    def retrieve_card_list(cls, url: str) -> str:
        path = urlparse(url).path
        deck_id = path.split("/").pop()
        if not deck_id:
            raise cls.InvalidURLException(url)
        deck = cls.request(path=f"api/decks/{deck_id}").json()
        cards = []
        for collector in deck.cards:
            qty = deck.cards[collector]
            set_num = collector.split("-")[0]
            card_num = collector.split("-")[1]
            cards.push((qty, set_num, card_num, ""))
        card_details = cls.request(path=f"cards/fetch?search={";%7C".join(map(lambda qty, set, card, name: f"(set_num={set};card_num={card};)"))}&displayonly=name;set_num;card_num").json()
        for deck_item in cards:
            qty, set, card, name = deck_item
            for card in card_details:
                if (card.Set_Num == set and card.Card_Num == card):
                    deck_item[3] = card.name
                    break
        
        return "\n".join(map(lambda qty, set, card, name: f"{qty}x {name}"))

# endregion


class Lorcana(GameIntegration):
    """
    The Lorcana integration allows for importing decklists from some popular deckbuilding sites.
    """

    # region implementation of abstract methods

    @classmethod
    def get_dfc_pairs(cls) -> list[DFCPair]:
        return []

    @classmethod
    def get_import_sites(cls) -> list[Type[ImportSite]]:
        return [
            Dreamborn
        ]

    # endregion


__all__ = ["Lorcana"]
