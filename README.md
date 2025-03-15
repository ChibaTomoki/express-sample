# 環境構築

## tsconfig.json

参考にした記事↓
https://typescriptbook.jp/reference/tsconfig/tsconfig.json-settings#%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%E3%81%AE%E5%A0%B4%E5%90%88

# コマンド

| コマンド                                             | 説明                                   |
| ---------------------------------------------------- | -------------------------------------- |
| `npm run dev`                                        | ローカルサーバー起動                   |
| `npm run build`                                      | ビルド                                 |
| `npm run start`                                      | ビルドしたものを起動                   |
| `npm run format`                                     | フォーマット                           |
| `npm run check`                                      | 型チェックとフォーマットチェックとLint |
| `npx prisma migrate dev --name <マイグレーション名>` | Prismaのマイグレーションを実行         |
| `npx prisma db pull`                                 | DBのスキーマを取得                     |
| `npx prisma generate`                                | Prismaのスキーマを生成                 |

# 上手くいかなかったこと(+あればその解決策)

## PrismaとSupabaseの接続

### 問題

"Error: P1001: Can't reach database server at `aws-0-ap-northeast-1.pooler.supabase.com:5432`"というエラーが発生して、[このページ](https://supabase.com/docs/guides/database/prisma)にある`npx prisma migrate dev --name first_prisma_migration`が完了できなかった。

### 解決策

1. `DATABASE_URL`と`DIRECT_URL`をSupabase側のConnectを参考に設定
2. SupabaseのDababase Passwordをリセット
3. `npx prisma migrate dev --name first_prisma_migration`を実行する際に末尾のコピーした際の`>>`を削除して純粋なコマンドに変更

以上の方法で解決した。

## BigIntの扱い

### 問題

SupabaseでInt8型を使用するとBigInt型になるが、TypeScriptでBigInt型を扱うことができない

### 解決策

SupabaseでInt8型を使うのをやめ、Int4型を使うように変更
