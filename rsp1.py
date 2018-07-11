import csv
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math

curr_month = 0
DayIdx = 0
IdxLast = 0
RSP_cnt = 1
do_month = True
df = 0
RSP_Capital = 1000
RSP_units = 0
RSP_bal = 0
RSP_total_units = 0
RSP_close = 0
RSP_avg_cost = 0
RSP_unit_delta = 0
RSP_cgain = 0
RSP_closs = 0

#df2 = pd.DataFrame(columns=['Date','Fresh','P.close','New Units', 'Carry-over', 'Total Units'])
COLUMNS = ['Cnt','Date','Fresh','P.close','New Units', 'Carry-over', 'Total Units', 'Avg Cost','RSP_unit_delta']
rsp_array = []

def rounddown100(x):
  return int(math.floor(x / 100.0)) * 100

def doRSP(index):
  global do_month
  global df
  global RSP_bal
  global RSP_total_units
  global RSP_close
  global df2
  global rsp_array
  global RSP_cgain
  global RSP_closs

  do_month = False
  RSP_close = df.iloc[index]['Close']
  RSP_fresh = RSP_Capital + RSP_bal
  RSP_units = rounddown100(RSP_fresh / RSP_close)
  RSP_total_units += RSP_units
  RSP_bal = round((RSP_fresh - (RSP_units * RSP_close)),2)
  RSP_avg_cost = round(((RSP_fresh * RSP_cnt) / RSP_total_units), 3)
  RSP_unit_delta = round((RSP_close - RSP_avg_cost),2)
  if (RSP_unit_delta > 0):
    RSP_cgain += 1
  elif (RSP_unit_delta < 0):
  	RSP_closs += 1
  else:
    pass
  #print('[' + str(RSP_cnt) + '] (' + df.iloc[index]['Date'] + ') > Fresh [' + str(RSP_fresh) + '] for P.close [' + str(RSP_close) + '] gets [' + str(RSP_units) + '] units + carry-over [' + str(RSP_bal) + '] and total units [' + str(RSP_total_units) + ']')
  rsp_array.append([RSP_cnt,df.iloc[index]['Date'], RSP_fresh, RSP_close, RSP_units, RSP_bal, RSP_total_units, RSP_avg_cost,RSP_unit_delta])
  #print('done RSP')
  if RSP_bal < 0: 
  	print('ERROR, Balance is -ve')
  	exit()

#row_cnt = 1
#FileName = 'z74.SI.csv'
#with open(sys.argv[1], 'rt') as f:
#with open(FileName, newline='') as f:
#  reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE)
#  try:
#    for row in reader:
    #global row_cnt
    #row_cnt += 1
#      pass
#  except csv.Error as e:
#    sys.exit('file {}, line {}: {}'.format(filename, reader.line_num, e))        

def Results():
  global RSP_cnt
  global RSP_bal
  global RSP_total_units
  global RSP_Capital
  global RSP_close
  global df2
  global rsp_array
  #print(rsp_array)
  my_rsp = np.array(rsp_array, dtype=object)
  #print(my_rsp)
  df2 = pd.DataFrame(data=my_rsp[:],columns=COLUMNS)
  df2 = df2.drop(['Cnt'], axis=1)
  print(df2)
  print('Total Fresh [', RSP_Capital * RSP_cnt, '] Units [', RSP_total_units, '] = Current Val [', RSP_total_units * RSP_close, '] Gain = [', (RSP_Capital * RSP_cnt)-(RSP_total_units * RSP_close), ']')
  print('Total intervals [' + str(RSP_cnt) + '] Total InFlow [' + str(RSP_cnt*RSP_Capital) + '] Avg Cost per unit [' + str((RSP_cnt*RSP_Capital)/RSP_total_units) + '] W:L = [' +  str(RSP_cgain) + ']:[' + str(RSP_closs) + ']')

def Main():
  print('Starting')
  global EOD_Date
  global IdxLast
  global DayIdx
  global getDate
  global getMonth
  global curr_month
  global do_month
  global RSP_cnt
  global df

  # this section opens the data file
  df = pd.read_csv(sys.argv[1], sep=',')
  #df = pd.read_csv('z74.csv')
  EOD_Date = df['Date'].str.split('/',2,expand=True)
  #print(EOD_Date[0])
  IdxLast = EOD_Date.tail(1).index 

  # this section evaluates the date
  while DayIdx < IdxLast:
    getDate = int(EOD_Date[0][DayIdx])
    getMonth = int(EOD_Date[1][DayIdx])
    #print('(',DayIdx,')--------- [',getDate,'][',getMonth,']')
    if (curr_month != getMonth):
      do_month = True
      curr_month = getMonth
    if do_month == False:
      #print('did')
      pass
    else:
      if (getDate < 18):
        #print('wait')
        pass
      elif (getDate >= 18):
        #print('(',DayIdx,')--------- [',getDate,'][',getMonth,']')
        #print('date = ', getDate, ' + done RSP #',RSP_cnt)
        doRSP(DayIdx)
        RSP_cnt += 1
      else:
        print('XXXXXXXXXXXXX')
    DayIdx += 1
  print('End')
  Results()

Main()