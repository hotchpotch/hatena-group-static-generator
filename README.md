<p align="center">
  <img alt="Hatena::Group Icon" src="https://hatena.g.hatena.ne.jp/images/de_favicon.ico" width="60" />
</p>
<h1 align="center">
Hatena::Group Static Site Generator
</h1>

## これは何？

サービスが終了したはてなグループの `.mt` 形式のエクスポートデータを元に、静的ファイルを出力できるジェネレータです。

- 例: https://subtech-secondlife.netlify.com/

のように、はてなグループで書いた記事を公開することができます。静的ファイルなので、動的なアプリケーションサーバは必要なく、Netlify, Surge, Firebase Hosting 等にデプロイすることで、サーバ料金は基本かからずに公開ができます。

## 使い方

node.js と yarn が必要です。

```
git clone https://github.com/hotchpotch/hatena-group-static-generator
cd hatena-group-static-generator
```

```
cp site-settings.js.sample site-settings.js
# タイトルなど、適当に設定いじる
vim site-settings.js
```

```
# 依存ライブラリのインストール
yarn
```

```
# export した .mt (MovableType) 形式のファイルを ./hatena-group-exports/ 以下に配置する
cp {あなたのエクスポートしたファイル}.mt ./hatena-group-exports/
# 動作のため、試しに適当な .mt 形式のファイルを生成してみたい場合
# ./hatena-group-exports/dummy.mt は利用が終わったら削除すること
yarn create-dummy
```

```
# 開発サーバを立ち上げて http://localhost:8000/ でアクセス
yarn develop
```

```
# リリース用静的ファイルを ./public に作る
yarn build
```

```
# public 以下のファイルで動作確認する
yarn serve
```

```
# 後悔するため、適当にどこかに静的ファイルをdeployする。例えば surge なら…
surge public
```

## 解っている問題点

- 対象は日記のみ
- カテゴリーは使ってなかったので再現してない
- グループキーワードへのリンクや、以前の記事へのリンクなどは当時のまま(なので今は、はてなグループ終了記事にリダイレクトされる)
- はてなグループのスーパー Pre 記法で書いている場合、閉じタグ関係で pre の表示が乱れることがある
- スーパー Pre 記法の内側で`-----` の文字列がある場合、ちゃんとした MovableType のエクスポート形式にならないらしく、使っている [mt-parser](https://gitlab.com/tottokotkd/mt-parser) でエラーになる。そのため、その場合はエクスポートされたファイルの pre の内側から `-----` を消すのが手っ取り早い

## その他

- entry URL の path は違う
  - もともとは /hatena-id/20190711/{エポック秒} みたいな感じなので再現しようと思えばできるけどやらない
- 開発環境ではエクスポートされたエントリー最新 30 件のみを使う(全件使うと遅いので)
- 検索は静的ファイルのみで行う実装((lunrjs)[https://lunrjs.com/]を使ってる)なので、タイトルのみを検索対象としている。本文のテキストも検索する実装を作ってみたが、検索インデクスが gzip 圧縮後でも 1000 記事で 2MB 弱ほどになったので、有益でない
  - ちなみに日本語トークナイザの実装依存で「はてな」で検索しても「はてな」はヒットしない(「は て な」で検索するとヒットする)。bigram のトークナイザ実装したほうが良さそう…。

# ライセンス

`./vendor/hatena/` 以下の CSS ファイルと `./static/favicon.ico` は、株式会社はてなに帰属します。その他のソースコード等は MIT ライセンスです。
