from typing import Optional;
from flask import Blueprint, request, jsonify;
from requests import get, Response, codes;

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

  return jsonify({
    "status": codes.ok,
    "success": True,
    "message": "Exchange currency successfully",
    "data": {
      "from": from_currency,
      "amount_in": amount_in,
      "to": to_currency,
      "amount_out": amount_out
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

  return jsonify({
    "status": codes.ok,
    "success": True,
    "message": "Get currency exchange rate successfully",
    "data": [price.currency for price in prices]
  })

@blueprint.route("/health", methods=["GET"])
def health():
  return "healthy"