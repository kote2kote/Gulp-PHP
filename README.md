# Peach 1.0.0

## 説明

* gulp を用いた node.js + PHP 実行/開発環境
* ちょっとしたサンプル実行にも便利
* SASS とか意識しなくても簡単に動かせる（自動コンパイル）
* Rin3.0 ベース - http://sanographix.github.io/rin/

## 機能

* SASS 自動コンパイル （gulp-sass） w/ CSS ソースマップ出力
* 複数の JavaScript ファイルを scripts.js へ連結 & ミニファイ(gulp-uglify)
* なので .js を追加するたびに \<script・・・/script\> を書かなくてもいい
* 画像ファイルをロスレスで軽量化（png, jpg, gif, svg 対応）(imagemin)
* PHP 対応の WEB サーバー起動する（node.js & gulp-connect-php）
* 全てのファイルを監視して変更あれば自動コンパイル & オートリロード（browserSync）
* コンパイルなどの処理後のファイル出力先は /build ディレクトリに集約
* なので /build 以下を丸ごと本番環境へアップロードすればデプロイ完了
* normarise, Bootstrap, jQuery, Font-Awesome 組み込み済みの index.html ひな型

## クイックスタート

```
$ mkdir myprojects
$ cd myprojects
$ git clone https://github.com/ontheroadjp/Peach.git
$ cd Peach
$ npm install
$ gulp build
$ gulp
```

## コマンド

```
$ gulp build
```

ファイル種別に応じてコンパイルなどの処理をして /build ディレクトリに出力する。  
ファイルは /src 以下に配置する。

* SASS ファイル　→　/src/sass
* JavaScript ファイル　→　/src/js
* 画像ファイル　→　/src/img
* その他（.html など）　→　/src/ext

それぞれ sass, などのディレクトリ内にディレクトリ構造を作っても OK

ビルドを実行すると・・

* /src/sass ディレクトリ内の SASS ファイル（.scss）がコンパイルされる
* /src/js ディレクトリ内の JavaScript ファイル（.js）が連結されミニファイされる
* /src/img ディレクトリ内の画像ファイル（.png .jpg .gif .svg）がロスレス最適化される
* /src/ext ディレクトリ内の全てのファイルが /build へコピーされる

ビルド後のファイル出力先

* SASS は /build/css ディレクトリ内へ
* JavsScript は /build/js ディレクトリ内へ
* 画像ファイルは /build/img ディレクトリ内へ
* /ext ディレクトリ内のファイルは /build/ディレクトリ内へ 
* 全て /build 以下に集約されるので本番環境へは /build 以下を丸ごとアップロードで OK


```
$ gulp
```

* 9999 番ポートで WEB サーバーが起動する
* ドキュメントルートは /build ディレクトリ
* /src 以下のファイルを監視して変更があるたびに自動コンパイル等の処理がされて WEB ブラウザの内容が自動でリロードされる
* PHP 動く

## 個別コマンド

```
$ gulp sass
```

* SASS コンパイルのみを行う  
/src/sass にある SASS ファイルを /build/css へコンパイルして出力

```
$ gulp js
```

* JavaScript ファイルの処理のみを行う  
/src/js にある JavaScript ファイルを連結 & ミニファイして /build/js/scripts.js へ出力

```
$ gulp img
```

* 画像ファイルの処理のみを行う  
/src/img になる 画像ファイル（png, jpg, gif, svg）をロスレスで最適化して /build/img へ出力

```
$ gulp php
```

* WEB サーバーを起動する（PHP対応）
* オートリロードには対応しない
* ポートは 9998番
* ドキュメントルートは /build ディレクトリ
* ほぼ使うことないかも

### 補足： npm モジュール

```
$ npm install
```

* 以下のモジュールが /node_modules にインストールされる

1. gulp
2. gulp-connect 
3. gupl-connect-php
4. browser-sync
5. gulp-filter
6. gulp-imagemin
7. gulp-pleeease
8. gulp-ruby-sass
9. gulp-sourcemaps
10. gulp-uglify


