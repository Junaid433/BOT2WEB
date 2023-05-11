from flask import Flask, request
from pyrogram import Client
import time
import re
from datetime import datetime

client = Client(
    'telegram_bridge',
    api_id = ,
    api_hash = ''
)   

app = Flask(__name__)

loop = client.loop

async def find_result_by_card(chat_id,card):
    rt = 0
    async with client:
        while True:
            history = client.get_chat_history(chat_id, limit=5)
            async for msg in history:
                if str(card) in msg.text and msg.from_user.is_bot:
                    return msg.text
                else:
                    rt += 1
                    time.sleep(1)
                    if rt >= 20:
                        return 'Bot Error'
                    else:
                        continue

async def send_message(chat_id,command,card):
    async with client:
        msg = await client.send_message(chat_id, command +' '+card)
        return str(msg.id)
    
async def find_result(chat_id,msg_id):
    async with client:
        history = client.get_chat_history(chat_id=chat_id, limit=10)
        async for msg in history:
            if str(msg.reply_to_message_id) == str(msg_id):
                while True:
                    mx = await client.get_messages(chat_id=chat_id, message_ids=msg.id)
                    if 'Please wait...' in mx.text or 'Waiting for result...' in mx.text or 'Checking your card...' in mx.text or 'Checking...' in mx.text:
                        time.sleep(1)
                        continue
                    else:
                        return str(mx.text)
                        
@app.route('/vbv')
def vbv_checker():
    try:
        start = time.time()
        card = request.args.get('cc')
        command = '/vbv'
        chat_id = 'SDBB_Bot'
        msg_id = loop.run_until_complete(send_message(chat_id,command,card))
        result = loop.run_until_complete(find_result(chat_id,msg_id))
        match = re.search(r"𝗥𝗲𝘀𝘂𝗹𝘁 ⇾\s*([^\n]*)", result, re.DOTALL)
        end = time.time()
        total = end - start
        if 'Authenticate Attempt Successful' in result or 'Authenticate Successful' in result:
         msg = '<br># HITS : '+card+'<br>Result : '+match.group(1)+' ✅<br>Time : '+str(total)+'<br>'
        else:
            if match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+match.group(1)+'<br>Time : '+str(total)+'<br>'
            elif not match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+result+'<br>Time : '+str(total)+'<br>'
        return msg
    except Exception as e:
        return str(e)

last_request_time = None

@app.route('/auth')
def auth_checker():
    try:
        start = time.time()
        global last_request_time
        if last_request_time is not None:
            time_since_last_request = datetime.now() - last_request_time
            if time_since_last_request.total_seconds() < 30:
                remaining_time = 30 - time_since_last_request.total_seconds()
                time.sleep(remaining_time)
        card = request.args.get('cc')
        command = '/chk'
        chat_id = 'SDBB_Bot'
        msg_id = loop.run_until_complete(send_message(chat_id,command,card))
        result = loop.run_until_complete(find_result(chat_id,msg_id))
        match = re.search(r"𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 ⇾\s*([^\n]*)", result, re.DOTALL)
        last_request_time = datetime.now()
        end = time.time()
        total = end - start
        if 'Approved' in result:
         msg = '<br># HITS : '+card+'<br>Result : '+match.group(1)+' ✅<br>Time : '+str(total)+'<br>'
        else:
            if match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+match.group(1)+'<br>Time : '+str(total)+'<br>'
            elif not match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+result+'<br>Time : '+str(total)+'<br>'
        return msg
    except Exception as e:
        return str(e)
    
@app.route('/spamxx')
def spamx_x():
    try:
        start = time.time()
        card = request.args.get('cc')
        command = '/x'
        chat_id = 'SpamXCCbot'
        msg_id = loop.run_until_complete(send_message(chat_id,command,card))
        result = loop.run_until_complete(find_result_by_card(chat_id,card))
        match = re.search(r"(Bug Bin|Result)[\s\S]*?\n", result, re.DOTALL)
        end = time.time()
        total = end - start
        if 'CVV LIVE' in result:
         msg = '<br># HITS : '+card+'<br>Result : '+match.group(0)+' ✅<br>Time : '+str(total)+'<br>'
        else:
            if match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+match.group(0)+'<br>Time : '+str(total)+'<br>'
            elif not match:
                msg = '<br> # DEAD : '+card+'<br>Result : '+result+'<br>Time : '+str(total)+'<br>'
        return msg
    except Exception as e:
        return str(e)
    
app.run(host='0.0.0.0',port='5001')
