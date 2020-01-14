//ライブラリの読み込み
const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const moment = require('moment');
dotenv.config();

const APP_NAME = 'magi';
const SLACK_CHANEL = '匿名チャンネル'; //https://slack.com/api/channels.list?token=token
const ICONS = [':yum:', ':grin:', ':innocent:', ':wink:', ':cry:', ':joy:', ':expressionless:'];
const BOT_NAME = '<@USM2N0ELD> '; //ボットの宛先

//botインスタンスの作成
const bot = new SlackBot({
  token: `${process.env.TOKEN}`,  //.envファイルのトークンを参照
  name: APP_NAME
});

/**
 * @param {object} data
 */
bot.on('message', (data) => {
  if(data.type !== 'message') {
    return;
  }
  maskMessage(data);
});

/**
 * 
 * @param {object} message 
 */
function maskMessage(message){
  if(message.text === undefined){
    //ボット向け新規投稿以外は無視する
    return;
  }
  //処理
  if(message.text.includes(BOT_NAME)){
    var icon = createIcon()
    message.icon = icon
    // ログ出力
    outputLog(message);
    // 宛先（ボット名）を削除してテキストを取得
    var now = moment();
    var res = `匿名投稿： ${message.text.replace(BOT_NAME, "")}\n`;
    res += `投稿日： ${now.format('YYYY-MM-DD H:mm:ss').toString()}`;
    // チャンネルに投稿
    bot.postMessageToChannel(
      SLACK_CHANEL,
      res,
      icon
    );
  }
}

/**
 * アイコンをランダムに生成
 */
function createIcon(){
  return {
    icon_emoji: ICONS[getRandomInt(7)]
  }
}

/**
 * 
 * @param {object} text 
 */
function outputLog(text){
  // 非同期処理　ファイル名は日付ごと
  var now = moment();
  var outputFileName = now.format('YYYYMMDD').toString() + ".log";
  var date = now.format('YYYY-MM-DD H:mm:ss').toString();
  var write_text = "###################################################################\n";
  write_text += "### 投稿日:" + date + "\n";
  write_text += JSON.stringify(text,null, 2) + "\n";
  // ファイルへ書き出し
  fs.appendFile(`${__dirname}/logs/${outputFileName}`, write_text, (err) => {
    if(err) console.log(err);
    else console.log('write end');
  });
}

/**
 * 
 * @param {*} max 
 * https://lab.syncer.jp/Web/JavaScript/Snippet/15/
 */
function getRandomInt(max) {
  return Math.floor( Math.random() * max ) 
}