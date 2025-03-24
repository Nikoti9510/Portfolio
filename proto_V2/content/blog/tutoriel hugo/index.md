---
title: "Tutoriel Hugo"
date: 
description: "Un tutoriel complet pour créer de A à Z un site statique avec Hugo"
type: blog
tags:
- Web
---

# Création d'un portfolio simple en prenant avantage de la JamStack.


Avant de rentrer dans le vif du sujet, on présente rapidement le principe, les outils et la méthodologie. 


On parle de JamStack pour décrire un site créé en prenant avantage de plusieurs outils mis à disposition (gratuits, en libres de droits, payants, avec abonnement, etc..) et en les assemblant afin de bénéficier de leurs avantages (et ne pas réinventer la roue à chaque contrainte). Par exemple, plutôt que de gérer manuellement l'hébergement de notre site, on utilise un outil comme Netlify qui le fait pour nous. L'idée, c'est de ne pas perdre de temps sur des fonctionnalités déjà existantes, et de se concentrer sur le design et le contenu de notre site.


Dans ce tutoriel, on va créer un site en utilisant les outils suivants : 


* [Github Desktop](https://desktop.github.com/download/) pour gérer facilement notre projet en créant des sauvegardes et différentes versions, tout en stockant notre projet en ligne. On utilise la version desktop pour ne pas avoir à apprendre les commandes Gits. 
* [Visual Studio Code](https://code.visualstudio.com/) pour notre éditeur de code. Il nous permet de faire le lien avec Github et Hugo. Il est tout à fait possible d'en utiliser un autre, mais c'est de loin de plus pratique.
* [Hugo](https://gohugo.io/), un framework ultra rapide et open source, qui nous permet de simplifier la construction d'un site web optimisé, avec des options de templating nous permettant de facilité la maintenabilité et les modifications du site.
* [Sveltia](https://github.com/sveltia/sveltia-cms/?tab=readme-ov-file#getting-started), c'est un projet se basant sur DecapCMS (anciennement [NetlifyCMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/)) et l'améliorant, notamment avec l'ajout d'un interface beaucoup plus poussé et de fonctionnalité de traitement d'images plus avancé. C'est grâce à Sveltia que l'on va pouvoir mettre à jour et ajouter du contenu sur notre site sans passer par un éditeur de code.
* [Netlify](https://www.netlify.com/), qui fait le lien avec notre répertoire Github où est stocké notre projet, pour le transformer en site internet disponible en ligne. 

---

## Mettre en place le projet


Une fois Github Desktop et Visual Studio Code installé, on va pouvoir mettre en place le projet. On se rend dans notre [espace personnel sur GitHub](https://github.com/) et on créer un nouveau répertoire en cliquant sur le bouton `New` en haut à gauche.


![Interface du dashboard Github](/dashboard-github.png "Interface du dashboard Github")


Donner un nom à votre répertoire, dans notre exemple ce sera "*tutoriel_portfolio*", et validez en cliquant sur `Create repository` en bas à droite. (les autres options peuvent être laissés par défaut). 


![Création d'un répertoire dans l'interface github](/dashboard-github-etape-2.png "Création d'un répertoire dans l'interface github")


Si on retourne dans notre dashboard, on voit que notre nouveau répertoire est bien créé. 


![Dashboard de github avec le nouveau répertoire présent](/dashboard-github-etape-3.png "Dashboard de github avec le nouveau répertoire présent")


Maintenant, rendons nous dans Github Desktop. Si ce n'est pas déjà fait, connectez l'application à votre compte Github. Ensuite, il est possible de cloner votre répertoire, afin de pouvoir travailler localement sur votre machine. \
En haut à gauche, cliquez sur `File > Clone repository`.


![Interface de github desktop, clonage d'un répertoire ](/github-desktop-etape-1.png "Interface de github desktop, clonage d'un répertoire")


Choisissez le répertoire que vous avez créé plus tôt et cliquez sur `Clone` en bas de la fenêtre. 


![Choix d'un répertoire dans github desktop ](/github-desktop-etape-2.png "Choix d'un répertoire dans github desktop")


Une fois le répertoire cloné, on peut constater que l'on se trouve bien dans le bon espace de travail en haut à gauche (et passer d'un projet à un autre si besoin). Vous pouvez maintenant ouvrir votre projet dans VScode en cliquant dans le bouton `Open in Visual Studio Code` au centre de l'écran.


![Interface de github desktop une fois un répertoire cloné](/github-desktop-etape-3.png "Interface de github desktop une fois le répertoire cloné")


Et voilà, vous êtes prêt à travailler ! On pourrait s'arrêter là et faire un site internet statique en créant des pages en HTML, en les personnalisant avec des feuilles de styles CSS et en ajoutant de l'interaction en Javascript. Mais avant de faire ça, on va installer Hugo afin de nous faciliter la vie. 


***Avant de continuer, fermez GitHub Desktop et Visual Studio Code.***

---

## Installation de Go, Hugo et Git


Oui je sais, ***GIT*** ! Mais ce n'est pas si terrible vous allez voir. Surtout, ce n'est que pour l'étape d'installation et d'initialisation du projet. Ensuite, on travaille uniquement avec la version Desktop (mais comme Git sera installé, si l'envie vous prend d'aller plus loin, c'est possible).


### Installer GO et Hugo


Commençez par vous rendre sur [](gohugo.io/installation/)[gohugo.io/installation/](<>) et cliquez sur l'option correspondant à votre navigateur. Pour ce tutoriel, je vais suivre les étapes pour Windows (mais c'est même plus simple avec MacOS). 


Dans un premier temps, il nous faut installer [Go](https://go.dev/doc/install), le langage de programmation dans lequel Hugo est écrit. Pas de panique, nous n'aurons pas besoin d'apprendre un nouveau langage pour ce projet, il est simplement nécessaire de l'installer sur notre machine pour que Hugo fonctionne. Téléchargez l'exécutable pour Windows et suivez les instructions de l'installateur. 


![Choisir le bon exécutable pour installer Go](/go.png "Choisir le bon exécutable pour installer Go")


Vous pouvez changer l'emplacement de l'installation sans problème lors de l'installation. 


![Changement de l'emplacement d'installation de Go](/go_2.png "Changement de l'emplacement d'installation de Go")


Une fois l'installation terminé, ouvrez une invite de commande (Windows + R et sélectionnez `cmd` ou cliquez sur le menu démarrer et cherchez `cmd`). Tapez dans la console la ligne `Go version` pour constater que l'installation est bien réussit. 


![Go est bien installé sur cette machine](/go_3.png "Go est bien installé sur cette machine")


Dans la même console, vous pouvez maintenant copier la commande suivante pour installer Hugo : 


`go install github.com/gohugoio/hugo@latest`


### Installer Git


Rendez vous sur le [site de git pour Windows](https://git-scm.com/downloads/win) et téléchargez la dernière version en cliquant sur le premier lien. Il fois le téléchargement terminé, lancez l'exécutable et suivez les instructions. Voilà, c'est terminé. Pour le moment, pas si terrible.


---


## Création du site avec Hugo


Une fois que l'installation est terminé, vous êtes prêt à créer votre site ! Pour ça, réouvrez GitHub Desktop et votre projet dans Visual Studio Code. Une fois dans VScode, on va dans `Terminal > New Terminal`.


![Ouvrir un terminal dans Visual Studio Code](/terminal.png "Ouvrir un terminal dans Visual Studio Code")


Dans le terminal qui s'est ouvert en bas de l'éditeur, vous pouvez maintenant générer votre site avec Hugo. Pour cela, rien de plus simple, il suffit de taper la ligne de commande suivante : 


`Hugo new site NOM_DU_SITE`

Remplacer `NOM_DU_SITE` par le nom de votre choix (sans espaces ni caractères spéciaux).


![La création du site est terminé dans VScode](/hugo-new-site.png "La création du site est terminé dans VScode")


On constate une fois la création du site terminé, que des dossiers et fichiers ont été ajoutés dans le projet. À partir de là, deux choix s'offre à vous. Le premier, c'est d'installer un thème compatible avec Hugo. Le deuxième, continuer votre projet en partant de zéro. Pour ce tutoriel et dans un soucis de d'exhaustivité, je vais vous montrer comment installer un thèmes. Mais nous continuerons ensuite votre projet sans, afin de n'utiliser que ce qui est nécessaire et pour bien comprendre le fonctionnement de Hugo.

---

## Installer un thème


Hugo propose une [collection de thème gratuit sur son site](https://themes.gohugo.io/), et il est également possible d'en trouver des plus complets sur d'autres sites, comme par exemple [gethugothemes.com](https://gethugothemes.com/products) ou [anvodstudio.com](https://anvodstudio.com/hugo-themes/). Pour l'exemple, j'ai choisi le thème [PaperMod](https://themes.gohugo.io/themes/hugo-papermod/). Pour l'installer, rien de compliqué, il suffit de se rendre sur le page Github du thème (en cliquant sur le bouton "Download" dans la page du thème) et de copier la commande pour installer le submodule dans le terminal de VScode. Pour PaperMod, voilà la commande : 


`git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod`


> /!\ Il faut s'assurer que l'on se trouve à la racine de notre projet avant d'exécuter la commande. Dans le terminal, le chemin devrait être "GitHub\Nom_du_repertoire". Si ce n'est pas le cas, il faut s'y rendre. Utiliser `cd Nom_du_dossier` vous permet de vous rendre à cet endroit. Utilisez `ls` vous permet de lister tout les dossiers en enfant de celui dans lequel vous vous trouvez. Utilisez `cd ..` vous permet de remonter un niveau. 


Une fois la commande lancé et le thème téléchargé, il ne reste plus qu'a indiquer à Hugo que vous souhaitez utiliser ce thème. Pour cela, rendez-vous dans le fichier de configuration `config.toml` (ou `hugo.toml`, les deux fonctionnes et peuvent être présent) et d'ajouter la ligne suivante dans le fichier : 


`theme = ["PaperMod"]`


![Choix du template dans le fichier Hugo.toml](/hugo_toml.png "Choix du template dans le fichier Hugo.toml")


Et voila ! Le template est chargé et on peut le prévisualiser sur le serveur de test, mais on va voir comment faire cela juste après, en partant de notre projet vierge. 

---

## Configuration du site sans template


Dans cette partie, nous allons créer la structure de base pour votre site. On va commencer par créer une page d'accueil, avec un header, du contenu et un footer. Cela va vous permettre de prendre en main le fonctionnement de Hugo, en particulier le système de partials de template. On prendra également le temps de voir comment créer un menu de navigation ainsi qu'une liste de projets dans notre page d'accueil. 


### Lancer un serveur de test


Hugo nous permet de tester notre travail via un serveur local. Pour cela, il suffit de taper la commande suivant dans le terminal : 


`hugo serve`


Une fois le serveur lancé, cliquez sur le lien que nous donne Hugo pour visualiser notre site. (Il faut utiliser le raccourci clavier *Ctrl+C* pour couper le serveur local).


![Lancement d'un serveur de test](/hugo-serve.png "lancement d'un serveur de test")


Si on se rend sur la page, on constaste qu'il y a un problème. 


![Hugo ne trouve pas de page à afficher](/404-rip.png "Hugo ne trouve pas de page à afficher")

---

## Structure d'un site Hugo


Si rien ne s'affiche, c'est parce que notre site est vide (malin, je sais). Regardons la structure généré par Hugo lors de la création du site d'un peu plus près. 


![Structure du projet dans VScode](/structure-du-site.png "Structure du projet dans VScode")


Pour le moment, il y a 3 dossiers qui nous intéresses :


1. **static** : C'est ici que l'on va stocker toutes les ressources utiles au site qui ne changent jamais, tels que les images réutilisées dans toutes les pages, les fichiers CSS et Javascripts, etc.
2. **content** : Dans ce dossier, on va retrouver nos pages de contenus, en format `.md` (pour [Markdown](https://www.markdownguide.org/cheat-sheet/))
3. **layouts** : Où on va stocker les pages de templates en format `.HTML`, ainsi que les fameuses Partials, en quelques sortent des sections que l'on va pouvoir réutiliser dans notre site. 


> Pour plus de détails sur la structure de Hugo, consultez la documentation à ce sujet : [gohugo.io/getting-started/directory-structure/#directories](https://gohugo.io/getting-started/directory-structure/#directories)


Pour que notre site puisse fonctionner, il y quelques étapes à suivre : 


1. Créez un dossier `_default` dans `layouts`.
2. Dans `_default`, créez un fichier `home.html` avec le contenu suivant :


   ```html
   {{ define "main" }}
       {{ .Content }}
   {{ end }}
   ```
3. Toujours dans `layouts > _default`, créez un fichier `baseof.html` avec le contenu suivant :


	```html
     <html lang="{{ site.Language }}">
     <body>
       <main>
         {{ block "main" . }}{{ end }}
       </main>
     </body>
     </html>
   ```
4. Enfin, dans le dossier `content`, ajoutez un fichier `_index.md` avec le contenu suivant : 
	```markdown
	---
	title: "Page d'accueil"
	---
	
	# Bonjour internet
	Voilà le contenu de la page d'accueil, qui vient de `content/_index.md`!
	```


Voilà à quoi ressemble la structure après la création.


![Création des nouveaux fichiers](/structure-v2.png "Création des nouveaux fichiers")


Si vous relancez le serveur de testvous pouvez constatez que du contenu s'affiche ! 


![La page affiche bien du contenu](/le-site-fonctionne-v2.png "la page affiche bien du contenu")


Expliquons ce que l'on vient de faire : 


On a créé un fichier `home.html` qui correspond à notre page d'accueil et on l'ajoute dans le dossier `layouts > _default` afin que Hugo le trouve. Dans ce fichier, on défini un bloc que l'on nomme `main`, dans lequel on ajoute le contenu de la page, `Content`. Ce contenu est récupéré automatiquement par Hugo dans le fichier `_index.md`, si celui-ci existe dans le dossier content.


On a ensuite défini dans notre dossier `_defaut` le template de page pour toutes nos pages, qui se nomme `baseof.html`. C'est cette page qui est toujours utilisé par Hugo pour assembler nos pages (il est possible d'en définir plusieurs en cas de besoin, voir [gohugo.io/templates/lookup-order](https://gohugo.io/templates/lookup-order/)). Pour le moment, notre fichier `baseof.html` est très simple, mais on va venir l'améliorer un peu plus tard. `home.html` se base sur ce template, et pour le moment ne fait rien de plus.  


Enfin, on a créé le fichier Markdown `_index.md`, c'est à dire le fichier de contenu, pour notre page d'accueil. On le place bien dans le dossier `content`, pour que Hugo puisse le retrouver et l'injecter dans la page. 


Avant d'aller plus loin, sauvegardons notre travail. 

---

## Pousser les fichiers locaux sur Github


Si on se rend dans GitHub Desktop, on remarque que plusieurs fichiers sont ajoutés dans la liste des modifications. Pour les envoyer sur votre RepoGitHub™, il faut donner un nom à votre commit. Quelques choses dans la veine de "Premier push" fera l'affaire. Vous pouvez ajouter une description si l'envie vous prend. Essayez d'être clair et précis dans vos noms de push, car vous pourrez les retrouver dans Github et revenir en arrière quand des bugs vont inévitablement apparaitres.  


![Le premier push sur notre répertoire GitHub](/premier-push-github.png "Le premier push sur notre répertoire GitHub")


Cliquez ensuite sur "Commit to main" en bas de la fenêtre. Il ne reste plus qu'a publier le commit sur le projet, pour cela, cliquez sur "Publish branch". 


![Publier le commit en ligne](/publier-la-branch-en-ligne.png "Publier le commit en ligne")


Une fois cela fait et le chargement effectué, vous pouvez voir votre travail dans votre espace GitHub en ligne. 


![Notre projet sur le dashboard GitHub](/premier-push-sur-le-dahsboard-github.png "Notre projet sur le dashboard GitHub")


Améliorons maintenant un peu le site.

---

## Mettre en place des sections avec les Partials


Comme je l'ai noté plus haut, Hugo nous permet de mettre en place des sections, qui vont nous permettre de réutiliser des portions de code à plusieurs endroits de notre site. Dans notre template par défaut `baseof.html`, ajoutons le code suivant : 


```html
<html lang="{{ site.Language }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  <footer>
    {{ partial "footer.html" . }}
  </footer>
</body>
</html>
```


On a ajouté dans notre page deux partials, `head.html` et `footer.html`. La syntaxe est toujours : 


```html
{{ partials "chemin/du/partial.html" . }}
```


> Concernant le `.` que l'on ajoute après le chemin (et que l'on remarque aussi dans l'appel du block `main`), il représente le contexte. Je ne rentre pas dans le détail ici, mais il est indispensable au bon fonctionnement du partial. Plus d'info sur la [documentation du contexte](https://gohugo.io/templates/introduction/#context) dans Hugo et des [partials](https://gohugo.io/templates/partial/). 


Il faut maintenant créer les fichiers pour que Hugo puisse les charger. Pour cela, ajoutez un dossier `partials` dans le dossier `layouts`. Vous pouvez ajouter vos deux partials ici afin d'obtenir la structure suivante : 


![Le dossier des partials](/dossier-partials.png "Le dossier des partials")


Dans nos partials, on construit notre élément avec uniquement ce qui est nécessaire à son fonctionnement. par exemple, créons un `footer` très simple : 


```html
<p>Le footer de mon site - 2025</p>
```


Pour notre `head`, ajoutons un tout petit peu plus de contenu : 


```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ .Title }}</title>
<link rel="stylesheet" href="/css/style.css">
```


Dans la balise `title`, on fait référence au titre de la page active, en faisant appel au contexte (avec le symbole `.`) de la page. La valeur de ce titre est récupéré dans le fichier Markdown correspondant. Il changera donc en fonction de la page dans lequel on se trouve. 


On a également ajouté un lien vers un fichier CSS. Celui-ci doit être ajouté dans le dossier `static` de notre projet (dans cette exemple, on a donc `static > css > style.css`). 


> Le contenu de ce dossier est chargé tel quel lors de la construction du site, mais le dossier lui n'est pas ajouté ! Il ne faut donc pas l'ajouter dans le chemin (j'ai perdu quelques cheveux à comprendre ça). 


Avec un peu de CSS basique et les deux partials, le site commence (presque) à ressembler à quelque chose.


![Le site avec les partials et le CSS](/le-site-avec-les-partials-et-le-css-v2.png "Le site avec les partials et le CSS")


Vous pouvez faire un nouveau commit pour sauvegarder votre travail. Pensez à le faire de temps à temps, une fois que vous avez ajouter des fichiers ou modifiés du contenu de manière significative.

---

## Ajouter des pages


Pour ajouter des pages dans notre site, il faut que l'on créer un dossier dans `content` avec le nom que l'on souhaite donner à la page. Si l'on veut créer une page Contact, on créer un dossier `contact`. Dans ce nouveau dossier, il faut également créer un fichier `index.md` (sans underscore). Notre structure ressemble à ceci : 


![Ajout des dossiers pages](/page-contact-structure.png "Ajout des dossiers pages")


> Pour comprendre pourquoi on met parfois un `_` devant les fichiers index, consultez la documentation de Hugo à propros de l'organisation des pages : [https://gohugo.io/content-management/page-bundles/](https://gohugo.io/content-management/page-bundles/)


De cette manière, notre page va avoir un contenu différent de notre page d'accueil, mais toujours se construire à partir de notre fichier `baseof.html`. On peut également lui ajouter des éléments statiques différents et unique à cette page. Dans `contact.html`, ajoutez le code suivant :


```html
{{ define "main" }}
    {{ .Content }}
    <form action="#">
        <input type="text" value="Votre message">
        <input type="submit" value="Envoyer">
    </form>
    <a class="btn" href='/'>Retour à l'accueil</a>
{{ end }}
```


À la suite de notre injection de contenu, on créer un petit formulaire de contact et un lien vers la page d'accueil. On remarque que le lien est fait en référencent la racine du site avec `/`. 


Il faut enfin ajouter du contenu à notre page, en passant par le fichier Markdown correspondant dans le dossiers `content > contact`, c'est à dire avec le même nom que notre nouvelle page. Voilà un exemple de contenu : 


```markdown
---
title: "Page d'accueil"
layout: "contact"
url: "/contact/"
---


# Discutons ensemble :smile:
Je suis à votre écoute pour réaliser votre projet !
```


C'est le bon moment pour introduire le fonctionnement des fichiers Markdown. Vous l'avez sans doute remarqué plus haut, on a ajouté du contenu entre des blocs `---` en haut de nos fichiers `.md`. C'est le contenu [Frontmatter](https://frontmatter.codes/docs) de notre page. Il nous permet de définir toute une collection d'information relative à la page, que l'on pourra ensuite piloter via notre CMS plus tard, et que l'on peut récupérer dans les fichiers de templates. On reviendra un peu plus en détail sur cette partie plus tard, quand on abordera la création des projets. Ce que l'on peut retenir pour le moment, ce sont les lignes `layout: "contact"` et `url: "/contact/"`. La première spécifie à Hugo de construire la page à partir du fichier `.html` correspondant dans le dossier `layout`. La deuxième définit l'url de notre page.


> Les émojis ne sont pas activés par défaut dans un site Hugo, il faut le définir dans le fichier de configuration `hugo.toml` ou `config.toml`. Plus d'infos ici : [gohugo.io/quick-reference/emojis/](https://gohugo.io/quick-reference/emojis/)


Pour finir, il faut que l'on ajoute un lien vers notre page contact sur notre page d'accueil afin de pouvoir l'atteindre. On a ici deux choix : 


* on ajoute un lien dans le fichier `home.html` via une balise `a`, de la même manière que dans la page `contact.html` que l'on vient de créer.
* On ajoute un lien dans le fichier `_index.md`, c'est à dire le contenu de notre page d'accueil. 


Ce choix va dépendre de notre usage et de notre situation, on va pour l'exemple passer par le contenu afin de voir comment ajouter un lien et une classe en Markdown. 


Dans `_index.md` donc : 


```markdown
---
title: "Page d'accueil"
---

# Bonjour internet
Voilà le contenu de la page d'accueil, qui vient de `content/_index.md` !

[Contactez moi](/contact/ "Contactez moi")
{.btn}
```


Ajouter un lien en Markdown est relativement simple comme vous pouvez le voir. La structure est toujours : \
`[infobulle](/url/ "text du lien")`


Dans cet exemple, j'ai indiqué le lien moi même, mais il est possible de laisser Hugo générer lui même le lien en [utilisant un shortcode](https://gohugo.io/methods/shortcode/). 


Pour ajouter une classe ou un ID à un élément, il faut le définir entre accolades sous cet élément (à l'exception des titre Hn et des blocs de code, [plus de détail dans la documentation à ce sujet](https://gohugo.io/content-management/markdown-attributes/#usage)). Cependant, il n'est pas possible d'ajouter directement une classe sur un lien. Dans notre cas, l'ajout du code `{.btn}` créer une balise `<p>` englobant notre lien. Il faut donc le prendre en compte dans notre CSS. 


L'idéal est de définir un style par défaut pour les liens issus d'un bloc de contenu, afin de ne pas ajouter de classe. Les liens toujours présents dans une page peuvent être placé dans les partials ou templates. Encore mieux, vous pouvez passer par un shortcode, afin de définir une structure plus complexe pour des éléments à ajouter dans des fichiers markdown. 


**Pour donner une analogie : 
Les Partials sont des sections utilisables dans les fichiers de templates. 
Les Shortcodes sont des widgets, utilisables dans les fichiers de contenus.**


> L'ajout de classe dans les fichiers .md n'est pas activé par défaut dans Hugo, il faut ajouter dans le fichier `hugo.toml` ou `config.toml` le contenu suivant : 
>
> ```toml
> [markup]
>   [markup.goldmark]
>     [markup.goldmark.parser]
>       [markup.goldmark.parser.attribute]
>         block = true
>         title = true
> ```
>
> Plus d'info dans la documentation ici : [gohugo.io/content-management/markdown-attributes/#block-elements](https://gohugo.io/content-management/markdown-attributes/#block-elements)


Il ne reste plus qu'a ajouter un peu de CSS, de relancer votre serveur et de naviguer jusqu'à votre superbe page de contact ! 


![Notre page de contact fonctionne](/page-contact.png "Notre page de contact fonctionne")


N'oubliez pas de commit votre travail sur GitHub, et on continue. 

---

## Créer un menu de navigation


Maintenant que le site possède une structure (certes basique), on va pouvoir générer un menu de navigation. Pour cela, rendez-vous dans votre fichier de configuration `hugo.toml`(ou `config.toml`). En effet, c'est dans ce fichier que l'on définit tout les paramètres communs à l'ensemble du site. La syntaxe est très simple et se présente comme suit : 


```toml
[menus]
  [[menus.header]]
    name = 'Accueil'
    url = '/'
    weight = 10
  [[menus.header]]
    name = 'Contact'
    url = '/contact'
    weight = 20
```


 Ici, on définit deux éléments de menu, ajoutés dans le menu `header`. c'est un nom arbitraire, libre à vous de le nommer différemment (Les majuscules et caractères spéciaux ne fonctionnent pas !). Pour chaque onglet, on définit :


1. **Name** : qui correspond au texte qui s'affiche sur le site,
2. **url** : qui correspond au lien de la page dans le site,
3. **weight** : qui correspond au poids de la page dans le menu. Plus un élément a un poids léger, plus il est affiché tôt dans le menu.  


Il existe d'autres [options de menu que vous pouvez consulter dans la documentation](https://gohugo.io/content-management/menus/). 


Une fois votre menu créé, il faut ajouter un partial pour l'appeler. Pour cela, rendez-vous dans `layouts > partials` et créez le fichier `nav.html`.


Celui-ci va contenir le code suivant : 


```html
<nav>
    <ul>
        {{ range .Site.Menus.header }}
        <li>
            <a href="{{ .URL }}">{{ .Name }}</a>
        </li>
        {{ end }}
    </ul>
</nav>
```


La structure de la navigation est écrite en HTML, et on utilise une autre fonction de Hugo, [range](https://gohugo.io/functions/go-template/range/), pour itérer sur les pages du menu. L'[objet Site comporte tout un tas de méthode](https://gohugo.io/methods/site/), dont `Menus`, qui permet de récupérer un menu dans le fichier de configuration du site.


Il ne nous reste plus qu'a appeler le partial dans le fichier `baseof.html` pour que le menu apparaisse. On ajoute une balise `header` ici, mais on aurait aussi pu créer un partial avec la balise `header` déjà incluse, en fonction de notre préférence. 


```html
<html lang="{{ site.Language }}">
<head>
  {{ partial "head.html" . }}
</head>
<body>
  <header>
    {{ partial "nav.html" . }}
  </header>
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  <footer>
    {{ partial "footer.html" . }}
  </footer>
</body>
</html>
```


Et voilà, votre menu apparait dans toutes les pages ! 


![Notre menu de navigation foncitonne](/menu-ok.png "Notre menu de navigation fonctionne")


Il est possible d'aller plus loin évidemment, je vous met [un lien vers ce post qui rentre beaucoup plus en détail](https://harrycresswell.com/writing/menus-in-hugo/), notamment avec la mise en place de menu à plusieurs niveaux et de l'ajout de classe sur l'élément actif.


Mais pour le moment, passons à la dernière étape de la création de notre site ! 

---

## Créer une liste de projet


Pour commencer, il faut créer les projets. Pour cela, allez dans le dossier `content`, et ajoutez un dossier avec le nom de notre choix, pour le tutoriel, j'ai choisi `projets`. Ce nom sera celui utilisé par Hugo pour déterminer le `type` de ces projets. On ajoute dans ce dossier un fichier `_index.md` afin de pouvoir passer des informations générales. Pour le moment, il peut simplement comprendre le titre de la page :


```markdown
---
title: "Mes projets"
--- 
```


Ajoutez ensuite au moins deux projets, sous le forme de dossier avec le nom que l'on souhaite donner au projet (pas d'espaces ni de caractères spéciaux). Dans chacun de ces dossiers, on ajoute un fichier markdown `index.md` avec le contenu. Voilà un exemple simple de projet : 


```markdown
---
title: Mon premier projet
date: 
description: Une description courte de mon projet.
type: projets
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis risus ut magna fermentum, sed porttitor justo scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vel varius libero. Suspendisse sed eros nunc. Mauris suscipit risus luctus nisi gravida, ac consequat ipsum efficitur. Nam feugiat lectus mauris, at pretium risus interdum nec. Nullam a ultricies diam. Duis tempor volutpat purus, quis condimentum mi elementum sit amet. Aenean et felis quis tellus tempus pellentesque nec et lacus. Etiam lobortis, quam in luctus congue, neque eros malesuada turpis, a egestas felis magna vitae lectus. In arcu orci, malesuada quis condimentum eu, posuere vel mi. Nullam dictum aliquam augue, nec dignissim diam porttitor quis. Fusce interdum sem dignissim augue tincidunt volutpat. Suspendisse potenti. Donec tempor accumsan augue vestibulum finibus.
```


On remarque que l'on a définit dans le `FrontMatter` le type de la page comme un `"projets"`, ce qui reprend le nom du dossier parent. Le champ date est laissé vide, on le complétera via le CMS quand celui-ci sera installé.


La structure doit ressembler à ça : 


![La structure de nos projets dans VScode](/struct-projets-maj.png "La structure de nos projets dans VScode")


Pour mettre en place les projets, il faut ensuite créer deux nouveaux fichiers de template dans `layouts > _default`, `section.html` et `single.html`. Commençons par `section.html`, c'est lui qui va récupérer tout les projets et les présenter dans une liste complète. 


```html
{{ define "main" }}
    {{ .Content }}
    {{ range where .Site.RegularPages "Type" "projets" }}
        <h2><a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a></h2>
    {{ end }}
{{ end }}
```


On réutilise la fonction `range` que l'on a vu plus haut, et on récupére les pages stockées dans la variable globale `Site`, tant que celles-ci sont de types `"projets"`. On laisse ici le tri des pages par défaut, mais il existe [plusieurs autres méthodes](https://gohugo.io/methods/pages/).


Pour voir le résultat, ajoutez un onglet dans le menu (via le fichier `Hugo.toml`) de la manière suivante : 


```toml
  [[menus.header]]
    name = 'Mes projets'
    url = '/projets'
    weight = 30
```


Un nouvel onglet est créé, et la page `Mes projets` récupère bien tous les projets que l'on a ajouté sur le site, et nous propose un lien vers ces pages. 


![Les projets affichés dans la page section](/cest-notre-projet.png "Les projets affichés dans la page section")


Pour le moment, le site n'a pas de template pour afficher les projets unique, il faut donc le créer. C'est `single.html` qui s'en charge. Voilà un exemple très sommaire :


```html
{{ define "main" }}
<article>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</article> 
{{ end }}
```


Maintenant, si on clique sur un des projets, le contenu est correctement affiché :


![Le contenu d'un projet](/contenu-projet.png "Le contenu d'un projet")


Pour l'exercice, essayez de créer un partial pour afficher le dernier projet sur votre page d'accueil. Je vous met la solution à la suite, mais prenez le temps d'essayer vous même, pour vous faire la main avec le fonctionnement de Hugo.

Ma solution :

Dans `layouts > partials`, créez un fichier `html` avec le contenu suivant : 


```html
<section>
    {{ range where .Site.RegularPages "Type" "projets" | first 1 }}
    <article>
        <h2>{{ .Title }}</h2>
        <p>{{ .Description }}</p>
        <p><a href="{{ .RelPermalink }}">lire la suite</a></p>
    </article>
    {{ end }}
</section>
```


Très similaire au template `section.html`, sauf que l'on récupère seulement le premier projet de la liste avec la fonction `first`, le chiffre à la suite détermine le nombre à afficher. Si on avait noté 3, alors la fonction aurait affiché les 3 premières pages trouvées. 


Pour que la description du projet que l'on appel ne soit pas vide, il faut lui ajouter dans le `FrontMatter` de la manière suivante : 


```markdown
---
title: "Mon premier projet"
type: "projets"
description : "Une description courte de mon projet."
--- 
```


Il ne reste plus qu'a ajouter le partial dans la page d'accueil, en passant par `home.html` : 


```html
{{ define "main" }}
    {{ .Content }}
    {{ partial "previewProjet.html" . }}
    <a href='/contact' class="btn">Contactez-moi</a>
{{ end }}
```


(J'ai ajouté le lien vers la page d'accueil ici et je l'ai supprimé du fichier `_index.html` contenant le contenu de la page).


Et voilà, le dernier projet s'affiche bien : 


![Notre partial fonctionne ](/dernier-projet-page-accueil.png "Notre partial fonctionne")


Avec tout ce qu'on a vu, vous avez une base solide pour créer un premier site et prendre en main Hugo. Maintenant, passons à la mise en ligne.

---

## Mettre notre site en ligne avec Netlify


Avant de continuer, assurez vous d'avoir poussé vos dernières modifications sur Github. Une fois cela fait, créez vous un compte sur [Netlify](https://app.netlify.com/). Ensuite, rendez-vous dans la page `Sites` de votre espace personnel, puis cliquez sur `Add new site`. 


![Ajouter un site à Netlify](/ajouter-site-netlify.png "Ajouter un site à Netlify")


Choisissez l'option `import an existing project`, puis choisissez GitHub. Connectez vous alors avec votre compte personnel GitHub, et une fois que c'est fait, choisissez le répertoire utilisé pour stocker votre projet.


![Choix du répertoire à utiliser](/choix-du-repo.png "Choix du répertoire à utiliser")


> Si votre répertoire ne s'affiche pas, suivez [les étapes de ce tutoriel proposé par Hugo](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) à partir de l'étape 4.


Une fois le répertoire choisit, il faut compléter quelques paramètres. 


1. **Site name** : Il doit être unique, testez la disponibilité,
2. **Branch to deploy** : Laissez sur `main` par défaut,
3. **Build command** : Ajoutez la commande suivante : `hugo --gc --minify`,
4. **Publish directory** : Si ce n'est pas complété, ajoutez `public`,
5. Enfin, cliquez sur le bouton **Add environment variables**, puis dans **Key** ajoutez `HUGO_VERSION`, et dans **Value** ajoutez le numéro de [la dernière version de Hugo](https://github.com/gohugoio/hugo/releases/latest), à la création de cette article, c'est `0.140.2`.


![Les paramètres dans Netlify ](/parametre-netlify.png "Les paramètres dans Netlify")


Cliquez ensuite sur `Deploy` en bas de la page. Netlify va alors prendre un peu de temps pour mettre en ligne le site. Il se peut que votre installation de fonctionne pas, dans ce cas, assurez vous que vous avez bien lancé l'installation depuis la racine de votre projet. Si votre racine n'est pas au même niveau que le répertoire GitHub, alors il faut ajouter le chemin dans la configuration Netlify, au niveau de **Base directory**. 


![Ajout du bon dossier comme racine](/base-directory.png "Ajout du bon dossier comme racine")


![La racine du projet dans VScode](/racine-vscode.png "La racine du projet dans VScode")


Dans le screenshot précédent, on voit que dans VScode, j'ai mon répertoire GitHub avec le nom `TEMPLATE_PORTFOLIO`, et la racine de mon projet dans un dossier appelé `Template_Portfolio` (c'est une mauvaise idée, ne faite pas ça). Il faut donc que je définisse `Base directory = Template_Portfolio` dans la configuration de Netlify.


Le site une fois construit, vous aurez ce message :


![Le site est bien en ligne](/le-site-est-publie.png "Le site est bien en ligne")


Il ne reste plus qu'a consulter votre superbe site en ligne !

---

## Installer le CMS


On va commencer par ajouter dans notre projet la page d'administration du CMS. Dans `static`, créez un dossier `admin` dans lequel il faut insérer les fichiers `index.html` et `config.yml`. 


`index.html` : 


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Decap CMS and sveltia CMS-->
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>
```


`config.yml` : 


```toml
backend:
  name: github
  repo: COMPTE GITHUB/REPO # C'est le nom de votre répertoire github
  branch: main # Branch to update (optional; defaults to master)
media_folder: Template_Portfolio/static/media
public_folder: /media


collections:
  - name: 'Projets'
    label: 'Projets'
    label_singular: 'Projet'
    folder: '/Template_Portfolio/content/projets' # Le chemin depuis la racine du site, à adapter selon votre projet
    path: '{{slug}}/index'
    media_folder: ''
    public_folder: ''
    slug: '{{day}}-{{month}}-{{year}}-{{slug}}'
    create: true
    editor:
      preview: false
    fields:
      - { label: 'Titre', name: 'title', widget: 'string' }
      - { label: 'Date', name: 'date', widget: 'datetime', date_format: "DD.MM.YYYY", time_format: "HH:mm"}
      - { label: 'Description', name: 'description', widget: 'string' }
      - { label: 'Type', name: "type", widget: 'string'}
      - { label: 'Contenu', name: 'body', widget: 'markdown' }
```


le fichier `index.html` est simplement la page statique de notre pannel d'administration. Il appelle un script qui charge toutes les fonctionnalitées proposés par Sveltia. 

Le fichier `config.yml` quant à lui, définit les paramètres de sécurités de notre backend ainsi que la structure des pages que l'on souhaite pouvoir retrouver dans le CMS. C'est ici que l'on fait le lien entre le FrontMatter des fichiers `.md` et notre CMS.

Une fois cela fait, poussez vos ajouts sur GitHub. Cependant, le CMS n'est pas encore tous à fait accessible, il faut gérer les autorisations. En effet, pour éviter que d'autres personnes puissent accéder à votre panel d'administration, il est nécessaire de faire le lien entre Netlify, le CMS et GitHub. On va donc mettre en place une sécurité afin de pouvoir se connecter via notre compte GitHub.


Pour cela, il faut se rendre dans les [paramètres de votre compte GitHub](https://github.com/settings/profile), puis tout en bas dans `Developer Settings`. Cliquez ensuite sur `OAuth Apps` : 


![Accès aux options de OAuth de GitHub](/acces-oaut-setting.png "Accès aux options de OAuth de GitHub")


Dans cette page, cliquez sur `Register a new application`, et la fenêtre suivante va s'ouvrir : 


![Les options de OAuth de GitHub](/oauth-github.png "Les options de OAuth de GitHub")


Il faut compléter les informations comme suit : 


1. **Application name** : Un nom de votre choix,
2. **Homepage URL** : C'est l'url de votre site en ligne, que vous pouvez retrouver dans l'espace du site sur Netlify,
3. **Authorization callback URL** : Il faut lui donner la valeur `https://api.netlify.com/auth/done`.


Une fois fait, cliquez sur `Register application`. GitHub vous ouvre alors la page de votre application, où vous pouvez voir son `Client ID`. Copiez le dans un coin, car on va en avoir besoin pour la prochaine étape. Il faut également générer un clé client, pour cela, cliquez sur `Generate a new client secret`.


![Générer une clé privée](/generate-secret-id.png "Générer une clé privée")


Copier bien la clée généré par GitHub dans un coin également, car il ne sera pas possible de la retrouver plus tard. Maintenant que c'est fait, il ne nous reste plus qu'a faire le lien entre GitHub et Netlify. Pour cela, rendez-vous dans le dashboard de votre site sur Netlify, puis naviguez dans `Site configuration > Access & security > OAuth`. Sous `Authentication providers`, cliquez sur `Install provider`. 


![Installer un provider dans Netlify](/install-provider-netliffy.png "Installer un provider dans Netlify")


Sélectionnez ensuite GitHub, et complétez les deux clées avec celles que vous avez générées un peu plus tôt :


![Ajout des clées](/install-provider-netlify-secret.png "Ajout des clés")


Enfin, il ne vous reste plus qu'a cliquer sur `Install`, et le tour est joué ! Maintenant, il vous est possible d'accéder à votre backoffice en ajoutant `/admin` à la suite de l'url de votre site en ligne. Il vous faudra vous identifier avec votre compte GitHub. 


Vous êtes maintenant prêt pour ajouter du contenu à votre site à distance. À chaque mise à jour, le CMS va pousser les modifications sur le répertoire GitHub, et Netlify relancera la construction du site. Il n'y a rien à faire, quelques instants après avoir publié du contenu, il sera automatiquement en ligne. 


> Ressource utile pour cette section : 
> * <https://github.com/sveltia/sveltia-cms/?tab=readme-ov-file#getting-started>
> * <https://decapcms.org/docs/hugo/>
> * <https://decapcms.org/docs/github-backend/>
> * <https://docs.netlify.com/security/secure-access-to-sites/oauth-provider-tokens/#using-an-authentication-provider>


Je vous laisse faire le tour du CMS par vous même, c'est une interface graphique assez simple, vous devriez vous en sortir.

J'espère que vous avez tout compris. Intéro surprise, montrez moi vos portfolios :mortar_board: