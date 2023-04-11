# :robot: BotStats
![GitHub package.json version](https://img.shields.io/github/package-json/v/nh-chitose/botstats)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/nh-chitose/botstats/discord.js)
[![CodeQL](https://github.com/nh-chitose/BotStats/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/nh-chitose/BotStats/actions/workflows/github-code-scanning/codeql)
[![CI](https://github.com/nh-chitose/BotStats/actions/workflows/test.yml/badge.svg)](https://github.com/nh-chitose/BotStats/actions/workflows/test.yml)
![GitHub](https://img.shields.io/github/license/nh-chitose/botstats)

音楽、読上げボットの使用状態がニックネームでわかるDiscordボットです。

## 機能1: ニックネームの自動変更機能
* VCに入退室するBOTのニックネームに🈳, ⏹とつけておくと、入室時に🈵, ▶に変更する。
* 🈵, ▶は退出時には🈳, ⏹に戻してくれる。

## 機能2: 個室の人数自動変更機能
* 2人制限のVCをBOTの入室と同時に3人部屋にし、退出時に2人部屋に戻す。

例外: VCのチャンネル名に「3」(半角)か「３」(全角)が入る場合には3人制限を維持する

## 必要な権限
☑ ニックネームの管理

☑ チャンネルの管理

* ニックネームを変更したいボットよりBotStatsのロールが上であることが必要です。

## 推奨環境
* Node.js v16.9.0以降

# 導入

```sh
# クローン
git clone https://github.com/nh-chitose/BotStats.git
# ディレクトリの移動
cd BotStats
# 依存関係のインストール
npm i
```
`.env`ファイルの用意
```
TOKEN=(Discord Developer Portalで取得したトークン)
```
```sh
# 実行
npm run start
```

# サポート
[サポートサーバ](https://discord.gg/CAP6JJPdaE)にて質問・バグの報告などを受け付けております。

またご自分でホストしなくても、上記サーバーから導入して頂けます。

# Change Log
2022/03/04 Release v1.0.0

2022/09/24 Update v1.1.0

2023/04/09 TypeScriptに移行 v2.0.0

2023/04/10 依存関係の更新 v2.0.1
