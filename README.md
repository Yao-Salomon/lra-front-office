Prérequis
Installation
La première étape est d'installer les dépendances Rust et système. Gardez à l'esprit que cette configuration n'est nécessaire que pour développer des applications avec Tauri. Les utilisateurs de vos applications n'ont pas besoin d'installer tous ces outils.

Configuration sous Windows
1. Microsoft Visual Studio C++ Build Tools
Vous devez installer les outils de build C++ de Microsoft Visual Studio. Le meilleur moyen est d'installer les Outils de génération Microsoft C++. Lorsqu'il vous est demandé quels outils installer, assurez-vous que "C++ build tools" et "Windows 10 SDK" sont sélectionnés.

Microsoft Visual Studio Installer
Listing 1-1 : Sélectionner "C++ build tools" et "Windows 10 SDK" à l'aide du programme d'installation de Visual Studio Build Tools 2022.
2. WebView2
NOTE
On Windows 10 (Version 1803 and later with all updates applied) and Windows 11, the WebView2 runtime is distributed as part of the operating system.

Tauri dépend de WebView2 pour rendre le contenu web sur Windows, vous devez donc avoir installé WebView2. Le moyen le plus simple est de télécharger et d'exécuter le "Programme d’amorçage persistant" depuis le site Web de Microsoft.

Le script d'amorçage va essayer de déterminer l'architecture et la version correctes de votre système. Néanmoins, si vous rencontrez des problèmes (notamment avec Windows sur ARM) vous pouvez sélectionner un autre installateur autonome.

3. Rust
Enfin, allez sur https://www.rust-lang.org/tools/install pour installer rustup (l'installateur de Rustup). Veuillez noter qu'il vous faut redémarrer votre terminal, et dans certains cas Windows aussi, pour que les changements prennent effet.

Alternativement, vous pouvez aussi utiliser winget pour installer rustup en utilisant la commande suivante dans PowerShell:

winget install --id Rustlang.Rustup

MSVC TOOLCHAIN AS DEFAULT
For full support for Tauri and tools like trunk make sure the MSVC Rust toolchain is the selected default host triple in the installer dialog. Depending on your system it should be either x86_64-pc-windows-msvc, i686-pc-windows-msvc, or aarch64-pc-windows-msvc.

If you already have Rust installed, you can make sure the correct toolchain is installed by running this command:

rustup default stable-msvc

Configuration sous macOS
1. Dépendances macOS et CLang
Vous devrez installer les dépendances de développement macOS ainsi que CLang. Pour cela, exécutez la commande suivante dans votre terminal :

xcode-select --install

2. Rust
Pour installer Rust sur macOS, ouvrez un terminal et entrez la commande suivante :

curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

NOTE
Nous avons audité ce script bash, et il effectue uniquement les actions nécessaires pour installer Rust. Néanmoins, avant de copier/coller aveuglément un script, c'est toujours une bonne idée de le vérifier par soi-même. Voici le script en question : rustup.sh

La commande télécharge un script et démarre l'installation de l'outil rustup , qui installe la dernière version stable de Rust. Il est possible que l'outil d'installation vous demande votre mot de passe pour avoir les droits d'administration. Si l'installation a été réussie, le texte suivant apparaîtra :

Rust is installed now. Super !

Assurez-vous de redémarrer votre terminal pour que les modifications prennent effet.

Configuration sous Linux
1. Dépendances système
Vous devrez installer quelques dépendances du système, comme un compilateur C et webkit2gtk. Ci-dessous, les commandes à exécuter selon les distributions :

Debian
Arch
Fedora
Gentoo
openSUSE
NixOS
GNU Guix
Void
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

2. Rust
Pour installer Rust sur Linux, ouvrez un terminal et entrez la commande suivante :

curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

NOTE
Nous avons audité ce script bash, et il effectue uniquement les actions nécessaires pour installer Rust. Néanmoins, avant de copier/coller aveuglément un script, c'est toujours une bonne idée de le vérifier par soi-même. Voici le script en question : rustup.sh

La commande télécharge un script et démarre l'installation de l'outil rustup , qui installe la dernière version stable de Rust. Il est possible que l'outil d'installation vous demande votre mot de passe pour avoir les droits d'administration. Si l'installation a été réussie, le texte suivant apparaîtra :

Rust is installed now. Super !

Assurez-vous de redémarrer votre terminal pour que les modifications prennent effet.

Gérer l'installation de Rust
Vous devriez tenir votre version de Rust à jour dès que possible pour toujours bénéficier des dernières améliorations. Pour mettre à jour Rust, ouvrez un terminal et exécutez la commande suivante:

rustup update

Rustup peut également être utilisé pour complètement désinstaller Rust de votre machine :

rustup self uninstall

Problèmes techniques
Pour vérifier si Rust est correctement installé, ouvrez un terminal et entrez cette commande :

rustc --version

Vous devriez voir le numéro de version, hash, et date de commit pour la dernière version stable qui a été publiée, sous ce format :

rustc x.y.z (abcabcabc yyyy-mm-dd)

Si vous ne voyez pas ces informations, votre installation de Rust pourrait être incorrecte. Veuillez consulter la Section de dépannage de Rust pour savoir comment résoudre ce problème. Si votre problème persiste, vous pouvez obtenir de l'aide sur le Discord Tauri officiel et sur GitHub.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
