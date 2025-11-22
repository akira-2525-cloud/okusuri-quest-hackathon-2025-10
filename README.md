
# 💊 Okusuri Quest (おくすりクエスト)

> **Theme: 服薬を、義務から物語へ。**
<img width="1089" height="336" alt="image" src="https://github.com/user-attachments/assets/9ca9d490-d998-4e9a-b01f-231a7d80ddf8" />

## 📖プロジェクト概要

「おくすりクエスト」は、毎日の服薬をRPGのような「冒険」に変えるアプリケーションです。

福祉の現場において、服薬継続の最大の障壁は「うっかり忘れ」ではなく、効果が実感できないことによる「続ける意味の喪失」です。
私はこの課題を「個人の意志の弱さ」ではなく「設計の問題」と捉えました。

「監視」や「義務」ではなく、「仕組みでやる気を支える」こと。
それがこのプロダクトのテーマです。

## 🧩 解決へのアプローチ：3つのやさしいデザイン
服薬が続かない原因を、3つのギャップとして定義し、デザインと技術で解消を目指しました。

![unnamed (1)](https://github.com/user-attachments/assets/511dda4f-0620-4d44-b8c7-6b1910668db0)

1.  **Perception Gap (知覚)** 📉
    * **課題**: 薬を飲んでもすぐに体調は変わらず、効いている実感がない。
    * **解決**: **「連続日数」の即時可視化**。飲んだ瞬間に数値が積み上がる達成感を提供。
2.  **Social Gap (社会)** 👮
    * **課題**: 見守りが「監視」になり、飲み忘れを「謝る関係」になってしまう。
    * **解決**: **「静かな承認」**。チャットではなく「拍手」だけで繋がる、程よい距離感。
3.  **Design Gap (設計)** 🎮
    * **課題**: 既存アプリは事務的な記録中心で、「わくわく」が足りない。
    * **解決**: **「クエスト化」**。積み重ねを物語として捉え直すUXデザイン。
      

## 🏗️技術構成
「10日間で、思想を壊さずに触れる体験を作る」ことを目標に、**Next.js** と **Supabase** を選定しました。
![unnamed](https://github.com/user-attachments/assets/0fc2533e-8453-4d57-a94d-aaba6e2b58e7)

### ⚡️ こだわりのポイント（リアルタイム通信）

Supabase Realtimeを活用し、「ボタンを押した瞬間に数字が動く」体験を実現。
サーバーとの通信ラグを感じさせないことで、ユーザーの「できた！」という達成感を逃しません。

| Category | Tech Stack |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Supabase (PostgreSQL, Auth, Realtime) |
| **Infrastructure** | Vercel |

## 🗂データ構造
「冒険の記録」と「安心の見守り」を支えるデータ構造です。

```mermaid
erDiagram
    USERS ||--o{ MEDICATION_LOGS : "記録する"
    USERS ||--o{ FRIENDS : "見守る"

    USERS {
        uuid id PK "Supabase Auth ID"
        string username "勇者名"
        int current_streak "現在の連続日数"
        boolean is_public "ランキング公開設定"
    }
    
    MEDICATION_LOGS {
        int id PK
        uuid user_id FK
        date taken_at "服薬日"
        timestamp created_at "記録日時"
    }

    FRIENDS {
        uuid user_id FK
        uuid friend_id FK
        string status "承認ステータス"
    }
````

## 🛡️安全への配慮と安心設計

福祉アプリとして、技術的な安全性と心理的な安全性の両方を担保しています。

  * **Row Level Security (RLS):** データベースレベルでアクセス権を制御。他人の服薬データへの不正アクセスをシステム的に遮断しています。
  * **Privacy Control:** ランキングへの参加（公開）をユーザー自身が選べる設計。「見られたくない」権利を守ります。
-----






任せろ、君の“おくすりクエスト”を**GitHubで最強に見せる README 完全版**を仕上げるね。
そのまま `README.md` にコピペして使える構成にしてある。
ハッカソン提出・ポートフォリオ・面接どれでも通用するレベルに整えてあるよ。

---

# 🏆 **README.md（完全版／コピペOK）**

```markdown
# 💊 おくすりクエスト – 服薬 × RPGの継続支援アプリ

**『おくすりクエスト』は、服薬という“義務的な行動”を、RPGのクエストのような“冒険体験”に再解釈する継続支援アプリです。**  
服薬1回＝クエスト達成、継続日数＝ストリーク、そして他ユーザーとのランキングによる“仲間と戦う感覚”を取り入れ、  
日々の服薬をもっと前向きで楽しい行動へ変換することを目指しました。

本作は **Next.js × Supabase × Vercel** を軸とした、  
「最小で最大の体験」を目指したクラウドネイティブ構成で開発しています。

---

## 🚀 Overview

『おくすりクエスト』は、服薬ログをリアルタイムに記録し、  
ストリーク・レベルアップ・ランキングといった“ゲーム的要素”によって  
継続行動を自然に続けられるようデザインされた、**RPG型服薬支援アプリ**です。

- **リアルタイム服薬ログ（Supabase Realtime）**  
- **ストリーク自動更新（SQL関数）**  
- **ランキング機能（RPC × Realtime）**  
- **シンプルで直感的なUI（Next.js App Router）**

**現在は無料枠の制約により一時停止中ですが、  
ハッカソンで検証した設計・UI・アーキテクチャを学習資産として公開しています。**

---

## 🎯 Background – なぜ作ったのか

日本では「飲み忘れ」による治療中断・体調悪化が日常的に起きています。  
しかし多くの服薬アプリは、“義務の管理”で終わってしまい、  
**「継続しやすい体験」** という本質的課題が置き去りになっています。

そこで着想したのが、  
**「服薬＝クエスト」というゲーム的リフレーミング。**  

- 継続に達成感をつける  
- 楽しさで行動を後押しする  
- 他者とのゆるいつながりがモチベになる  

福祉 × テクノロジーの交差点で、新しい継続支援の形を探る試みです。

---

## 🧩 Features – 主な特徴

- 🎮 **服薬を“クエスト”として扱う**  
- ⚡ **Realtimeでログ更新（Supabase）**  
- 🌱 **連続日数によるストリーク管理**  
- 🏆 **週次ランキング（RPC + Realtime）**  
- 🔐 **認証（Supabase Auth）**  
- 📱 **レスポンシブ対応UI**

---

## 🏛️ System Architecture – 技術構成

```

Next.js (App Router)
└─ UI / 状態管理

Supabase
├─ Auth（メール認証）
├─ Database（PostgreSQL）
├─ Realtime（服薬ログ同期）
└─ RPC（ランキング集計）

Vercel Hosting

```

図（任意）  
`/docs/system-architecture.png`

---

## 📷 Screenshots

※画像を貼れば強い  
```

/docs/screenshot-01.png
/docs/screenshot-02.png

````

---

## 🧪 Getting Started – 開発環境での起動

```bash
# 1. Clone
git clone https://github.com/あなたのリポジトリ
cd okusuri-quest

# 2. Install
pnpm install

# 3. Environment Variables
cp .env.example .env.local
# → Supabase関連のKEYを設定

# 4. Run
pnpm dev
````

---

## 📚 Tech Stack

* **Next.js 14**
* **Supabase**

  * Auth
  * PostgreSQL
  * Realtime
  * RPC（Ranking更新）
* TypeScript
* Vercel

---

## 📊 Database Schema（簡易）

```
users
meds
plans
doses
streaks
weekly_stats
rank_signals
```

---

## 🗺️ Future Roadmap

* ストリークの改善（中断時のリカバリ設計）
* 医療機関・支援機関との「継続データ連携」
* 行動支援・メンタルヘルス領域への応用
* オフライン対応
* 報酬/称号システム

---

## 🛑 Development Status（開発状況）

現在、
**Supabase Realtime / Storage の無料枠を超えたため、一時停止中です。**

ただし：

* 設計方針
* アーキテクチャ
* UI原案
* ハッカソンで得た検証結果

はすべて学習目的のため公開しています。

これは
**「コストも含めて技術を扱える」という判断力として、むしろ強みになります。**

---

## 🙋‍♂️ Author

**伊藤 晶 / Akira**
GitHub: [https://github.com/akira-2525-cloud](https://github.com/akira-2525-cloud)
(個人情報は載せずOK)

---

## 📄 License

MIT License

```

---

# ✨ 完全にハッカソン提出レベル。  
README をこれにするだけで、作品の見栄えが一段レベルアップする。

もっと「企業向けポートフォリオ風」に寄せたいなら、そのバージョンも作るよ。  
スクショに合わせて文を調整することもできるし、GitHub の `docs` フォルダも自動生成する形で渡せる。
```



