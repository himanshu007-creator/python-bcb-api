from fastapi import FastAPI, Path
from typing import Optional
from bcb import currency as cr
import pandas as pd
from bcb import sgs
from datetime import date, datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Python-BCB v1.0.0',
              description='An API integrating functionality of <a href="https://github.com/wilsonfreitas/python-bcb">Python-bcb</a> module. Made by <a href="https://github.com/himanshu007-creator">Himanshu</a>')

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
def root():
    """
    **welcome!**
    """
    return{"Hi!": "please visit /docs for documentation"}


@app.get("/currency_id_list/", tags=["currency"])
def c_id_list(symbols: str):
    """
    - **Request**:
        - **symbols**: symbol/symbols of currency eg USD
    - **Response**:
        - list with ID of the currencies identified by given symbols
    """
    symbols = symbols.split(',')
    l = []
    for i in symbols:
        i = i.upper()
        x = str(cr.get_currency_id(i))
        l.append({
            i: x,
        })
    return l


@app.get("/currency_list/", tags=["currency"])
def c_list(*, type: Optional[str] = None):
    """
    - **Request**:
        - **types [Optional]**: possible values (A or B)
    - **Response**:
        - get informations of currencies whose type is in types
    """
    x = cr.get_currency_list()
    x = x.values.tolist()
    l = []
    if(type is None):
        for i in x:

            y = {
                "code": i[0],
                "name": i[1],
                "symbol": i[2],
                "country_code": i[3],
                "country_name": i[4],
                "type": i[5],
                "execution_date": i[6]
            }
            l.append(y)
    else:
        type = type.capitalize()
        for i in x:
            y = {
                "code": i[0],
                "name": i[1],
                "symbol": i[2],
                "country_code": i[3],
                "country_name": i[4].strip(),
                "type": i[5],
                "execution_date": i[6]
            }
            if(y["type"] == type):
                l.append(y)
    return l


@app.get("/currency_id/", tags=["currency"])
def c_id(symbol: str):
    """
    - **Request**:
        - **symbol**: symbol of currency eg USD
    - **Response**:
        - ID of currency identified by symbol
    """
    x = str(cr.get_currency_id(symbol.upper()))
    return{"country": symbol,
           "ID": x}


@app.get("/currency_type/", tags=["currency"])
def c_type(symbols: str):
    """
    - **Request**:
        - **symbols**: symbol/symbols of currency eg USD
    - **Response**:
        - type of currencies (A or B) given by symbols
    """
    ans = []
    x = cr.get_currency_list().values.tolist()
    symbols = [i.upper() for i in symbols.split(',')]
    l = []
    for j in symbols:
        for i in x:
            if(i[2] == j.upper()):
                d = {'symbol': j, 'type': str(i[5])}
                l.append(d)
    return l


@ app.get("/currency/", tags=["currency"])
def read_item(symbols: str, start_date: str, end_date: str, side: Optional[str] = None, group_by: Optional[str] = None):
    """
    - **Request**:
        - **symbols**: symbol/symbols of currency eg USD
        - **start_date**: format [yyyy-mm-dd]
        - **end_date**: format [yyyy-mm-dd]
        - **side [Optional]**
        - **group_by [Optional]**
    - **Response**:
        - series of rates quoted in BRL from start_date till end_date
    """
    ans = []
    symbols = [i.upper() for i in symbols.split(',')]
    symbols = symbols if(len(symbols) >= 2) else symbols[0]
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    if(side is not None and group_by is not None):
        df = cr.get(symbols, start_date, end_date,
                    side=side, group_by=group_by).to_dict()
        for i in df:
            ans.append({'country': i,
                        'data': [{'date': k, 'rate': v} for k, v in df[i].items()]})
    elif((side is not None and group_by is None) or (side is None and group_by is not None)):
        ans = {"resp": "invalid **Response**"}
    else:
        df = cr.get(symbols, start_date, end_date).to_dict()
        for i in df:
            ans.append({'country': i,
                        'data': [{'date': k, 'rate': v} for k, v in df[i].items()]})
    return ans


@ app.get("/bidask/", tags=["currency"])
def bid_ask(symbol: str, start_date: str, end_date: str):
    """
    - **Request**:
        - **symbol**: symbol of currency eg USD
        - **start_date**: format [yyyy-mm-dd]
        - **end_date**: format [yyyy-mm-dd]
    - **Response**:
        - series of bid and ask rates quoted in BRL from start_date till end_date
    """
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    ask = {}
    bid = {}
    symbol = symbol.upper()
    df = cr.get_symbol(symbol, start_date, end_date).to_dict()
    for i in df:
        name = i[1]

        val = df[i]
        for j, k in val.items():
            lt = []
            d = {
                "date": j,
                "value": k
            }
            lt.append(d)
            if(i[1] == 'ask'):
                if(name in ask.keys()):
                    ol = ask[name]
                    ol.extend(lt)
                    ask[name] = ol
                else:
                    ask[name] = lt
            elif(i[1] == 'bid'):
                if(name in bid.keys()):
                    ol = bid[name]
                    ol.extend(lt)
                    bid[name] = ol
                else:
                    bid[name] = lt
    ans = {}
    ans.update(ask)
    ans.update(bid)
    return(ans)


@ app.get("/sgs/", tags=["sgs"])
def get_sgs(codes: str, start_date: str, end_date: str, last: Optional[int] = None, join: Optional[bool] = False):
    """
    - **Request**:
        - **codes**: eg {'IPCA': 433, 'IGPM': 189}
        - **start_date**: format [yyyy-mm-dd]
        - **end_date**: format [yyyy-mm-dd]
        - **last [Optional]**
        - **join [Optional]**
    - **Response**:
        -series of IPCA/IPCM BRL rates for a given codes
    """
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    join = 'false' if(join == 'false') else 'true'
    ans = {}
    code = eval(codes)
    if(last is not None and (join == 'true')):
        ans = sgs.get(code, start_date, end_date, last, join=True)
    elif(last is None and (join == 'true')):
        ans = sgs.get(code, start_date, end_date, join=True).to_dict()
    elif(last is None and (join == 'false')):
        df = sgs.get(code, start_date, end_date)
        for i in df:
            ans.update(i.to_dict())
    return ans
