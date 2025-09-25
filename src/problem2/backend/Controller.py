from time import sleep
from typing import Optional;
from requests import get, codes;
from flask import Blueprint, request, jsonify;

from PriceService import PriceService;
from PriceService import CurrencyExchange;

blueprint = Blueprint("Controller", __name__)

@blueprint.route("/exchange", methods=["POST"])
def exchange():
  prices: Optional[list[CurrencyExchange]] = PriceService.search_prices()
  if (not prices):
    return jsonify({
      "status": codes.server_error,
      "success": False,
      "message": "Cannot get currency exchange rate",
      "data": None
    })

  lookup: dict[str, float] = {}
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
    return jsonify({
      "status": codes.bad_request,
      "success": False,
      "message": "Invalid request",
      "data": None
    })

  from_price: float   = lookup[from_currency]
  to_price: float     = lookup[to_currency]
  amount_out: float   = (amount_in * from_price) / to_price
  amount_in_rate: float  = (1 * from_price) / to_price   # how many TO per 1 FROM
  amount_out_rate: float = (1 * to_price) / from_price   # how many FROM per 1 TO

  sleep(0.5)
  return jsonify({
    "status": codes.ok,
    "success": True,
    "message": "Exchange currency successfully",
    "data": {
      "from": from_currency,
      "amount_in": amount_in,
      "to": to_currency,
      "amount_out": amount_out,
      "amount_in_rate": amount_in_rate,
      "amount_out_rate": amount_out_rate
    }
  })

@blueprint.route("/prices/search", methods=["GET"])
def search_prices():
  prices: Optional[list[CurrencyExchange]] = PriceService.search_prices()
  if (not prices):
    return jsonify({
      "status": codes.server_error,
      "success": False,
      "message": "Cannot get currency exchange rate",
      "data": None
    })

  sleep(0.5)
  return jsonify({
    "status": codes.ok,
    "success": True,
    "message": "Get currency exchange rate successfully",
    "data": [price.to_dict() for price in prices]
  })

@blueprint.route("/currency/search", methods=["GET"])
def search_exchanges():
  prices: Optional[list[CurrencyExchange]] = PriceService.search_prices()
  if (not prices):
    return jsonify({
      "status": codes.server_error,
      "success": False,
      "message": "Cannot get currency exchange rate",
      "data": None
    })

  sleep(0.5)
  return jsonify({
    "status": codes.ok,
    "success": True,
    "message": "Get currency exchange rate successfully",
    "data": [price.currency for price in prices]
  })

@blueprint.route("/health", methods=["GET"])
def health():
  return "healthy"