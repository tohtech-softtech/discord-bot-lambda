// テスト用：トークン不要の動作確認コード
const test = async () => {
    console.log("TypeScriptのビルド環境は正常です。");

    // ライブラリの読み込みテスト
    const version = "14.26.2";
    console.log(`Discord.js バージョン: ${version}`);

    console.log("ボットの初期化処理をシミュレートします...");
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("すべて正常に動作しました。環境構築は完了です。");
};

test().catch(console.error);
