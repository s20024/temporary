import json
import os
import re

import requests
import wikipedia as wk

wk.set_lang("ja")


def wikisearch(maker):
    search_response = wk.search(maker)
    if not search_response:
        return f"Wikipediaに「{maker}」というメーカーは登録されていません"
    wiki_page = wk.page(search_response[0])
    wiki_content = wiki_page.content
    response_string = wiki_content[: wiki_content.find("。")] + "\n"
    response_string += "リンクはこちら:\n    " + wiki_page.url
    return response_string


def pri(name, maker, price, url, regist, comment):
    print(
        f"""\n\n
お菓子の名前:
    {name}
メーカー:
    {maker}

値段:
    {price}
発売日:
    {regist}

商品紹介:
    {comment}


商品の詳細のURL:
    {url}


     """
    )


print("このアプリはお菓子の検索をします。")
while True:
    keyword = input("検索するキーワードを入力してください")
    if keyword == "":
        break
    keyword_uri = (
        "https://www.sysbird.jp/webapi/?format=json&apikey=guest&max=30&keyword="
    )
    res = requests.get(keyword_uri + keyword).json()
    try:
        keyword_len = len(res["item"])
    except:
        print(f"{keyword}の検索はありませんでした")
        continue
    print()
    for i in range(keyword_len):
        print(f"ID:{i + 1} name:{res['item'][i]['name']}")
    print()
    okasi_id = input("検索したいお菓子のIDを半角数字で入力してください  \nない場合は0を入力してください")
    if okasi_id == "0":
        continue
    while True:
        if str(okasi_id).isnumeric() and 1 <= int(okasi_id) <= keyword_len:
            break
        okasi_id = input("半角数字のIDでないものが入力されてしまいました。検索したいお菓子の半角数字のIDを入力してください")
    okasi_id = int(okasi_id) - 1

    name = res["item"][okasi_id]["name"]
    maker = res["item"][okasi_id]["maker"]
    price = res["item"][okasi_id]["price"]
    price = "お値段は調べられませんでした。" if len(price) == 0 or int(price) == 0 else price + "円"
    url = res["item"][okasi_id]["url"]
    regist = res["item"][okasi_id]["regist"]
    image_url = res["item"][okasi_id]["image"]
    comment = re.sub(r"<.+?>", "", res["item"][okasi_id]["comment"])
    try:
        tag = res["item"][okasi_id]["tags"]["tag"] + [maker]
    except:
        tag = [maker]

    file_name = "database.jpg"

    response = requests.get(image_url)
    image = response.content

    with open(file_name, "wb") as aaa:
        aaa.write(image)

    os.system("code database.jpg")

    pri(name, maker, price, url, regist, comment)
    request = input("Wikipediaで関連単語を調べますか？　y(es)/n(o)")
    while True:
        if request in ["y", "n"]:
            break
        request = input("Wikipediaで関連単語を調べますか？yかnで答えてください　y(es)/n(o)")
    if request == "y":
        for tag_id, value in enumerate(tag):
            print(f"ID:{tag_id +  1} name:{value}")
        print()
        wiki_id = input("うえのIDのうちで検索したい文字のIDを半角数字で入力してください")
        while True:
            if wiki_id.isnumeric() and 1 <= int(wiki_id) <= len(tag):
                break
            wiki_id = input("半角数字のIDでないものが入力されてしまいました。検索したいお菓子の半角数字のIDを入力してください")
        wiki_id = int(wiki_id) - 1
        print("間違った情報が表示される可能性があるので気を付けてください。\n")
        print("\n    " + wikisearch(tag[wiki_id]) + "\n\n")

    con = input("まだ検索しますか？　y(es)/n(o)")
    while True:
        if con in ["y", "n"]:
            break
        con = input("まだ検索しますか？yかnで答えてください　y(es)/n(o)")
    if con == "n":
        break
    print()
