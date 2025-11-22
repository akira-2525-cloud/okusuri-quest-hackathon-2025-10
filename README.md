
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
      

## 🏗️技術構成：思想を壊さない設計
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

### 👤 Author

**Akira Ito** (淑徳大学 総合福祉学部)







