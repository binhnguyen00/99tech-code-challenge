from typing import Union;
from pydantic import BaseModel;
from requests import HTTPError, get, Response, codes;

class CurrencyExchange(BaseModel):
  currency: str
  date: str
  price: float

  def to_dict(self):
    return {"currency": self.currency, "date": self.date, "price": self.price}

class PriceService():

  @staticmethod
  def search_prices() -> Union[list[CurrencyExchange], None]:
    try:
      response: Response = get("https://interview.switcheo.com/prices.json")
      response.raise_for_status()
    except HTTPError as e:
      print(e)
      return None

    if (response.status_code != codes.ok):
      print("response.status_code: ", response.status_code)
      return None

    if (type(response.json()) is not list):
      return None

    seen = set()
    purified: list[CurrencyExchange] = []
    prices: list[CurrencyExchange] = [ CurrencyExchange(**price) for price in response.json() ]
    for price in prices:
      key = price.currency
      if (key in seen):
        continue
      seen.add(key)
      purified.append(price)

    return purified