from bcb import currency, sgs, utils
import pprint
l = []
df = currency.get(['USD', 'EUR'], start_date='2000-01-01',
                  end_date='2001-01-5').to_dict()
for i in df:
    l.append({'country': i,
              'rates': df[i]})
for i in l:
    print(i['country'])
# pprint.pprint(l)
