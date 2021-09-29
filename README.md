# node-red-sample
個人で作ったNode-REDのサブフローを置いてます。サポートは提供しておりません。

- nodered-coefontcloud-api-subflow.json (CoeFont CLOUD APIサブフロー)  
使い方や説明などは以下の記事を参照してください。  
https://qiita.com/Y-Shikase/items/2d773dc4d970228437d5  
変更点は、  
1.入力が msg.payload から msg.text に変わってます。  
2.キャッシュディレクトリに音声ファイルをキャッシュします。この動作により、msg.filename にファイル名を返します。

- nodered-sesame-api-subflow.json (SESAME APIサブフロー)  
使い方や説明などは以下の記事を参照してください。  
https://qiita.com/Y-Shikase/items/deb9df332f09adebbe7e  

- nodered-imananji.json (今何時？サブフロー)  
使い方や説明などは以下の記事を参照してください。  
https://qiita.com/Y-Shikase/items/fc02b4b8543bc2118c2c  

- nodered-weather-tsukumijima.json (天気予報API by tsukumijima)  
https://weather.tsukumijima.net/ さんで公開されている天気予報APIをNode-REDで簡単に使うためのサブフローです。  
主にTTS(Text-to-Speach)で発話させるために特定の箇所だけ利用しています。

- nodered-line-signature-check.json (LINE Messaging API用署名検証サブフロー)  
LINEからのwebhookエンドポイント(http-inノード)の直後に設置してください。  
署名一致、不一致後の動作はおまかせします。署名一致の場合、msg.replytokenにreplyMessage用のreplytokenを保存します。  
また、「functionExternalModules」を利用しています。  
https://nodered.jp/blog/2021/04/08/version-1-3-released#function-node-use-of-npm-modules  

- nodered-line-api-subflow.json (LINE Messaging APIサブフロー)  
ReplyとPushに対応しています。replyMessage時には上述の署名検証サブフローを通しておくと、msg.replytokenの設定は不要です。  
msg.payloadにメッセージのJSONオブジェクトを指定してください。  
テキスト、位置情報、音声メッセージでの動作は確認しています。  
https://developers.line.biz/ja/reference/messaging-api/#messages  
(※単一メッセージにしか対応しておりません。)  
また、「functionExternalModules」を利用しています。  
https://nodered.jp/blog/2021/04/08/version-1-3-released#function-node-use-of-npm-modules  
