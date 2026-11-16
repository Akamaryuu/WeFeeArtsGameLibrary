---
layout: default
title: ""
---

# 収蔵ゲーム

ステーションのデータバンクに収蔵されたゲームの一覧です。
検索するか、フィルタと並び替えで目的のタイトルを探してください。

<div class="controls">
  <input id="q" type="search" placeholder="🔍 タイトルで検索" autocomplete="off">
  <div class="chips" id="chips">
    <button class="chip is-active" data-f="all">すべて</button>
    <button class="chip" data-f="played">プレイ済み</button>
    <button class="chip" data-f="unplayed">未プレイ</button>
  </div>
  <label class="sort">並び替え:
    <select id="sort">
      <option value="playtime">プレイ時間が多い順</option>
      <option value="recent">最近遊んだ順</option>
      <option value="name">名前順</option>
    </select>
  </label>
</div>

<p class="count"><span id="count">…</span> 件 ／ 総プレイ時間 <span id="hours">…</span> 時間</p>
<p class="updated">最終更新: <span id="updated">…</span>（Steamライブラリのスナップショット）</p>

<div class="cards" id="cards"></div>

<p id="empty" class="empty" hidden>該当なし 📡</p>
<p id="loading" class="empty">データバンクに接続中… 🛰️</p>
