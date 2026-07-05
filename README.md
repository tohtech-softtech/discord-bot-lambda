# lambda
これはソフトウェア技術研究会の公式DiscordサーバーBOTであるlambda君のリポジトリになります！

## 開発導入手順
まず、手元にこのリポジトリを`clone`します。
```sh
git clone https://github.com/tohtech-softtech/discord-bot-lambda
```

そして、`.env`ファイルを担当者からもらいます。

開発します。
開発が終了したら、`commit`してから`push`します。

pushしたら、ソフ研のラズパイに移動します。
このサークルではソフ研の部室にあるラズパイに`tailscale`を用いて、`ssh`接続します。
```
ssh xxxxxxxxx //ここは担当者に聞いてください。
```

そこで以下の手順を踏みます。
1. 動作しているdockerコンテナを終了する。`docker compose down`
2. `pull`する。
3. 以下のdiscordへのコマンド登録コマンドをプロジェクトのルートディレクトリで入力。
```sh
npm run deploy
```
4. dockerを開始させる。`docker compose up -d`
5. 確認はスレッドのbotestで！
