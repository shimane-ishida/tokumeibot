SlackBot for MAGI SYSTEM(仮)
===

# 概要

magiアプリに対して投稿したコメントを匿名として「匿名チャンネル」へ投稿するアプリ

# 環境

* node version
v10.16.0

* npm version
6.13.0

* forever version
v2.0.0

## トークン設定
https://api.slack.com/apps
ここからAppNameをクリックして、左メニュー「Install App」から「Bot User OAuth Access Token」の値をコピー
.env.orgを.envにリネーム後コピーしたトークンを貼り付け

## 実行

アプリケーションディレクトリで下記のコマンドを実行する
foreverによるnodeAPPの永続化

```
$ npm install -g yarn forever
$ yarn install
$ forever index.js
```