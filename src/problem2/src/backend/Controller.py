from pydantic import BaseModel;
from flask import Blueprint, request;
from requests import get, Response, codes;

blueprint = Blueprint("Controller", __name__)

class CurrencyExchange(BaseModel):
  currency: str
  date: str
  price: int

@blueprint.route("/currency/exchange", methods=["POST"])
def exchange_currency():
  response: Response = get("https://interview.switcheo.com/prices.json")
  if (response.status_code != codes.ok):
    return {
      "status": response.status_code,
      "success": False,
      "message": "Cannot get currency exchange rate",
      "data": None
    }

  lookup: dict = {}
  prices: list[CurrencyExchange] = response.json()
  for price in prices:
    lookup.update({price.currency: price.price})

  request_body: dict  = request.get_json()
  from_currency: str  = request_body.get("from")
  to_currency: str    = request_body.get("to")
  amount_in: float    = float(request_body.get("amount", 0))

  if (
    from_currency not in lookup or
    to_currency not in lookup or
    amount_in <= 0
  ):
    return {
      "status": 400,
      "success": False,
      "message": "Invalid request",
      "data": None
    }

  from_price: float   = lookup[from_currency]
  to_price: float     = lookup[to_currency]
  amount_out: float   = (amount_in * from_price) / to_price

  return {
    "status": 200,
    "success": True,
    "message": "Exchange currency successfully",
    "data": {
      "from": from_currency,
      "amount_in": amount_in,
      "to": to_currency,
      "amount_out": amount_out
    }
  }

@blueprint.route("/health", methods=["GET"])
def health():
  return "healthy"