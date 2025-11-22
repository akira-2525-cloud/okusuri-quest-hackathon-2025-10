
# 💊 Okusuri Quest (おくすりクエスト)

> **Theme: 服薬を、義務から物語へ。**
> *From Duty to Story.*

![Okusuri Quest Top Image](./images/top_banner.jpg)
## 📖 Overview (概要)
**「おくすりクエスト」は、毎日の服薬をRPGのような「冒険」に変えるアプリケーションです。**

福祉の現場において、服薬継続の最大の障壁は「うっかり忘れ」ではなく、効果が実感できないことによる**「続ける意味の喪失」**です。
私はこの課題を「個人の意志の弱さ」ではなく**「設計の問題」**と捉えました。

「監視」や「義務」ではなく、**「仕組みでやる気を支える」**こと。
それがこのプロダクトのテーマです。

## 🧩 The 3 Gaps (解決する課題)
服薬が続かない原因を、3つのギャップとして定義し、デザインと技術で解消を目指しました。

![3 Gaps Infographic](./images/concept_3gaps.jpg)
1.  **Perception Gap (知覚)** 📉
    * **課題**: 薬を飲んでもすぐに体調は変わらず、効いている実感がない。
    * **解決**: **「連続日数」の即時可視化**。飲んだ瞬間に数値が積み上がる達成感を提供。
2.  **Social Gap (社会)** 👮
    * **課題**: 見守りが「監視」になり、飲み忘れを「謝る関係」になってしまう。
    * **解決**: **「静かな承認」**。チャットではなく「拍手」だけで繋がる、程よい距離感。
3.  **Design Gap (設計)** 🎮
    * **課題**: 既存アプリは事務的な記録中心で、「わくわく」が足りない。
    * **解決**: **「クエスト化」**。積み重ねを物語として捉え直すUXデザイン。

## 🏗️ Architecture (技術構成)
「10日間で、思想を壊さずに触れる体験を作る」ことを目標に、**Next.js** と **Supabase** を選定しました。

![System Architecture](./images/architecture.jpg)
### ⚡️ Key Technology: Realtime Feedback
図中の **"Instant UI Update"** が本アプリの核です。
Supabase Realtimeを活用し、**「ボタンを押した瞬間に数字が動く」**体験を実現。
サーバーとの通信ラグを感じさせないことで、ユーザーの「できた！」という達成感を逃しません。

| Category | Tech Stack |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Supabase (PostgreSQL, Auth, Realtime) |
| **Infrastructure** | Vercel |

## 🗂 Database Schema (データ設計)
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

## 🛡️ Security & Privacy (安心設計)

福祉アプリとして、技術的な安全性と心理的な安全性の両方を担保しています。

  * **Row Level Security (RLS):** データベースレベルでアクセス権を制御。他人の服薬データへの不正アクセスをシステム的に遮断しています。
  * **Privacy Control:** ランキングへの参加（公開）をユーザー自身が選べる設計。「見られたくない」権利を守ります。

## 🚀 Getting Started (起動方法)

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/okusuri-quest.git](https://github.com/your-username/okusuri-quest.git)

# 2. Install dependencies
npm install

# 3. Setup Environment Variables (.env.local)
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. Run the development server
npm run dev
```

## 💭 Message (開発者より)

**「クラウドは冷たいものではない。人の温かさを形にできる技術です。」**

福祉は「人に寄り添う知恵」、テクノロジーは「仕組みで支える力」。
この2つが交わることで、支援は「管理」から「共感」へと変わります。
『おくすりクエスト』は、コードと設計でその優しさを形にする挑戦です。

-----

### 👤 Author

**Akira Ito** (淑徳大学 総合福祉学部)
*福祉の視点を持つエンジニア*

```

-
<img width="2251" height="971" alt="image" src="https://github.com/user-attachments/assets/cfcee5f2-93de-4bcc-a164-6ed691830a66" />




